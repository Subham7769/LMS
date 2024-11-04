import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, RACList } from "../../data/RacData";
import axios from "axios";
import {  toast } from "react-toastify"

export const fetchList = createAsyncThunk(
  "rac/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Dynamic RAC"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

// Define the asyncThunk for fetching dynamicRac details
export const fetchDynamicRacDetails = createAsyncThunk(
  "rac/fetchDynamicRacDetails",
  async (racId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DYNAMIC_RAC_READ}${racId}/all-rules`,
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

// Define the asyncThunk for updating Dynamic RAC
export const updateDynamicRac = createAsyncThunk(
  "rac/updateDynamicRac",
  async ({ racId, updateData }, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_DYNAMIC_RAC_UPDATE}${racId}`;

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
  async (racId, { rejectWithValue }) => {
    console.log(racId);
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DYNAMIC_RAC_DELETE}${racId}`,
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

// Async thunk for updating a Dynamic RAC rule
export const saveDynamicRac = createAsyncThunk(
  "rac/saveDynamicRac", // Action type
  async (racConfig, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_DYNAMIC_RAC_CREATE}`,
        racConfig, // Pass the data to update here
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the headers
            "Content-Type": "application/json", // Ensure the content-type is JSON
          },
        }
      );
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Define the asyncThunk for cloning Dynamic RAC
export const cloneDynamicRac = createAsyncThunk(
  "rac/cloneDynamicRac",
  async ({ racId, racName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_DYNAMIC_RAC_CREATE_CLONE
        }${racId}/clone/${racName}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assuming the API returns the cloned RAC details
    } catch (error) {
      return rejectWithValue(error.response.data || error.message); // Error handling
    }
  }
);

// Define the asyncThunk for fetching option list
export const fetchOptionList = createAsyncThunk(
  "rac/fetchOptionList",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/dynamic/rac/3669df8e-db60-4a93-beb4-88daede5b34f/available-names",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct placement of headers
          },
        }
      );
      return response.data; // Return the data from the API response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Handle errors
    }
  }
);

// Define the asyncThunk for deleting a rule by its ruleId
export const deleteRuleById = createAsyncThunk(
  "rac/deleteRuleById",
  async (dynamicRacRuleId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DYNAMIC_RAC_DELETE_RULE}${dynamicRacRuleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Returning the success response if deletion was successful
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // Returning error if the request fails
    }
  }
);

// Define the asyncThunk for updating status
export const updateStatus = createAsyncThunk(
  "rac/updateStatus", // action type
  async ({ dynamicRacRuleId, status }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
    console.log(dynamicRacRuleId, status);

    try {
      // API call with dynamicRacRuleId and status
      const response = await axios.put(
        `${
          import.meta.env.VITE_DYNAMIC_RAC_STATUS_UPDATE
        }${dynamicRacRuleId}/status/${status}`,
        {}, // No request body, so pass an empty object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      // Handle the error and reject the thunk with a meaningful message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// Define the asyncThunk for updating the name
export const updateRacName = createAsyncThunk(
  "rac/updateRacName", // Action type
  async ({ racId, newName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

    try {
      // API call to update the name using the racId and newName
      const response = await axios.put(
        `${import.meta.env.VITE_DYNAMIC_RAC_NAME_UPDATE}${racId}/name`,
        {
          description: newName,
          name: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Set content type if needed
          },
        }
      );

      return response.data; // Return the API response data
    } catch (error) {
      // Handle error and reject the thunk with a meaningful message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // API error response
      } else {
        return rejectWithValue(error.message); // General error
      }
    }
  }
);

// Define the asyncThunk for deleting a section
export const deleteSection = createAsyncThunk(
  "rac/deleteSection", // Action type
  async ({ racId, sectionId }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage

    try {
      // API call to delete the section using racId and sectionId
      const response = await axios.delete(
        `${
          import.meta.env.VITE_DYNAMIC_RAC_SECTION_DELETE
        }${racId}/section/${sectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data; // Return the API response data
    } catch (error) {
      // Handle error and reject the thunk with a meaningful message
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // API error response
      } else {
        return rejectWithValue(error.message); // General error
      }
    }
  }
);

const initialState = {
  racConfig: {
    racDetails: { id: "", name: "abc", racId: "", description: null }, // Updated racDetails structure
    sections: [],
  },
  racStatsData: {
    HeaderList,
    RACList,
  },
  optionsList: [],
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
      const { newName } = action.payload;
      state.racConfig.racDetails = {
        ...state.racConfig.racDetails,
        name: newName,
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
        section.sectionId === sectionId
          ? { ...section, sectionName: name }
          : section
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
                  numberCriteriaRangeList: updates.numberCriteriaRangeList
                    ? rule.numberCriteriaRangeList.map((range, index) =>
                        index === numberCriteriaIndex
                          ? { ...range, ...updates.numberCriteriaRangeList[0] }
                          : range
                      )
                    : rule.numberCriteriaRangeList,
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
        toast("Dynamic RAC Deleted.")
      })
      .addCase(deleteDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
      })
      .addCase(cloneDynamicRac.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneDynamicRac.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Dynamic RAC Cloned.")

      })
      .addCase(cloneDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
      })
      .addCase(fetchDynamicRacDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicRacDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.racConfig = {
          ...state.racConfig,
          racDetails: action.payload.racDetails,
          sections: action.payload.sections ? action.payload.sections : [],
        };
        state.loading = false;
      })
      .addCase(fetchDynamicRacDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveDynamicRac.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDynamicRac.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Dynamic RAC Saved.")
      })
      .addCase(saveDynamicRac.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error : ${action.error.message}` )
      })
      .addCase(fetchOptionList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOptionList.fulfilled, (state, action) => {
        state.loading = false;
        state.optionsList = {
          borrowerProfileAvailableNames:
            action.payload.borrowerProfileAvailableNames?.map((item) => ({
              label: item,
              value: item,
            })) || [],

          calculatedAvailableNames:
            action.payload.calculatedAvailableNames?.map((item) => ({
              label: item,
              value: item,
            })) || [],
        };
      })
      .addCase(fetchOptionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Dynamic RAC Updated.")
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error : ${action.error.message}` )
      })
      .addCase(updateRacName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRacName.fulfilled, (state, action) => {
        state.racConfig.racDetails = {
          ...state.racConfig.racDetails,
          name: action.payload.name,
        };
        state.loading = false;
        toast.success("Dynamic RAC Updated.")
      })
      .addCase(updateRacName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Error : ${action.error.message}` )
      })
      .addCase(deleteSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        toast.error(`Error : ${action.error.message}` )
      });
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
