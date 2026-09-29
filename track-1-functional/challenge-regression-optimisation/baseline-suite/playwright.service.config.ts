import { defineConfig } from "@playwright/test";
import { createAzurePlaywrightConfig, ServiceOS } from "@azure/playwright";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";
import config from "./playwright.config";

// ============================================================================
//  ☁️  Microsoft Playwright Workspaces (Azure App Testing)
//  Run this suite on highly-parallel CLOUD browsers instead of your laptop.
//  Full walkthrough: ../MICROSOFT-PLAYWRIGHT-TESTING.md
//
//  Requires:  PLAYWRIGHT_SERVICE_URL  — the workspace "Get started" endpoint
//             (put it in a .env file next to this one; see .env.example)
//  Auth:      Microsoft Entra ID by default → run `az login` first.
//  Run:       npm run test:mpt          (fans out to --workers=20)
//
//  This wraps the SAME base playwright.config.ts, so it works unchanged on the
//  baseline OR on your optimised suite — just copy this file (and .env.example)
//  next to your own playwright.config.ts.
// ============================================================================

export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    // The Movies app (SUT) runs on YOUR localhost:3000 — `<loopback>` lets the
    // cloud browser reach it. Point BASE_URL at the hosted app instead if you'd
    // rather not expose your loopback.
    exposeNetwork: "<loopback>",
    connectTimeout: 3 * 60 * 1000, // 3 minutes to acquire a cloud browser
    os: ServiceOS.LINUX,
    // Microsoft Entra ID (recommended). For external workshop participants you
    // can instead use a workspace access token — see MICROSOFT-PLAYWRIGHT-TESTING.md:
    //   import { ServiceAuth } from "@azure/playwright";
    //   serviceAuthType: ServiceAuth.ACCESS_TOKEN,   // reads PLAYWRIGHT_SERVICE_ACCESS_TOKEN
    credential: new DefaultAzureCredential(),
  })
);
