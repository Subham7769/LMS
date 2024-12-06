import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchData = createAsyncThunk(
  "serverConfig/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_CONFIG_READ}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }
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

export const updateServerConfig = createAsyncThunk(
  "serverConfig/updateServerConfig",
  async ({ name, updatedServerConfigData }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_CONFIG_UPDATE}${name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedServerConfigData),
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createServerConfig = createAsyncThunk(
  "serverConfig/createServerConfig",
  async ({ newServerConfigData }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming you're using token-based auth
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_CONFIG_CREATE}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newServerConfigData), // Sending the report config data
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }

      dispatch(fetchData());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteServerConfig = createAsyncThunk(
  "serverConfig/deleteServerConfig",
  async (name, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_CONFIG_DELETE}/${name}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 401 || response.status === 403) {
      localStorage.clear();
      return rejectWithValue("Unauthorized");
    }

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to update");
    }

    dispatch(fetchData());
  }
);

const serverConfigInitialState = {
  serverConfigData: [],
  newServerConfigData: {
    bindings: {},
    name: "",
    serviceIp: "",
    servicePort: "",
  },
  loading: false,
  error: null,
};

const serverConfigSlice = createSlice({
  name: "serverConfig",
  initialState: serverConfigInitialState,
  reducers: {
    updateServerConfigField: (state, action) => {
      const { name, value, index } = action.payload;
      state.serverConfigData[index][name] = value;
    },
    updateNewServerConfigField: (state, action) => {
      const { name, value } = action.payload;
      state.newServerConfigData[name] = value;
    },
    resetNewServerConfigData: (state, action) => {
      state.newServerConfigData = serverConfigInitialState.newServerConfigData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.serverConfigData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateServerConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateServerConfig.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Server Config Updated.");
      })
      .addCase(updateServerConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(createServerConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(createServerConfig.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("New Server created.");
      })
      .addCase(createServerConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(deleteServerConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteServerConfig.fulfilled, (state, action) => {
        state.loading = false;
        toast("Server deleted.");
      })
      .addCase(deleteServerConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      });
  },
});

export const {
  updateServerConfigField,
  updateNewServerConfigField,
  resetNewServerConfigData,
} = serverConfigSlice.actions;
export default serverConfigSlice.reducer;
