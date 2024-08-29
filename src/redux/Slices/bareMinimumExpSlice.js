// src/redux/slices/bareMinimumExpSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    expensesName: "",
    expensesFrequency: "",
    bareMinimum: "",
    dependantType: "",
  },
  expenseData: [],
  loading: false,
  error: null,
};

// Async thunk for fetching data
export const fetchExpenseData = createAsyncThunk(
  "bareMinimumExp/fetchExpenseData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EXPENSE_READ}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.expenses;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding fields
export const addExpenseField = createAsyncThunk(
  "bareMinimumExp/addExpenseField",
  async (formData, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EXPENSE_ADD}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch the updated data after successful addition
      dispatch(fetchExpenseData());
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for saving updates
export const saveExpenseField = createAsyncThunk(
  "bareMinimumExp/saveExpenseField",
  async (id, { getState, dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { expenseData } = getState().bareMinimumExp;
    const itemToUpdate = expenseData.find((item) => item.id === id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EXPENSE_UPDATE}${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch(fetchExpenseData());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting fields
export const deleteExpenseField = createAsyncThunk(
  "bareMinimumExp/deleteExpenseField",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EXPENSE_DELETE}${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }

      // Fetch the updated data after deletion
      dispatch(fetchExpenseData());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const bareMinimumExpSlice = createSlice({
  name: "bareMinimumExp",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.formData[name] = checked;
      } else {
        state.formData[name] = value;
      }
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
    handleInputChange: (state, action) => {
      const { id, name, value } = action.payload;
      const updatedData = state.expenseData.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      state.expenseData = updatedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenseData.fulfilled, (state, action) => {
        state.loading = false;
        state.expenseData = action.payload;
      })
      .addCase(fetchExpenseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpenseField.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpenseField.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addExpenseField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveExpenseField.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveExpenseField.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveExpenseField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteExpenseField.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpenseField.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteExpenseField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updateFormData, handleInputChange, resetFormData } =
  bareMinimumExpSlice.actions;

export default bareMinimumExpSlice.reducer;
