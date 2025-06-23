import { createSlice } from "@reduxjs/toolkit";

export const validateUserRole = (userRole, dispatch) => {
  let isValid = true;
  const errors = {};

  if (!userRole || userRole.length == 0) {
    errors.userRole = true;
    isValid = false;
  }

  dispatch(updateValidationError({ ...errors }));

  return isValid;
};

export const validateFormFieldsRule = (formData, dispatch) => {
  let isValid = true;
  const validationErrors = {};

  // Handle nested validation for dependentsRules
  if (formData.dependentsRules?.rules) {
    formData.dependentsRules.rules.forEach((rule, index) => {
      // Validation for firstDependent
      if (rule.firstDependent === "") {
        validationErrors[`firstDependent_${index}`] = true;
        isValid = false;
      } else {
        validationErrors[`firstDependent_${index}`] = false;
      }

      // Validation for secondDependent
      if (rule?.secondDependent === "" && index != 2) {
        validationErrors[`secondDependent_${index}`] = true;
        isValid = false;
      } else {
        validationErrors[`secondDependent_${index}`] = false;
      }

      // Validation for value
      if (rule.value === "") {
        validationErrors[`value_${index}`] = true;
        isValid = false;
      } else {
        validationErrors[`value_${index}`] = false;
      }
    });

    // Update the state only once
    dispatch(updateValidationError({ ...validationErrors }));
  } else {
    // Handle the case when dependentsRules or rules array is not defined
    isValid = false;
  }

  console.log(isValid);
  return isValid;
};

export const validateRAC = (sections, dispatch) => {
  let isValid = true;
  const validationErrors = {};

  sections.forEach((section) => {
    const sectionId = section.sectionId;

    section.rules.forEach((rule) => {
      const ruleId = rule.dynamicRacRuleId;

      // Handle STRING fieldType
      if (rule.fieldType === "STRING") {
        if (!rule.criteriaValues || rule.criteriaValues.length === 0) {
          validationErrors[`criteriaValues_${sectionId}_${ruleId}`] = true;
          isValid = false;
        } else {
          validationErrors[`criteriaValues_${sectionId}_${ruleId}`] = false;
        }
      }

      // Handle NUMBER fieldType
      if (rule.fieldType === "NUMBER") {
        if (!rule.firstOperator || rule.firstOperator === "") {
          validationErrors[`firstOperator_${sectionId}_${ruleId}`] = true;
          isValid = false;
        } else {
          validationErrors[`firstOperator_${sectionId}_${ruleId}`] = false;
        }

        if (!rule.secondOperator || rule.secondOperator === "") {
          validationErrors[`secondOperator_${sectionId}_${ruleId}`] = true;
          isValid = false;
        } else {
          validationErrors[`secondOperator_${sectionId}_${ruleId}`] = false;
        }

        // Validate numberCriteriaRangeList
        rule.numberCriteriaRangeList?.forEach((range, rangeIndex) => {
          if (
            range.minimum === undefined ||
            range.minimum === null ||
            range.minimum === ""
          ) {
            validationErrors[
              `minimum_${sectionId}_${ruleId}_${rangeIndex}`
            ] = true;
            isValid = false;
          } else {
            validationErrors[
              `minimum_${sectionId}_${ruleId}_${rangeIndex}`
            ] = false;
          }

          if (
            range.maximum === undefined ||
            range.maximum === null ||
            range.maximum === ""
          ) {
            validationErrors[
              `maximum_${sectionId}_${ruleId}_${rangeIndex}`
            ] = true;
            isValid = false;
          } else {
            validationErrors[
              `maximum_${sectionId}_${ruleId}_${rangeIndex}`
            ] = false;
          }
        });
      }
    });
  });

  dispatch(updateValidationError({ ...validationErrors }));

  return isValid;
};

const validationInitialState = {
  validationError: {},
  fields: [],
  isValid: true,
};

const validationSlice = createSlice({
  name: "validation",
  initialState: validationInitialState,
  reducers: {
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    addFields: (state, action) => {
      const { inputName } = action.payload;
      state.fields.push(inputName);
      state.validationError[inputName] = false; // Set all fields to false initially
    },
    setValidationError: (state, action) => {
      const inputName = action.payload;
      state.validationError = {
        ...state.validationError,
        [inputName]: false,
      };
    },
    setValidationErrorTrue: (state, action) => {
      const inputName = action.payload;
      state.validationError = {
        ...state.validationError,
        [inputName]: true,
      };
    },
    updateValidationError: (state, action) => {
      const newErrors = action.payload;
      state.validationError = {
        ...state.validationError,
        ...newErrors,
      };
    },
    clearValidationError: (state, action) => {
      state.validationError = {};
      state.fields = [];
    },
    validateForm: (state, action) => {
      const errors = {};
      const formData = action.payload;
      state.isValid = true;

      if (formData.dataIndex) {
        state.fields.forEach((field) => {
          if (formData[field] === "") {
            errors[`${field}_${formData.dataIndex}`] = true;
            state.isValid = false;
          } else {
            errors[`${field}_${formData.dataIndex}`] = false;
          }
        });
      } else {
        state.fields.forEach((field) => {
          if (formData[field] === "") {
            errors[field] = true;
            state.isValid = false;
          } else {
            errors[field] = false;
          }
        });
      }
      console.log(errors);
      state.validationError = {
        ...state.validationError,
        ...errors,
      };
    },
    validateFormNullCheck: (state, action) => {
      const errors = {};
      const formData = action.payload;
      state.isValid = true;

      if (formData.dataIndex) {
        state.fields.forEach((field) => {
          if (formData[field] === "") {
            errors[`${field}_${formData.dataIndex}`] = true;
            state.isValid = false;
          } else {
            errors[`${field}_${formData.dataIndex}`] = false;
          }
        });
      } else {
        state.fields.forEach((field) => {
          if (formData[field] === "" || formData[field] === null) {
            errors[field] = true;
            state.isValid = false;
          } else {
            errors[field] = false;
          }
        });
      }
      console.log(errors);
      state.validationError = {
        ...state.validationError,
        ...errors,
      };
    },
  },
});

export const {
  setFields,
  addFields,
  setValidationError,
  setValidationErrorTrue,
  updateValidationError,
  clearValidationError,
  validateForm,
  validateFormNullCheck,
} = validationSlice.actions;
export default validationSlice.reducer;
