"""Genera los requerimientos de pago (PDF + Word), el Excel de envío y el registro del sistema.

Uso:  python generar.py
Entrada: datos/cartera.csv
         recursos/membrete.jpg, recursos/pie.jpg, recursos/firma_sello.jpg
Salida:  salida/pdf/*.pdf, salida/word/*.docx, salida/TODOS_PARA_IMPRIMIR.pdf,
         salida/ENVIO_WHATSAPP.xlsx, salida/registro.json (lo usa app.py)

Columna "grupo" de la cartera:
  DEMANDADO   demanda ya presentada: se le ofrece arreglo antes de que el proceso avance.
  PREDEMANDA  todavía no demandado: último requerimiento previo a la vía judicial.
Si la fila trae "pdf_previo", no se genera documento nuevo (se usa el del 27/09).
"""
import csv
import html
import json
import shutil
import unicodedata
from pathlib import Path
from urllib.parse import quote

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Cm, Pt
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.worksheet.datavalidation import DataValidation
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfgen import canvas
from reportlab.platypus import Frame, KeepInFrame, Paragraph

BASE = Path(__file__).parent
DATOS = BASE / "datos" / "cartera.csv"
RECURSOS = BASE / "recursos"
SALIDA = BASE / "salida"

# --- Datos del documento (editar aquí si cambian) -------------------------
FECHA_DOC = "28 de septiembre de 2026"
FECHA_LIMITE = "viernes 16 de octubre de 2026"
TEL_BUFETE = "9655-6803"
FIRMA_MENSAJE = "Abg. Cristian Hernández, LEX-S Asesoría & Consultoría"
JUZGADO = "Juzgado de Letras de lo Civil del Departamento de Francisco Morazán"

FINANCIERAS = {
    "CREDIMOVIL": {"razon": "CREDIMOVIL S.A. DE C.V.", "corto": "Credi Móvil", "sucursal": "Tegucigalpa"},
    "CREDIRAPID": {"razon": "CREDI RAPID S.A. DE C.V.", "corto": "Credi Rapid", "sucursal": "Tegucigalpa"},
    "PRESTAYA": {"razon": "PRESTA YA S.A. DE C.V.", "corto": "Presta Ya", "sucursal": "Tegucigalpa"},
    "PRESTAAUTO": {"razon": "PRESTA AUTO S.A. DE C.V.", "corto": "Presta Auto", "sucursal": "Tegucigalpa"},
    "PRESTAAUTO_CBA": {"razon": "PRESTA AUTO S.A. DE C.V.", "corto": "Presta Auto Ceiba", "sucursal": "La Ceiba"},
}

FUNDAMENTO_PREDEMANDA = (
    "Conforme a los artículos 1351, 1352, 1356 y 1361 del Código Civil de Honduras, las "
    "obligaciones contractuales deben cumplirse en los términos pactados. En caso de "
    "incumplimiento, la acreedora queda facultada para reclamar judicialmente el pago del "
    "capital adeudado, intereses, costas, gastos y demás cargos aplicables."
)

FUNDAMENTO_DEMANDADO = (
    "De conformidad con los artículos 616 al 619 del Código Procesal Civil, en esta clase de "
    "proceso el Juzgado, al admitir la demanda y a petición de parte, ordena el secuestro del "
    "vehículo cuya entrega se reclama, sin exigir caución a la demandante, y la parte demandada "
    "solo puede oponerse por las causas taxativamente señaladas en el artículo 619 de dicho "
    "Código; de no comparecer o no oponerse en esos términos, se dicta sentencia estimatoria. "
    "Asimismo, conforme a los artículos 1346, 1351 y 1360 del Código Civil, las obligaciones "
    "nacidas de los contratos tienen fuerza de ley entre las partes y deben cumplirse al tenor "
    "de los mismos."
)

ACCIONES = {
    "ENVIAR": ("ENVIAR", "C6EFCE"),
    "CONFIRMAR": ("CONFIRMAR CON AMABLE antes de enviar", "FFEB9C"),
    "PEDIR CELULAR": ("PEDIR CELULAR a la financiera o entregar en físico", "FFEB9C"),
    "NO ENVIAR": ("NO ENVIAR", "FFC7CE"),
    "YA ENVIADO": ("YA ENVIADO — no reenviar", "D9D9D9"),
}
ETAPAS = {"DEMANDADO": "Demanda presentada", "PREDEMANDA": "Por demandar"}


