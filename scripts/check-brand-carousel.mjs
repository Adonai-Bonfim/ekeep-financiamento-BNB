import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle" });
  const track = page.locator(".testimonial-grid");
  await track.scrollIntoViewIfNeeded();
  const position = () => track.evaluate((el) => el.scrollLeft);
  const start = await position();
  await page.waitForTimeout(1500);
  assert.ok((await position()) > start + 5, "Mobile slideshow must move slowly");
  assert.equal(await page.locator(".testimonial-pause").count(), 0);
  await track.focus();
  const stopped = await position();
  await page.waitForTimeout(500);
  assert.ok(Math.abs((await position()) - stopped) < 2, "Pause must stop movement");
  await track.evaluate((el) => el.blur());
  await track.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  assert.ok((await position()) > stopped + 3, "Resume must restart movement");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  const reduced = await position();
  await page.waitForTimeout(500);
  assert.equal(await position(), reduced, "Reduced motion must stop autoplay");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  assert.equal(await track.evaluate((el) => getComputedStyle(el).display), "grid");
  assert.equal(await track.locator("figure:visible").count(), 3);
  assert.equal(await page.locator(".testimonial-pause").isVisible(), false);
  const favicon = await page.locator('link[rel="icon"]').getAttribute("href");
  assert.equal(favicon, "/favicon-ekeep.svg");
  assert.equal((await page.request.get(new URL(favicon, page.url()).href)).status(), 200);
  assert.equal(await page.getByRole("img", { name: "Ekeep Consultores & Auditores" }).count(), 2);
  await mkdir("artifacts/responsive", { recursive: true });
  await page.locator("header").screenshot({ path: "artifacts/responsive/new-brand.png" });
  console.log("PASS: mobile motion, pause/resume, reduced motion, desktop grid, logo and favicon.");
} finally {
  await browser.close();
}
