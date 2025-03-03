import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Open Loans
export const getOpenLoans = createAsyncThunk(
  "loans/getOpenLoans",
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

// closing balance
export const fetchClosingBalance = createAsyncThunk(
  "loan/fetchClosingBalance",
  async ({ userId, loanId }, { rejectWithValue }) => {
    console.log(userId, loanId);
    try {
      const response = await fetch(
        `${
          import.meta.env
            .VITE_REPAYMENT_GET_ALL_CLOSING_AMOUNT_PERSONAL_BORROWER
        }${userId}/loan/${loanId}/loan-amounts`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch closing balance");
      }

      const data = await response.json();
      return data; // Return the fetched data to be stored in the Redux state
    } catch (error) {
      return rejectWithValue(error.message); // Handle error and return it
    }
  }
);
// Submit Repayment
export const uploadRepayment = createAsyncThunk(
  "repayment/uploadRepayment",
  async ({ draftRepaymentDTOList }, { rejectWithValue }) => {
    try {
      const updatedDraftRepaymentDTOList = draftRepaymentDTOList.map(
        ({ closingBalance, ...entry }) => ({
          ...entry,
          loan: entry.loan.split("@")[0],
          collectionDate: entry.collectionDate + " 00:00:00",
          payAll: entry.amount >= closingBalance.xcClosingAmount,
        })
      );
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_REPAYMENT_SUBMIT_PERSONAL_BORROWER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            draftRepaymentDTOList: updatedDraftRepaymentDTOList,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to fetch open loans."
        );
      }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Get Repayments
export const getRepayments = createAsyncThunk(
  "repayment/getRepayments",
  async ({ pageSize, pageNumber }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_REPAYMENT_GET_ALL_CREATED_REPAYMENT_PERSONAL_BORROWER
        }?pageSize=${pageSize}&pageNumber=${pageNumber}`,
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
          errorData.message || "Failed to fetch repayments"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Approve Repayment
export const approveRepayment = createAsyncThunk(
  "repayment/approveRepayment",
  async ({ transactionId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_REPAYMENT_APPROVE_PERSONAL_BORROWER}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([transactionId]),
        }
      );
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// Reject Repayment
export const rejectRepayment = createAsyncThunk(
  "repayment/rejectRepayment",
  async ({ transactionId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_REPAYMENT_REJECT_PERSONAL_BORROWER}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([transactionId]),
        }
      );
      if (!response.ok) {
        // Check for specific status codes like 500
        if (response.status === 500) {
          throw new Error("500 Internal Server Error");
        }
      }
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

// AsyncThunk for uploading a file
export const uploadFile = createAsyncThunk(
  "repayment/uploadFile",
  async ({ fileData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      // Create a FormData object to append the file
      const formData = new FormData();
      formData.append("file", fileData);

      const response = await fetch(
        `${import.meta.env.VITE_REPAYMENT_FILE_UPLOAD_PERSONAL_BORROWER}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // Send FormData in the request body
        }
      );

      if (!response.ok) {
        if (response.status === 500) {
          return rejectWithValue("500 Internal Server Error");
        }
        return rejectWithValue("Failed to fetch open loans.");
      }
    } catch (error) {
      return rejectWithValue(
        error.message || "An error occurred during file upload"
      );
    }
  }
);

// Fetch Borrower By Field
export const fetchRepaymentByField = createAsyncThunk(
  "borrowers/fetchRepaymentByField", // action type
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_REPAYMENT_READ_ALL_BY_FIELD_NAME_PERSONAL_BORROWER
        }?fieldName=${field}&value=${value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch borrower by field"
        );
      }

      const data = await response.json();
      const length = data.length;
      if (length < 1) {
        throw new Error("User not Found");
      }
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Fetch Repayment Files
export const fetchRepaymentFileHistory = createAsyncThunk(
  "repayments/fetchRepaymentFileHistory",
  async (_, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_REPAYMENT_GET_FILE_HISTORY_PERSONAL_BORROWER}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch repayment file details"
        );
      }

      const data = await response.json();
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

