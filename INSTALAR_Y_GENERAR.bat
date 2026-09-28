@echo off
title INSTALAR SISTEMA (solo la primera vez)
cd /d "%~dp0"
python -m pip install -r requirements.txt
python -m playwright install chromium
python generar.py
echo.
echo LISTO. Ahora abra ENVIAR_REQUERIMIENTOS.bat
pause
