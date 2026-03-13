# Expense Tracker - GitHub Push Script (PowerShell)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pushing Expense Tracker to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 1. Try to find Git
$gitPaths = @(
    "git", 
    "C:\Program Files\Git\cmd\git.exe",
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\cmd\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe"
)

$foundGit = $null
foreach ($path in $gitPaths) {
    if (Get-Command $path -ErrorAction SilentlyContinue) {
        $foundGit = $path
        break
    }
}

if (-not $foundGit) {
    Write-Host "[ERROR] Git could not be found!" -ForegroundColor Red
    Write-Host "Please ensure Git is installed from: https://git-scm.com/download/win"
    Pause
    return
}

# 2. Check for Git Identity
$userName = & $foundGit config user.name
$userEmail = & $foundGit config user.email

if (-not $userName -or -not $userEmail) {
    Write-Host "[IMPORTANT] Git identity not found!" -ForegroundColor Yellow
    Write-Host "Git needs your name and email to save your changes."
    
    if (-not $userName) {
        $userName = Read-Host "Enter your Name (e.g., John Doe)"
        & $foundGit config --global user.name "$userName"
    }
    
    if (-not $userEmail) {
        $userEmail = Read-Host "Enter your Email (e.g., john@example.com)"
        & $foundGit config --global user.email "$userEmail"
    }
    Write-Host "Identity set successfully!`n" -ForegroundColor Green
}

# 3. Git Operations
Write-Host "[1/5] Initializing Git..."
& $foundGit init

Write-Host "[2/5] Adding files..."
& $foundGit add .

Write-Host "[3/5] Committing changes..."
$commitMsg = "Initial commit: Expense Tracker with Monthly Summary"
& $foundGit commit -m "$commitMsg"

Write-Host "[4/5] Setting up remote..."
& $foundGit remote remove origin 2>$null
& $foundGit branch -M main
& $foundGit remote add origin https://github.com/23eg105j09/Expense-Tracker.git

Write-Host "[5/5] Pushing to GitHub..."
Write-Host "(A login window may appear, please follow the prompts)" -ForegroundColor Yellow
& $foundGit push -u origin main

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Project successfully pushed!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Pause
