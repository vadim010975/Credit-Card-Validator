export default function isValidNumber(numCard) {
  const strNumCard = numCard.toString();
  const lengthNumCard = strNumCard.length;
  if (lengthNumCard !== 16) {
    return false;
  }
  const arrWords = [...strNumCard];
  const result = arrWords.reduce((acc, item, index) => {
    const itemInt = Number.parseInt(item);
    let currentValue = 0;
    if ((index + 1) % 2) {
      2 * itemInt > 9
        ? (currentValue = 2 * itemInt - 9)
        : (currentValue = 2 * itemInt);
    } else {
      currentValue = itemInt;
    }
    return (acc += currentValue);
  }, 0);
  return result % 10 ? false : true;
}
