import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  refundApplications: [],
  refundApplicationsTotalElements: 0,
  refundData: {
    refundDetails: {
      loanId: "",
      refundAmount: "",
      relatedPaySlipMonth: "",
      causeOfRefund: "",
      dynamicRefundDocTempId: "",
    },
    documents: [],
    refundApplicationId: "",
  },
  approveRefund: [],
  approveRefundTotalElements: 0,
  refundHistory: [],
  refundHistoryTotalElements: 0,
  refundAgreementData: {},
  error: null,
  loading: false,
};

const personalRefundSlice = createSlice({
  name: "personalRefund",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder;
  },
});

export const {
} = personalRefundSlice.actions;

export default personalRefundSlice.reducer;
