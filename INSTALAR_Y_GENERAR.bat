@echo off
title INSTALAR SISTEMA (solo la primera vez)
cd /d "%~dp0"
python -m pip install -r requirements.txt
python generar.py
pause
