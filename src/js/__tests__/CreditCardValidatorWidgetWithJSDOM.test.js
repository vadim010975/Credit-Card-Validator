/**
 * @jest-environment jsdom
 */

import CreditCardValidatorWidget from "../widget";

test.each([
  [5586200023405365, "Verification completed successfully"],
  [5586200023405364, "Verification failed"],
])(
  "testing CreditCardValidatorWidget with %i number card",
  (numberCard, message) => {
    document.documentElement.innerHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Document</title>
    </head>
    <body>
      <div class="page">
      </div>
    </body>
    </html>`;

    const container = document.querySelector(".page");
    const form = new CreditCardValidatorWidget(container);
    form.bindToDOM();
    form.input.value = numberCard;
    form.btn.click();
    const result = document.querySelector(".result").textContent;
    expect(result).toBe(message);
  },
  /* eslint-disable-next-line */
);
