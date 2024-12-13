import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
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
      const responseData = await response.json();
      return responseData;
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

      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue({ message: "Unauthorized" });
      }

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
    handleChangeInNewAccountData: (state, action) => {
      const { name, value } = action.payload;
      state.newAccountData = {
        ...state.newAccountData,
        [name]: value,
      };
    },
    getFilteredAccountDetails: (state, action) => {
      const filteredAccountNumber = action.payload;
      state.filteredAccountDetails = state.accountDetails.find(
        (accNo) => accNo.accountNumber === filteredAccountNumber
      );
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
        state.error = action.error.message;
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
      });
  },
});

export const {
  setLoading,
  setError,
  handleChangeInNewAccountData,
  getFilteredAccountDetails,
} = accountsSlice.actions;
export default accountsSlice.reducer;
