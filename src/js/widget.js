import isValidNumber from "./validators";
import data from "./data.js";
import determinePaymentSystem from "./determinePaymentSystem";

export default class CreditCardValidatorWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.ononClick = this.onClick.bind(this);
    this.cards = data;
  }

  static get markup() {
    return `
    <div class="widget">
      <h3>Check your credit card number</h3>
      <ul class="cards"></ul>
      <form id="form" class="form-inline" novalidate="novalidate">
        <div class="form-group">
          <input class="form-control" id="card_number" type="text" placeholder="Credit card number">
          <a id="submitform" class="btn">Click to Validate</a>
        </div>
      </form>
    </div>
    `;
  }

  static get selector() {
    return ".widget";
  }

  static get btnSelector() {
    return ".btn";
  }

  static get inputSelector() {
    return ".form-control";
  }

  static get ulSelector() {
    return ".cards";
  }

  bindToDOM() {
    this.parentEl.innerHTML = CreditCardValidatorWidget.markup;
    this.element = this.parentEl.querySelector(
      CreditCardValidatorWidget.selector,
    );
    this.cardsEl = this.element.querySelector(
      CreditCardValidatorWidget.ulSelector,
    );
    this.input = this.element.querySelector(
      CreditCardValidatorWidget.inputSelector,
    );
    this.btn = this.element.querySelector(
      CreditCardValidatorWidget.btnSelector,
    );
    this.onInput = this.onInput.bind(this);
    this.onClick = this.onClick.bind(this);
    this.input.addEventListener("input", this.onInput);
    this.btn.addEventListener("click", this.onClick);
    this.renderCards();
  }

  renderCard(card) {
    const cardEl = document.createElement("li");
    cardEl.innerHTML = `<span class="card ${card.CSSclass}" title="${card.title}">${card.title}</span>`;
    if (card.visible) {
      cardEl.querySelector(".card").classList.remove("cdisabled");
    } else {
      cardEl.querySelector(".card").classList.add("cdisabled");
    }
    this.cardsEl.insertAdjacentElement("beforeend", cardEl);
  }

  renderCards() {
    this._clear();
    this.cards.forEach((card) => this.renderCard(card));
  }

  _clear() {
    const items = this.cardsEl.querySelectorAll("li");
    for (const child of items) {
      child.remove();
    }
  }

  onClick(e) {
    e.preventDefault();
    const numberCard = this.input.value;
    this.showResult(isValidNumber(numberCard));
  }

  onInput(e) {
    e.preventDefault();
    if (this.resultEl) {
      this.resultEl.remove();
    }
    const numberCard = this.input.value;
    const selectedCard = determinePaymentSystem(this.cards, numberCard);
    this.cards.forEach((card) => {
      if (!selectedCard || card === selectedCard) {
        card.visible = true;
      } else {
        card.visible = false;
      }
    });
    this.renderCards();
  }

  showResult(value) {
    this.resultEl = document.createElement("h3");
    this.resultEl.classList.add("result");
    this.resultEl.innerHTML = value
      ? "Verification completed successfully"
      : "Verification failed";
    this.resultEl.style.color = value ? "green" : "red";
    this.element.insertAdjacentElement("beforeend", this.resultEl);
  }
}
