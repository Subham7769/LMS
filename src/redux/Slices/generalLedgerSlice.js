import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import transformData from '../../utils/GeneralLedgerDataTransformation';

// Define async thunk to fetch ledger data
export const fetchLedgerData = createAsyncThunk(
  'ledger/fetchLedgerData',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_GENERAL_LEDGER_READ_TEST}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get item");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState= {
  ledgerData: [],
  loading: false,
  error: null,
}

const generalLedgerSlice = createSlice({
  name: 'ledger',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLedgerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLedgerData.fulfilled, (state, action) => {
        state.loading = false;
        state.ledgerData = transformData(action.payload);
      })
      .addCase(fetchLedgerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export default generalLedgerSlice.reducer;
