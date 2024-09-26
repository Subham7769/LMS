import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { HeaderList, RACList } from "../../data/RacData";

export const fetchList = createAsyncThunk(
  "rac/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find((menu) => menu.title === "RAC");
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

export const racSlice = createSlice({
  name: "rac",
  initialState: {
    tabs: [],
    activeTabId: null,
    isConfigModalOpen: false,
    configTabId: null,
    config: {
      apiEndpoint: "https://example.com/",
      submitButtonText: "Submit",
      successMessage: "Form submitted successfully",
      showUpdateButton: false,
      showDeleteButton: false,
    },
    loading: false,
    error: null,
    racStatsData: {
      HeaderList,
      RACList,
    },
  },
  reducers: {
    // Create a new tab
    createTab: (state, action) => {
      const newTab = {
        id: uuidv4(),
        name: action.payload,
        fields: [],
        config: {
          apiEndpoint: "",
          submitButtonText: "Submit",
          successMessage: "Form submitted successfully",
        },
      };
      state.tabs.push(newTab);
      state.activeTabId = newTab.id;
    },

    // Duplicate a tab
    duplicateTab: (state, action) => {
      const tabToDuplicate = state.tabs.find(
        (tab) => tab.id === action.payload
      );
      if (tabToDuplicate) {
        const newTab = {
          ...tabToDuplicate,
          id: uuidv4(),
          name: `${tabToDuplicate.name} (Copy)`,
        };
        state.tabs.push(newTab);
        state.activeTabId = newTab.id;
      }
    },

    // Delete a tab
    deleteTab: (state, action) => {
      const tabId = action.payload;
      const filteredTabs = state.tabs.filter((tab) => tab.id !== tabId);
      state.tabs = filteredTabs;
      if (state.activeTabId === tabId) {
        state.activeTabId = filteredTabs.length > 0 ? filteredTabs[0].id : null;
      }
    },

    // Set active tab
    setActiveTab: (state, action) => {
      state.activeTabId = action.payload;
    },

    // Update tab configuration
    updateTabConfig: (state, action) => {
      const { tabId, config } = action.payload;
      state.tabs = state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, config } : tab
      );
    },

    // Update tab fields
    updateTabFields: (state, action) => {
      const { tabId, fields } = action.payload;
      state.tabs = state.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, fields } : tab
      );
    },

    // Toggle configuration modal
    toggleConfigModal: (state, action) => {
      state.isConfigModalOpen = action.payload.isOpen;
      state.configTabId = action.payload.tabId;
    },

    // Update global config
    updateGlobalConfig: (state, action) => {
      state.config = action.payload;
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
          createdOn: RACList[index]?.createdOn || "14/09/2022",
          approved: RACList[index]?.approved || "40%",
          totalProcessed: RACList[index]?.totalProcessed || "2367",
          status: RACList[index]?.status || "Active",
        }));

        // Assign the updatedList to RACList
        state.racStatsData.RACList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  createTab,
  duplicateTab,
  deleteTab,
  setActiveTab,
  updateTabConfig,
  updateTabFields,
  toggleConfigModal,
  updateGlobalConfig,
} = racSlice.actions;

export default racSlice.reducer;
