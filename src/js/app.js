import CreditCardValidatorWidget from "./widget";

const container = document.querySelector(".page");

const form = new CreditCardValidatorWidget(container);

form.bindToDOM();
