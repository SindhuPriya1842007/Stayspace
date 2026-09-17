@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (echo Node.js is not installed. Please install Node.js first.&pause&exit /b 1)
echo Starting StayScape...
node server.cjs
pause
