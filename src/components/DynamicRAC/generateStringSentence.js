import convertToReadableString from "../../utils/convertToReadableString";

const generateStringSentence = (rule) => {
  // console.log(rule)
  const readableName = convertToReadableString(rule.name);
  const condition = rule.blocked ? "NOT be" : "be";
  const criteriaPrefix = rule.criteriaValues.length > 1 
    ? rule.blocked 
      ? "any of " 
      : "either " 
    : "";
  const criteriaValues = rule.criteriaValues.join(", ");

  return `${readableName} must ${condition} ${criteriaPrefix}${criteriaValues}.`;
};
export default generateStringSentence