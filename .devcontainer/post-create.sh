#!/usr/bin/env bash
# Runs once when the Codespace / devcontainer is created.
set -euo pipefail

echo "==> Pre-cloning the Movies app SUT next to the repo…"
if [ ! -d "../playwright-movies-app" ]; then
  git clone https://github.com/debs-obrien/playwright-movies-app.git ../playwright-movies-app || true
fi

if [ -d "../playwright-movies-app" ]; then
  cd ../playwright-movies-app
  echo "==> Installing SUT dependencies (also builds the bundled mock API)…"
  npm install || true
  if [ ! -f ".env" ] && [ -f ".env.example" ]; then
    echo "==> Creating .env from .env.example (sets the test login)…"
    cp .env.example .env || true
  fi
  echo "==> Installing Playwright browsers (Chromium)…"
  npx --yes playwright install --with-deps chromium || true
  cd - >/dev/null
fi

echo ""
echo "=================================================================="
echo " Setup complete — no cloud account or API key needed."
echo " Start the SUT (mock :4000 + app :3000):"
echo "     cd ../playwright-movies-app && npm run dev"
echo " Then open the forwarded port 3000  (login me@outlook.com / 12345)"
echo " Begin with track-1-functional/README.md"
echo "=================================================================="
