"""Genera los requerimientos de pago (PDF + Word), el Excel de envío y el registro del sistema.

Uso:  python generar.py
Entrada: datos/cartera.csv
         recursos/membrete.jpg, recursos/pie.jpg, recursos/firma_sello.jpg
Salida:  salida/PDF/*.pdf, salida/WORD/*.docx, salida/TODOS_PARA_IMPRIMIR.pdf,
         salida/LISTA_ENVIO_28SEPT.xlsx, salida/registro.json (lo usa app.py)

Columna "grupo" de la cartera:
  DEMANDADO   demanda ya presentada: se le ofrece arreglo antes de que el proceso avance.
  PREDEMANDA  todavía no demandado: último requerimiento previo a la vía judicial.
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
NOMBRE_LISTA = "LISTA_ENVIO_28SEPT.xlsx"

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

ETAPAS = {"DEMANDADO": "Demanda presentada", "PREDEMANDA": "Por demandar"}


# --- Utilidades ------------------------------------------------------------
def lempiras(valor):
    return f"L. {float(valor):,.2f}"


def sin_acentos(texto):
    return "".join(c for c in unicodedata.normalize("NFD", texto) if unicodedata.category(c) != "Mn")


def nombre_propio(nombre):
    return " ".join(p.capitalize() for p in nombre.split())


def saludo(r):
    # Siempre neutro (como la carta del 27/09): el nombre no siempre indica si es hombre o mujer.
    return "Estimado(a) señor(a)"


def saldo(r):
    valor = r["total"] if r["grupo"] == "DEMANDADO" else r["monto"]
    return float(valor) if valor else None


# --- Textos ----------------------------------------------------------------
def referencia(r, fin):
    if r["referencia"]:
        return r["referencia"]
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
    if tipo == "certificado":
        return (f"el saldo total adeudado de dichos contratos asciende, según las Certificaciones de Saldos "
                f"al {r['fecha_corte']}, a la cantidad de {lempiras(monto)}, monto que ya comprende capital, "
                "intereses y cargos acumulados")
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
    contrato = "de los contratos antes referidos" if r["referencia"].startswith("Contratos") else "del contrato antes referido"
    return subtitulo, [
        f"Por este medio le comunicamos que, ante el incumplimiento {contrato}, "
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
        Paragraph(f"{saludo(r)} {esc(nombre_propio(r['cliente']))}:", estilo("sa", alineacion=TA_LEFT)),
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
    p(f"{saludo(r)} {nombre_propio(r['cliente'])}:")
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


def formato_tel(numero):
    digitos = "".join(ch for ch in numero if ch.isdigit())
    return f"{digitos[:4]}-{digitos[4:]}" if len(digitos) == 8 else numero


def financiera_mensaje(fin):
    return fin["corto"].replace(" Ceiba", "")


def mensaje_wa(r, fin):
    """Mensaje corto con el mismo formato de la lista del 27/09."""
    palabras = r["cliente"].split()
    if len(palabras) >= 4 and palabras[-2:] == palabras[-4:-2]:  # apellido repetido (p. ej. Mc Lauglyn Mc Lauglyn)
        palabras = palabras[:-2]
    nombre = nombre_propio(" ".join(palabras))
    contrato = "sus contratos" if r["referencia"].startswith("Contratos") else "su contrato"
    if r["grupo"] == "DEMANDADO":
        asunto = f"relacionado con la demanda de {contrato} con {financiera_mensaje(fin)}"
    else:
        asunto = f"de {contrato} con {financiera_mensaje(fin)}"
    return (f"Buenos días, {nombre}. Le hago llegar el requerimiento de pago {asunto}. "
            f"Quedo atento a su comunicación. {FIRMA_MENSAJE}.")


def que_hacer(r, fin):
    """Texto de la columna QUÉ HACER y color de la fila (mismos colores de la lista del 27/09)."""
    motivo = f" ({r['motivo']})" if r.get("motivo") else ""
    if r["accion"] == "NO ENVIAR":
        return f"NO ENVIAR{motivo}", "F8CBAD"
    if r["accion"] == "CONFIRMAR":
        return f"CONFIRMAR CON AMABLE antes{motivo}", "FFF2CC"
    if not r["celular"]:
        return "ENTREGAR EN FÍSICO (no tiene celular)", "FFF2CC"
    if r["whatsapp"] == "NO":
        return f"NO TIENE WHATSAPP: pedir otro número a {fin['corto']} o entregar en físico", "F8CBAD"
    return "ENVIAR", "E2EFDA"


def enlace_wa(r, fin, numero):
    if r["accion"] == "NO ENVIAR" or r["whatsapp"] == "NO":
        return ""
    tel = telefono_wa(numero)
    return f"https://web.whatsapp.com/send?phone={tel}&text={quote(mensaje_wa(r, fin))}" if tel else ""


def registro(filas):
    salida = []
    for n, (r, fin, pdf) in enumerate(filas, start=1):
        texto, _ = que_hacer(r, fin)
        salida.append({
            "id": n, "etapa": ETAPAS[r["grupo"]], "financiera": fin["corto"], "cliente": nombre_propio(r["cliente"]),
            "accion": "ENVIAR" if texto == "ENVIAR" else r["accion"], "que_hacer": texto,
            "observacion": r["observacion"], "saldo": saldo(r), "placa": r["placa"], "contrato": r["prestamo"],
            "pdf": pdf, "pdf_nuevo": True, "mensaje": mensaje_wa(r, fin), "whatsapp": r["whatsapp"],
            "telefonos": [{"numero": formato_tel(r[c]), "wa": enlace_wa(r, fin, r[c])} for c in ("celular", "celular2") if r[c]],
        })
    return salida


def crear_excel(filas, ruta):
    """Lista de envío con el mismo esquema de LISTA_ENVIO_27SEPT.xlsx."""
    wb = Workbook()
    ws = wb.active
    ws.title = "ENVIAR"
    ws.append(["No.", "QUÉ HACER", "Cliente", "Celular", "¿WhatsApp?", "ABRIR CHAT",
               "Mensaje corto (copiar)", "PDF (arrastrar al chat)", "¿Enviado?"])
    for celda in ws[1]:
        celda.font = Font(bold=True, color="FFFFFF")
        celda.fill = PatternFill("solid", fgColor="1F3864")
        celda.alignment = Alignment(wrap_text=True, vertical="center")
    enlace = Font(color="0563C1", underline="single")
    for i, (r, fin, pdf) in enumerate(filas, start=2):
        texto, color = que_hacer(r, fin)
        celular = " / ".join(formato_tel(x) for x in (r["celular"], r["celular2"]) if x)
        link = enlace_wa(r, fin, r["celular"]) if r["whatsapp"] != "NO" else ""
        ws.append([i - 1, texto, nombre_propio(r["cliente"]), celular, r["whatsapp"],
                   "Abrir chat" if link else None, mensaje_wa(r, fin), pdf, "No"])
        if link:
            ws.cell(i, 6).hyperlink = link
            ws.cell(i, 6).font = enlace
        ws.cell(i, 8).hyperlink = f"PDF\\{pdf}"
        for col in range(1, 10):
            ws.cell(i, col).fill = PatternFill("solid", fgColor=color)
            ws.cell(i, col).alignment = Alignment(wrap_text=True, vertical="top")
    for col, ancho in zip("ABCDEFGHI", [5, 34, 30, 22, 11, 12, 70, 40, 10]):
        ws.column_dimensions[col].width = ancho
    ws.freeze_panes = "D2"
    validacion = DataValidation(type="list", formula1='"No,Sí,No tiene WhatsApp,Entregado en físico"')
    ws.add_data_validation(validacion)
    validacion.add(f"I2:I{len(filas) + 1}")

    inst = wb.create_sheet("CÓMO ENVIAR")
    for linea in [
        "1. Haga clic en 'Abrir chat' (se abre en WhatsApp Web con el mensaje ya escrito).",
        "2. Si WhatsApp dice 'no está en WhatsApp', márquelo y pase al siguiente.",
        "3. Si el mensaje no aparece escrito, copie el 'Mensaje corto' y péguelo en el chat.",
        "4. Abra la carpeta PDF y ARRASTRE el PDF de ese cliente (mismo número de fila) al chat; presione Enviar.",
        "5. Ponga 'Sí' en la columna ¿Enviado? y tome captura de pantalla.",
        "HORARIO LEGAL (CNBS 022/2022): domingo 9:00 a.m. a 1:00 p.m.; lunes a sábado 8:00 a.m. a 8:00 p.m.; feriados NO.",
        "Pendiente de Amable: expedientes 7736 y 7738 de Presta Ya (se desistirán): no enviar requerimiento a esas personas.",
    ]:
        inst.append([linea])
    inst.column_dimensions["A"].width = 120

    detalle = wb.create_sheet("DETALLE")
    detalle.append(["No.", "Etapa", "Financiera", "Cliente", "Contrato", "Placa", "Saldo reclamado", "Observaciones"])
    for c in detalle[1]:
        c.font = Font(bold=True)
    for i, (r, fin, pdf) in enumerate(filas, start=1):
        detalle.append([i, ETAPAS[r["grupo"]], fin["corto"], nombre_propio(r["cliente"]), r["prestamo"],
                        r["placa"], saldo(r), r["observacion"]])
        detalle.cell(i + 1, 7).number_format = '"L. "#,##0.00'
    for col, ancho in zip("ABCDEFGH", [5, 20, 18, 34, 16, 26, 16, 80]):
        detalle.column_dimensions[col].width = ancho
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
    pdf, word = SALIDA / "PDF", SALIDA / "WORD"
    pdf.mkdir(parents=True)
    word.mkdir()

    with open(DATOS, encoding="utf-8-sig") as f:
        registros = list(csv.DictReader(f))

    filas = []
    for n, r in enumerate(registros, start=1):
        fin = FINANCIERAS[r["financiera"]]
        base = sin_acentos(f"{n:02d}_Requerimiento_{r['cliente'].replace(' ', '_')}_{fin['corto'].replace(' ', '')}")
        crear_pdf(r, fin, pdf / f"{base}.pdf")
        crear_docx(r, fin, word / f"{base}.docx")
        filas.append((r, fin, f"{base}.pdf"))

    crear_excel(filas, SALIDA / NOMBRE_LISTA)
    unir_pdf([pdf / p for r, _, p in filas if r["accion"] != "NO ENVIAR"], SALIDA / "TODOS_PARA_IMPRIMIR.pdf")
    (SALIDA / "registro.json").write_text(json.dumps(registro(filas), ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(filas)} requerimientos generados en {SALIDA}")


if __name__ == "__main__":
    main()
