import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBEData } from "./sidebarSlice";

const initialState = {
  blockEmployer: {
    itemName: "",
    cloneSuccess: null,
    blockEmployersTempId: "",
    name: "",
    cloneBEName: "",
    fieldType: "Employer",
    result: 1,
    tags: [],
  },
  // Name of the blocked employer
  loading: false, // Loading state
  error: null, // Error messages
};

const getToken = () => localStorage.getItem("authToken");

export const fetchBlockedEmployerData = createAsyncThunk(
  "blockedEmployer/fetchBlockedEmployerData",
  async (blockEmployersTempId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${import.meta.env.VITE_BLOCKED_EMPLOYER_READ}${blockEmployersTempId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlockedEmployerName = createAsyncThunk(
  "blockedEmployer/fetchBlockedEmployerName",
  async (blockEmployersTempId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BLOCKED_EMPLOYER_NAME_READ
        }${blockEmployersTempId}`,
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
      if (!response.ok) {
        return rejectWithValue(data);
      }
      return data.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBlockedEmployerName = createAsyncThunk(
  "blockedEmployer/updateBlockedEmployerName",
  async ({ blockEmployersTempId, newName }, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BLOCKED_EMPLOYER_NAME_UPDATE
        }${blockEmployersTempId}/name/${newName}`,
        {
          method: "PUT",
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
        const data = await response.json();
        return rejectWithValue(data);
      }
      dispatch(fetchBEData());
      return { newName };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlockedEmployerEntry = createAsyncThunk(
  "blockedEmployer/deleteBlockedEmployerEntry",
  async ({ blockEmployersTempId, name, ruleName }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BLOCKED_EMPLOYER_DELETE_ENTRY
        }${blockEmployersTempId}/${ruleName}/block-employers-rule/${name}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBlockedEmployer = createAsyncThunk(
  "blockedEmployer/deleteBlockedEmployer",
  async (blockEmployersTempId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BLOCKED_EMPLOYER_DELETE
        }${blockEmployersTempId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addBlockedEmployerEntry = createAsyncThunk(
  "blockedEmployer/addBlockedEmployerEntry",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getToken();
      const state = getState();
      const blockEmployer = state.blockedEmployer.blockEmployer;
      const tags = state.blockedEmployer.blockEmployer.tags;

      if (blockEmployer.name === "") {
        return rejectWithValue("Cannot post empty data");
      }

      const payload = {
        blockEmployerName: blockEmployer.name,
        blockEmployersTempId: blockEmployer.blockEmployersTempId,
        fieldType: blockEmployer.fieldType,
        result: blockEmployer.result,
        ruleName: tags && tags[0] && tags[0].ruleName ? tags[0].ruleName : "0",
      };

      const method = tags.length === 0 ? "POST" : "PUT";

      const response = await fetch(
        `${import.meta.env.VITE_BLOCKED_EMPLOYER_CREATE_ENTRY}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ blockEmployersRules: [payload] }),
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        return rejectWithValue(responseData);
      }
      return payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const cloneBlockedEmployer = createAsyncThunk(
  "blockedEmployer/cloneBlockedEmployer",
  async ({ blockEmployersTempId, cloneBEName }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await fetch(
        `${
          import.meta.env.VITE_BLOCKED_EMPLOYER_CREATE_CLONE
        }${blockEmployersTempId}/clone/${cloneBEName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized");
      }
      const beDetails = await response.json();
      if (!response.ok) {
        return rejectWithValue(beDetails);
      }
      return beDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const beSlice = createSlice({
  name: "blockedEmployer",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.blockEmployer = { ...state.blockEmployer, ...action.payload };
    },
    setBlockEmployersTempId: (state, action) => {
      state.blockEmployer.blockEmployersTempId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Blocked Employer Data
      .addCase(fetchBlockedEmployerData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlockedEmployerData.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.tags = action.payload.flatMap((item) =>
          item.blockEmployersName.map((name) => ({
            ruleName: item.ruleName, // Include ruleName from each payload item
            name: name, // Include each blockEmployersName as name
          }))
        );
      })
      .addCase(fetchBlockedEmployerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch Blocked Employer Name
      .addCase(fetchBlockedEmployerName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlockedEmployerName.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.itemName = action.payload;
      })
      .addCase(fetchBlockedEmployerName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update Blocked Employer Name
      .addCase(updateBlockedEmployerName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlockedEmployerName.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.itemName = action.payload.newName;
      })
      .addCase(updateBlockedEmployerName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Blocked Employer Entry
      .addCase(deleteBlockedEmployerEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedEmployerEntry.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteBlockedEmployerEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete Blocked Employer
      .addCase(deleteBlockedEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedEmployer.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBlockedEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Blocked Employer Entry
      .addCase(addBlockedEmployerEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlockedEmployerEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.name = "";
      })
      .addCase(addBlockedEmployerEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Clone Blocked Employer
      .addCase(cloneBlockedEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneBlockedEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.cloneSuccess = action.payload.blockEmployerTempId;
      })
      .addCase(cloneBlockedEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFormData, setBlockEmployersTempId } = beSlice.actions;

export default beSlice.reducer;