export const downloadAcceptRecords = createAsyncThunk(
  "repayments/downloadAcceptRecords",
  async ({ fileId, fileName }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_REPAYMENT_GET_RECORDS_PERSONAL_BORROWER
        }${fileId}/success`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to download");
      }

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      // Decode the Base64 content
      const decodedContent = atob(responseText.trim());
      console.log("Decoded Content:", decodedContent);

      // Create a Blob for the CSV content
      const blob = new Blob([decodedContent], { type: "text/csv" });

      // Create a link to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}_accepted_records.csv`; // Set the desired file name
      link.click(); // Trigger the download
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

export const downloadRejectedRecords = createAsyncThunk(
  "repayments/downloadRejectedRecords",
  async ({ fileId, fileName }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_REPAYMENT_GET_RECORDS_PERSONAL_BORROWER
        }${fileId}/failures`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to download");
      }

      const responseText = await response.text();
      console.log("Response Text:", responseText);

      // Decode the Base64 content
      const decodedContent = atob(responseText.trim());
      console.log("Decoded Content:", decodedContent);

      // Create a Blob for the CSV content
      const blob = new Blob([decodedContent], { type: "text/csv" });

      // Create a link to download the file
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${fileName}_rejected_records.csv`; // Set the desired file name
      link.click(); // Trigger the download
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

const initialState = {
  draftRepaymentDTOList: [
    {
      loan: "",
      amount: "",
      method: "",
      collectionDate: "",
      collectionBy: "",
      description: "",
      accounting: "",
      userId: "",
      repaymentType: "PERSONAL",
      payAll: false,
    },
  ],
  openLoans: [],
  repaymentData: [],
  repaymentHeaderData: {},
  approveRepaymentData: [],
  approveRepaymentTotalElements: [],
  repaymentFileHistory: [
    {
      fileId: "2d8f63ff-5b69-4417-96c0-b5f449322bdd",
      fileName: "repaymentBulkUpload.csv",
      fileCount: 2,
      successLinesCount: 2,
      failedLinesCount: 0,
      fileSize: 199,
      uploadDate: "2025-01-01 17:04:27",
      status: "DONE_SUCCESSFULLY",
    },
    {
      fileId: "fba67314-f564-40b7-9c54-d30e61c3208e",
      fileName: "carbon.Report-Configuration.json",
      fileCount: 437,
      successLinesCount: 0,
      failedLinesCount: 437,
      fileSize: 18888,
      uploadDate: "2025-01-01 17:05:27",
      status: "DONE_SUCCESSFULLY",
    },
    {
      fileId: "40df3e7e-402e-436b-8335-37669126a7f9",
      fileName: "debtBurdenCabCelling.xls",
      fileCount: null,
      successLinesCount: null,
      failedLinesCount: null,
      fileSize: 27136,
      uploadDate: "2025-01-01 17:07:14",
      status: "FAILED",
    },
  ],
  error: null,
  loading: false,
};

const personalRepaymentsSlice = createSlice({
  name: "personalRepayments",
  initialState,
  reducers: {
    updateBulkRepaymentData: (state, action) => {
      const { rowIndex, fieldName, value } = action.payload;
      state.draftRepaymentDTOList[rowIndex][fieldName] = value;
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
        userId: "",
        repaymentType: "PERSONAL",
        payAll: false,
      };
      state.draftRepaymentDTOList.push(newRow);
    },
    removeBulkRepaymentRow: (state, action) => {
      const rowIndex = action.payload;
      state.draftRepaymentDTOList.splice(rowIndex, 1);
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
    builder
      .addCase(uploadRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadRepayment.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Repayment Submitted Successfully!");
      })
      .addCase(uploadRepayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      // Approve Repayment
      .addCase(approveRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveRepayment.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Repayment Approved Successfully!");
      })
      .addCase(approveRepayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      // Reject Repayment
      .addCase(rejectRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectRepayment.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Repayment Rejected Successfully!");
      })
      .addCase(rejectRepayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      // Fetch Repayments
      .addCase(getRepayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRepayments.fulfilled, (state, action) => {
        state.loading = false;
        state.approveRepaymentData = action.payload.draftRepaymentDTOList;
        state.approveRepaymentTotalElements = action.payload.count;
      })
      .addCase(getRepayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      // get OpenLoans
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
      // fetch closing Balance
      .addCase(fetchClosingBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClosingBalance.fulfilled, (state, action) => {
        const { userId } = action.meta.arg;
        const { totalOutstanding } = action.payload;
        // Update the amount in the draftRepaymentDTOList
        state.draftRepaymentDTOList = state.draftRepaymentDTOList.map((entry) =>
          entry.userId === userId
            ? {
                ...entry,
                amount: totalOutstanding,
                closingBalance: action.payload,
              }
            : entry
        );
        state.loading = false;
      })
      .addCase(fetchClosingBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      // upload File
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("File Upload Successfully!");
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "File upload failed";
        toast.error(`API Error : ${action.payload}`);
      })
      // fetch Repayment By Field Name
      .addCase(fetchRepaymentByField.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchRepaymentByField.fulfilled, (state, action) => {
        state.loading = false;
        state.approveRepaymentData = action.payload;
      })
      .addCase(fetchRepaymentByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
        toast.error(`API Error : ${action.payload}`);
      })
      // fetch Repayment File History
      .addCase(fetchRepaymentFileHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepaymentFileHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.repaymentFileHistory = action.payload;
      })
      .addCase(fetchRepaymentFileHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(downloadAcceptRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadAcceptRecords.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("File downloaded successfully!");
      })
      .addCase(downloadAcceptRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(downloadRejectedRecords.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadRejectedRecords.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("File downloaded successfully!");
      })
      .addCase(downloadRejectedRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
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
} = personalRepaymentsSlice.actions;

export default personalRepaymentsSlice.reducer;
