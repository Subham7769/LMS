import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchList = createAsyncThunk(
  "rac/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Reporting Config"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

// Async thunk for deleting a reporting config by its ID
export const deleteReportingConfig = createAsyncThunk(
  "reportingConfig/deleteReportingConfig",
  async (RCName, { rejectWithValue }) => {
    const url = `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/report/configurations/${RCName}`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk for creating a new Report Configuration
export const createReportConfig = createAsyncThunk(
  "reportConfig/createReportConfig",
  async ({ newReportingConfigData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming you're using token-based auth
      const response = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/report/configuration",
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

// Define the asyncThunk for updating reporting configuration
export const updateReportingConfig = createAsyncThunk(
  "reportingConfig/update",
  async ({ RCName, reportingConfigData }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    try {
      // Make a PUT request to update the configuration
      const response = await axios.put(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/report/configurations/${RCName}`,
        reportingConfigData, // Payload with the updated config data
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the auth token in headers
          },
        }
      );

      return response.data; // Return the updated data from the API
    } catch (error) {
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
    updateConfigName: (state, action) => {
      state.reportingConfigData.name = action.payload;
    },
    updateNewConfigName: (state, action) => {
      state.reportingConfigData.name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          createdOn: RACList[index]?.createdOn || "14/09/2022",
          approved: RACList[index]?.approved || "40%",
          totalProcessed: RACList[index]?.totalProcessed || "2367",
          status: RACList[index]?.status || "Active",
        }));
        state.racStatsData.RACList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReportingConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReportingConfig.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReportingConfig.rejected, (state, action) => {
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
        state.error = action.payload;
      })
      .addCase(fetchReportingConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportingConfig.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.reportingConfigData = action.payload;
      })
      .addCase(fetchReportingConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateReportingConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReportingConfig.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.reportingConfigData = action.payload;
      })
      .addCase(updateReportingConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error occurred while updating";
      });
  },
});

export const {
  updateNewReportingConfigField,
  updateReportingConfigField,
  updateConfigName,
  updateNewConfigName,
} = reportingConfigSlice.actions;

export default reportingConfigSlice.reducer;
