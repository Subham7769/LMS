import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReportsConfigData = createAsyncThunk(
  "reports/fetchReportsConfigData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_REPORTS_CONFIG_READ}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  reportsData: {
    reportName: "",
    startDate: 0,
    endDate: "",
  },
  reportConfigData: [],
  loading: false,
  error: null,
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportsConfigData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportsConfigData.fulfilled, (state, action) => {
        state.loading = false;
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

export default reportsSlice.reducer;
