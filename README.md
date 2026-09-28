# Sistema de requerimientos de pago – LEX-S

Genera y envía por WhatsApp los requerimientos formales de pago de la cartera de Inversa
(Credi Móvil, Credi Rapid, Presta Ya y Presta Auto). Cada documento lleva el membrete, la firma
y el sello digitales.

## Primera vez (en la PC)

1. Instale Python 3 (marcando «Add Python to PATH»).
2. Doble clic en `INSTALAR_Y_GENERAR.bat`: instala lo necesario y genera los documentos.

## Enviar (automático)

1. Doble clic en `ENVIAR_REQUERIMIENTOS.bat`: se abre el sistema en el navegador.
2. **Conectar WhatsApp**: se abre Chrome con WhatsApp Web; escanee el QR con el celular del bufete
   (Dispositivos vinculados). Solo la primera vez; la sesión queda guardada.
3. **Enviarme una prueba** a su propio número para ver cómo llega.
4. **ENVIAR** en cada fila, o **ENVIAR TODOS LOS VERDES**: el sistema abre el chat, envía el
   mensaje, adjunta el PDF, confirma que salió y marca «Enviado». Deja 25–45 segundos entre
   clientes. Si el primer número no tiene WhatsApp, prueba el segundo.

Solo se envían las filas verdes (ENVIAR). Fuera del horario legal (CNBS 022/2022) pide
confirmación. También queda `salida/LISTA_ENVIO_28SEPT.xlsx` para envío manual.

## Los dos tipos de requerimiento

- **Demanda presentada** (44 demandas presentadas el 07/08/2026 en proceso abreviado): informa
  la demanda, el saldo reclamado y la medida de secuestro (arts. 616–619 CPC; arts. 1346, 1351 y
  1360 del Código Civil). Ofrece pagar o hacer un arreglo antes de que el proceso siga avanzando.
- **Por demandar** (nueva asignación): último requerimiento previo a la vía judicial
  (arts. 1351, 1352, 1356 y 1361 del Código Civil).

## Cambiar datos

- Clientes, celulares, montos y qué hacer con cada uno: `datos/cartera.csv`.
- Fecha del documento y fecha límite: al inicio de `generar.py`.
- Después de cambiar algo, ejecute `python generar.py` otra vez.

## Privacidad

Este repositorio es público. `datos/`, `salida/` y las imágenes de `recursos/` (firma y sello)
están en `.gitignore` y nunca se suben a GitHub.
