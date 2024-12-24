import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  addNewBulkRepaymentData: [
    {
      row: "",
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

const repaymentsSlice = createSlice({
  name: "repayments",
  initialState,
  reducers: {
    updateBulkRepaymentData: (state, action) => {
      const { rowIndex, fieldName, value } = action.payload;
      state.addNewBulkRepaymentData[rowIndex][fieldName] = value;
    },
    addBulkRepaymentRow: (state) => {
      const newRow = {
        row: "",
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
} = repaymentsSlice.actions;

export default repaymentsSlice.reducer;
