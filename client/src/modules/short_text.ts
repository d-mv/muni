/**
 * Function to make excerpt of the text provided with variable length
 *
 * @param {string} text - Original text
 * @param {number} symbols - Quantity of symbols required
 *
 * @returns {string} String of text of requested length
 *
 */
const shortText = (text: string, symbols: number): string => {
  if (
    !text ||
    !symbols ||
    typeof text !== "string" ||
    typeof symbols !== "number" ||
    text.length === 0 ||
    symbols === 0
  ) {
    return "";
  } else {
    const excerpt = text.split("").splice(0, symbols);
    return excerpt.join("") + "...";
  }
};

export default shortText;
