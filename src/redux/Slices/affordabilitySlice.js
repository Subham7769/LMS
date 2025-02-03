import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  AffordabilityHeaderList,
  AffordabilityList,
} from "../../data/AffordabilityData";

export const fetchName = createAsyncThunk(
  "affordability/fetchName",
  async (affordabilityCriteriaTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_AFFORDABILITY_NAME_READ
        }${affordabilityCriteriaTempId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
      }
      const data = await response.json();
      return data.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAffordabilityName = createAsyncThunk(
  "affordability/updateAffordabilityName",
  async ({ affordabilityCriteriaTempId, newName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_AFFORDABILITY_NAME_UPDATE
    }${affordabilityCriteriaTempId}/name/${newName}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return newName;
      } else {
        return rejectWithValue("Failed to update name");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAffordability = createAsyncThunk(
  "affordability/deleteAffordability",
  async (affordabilityCriteriaTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_AFFORDABILITY_DELETE
      }/${affordabilityCriteriaTempId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to delete");
    }

    return affordabilityCriteriaTempId; // Return the ID for any further processing
  }
);

export const createClone = createAsyncThunk(
  "affordability/createClone",
  async ({ affordabilityCriteriaTempId, cloneName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_AFFORDABILITY_CREATE_CLONE
      }${affordabilityCriteriaTempId}/clone/${cloneName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to create clone");
    }

    const data = await response.json();
    return data; // Assuming it returns the new affordabilityCriteriaTempId
  }
);

export const updateOrPostData = createAsyncThunk(
  "affordability/updateOrPostData",
  async ({ formData, isUpdate }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = isUpdate
      ? `${import.meta.env.VITE_AFFORDABILITY_UPDATE}${
          formData.affordabilityCriteriaRuleId
        }`
      : import.meta.env.VITE_AFFORDABILITY_CREATE_NEW_CRITERIA;
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

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchData = createAsyncThunk(
  "affordability/fetchData",
  async (affordabilityCriteriaTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_AFFORDABILITY_READ
        }${affordabilityCriteriaTempId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
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

export const fetchList = createAsyncThunk(
  "affordability/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Affordability"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const affordabilityInitialState = {
  itemName: "",
  affordabilityStatsData: {
    AffordabilityHeaderList,
    AffordabilityList,
  },
  affordabilityData: {
    actingAllowance: "",
    affordabilityCriteriaTempId: "",
    basicPay: "",
    doubleClassAllowance: "",
    healthShiftAllowance: "",
    housingAllowance: "",
    infectiousHealthRisk: "",
    interfaceAllowance: "",
    napsa: "",
    otherAllowances: "",
    payee: "",
    responsibilityAllowance: "",
    ruralRemoteHardshipAllowance: "",
    totalOtherDeductions: "",
    transportAllowance: "",
    unionContribution: "",
  },
  loading: false,
  error: null,
};

const affordabilitySlice = createSlice({
  name: "affordability",
  initialState: affordabilityInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAffordabilityData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    handleChangeAffordabilityData: (state, action) => {
      const { name, value } = action.payload;
      state.affordabilityData = {
        ...state.affordabilityData,
        [name]: value,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true; // Data is being fetched
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = false;
        // If action.payload has fewer or equal objects than TCLList, only map action.payload
        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          // createdOn: TCLList[index]?.createdOn || "14/09/2022",
          // openLoans: TCLList[index]?.openLoans || "1490",
          // totalDisbursedPrincipal:
          //   TCLList[index]?.totalDisbursedPrincipal || "$750M",
          // status: TCLList[index]?.status || "Active",
        }));

        // Assign the updatedList to RecoveryList
        state.affordabilityStatsData.AffordabilityList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
      })
      .addCase(fetchName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateAffordabilityName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAffordabilityName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
        toast.success("Name updated successfully!");
      })
      .addCase(updateAffordabilityName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteAffordability.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAffordability.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Affordability criteria deleted successfully!");
      })
      .addCase(deleteAffordability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createClone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClone.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(createClone.rejected, (state, action) => {
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateOrPostData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateOrPostData.fulfilled, (state, action) => {
        state.affordabilityData = action.payload;
        toast.success("Data updated successfully!");
        state.loading = false;
      })
      .addCase(updateOrPostData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload[0] != null) {
          state.affordabilityData = action.payload[0];
        } else {
          state.affordabilityData = {
            ...affordabilityInitialState.affordabilityData,
            affordabilityCriteriaTempId: action.meta.arg,
          };
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setLoading,
  setAffordabilityData,
  setError,
  handleChangeAffordabilityData,
} = affordabilitySlice.actions;
export default affordabilitySlice.reducer;
