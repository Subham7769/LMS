
const getConditionForOperators = (firstOperator, secondOperator, minimum, maximum) => {
    const conditionKey = `${firstOperator},${secondOperator}`;
    const minLimit = -Number(import.meta.env.VITE_MIN_MAX_LIMIT);
    const maxLimit = Number(import.meta.env.VITE_MIN_MAX_LIMIT);

  switch (conditionKey) {
    case ">,<":
      if (+minimum === minLimit) {
        return "Less than";
      } else if (+maximum === maxLimit) {
        return "Greater than";
      }else{
        console.log("no condition satisfied")
      }
    case ">,<=":
      return "Less than or equal to";

    case ">=,<":
      return "Greater than or equal to";

    case ">=,<=":
      return "Between";

    case "==,==":
      return "Equal to";

    default:
      return "Unknown Condition";
  }
};

export default getConditionForOperators
