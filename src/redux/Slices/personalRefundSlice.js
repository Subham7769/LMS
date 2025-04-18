import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const generateRefundApplicationId = createAsyncThunk(
  "personalRefund/generateRefundApplicationId",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_REFUND_GET_DRAFT_APPLICATION_ID}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to generate ID");
      }
      const responseData = await response.json();
      return responseData.sequenceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOpenLoans = createAsyncThunk(
  "personalRefund/getOpenLoans",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_REPAYMENT_GET_ALL_OPEN_LOAN_PERSONAL_BORROWER}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to fetch open loans."
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching open loans:", error);
      return rejectWithValue(error.message || "An unexpected error occurred.");
    }
  }
);

export const getRefundApplicationDetails = createAsyncThunk(
  "personalRefund/getRefundApplicationDetails",
  async ({ userId, loanId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_APPLICATION_DETAILS
        }${userId}/loan/${loanId}/refund-amount-details`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to fetch refund details"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getDocsByIdnUsage = createAsyncThunk(
  "personalRefund/getDocsByIdnUsage",
  async ({ dynamicDocumentTempId, usage }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_DOCUMENTS_BY_ID_AND_USAGE
        }${dynamicDocumentTempId}/usage/${usage}`,
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

export const saveDraftRefundData = createAsyncThunk(
  "personalRefund/saveDraftRefundData",
  async (refundData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_REFUND_SAVE_DRAFT_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(refundData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRefundApplications = createAsyncThunk(
  "personalRefund/getRefundApplications",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_APPLICATION_PERSONAL
        }?page=${page}&size=${size}`,
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

export const getRefundApplicationByField = createAsyncThunk(
  "personalRefund/getRefundApplicationByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_APPLICATION_BY_FIELD_PERSONAL
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

export const submitRefund = createAsyncThunk(
  "personalRefund/submitRefund",
  async (generalLoanDetails, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_REFUND_SUBMIT_CREATE_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(generalLoanDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadDocumentFile = createAsyncThunk(
  "personalRefund/uploadDocumentFile",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("authToken");
      const {
        refundApplicationId,
        documentKey,
        verified,
        borrowerType,
        authToken,
      } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_FILE_UPLOAD_PERSONAL
        }?refundApplicationId=${refundApplicationId}&documentKey=${documentKey}&verified=${verified}`,
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

export const getRefundApplicationsByID = createAsyncThunk(
  "personalRefund/getRefundApplicationsByID",
  async (refundApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_APPLICATION_BY_ID_PERSONAL
        }${refundApplicationId}`,
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

export const cancelRefundApplicationsByID = createAsyncThunk(
  "personalRefund/cancelRefundApplicationsByID",
  async (refundApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_CANCEL_APPLICATION_BY_ID_PERSONAL
        }${refundApplicationId}/status?status=CANCEL`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cloneRefundApplicationsByID = createAsyncThunk(
  "personalRefund/cloneRefundApplicationsByID",
  async (loanApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_CLONE_APPLICATION_BY_ID_PERSONAL
        }${loanApplicationId}`,
        {
          method: "POST",
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

export const deleteDocumentFile = createAsyncThunk(
  "personalRefund/deleteDocumentFile",
  async (fileDeleteParams, { rejectWithValue }) => {
    // const token = localStorage.getItem("authToken");
    const { docId, authToken } = fileDeleteParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_DELETE_PERSONAL}${docId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPendingRefunds = createAsyncThunk(
  "personalRefund/getPendingRefunds",
  async ({ page, size, getPayload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_REFUND_READ_REFUND_PENDING_PERSONAL
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

export const getRefundistory = createAsyncThunk(
  "personalRefund/getRefundistory",
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
  "personalRefund/getRefundHistoryByField",
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
  "personalRefund/uploadSignedRefundRequest",
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
  openLoans: [],
  refundData: {
    refundDetails: {
      loanId: "",
      refundAmount: "",
      relatedPaySlipMonth: "",
      causeOfRefund: "",
      dynamicRefundDocTempId: "",
      borrowerId: "",
      borrowerType: "PERSONAL_BORROWER",
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
  reducers: {
    updateRefundField: (state, action) => {
      const { section, field, value, type, checked, index } = action.payload;
      // If section is provided, update specific field in that section
      if (section === "documents") {
        state.refundData.documents[index][field] =
          type === "checkbox" ? checked : value;
      } else if (section && state.refundData[section]) {
        state.refundData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in refundData
        state.refundData[field] = type === "checkbox" ? checked : value;
      }
    },
    resetRefundData: (state, action) => {
      state.refundData = initialState.refundData;
    },
    setRefundApplicationId: (state, action) => {
      state.refundData.refundApplicationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateRefundApplicationId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRefundApplicationId.fulfilled, (state, action) => {
        state.loading = false;
        state.refundData.refundApplicationId = action.payload.sequenceId;
      })
      .addCase(generateRefundApplicationId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getOpenLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOpenLoans.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.openLoans = action.payload.map((item) => ({
          label: `${item.loanId} ${item.userName}`,
          value: `${item.loanId}@${item.userId}`,
        }));
      })
      .addCase(getOpenLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch open loans.";
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getRefundApplicationDetails.pending, (state) => {
        state.error = null;
      })
      .addCase(getRefundApplicationDetails.fulfilled, (state, action) => {
        state.refundData = {
          ...state.refundData,
          refundDetails: {
            ...state.refundData.refundDetails,
            loanId:
              `${action.payload.loanId}@${action.payload.borrowerId}` || "",
            refundAmount: action.payload.refundAmount || "",
            dynamicRefundDocTempId: action.payload.dynamicRefundDocTempId || "",
            borrowerId: action.payload.borrowerId,
          },
          documents: [],
        };
      })
      .addCase(getRefundApplicationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
        state.refundData = {
          ...state.refundData,
          documents: [],
        };
      })
      .addCase(getDocsByIdnUsage.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(getDocsByIdnUsage.fulfilled, (state, action) => {
        state.loading = false;
        state.refundData.documents = action.payload.map((doc) => ({
          docName: "",
          docId: "",
          verified: false,
          documentKey: doc.documentKeyName, // Assign documentKeyName to documentKey
        }));
      })
      .addCase(getDocsByIdnUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(`API Error : ${action.payload}`);
      })
      .addCase(saveDraftRefundData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDraftRefundData.fulfilled, (state, action) => {
        state.loading = false;
        toast(`Draft Saved Successfully`);
      })
      .addCase(saveDraftRefundData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getRefundApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.refundApplications = action.payload.content;
        state.refundApplicationsTotalElements = action.payload.numberOfElements;
      })
      .addCase(getRefundApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getRefundApplicationByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundApplicationByField.fulfilled, (state, action) => {
        state.loading = false;
        state.refundApplications = action.payload;
      })
      .addCase(getRefundApplicationByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getRefundApplicationsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefundApplicationsByID.fulfilled, (state, action) => {
        state.loading = false;
        const updatedRefundData = action.payload;
        state.refundData = {
          ...updatedRefundData,
          refundDetails: {
            ...updatedRefundData.refundDetails,
            loanId:
              `${updatedRefundData.refundDetails.loanId}@${updatedRefundData.refundDetails.borrowerId}` ||
              "",
          },
        };
      })
      .addCase(getRefundApplicationsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(submitRefund.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRefund.fulfilled, (state, action) => {
        state.loading = false;
        state.refundData = initialState.refundData;
        toast.success("Repayment Application successful");
      })
      .addCase(submitRefund.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(uploadDocumentFile.pending, (state) => {
        // state.loading = true;
      })
      .addCase(uploadDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        const { docId, documentKey } = action.payload;
        state.refundData.documents = state.refundData.documents.map(
          (doc) =>
            doc.documentKey === documentKey
              ? { ...doc, docId } // Update the matching document
              : doc // Keep other documents unchanged
        );
        toast.success("File uploaded successfully");
      })
      .addCase(uploadDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(cancelRefundApplicationsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelRefundApplicationsByID.fulfilled, (state, action) => {
        state.loading = false;
        toast("Refund Application Cancelled!!");
      })
      .addCase(cancelRefundApplicationsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(cloneRefundApplicationsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneRefundApplicationsByID.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(cloneRefundApplicationsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getPendingRefunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingRefunds.fulfilled, (state, action) => {
        state.loading = false;
        state.approveRefund = action.payload.content;
        state.approveRefundTotalElements = action.payload.totalElements;
      })
      .addCase(getPendingRefunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
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
      });
  },
});

export const { updateRefundField, resetRefundData, setRefundApplicationId } =
  personalRefundSlice.actions;

export default personalRefundSlice.reducer;
