@echo off

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--nowebui --xformers --opt-split-attention --autolaunch --enable-insecure-extension-access

call webui.bat
