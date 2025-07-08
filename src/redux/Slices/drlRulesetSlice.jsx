import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { HeaderList, DRLRulesetList } from "../../data/DRLRulesetData";
import { id } from "date-fns/locale/id";

export const fetchDrulesName = createAsyncThunk(
  "drlRuleset/fetchDrulesName",
  async (droolsRuleSetId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DRULES_NAME_READ}${droolsRuleSetId}`,
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

export const updateDrulesName = createAsyncThunk(
  "drlRuleset/updateDrulesName",
  async (
    { droolsRuleSetId, newName, description, isDescriptionUpdate },
    { rejectWithValue }
  ) => {
    const payload = {
      name: newName,
      description: description, // Default description if not provided
    };
    const isUpdate = isDescriptionUpdate || false;
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_DRULES_NAME_UPDATE
    }${droolsRuleSetId}/name`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return { newName, isUpdate }; // Return the new name and update status
      } else {
        return rejectWithValue("Failed to update name");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDruleData = createAsyncThunk(
  "drlRuleset/fetchDruleData",
  async (droolsRuleSetId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DRULES_READ_RULESET}${droolsRuleSetId}`,
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

export const deleteDrlRuleset = createAsyncThunk(
  "drlRuleset/deleteDrlRuleset",
  async (droolsRuleSetId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_DRULES_DELETE}${droolsRuleSetId}`,
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

    return droolsRuleSetId; // Return the ID for any further processing
  }
);

