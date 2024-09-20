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
    if (!formData[field] || formData[field] === "") {
      errors[field] = true;
      isValid = false;
    }
  });

  dispatch(setValidationError({ ...errors }));

  return isValid;
};
