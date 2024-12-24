import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBEData } from "./sidebarSlice";
import { HeaderList, BlockedEmployerList } from "../../data/BlockEmployerData";
import { toast } from "react-toastify";

const initialState = {
  beStatsData: {
    HeaderList,
    BlockedEmployerList,
  },
  blockEmployer: {
    itemName: "",
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

export const fetchList = createAsyncThunk(
  "blockedEmployer/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Blocked Employer"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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
        return rejectWithValue(data.message || "Failed to update name");
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
        return rejectWithValue(data || "Failed to delete entry");
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
        return rejectWithValue(
          data.message || "Failed to delete Blocked Employer"
        );
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
        return rejectWithValue(responseData || "Failed to add employer entry");
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
        return rejectWithValue(beDetails.message || "Failed to create clone");
      }
      return beDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const blockedEmployerSlice = createSlice({
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
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        // If action.payload has fewer or equal objects than ProjectList, only map action.payload

        const updatedList = action.payload.map((newListItem, index) => ({
          employerId: newListItem.name,
          href: newListItem.href,
          blockedOn: BlockedEmployerList[index]?.blockedOn || "14/09/2022",
          reasonForBlocking:
            BlockedEmployerList[index]?.reasonForBlocking ||
            "Fraudulent Activities",
          totalBlockedDuration:
            BlockedEmployerList[index]?.totalBlockedDuration || "8 months",
          status: BlockedEmployerList[index]?.status || "Inactive",
        }));

        // Assign the updatedList to BlockedEmployerList
        state.beStatsData.BlockedEmployerList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
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
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })

      // Update Blocked Employer Name
      .addCase(updateBlockedEmployerName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlockedEmployerName.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.itemName = action.payload.newName;
        toast.success("Name updated successfully!");
      })
      .addCase(updateBlockedEmployerName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })

      // Delete Blocked Employer Entry
      .addCase(deleteBlockedEmployerEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedEmployerEntry.fulfilled, (state, action) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteBlockedEmployerEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })

      // Delete Blocked Employer
      .addCase(deleteBlockedEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlockedEmployer.fulfilled, (state) => {
        state.loading = false;
        toast("Deleted successfully!");
      })
      .addCase(deleteBlockedEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })

      // Add Blocked Employer Entry
      .addCase(addBlockedEmployerEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBlockedEmployerEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.blockEmployer.name = "";
        toast.success("Employer entry added successfully!");
      })
      .addCase(addBlockedEmployerEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })

      // Clone Blocked Employer
      .addCase(cloneBlockedEmployer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneBlockedEmployer.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(cloneBlockedEmployer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { setFormData, setBlockEmployersTempId } = blockedEmployerSlice.actions;

export default blockedEmployerSlice.reducer;
