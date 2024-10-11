import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, RACList } from "../../data/RacData";
import axios from "axios";

export const fetchList = createAsyncThunk(
  "rac/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find((menu) => menu.title === "RAC");
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

// Define the asyncThunk for fetching dynamicRac details
export const fetchDynamicRacDetails = createAsyncThunk(
  "rac/fetchDynamicRacDetails",
  async (racId , { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/dynamic/rac/${racId}/all-rules`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      console.log(response);
      return response.data; // Assuming the API returns data in the desired format
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error response if the request fails
    }
  }
);

// Define the asyncThunk for updating Dynamic RAC
export const updateDynamicRac = createAsyncThunk(
  "rac/updateDynamicRac",
  async ({ racId, updateData }, { rejectWithValue }) => {
    const url = `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/dynamic/rac/rule/${racId}`;

    try {
      const response = await axios.put(url, updateData);
      return response.data; // Assuming the API returns the updated data
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error response if the request fails
    }
  }
);

// Define the asyncThunk for deleting a Dynamic RAC
export const deleteDynamicRac = createAsyncThunk(
  "rac/deleteDynamicRac",
  async (racId , { rejectWithValue }) => {
    console.log(racId)
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/dynamic/rac/${racId}/all-rules`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      return response.data; // Assuming the API returns data in the desired format
    } catch (error) {
      return rejectWithValue(error.response.data); // Return the error response if the request fails
    }
  }
);

export const cloneDynamicRac = createAsyncThunk("rac/cloneDynamicRac");

const initialState = {
  racConfig: {
    racDetails: { id: "", name: "abc", racId: "", description: null }, // Updated racDetails structure
    sections: [],
  },
  racStatsData: {
    HeaderList,
    RACList,
  },
  isEditorMode: true,
  loading: false,
  error: null,
};

const DynamicRacSlice = createSlice({
  name: "DynamicRac",
  initialState,
  reducers: {
    downloadConfig: (state) => {
      const config = {
        sections: state.racConfig.sections,
      };
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        state.racConfig.racDetails.name !== ""
          ? state.racConfig.racDetails.name
          : "New Dynamic Form"
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    uploadConfig(state, action) {
      const { racDetails, sections } = action.payload;

      // Update both racDetails and sections in the state
      state.racConfig = {
        ...state.racConfig,
        racDetails: racDetails || state.racConfig.racDetails, // Update racDetails, fallback to current state if undefined
        sections: sections || state.racConfig.sections, // Update sections, fallback to current state if undefined
      };
    },
    updateRacConfigName(state, action) {
      const { name } = action.payload;
      state.racConfig.racDetails = {
        ...state.racConfig.racDetails,
        name: name,
      };
    },
    setSection(state, action) {
      const { newSections } = action.payload;
      state.racConfig.sections = newSections;
    },
    addSection(state, action) {
      const newSection = {
        sectionId: `section-${Date.now()}`,
        sectionName: `New Section ${state.racConfig.sections.length + 1}`,
        size: "full",
        rules: [],
      };
      state.racConfig.sections.push(newSection);
    },
    updateSection(state, action) {
      const { sectionId, name } = action.payload;
      state.racConfig.sections = state.racConfig.sections.map((section) =>
        section.sectionId === sectionId ? { ...section, sectionName: name } : section
      );
    },
    removeSection(state, action) {
      const { sectionId } = action.payload;
      state.racConfig.sections = state.racConfig.sections.filter(
        (section) => section.sectionId !== sectionId
      );
    },
    addRule(state, action) {
      const { sectionId, ruleConfig } = action.payload;

      if (sectionId) {
        let newRule = {};
        if (ruleConfig.fieldType === "STRING") {
          const {
            numberCriteriaRangeList,
            firstOperator,
            secondOperator,
            ...restRuleConfig
          } = ruleConfig;
          newRule = {
            dynamicRacRuleId: `Rule-${Date.now()}`,
            ...restRuleConfig,
          };
        } else {
          // const { criteriaValues, ...restRuleConfig } = ruleConfig;
          newRule = {
            dynamicRacRuleId: `Rule-${Date.now()}`,
            ...ruleConfig,
          };
        }

        state.racConfig.sections = state.racConfig.sections.map((section) => {
          if (section.sectionId === sectionId) {
            return {
              ...section,
              rules: [...section.rules, newRule],
            };
          }
          return section;
        });
      }
    },
    removeRule(state, action) {
      const { sectionId, dynamicRacRuleId } = action.payload;
      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.sectionId === sectionId) {
          return {
            ...section,
            rules: section.rules.filter(
              (rule) => rule.dynamicRacRuleId !== dynamicRacRuleId
            ),
          };
        }
        return section;
      });
    },
    // New reducer to update rule properties
    updateRuleNumberCriteria: (state, action) => {
      const { sectionId, dynamicRacRuleId, updates, numberCriteriaIndex } =
        action.payload;

      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.sectionId === sectionId) {
          return {
            ...section,
            rules: section.rules.map((rule) => {
              if (rule.dynamicRacRuleId === dynamicRacRuleId) {
                return {
                  ...rule,
                  ...updates,
                  numberCriteriaRangeList: rule.numberCriteriaRangeList.map(
                    (range, index) =>
                      index === numberCriteriaIndex
                        ? { ...range, ...updates.numberCriteriaRangeList[0] }
                        : range
                  ),
                };
              }
              return rule;
            }),
          };
        }
        return section;
      });
    },
    handleChangeNumberRule(state, action) {
      const { sectionId, dynamicRacRuleId, name, value } = action.payload;
      const stringValue = value.toString();
      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.sectionId === sectionId) {
          return {
            ...section,
            rules: section.rules.map((rule) => {
              if (rule.dynamicRacRuleId === dynamicRacRuleId) {
                return {
                  ...rule,
                  criteriaValues: [stringValue],
                };
              }
              return rule;
            }),
          };
        }
        return section;
      });
    },
    handleChangeStringRule(state, action) {
      const { sectionId, dynamicRacRuleId, values } = action.payload;
      state.racConfig.sections = state.racConfig.sections.map((section) => {
        if (section.sectionId === sectionId) {
          return {
            ...section,
            rules: section.rules.map((rule) => {
              if (rule.dynamicRacRuleId === dynamicRacRuleId) {
                return {
                  ...rule,
                  criteriaValues: [...values],
                };
              }
              return rule;
            }),
          };
        }
        return section;
      });
    },
    removeTag: (state, action) => {
      const { sectionId, dynamicRacRuleId, tagToRemove } = action.payload;
      const section = state.racConfig.sections.find(
        (section) => section.sectionId === sectionId
      );
      const rule = section.rules.find(
        (rule) => rule.dynamicRacRuleId === dynamicRacRuleId
      );

      if (rule && rule.criteriaValues) {
        rule.criteriaValues = rule.criteriaValues.filter(
          (tag) => tag !== tagToRemove
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          createdOn: RACList[index]?.createdOn || "14/09/2022",
          approved: RACList[index]?.approved || "40%",
          totalProcessed: RACList[index]?.totalProcessed || "2367",
          status: RACList[index]?.status || "Active",
        }));
        state.racStatsData.RACList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteDynamicRac.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDynamicRac.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(cloneDynamicRac.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneDynamicRac.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(cloneDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDynamicRacDetails.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchDynamicRacDetails.fulfilled, (state, action) => {
        console.log(action.payload)
        state.racConfig = {
          ...state.racConfig,
          sections:action.payload.sections ? action.payload.sections: []
        }; // Store the fetched data
        state.loading = false;
      })
      .addCase(fetchDynamicRacDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error message
      })
  },
});

export const {
  downloadConfig,
  uploadConfig,
  updateRacConfigName,
  setSection,
  addSection,
  removeSection,
  updateSection,
  addRule,
  removeRule,
  updateRuleNumberCriteria,
  handleChangeNumberRule,
  handleChangeStringRule,
  removeTag,
} = DynamicRacSlice.actions;
export default DynamicRacSlice.reducer;
