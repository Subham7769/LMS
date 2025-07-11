import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Async thunk to submit OverdraftOffer
export const submitOverdraftOffer = createAsyncThunk(
  "loanConfig/submitOverdraftOffer",
  async (userID, { getState, rejectWithValue }) => {
    // Access overdraftOffer from the current state
    const { overdraftOffer } = getState().overdraftLoan;

    // Ensure refinanceLoan is updated properly with uid
    const postData = {
      ...overdraftOffer,
      refinanceLoan: {
        ...overdraftOffer.refinanceLoan,
        uid: userID, // Ensure uid is added here
      },
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_SUBMIT_OFFER}${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      // Handle bad request
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOverdraft = createAsyncThunk(
  "overdraft/createOverdraft",
  async ({ transactionId, userID }, { rejectWithValue }) => {
    const postData = {
      transactionId: transactionId,
      userId: userID,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_OVERDRAFT_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      // Handle bad request
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const loanId = await response.json();
      return loanId; // Returning loanId in case of success
    } catch (error) {
      return rejectWithValue(error.message); // Handling errors and rejecting the thunk
    }
  }
);

export const activateOverdraftLoanAccount = createAsyncThunk(
  "overdraft/activateOverdraftLoanAccount",
  async ({ accountNumber, supplementaryAccountsList }, { rejectWithValue }) => {
    const postData = {
      accountNumber,
      supplementaryAccountsList,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACTIVATE}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      // Check for a bad request
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle network or other errors
    }
  }
);

export const cancelOverdraftLoanAccount = createAsyncThunk(
  "overdraft/cancelOverdraftLoanAccount",
  async ({ accountNumber, supplementaryAccountsList }, { rejectWithValue }) => {
    const postData = {
      accountNumber,
      supplementaryAccountsList,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_OVERDRAFT_CANCEL}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      // Check for a bad request
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle network or other errors
    }
  }
);

export const closeOverdraftLoanAccount = createAsyncThunk(
  "overdraft/closeOverdraftLoanAccount",
  async ({ accountNumber, supplementaryAccountsList }, { rejectWithValue }) => {
    const postData = {
      accountNumber,
      supplementaryAccountsList,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_OVERDRAFT_CLOSE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      // Check for a bad request
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error); // Handle network or other errors
    }
  }
);

export const getOverdraftLoanAccount = createAsyncThunk(
  "overdraft/getOverdraftLoanAccount",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_GET}${accountNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for a bad request
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error); // Handle network or other errors
    }
  }
);

export const getOverdraftLoanAccountOutstanding = createAsyncThunk(
  "overdraftLoan/getOverdraftLoanAccountOutstanding",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_OUTSTANDING}${accountNumber}`,
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
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getOverdraftLoanAccountPIF = createAsyncThunk(
  "overdraftLoan/getOverdraftLoanAccountPIF",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_PIF}${accountNumber}`,
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
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for fetching account details by account number
export const getOverdraftAccountNumberList = createAsyncThunk(
  "overdraft/getOverdraftAccountNumberList",
  async (userID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_LIST}${userID}`,
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
        return rejectWithValue(errorData.message || "Failed to get details");
      }
      const data = await response.json(); // Return the account details on success
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const debitOverdraftLoanAccount = createAsyncThunk(
  "overdraft/debitOverdraftLoanAccount",
  async (formData, { rejectWithValue }) => {
    const postData = { ...formData };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_DEBIT}`,
        {
          method: "PUT", // Use POST method for debit API call
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData), // Convert the postData to JSON string
        }
      );

      // Handle a 400 (bad request) response
      if (response.status === 400 || response.status === 500) {
        const errorData = await response.json();
        return rejectWithValue(errorData); // Pass the error message from the response
      }

      // Parse and return the response data if the request was successful
      const responseData = await response.json();
      return responseData; // Return the response data from the server
    } catch (error) {
      // Return a rejected action if an error occurred
      return rejectWithValue(error);
    }
  }
);

export const payOverdraftLoanAccount = createAsyncThunk(
  "overdraft/payOverdraftLoanAccount",
  async (formData, { rejectWithValue }) => {
    const postData = { ...formData };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_PAY}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      // Check for a bad request
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error); // Handle network or other errors
    }
  }
);

export const getAccountDetails = createAsyncThunk(
  "overdraft/getAccountDetails",
  async (accountNumber, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    console.log(accountNumber);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_OVERDRAFT_ACCOUNT_DETAILS}${accountNumber}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for a bad request
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json();
      return data; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error); // Handle network or other errors
    }
  }
);

const initialState = {
  overdraftOffer: {
    amount: 0,
    customer_type: "CONSUMER",
    ignoreCache: true,
    loan_type: "",
    merchant_id: "",
    merchant_name: "",
    refinanceLoan: {
      existingLoanId: "",
      maxTenure: 0,
      refinance: true,
      uid: "", // Ensure this is properly initialized
    },
    total_subsidy_value: 0,
  },
  loanOptions: [{ value: "OVERDRAFT_LOAN", label: "OVERDRAFT_LOAN" }],
  overdraftOfferData: [],
  accountDetails: {
    accountNumber: "",
    accountType: "",
    balanceAmount: "",
    currency: { name: "", correctionFactor: "" },
    maximumLimit: "",
    status: "",
    supplementaryAccountsList: null,
    userId: "",
  },
  accountOutstanding: {},
  accountPIF: {},
  debitAmount: {
    userId: "",
    accountStatus: null,
  },
  payAmount: {
    userId: "",
    accountStatus: null,
  },
  accountNumberList: null,
  accountNumber: null,
  overdraftDetails: {},
  showModal: false,
  loading: false,
  error: null,
};