export const fetchOptionList = createAsyncThunk(
  "drlRuleset/fetchOptionList",
  async (droolsRuleSetId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_DRULES_READ_AVAILABLE_NAMES
        }${droolsRuleSetId}/available-names`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          "Content-Type": "application/json",
        }
      );
      const data = await response.json();
      return data; // Return the data from the API response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDrools = createAsyncThunk(
  "drlRuleset/createDrools",
  async (transformedPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_DRULES_CREATE_RULESET}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDrools = createAsyncThunk(
  "drlRuleset/updateDrools",
  async (transformedPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_DRULES_CREATE_RULESET}/${
      transformedPayload.droolsRuleSetId
    }`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transformedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "drlRuleset/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "DRL Ruleset"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

// Initial state
const drlRulesetInitialState = {
  itemName: "",
  dRulesData: {
    id: null,
    droolsRuleSetId: "",
    name: "",
    basicInfoData: {
      category: "",
      description: "",
      fromDate: "",
      toDate: "",
    },
    ruleManagerData: {
      ruleManagerConfig: [],
      dynamicParameterDTOList: [],
      ruleManagerEquation: {
        expression: "Enter your expression here",
        name: "",
        parameters: [],
      },
    },
  },
  currentRule: {
    firstOperator: null,
    secondOperator: null,
    numberCriteriaRangeList: null,
  },
  optionsList: [],
  addCategoryData: {
    minimum: "",
    maximum: "",
    name: "",
    value: "",
    baseline: false,
    impact: "Low",
  },
  dynamicParameterDTOListObject: {
    displayName: "",
    firstOperator: "",
    isModified: true,
    name: "",
    parameterNameValueList: [],
    parameterNumberRangeValueList: [],
    parameterSourceEnum: "BORROWER_PROFILE",
    parameterType: "",
    secondOperator: "",
    status: "CREATED",
    weightNameValueList: [
      {
        name: "",
        value: 0,
      },
    ],
  },
  dRulesStatsData: {
    HeaderList,
    DRLRulesetList,
  },
  loading: false,
  error: null,
};

const drlRulesetSlice = createSlice({
  name: "drlRuleset",
  initialState: drlRulesetInitialState,
  reducers: {
    downloadConfig: (state) => {
      const config = {
        ruleManagerConfig: state.dRulesData.ruleManagerData.ruleManagerConfig,
      };
      const blob = new Blob([JSON.stringify(config, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${
        state.dRulesData.name !== ""
          ? state.dRulesData.name
          : "New Dynamic Form"
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    uploadConfig(state, action) {
      const { ruleManagerConfig } = action.payload;

      const uploadedSections = ruleManagerConfig?.map(
        (section, sectionIndex) => {
          return {
            ...section,
            rules: section?.rules?.map((rule, ruleIndex) => ({
              ...rule,
              status: "APPROVED",
              dynamicRacRuleId: `Rule-${Date.now()}-${ruleIndex}-${sectionIndex}`,
              isModified: true,
            })),
          };
        }
      );

      console.log(uploadedSections);
      // Update both racDetails and ruleManagerConfig in the state
      state.dRulesData.ruleManagerData = {
        ...state.dRulesData.ruleManagerData,
        ruleManagerConfig:
          uploadedSections ||
          state.dRulesData.ruleManagerData.ruleManagerConfig, // Update ruleManagerConfig, fallback to current state if undefined
      };
    },
    handleChangeBasicInfoData: (state, action) => {
      const { name, value } = action.payload;
      state.dRulesData.basicInfoData[name] = value;
    },
    handleChangeRuleManagerData: (state, action) => {
      const { name, value } = action.payload;
      state.dRulesData.ruleManagerData.ruleManagerEquation[name] = value;
    },
    addParameterTag: (state, action) => {
      const newTag = action.payload; // { name, type }
      const existingTags =
        state.dRulesData.ruleManagerData.ruleManagerEquation.parameters;

      const isDuplicate = existingTags.some(
        (tag) => tag.name === newTag.name && tag.type === newTag.type
      );

      if (newTag.name && newTag.type && !isDuplicate) {
        // 1. Add tag to equation list
        existingTags.push(newTag);

        // 2. Create parameter config from template
        const newParamConfig = {
          ...state.dynamicParameterDTOListObject,
          name: newTag.name,
          parameterType: newTag.type,
        };

        // 3. Push into dynamicParameterDTOList
        state.dRulesData.ruleManagerData.dynamicParameterDTOList.push(
          newParamConfig
        );
      }
    },
    handleChangeParametersData: (state, action) => {
      const { tagName, index, name, value } = action.payload;

      const paramList =
        state.dRulesData.ruleManagerData.dynamicParameterDTOList;

      const paramGroup = paramList.find((param) => param.name === tagName);
      if (!paramGroup) return;

      const listKey =
        paramGroup.parameterType === "STRING"
          ? "parameterNameValueList"
          : "parameterNumberRangeValueList";

      const updatedList = [...paramGroup[listKey]];

      // Handle baseline toggle: ensure only one is true
      if (name === "baseline") {
        updatedList.forEach((entry, idx) => {
          entry.baseline = idx === index ? value : false;
        });
      } else {
        updatedList[index] = {
          ...updatedList[index],
          [name]: value,
        };
      }

      // Update the list inside the right paramGroup
      paramGroup[listKey] = updatedList;
    },
    handleChangeAddCategoryData: (state, action) => {
      const { name, value } = action.payload;
      state.addCategoryData[name] = value;
    },
    addCategoryToParametersData: (state, action) => {
      const { tagType, tagName } = action.payload; // From component
      const newCategory = {
        ...state.addCategoryData,
      };

      // Omit irrelevant fields based on tag type
      if (tagType === "STRING") {
        delete newCategory.minimum;
        delete newCategory.maximum;
      } else if (tagType === "NUMBER") {
        delete newCategory.name;
      }

      const paramList =
        state.dRulesData.ruleManagerData.dynamicParameterDTOList;

      const targetParam = paramList.find((item) => item.name === tagName);
      if (!targetParam) return;

      const listKey =
        tagType === "STRING"
          ? "parameterNameValueList"
          : "parameterNumberRangeValueList";

      if (!Array.isArray(targetParam[listKey])) {
        targetParam[listKey] = [];
      }

      targetParam[listKey].push(newCategory);

      // Optional: Reset addCategoryData to blank after adding
      state.addCategoryData = drlRulesetInitialState.addCategoryData;
    },
    deleteCategoryFromParametersData: (state, action) => {
      const { tagName, tagType, index } = action.payload;

      const paramList =
        state.dRulesData.ruleManagerData.dynamicParameterDTOList;

      const targetParam = paramList.find((item) => item.name === tagName);
      if (!targetParam) return;

      const listKey =
        tagType === "STRING"
          ? "parameterNameValueList"
          : "parameterNumberRangeValueList";

      if (!Array.isArray(targetParam[listKey])) return;

      // Remove entry at the given index
      targetParam[listKey].splice(index, 1);
    },
    deleteRuleById: (state, action) => {
      const { sectionId, dynamicRacRuleId } = action.payload;

      // Find the section with the given sectionId
      const sectionIndex =
        state.dRulesData.ruleManagerData.ruleManagerConfig.findIndex(
          (section) => section.sectionId === sectionId
        );

      if (sectionIndex !== -1) {
        // Filter out the rule with the given dynamicRacRuleId
        const updatedRules = state.dRulesData.ruleManagerData.ruleManagerConfig[
          sectionIndex
        ].rules.filter((rule) => rule.dynamicRacRuleId !== dynamicRacRuleId);

        // Update the section's rules
        state.dRulesData.ruleManagerData.ruleManagerConfig[sectionIndex].rules =
          updatedRules;
      }
    },
    removeTag: (state, action) => {
      const { sectionId, dynamicRacRuleId, tagToRemove } = action.payload;
      const section = state.dRulesData.ruleManagerData.ruleManagerConfig.find(
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
    setCurrentRule(state, action) {
      const { sectionId, dynamicRacRuleId } = action.payload;
      console.log("setCurrentRule");
      state.dRulesData.ruleManagerData.ruleManagerConfig =
        state.dRulesData.ruleManagerData.ruleManagerConfig.map((section) => {
          if (section.sectionId === sectionId) {
            return {
              ...section,
              rules: section.rules.map((rule) => {
                if (rule.dynamicRacRuleId === dynamicRacRuleId) {
                  state.currentRule = { ...state.currentRule, ...rule }; //setting Current Rule
                }
                return rule;
              }),
            };
          }
          return section;
        });
    },
    restoreRule(state, action) {
      state.currentRule = drlRulesetInitialState.currentRule; // Resetting currentRule to initial state
    },
    addNewRule: (state, action) => {
      const { ruleConfig } = action.payload; // includes sectionId and rule
      const { sectionId } = ruleConfig;

      const section = state.dRulesData.ruleManagerData.ruleManagerConfig.find(
        (section) => section.sectionId === sectionId
      );

      if (section) {
        const ruleWithSalience = {
          ...ruleConfig,
          salience: section.salience ?? 0, // fallback to 0 if salience not set
        };

        section.rules.push(ruleWithSalience);
      } else {
        console.warn(`No section found with sectionId: ${sectionId}`);
      }
    },
    setSection(state, action) {
      const { newSections } = action.payload;
      state.dRulesData.ruleManagerData.ruleManagerConfig = newSections;
    },
    addSection(state, action) {
      const newSection = {
        sectionId: `section-${Date.now()}`,
        sectionName: `New Section ${
          state.dRulesData.ruleManagerData.ruleManagerConfig.length + 1
        }`,
        salience: "",
        size: "full",
        rules: [],
      };
      state.dRulesData.ruleManagerData.ruleManagerConfig.push(newSection);
    },
    updateSection: (state, action) => {
      const { sectionId, name } = action.payload;

      state.dRulesData.ruleManagerData.ruleManagerConfig =
        state.dRulesData.ruleManagerData.ruleManagerConfig.map((section) => {
          if (section.sectionId === sectionId) {
            // Update sectionName in the section
            const updatedRules =
              section.rules?.map((rule) => ({
                ...rule,
                sectionName: name, // Update sectionName in each rule
              })) || [];

            return {
              ...section,
              sectionName: name,
              rules: updatedRules,
            };
          } else {
            return section;
          }
        });
    },
    removeSection(state, action) {
      const { sectionId } = action.payload;
      state.dRulesData.ruleManagerData.ruleManagerConfig =
        state.dRulesData.ruleManagerData.ruleManagerConfig.filter(
          (section) => section.sectionId !== sectionId
        );
    },
    updateRuleById: (state, action) => {
      const { dynamicRacRuleId, ruleConfig } = action.payload;

      // Go through each section in ruleManagerConfig
      for (const section of state.dRulesData.ruleManagerData
        .ruleManagerConfig) {
        const ruleIndex = section.rules.findIndex(
          (rule) => rule.dynamicRacRuleId === dynamicRacRuleId
        );

        if (ruleIndex !== -1) {
          // Update the rule with the new config
          section.rules[ruleIndex] = {
            ...section.rules[ruleIndex],
            ...ruleConfig,
          };
          break; // Exit early once rule is updated
        }
      }
    },
    updateSalienceBySectionId: (state, action) => {
      const { sectionId, salience } = action.payload;

      const section = state.dRulesData.ruleManagerData.ruleManagerConfig.find(
        (sec) => sec.sectionId === sectionId
      );

      if (section) {
        // Update salience at section level
        section.salience = salience;

        // Update salience in each rule inside that section
        section.rules = section.rules.map((rule) => ({
          ...rule,
          salience,
        }));
      }
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
        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          description: newListItem.description,
        }));
        state.dRulesStatsData.DRLRulesetList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDrulesName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDrulesName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
      })
      .addCase(fetchDrulesName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchDruleData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDruleData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload?.id === null) {
          // No data received, use initial structure
          state.dRulesData = drlRulesetInitialState.dRulesData;
        } else {
          // Valid payload received
          state.dRulesData = action.payload;
        }
      })
      .addCase(fetchDruleData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateDrulesName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDrulesName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload.newName; // Update itemName with new name
        if (!action.payload.isUpdate) {
          toast.success("Name updated successfully!");
        }
      })
      .addCase(updateDrulesName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteDrlRuleset.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDrlRuleset.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("DRL Ruleset deleted successfully!");
      })
      .addCase(deleteDrlRuleset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
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

          documentsAvailableNames:
            action.payload.documentsAvailableNames?.map((item) => ({
              label: item,
              value: item,
            })) || [],
        };
      })
      .addCase(fetchOptionList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createDrools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDrools.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("DRL Ruleset created successfully!");
      })
      .addCase(createDrools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateDrools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDrools.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("DRL Ruleset Updated successfully!");
      })
      .addCase(updateDrools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  downloadConfig,
  uploadConfig,
  handleChangeBasicInfoData,
  handleChangeRuleManagerData,
  addParameterTag,
  handleChangeParametersData,
  handleChangeAddCategoryData,
  addCategoryToParametersData,
  deleteCategoryFromParametersData,
  deleteRuleById,
  setCurrentRule,
  restoreRule,
  addNewRule,
  setSection,
  addSection,
  updateSection,
  removeSection,
  updateRuleById,
  removeTag,
  updateSalienceBySectionId,
} = drlRulesetSlice.actions;
export default drlRulesetSlice.reducer;
