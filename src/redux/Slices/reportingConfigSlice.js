import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  async ({newReportingConfigData}, { rejectWithValue }) => {
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
          body: JSON.stringify(newReportingConfigData), // Sending the report config data
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


// Define the asyncThunk for fetching Reporting Config data
export const fetchReportingConfig = createAsyncThunk(
  "reportingConfig/fetchReportingConfig",
  async (RCName, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Assuming token is stored in localStorage

    try {
      const response = await axios.get(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/report/configurations/${RCName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      return response.data; // Return the API response data
    } catch (error) {
      // Handle and return error response
      return rejectWithValue(error.response?.data || error.message);
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
  newReportingConfigData: {
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
    updateNewReportingConfigField: (state, action) => {
      const { name, value } = action.payload;
      state.newReportingConfigData[name] = value;
    },
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
      .addCase(fetchReportingConfig.pending, (state) => {
        state.loading = true; // Set loading state
        state.error = null; // Reset any previous error
      })
      .addCase(fetchReportingConfig.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when data is fetched
        console.log(action.payload)
        state.reportingConfigData = action.payload; // Store the fetched data in the state
      })
      .addCase(fetchReportingConfig.rejected, (state, action) => {
        state.loading = false; // Set loading to false if request fails
        state.error = action.payload; // Store the error message in the state
      })
  },
});

export const { updateNewReportingConfigField,updateReportingConfigField } = reportingConfigSlice.actions;

export default reportingConfigSlice.reducer;
