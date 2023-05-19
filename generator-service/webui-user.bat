@echo off

set PYTHON=
set GIT=
set VENV_DIR=
set COMMANDLINE_ARGS=--api --skip-torch-cuda-test --xformers --opt-split-attention --autolaunch --enable-insecure-extension-access

call webui.bat
