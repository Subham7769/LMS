import convertToReadableString from "../../utils/convertToReadableString";

const generateStringSentence = (rule) => {
  // console.log(rule)
  const readableName = convertToReadableString(rule?.name);
  const condition = rule?.blocked ? "NOT be" : "be";
  const criteriaPrefix = rule?.criteriaValues?.length > 1 
    ? rule?.blocked 
      ? "any of " 
      : "either " 
    : "";
  const criteriaValues = rule?.criteriaValues?.join(", ");

  const usageListSentence = (() => {
    const filteredList = rule?.usageList
      ?.filter(item => item.used) // Filter items where used is true
      .map(item => {
        // Replace _ with space and then capitalize each word
        return item.ruleUsage
          .toLowerCase() // Convert to lowercase
          .replace(/_/g, " ") // Replace underscores with spaces
          .replace(/\b\w/g, match => match.toUpperCase()) // Capitalize first letter of each word
          .replace(/\s+/g, ''); // Remove spaces between words to form UpperCamelCase
      });
  
    if (!filteredList || filteredList.length === 0) return "";
    if (filteredList.length === 1) return filteredList[0]; // If there's only one item, return it directly
  
    return `${filteredList.slice(0, -1).join(", ")} & ${filteredList[filteredList.length - 1]}`;
  })();

  return `${readableName} must ${condition} ${criteriaPrefix}${criteriaValues} during ${usageListSentence}.`;
};
export default generateStringSentence