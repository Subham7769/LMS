// redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunks for fetching data and performing actions
export const fetchData = createAsyncThunk(
  "project/fetchName",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("projectToken");
      const response = await fetch(
        `${import.meta.env.VITE_PROJECT_READ}${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const projectInitialState = {
  data: {
    name: "",
    projectDescription: "",
    country: "",
    location: "",
    currencyName: "",
    loanType: "",
    flatInterestRate: "",
    interestRatePeriod: "",
    interestPeriodUnit: "",
    downRepaymentGracePeriod: "",
    emiRepaymentGracePeriod: "",
    loanGracePeriod: "",
    rollOverGracePeriod: "",
    rollOverPenaltyFactor: "",
    rollOverPenaltyFee: "",
    rollOverInterestRate: "",
    lateEmiPenaltyFactor: "",
    maxPaymetAttemps: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    lateRepaymentPenalty: "",
    earlyRepaymentDiscount: "",
    serviceFee: "",
    calculateInterest: false,
    hasEarlyLateRepayment: false,
    hasDownPayment: false,
    tclIncludeFee: true,
    tclIncludeInterest: true,
    managementFee: "",
    tclRef: "",
    vatFee: "",
    clientIds: [],
    tclAmount: "",
    minLoanOperator: "",
    minLoanAmount: "",
    maxLoanOperator: "",
    maxLoanAmount: "",
    tclOperator: "",
    minInstallmentsOperator: "",
    minInstallmentsAmount: "",
    maxInstallmentsOperator: "",
    maxInstallmentsAmount: "",
    downPaymentOperator: "",
    downPaymentWay: "",
    downPaymentPercentage: "",
    openLoanOperator: "",
    openLoanAmount: "",
  },
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState: projectInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLoading, setData, setError } = projectSlice.actions;
export default projectSlice.reducer;