const overdraftLoanSlice = createSlice({
  name: "overdraftLoan",
  initialState,
  reducers: {
    updateAccountNumber(state, action) {
      state.accountNumber = action.payload;
    },
    updateOverdraftOfferField: (state, action) => {
      const { name, value } = action.payload;
      state.overdraftOffer[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOverdraftOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOverdraftOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.overdraftOfferData = action.payload;
        state.showModal = true;
      })
      .addCase(submitOverdraftOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(createOverdraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOverdraft.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
        state.accountDetails = {
          ...state.accountDetails,
          // supplementaryAccountsList: [
          //   {
          //     "accountNumber": action.payload.accountNumber,
          //     "expirationDate": "2024-09-09T07:12:35.584Z",
          //     "maximumLimit": 0,
          //     "status": action.payload.status
          //   }
          // ],
        };
        state.accountNumber = action.payload.accountNumber;
        toast.success("Overdraft Created.");
      })
      .addCase(createOverdraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(activateOverdraftLoanAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateOverdraftLoanAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = {
          ...state.accountDetails,
          accountNumber: action.payload.accountNumber,
          status: action.payload.status,
        };
        toast.success("Overdraft Activated.");
      })
      .addCase(activateOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })
      .addCase(cancelOverdraftLoanAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOverdraftLoanAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = {
          ...state.accountDetails,
          accountNumber: action.payload.accountNumber,
          status: action.payload.status,
        };
        toast.success("Overdraft Cancelled.");
      })
      .addCase(cancelOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(closeOverdraftLoanAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeOverdraftLoanAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = {
          ...state.accountDetails,
          accountNumber: action.payload.accountNumber,
          status: action.payload.status,
        };
        toast.success("Overdraft Closed.");
      })
      .addCase(closeOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(getOverdraftLoanAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOverdraftLoanAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.overdraftDetails = action.payload;
        state.overdraftDetails = {
          ...state.overdraftDetails,
          // supplementaryAccountsList: [
          //   {
          //     "accountNumber": action.payload.accountNumber,
          //     "expirationDate": "2024-09-09T07:12:35.584Z",
          //     "maximumLimit": 0,
          //     "status": action.payload.status
          //   }
          // ],
          // installmentDetailsList: [
          //   {
          //     "accountNumber": action.payload.accountNumber,
          //     "expirationDate": "2024-09-09T07:12:35.584Z",
          //     "maximumLimit": 0,
          //     "status": action.payload.status
          //   }
          // ],
          // paymentHistoryList: [
          //   {
          //     "accountNumber": action.payload.accountNumber,
          //     "expirationDate": "2024-09-09T07:12:35.584Z",
          //     "maximumLimit": 0,
          //     "status": action.payload.status
          //   }
          // ],
          // debitHistoryList: [
          //   {
          //     "accountNumber": action.payload.accountNumber,
          //     "expirationDate": "2024-09-09T07:12:35.584Z",
          //     "maximumLimit": 0,
          //     "status": action.payload.status
          //   }
          // ],
        };
      })
      .addCase(getOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(getOverdraftLoanAccountOutstanding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getOverdraftLoanAccountOutstanding.fulfilled,
        (state, action) => {
          state.loading = false;
          state.accountOutstanding = action.payload;
        }
      )
      .addCase(getOverdraftLoanAccountOutstanding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(getOverdraftLoanAccountPIF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOverdraftLoanAccountPIF.fulfilled, (state, action) => {
        state.loading = false;
        state.accountPIF = action.payload || action.error.message;
      })
      .addCase(getOverdraftLoanAccountPIF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.error.message}`);
      })
      .addCase(getOverdraftAccountNumberList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOverdraftAccountNumberList.fulfilled, (state, action) => {
        state.loading = false;
        state.accountNumberList = action.payload.accountNumberList.map(
          (accountNumber) => ({
            label: accountNumber,
            value: accountNumber,
          })
        );
        if (!state.accountNumber) {
          state.accountNumber = action.payload.accountNumberList[0];
        }
      })
      .addCase(getOverdraftAccountNumberList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch account details";
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(debitOverdraftLoanAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(debitOverdraftLoanAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.debitAmount = {
          ...state.debitAmount,
          accountStatus: action.payload,
        };
        toast.success("Amount Debited.");
      })
      .addCase(debitOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(payOverdraftLoanAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(payOverdraftLoanAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.payAmount = {
          ...state.payAmount,
          accountStatus: action.payload,
        };
        toast.success("Amount Paid.");
      })
      .addCase(payOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action.payload);
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(getAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
      })
      .addCase(getAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload.message}`);
      });
  },
});

export const { updateAccountNumber, updateOverdraftOfferField } =
  overdraftLoanSlice.actions;
export default overdraftLoanSlice.reducer;
