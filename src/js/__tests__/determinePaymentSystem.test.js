import determinePaymentSystem from "../determinePaymentSystem";
import data from "../data";

test.each([
  [3530111333300000, "JCB"],
  [5555555555554444, "Mastercard"],
  [4111111111111111, "Visa"],
])(
  "testing determinePaymentSystem function with %i number card",
  (numberCard, paymentSystem) => {
    const result = determinePaymentSystem(data, numberCard).title;
    expect(result).toBe(paymentSystem);
  },
);
