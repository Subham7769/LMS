import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for deleting a Credit Score ET
export const handleDeleteRC = createAsyncThunk(
  "creditScoreET/handleDeleteCSET",
  async (RCName, { rejectWithValue, dispatch }) => {
    // Access current state of creditScoreET
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_DELETE}${RCName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete Credit Score ET");
      }

      dispatch(fetchCreditScoreEligibleTenureData());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for creating a new Report Configuration
export const createReportConfig = createAsyncThunk(
  "reportConfig/createReportConfig",
  async ({reportingConfigData}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming you're using token-based auth
      const response = await fetch(
        'https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/report/configuration',
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reportingConfigData), // Sending the report config data
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create report configuration");
      }

      const data = await response.json(); // Assuming response contains some data
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Initial state
const InitialState = {
  reportingConfigData: {
    name: "",
    defaultTimeRangeDays: 0,
    apiRoute: "",
    serviceIp: "",
    servicePort: "",
    query: "",
    bindings: {},
  },
  loading: false,
  error: null,
};

const reportingConfigSlice = createSlice({
  name: "reportingConfig",
  initialState: InitialState,
  reducers: {
    updateReportingConfigField: (state, action) => {
      const { name, value } = action.payload;
      state.reportingConfigData[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleDeleteRC.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteRC.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleDeleteRC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createReportConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReportConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.reportingConfigData = action.payload; 
      })
      .addCase(createReportConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture the error message
      })
  },
});

export const { updateReportingConfigField } = reportingConfigSlice.actions;

export default reportingConfigSlice.reducer;
