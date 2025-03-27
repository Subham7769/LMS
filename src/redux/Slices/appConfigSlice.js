import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchAppConfigData = createAsyncThunk(
  "appConfig/fetchAppConfigData",
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

// AsyncThunk for updating app config
export const updateAppConfigData = createAsyncThunk(
  "appConfig/updateAppConfigData",
  async ({appConfig}, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_APP_CONFIG_UPDATE}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appConfig), 
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update app config");
      }
      const data = await response.json();
      return data; // Return updated config data

    } catch (error) {
      toast.error(`Update failed: ${error.message}`);
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
    isdcode:"",
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
      .addCase(fetchAppConfigData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAppConfigData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.appConfig = action.payload;
      })
      .addCase(fetchAppConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateAppConfigData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppConfigData.fulfilled, (state, action) => {
        state.loading = false;
        state.appConfig = action.payload; // Update state with new config
        toast.success("App config updated successfully!");
        state.error = null;
      })
      .addCase(updateAppConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update app config.";
      });
  },
});

export const {updateAppConfigField} = appConfigSlice.actions;
export default appConfigSlice.reducer;
