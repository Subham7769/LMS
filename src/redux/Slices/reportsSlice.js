import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchReportsConfigData = createAsyncThunk(
  "reports/fetchReportsConfigData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_REPORTS_CONFIG_READ}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateReport = createAsyncThunk(
  "reports/generateReport",
  async (reportGenerationData, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const url = import.meta.env.VITE_GENERATE_REPORT_READ;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportGenerationData),
      });

      if (response.ok) {
        dispatch(fetchReportsConfigData());
        return await response.json();
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to generate");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteReportResult = createAsyncThunk(
  "reports/deleteReportResult",
  async (name, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_REPORT_RESULT_DELETE}${name}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        dispatch(fetchReportsConfigData());
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
  reportGenerationData: {
    reportName: "",
    startDate: "",
    endDate: "",
    relativeTimeRange: {
      time: 0,
      unit: "",
    },
  },
  reportOptions: [],
  configData: [],
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    handleChangeInreportGenerationData: (state, action) => {
      const { name, value } = action.payload;
      state.reportGenerationData = {
        ...state.reportGenerationData,
        [name]: value,
      };
    },
    handleChangeCommonSelection: (state, action) => {
      const { name, value } = action.payload;
      state.reportGenerationData.relativeTimeRange = {
        ...state.reportGenerationData.relativeTimeRange,
        [name]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsConfigData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsConfigData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedreportOptions = action.payload.map((data) => ({
          label: data.name,
          value: data.name,
        }));
        state.reportOptions = updatedreportOptions;
        state.configData = action.payload;
      })
      .addCase(fetchReportsConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(generateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Report Generated");
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteReportResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReportResult.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Report removed");
      })
      .addCase(deleteReportResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setLoading,
  setError,
  handleChangeInreportGenerationData,
  handleChangeCommonSelection,
} = reportsSlice.actions;
export default reportsSlice.reducer;
