import convertToReadableString from "../../utils/convertToReadableString";
const isCurrencyField = (name) => ["Salary", "Bonus", "Income"].includes(name);

const generateNumberSentence = (rule) => {
  // console.log(rule)
  const fieldName = rule?.name;
  const MIN_LIMIT = -Number(import.meta.env.VITE_MIN_MAX_LIMIT);
  const MAX_LIMIT = Number(import.meta.env.VITE_MIN_MAX_LIMIT);

  const sentences = rule?.numberCriteriaRangeList
    ?.map((item) => {
      const minimum = Number(item.minimum);
      const maximum = Number(item.maximum);
      const currencySymbol = isCurrencyField(fieldName) ? "$" : "";

      // Less than
      if (rule?.firstOperator === ">" && rule?.secondOperator === "<") {
        if (minimum === MIN_LIMIT) {
          return `less than ${currencySymbol}${maximum.toLocaleString()}`;
        }
        if (maximum === MAX_LIMIT) {
          return `greater than ${currencySymbol}${minimum.toLocaleString()}`;
        }
      }

      // Less than or equal to
      if (rule?.firstOperator === ">" && rule?.secondOperator === "<=") {
        return `less than or equal to ${currencySymbol}${maximum.toLocaleString()}`;
      }

      // Greater than or equal to
      if (rule?.firstOperator === ">=" && rule?.secondOperator === "<") {
        return `greater than or equal to ${currencySymbol}${minimum.toLocaleString()}`;
      }

      // Equal to
      if (rule?.firstOperator === "==" && rule?.secondOperator === "==") {
        return `equal to ${currencySymbol}${minimum.toLocaleString()}`;
      }

      // Between
      if (rule?.firstOperator === ">=" && rule?.secondOperator === "<=") {
        return `between ${currencySymbol}${minimum.toLocaleString()} and ${currencySymbol}${maximum.toLocaleString()}`;
      }

      return ""; // Handle invalid range
    })
    .filter(Boolean); // Remove empty strings

  const usageListSentence = (() => {
    const filteredList = rule?.usageList
      ?.filter((item) => item.used) // Filter items where used is true
      .map((item) => {
        // Replace _ with space and then capitalize each word
        return item.ruleUsage
          .toLowerCase() // Convert to lowercase
          .replace(/_/g, " ") // Replace underscores with spaces
          .replace(/\b\w/g, (match) => match.toUpperCase()) // Capitalize first letter of each word
          .replace(/\s+/g, ""); // Remove spaces between words to form UpperCamelCase
      });

    if (!filteredList || filteredList.length === 0) return "";
    if (filteredList.length === 1) return filteredList[0]; // If there's only one item, return it directly

    return `${filteredList.slice(0, -1).join(", ")} & ${
      filteredList[filteredList.length - 1]
    }`;
  })();

  return sentences?.length
    ? `${convertToReadableString(fieldName)} should be ${sentences?.join(
        " or "
      )} during ${usageListSentence}.`
    : ""; // Handle empty cases gracefully
};

export default generateNumberSentence;
