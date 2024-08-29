import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch data
export const fetchRiskGrades = createAsyncThunk(
  "riskGradeCal/fetchRiskGrades",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_READ}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return rejectWithValue("Unauthorized");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to add a new item
export const addRiskGrade = createAsyncThunk(
  "riskGradeCal/addRiskGrade",
  async (newForm, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_ADD}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newForm),
      });
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      dispatch(fetchRiskGrades());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update an existing item
export const updateRiskGrade = createAsyncThunk(
  "riskGradeCal/updateRiskGrade",
  async (itemToUpdate, { dispatch, rejectWithValue }) => {
    const { id } = itemToUpdate;
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_UPDATE}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemToUpdate),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      dispatch(fetchRiskGrades());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to delete an item
export const deleteRiskGrade = createAsyncThunk(
  "riskGradeCal/deleteRiskGrade",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_DELETE}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      dispatch(fetchRiskGrades());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  allData: [],
  newForm: {
    id: Date.now(),
    from: "",
    to: "",
    grade: "",
  },
  loading: false,
  error: null,
};

const riskGradeCalSlice = createSlice({
  name: "riskGradeCal",
  initialState,
  reducers: {
    handleNewInputChange: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.newForm[name] = checked;
      } else {
        state.newForm[name] = value;
      }
    },
    handleExistingInputChange: (state, action) => {
      const { id, name, value } = action.payload;
      const itemIndex = state.allData.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.allData[itemIndex][name] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Data Reducers
      .addCase(fetchRiskGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRiskGrades.fulfilled, (state, action) => {
        state.allData = action.payload;
        state.loading = false;
      })
      .addCase(fetchRiskGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRiskGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRiskGrade.fulfilled, (state) => {
        state.loading = false;
        state.newForm = {
          id: Date.now(),
          from: "",
          to: "",
          grade: "",
        };
      })
      .addCase(addRiskGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Item Reducers
      .addCase(updateRiskGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRiskGrade.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateRiskGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete Item Reducers
      .addCase(deleteRiskGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRiskGrade.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRiskGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { handleNewInputChange, handleExistingInputChange } =
  riskGradeCalSlice.actions;
export default riskGradeCalSlice.reducer;
