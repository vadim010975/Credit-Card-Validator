export default function determinePaymentSystem(cards, num) {
  return cards.find((card) => {
    return card.initialDigits.find((el) => {
      const clean = num.toString().trim();
      return clean.startsWith(el.toString());
    });
  });
}
