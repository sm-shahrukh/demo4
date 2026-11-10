const {
  chromium,
} = require("C:/Users/Shahrukh/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright");
const path = require("node:path");
const os = require("node:os");
(async () => {
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const result = [];
  for (const width of [1440, 1092, 390, 724, 320, 768]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("http://127.0.0.1:8765/search-flight.html", {
      waitUntil: "networkidle",
    });
    await page.locator(".td-foot").waitFor();
    await page.evaluate(() => document.fonts.ready);
    if ([1440, 390, 724].includes(width)) {
      const file = path.join(
        os.tmpdir(),
        "traveldeals-search-" + width + ".png",
      );
      await page.screenshot({ path: file, fullPage: true });
      result.push({ screenshot: file });
    }
    result.push(
      await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        brokenImages: [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
        header: document.querySelector(".td-header").getBoundingClientRect()
          .height,
        hero: document.querySelector(".sf-hero").getBoundingClientRect().height,
        cards: [...document.querySelectorAll(".sf-flight-card")].map((e) => ({
          height: e.offsetHeight,
          width: e.offsetWidth,
        })),
        overflow: [...document.querySelectorAll(".sf-main *")]
          .filter(
            (e) =>
              e.getBoundingClientRect().width &&
              e.getBoundingClientRect().right > innerWidth + 1,
          )
          .map((e) => e.className),
      })),
    );
  }
  console.log(JSON.stringify({ result, errors }, null, 2));
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
