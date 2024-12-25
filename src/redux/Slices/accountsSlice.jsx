import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchAccountDetailsById = createAsyncThunk(
  "accounts/fetchAccountDetailsById",
  async (userID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_ACCOUNT_DETAILS_BY_ID_READ}${userID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      } else {
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createAccount = createAsyncThunk(
  "accounts/createAccount",
  async (newAccountData, { rejectWithValue, dispatch, navigate }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_ACCOUNT_CREATE}${newAccountData.uid}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAccountData),
      });

      if (response.ok) {
        dispatch(fetchAccountDetailsById(newAccountData.uid));
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to generate");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "accounts/updateAccount",
  async (filteredAccountDetails, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_ACCOUNT_UPDATE}${
      filteredAccountDetails.accountNumber
    }`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filteredAccountDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDepositAmount = createAsyncThunk(
  "accounts/updateDepositAmount",
  async (depostAmountData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_ACCOUNT_DEPOSIT}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(depostAmountData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateWithdrawAmount = createAsyncThunk(
  "accounts/updateWithdrawAmount",
  async (withdrawAmountData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_ACCOUNT_WITHDRAW}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(withdrawAmountData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const transferFunds = createAsyncThunk(
  "accounts/transferFunds",
  async (transferDetails, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_ACCOUNT_TRANSFER}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transferDetails),
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

export const getRecieverAccountDetails = createAsyncThunk(
  "accounts/getRecieverAccountDetails",
  async (reciverUserId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_ACCOUNT_DETAILS_BY_ID_READ}${reciverUserId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }else{
        const responseData = await response.json();
        return responseData;
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/deleteAccount",
  async (accountNumber, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_ACCOUNT_DELETE}${accountNumber}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete account");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  newAccountData: {
    uid: "",
    accountCurrency: "string",
    accountHolderName: "string",
    balanceAmount: 0,
    loanProductId: "11a4f9e4-ab56-4e60-bb2e-a5a5c9e4da95",
  },
  accountDetails: [],
  filteredAccountNumber: "",
  filteredAccountDetails: {},
  transferDetails: {
    amount: 0,
    beneficiaryId: "",
    fromAccountNumber: "",
    isExternal: true,
    toAccountNumber: "",
  },
  recieverAccountDetails: [],
  loading: false,
  error: null,
};

const accountsSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    setFilteredAccountNumber: (state, action) => {
      state.filteredAccountNumber = action.payload;
    },
    handleChangeInNewAccountData: (state, action) => {
      const { name, value } = action.payload;
      state.newAccountData = {
        ...state.newAccountData,
        [name]: value,
      };
    },
    handleChangeInFilteredAccountData: (state, action) => {
      const { name, value } = action.payload;
      state.filteredAccountDetails = {
        ...state.filteredAccountDetails,
        [name]: value,
      };
    },
    getFilteredAccountDetails: (state, action) => {
      const filteredAccountNumber = action.payload;
      state.filteredAccountDetails = state.accountDetails.find(
        (accNo) => accNo.accountNumber === filteredAccountNumber
      );
    },
    handleChangeInTransferDetailsData: (state, action) => {
      const { name, value } = action.payload;
      state.transferDetails = {
        ...state.transferDetails,
        [name]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountDetailsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountDetailsById.fulfilled, (state, action) => {
        state.loading = false;
        state.accountDetails = action.payload;
      })
      .addCase(fetchAccountDetailsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Account Created");
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Account Details Updated");
      })
      .addCase(updateAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateDepositAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepositAmount.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Amount credited successfully");
      })
      .addCase(updateDepositAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateWithdrawAmount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWithdrawAmount.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Amount debited successfully");
      })
      .addCase(updateWithdrawAmount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(transferFunds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferFunds.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Amount transferred successfully");
        state.transferDetails = initialState.transferDetails;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getRecieverAccountDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRecieverAccountDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.recieverAccountDetails = action.payload;
      })
      .addCase(getRecieverAccountDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.loading = false;
        toast("Account deleted successfully");
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      });
  },
});

export const {
  setLoading,
  setError,
  setFilteredAccountNumber,
  handleChangeInNewAccountData,
  handleChangeInFilteredAccountData,
  handleChangeInTransferDetailsData,
  getFilteredAccountDetails,
} = accountsSlice.actions;
export default accountsSlice.reducer;
