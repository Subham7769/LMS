import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchData = createAsyncThunk(
  "serverConfig/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_APP_CONFIG_READ}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const InitialState = {
  appConfig: {
    currencySymbol: "",
    currencyDecimalPlaces: "",
    dateFormat: "",
    thousandSeparator:"", 
    mobileNumberDigits:"",
    ISDCode:"",
  },
  loading: false,
  error: null,
};

const appConfigSlice = createSlice({
  name: "appConfig",
  initialState: InitialState,
  reducers: {
    updateAppConfigField(state, action) {
      const { name, value } = action.payload;
      state.appConfig[name] = value;
  },
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {updateAppConfigField} = appConfigSlice.actions;
export default appConfigSlice.reducer;
