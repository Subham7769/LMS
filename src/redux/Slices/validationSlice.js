import { createSlice } from "@reduxjs/toolkit";

const validationInitialState = {
  validationError: {},
  fields: [],
  isValid: true,
};

const validationSlice = createSlice({
  name: "validation",
  initialState: validationInitialState,
  reducers: {
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

      state.validationError = {
        ...state.validationError,
        ...errors,
      };
    },
  },
});

export const {
  addFields,
  setValidationError,
  updateValidationError,
  clearValidationError,
  validateForm,
} = validationSlice.actions;
export default validationSlice.reducer;

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
