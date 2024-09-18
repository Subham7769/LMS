import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to submit OverdraftOffer
export const submitOverdraftOffer = createAsyncThunk(
  "loanConfig/submitLoanConfiguration",
  async (userID, { getState, rejectWithValue }) => {
    // Access overdraftOffer from the current state
    const { overdraftOffer } = getState().overdraftLoanOffers;

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
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/offer/${userID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      // Handle any non-2xx responses as errors
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
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
      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/submit",
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
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
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
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/activate",
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
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
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
      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/cancel",
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
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
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
      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/close",
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
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle network or other errors
    }
  }
);

export const getOverdraftLoanAccount = createAsyncThunk(
  "overdraft/getOverdraftLoanAccount",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/${accountNumber}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for a bad request
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle network or other errors
    }
  }
);

export const getOverdraftLoanAccountOutstanding = createAsyncThunk(
  "overdraftLoanOffers/getOverdraftLoanAccountOutstanding",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/outstanding/${accountNumber}`,
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
      return rejectWithValue(error.message);
    }
  }
);

export const getOverdraftLoanAccountPIF = createAsyncThunk(
  "overdraftLoanOffers/getOverdraftLoanAccountPIF",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/pif/${accountNumber}`,
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
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching account details by account number
export const getOverdraftAccountNumberList = createAsyncThunk(
  "overdraft/getAccountNumber",
  async (userID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/account/${userID}`
      );
      return response.data; // Return the account details on success
    } catch (error) {
      // Handle errors and return a rejected value
      return rejectWithValue(
        error.response?.data || "Error fetching account number"
      );
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
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/debit",
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
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message); // Pass the error message from the response
      }

      // Parse and return the response data if the request was successful
      const responseData = await response.json();
      return responseData; // Return the response data from the server
    } catch (error) {
      // Return a rejected action if an error occurred
      return rejectWithValue(error.message);
    }
  }
);


export const payOverdraftLoanAccount = createAsyncThunk(
  'overdraft/payOverdraftLoanAccount',
  async (formData, { rejectWithValue }) => {
    const postData = {...formData};

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/pay",
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
        return rejectWithValue(errorData.message);
      }

      const responseData = await response.json();
      return responseData; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle network or other errors
    }
  }
);

export const getAccountDetails = createAsyncThunk(
  'overdraft/getAccountDetails',
  async (accountNumber, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    console.log(accountNumber)

    try {
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/overdraft/loan/account/details/${accountNumber}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for a bad request
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const data = await response.json();
      return data; // Return the response data on success
    } catch (error) {
      return rejectWithValue(error.message); // Handle network or other errors
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
  accountNumber:null,
  overdraftDetails: {},
  showModal: false,
  loading: false,
  error: null,
};

const overdraftLoanOffersSlice = createSlice({
  name: "overdraftLoanOffers",
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
        state.accountNumber=action.payload.accountNumber;
      })
      .addCase(createOverdraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(activateOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
      })
      .addCase(cancelOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
      })
      .addCase(closeOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
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
      })
      .addCase(getOverdraftLoanAccountOutstanding.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase( getOverdraftLoanAccountOutstanding.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload); // Useful for debugging
          state.accountOutstanding = action.payload;
        }
      )
      .addCase(getOverdraftLoanAccountOutstanding.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOverdraftLoanAccountPIF.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOverdraftLoanAccountPIF.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload); // Useful for debugging
        state.accountPIF = action.payload;
      })
      .addCase(getOverdraftLoanAccountPIF.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getOverdraftAccountNumberList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOverdraftAccountNumberList.fulfilled, (state, action) => {
        state.loading = false;
        state.accountNumberList= action.payload.accountNumberList.map(
            (accountNumber) => ({
              label: accountNumber,
              value: accountNumber,
            })
          );
          if(!state.accountNumber){
            state.accountNumber=action.payload.accountNumberList[0];
          }
      })
      .addCase(getOverdraftAccountNumberList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch account details";
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
      })
      .addCase(debitOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(payOverdraftLoanAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      });
  },
});

export const { updateAccountNumber, updateOverdraftOfferField } = overdraftLoanOffersSlice.actions;
export default overdraftLoanOffersSlice.reducer;
