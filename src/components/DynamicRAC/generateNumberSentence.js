import convertToReadableString from "../../utils/convertToReadableString";
const isCurrencyField = (name) => ["Salary", "Bonus", "Income"].includes(name);

const generateNumberSentence = (rule) => {
  const fieldName = rule.name;
  const MIN_LIMIT = -Number(import.meta.env.VITE_MIN_MAX_LIMIT);
  const MAX_LIMIT = Number(import.meta.env.VITE_MIN_MAX_LIMIT);

  const sentences = rule.numberCriteriaRangeList
    .map((item) => {
      const minimum = Number(item.minimum); 
      const maximum = Number(item.maximum); 
      const currencySymbol = isCurrencyField(fieldName) ? "$" : "";

      // Less than
      if (rule.firstOperator === ">" && rule.secondOperator === "<") {
        if (minimum === MIN_LIMIT) {
          return `less than ${currencySymbol}${maximum.toLocaleString()}`;
        }
        if (maximum === MAX_LIMIT) {
          return `greater than ${currencySymbol}${minimum.toLocaleString()}`;
        }
      }

      // Less than or equal to
      if (rule.firstOperator === ">" && rule.secondOperator === "<=") {
        return `less than or equal to ${currencySymbol}${maximum.toLocaleString()}`;
      }

      // Greater than or equal to
      if (rule.firstOperator === ">=" && rule.secondOperator === "<") {
        return `greater than or equal to ${currencySymbol}${minimum.toLocaleString()}`;
      }

      // Equal to
      if (rule.firstOperator === "==" && rule.secondOperator === "==") {
        return `equal to ${currencySymbol}${minimum.toLocaleString()}`;
      }

      // Between
      if (rule.firstOperator === ">=" && rule.secondOperator === "<=") {
        return `between ${currencySymbol}${minimum.toLocaleString()} and ${currencySymbol}${maximum.toLocaleString()}`;
      }

      return ""; // Handle invalid range
    })
    .filter(Boolean); // Remove empty strings

  return sentences.length
    ? `${convertToReadableString(fieldName)} should be ${sentences.join(
        " or "
      )}`
    : ""; // Handle empty cases gracefully
};

export default generateNumberSentence;
