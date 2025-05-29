// src/redux/slices/documentAnalysisSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Upload Document API
export const uploadDocument = createAsyncThunk(
  "documentAnalysis/uploadDocument",
  async ({ requestId, description, file }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("request_id", requestId);
      formData.append("description", description);
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/analysis-ai/upload/", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload document");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initiate Analysis API
export const initiateAnalysis = createAsyncThunk(
  "documentAnalysis/initiateAnalysis",
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/analysis-ai/initiate/${requestId}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate analysis");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Get Analysis Report API
export const getAnalysisReport = createAsyncThunk(
  "documentAnalysis/getAnalysisReport",
  async ({ requestId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8000/analysis-ai/report/${requestId}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch analysis report");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const documentAnalysisSlice = createSlice({
  name: "documentAnalysis",
  initialState: {
    uploading: false,
    initiating: false,
    fetchingReport: false,
    error: null,
    report: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadDocument.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state) => {
        state.uploading = false;
        toast.success("Document uploaded successfully");
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
        toast.error(`Upload failed: ${action.payload}`);
      })
      .addCase(initiateAnalysis.pending, (state) => {
        state.initiating = true;
        state.error = null;
      })
      .addCase(initiateAnalysis.fulfilled, (state) => {
        state.initiating = false;
        toast.success("Analysis initiated successfully");
      })
      .addCase(initiateAnalysis.rejected, (state, action) => {
        state.initiating = false;
        state.error = action.payload;
        toast.error(`Initiation failed: ${action.payload}`);
      })
      .addCase(getAnalysisReport.pending, (state) => {
        state.fetchingReport = true;
        state.error = null;
        state.report = null;
      })
      .addCase(getAnalysisReport.fulfilled, (state, action) => {
        state.fetchingReport = false;
        state.report = action.payload;
        toast.success("Analysis report fetched successfully");
      })
      .addCase(getAnalysisReport.rejected, (state, action) => {
        state.fetchingReport = false;
        state.error = action.payload;
        toast.error(`Fetch failed: ${action.payload}`);
      });
  },
});

export default documentAnalysisSlice.reducer;
