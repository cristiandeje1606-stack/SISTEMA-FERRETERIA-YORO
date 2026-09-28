"""Sistema de envío de requerimientos por WhatsApp (se abre en el navegador).

Uso: doble clic en ENVIAR_REQUERIMIENTOS.bat  (o: python app.py)
Lee salida/registro.json (lo crea generar.py) y guarda el avance en datos/estado_envios.json.
El botón ENVIAR manda el mensaje y el PDF por WhatsApp Web de forma automática (whatsapp.py).
"""
import json
import os
import platform
import subprocess
import threading
import webbrowser
from datetime import datetime
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlparse

BASE = Path(__file__).parent
REGISTRO = BASE / "salida" / "registro.json"
PDFS = BASE / "salida" / "PDF"
ESTADO = BASE / "datos" / "estado_envios.json"
PUERTO = 8765
BLOQUEO = threading.Lock()


def leer_estado():
    try:
        return json.loads(ESTADO.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def guardar_estado(clave, estado, detalle=""):
    with BLOQUEO:
        datos = leer_estado()
        if estado == "Pendiente":
            datos.pop(clave, None)
        elif estado:
            datos[clave] = {"estado": estado, "detalle": detalle,
                            "fecha": datetime.now().strftime("%d/%m/%Y %I:%M %p")}
        ESTADO.parent.mkdir(exist_ok=True)
        ESTADO.write_text(json.dumps(datos, ensure_ascii=False, indent=1), encoding="utf-8")
        return datos.get(clave)


def mostrar_en_carpeta(pdf):
    ruta = PDFS / pdf
    if not ruta.exists():
        return False
    if platform.system() == "Windows":
        subprocess.Popen(["explorer", "/select,", str(ruta)])
    elif platform.system() == "Darwin":
        subprocess.Popen(["open", "-R", str(ruta)])
    else:
        subprocess.Popen(["xdg-open", str(PDFS)])
    return True


def en_horario_legal(ahora=None):
    """CNBS 022/2022: domingo 9:00-13:00; lunes a sábado 8:00-20:00 (los feriados los controla el usuario)."""
    ahora = ahora or datetime.now()
    hora = ahora.hour + ahora.minute / 60
    if ahora.weekday() == 6:
        return 9 <= hora < 13
    return 8 <= hora < 20


def leer_filas():
    return json.loads(REGISTRO.read_text(encoding="utf-8"))


def clave(fila):
    return f"{fila['id']}|{fila['cliente']}"


def trabajo(fila):
    telefonos = []
    for t in fila["telefonos"]:
        digitos = "".join(c for c in t["numero"] if c.isdigit())
        if len(digitos) == 8:
            telefonos.append("504" + digitos)
    return {"clave": clave(fila), "cliente": fila["cliente"], "telefonos": telefonos,
            "mensaje": fila["mensaje"], "pdf": str(PDFS / fila["pdf"])}


def se_puede_enviar(fila):
    return fila["que_hacer"] == "ENVIAR" and fila["whatsapp"] != "NO" and trabajo(fila)["telefonos"]


WHATSAPP = None


def whatsapp():
    global WHATSAPP
    if WHATSAPP is None:
        from whatsapp import WhatsApp
        WHATSAPP = WhatsApp(lambda c, estado, detalle: guardar_estado(c, estado, detalle))
    return WHATSAPP


class Manejador(BaseHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def responder(self, cuerpo, tipo="application/json; charset=utf-8", codigo=200):
        datos = cuerpo if isinstance(cuerpo, bytes) else cuerpo.encode("utf-8")
        self.send_response(codigo)
        self.send_header("Content-Type", tipo)
        self.send_header("Content-Length", str(len(datos)))
        self.end_headers()
        self.wfile.write(datos)

    def json(self, datos):
        self.responder(json.dumps(datos, ensure_ascii=False))

    def do_GET(self):
        ruta = urlparse(self.path).path
        if ruta == "/":
            self.responder(PAGINA, "text/html; charset=utf-8")
        elif ruta == "/api/datos":
            filas = leer_filas()
            for f in filas:
                f["enviable"] = bool(se_puede_enviar(f))
            self.json({"filas": filas, "estado": leer_estado(), "horario": en_horario_legal(),
                       "whatsapp": WHATSAPP.resumen() if WHATSAPP else {"estado": "Desconectado", "actual": "", "pendientes": 0}})
        elif ruta.startswith("/pdf/"):
            archivo = (PDFS / unquote(ruta[5:])).resolve()
            if archivo.parent == PDFS.resolve() and archivo.exists():
                self.responder(archivo.read_bytes(), "application/pdf")
            else:
                self.responder("PDF no encontrado", "text/plain; charset=utf-8", 404)
        else:
            self.responder("No encontrado", "text/plain; charset=utf-8", 404)

    def do_POST(self):
        largo = int(self.headers.get("Content-Length", 0))
        datos = json.loads(self.rfile.read(largo) or b"{}")
        ruta = urlparse(self.path).path
        if ruta == "/api/estado":
            self.json(guardar_estado(str(datos["clave"]), datos["estado"]))
        elif ruta == "/api/carpeta":
            self.json({"ok": mostrar_en_carpeta(datos["pdf"])})
        elif ruta == "/api/conectar":
            whatsapp().conectar()
            self.json({"ok": True})
        elif ruta == "/api/detener":
            if WHATSAPP:
                WHATSAPP.detener()
            self.json({"ok": True})
        elif ruta == "/api/enviar":
            if not en_horario_legal() and not datos.get("fuera_de_horario"):
                self.json({"ok": False, "error": "Fuera del horario legal de cobro (CNBS 022/2022)."})
                return
            estado = leer_estado()
            filas = {f["id"]: f for f in leer_filas()}
            elegidas = [filas[i] for i in datos["ids"] if i in filas]
            lote = [trabajo(f) for f in elegidas
                    if se_puede_enviar(f) and estado.get(clave(f), {}).get("estado") != "Enviado"]
            for t in lote:
                guardar_estado(t["clave"], "En cola")
            whatsapp().enviar(lote)
            self.json({"ok": True, "en_cola": len(lote)})
        elif ruta == "/api/prueba":
            digitos = "".join(c for c in datos.get("numero", "") if c.isdigit())
            muestra = next(f for f in leer_filas() if se_puede_enviar(f))
            if len(digitos) != 8:
                self.json({"ok": False, "error": "Escriba un celular de 8 dígitos."})
                return
            t = trabajo(muestra)
            t.update(clave="PRUEBA", cliente="PRUEBA (su número)", telefonos=["504" + digitos],
                     mensaje="PRUEBA DEL SISTEMA LEX-S. " + muestra["mensaje"])
            whatsapp().enviar([t])
            self.json({"ok": True})
        else:
            self.responder("No encontrado", "text/plain; charset=utf-8", 404)


PAGINA = r"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>LEX-S | Envío de Requerimientos</title>
<style>
:root{--azul:#1f3864;--verde:#1e7d45;--amarillo:#b7791f;--rojo:#b42318;--gris:#6b7280;--fondo:#f4f5f7;--borde:#d9dce1}
*{box-sizing:border-box}body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:var(--fondo);color:#1b1f24}
header{background:var(--azul);color:#fff;padding:14px 20px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
header h1{font-size:19px;margin:0}header small{opacity:.8}
.cont{display:flex;gap:10px;flex-wrap:wrap}.cont div{background:rgba(255,255,255,.12);padding:6px 12px;border-radius:8px;font-size:13px}
.cont b{font-size:17px;display:block}
.panel{display:flex;flex-wrap:wrap;gap:10px;align-items:center;padding:12px 20px;background:#fff;border-bottom:1px solid var(--borde)}
.panel .wa{font-size:15px;padding:10px 16px}
#estadoWa{font-weight:600}
.barra{display:flex;flex-wrap:wrap;gap:8px;padding:10px 20px;background:#fff;border-bottom:1px solid var(--borde);position:sticky;top:0;z-index:2}
select,input{padding:7px 9px;border:1px solid var(--borde);border-radius:6px;font-size:14px}
.aviso{margin:12px 20px;padding:10px 14px;background:#fff8e6;border:1px solid #f2d48a;border-radius:8px;font-size:13px}
table{width:calc(100% - 40px);margin:0 20px 40px;border-collapse:collapse;background:#fff;font-size:13.5px}
th{background:#e9edf3;text-align:left;padding:8px;position:sticky;top:52px}
td{padding:8px;border-top:1px solid var(--borde);vertical-align:top}
tr.ENVIAR td{background:#e2efda}tr.AMARILLO td{background:#fff2cc}tr.ROJO td{background:#f8cbad}tr.hecho td{background:#eef1f4;color:#555}
.obs{color:#555;font-size:12.5px;max-width:380px}
button,a.btn{display:inline-block;margin:2px 2px 2px 0;padding:6px 10px;border-radius:6px;border:1px solid var(--borde);background:#fff;cursor:pointer;font-size:13px;text-decoration:none;color:#1b1f24}
button.wa{background:#25d366;color:#fff;border-color:#1da851;font-weight:700}
button.wa:disabled{background:#b9c2bd;border-color:#b9c2bd;cursor:not-allowed}
button.paso{background:#1f3864;color:#fff;border-color:#1f3864;font-weight:700;font-size:15px;padding:10px 16px}
button.alto{background:#b42318;color:#fff;border-color:#b42318}
.est{font-weight:700}.Enviado{color:var(--verde)}.Error,.No{color:var(--rojo)}.cola{color:var(--amarillo)}
</style></head><body>
<header><div><h1>LEX-S · Sistema de envío de requerimientos</h1><small>Asesoría &amp; Consultoría — Derecho Empresarial y Políticas Públicas</small></div>
<div class="cont" id="cont"></div></header>
<div class="panel">
<button class="paso" onclick="conectar()">1. CONECTAR WHATSAPP</button>
<button class="wa" onclick="enviarVerdes()">2. ENVIAR TODOS LOS VERDES</button>
<button class="alto" onclick="detener()">Detener</button>
<span>WhatsApp: <span id="estadoWa">Desconectado</span></span> <span id="actual" class="obs"></span>
<span style="margin-left:auto">Prueba: <input id="miNumero" placeholder="Su celular" size="10"><button onclick="prueba()">Enviarme una prueba</button></span>
</div>
<div class="barra">
<select id="fEtapa"><option value="">Todas las etapas</option><option>Demanda presentada</option><option>Por demandar</option></select>
<select id="fFin"><option value="">Todas las financieras</option></select>
<select id="fEst"><option value="">Todos</option><option value="pend">Solo pendientes</option><option value="hecho">Solo enviados</option></select>
<input id="fTxt" placeholder="Buscar cliente o placa">
</div>
<div class="aviso">Primera vez: «Conectar WhatsApp» y escanee el código QR con el celular del bufete (Dispositivos vinculados). Luego «ENVIAR» en cada fila o «ENVIAR TODOS LOS VERDES»: el sistema escribe el mensaje, adjunta el PDF y lo envía solo, con pausas de 25–45 segundos entre clientes. No cierre la ventana de Chrome que se abre.
<b>Horario legal (CNBS 022/2022):</b> domingo 9:00 a.m.–1:00 p.m.; lunes a sábado 8:00 a.m.–8:00 p.m.; feriados no.</div>
<table><thead><tr><th>#</th><th>Qué hacer</th><th>Cliente</th><th>Celular</th><th>Enviar</th><th>Estado</th></tr></thead><tbody id="cuerpo"></tbody></table>
<script>
let D={filas:[],estado:{}};
const $=id=>document.getElementById(id);
const clave=f=>String(f.id)+'|'+f.cliente;
const esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const post=(u,b)=>fetch(u,{method:'POST',body:JSON.stringify(b||{})}).then(r=>r.json());
function color(f){if(f.que_hacer==='ENVIAR')return 'ENVIAR';return f.que_hacer.startsWith('NO')?'ROJO':'AMARILLO';}
function st(f){return D.estado[clave(f)];}
async function cargar(){D=await(await fetch('/api/datos')).json();
 const sel=$('fFin');if(sel.options.length<2){[...new Set(D.filas.map(f=>f.financiera))].forEach(x=>sel.add(new Option(x,x)));}
 $('estadoWa').textContent=D.whatsapp.estado;$('actual').textContent=D.whatsapp.actual+(D.whatsapp.pendientes?` · en cola: ${D.whatsapp.pendientes}`:'');pintar();}
function pintar(){
 const e=$('fEtapa').value,fi=$('fFin').value,s=$('fEst').value,t=$('fTxt').value.toLowerCase();
 const vis=D.filas.filter(f=>{const h=(st(f)||{}).estado==='Enviado';return(!e||f.etapa===e)&&(!fi||f.financiera===fi)&&(!s||(s==='hecho')===h)&&(!t||(f.cliente+' '+f.placa).toLowerCase().includes(t));});
 $('cuerpo').innerHTML=vis.map(f=>{const x=st(f)||{};const h=x.estado==='Enviado';
  const cls=x.estado==='En cola'?'cola':(x.estado||'').split(' ')[0];
  return `<tr class="${h?'hecho':color(f)}"><td>${f.id}</td><td><b>${esc(f.que_hacer)}</b><div class="obs">${esc(f.etapa)} · ${esc(f.financiera)}</div></td>
  <td><b>${esc(f.cliente)}</b><div class="obs">${esc(f.observacion)}</div></td>
  <td>${f.telefonos.map(x=>esc(x.numero)).join('<br>')||'—'}<div class="obs">WhatsApp: ${esc(f.whatsapp)}</div></td>
  <td><button class="wa" ${f.enviable&&!h&&x.estado!=='En cola'?'':'disabled'} onclick="enviar([${f.id}])">ENVIAR</button><br>
  <a class="btn" target="_blank" href="/pdf/${encodeURIComponent(f.pdf)}">Ver PDF</a></td>
  <td>${x.estado?`<div class="est ${cls}">${esc(x.estado)}</div><div class="obs">${esc(x.detalle||'')} ${esc(x.fecha||'')}</div>`:'<span class="obs">Pendiente</span>'}
  ${x.estado&&x.estado!=='En cola'?`<button onclick="marcar(${f.id},'Pendiente')">Reiniciar</button>`:''}
  ${!h?`<button onclick="marcar(${f.id},'Entregado en físico')">Entregado en físico</button>`:''}</td></tr>`}).join('');
 const env=D.filas.filter(f=>(st(f)||{}).estado==='Enviado').length,verdes=D.filas.filter(f=>f.enviable).length;
 $('cont').innerHTML=`<div><b>${D.filas.length}</b>en el sistema</div><div><b>${verdes}</b>listos (verdes)</div><div><b>${env}</b>enviados</div><div><b>${D.filas.length-env}</b>pendientes</div><div><b>${D.horario?'Sí':'No'}</b>en horario legal</div>`;}
async function enviar(ids){let r=await post('/api/enviar',{ids});
 if(!r.ok&&confirm(r.error+'\n\n¿Enviar de todos modos?'))r=await post('/api/enviar',{ids,fuera_de_horario:true});
 if(r.ok&&!r.en_cola)alert('Nada que enviar (ya enviados o sin número válido).');cargar();}
function enviarVerdes(){const ids=D.filas.filter(f=>f.enviable&&!['Enviado','En cola'].includes((st(f)||{}).estado)).map(f=>f.id);
 if(!ids.length){alert('No hay verdes pendientes.');return;}
 if(confirm(`Se enviarán ${ids.length} requerimientos (mensaje + PDF), uno por uno, con pausas de 25–45 s. ¿Continuar?`))enviar(ids);}
async function marcar(id,estado){const f=D.filas.find(x=>x.id===id);await post('/api/estado',{clave:clave(f),estado});cargar();}
async function conectar(){await post('/api/conectar');cargar();}
async function detener(){await post('/api/detener');cargar();}
async function prueba(){const r=await post('/api/prueba',{numero:$('miNumero').value});if(!r.ok)alert(r.error);else alert('Prueba en cola: revise su WhatsApp.');cargar();}
['fEtapa','fFin','fEst'].forEach(i=>$(i).onchange=pintar);$('fTxt').oninput=pintar;cargar();setInterval(cargar,3000);
</script></body></html>"""


def main():
    if not REGISTRO.exists():
        print("Falta salida/registro.json: ejecute primero  python generar.py")
        return
    servidor = ThreadingHTTPServer(("127.0.0.1", PUERTO), Manejador)
    url = f"http://127.0.0.1:{PUERTO}/"
    print(f"Sistema abierto en {url}  (no cierre esta ventana mientras envía)")
    if not os.environ.get("SIN_NAVEGADOR"):
        threading.Timer(1, webbrowser.open, [url]).start()
    try:
        servidor.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
