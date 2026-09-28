# Sistema de requerimientos de pago – LEX-S

Genera y envía por WhatsApp los requerimientos formales de pago de la cartera de Inversa
(Credi Móvil, Credi Rapid, Presta Ya y Presta Auto). Cada documento lleva el membrete, la firma
y el sello digitales.

## Primera vez (en la PC)

1. Instale Python 3 (marcando «Add Python to PATH»).
2. Doble clic en `INSTALAR_Y_GENERAR.bat`: instala lo necesario y genera los documentos.

## Enviar

Doble clic en `ENVIAR_REQUERIMIENTOS.bat`. Se abre el sistema en el navegador con la lista de
clientes. Para cada uno: botón **WhatsApp** (el mensaje ya va escrito) → **Mostrar PDF en
carpeta** → arrastre el PDF al chat → Enviar → marque **Enviado**. El avance queda guardado en
`datos/estado_envios.json`. También está el Excel `salida/ENVIO_WHATSAPP.xlsx` con los mismos
links.

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
