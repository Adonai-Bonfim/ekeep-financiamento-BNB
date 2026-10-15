import assert from "node:assert/strict";
import { chromium } from "playwright";

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.addInitScript(() => {
      window.dataLayer = [{ event: "existing_queue" }];
      window.open = () => {
        window.testOpenCount = (window.testOpenCount || 0) + 1;
        return null;
      };
    });
    await page.goto(process.env.TEST_URL || "http://localhost:5173", { waitUntil: "networkidle" });
    const events = () => page.evaluate(() => window.dataLayer);
    const submit = page.locator('#formulario button[type="submit"]');
    await submit.click();
    let queue = await events();
    assert.equal(queue.filter((e) => e.event === "cta_solicitar_contato_click").length, 1);
    assert.equal(queue.filter((e) => e.event === "form_submit_error").length, 1);
    assert.equal(queue.filter((e) => e.event === "whatsapp_click").length, 0);
    await page.locator("#nome").press("Enter");
    queue = await events();
    assert.equal(queue.filter((e) => e.event === "form_submit_error").length, 2);
    await page.locator("#nome").fill("Private Person");
    await page.locator("#empresa").fill("Private Company");
    await page.locator("#email").fill("private@example.com");
    await page.locator("#whats").fill("abc");
    await page.locator("#cidade").fill("Private City");
    await page.locator("#servico").selectOption({ label: "Capital de giro" });
    await page.locator("#necessidade").fill("Private message");
    await submit.click();
    assert.equal((await events()).filter((e) => e.event === "whatsapp_click").length, 0);
    await page.locator("#whats").fill("71999999999");
    await page.locator("#nome").press("Enter");
    queue = await events();
    assert.equal(queue.filter((e) => e.event === "form_start").length, 1);
    assert.equal(
      queue.filter((e) => e.event === "whatsapp_click" && e.source === "form_success").length,
      1,
    );
    assert.equal(await page.evaluate(() => window.testOpenCount), 1);
    await submit.click();
    assert.equal((await events()).filter((e) => e.source === "form_success").length, 2);
    // Prevent external navigation without sending any WhatsApp message.
    await page
      .locator('a[href^="https://wa.me/"]')
      .evaluateAll((links) =>
        links.forEach((a) => a.addEventListener("click", (e) => e.preventDefault())),
      );
    for (const [selector, source] of [
      ["#top a[href^='https://wa.me/']", "hero"],
      [".faq-support a", "faq"],
      [".floating-whatsapp", "floating_button"],
    ]) {
      await page.locator(selector).click();
      assert.equal(
        (await events()).filter((e) => e.event === "whatsapp_click" && e.source === source).length,
        1,
      );
    }
    await page.locator("#solucoes a[href='#contato']").first().click();
    assert.ok(
      (await events()).some(
        (e) => e.event === "cta_ir_para_formulario_click" && e.cta_location === "section",
      ),
    );
    queue = await events();
    assert.equal(queue[0].event, "existing_queue");
    const allowed = new Set([
      "event",
      "page_type",
      "form_name",
      "source",
      "cta_location",
      "error_type",
    ]);
    for (const event of queue.slice(1)) {
      assert.ok(Object.keys(event).every((key) => allowed.has(key)));
      assert.equal(event.page_type, "landing_page_captacao_recursos");
    }
    assert.doesNotMatch(JSON.stringify(queue), /Private|private@|71999999999|wa\.me|generate_lead/);
    await page.evaluate(() => {
      window.dataLayer = {
        push() {
          throw Error("blocked");
        },
      };
    });
    await submit.click();
    assert.equal(await page.evaluate(() => window.testOpenCount), 3);
    await page.reload({ waitUntil: "networkidle" });
    await page.locator("#nome").focus();
    assert.equal((await events()).filter((e) => e.event === "form_start").length, 1);
    console.log(
      `Analytics: ${width}px passed (native/schema validation, keyboard, deduplication, privacy, blocked analytics)`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}
