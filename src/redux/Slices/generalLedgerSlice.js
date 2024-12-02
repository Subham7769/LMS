import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import transformData from '../../utils/GeneralLedgerDataTransformation';

// Define async thunk to fetch ledger data
export const fetchLedgerData = createAsyncThunk(
  'ledger/fetchLedgerData',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_GENERAL_LEDGER_READ_TEST}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.error = action.error.message;
        toast.error(`Error : ${action.payload.message}`);
      });
  },
});

export default generalLedgerSlice.reducer;