# --- Utilidades ------------------------------------------------------------
def lempiras(valor):
    return f"L. {float(valor):,.2f}"


def sin_acentos(texto):
    return "".join(c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn")


def nombre_propio(nombre):
    return " ".join(p.capitalize() for p in nombre.split())


def apellidos(nombre):
    return nombre_propio(" ".join(nombre.split()[-2:]))


def tratamiento(r):
    return {"M": "señor", "F": "señora"}.get(r["genero"], "señor(a)")


def saldo(r):
    valor = r["total"] if r["grupo"] == "DEMANDADO" else r["monto"]
    return float(valor) if valor else None


# --- Textos ----------------------------------------------------------------
def referencia(r, fin):
    if r["grupo"] == "DEMANDADO":
        veh = f"Vehículo {r['vehiculo']}, Placa {r['placa']}" if r["vehiculo"] else f"Vehículo Placa {r['placa']}"
        proceso = (f"Expediente Judicial No. {r['expediente']}, {JUZGADO}" if r["expediente"]
                   else f"Demanda presentada ante el {JUZGADO}")
        return (f"Contrato de Arrendamiento con Opción a Compra No. {r['prestamo']}, {fin['razon']} — "
                f"{veh}. {proceso}.")
    partes = []
    if r["prestamo"]:
        partes.append(f"Contrato No. {r['prestamo']}" + (f" (perfil {r['perfil']})" if r["perfil"] else ""))
    partes.append(f"{fin['razon']}, Sucursal {fin['sucursal']}")
    ref = ", ".join(partes)
    if r["placa"]:
        ref += f" — Vehículo Placa {r['placa']}"
    return ref + "."


def texto_saldo_demandado(r):
    if r["ampliacion"] == "SI":
        return (f"El saldo total adeudado, actualizado según certificación de saldos al {r['fecha_corte']}, "
                f"asciende a {lempiras(r['total'])}, monto que ya comprende capital, intereses y cargos "
                f"acumulados, y cuyo reclamo se hace efectivo mediante la ampliación del monto de la demanda "
                f"ya presentada; a ello se suman los intereses moratorios que se sigan devengando y las "
                f"costas procesales y personales.")
    if r["total"] and r["capital"]:
        return (f"En dicha demanda se reclama el saldo total insoluto de {lempiras(r['total'])} (capital "
                f"{lempiras(r['capital'])}, intereses {lempiras(r['intereses'])} y cargos "
                f"{lempiras(r['cargos'])}), según Certificación de Saldos al {r['fecha_corte']}, más los "
                f"intereses moratorios que se sigan devengando y las costas procesales y personales.")
    if r["total"]:
        return (f"En dicha demanda se reclama el saldo total insoluto de {lempiras(r['total'])}, según "
                f"Certificación de Saldos al {r['fecha_corte']}, más los intereses moratorios que se sigan "
                f"devengando y las costas procesales y personales.")
    return (f"En dicha demanda se reclama el saldo total insoluto que consta en la Certificación de Saldos "
            f"al {r['fecha_corte']}, más los intereses moratorios que se sigan devengando y las costas "
            f"procesales y personales.")


def texto_monto_predemanda(r):
    tipo, monto = r["tipo_monto"], r["monto"]
    if tipo == "capital":
        return (f"usted mantiene un saldo de capital adeudado de {lempiras(monto)}, según los registros "
                "de la financiera, más los intereses corrientes y moratorios, cargos y gastos que "
                "correspondan conforme a la certificación de saldos")
    if tipo == "cancelacion":
        return (f"el saldo para cancelación total de su obligación asciende a {lempiras(monto)}, según "
                "los registros de la financiera, más los intereses moratorios, cargos y gastos que se "
                "continúen generando hasta su pago efectivo")
    if tipo == "mora":
        return (f"usted mantiene un saldo en mora (cuotas vencidas y no pagadas) de {lempiras(monto)}, "
                "más los intereses moratorios, cargos y gastos que correspondan, sin perjuicio del "
                "saldo total del contrato")
    return ("usted mantiene un saldo pendiente de pago cuyo monto total, con capital, intereses, cargos "
            "y gastos, constará en la certificación de saldos que emita la financiera")


def parrafos(r, fin):
    """Devuelve (subtítulo, [párrafos del cuerpo]) según la etapa."""
    if r["grupo"] == "DEMANDADO":
        return f"Demanda Judicial en Trámite — Oportunidad de Arreglo — {fin['razon']}", [
            f"Por este medio le comunicamos que, ante el incumplimiento del contrato antes referido, "
            f"{fin['razon']} presentó en su contra demanda de pago por incumplimiento de contrato de "
            f"arrendamiento financiero, por la vía del proceso abreviado, con solicitud de la medida "
            f"cautelar de secuestro del vehículo, ante el {JUZGADO}. {texto_saldo_demandado(r)}",
            FUNDAMENTO_DEMANDADO,
            f"Antes de que el proceso judicial continúe avanzando, se le concede la oportunidad de "
            f"cancelar lo adeudado o de formalizar un acuerdo de pago directo con la financiera, a más "
            f"tardar el {FECHA_LIMITE}. Todo arreglo deberá ser aprobado por la financiera y constar "
            f"por escrito. En caso de no hacerlo, el proceso continuará su curso y el monto reclamado "
            f"podrá verse incrementado por nuevos intereses, cargos, costas, gastos y demás conceptos "
            f"que resulten aplicables conforme a derecho.",
            "Si usted ya realizó el pago o suscribió un arreglo con la financiera, le rogamos "
            "comunicarlo para su verificación.",
        ]
    subtitulo = f"Requerimiento Previo a la Vía Judicial — {fin['razon']}" + (
        " (La Ceiba)" if fin["sucursal"] == "La Ceiba" else "")
    return subtitulo, [
        f"Por este medio le comunicamos que, ante el incumplimiento del contrato antes referido, "
        f"{fin['razon']} ha decidido reclamar judicialmente lo adeudado, siendo que a la fecha "
        f"{texto_monto_predemanda(r)}.",
        FUNDAMENTO_PREDEMANDA,
        f"Previo a interponer la demanda judicial correspondiente, se le concede una última oportunidad "
        f"para formalizar un acuerdo de pago directo con la financiera, a más tardar el {FECHA_LIMITE}. "
        f"En caso de no hacerlo, el monto reclamado podrá verse incrementado dentro del proceso judicial "
        f"por nuevos intereses, cargos, costas, gastos y demás conceptos que resulten aplicables "
        f"conforme a derecho.",
    ]


# --- PDF con membrete, firma y sello --------------------------------------
ANCHO, ALTO = letter
MARGEN_X = 72
# Posiciones tomadas del requerimiento original escaneado (puntos, origen arriba).
MEMBRETE = (0, 0, ANCHO, 99)
PIE = (0, 706.5, ANCHO, 58.5)
FIRMA = (162, 504, 396, 175.5)
LINEA_FINANCIERA_Y = 641
CUERPO_ARRIBA, CUERPO_ABAJO = 112, 528


def estilo(nombre, fuente="Helvetica", tam=11, alineacion=TA_JUSTIFY, despues=9):
    return ParagraphStyle(nombre, fontName=fuente, fontSize=tam, leading=tam * 1.3,
                          alignment=alineacion, spaceAfter=despues)


def imagen(c, archivo, caja):
    x, y, w, h = caja
    c.drawImage(str(RECURSOS / archivo), x, ALTO - y - h, width=w, height=h)


def crear_pdf(r, fin, ruta):
    subtitulo, cuerpo = parrafos(r, fin)
    normal = estilo("n")
    esc = html.escape
    flujo = [
        Paragraph("REQUERIMIENTO FORMAL DE PAGO", estilo("t", "Helvetica-Bold", 13, TA_CENTER, 2)),
        Paragraph(esc(subtitulo), estilo("s", tam=10.5, alineacion=TA_CENTER, despues=12)),
        Paragraph(f"Tegucigalpa, M.D.C., {FECHA_DOC}.", estilo("f", alineacion=TA_LEFT)),
        Paragraph(f"Señor(a): {esc(r['cliente'])}", estilo("se", alineacion=TA_LEFT)),
        Paragraph(f"<b>Referencia:</b> {esc(referencia(r, fin))}", normal),
        Paragraph(f"Estimado(a) {tratamiento(r)} {esc(apellidos(r['cliente']))}:", estilo("sa", alineacion=TA_LEFT)),
        *[Paragraph(esc(p), normal) for p in cuerpo],
        Paragraph("Atentamente,", estilo("a", alineacion=TA_LEFT, despues=0)),
    ]
    c = canvas.Canvas(str(ruta), pagesize=letter)
    c.setTitle(f"Requerimiento de pago - {r['cliente']}")
    c.setAuthor("LEX-S Asesoría & Consultoría")
    imagen(c, "membrete.jpg", MEMBRETE)
    imagen(c, "pie.jpg", PIE)
    imagen(c, "firma_sello.jpg", FIRMA)
    c.setFont("Times-Roman", 10)
    c.drawCentredString(ANCHO / 2, ALTO - LINEA_FINANCIERA_Y, fin["razon"])
    ancho, alto = ANCHO - 2 * MARGEN_X, CUERPO_ABAJO - CUERPO_ARRIBA
    marco = Frame(MARGEN_X, ALTO - CUERPO_ABAJO, ancho, alto,
                  leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    marco.addFromList([KeepInFrame(ancho, alto, flujo, mode="shrink")], c)
    c.showPage()
    c.save()


# --- Word (editable) -------------------------------------------------------
def crear_docx(r, fin, ruta):
    subtitulo, cuerpo = parrafos(r, fin)
    doc = Document()
    sec = doc.sections[0]
    sec.page_height, sec.page_width = Cm(27.94), Cm(21.59)
    sec.left_margin = sec.right_margin = Cm(2.54)
    sec.top_margin, sec.bottom_margin = Cm(3.8), Cm(2.8)
    sec.header_distance, sec.footer_distance = Cm(0.3), Cm(0.3)
    doc.styles["Normal"].font.name = "Arial"
    doc.styles["Normal"].font.size = Pt(11)
    sec.header.paragraphs[0].add_run().add_picture(str(RECURSOS / "membrete.jpg"), width=Cm(16.5))
    sec.footer.paragraphs[0].add_run().add_picture(str(RECURSOS / "pie.jpg"), width=Cm(16.5))

    def p(texto, negrita=False, centro=False, tam=11):
        par = doc.add_paragraph()
        par.alignment = WD_ALIGN_PARAGRAPH.CENTER if centro else WD_ALIGN_PARAGRAPH.JUSTIFY
        run = par.add_run(texto)
        run.bold, run.font.size = negrita, Pt(tam)
        return par

    p("REQUERIMIENTO FORMAL DE PAGO", True, True, 13)
    p(subtitulo, centro=True, tam=10.5)
    p(f"Tegucigalpa, M.D.C., {FECHA_DOC}.")
    p(f"Señor(a): {r['cliente']}")
    ref = doc.add_paragraph()
    ref.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    ref.add_run("Referencia: ").bold = True
    ref.add_run(referencia(r, fin))
    p(f"Estimado(a) {tratamiento(r)} {apellidos(r['cliente'])}:")
    for texto in cuerpo:
        p(texto)
    p("Atentamente,")
    firma = doc.add_paragraph()
    firma.alignment = WD_ALIGN_PARAGRAPH.CENTER
    firma.add_run().add_picture(str(RECURSOS / "firma_sello.jpg"), width=Cm(12))
    p(fin["razon"], centro=True, tam=10)
    doc.save(ruta)


# --- WhatsApp, Excel y registro -------------------------------------------
def telefono_wa(numero):
    digitos = "".join(ch for ch in numero if ch.isdigit())
    return f"504{digitos}" if len(digitos) == 8 else ""


def mensaje_wa(r, fin):
    nombre = nombre_propio(r["cliente"])
    placa = f" (vehículo placa {r['placa']})" if r["placa"] else ""
    if r["grupo"] == "DEMANDADO":
        return (f"Buenos días, {nombre}. Le hago llegar el REQUERIMIENTO FORMAL DE PAGO relacionado con "
                f"la demanda judicial presentada por {fin['razon']}{placa}. Antes de que el proceso "
                f"continúe avanzando, tiene la oportunidad de pagar o formalizar un arreglo de pago con la "
                f"financiera a más tardar el {FECHA_LIMITE}. Le adjunto el documento. Quedo atento a su "
                f"comunicación. {FIRMA_MENSAJE}. Cel. {TEL_BUFETE}.")
    return (f"Buenos días, {nombre}. Le hago llegar el REQUERIMIENTO FORMAL DE PAGO previo a la vía "
            f"judicial de {fin['razon']}{placa}. Tiene plazo hasta el {FECHA_LIMITE} para formalizar un "
            f"acuerdo de pago con la financiera; de lo contrario se presentará la demanda judicial. Le "
            f"adjunto el documento. Quedo atento a su comunicación. {FIRMA_MENSAJE}. Cel. {TEL_BUFETE}.")


def registro(filas):
    salida = []
    for n, (r, fin, pdf, nuevo) in enumerate(filas, start=1):
        msg = mensaje_wa(r, fin)
        tels = [(r[c], telefono_wa(r[c])) for c in ("celular", "celular2") if r[c]]
        salida.append({
            "id": n, "etapa": ETAPAS[r["grupo"]], "financiera": fin["corto"], "cliente": nombre_propio(r["cliente"]),
            "accion": r["accion"], "que_hacer": ACCIONES[r["accion"]][0], "observacion": r["observacion"],
            "saldo": saldo(r), "placa": r["placa"], "contrato": r["prestamo"], "pdf": pdf, "pdf_nuevo": nuevo,
            "mensaje": msg,
            "telefonos": [{"numero": t, "wa": f"https://wa.me/{w}?text={quote(msg)}" if w else ""} for t, w in tels],
        })
    return salida


def crear_excel(filas, ruta):
    wb = Workbook()
    ws = wb.active
    ws.title = "ENVIAR HOY"
    encabezados = ["No.", "QUÉ HACER", "Etapa", "Financiera", "Cliente", "Celular", "ABRIR WHATSAPP",
                   "Celular 2", "ABRIR WHATSAPP 2", "Saldo reclamado", "Placa", "Contrato",
                   "PDF (arrastrar al chat)", "Mensaje (ya va escrito en el link)", "Observaciones",
                   "¿Enviado?", "Fecha/hora envío"]
    ws.append(encabezados)
    for celda in ws[1]:
        celda.font = Font(bold=True, color="FFFFFF")
        celda.fill = PatternFill("solid", fgColor="1F3A5F")
        celda.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")

    enlace = Font(color="0563C1", underline="single", bold=True)
    for i, (r, fin, pdf, nuevo) in enumerate(filas, start=2):
        texto, color = ACCIONES[r["accion"]]
        activo = r["accion"] != "YA ENVIADO"
        msg = mensaje_wa(r, fin) if activo else ""
        tel1, tel2 = telefono_wa(r["celular"]), telefono_wa(r["celular2"])
        ws.append([i - 1, texto, ETAPAS[r["grupo"]], fin["corto"], nombre_propio(r["cliente"]), r["celular"],
                   "Abrir chat" if tel1 and activo else "", r["celular2"], "Abrir chat" if tel2 and activo else "",
                   saldo(r), r["placa"], r["prestamo"], pdf if nuevo else f"{pdf} (del 27/09)", msg,
                   r["observacion"], "Sí" if not activo else "No", ""])
        for col, tel in ((7, tel1), (9, tel2)):
            if tel and activo:
                ws.cell(i, col).hyperlink = f"https://wa.me/{tel}?text={quote(msg)}"
                ws.cell(i, col).font = enlace
        if nuevo:
            ws.cell(i, 13).hyperlink = f"pdf/{pdf}"
        ws.cell(i, 10).number_format = '"L. "#,##0.00'
        ws.cell(i, 2).fill = PatternFill("solid", fgColor=color)
        ws.cell(i, 2).font = Font(bold=True)
        for col in range(1, len(encabezados) + 1):
            ws.cell(i, col).alignment = Alignment(wrap_text=True, vertical="top")

    total = len(filas) + 1
    validacion = DataValidation(type="list", formula1='"No,Sí,No tiene WhatsApp,Entregado en físico"')
    ws.add_data_validation(validacion)
    validacion.add(f"P2:P{total}")
    for n, ancho in enumerate([5, 24, 14, 13, 30, 12, 12, 12, 12, 15, 10, 9, 45, 60, 40, 12, 16], start=1):
        ws.column_dimensions[ws.cell(1, n).column_letter].width = ancho
    ws.row_dimensions[1].height = 32
    ws.freeze_panes = "F2"
    ws.auto_filter.ref = f"A1:Q{total}"

    inst = wb.create_sheet("CÓMO ENVIAR")
    for linea in [
        "CÓMO ENVIAR (2 minutos por cliente)",
        "Lo más fácil: doble clic en ENVIAR_REQUERIMIENTOS.bat (abre el sistema en el navegador).",
        "Desde este Excel: 1) clic en 'Abrir chat' (el mensaje ya va escrito); 2) arrastre el PDF de la carpeta pdf;",
        "3) Enviar; 4) ponga 'Sí' en ¿Enviado? y la fecha/hora; 5) tome captura de pantalla.",
        "",
        "COLORES: verde = enviar; amarillo = confirmar o pedir dato antes; rojo = NO enviar; gris = ya enviado.",
        "HORARIO LEGAL (CNBS 022/2022): domingo 9:00 a.m. a 1:00 p.m.; lunes a sábado 8:00 a.m. a 8:00 p.m.; feriados NO.",
        "Guarde las capturas: algunos juzgados piden acreditar el requerimiento (incluso con acta notarial).",
    ]:
        inst.append([linea])
    inst["A1"].font = Font(bold=True, size=14)
    inst.column_dimensions["A"].width = 120

    resumen = wb.create_sheet("RESUMEN")
    resumen.append(["Etapa", "Financiera", "Personas", "Enviar", "Confirmar / pedir dato", "No enviar",
                    "Ya enviado", "Total reclamado (L.)"])
    for c in resumen[1]:
        c.font = Font(bold=True)
    for etapa in ETAPAS:
        for fin in dict.fromkeys(f["corto"] for _, f, _, _ in filas):
            g = [r for r, f, _, _ in filas if r["grupo"] == etapa and f["corto"] == fin]
            if not g:
                continue
            resumen.append([ETAPAS[etapa], fin, len(g), sum(r["accion"] == "ENVIAR" for r in g),
                            sum(r["accion"] in ("CONFIRMAR", "PEDIR CELULAR") for r in g),
                            sum(r["accion"] == "NO ENVIAR" for r in g), sum(r["accion"] == "YA ENVIADO" for r in g),
                            sum(saldo(r) or 0 for r in g)])
            resumen.cell(resumen.max_row, 8).number_format = "#,##0.00"
    for col, ancho in zip("ABCDEFGH", [20, 18, 10, 8, 22, 10, 12, 20]):
        resumen.column_dimensions[col].width = ancho
    wb.save(ruta)


def unir_pdf(archivos, ruta):
    try:
        import pymupdf
    except ImportError:
        print("Instale pymupdf para generar TODOS_PARA_IMPRIMIR.pdf (pip install pymupdf)")
        return
    unido = pymupdf.open()
    for archivo in archivos:
        unido.insert_pdf(pymupdf.open(archivo))
    unido.save(ruta, garbage=4, deflate=True)


def main():
    if SALIDA.exists():
        shutil.rmtree(SALIDA)
    word, pdf = SALIDA / "word", SALIDA / "pdf"
    word.mkdir(parents=True)
    pdf.mkdir()

    with open(DATOS, encoding="utf-8-sig") as f:
        registros = list(csv.DictReader(f))

    filas, generados = [], []
    for n, r in enumerate(registros, start=1):
        fin = FINANCIERAS[r["financiera"]]
        if r["pdf_previo"]:
            filas.append((r, fin, r["pdf_previo"], False))
            continue
        tipo = "Demandado" if r["grupo"] == "DEMANDADO" else "Requerimiento"
        base = sin_acentos(f"{n:03d}_{tipo}_{r['cliente'].replace(' ', '_')}_{fin['corto'].replace(' ', '')}")
        crear_pdf(r, fin, pdf / f"{base}.pdf")
        crear_docx(r, fin, word / f"{base}.docx")
        filas.append((r, fin, f"{base}.pdf", True))
        if r["accion"] != "NO ENVIAR":
            generados.append(pdf / f"{base}.pdf")

    crear_excel(filas, SALIDA / "ENVIO_WHATSAPP.xlsx")
    unir_pdf(generados, SALIDA / "TODOS_PARA_IMPRIMIR.pdf")
    (SALIDA / "registro.json").write_text(json.dumps(registro(filas), ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(filas)} personas en el sistema; {sum(nuevo for *_, nuevo in filas)} requerimientos generados.")


if __name__ == "__main__":
    main()
