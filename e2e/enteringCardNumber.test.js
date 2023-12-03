import puppeteer from "puppeteer";
import { fork } from 'child_process';

jest.setTimeout(30000);

describe("enteringCardNumber", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      // devtools: true,
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
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
      await expect(result).toBe(message);
    },
  );
});
