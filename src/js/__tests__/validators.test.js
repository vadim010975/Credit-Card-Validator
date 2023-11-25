import isValidNumber from "../validators";

test.each([
  [5586200023405365, true],
  [5586200023405364, false],
  [558620002340536, false],
])(
  "testing isValidNumber function with %i number card",
  (numberCard, validity) => {
    const result = isValidNumber(numberCard);
    expect(result).toBe(validity);
  },
);
