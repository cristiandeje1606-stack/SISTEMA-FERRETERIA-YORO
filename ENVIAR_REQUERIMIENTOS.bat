@echo off
title SISTEMA DE ENVIO DE REQUERIMIENTOS - NO CIERRE ESTA VENTANA
cd /d "%~dp0sistema"
where python >nul 2>nul || (echo Falta Python. Instalelo desde python.org marcando "Add Python to PATH" y vuelva a abrir este archivo. & pause & exit /b)
if not exist "datos\instalado.txt" (
  echo Instalando el sistema por primera vez, espere unos minutos...
  python -m pip install -q -r requirements.txt
  python -m playwright install chromium
  echo ok> "datos\instalado.txt"
)
if not exist "salida\registro.json" python generar.py
python app.py
pause
