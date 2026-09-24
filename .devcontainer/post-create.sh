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

# --- Track 3 (optional): Apache JMeter for local load testing ---------------
# Java is provided by the devcontainer 'java' feature; Azure CLI + the `az load`
# extension + Bicep come from the 'azure-cli' feature. This adds the JMeter CLI.
JMETER_VERSION=5.6.3
if ! command -v jmeter >/dev/null 2>&1; then
  echo "==> Installing Apache JMeter ${JMETER_VERSION} (Track 3 — local load testing)…"
  if curl -fsSL "https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-${JMETER_VERSION}.tgz" -o /tmp/jmeter.tgz \
     && sudo tar -xzf /tmp/jmeter.tgz -C /opt \
     && sudo ln -sf "/opt/apache-jmeter-${JMETER_VERSION}/bin/jmeter" /usr/local/bin/jmeter; then
    rm -f /tmp/jmeter.tgz
    echo "    JMeter ready: $(jmeter --version 2>/dev/null | head -n1 || echo installed)"
  else
    rm -f /tmp/jmeter.tgz
    echo "    (JMeter install skipped — install later; see track-3-performance-optional/jmeter)"
  fi
fi

echo ""
echo "=================================================================="
echo " Setup complete — no cloud account or API key needed for Tracks 1 & 2."
echo " Start the SUT (mock :4000 + app :3000):"
echo "     cd ../playwright-movies-app && npm run dev"
echo " Then open the forwarded port 3000  (login me@outlook.com / 12345)"
echo " Begin with track-1-functional/README.md"
echo " Track 3 (optional): jmeter, az CLI (+ az load) and Bicep are preinstalled."
echo "=================================================================="
