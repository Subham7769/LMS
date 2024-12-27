import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  addNewBulkRepaymentData: [
    {
      loan: "",
      amount: "",
      method: "",
      collectionDate: "",
      collectionBy: "",
      description: "",
      accounting: "",
    },
  ],
  error: null,
  loading: false,
};

const smeRepaymentsSlice = createSlice({
  name: "smeRepayments",
  initialState,
  reducers: {
    updateBulkRepaymentData: (state, action) => {
      const { rowIndex, fieldName, value } = action.payload;
      state.addNewBulkRepaymentData[rowIndex][fieldName] = value;
    },
    addBulkRepaymentRow: (state) => {
      const newRow = {
        loan: "",
        amount: "",
        method: "",
        collectionDate: "",
        collectionBy: "",
        description: "",
        accounting: "",
      };
      state.addNewBulkRepaymentData.push(newRow);
    },
    removeBulkRepaymentRow: (state, action) => {
      const rowIndex = action.payload;
      state.addNewBulkRepaymentData.splice(rowIndex, 1);
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {
  updateBulkRepaymentData,
  addBulkRepaymentRow,
  removeBulkRepaymentRow,
} = smeRepaymentsSlice.actions;

export default smeRepaymentsSlice.reducer;
