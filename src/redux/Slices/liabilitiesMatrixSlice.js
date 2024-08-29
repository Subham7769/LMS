import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for API calls
export const fetchData = createAsyncThunk(
  "liabilitiesMatrix/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_LIABILITIES_READ}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewItem = createAsyncThunk(
  "liabilitiesMatrix/addNewItem",
  async (newForm, { dispatch, rejectWithValue }) => {
    const postData = {
      product: newForm.product,
      simahDescriptionCode: newForm.simahDescriptionCode,
      issuer: newForm.issuer,
      applicabilityGDBR: newForm.applicabilityGDBR,
      totalExposure: newForm.totalExposure,
      defaultConsideredInSIMAHscore: newForm.defaultConsideredInSIMAHscore,
      activeRule: newForm.activeRule === "" ? "NO" : "YES",
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_LIABILITIES_ADD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        dispatch(fetchData());
      } else {
        throw new Error("Failed to add new item");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating a specific row
export const updateItem = createAsyncThunk(
  "liabilitiesMatrix/updateItem",
  async (
    { updatedItem, oldSimahDescriptionCode },
    { dispatch, rejectWithValue }
  ) => {
    const putData = {
      product: updatedItem.product,
      issuer: updatedItem.issuer,
      activeRule: updatedItem.activeRule === true ? "YES" : "NO",
      applicabilityGDBR: updatedItem.applicabilityGDBR,
      totalExposure: updatedItem.totalExposure,
      defaultConsideredInSIMAHscore: updatedItem.defaultConsideredInSIMAHscore,
      simahDescriptionCode: updatedItem.simahDescriptionCode,
      newSimahDescriptionCode: updatedItem.simahDescriptionCode,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LIABILITIES_UPDATE}${oldSimahDescriptionCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(putData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update the item");
      }

      dispatch(fetchData()); // Re-fetch the data after a successful update
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a specific row
export const deleteItem = createAsyncThunk(
  "liabilitiesMatrix/deleteItem",
  async (deleteURL, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LIABILITIES_DELETE}${deleteURL}`,
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

      dispatch(fetchData()); // Re-fetch the data after a successful deletion
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const liabilitiesMatrixSlice = createSlice({
  name: "liabilitiesMatrix",
  initialState: {
    allData: [],
    loading: false,
    newForm: {
      product: "",
      simahDescriptionCode: "",
      issuer: "",
      applicabilityGDBR: "",
      totalExposure: "",
      activeRule: "",
      defaultConsideredInSIMAHscore: "",
    },
    error: null,
  },
  reducers: {
    handleNewInputChange: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.newForm[name] = checked ? "YES" : "NO";
      } else {
        state.newForm[name] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.allData = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNewItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewItem.fulfilled, (state) => {
        state.loading = false;
        state.newForm = {
          product: "",
          simahDescriptionCode: "",
          issuer: "",
          applicabilityGDBR: "",
          totalExposure: "",
          activeRule: "",
          defaultConsideredInSIMAHscore: "",
        };
      })
      .addCase(addNewItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { handleNewInputChange } = liabilitiesMatrixSlice.actions;
export default liabilitiesMatrixSlice.reducer;
