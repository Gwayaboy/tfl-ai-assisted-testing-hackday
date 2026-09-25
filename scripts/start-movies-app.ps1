#!/usr/bin/env pwsh
<#
  Clones (if needed) and starts the Movies app SUT.
  npm run dev starts the bundled mock API (:4000) and the Movies app (:3000) together.
#>
$ErrorActionPreference = "Stop"

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$AppDir = if ($env:MOVIES_APP_DIR) { $env:MOVIES_APP_DIR } else { "../playwright-movies-app" }
$Repo   = "https://github.com/debs-obrien/playwright-movies-app.git"

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js is not installed. Install Node 18+ from https://nodejs.org/"
    exit 1
}

foreach ($port in 3000, 4000) {
    $portInUse = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
    if ($portInUse) {
        Write-Warning "Port $port is already in use. The app needs 3000 (app) and 4000 (mock API) free."
        Write-Warning "Stop whatever is using it, then re-run this script."
    }
}

if (-not (Test-Path $AppDir)) {
    Write-Host "==> Cloning movies app into $AppDir"
    git clone $Repo $AppDir
}

Set-Location $AppDir
Write-Host "==> Installing dependencies (also builds the local mock API; first run can take a minute)..."
npm install
if ((-not (Test-Path ".env")) -and (Test-Path ".env.example")) {
    Write-Host "==> Creating .env from .env.example (sets the test login)"
    Copy-Item ".env.example" ".env"
}
Write-Host "==> Configuring the SUT to serve its API same-origin (so it works in a Codespaces browser preview too)..."
node "$ScriptDir/enable-sut-proxy.mjs" .
Write-Host "==> Starting the mock API (:4000) and the app (:3000)  (Ctrl+C to stop)"
Write-Host "    Open http://localhost:3000   ·   Test login: me@outlook.com / 12345"
npm run dev
