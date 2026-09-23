// A custom Cucumber "World" that gives each scenario a Playwright browser + page.
import { setWorldConstructor, World } from "@cucumber/cucumber";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
export const HEADED = process.env.HEADED === "1";

class MoviesWorld extends World {
  /** @type {import('playwright').Browser} */
  browser;
  /** @type {import('playwright').BrowserContext} */
  context;
  /** @type {import('playwright').Page} */
  page;
}

setWorldConstructor(MoviesWorld);
