import puppeteer from "puppeteer";

jest.setTimeout(30000);

describe("enteringCardNumber", () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox"],
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test.each([
    ["5586200023405365", "Verification completed successfully"],
    ["5586200023405366", "Verification failed"],
  ])(
    "testing isValidNumber function with %i number card",
    async (numberCard, message) => {
      await page.goto("http://localhost:9000");
      await page.waitForSelector(".form-control");
      const input = await page.$(".form-control");
      const btn = await page.$(".btn");
      await input.type(numberCard);
      await btn.click();
      await page.waitForSelector(".result");
      const result = await page.evaluate(() => {
        return document.querySelector(".result").textContent;
      });
      expect(result).toBe(message);
    },
  );

  afterEach(async () => {
    await browser.close();
  });
});
