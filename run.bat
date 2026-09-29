@echo off
TITLE CoalMine360 Launcher
echo ========================================================
echo   CoalMine360 -- AI-Powered Smart Governance Platform
echo   Smart India Hackathon 2026 Problem Statement PS 26024
echo   Eastern Coal Operations Ltd.
echo ========================================================
echo.

echo [1/2] Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "CoalMine360 Backend" cmd /k "cd /d %~dp0backend && C:\Users\NAGARJUNA\anaconda3\python.exe -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting React Vite Frontend on http://127.0.0.1:5173 ...
start "CoalMine360 Frontend" cmd /k "cd /d %~dp0frontend && npx vite --host 127.0.0.1 --port 5173"

echo.
echo ========================================================
echo   Services Launched!
echo   Web App URL : http://127.0.0.1:5173/
echo   API Docs URL: http://127.0.0.1:8000/docs
echo ========================================================
echo.
pause
