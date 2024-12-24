import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cloneNamed: "",
  isOpen: false,
};
const cloneModalSlice = createSlice({
  name: "cloneModal",
  initialState,
  reducers: {
    setName:(state, action) => {
      state.name = action.payload;
    },
    openModal: (state) =>{
      state.isOpen = true;
    },
    closeModal: (state) =>{
      state.isOpen = false;
      state.cloneNamed = '';
    },
  },
});

export const {setName, openModal, closeModal} = cloneModalSlice.actions;
export default cloneModalSlice.reducer;
