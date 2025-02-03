const getOperatorsForCondition = (condition) => {
    console.log(condition)
    switch (condition) {
      case "Less than":
        return { firstOperator: ">", secondOperator: "<" };
      case "Greater than":
        return { firstOperator: ">", secondOperator: "<" };
      case "Less than or equal to":
        return { firstOperator: ">", secondOperator: "<=" };
      case "Greater than or equal to":
        return { firstOperator: ">=", secondOperator: "<" };
      case "Between":
        return { firstOperator: ">=", secondOperator: "<=" };
      case "Equal to":
        return { firstOperator: "==", secondOperator: "==" };
      default:
        return { firstOperator: "", secondOperator: "" };
    }
  };

  export default getOperatorsForCondition