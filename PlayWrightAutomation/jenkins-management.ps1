#!/usr/bin/env powershell
<#
.SYNOPSIS
    Jenkins CI/CD Setup Automation Script
.DESCRIPTION
    Automates common Jenkins setup and maintenance tasks
.AUTHOR
    CI/CD Setup Script
#>

param(
    [string]$Action = "menu"
)

# Color Output
function Write-Success { Write-Host $args -ForegroundColor Green }
function Write-Warning { Write-Host $args -ForegroundColor Yellow }
function Write-Error { Write-Host $args -ForegroundColor Red }
function Write-Info { Write-Host $args -ForegroundColor Cyan }

function Show-Menu {
    Write-Info "`n========== Jenkins CI/CD Management =========="
    Write-Info "1. Start Jenkins Server"
    Write-Info "2. Stop Jenkins Server (if running)"
    Write-Info "3. Get Initial Admin Password"
    Write-Info "4. View Jenkins Home Directory"
    Write-Info "5. Check Node.js Installation"
    Write-Info "6. Install Project Dependencies"
    Write-Info "7. Run Playwright Tests (Regression)"
    Write-Info "8. Run Playwright Tests (Web Only)"
    Write-Info "9. Run Playwright Tests (API Only)"
    Write-Info "10. Generate Allure Report"
    Write-Info "11. View Jenkins Logs"
    Write-Info "12. Check Port 8080 Status"
    Write-Info "13. Show Jenkins URLs"
    Write-Info "14. Exit"
    Write-Info "=============================================="
}

function Start-JenkinsServer {
    Write-Info "Starting Jenkins Server..."
    Write-Warning "Note: Keep this terminal open. Press Ctrl+C to stop Jenkins."
    
    if (Test-Path "C:\Jenkins\jenkins.war") {
        Start-Process cmd.exe -ArgumentList "/k java -jar C:\Jenkins\jenkins.war --httpPort=8080 --enable-future-java"
        Start-Sleep -Seconds 3
        Write-Success "Jenkins is starting. Access it at: http://localhost:8080"
    } else {
        Write-Error "Jenkins WAR file not found at C:\Jenkins\jenkins.war"
    }
}

function Get-AdminPassword {
    $passwordFile = "C:\Users\celva\.jenkins\secrets\initialAdminPassword"
    if (Test-Path $passwordFile) {
        Write-Success "`nInitial Admin Password:"
        Write-Info "========================================"
        $password = Get-Content $passwordFile
        Write-Info $password
        Write-Info "========================================"
        Write-Info "Location: $passwordFile"
    } else {
        Write-Warning "Admin password file not found."
        Write-Info "Jenkins may not be initialized yet."
        Write-Info "Start Jenkins and complete initial setup."
    }
}

function View-JenkinsHome {
    $jenkinsHome = "C:\Users\celva\.jenkins"
    Write-Info "Jenkins Home Directory: $jenkinsHome"
    Write-Info ""
    
    if (Test-Path $jenkinsHome) {
        Get-ChildItem $jenkinsHome | ForEach-Object {
            Write-Info "- $($_.Name)"
        }
    } else {
        Write-Warning "Jenkins home directory not found yet"
    }
}

function Check-NodeJS {
    Write-Info "Checking Node.js Installation..."
    Write-Info ""
    
    try {
        $nodeVersion = node -v
        Write-Success "Node.js: $nodeVersion"
    } catch {
        Write-Error "Node.js not found! Please install from https://nodejs.org"
    }
    
    try {
        $npmVersion = npm -v
        Write-Success "npm: $npmVersion"
    } catch {
        Write-Error "npm not found!"
    }
}

function Install-Dependencies {
    $projectPath = "C:\Users\celva\Downloads\PlayWrightAutomation\PlayWrightAutomation"
    
    Write-Info "Installing project dependencies..."
    
    if (Test-Path "$projectPath\package.json") {
        Push-Location $projectPath
        npm install
        Pop-Location
        Write-Success "Dependencies installed successfully!"
    } else {
        Write-Error "package.json not found at $projectPath"
    }
}

function Run-Tests {
    param([string]$TestType = "regression")
    
    $projectPath = "C:\Users\celva\Downloads\PlayWrightAutomation\PlayWrightAutomation"
    
    Write-Info "Running $TestType tests..."
    Write-Warning "This may take a few minutes..."
    
    if (Test-Path "$projectPath\package.json") {
        Push-Location $projectPath
        npm run $TestType
        Pop-Location
        Write-Success "Tests completed!"
    } else {
        Write-Error "package.json not found at $projectPath"
    }
}

function Generate-AllureReport {
    $projectPath = "C:\Users\celva\Downloads\PlayWrightAutomation\PlayWrightAutomation"
    
    Write-Info "Generating Allure report..."
    
    Push-Location $projectPath
    
    if (Test-Path "allure-results") {
        allure generate allure-results -c -o allure-report
        Write-Success "Allure report generated at: $projectPath\allure-report"
    } else {
        Write-Warning "No test results found. Run tests first."
    }
    
    Pop-Location
}

function View-JenkinsLogs {
    $jenkinsHome = "C:\Users\celva\.jenkins"
    $logFile = "$jenkinsHome\jenkins.log"
    
    Write-Info "Recent Jenkins Logs:"
    Write-Info "===================="
    
    if (Test-Path $logFile) {
        Get-Content $logFile -Tail 50
    } else {
        Write-Warning "Jenkins log file not found"
        Write-Info "Start Jenkins server first"
    }
}

function Check-Port8080 {
    Write-Info "Checking port 8080 status..."
    Write-Info ""
    
    $ports = netstat -ano | findstr :8080
    
    if ($ports) {
        Write-Warning "Port 8080 is in use:"
        Write-Info $ports
    } else {
        Write-Success "Port 8080 is available"
    }
}

function Show-JenkinsURLs {
    Write-Info "`nJenkins URLs:"
    Write-Info "=============================================="
    Write-Info "Dashboard:          http://localhost:8080"
    Write-Info "Manage Jenkins:     http://localhost:8080/manage"
    Write-Info "Manage Plugins:     http://localhost:8080/manage/pluginManager"
    Write-Info "Credentials:        http://localhost:8080/manage/credentials"
    Write-Info "System Config:      http://localhost:8080/manage/configure"
    Write-Info "Pipeline Job:       http://localhost:8080/job/PlayWrightAutomation"
    Write-Info "Build Console:      http://localhost:8080/job/PlayWrightAutomation/lastBuild/console"
    Write-Info "Allure Report:      http://localhost:8080/job/PlayWrightAutomation/allure"
    Write-Info "=============================================="
}

# Main Menu Loop
do {
    Show-Menu
    $choice = Read-Host "Enter your choice (1-14)"
    Write-Info ""
    
    switch ($choice) {
        "1" { Start-JenkinsServer }
        "2" { Write-Info "To stop Jenkins, close the Jenkins terminal window" }
        "3" { Get-AdminPassword }
        "4" { View-JenkinsHome }
        "5" { Check-NodeJS }
        "6" { Install-Dependencies }
        "7" { Run-Tests -TestType "regression" }
        "8" { Run-Tests -TestType "webTests" }
        "9" { Run-Tests -TestType "APITests" }
        "10" { Generate-AllureReport }
        "11" { View-JenkinsLogs }
        "12" { Check-Port8080 }
        "13" { Show-JenkinsURLs }
        "14" { 
            Write-Success "Exiting..."
            exit
        }
        default { Write-Error "Invalid choice. Please try again." }
    }
    
    Read-Host "Press Enter to continue..."
} while ($true)
