import { createSlice } from "@reduxjs/toolkit";

const validationInitialState = {
  validationError: {},
};

const validationSlice = createSlice({
  name: "validation",
  initialState: validationInitialState,
  reducers: {
    setValidationError: (state, action) => {
      state.validationError = {
        ...state.validationError,
        ...action.payload,
      };
    },
    clearValidationError: (state, action) => {
      state.validationError = {};
    },
  },
});

export const { setValidationError, clearValidationError } =
  validationSlice.actions;
export default validationSlice.reducer;

export const validateFormFields = (fields, formData, dispatch) => {
  let isValid = true;
  const errors = {};

  fields.forEach((field) => {
    if (formData[field] === "") {
      errors[field] = true;
      isValid = false;
    }
  });

  dispatch(setValidationError({ ...errors }));

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
    dispatch(setValidationError({ ...validationErrors }));
  } else {
    // Handle the case when dependentsRules or rules array is not defined
    isValid = false;
  }

  console.log(isValid);

  // dispatch(setValidationError(validationErrors));
  return isValid;
};
