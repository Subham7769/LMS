// redux/slices/recoverySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Define async thunks for fetching data and performing actions
export const fetchName = createAsyncThunk(
  "recovery/fetchName",
  async (recoveryEquationTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_RECOVERY_NAME_READ}${recoveryEquationTempId}`,
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
      const data = await response.json();
      return data.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchData = createAsyncThunk(
  "recovery/fetchData",
  async (recoveryEquationTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_RECOVERY_READ}${recoveryEquationTempId}`,
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
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating or posting data
export const updateOrPostData = createAsyncThunk(
  "recovery/updateOrPostData",
  async ({ formData, isUpdate }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = isUpdate
      ? `${import.meta.env.VITE_RECOVERY_UPDATE}${formData.recoveryEquationId}`
      : import.meta.env.VITE_RECOVERY_CREATE_CREATE_DATA;
    const method = isUpdate ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
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

export const deleteRecovery = createAsyncThunk(
  "recovery/deleteRecovery",
  async (recoveryEquationTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RECOVERY_DELETE}/${recoveryEquationTempId}`,
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
      return rejectWithValue("Failed to delete");
    }

    return recoveryEquationTempId; // Return the ID for any further processing
  }
);

export const createClone = createAsyncThunk(
  "recovery/createClone",
  async ({ recoveryEquationTempId, cloneName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_RECOVERY_CREATE_CLONE
      }${recoveryEquationTempId}/clone/${cloneName}`,
      {
        method: "POST",
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
      return rejectWithValue("Failed to create clone");
    }

    const data = await response.json();
    return data; // Assuming it returns the new recoveryEquationTempId
  }
);

export const updateRecoveryName = createAsyncThunk(
  "recovery/updateRecoveryName",
  async ({ recoveryEquationTempId, newName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_RECOVERY_NAME_UPDATE
    }${recoveryEquationTempId}/name/${newName}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      } else if (response.ok) {
        return newName;
      } else {
        return rejectWithValue("Failed to update name");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recoveryInitialState = {
  itemName: "",
  data: {
    id: "",
    recoveryEquationId: "",
    recoveryEquationTempId: "",
    tenure: "",
    tenureType: "",
    recoveryEquation: "",
  },
  loading: false,
  error: null,
};

const recoverySlice = createSlice({
  name: "recovery",
  initialState: recoveryInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    handleChange: (state, action) => {
      const { name, value } = action.payload;

      if (name === "recoveryEquation") {
        const allowedCharactersRegex = /^[wrd\s0-9()+=\-*/.><]*$/;
        if (!allowedCharactersRegex.test(value)) {
          toast.error(
            `Only w, r, d, 0-9 & allowed symbols:  'space' (  ) + - * / . < > `
          );
          return;
        }
      }

      state.data = {
        ...state.data,
        [name]: value,
      };

      console.log(state.data);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
      })
      .addCase(fetchName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.length > 0) {
          state.data = action.payload[0];
        } else {
          state.data = {
            id: "",
            recoveryEquationId: "",
            recoveryEquationTempId: action.meta.arg, // Assuming recoveryEquationTempId is passed as an argument
            tenure: "",
            tenureType: "",
            recoveryEquation: "",
          };
          console.log(state.data);
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrPostData.fulfilled, (state, action) => {
        state.data = action.payload;
        toast.success("Data updated successfully!");
      })
      .addCase(updateOrPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRecovery.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRecovery.fulfilled, (state, action) => {
        toast.success("Recovery configuration deleted successfully!");
      })
      .addCase(deleteRecovery.rejected, (state, action) => {
        state.error = action.error.message;
        if (action.payload === "Unauthorized") {
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error("Failed to delete recovery configuration.");
        }
      })
      .addCase(createClone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClone.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(createClone.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error("Failed to create clone.");
        state.error = action.error.message;
        }
        state.error = action.error.message;

      })
      .addCase(updateRecoveryName.fulfilled, (state, action) => {
        state.itemName = action.payload;
        toast.success("Name updated successfully!");
      })
      .addCase(updateRecoveryName.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error("Failed to update name.");
        }
        state.error = action.error.message;
      });
  },
});

export const { setLoading, setData, setError, handleChange } =
  recoverySlice.actions;
export default recoverySlice.reducer;
