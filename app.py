"""Sistema de envío de requerimientos por WhatsApp (se abre en el navegador).

Uso: doble clic en ENVIAR_REQUERIMIENTOS.bat  (o: python app.py)
Lee salida/registro.json (lo crea generar.py) y guarda el avance en datos/estado_envios.json.
Solo usa la biblioteca estándar de Python.
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


def guardar_estado(clave, estado):
    with BLOQUEO:
        datos = leer_estado()
        if estado == "Pendiente":
            datos.pop(clave, None)
        else:
            datos[clave] = {"estado": estado, "fecha": datetime.now().strftime("%d/%m/%Y %I:%M %p")}
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

    def do_GET(self):
        ruta = urlparse(self.path).path
        if ruta == "/":
            self.responder(PAGINA, "text/html; charset=utf-8")
        elif ruta == "/api/datos":
            filas = json.loads(REGISTRO.read_text(encoding="utf-8"))
            self.responder(json.dumps({"filas": filas, "estado": leer_estado()}, ensure_ascii=False))
        elif ruta.startswith("/pdf/"):
            archivo = (PDFS / unquote(ruta[5:])).resolve()
            if archivo.parent == PDFS.resolve() and archivo.exists():
                self.responder(archivo.read_bytes(), "application/pdf")
            else:
                self.responder("PDF no encontrado (puede ser un PDF del 27/09 en la carpeta anterior).",
                               "text/plain; charset=utf-8", 404)
        else:
            self.responder("No encontrado", "text/plain; charset=utf-8", 404)

    def do_POST(self):
        largo = int(self.headers.get("Content-Length", 0))
        datos = json.loads(self.rfile.read(largo) or b"{}")
        ruta = urlparse(self.path).path
        if ruta == "/api/estado":
            self.responder(json.dumps(guardar_estado(str(datos["clave"]), datos["estado"]), ensure_ascii=False))
        elif ruta == "/api/carpeta":
            self.responder(json.dumps({"ok": mostrar_en_carpeta(datos["pdf"])}))
        else:
            self.responder("No encontrado", "text/plain; charset=utf-8", 404)


PAGINA = r"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>LEX-S | Envío de Requerimientos</title>
<style>
:root{--azul:#1f3a5f;--verde:#1e7d45;--amarillo:#b7791f;--rojo:#b42318;--gris:#6b7280;--fondo:#f4f5f7;--borde:#d9dce1}
*{box-sizing:border-box}body{margin:0;font-family:Segoe UI,Arial,sans-serif;background:var(--fondo);color:#1b1f24}
header{background:var(--azul);color:#fff;padding:14px 20px;display:flex;flex-wrap:wrap;gap:16px;align-items:center;justify-content:space-between}
header h1{font-size:19px;margin:0}header small{opacity:.8}
.cont{display:flex;gap:10px;flex-wrap:wrap}.cont div{background:rgba(255,255,255,.12);padding:6px 12px;border-radius:8px;font-size:13px}
.cont b{font-size:17px;display:block}
.barra{display:flex;flex-wrap:wrap;gap:8px;padding:12px 20px;background:#fff;border-bottom:1px solid var(--borde);position:sticky;top:0;z-index:2}
select,input{padding:7px 9px;border:1px solid var(--borde);border-radius:6px;font-size:14px}input{min-width:220px}
.aviso{margin:12px 20px;padding:10px 14px;background:#fff8e6;border:1px solid #f2d48a;border-radius:8px;font-size:13px}
table{width:calc(100% - 40px);margin:0 20px 40px;border-collapse:collapse;background:#fff;font-size:13.5px}
th{background:#e9edf3;text-align:left;padding:8px;position:sticky;top:57px}
td{padding:8px;border-top:1px solid var(--borde);vertical-align:top}
tr.hecho td{background:#f1f8f3}
.tag{display:inline-block;padding:3px 8px;border-radius:12px;font-size:12px;font-weight:600;color:#fff}
.ENVIAR{background:var(--verde)}.CONFIRMAR,.PEDIR{background:var(--amarillo)}.NO{background:var(--rojo)}.YA{background:var(--gris)}
.obs{color:#555;font-size:12.5px;max-width:360px}
button,a.btn{display:inline-block;margin:2px 2px 2px 0;padding:6px 10px;border-radius:6px;border:1px solid var(--borde);background:#fff;cursor:pointer;font-size:13px;text-decoration:none;color:#1b1f24}
a.btn.wa{background:#25d366;color:#fff;border-color:#25d366;font-weight:600}
.est{font-size:12px;color:var(--verde);font-weight:600}
.saldo{white-space:nowrap}
</style></head><body>
<header><div><h1>LEX-S · Sistema de envío de requerimientos</h1><small>Asesoría &amp; Consultoría — Derecho Empresarial y Políticas Públicas</small></div>
<div class="cont" id="cont"></div></header>
<div class="barra">
<select id="fEtapa"><option value="">Todas las etapas</option><option>Demanda presentada</option><option>Por demandar</option></select>
<select id="fFin"><option value="">Todas las financieras</option></select>
<select id="fAcc"><option value="">Todo</option><option value="ENVIAR">Enviar</option><option value="CONFIRMAR">Confirmar con Amable</option><option value="PEDIR CELULAR">Pedir celular</option><option value="NO ENVIAR">No enviar</option><option value="YA ENVIADO">Ya enviado</option></select>
<select id="fEst"><option value="">Enviados y pendientes</option><option value="pend">Solo pendientes</option><option value="hecho">Solo enviados</option></select>
<input id="fTxt" placeholder="Buscar cliente, placa o contrato">
</div>
<div class="aviso"><b>Cómo enviar:</b> 1) «WhatsApp» abre el chat con el mensaje ya escrito. 2) «Mostrar PDF en carpeta» y arrastre el PDF al chat. 3) Enviar y tome captura. 4) Marque «Enviado».
<b>Horario legal (CNBS 022/2022):</b> domingo 9:00 a.m.–1:00 p.m.; lunes a sábado 8:00 a.m.–8:00 p.m.; feriados no.</div>
<table><thead><tr><th>#</th><th>Qué hacer</th><th>Cliente</th><th>Saldo</th><th>Enviar</th><th>Estado</th></tr></thead><tbody id="cuerpo"></tbody></table>
<script>
let FILAS=[],ESTADO={};
const $=id=>document.getElementById(id);
const clave=f=>String(f.id)+'|'+f.cliente;
const lps=v=>v==null?'Según certificación':'L. '+v.toLocaleString('es-HN',{minimumFractionDigits:2,maximumFractionDigits:2});
const esc=s=>(s||'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function cargar(){const r=await(await fetch('/api/datos')).json();FILAS=r.filas;ESTADO=r.estado;
 const fins=[...new Set(FILAS.map(f=>f.financiera))];$('fFin').innerHTML='<option value="">Todas las financieras</option>'+fins.map(f=>`<option>${f}</option>`).join('');pintar();}
function hecho(f){return f.accion==='YA ENVIADO'||ESTADO[clave(f)];}
function pintar(){
 const e=$('fEtapa').value,fi=$('fFin').value,a=$('fAcc').value,s=$('fEst').value,t=$('fTxt').value.toLowerCase();
 const vis=FILAS.filter(f=>(!e||f.etapa===e)&&(!fi||f.financiera===fi)&&(!a||f.accion===a)&&(!s||(s==='hecho')===!!hecho(f))&&(!t||(f.cliente+' '+f.placa+' '+f.contrato).toLowerCase().includes(t)));
 $('cuerpo').innerHTML=vis.map(f=>{const st=ESTADO[clave(f)];const cls=f.accion.split(' ')[0];
  const tels=f.accion==='YA ENVIADO'?'':f.telefonos.map(x=>x.wa?`<a class="btn wa" target="whatsapp" href="${x.wa}">WhatsApp ${esc(x.numero)}</a>`:`<span class="obs">${esc(x.numero)} (no válido)</span>`).join('');
  const pdf=f.pdf_nuevo?`<a class="btn" target="_blank" href="/pdf/${encodeURIComponent(f.pdf)}">Ver PDF</a><button onclick="carpeta('${esc(f.pdf)}')">Mostrar PDF en carpeta</button>`:`<span class="obs">PDF del 27/09: ${esc(f.pdf)}</span>`;
  return `<tr class="${hecho(f)?'hecho':''}"><td>${f.id}</td><td><span class="tag ${cls}">${esc(f.que_hacer)}</span><div class="obs">${esc(f.etapa)} · ${esc(f.financiera)}</div></td>
  <td><b>${esc(f.cliente)}</b><div class="obs">Contrato ${esc(f.contrato)} · Placa ${esc(f.placa)}</div><div class="obs">${esc(f.observacion)}</div></td>
  <td class="saldo">${lps(f.saldo)}</td><td>${tels}<br>${pdf}<button onclick="copiar(${f.id})">Copiar mensaje</button></td>
  <td>${st?`<div class="est">${esc(st.estado)}<br>${esc(st.fecha)}</div>`:f.accion==='YA ENVIADO'?'<div class="est">Ya enviado</div>':''}
  <button onclick="marcar(${f.id},'Enviado')">Enviado</button><button onclick="marcar(${f.id},'No tiene WhatsApp')">No tiene WhatsApp</button><button onclick="marcar(${f.id},'Entregado en físico')">Entregado en físico</button>${st?`<button onclick="marcar(${f.id},'Pendiente')">Deshacer</button>`:''}</td></tr>`}).join('');
 const act=FILAS.filter(f=>f.accion!=='NO ENVIAR'),env=act.filter(hecho).length;
 $('cont').innerHTML=`<div><b>${FILAS.length}</b>en el sistema</div><div><b>${FILAS.filter(f=>f.etapa==='Demanda presentada').length}</b>demandas presentadas</div><div><b>${FILAS.filter(f=>f.etapa==='Por demandar').length}</b>por demandar</div><div><b>${env}</b>enviados</div><div><b>${act.length-env}</b>pendientes</div>`;}
async function marcar(id,estado){const f=FILAS.find(x=>x.id===id);const r=await(await fetch('/api/estado',{method:'POST',body:JSON.stringify({clave:clave(f),estado})})).json();if(r)ESTADO[clave(f)]=r;else delete ESTADO[clave(f)];pintar();}
async function carpeta(pdf){await fetch('/api/carpeta',{method:'POST',body:JSON.stringify({pdf})});}
function copiar(id){navigator.clipboard.writeText(FILAS.find(x=>x.id===id).mensaje);}
['fEtapa','fFin','fAcc','fEst'].forEach(i=>$(i).onchange=pintar);$('fTxt').oninput=pintar;cargar();
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
