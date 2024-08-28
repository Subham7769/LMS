import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDBRData } from "./sidebarSlice";

export const fetchRules = createAsyncThunk(
  "dbr/fetchRules",
  async (dbcTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DBR_READ}${dbcTempId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to fetch data");
      }

      const debtBurdenConfig = await response.json();
      return debtBurdenConfig;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchName = createAsyncThunk(
  "dbr/fetchName",
  async (dbcTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DBR_NAME_READ}${dbcTempId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to fetch name");
      }

      const retrievedname = await response.json();
      return retrievedname.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateName = createAsyncThunk(
  "dbr/updateName",
  async ({ dbcTempId, newName }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DBR_NAME_UPDATE}${dbcTempId}/name/${newName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to update name");
      }

      dispatch(fetchName(dbcTempId));
      dispatch(fetchDBRData());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createCloneDBC = createAsyncThunk(
  "dbr/createCloneDBC",
  async ({ dbcTempId, cloneDBCName }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_DBR_CREATE_CLONE
        }${dbcTempId}/clone/${cloneDBCName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to create clone");
      }

      const dbcDetails = await response.json();
      dispatch(fetchDBRData());
      return dbcDetails.dbcTempId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRule = createAsyncThunk(
  "dbr/addRule",
  async ({ operators, formData, dbcTempId }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");

      const updatedFormData = {
        ...formData,
        dbcTempId, // Add or update the dbcTempId property
      };

      const response = await fetch(`${import.meta.env.VITE_DBR_ADD_RULE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operators, dbrRules: [updatedFormData] }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to add rule");
      }
      await dispatch(fetchRules(dbcTempId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDBC = createAsyncThunk(
  "dbr/deleteDBC",
  async (dbcTempId, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DBR_DELETE}${dbcTempId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to delete item");
      }

      dispatch(fetchDBRData());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteRule = createAsyncThunk(
  "debtBurdenConfig/deleteRule",
  async ({ index, ruleName, dbcTempId, authToken }, { rejectWithValue }) => {
    const url = `${
      import.meta.env.VITE_DBR_DELETE_RULE
    }${dbcTempId}/${ruleName}`;
    console.log("Attempting to delete rule at URL:", url);

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Received response with status:", response.status);

      if (!response.ok) {
        console.error("Failed to delete rule. Status:", response.status);
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          window.location.href = "/login";
        }
        return rejectWithValue("Failed to delete rule");
      }

      console.log("Deletion successful, returning index:", index);
      return index;
    } catch (error) {
      console.error("Error encountered during deletion:", error);
      return rejectWithValue("Error deleting rule");
    }
  }
);

export const updateRule = createAsyncThunk(
  "dbr/updateRule",
  async (
    { index, field, value, rules, operators, dbcTempId },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");

      // Create a deep copy of the rules array to avoid mutating the original state
      const newRules = JSON.parse(JSON.stringify(rules));
      newRules[index][field] = value; // Update the specific field

      // Make the PUT request with the updated rules
      const response = await fetch(`${import.meta.env.VITE_DBR_UPDATE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operators, dbrRules: newRules }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        throw new Error("Failed to update rule");
      }

      // Return the updated rules array if the request was successful
      return newRules;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const dbrSlice = createSlice({
  name: "dbrConfig",
  initialState: {
    formData: {
      ruleName: "0",
      dbcTempId: "",
      employerRetired: "",
      startNetIncomeBracketInSARule: "",
      endNetIncomeBracketInSARule: "",
      productLevel: "",
      consumerDBR: "",
      gdbrWithoutMTG: "",
      gdbrWithMTG: "",
    },
    rules: [],
    debtBurdenData: [],
    operators: {
      firstNetIncomeBracketInSARuleOperator: "",
      secondNetIncomeBracketInSARuleOperator: "",
    },
    name: "Fetching Name...",
    currentPage: 1,
    loading: false,
    isModalOpen: false,
  },
  reducers: {
    handleChange: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.formData[name] = checked;
      } else {
        state.formData[name] = value;
      }
    },
    resetFormData: (state) => {
      state.formData = {
        ruleName: "0",
        dbcTempId: "",
        employerRetired: null,
        startNetIncomeBracketInSARule: "",
        endNetIncomeBracketInSARule: "",
        productLevel: "",
        consumerDBR: "",
        gdbrWithoutMTG: "",
        gdbrWithMTG: "",
      };
    },
    updateOperator: (state, action) => {
      const { name, value } = action.payload;
      state.operators = {
        ...state.operators,
        [name]: value,
      };
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.debtBurdenData = action.payload;
        state.rules = action.payload?.dbrRules || [];
        state.operators = action.payload?.operators || [];
        state.loading = false;
      })
      .addCase(fetchRules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRules.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchName.fulfilled, (state, action) => {
        state.name = action.payload;
        state.loading = false;
      })
      .addCase(deleteRule.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteRule.fulfilled, (state, action) => {
        state.rules.splice(action.payload, 1);
        state.status = "succeeded";
      })
      .addCase(deleteRule.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchName.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateName.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateName.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCloneDBC.fulfilled, (state, action) => {
        state.currentPage = 1;
        state.loading = false;
      })
      .addCase(createCloneDBC.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCloneDBC.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRule.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDBC.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDBC.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDBC.rejected, (state) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateRule.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateRule.fulfilled, (state, action) => {
        state.rules = action.payload;
        state.loading = false;
      })
      .addCase(updateRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  handleChange,
  toggleModal,
  setCurrentPage,
  handleSort,
  updateOperator,
  resetFormData,
} = dbrSlice.actions;

export default dbrSlice.reducer;
