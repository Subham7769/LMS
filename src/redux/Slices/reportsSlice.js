import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateReport = createAsyncThunk(
  "reports/generateReport",
  async (reportsData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = import.meta.env.VITE_GENERATE_REPORT_READ;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportsData),
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }

      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  reportsData: {
    reportName: "",
    startDate: "",
    endDate: "",
  },
  reportConfigData: [],
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
    handleChangeInReportsData: (state, action) => {
      const { name, value } = action.payload;
      state.reportsData = {
        ...state.reportsData,
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
        console.log(action.payload);
        const updatedReportConfigData = action.payload.map((data) => ({
          label: data.name,
          value: data.name,
        }));
        state.reportConfigData = updatedReportConfigData;
      })
      .addCase(fetchReportsConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setError, handleChangeInReportsData } =
  reportsSlice.actions;
export default reportsSlice.reducer;
