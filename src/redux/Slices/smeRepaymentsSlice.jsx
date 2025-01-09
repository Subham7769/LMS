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
  repaymentData: [],
  repaymentHeaderData: {},
  approveRepaymentData: [
    {
      amount: "50000",
      collectionDate: "2024-12-01",
      name: "ABC Corp",
      loanId: "INV001",
      collectedBy: "John Doe",
      method: "Bank Transfer",
      staff: "Emily Davis",
      editDate: "2024-12-02",
      paymentReference: "TXN123456",
      remarks: "First installment payment.",
      contact: "contact@abccorp.com",
    },
    {
      amount: "30000",
      collectionDate: "2024-12-05",
      name: "XYZ Ltd",
      loanId: "INV002",
      collectedBy: "Jane Smith",
      method: "UPI",
      staff: "Michael Johnson",
      editDate: "2024-12-06",
      paymentReference: "TXN789012",
      remarks: "Paid via UPI ID abc@bank",
      contact: "support@xyzltd.com",
    },
    {
      amount: "38000",
      collectionDate: "2024-12-10",
      name: "QWERTY Ltd",
      loanId: "INV003",
      collectedBy: "Chris Brown",
      method: "Cheque",
      staff: "Sarah Lee",
      editDate: "2024-12-11",
      paymentReference: "CHQ345678",
      remarks: "Cheque under processing.",
      contact: "finance@qwertyltd.com",
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
    setRepaymentData: (state, action) => {
      state.repaymentData = action.payload;
    },
    updateRepaymentData: (state, action) => {
      const { rowIndex, fieldName, value } = action.payload;
      state.repaymentData[rowIndex][fieldName] = value;
    },
    setRepaymentHeaderData: (state, action) => {
      state.repaymentHeaderData = action.payload;
    },
    updateRepaymentHeaderData: (state, action) => {
      const { fieldName, value } = action.payload;
      state.repaymentHeaderData[fieldName] = value;
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
  setRepaymentData,
  updateRepaymentData,
  setRepaymentHeaderData,
  updateRepaymentHeaderData,
} = smeRepaymentsSlice.actions;

export default smeRepaymentsSlice.reducer;
