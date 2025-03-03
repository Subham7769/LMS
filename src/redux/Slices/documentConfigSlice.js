import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import {
  DocumentConfigHeaderList,
  DocumentConfigList,
} from "../../data/DocumentConfigData";

export const fetchName = createAsyncThunk(
  "documentConfig/fetchName",
  async (dynamicDocumentTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_DOCUMENT_CONFIG_NAME_READ
        }${dynamicDocumentTempId}`,
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

export const updateName = createAsyncThunk(
  "documentConfig/updateName",
  async ({ dynamicDocumentTempId, newName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_DOCUMENT_CONFIG_NAME_UPDATE
    }${dynamicDocumentTempId}/name/${newName}`;

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

export const deleteDocumentConfig = createAsyncThunk(
  "documentConfig/deleteDocumentConfig",
  async (dynamicDocumentTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_DOCUMENT_CONFIG_DELETE}/${dynamicDocumentTempId}`,
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

    return dynamicDocumentTempId; // Return the ID for any further processing
  }
);

export const createClone = createAsyncThunk(
  "documentConfig/createClone",
  async ({ dynamicDocumentTempId, cloneName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_DOCUMENT_CONFIG_CLONE
      }${dynamicDocumentTempId}/clone/${cloneName}`,
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

export const fetchData = createAsyncThunk(
  "documentConfig/fetchData",
  async (dynamicDocumentTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DOCUMENT_CONFIG_READ}${dynamicDocumentTempId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get item");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addDocumentConfig = createAsyncThunk(
  "documentConfig/addDocumentConfig",
  async (addDocumentConfigDataPayload, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DOCUMENT_CONFIG_ADD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addDocumentConfigDataPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add item");
      }

      // Fetch the updated data after successful addition
      dispatch(fetchData(addDocumentConfigDataPayload.dynamicDocumentTempId));
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteConfig = createAsyncThunk(
  "documentConfig/deleteConfig",
  async (
    { dynamicDocumentId, dynamicDocumentTempId },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_DOCUMENT_CONFIG_DELETE_ENTRY
        }/${dynamicDocumentId}`,
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

      // Fetch updated data after successful deletion
      dispatch(fetchData(dynamicDocumentTempId));

      return dynamicDocumentId; // Return deleted ID for further handling if needed
    } catch (error) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);

export const updateDocumentConfigData = createAsyncThunk(
  "documentConfig/updateDocumentConfigData",
  async (updatePayload, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DOCUMENT_CONFIG_UPDATE_ENTRY}${
          updatePayload.dynamicDocumentId
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to save item");
      }

      dispatch(fetchData(updatePayload.dynamicDocumentTempId));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchList = createAsyncThunk(
  "documentConfig/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Document Config"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const documentConfigInitialState = {
  itemName: "",
  documentConfigStatsData: {
    DocumentConfigHeaderList,
    DocumentConfigList,
  },
  documentConfigData: [],
  addDocumentConfigData: {
    borrowerType: "",
    documentKeyName: "",
    dynamicDocumentTempId: "",
    usage: "",
  },
  loading: false,
  error: null,
};

export const documentConfigSlice = createSlice({
  name: "documentConfig",
  initialState: documentConfigInitialState,
  reducers: {
    setAddDocumentConfigData: (state, action) => {
      const { name, value } = action.payload;
      state.addDocumentConfigData[name] = value;
    },
    handleChangeDocumentConfigData: (state, action) => {
      const { id, name, value } = action.payload;
      const updatedData = state.documentConfigData.map((item) => {
        if (item.dynamicDocumentId === id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      state.documentConfigData = updatedData;
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
        state.documentConfigStatsData.DocumentConfigList = updatedList;
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
      .addCase(updateName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
        toast.success("Name updated successfully!");
      })
      .addCase(updateName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteDocumentConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDocumentConfig.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Document Config deleted!");
      })
      .addCase(deleteDocumentConfig.rejected, (state, action) => {
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
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload[0] != null) {
          const updatedDocumentConfigData = action.payload.map((data) => ({
            ...data,
            dataIndex: nanoid(),
          }));
          state.documentConfigData = updatedDocumentConfigData;
        } else {
          state.documentConfigData = action.payload;
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addDocumentConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDocumentConfig.fulfilled, (state) => {
        state.loading = false;
        state.addDocumentConfigData =
          documentConfigInitialState.addDocumentConfigData;
        toast.success("Added Successfully");
      })
      .addCase(addDocumentConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteConfig.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteConfig.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Config deleted!");
      })
      .addCase(deleteConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateDocumentConfigData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDocumentConfigData.fulfilled, (state) => {
        state.loading = false;
        toast.success("Updated Successfully");
      })
      .addCase(updateDocumentConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { setAddDocumentConfigData, handleChangeDocumentConfigData } =
  documentConfigSlice.actions;
export default documentConfigSlice.reducer;
