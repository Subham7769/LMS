import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getRefundistory = createAsyncThunk(
  "personalLoans/getRefundistory",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_HISTORY_PERSONAL
        }?pageNumber=${page}&pageSize=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRefundHistoryByField = createAsyncThunk(
  "personalLoans/getRefundHistoryByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_HISTORY_BY_FIELD_PERSONAL
        }?fieldName=${field}&value=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadSignedRefundRequest = createAsyncThunk(
  "personalLoans/uploadSignedRefundRequest",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("authToken");
      const { loanId, authToken } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_SIGNED_REQUEST_UPLOAD
        }${loanId}/signed-loan-refund-request`,
        {
          method: "POST",
          headers: {
            Authorization: `${authToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to upload");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    builder
      .addCase(getRefundistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundistory.fulfilled, (state, action) => {
        state.loading = false;
        state.refundHistory = action.payload.content;
        state.refundHistoryTotalElements = action.payload.totalElements;
      })
      .addCase(getRefundistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getRefundHistoryByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundHistoryByField.fulfilled, (state, action) => {
        state.loading = false;
        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        // Check if loanId is null in each object and filter accordingly
        state.refundHistory = payload.some((item) => item.loanId === null)
          ? [] // Set to an empty array if any loanId is null
          : payload;

        // hide the pagination
        state.refundHistoryTotalElements = 0;
      })
      .addCase(getRefundHistoryByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(uploadSignedRefundRequest.pending, (state) => {
              // state.loading = true;
            })
            .addCase(uploadSignedRefundRequest.fulfilled, (state, action) => {
              state.loading = false;
              toast.success("File uploaded successfully");
            })
            .addCase(uploadSignedRefundRequest.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
              toast.error(`API Error : ${action.payload}`);
            })
  },
});

export const {} = personalRefundSlice.actions;

export default personalRefundSlice.reducer;
