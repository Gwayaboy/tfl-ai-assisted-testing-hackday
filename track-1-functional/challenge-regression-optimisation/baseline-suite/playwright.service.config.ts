import { defineConfig } from "@playwright/test";
import { createAzurePlaywrightConfig, ServiceAuth, ServiceOS } from "@azure/playwright";
import "dotenv/config";
import config from "./playwright.config";

// ============================================================================
//  ☁️  Microsoft Playwright Workspaces (Azure App Testing)
//  Run this suite on highly-parallel CLOUD browsers instead of your laptop.
//  Full walkthrough: ../MICROSOFT-PLAYWRIGHT-TESTING.md
//
//  Requires:  PLAYWRIGHT_SERVICE_URL  — the workspace "Get started" endpoint
//             PLAYWRIGHT_SERVICE_ACCESS_TOKEN — the workspace access token
//             (put both in a .env file next to this one; see .env.example)
//  Auth:      access token (no Azure sign-in needed) — see the note below.
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
    // Access-token auth — reads PLAYWRIGHT_SERVICE_ACCESS_TOKEN from .env. This is
    // the path TfL participants use: no Azure/Entra sign-in required. To use your
    // own Microsoft Entra ID identity instead (requires `az login` to a tenant with
    // access to the workspace), drop this line and pass instead:
    //   credential: new DefaultAzureCredential(),   // import { DefaultAzureCredential } from "@azure/identity"
    serviceAuthType: ServiceAuth.ACCESS_TOKEN,
  })
);
