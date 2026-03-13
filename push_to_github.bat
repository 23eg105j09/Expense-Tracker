@echo off
echo ========================================
echo   Pushing Expense Tracker to GitHub
echo ========================================
echo.

:: Check if git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is still not recognized. 
    echo Please install it from https://git-scm.com/download/win
    echo then close and reopen this window.
    pause
    exit /b
)

echo [1/5] Initializing Git...
git init

echo [2/5] Adding files...
git add .

echo [3/5] Committing changes...
git commit -m "Initial commit: Expense Tracker with Monthly Summary"

echo [4/5] Setting up remote...
git branch -M main
git remote add origin https://github.com/23eg105j09/Expense-Tracker.git

echo [5/5] Pushing to GitHub...
echo (A login window may appear, please follow the prompts)
git push -u origin main

echo.
echo ========================================
echo   Project successfully pushed!
echo ========================================
echo.
pause
