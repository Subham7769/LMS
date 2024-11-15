import { createSlice } from "@reduxjs/toolkit";

const notificationInitialState = {
  updateMap: {},
  updateFields: [],
  isValid: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addUpdateFields: (state, action) => {
      const { inputName } = action.payload;
      state.updateFields.push(inputName);
      state.updateMap[inputName] = false; // Set all updateFields to false initially
    },
    setUpdateMap: (state, action) => {
      const inputName = action.payload;
      state.updateMap = {
        ...state.updateMap,
        [inputName]: true,
      };
    },
    clearUpdateMap: (state, action) => {
      state.updateMap = {};
      state.updateFields = [];
    },
  },
});

export const { addUpdateFields, setUpdateMap, clearUpdateMap } =
  notificationSlice.actions;
export default notificationSlice.reducer;
