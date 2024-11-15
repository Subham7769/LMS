import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDBRData } from "./sidebarSlice";
import { HeaderList, DebtBurdenList } from "../../data/DebtBurdenData";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update name");
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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create clone");
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
  async ({ operators, dbrData, dbcTempId }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");

      const updateddbrData = {
        ...dbrData,
        dbcTempId, // Add or update the dbcTempId property
      };

      const response = await fetch(`${import.meta.env.VITE_DBR_ADD_RULE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ operators, dbrRules: [updateddbrData] }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add rule");
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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete item");
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
          return rejectWithValue("Unauthorized");
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete rule");
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
  async (allDBRData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      // Create a deep copy of the rules array to avoid mutating the original state
      // const newRules = JSON.parse(JSON.stringify(rules));
      // newRules[index][field] = value; // Update the specific field

      // Make the PUT request with the updated rules
      const response = await fetch(`${import.meta.env.VITE_DBR_UPDATE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(allDBRData),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          return rejectWithValue("Unauthorized");
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update rule");
      }

      // Return the updated rules array if the request was successful
      return allDBRData.dbrRules;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "dbr/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "DBR Config"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

export const dbrConfigSlice = createSlice({
  name: "dbrConfig",
  initialState: {
    debtBurdenStatsData: {
      HeaderList,
      DebtBurdenList,
    },
    dbrData: {
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
    allDBRData: {
      operators: {
        firstNetIncomeBracketInSARuleOperator: "",
        secondNetIncomeBracketInSARuleOperator: "",
      },
      dbrRules: [],
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
        state.dbrData[name] = checked;
      } else {
        state.dbrData[name] = value;
      }
    },
    resetdbrData: (state) => {
      state.dbrData = {
        ruleName: "0",
        dbcTempId: "",
        employerRetired: "",
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
      state.allDBRData.operators = {
        ...state.allDBRData.operators,
        [name]: value,
      };
    },
    updateDbrRules: (state, action) => {
      state.allDBRData.dbrRules = action.payload;
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
      .addCase(fetchList.pending, (state) => {
        state.loading = true; // Data is being fetched
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        // If action.payload has fewer or equal objects than ProjectList, only map action.payload

        const updatedList = action.payload.map((newListItem, index) => ({
          caseId: newListItem.name,
          href: newListItem.href,
          openedOn: DebtBurdenList[index]?.openedOn || "14/09/2022",
          debtAmount: DebtBurdenList[index]?.debtAmount || "$100M",
          outstandingAmount: DebtBurdenList[index]?.outstandingAmount || "$50M",
          status: DebtBurdenList[index]?.status || "Active",
        }));

        // Assign the updatedList to DebtBurdenList
        state.debtBurdenStatsData.DebtBurdenList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRules.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        // state.rules = action.payload?.dbrRules || [];
        // state.operators = action.payload?.operators || [];
        const updatedAllDBRData = {
          ...action.payload,
          dbrRules: action.payload.dbrRules.map((rules) => ({
            ...rules,
            dataIndex: nanoid(), // Assign nanoid() to dataIndex
          })),
        };
        state.allDBRData = updatedAllDBRData;
        state.loading = false;
      })
      .addCase(fetchRules.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(fetchName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchName.fulfilled, (state, action) => {
        state.name = action.payload;
        state.loading = false;
      })
      .addCase(fetchName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(deleteRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRule.fulfilled, (state, action) => {
        state.loading = false;
        toast("Rule deleted successfully!");
      })
      .addCase(deleteRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(updateName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateName.fulfilled, (state) => {
        state.loading = false;
        toast.success("Name updated successfully!");
      })
      .addCase(updateName.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(createCloneDBC.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCloneDBC.fulfilled, (state, action) => {
        state.currentPage = 1;
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(createCloneDBC.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(addRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRule.fulfilled, (state) => {
        state.loading = false;
        toast.success("Rule added successfully!");
      })
      .addCase(addRule.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(deleteDBC.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDBC.fulfilled, (state) => {
        state.loading = false;
        toast("DBC deleted successfully!");
      })
      .addCase(deleteDBC.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRule.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Rule updated successfully");
      })
      .addCase(updateRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      });
  },
});

export const {
  handleChange,
  toggleModal,
  setCurrentPage,
  handleSort,
  updateOperator,
  updateDbrRules,
  resetdbrData,
} = dbrConfigSlice.actions;

export default dbrConfigSlice.reducer;
