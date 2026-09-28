# Requerimientos de pago – LEX-S

Genera, para cada deudor de la cartera, el **Requerimiento Formal de Pago previo a la vía judicial**
(Word y PDF), un PDF único para imprimir y el Excel **ENVIO_WHATSAPP.xlsx**. En ese Excel, cada cliente
tiene un link que abre su chat de WhatsApp con el mensaje ya escrito.

## Uso

```
pip install -r requirements.txt
python generar.py
```

- **Entrada:** `datos/cartera.csv` (una fila por deudor). La columna `accion` acepta `ENVIAR`,
  `CONFIRMAR`, `NO ENVIAR` o `PEDIR CELULAR`. La columna `tipo_monto` acepta `capital`,
  `cancelacion`, `mora` o `sin_monto`.
- **Salida:** `salida/pdf/`, `salida/word/`, `salida/TODOS_PARA_IMPRIMIR.pdf` y
  `salida/ENVIO_WHATSAPP.xlsx`.
- La fecha del documento, la fecha límite y el firmante se cambian al inicio de `generar.py`.

## Firma y sello digital

Firme y selle una hoja en blanco, tómele foto o escanéela y recorte cada imagen. Guárdelas como:

- `recursos/firma.png`
- `recursos/sello.png`
- `recursos/membrete.png` (opcional, el encabezado del bufete)

Vuelva a ejecutar `python generar.py`. Todos los requerimientos salen firmados y sellados. Si no
están las imágenes, el documento deja la línea para firmar a mano.

## Privacidad

El repositorio es público. `datos/` y `salida/` están en `.gitignore`, así que los nombres,
celulares y saldos de los deudores nunca se suben a GitHub.
