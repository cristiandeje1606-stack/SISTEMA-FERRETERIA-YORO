"""Envío automático por WhatsApp Web (mensaje + PDF) usando Playwright.

La primera vez se abre Chrome con WhatsApp Web para escanear el código QR; la sesión queda
guardada en datos/whatsapp_sesion y ya no se vuelve a pedir.
Toda la automatización corre en un solo hilo (Playwright síncrono no admite varios hilos).
"""
import os
import queue
import random
import threading
import time
from pathlib import Path
from urllib.parse import quote

BASE = Path(__file__).parent
SESION = BASE / "datos" / "whatsapp_sesion"
URL = os.environ.get("WHATSAPP_URL", "https://web.whatsapp.com")  # se cambia solo para pruebas

CAJA_MENSAJE = "footer div[contenteditable='true']"
BOTON_ADJUNTAR = ", ".join([
    "button[title='Adjuntar']", "button[title='Attach']", "div[title='Adjuntar']", "div[title='Attach']",
    "span[data-icon='plus-rounded']", "span[data-icon='plus']", "span[data-icon='clip']",
])
BOTON_ENVIAR = ", ".join([
    "div[role='button'][aria-label='Enviar']", "div[role='button'][aria-label='Send']",
    "button[aria-label='Enviar']", "button[aria-label='Send']",
    "span[data-icon='send']", "span[data-icon='wds-ic-send-filled']",
])
NUMERO_INVALIDO = ("no es válido", "not valid", "invalid", "no está en WhatsApp")
PAUSA_ENTRE_ENVIOS = (25, 45)  # segundos, para no parecer envío masivo


class WhatsApp:
    def __init__(self, al_terminar):
        """al_terminar(clave, estado, detalle) se llama con el resultado de cada envío."""
        self.al_terminar = al_terminar
        self.cola = queue.Queue()
        self.estado = "Desconectado"
        self.actual = ""
        self.pendientes = 0
        self.detener_lote = False
        threading.Thread(target=self._trabajar, daemon=True).start()

    # --- API usada por app.py ---------------------------------------------
    def conectar(self):
        self.cola.put(("conectar", None))

    def enviar(self, trabajos):
        """trabajos: lista de dicts con clave, telefonos (lista '504########'), mensaje, pdf, cliente."""
        self.detener_lote = False
        for t in trabajos:
            self.pendientes += 1
            self.cola.put(("enviar", t))

    def detener(self):
        self.detener_lote = True

    def resumen(self):
        return {"estado": self.estado, "actual": self.actual, "pendientes": self.pendientes}

    # --- Hilo de trabajo ---------------------------------------------------
    def _trabajar(self):
        from playwright.sync_api import sync_playwright

        self.pw = sync_playwright().start()
        self.pagina = None
        primero = True
        while True:
            accion, dato = self.cola.get()
            if accion == "conectar":
                self._abrir()
                continue
            self.pendientes -= 1
            if self.detener_lote:
                self.al_terminar(dato["clave"], None, "Lote detenido")
                continue
            if not primero:
                espera = random.randint(*PAUSA_ENTRE_ENVIOS)
                self.actual = f"Pausa de {espera} s antes de {dato['cliente']}"
                time.sleep(espera)
            primero = False
            self.actual = f"Enviando a {dato['cliente']}"
            try:
                self._abrir()
                estado, detalle = self._enviar_uno(dato)
            except Exception as error:  # noqa: BLE001 - cualquier fallo se reporta en pantalla
                estado, detalle = "Error", str(error).splitlines()[0][:200]
            self.al_terminar(dato["clave"], estado, detalle)
            self.actual = ""

    def _abrir(self):
        if self.pagina and not self.pagina.is_closed():
            return
        SESION.mkdir(parents=True, exist_ok=True)
        opciones = dict(user_data_dir=str(SESION), headless=bool(os.environ.get("WHATSAPP_HEADLESS")),
                        viewport={"width": 1280, "height": 860})
        if os.environ.get("WHATSAPP_CHROME"):
            opciones["executable_path"] = os.environ["WHATSAPP_CHROME"]
        try:
            if "executable_path" in opciones:
                raise RuntimeError("usar el navegador indicado")
            self.contexto = self.pw.chromium.launch_persistent_context(channel="chrome", **opciones)
        except Exception:  # noqa: BLE001 - si no hay Chrome instalado se usa el Chromium de Playwright
            self.contexto = self.pw.chromium.launch_persistent_context(**opciones)
        self.pagina = self.contexto.pages[0] if self.contexto.pages else self.contexto.new_page()
        self.pagina.goto(f"{URL}/")
        self.estado = "Escanee el código QR en la ventana de WhatsApp"
        self.pagina.wait_for_selector("#side, div[aria-label='Lista de chats'], div[aria-label='Chat list']",
                                      timeout=0)
        self.estado = "Conectado"

    def _enviar_uno(self, t):
        p = self.pagina
        ultimo_error = "Número no válido o sin WhatsApp"
        for telefono in t["telefonos"]:
            p.goto(f"{URL}/send?phone={telefono}&text={quote(t['mensaje'])}")
            resultado = self._esperar_chat()
            if resultado != "ok":
                ultimo_error = resultado
                continue
            caja = p.locator(CAJA_MENSAJE).last
            caja.click()
            time.sleep(1)
            if caja.inner_text().strip():
                p.keyboard.press("Enter")
            else:
                caja.type(t["mensaje"], delay=5)
                p.keyboard.press("Enter")
            time.sleep(2)
            self._adjuntar(t["pdf"])
            self._confirmar_envio(Path(t["pdf"]).name)
            return "Enviado", f"Enviado al {telefono[3:7]}-{telefono[7:]}"
        return "No tiene WhatsApp", ultimo_error

    def _esperar_chat(self):
        p = self.pagina
        limite = time.time() + 45
        while time.time() < limite:
            if p.locator(CAJA_MENSAJE).count():
                return "ok"
            dialogo = p.locator("div[role='dialog']")
            if dialogo.count():
                texto = dialogo.first.inner_text().lower()
                if any(frase.lower() in texto for frase in NUMERO_INVALIDO):
                    boton = dialogo.locator("button, div[role='button']")
                    if boton.count():
                        boton.first.click()
                    return "Número no válido o sin WhatsApp"
            time.sleep(1)
        return "WhatsApp no abrió el chat a tiempo"

    def _adjuntar(self, ruta_pdf):
        p = self.pagina
        p.locator(BOTON_ADJUNTAR).first.click()
        time.sleep(1)
        entradas = p.locator("input[type='file']")
        documento = None
        for i in range(entradas.count()):
            acepta = entradas.nth(i).get_attribute("accept") or ""
            if "image" not in acepta:
                documento = entradas.nth(i)
                break
        (documento or entradas.first).set_input_files(ruta_pdf)
        p.wait_for_selector(BOTON_ENVIAR, timeout=30000)
        time.sleep(1.5)
        p.locator(BOTON_ENVIAR).last.click()

    def _confirmar_envio(self, nombre_pdf):
        p = self.pagina
        p.locator(f"#main :text('{nombre_pdf[:40]}')").last.wait_for(timeout=60000)
        limite = time.time() + 90
        while time.time() < limite:
            if not p.locator("#main span[data-icon='msg-time']").count():
                return
            time.sleep(1)
        raise RuntimeError("El PDF quedó con el reloj (sin confirmar). Revise el chat.")
