@echo off
echo ========================================
echo   Expense Tracker - System Startup
echo ========================================
echo.

:: 1. Clear ports to prevent "Port already in use" errors
echo [1/3] Clearing ports (8080, 5173-5178)...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8080') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5175') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5176') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5177') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5178') do taskkill /f /pid %%a >nul 2>&1

:: 2. Start Backend using local Maven
echo [2/3] Starting Backend (Spring Boot)...
start "Expense Tracker Backend" cmd /k "cd backend && bin\mvn.cmd spring-boot:run"

:: 3. Start Frontend
echo [3/3] Starting Frontend (React)...
:: Note: Running via cmd /k bypasses PowerShell execution policy issues
start "Expense Tracker Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Both windows are opening now.
echo   - Backend: http://localhost:8080
echo   - Frontend: http://localhost:5178 (approx)
echo ========================================
echo.
pause
