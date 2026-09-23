<#
  Clones (if needed) and starts the Movies app SUT on http://localhost:3000
#>
$ErrorActionPreference = "Stop"

$AppDir = if ($env:MOVIES_APP_DIR) { $env:MOVIES_APP_DIR } else { "../playwright-movies-app" }
$Repo   = "https://github.com/debs-obrien/playwright-movies-app.git"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed. Install Node 18+ from https://nodejs.org/"
    exit 1
}

$portInUse = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Warning "Port 3000 is already in use. The movies app needs port 3000 exactly."
    Write-Warning "Stop whatever is using it, then re-run this script."
}

if (-not (Test-Path $AppDir)) {
    Write-Host "==> Cloning movies app into $AppDir"
    git clone $Repo $AppDir
}

Set-Location $AppDir
Write-Host "==> Installing dependencies (first run can take a minute)..."
npm install
Write-Host "==> Starting the app on http://localhost:3000  (Ctrl+C to stop)"
Write-Host "    Test login: me@outlook.com / 12345"
npm run dev
