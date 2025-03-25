export const isValidationFailed = (validationError, sectionDetailsConfig) => {
  // Generate the Form Field
  const sectionInputFields = sectionDetailsConfig.map((field) => field.inputName)

  // Iterate over Form fields and check if any corresponding error is true
  return sectionInputFields.some((field) => validationError[field] === true);
};