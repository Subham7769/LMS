import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBEData } from "./sidebarSlice"; 

const initialState = {
  formData: {
    blockEmployersTempId: "",
    name: "",
    cloneBEName: "",
    fieldType: "Employer",
    result: 1,
  },
  data: [], // Fetched data
  itemName: "", // Name of the blocked employer
  loading: false, // Loading state
  error: null, // Error messages
  cloneSuccess: null, // ID of the cloned employer (if any)
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
  async ({ blockEmployersTempId, newName }, { rejectWithValue }) => {
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
      return { name, ruleName };
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
      return { blockEmployersTempId };
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
      const formData = state.blockedEmployer.formData;
      const data = state.blockedEmployer.data;

      if (formData.name === "") {
        return rejectWithValue("Cannot post empty data");
      }

      const payload = {
        blockEmployerName: formData.name,
        blockEmployersTempId: formData.blockEmployersTempId,
        fieldType: formData.fieldType,
        result: formData.result,
        ruleName: data && data[0] && data[0].ruleName ? data[0].ruleName : "0",
      };

      const method = data.length === 0 ? "POST" : "PUT";

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
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = initialState.formData;
    },
    setBlockEmployersTempId: (state, action) => {
      state.formData.blockEmployersTempId = action.payload;
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
        state.data = action.payload;
      })
      .addCase(fetchBlockedEmployerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Fetch Blocked Employer Name
      .addCase(fetchBlockedEmployerName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlockedEmployerName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
      })
      .addCase(fetchBlockedEmployerName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Update Blocked Employer Name
      .addCase(updateBlockedEmployerName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlockedEmployerName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload.newName;
      })
      .addCase(updateBlockedEmployerName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Blocked Employer Entry
      .addCase(deleteBlockedEmployerEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedEmployerEntry.fulfilled, (state, action) => {
        state.loading = false;
        const { name, ruleName } = action.payload;
        state.data = state.data.map((item) => {
          if (item.ruleName === ruleName) {
            return {
              ...item,
              blockEmployersName: item.blockEmployersName.filter(
                (n) => n !== name
              ),
            };
          }
          return item;
        });
      })
      .addCase(deleteBlockedEmployerEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Delete Blocked Employer
      .addCase(deleteBlockedEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedEmployer.fulfilled, (state) => {
        state.loading = false;
        state.data = [];
        state.itemName = "";
        state.formData = initialState.formData;
      })
      .addCase(deleteBlockedEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add Blocked Employer Entry
      .addCase(addBlockedEmployerEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlockedEmployerEntry.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload;
        if (state.data.length === 0) {
          const newItem = {
            ruleName: payload.ruleName,
            blockEmployersName: [payload.blockEmployerName],
          };
          state.data = [newItem];
        } else {
          state.data = state.data.map((item) => {
            if (item.ruleName === payload.ruleName) {
              return {
                ...item,
                blockEmployersName: [
                  ...item.blockEmployersName,
                  payload.blockEmployerName,
                ],
              };
            }
            return item;
          });
        }
        state.formData.name = "";
      })
      .addCase(addBlockedEmployerEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Clone Blocked Employer
      .addCase(cloneBlockedEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneBlockedEmployer.fulfilled, (state, action) => {
        state.loading = false;
        state.cloneSuccess = action.payload.blockEmployerTempId;
      })
      .addCase(cloneBlockedEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setFormData, resetFormData, setBlockEmployersTempId } =
  beSlice.actions;

export default beSlice.reducer;
