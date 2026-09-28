@echo off
title SISTEMA DE ENVIO DE REQUERIMIENTOS - NO CIERRE ESTA VENTANA
cd /d "%~dp0"
if not exist "salida\registro.json" python generar.py
python app.py
pause
