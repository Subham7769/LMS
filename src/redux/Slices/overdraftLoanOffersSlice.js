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
      console.log(postData)
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
  accountDetails: {},
  AccountOutstanding: {},
  AccountPIF: {},
  debitAmount: [],
  payAmount: [],
  overdraftDetails: {},
  showModal: false,
  loading: false,
  error: null,
};

const overdraftLoanOffersSlice = createSlice({
  name: "overdraftLoanOffers",
  initialState,
  reducers: {
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
        console.log(action.payload); // Useful for debugging
        state.showModal = true;
      })
      .addCase(submitOverdraftOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateOverdraftOfferField } = overdraftLoanOffersSlice.actions;
export default overdraftLoanOffersSlice.reducer;

