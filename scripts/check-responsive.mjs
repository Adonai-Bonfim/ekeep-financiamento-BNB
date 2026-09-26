import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

// Uses the installed Edge browser; set PLAYWRIGHT_CHANNEL to another installed channel if needed.
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || "msedge",
  headless: true,
});
const results = [];
const errors = [];
const page = await browser.newPage();
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("artifacts/responsive", { recursive: true });
try {
  await page.goto(process.env.TEST_URL || "http://localhost:5173", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  for (const width of [
    192, 240, 320, 360, 390, 540, 640, 768, 960, 1024, 1199, 1200, 1280, 1440, 1920, 2560, 3440,
  ]) {
    await page.setViewportSize({ width, height: width < 300 ? 320 : 900 });
    const metrics = await page.evaluate(() => {
      const viewport = document.documentElement.clientWidth;
      const outside = [...document.querySelectorAll(".landing *")]
        .filter((el) => {
          if (el.closest(".skip-link") || el.tagName === "SOURCE") return false;
          // SVG artwork is clipped by its viewBox; carousel items are intentionally
          // clipped by their own scroll region, whose viewport is still checked.
          if (el.closest(".brand-logo") && el.tagName.toLowerCase() === "image") return false;
          const carousel = el.closest(".testimonial-grid");
          if (carousel && el !== carousel && getComputedStyle(carousel).overflowX === "auto")
            return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > viewport + 1 || r.left < -1);
        })
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          text: el.textContent?.slice(0, 55),
        }));
      const smallTargets = [
        ...document.querySelectorAll(
          ".landing a, .landing button, .landing input, .landing select, .landing textarea",
        ),
      ]
        .filter((el) => {
          if (el.closest(".skip-link")) return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.width < 43.9 || r.height < 43.9);
        })
        .map((el) => ({
          tag: el.tagName,
          text: el.textContent?.slice(0, 55),
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height,
        }));
      const image = document.querySelector(".risks-visual")?.getBoundingClientRect();
      const riskOverlaps =
        image && image.width > 0
          ? [...document.querySelectorAll(".risks-grid article")].filter((card) => {
              const r = card.getBoundingClientRect();
              return (
                r.left < image.right &&
                r.right > image.left &&
                r.top < image.bottom &&
                r.bottom > image.top
              );
            }).length
          : 0;
      return {
        viewport,
        scrollWidth: document.documentElement.scrollWidth,
        outside,
        smallTargets,
        riskOverlaps,
      };
    });
    results.push({ width, ...metrics });
    if ([192, 390, 1440].includes(width))
      await page.screenshot({ path: `artifacts/responsive/${width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.locator('button[aria-controls="menu-mobile"]');
  await menu.click();
  if ((await menu.getAttribute("aria-expanded")) !== "true") throw new Error("Menu did not open");
  await page.keyboard.press("Escape");
  if ((await menu.getAttribute("aria-expanded")) !== "false")
    throw new Error("Escape did not close menu");
  await menu.click();
  await page
    .getByRole("navigation", { name: "Navegação móvel" })
    .getByRole("link", { name: "Contato", exact: true })
    .click();
  if ((await menu.getAttribute("aria-expanded")) !== "false")
    throw new Error("Menu did not close after navigation");
  const question = page.getByRole("button", { name: "Como é feito o orçamento?" });
  await question.click();
  if ((await question.getAttribute("aria-expanded")) !== "true")
    throw new Error("FAQ did not expand");
  await question.click();
  if ((await question.getAttribute("aria-expanded")) !== "false")
    throw new Error("FAQ did not collapse");
  const required = await page
    .locator("#whats, #cidade")
    .evaluateAll((els) => els.every((el) => el.required && !el.checkValidity()));
  if (!required) throw new Error("Required fields not validated");
  await page.emulateMedia({ reducedMotion: "reduce" });
  if (
    (await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)) !==
    "auto"
  )
    throw new Error("Reduced motion not honored");
  await writeFile(
    "artifacts/responsive/results.json",
    JSON.stringify({ results, errors }, null, 2),
  );
  const failures = results.filter(
    (r) =>
      r.scrollWidth > r.viewport + 1 || r.outside.length || r.smallTargets.length || r.riskOverlaps,
  );
  console.log(
    JSON.stringify(
      { checkedWidths: results.map((r) => r.width), failures, errors, interactions: "passed" },
      null,
      2,
    ),
  );
  if (failures.length || errors.length) process.exitCode = 1;
} finally {
  await browser.close();
}
