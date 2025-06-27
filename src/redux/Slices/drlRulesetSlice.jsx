import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { HeaderList, DRLRulesetList } from "../../data/DRLRulesetData";

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
  async ({ droolsRuleSetId, newName, description }, { rejectWithValue }) => {
    const payload = {
      name: newName,
      description: description, // Default description if not provided
    };
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
        return newName;
      } else {
        return rejectWithValue("Failed to update name");
      }
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
          import.meta.env.VITE_DYNAMIC_RAC_ALL_NAME_READ
        }63b1acad-b490-4939-94c0-b782540c2ec4/available-names`,
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
    basicInfoData: {
      category: "",
      description: "",
      fromDate: "",
      toDate: "",
    },
    ruleManagerData: {
      ruleManagerConfig: {
        racDetails: { id: "", name: "abc", racId: "", description: null }, // Updated racDetails structure
        sections: [],
      },
      optionsList: [],
      isEditorMode: true,
      currentRule: {
        firstOperator: null,
        secondOperator: null,
        numberCriteriaRangeList: null,
      },
      dynamicParameterDTOList: [
        {
          displayName: "string",
          firstOperator: "string",
          isModified: true,
          name: "nationality",
          parameterNameValueList: [
            {
              name: "US",
              value: 0.98,
              baseline: true,
              impact: "Refernce",
            },
            {
              name: "UK",
              value: 0.95,
              baseline: false,
              impact: "High",
            },
            {
              name: "Germany",
              value: 0.75,
              baseline: false,
              impact: "Medium",
            },
            {
              name: "Other EU",
              value: 0.4,
              baseline: false,
              impact: "Low",
            },
          ],
          parameterNumberRangeValueList: [
            {
              maximum: "string",
              minimum: "string",
              resident: true,
              value: "string",
            },
          ],
          parameterSourceEnum: "BORROWER_PROFILE",
          parameterType: "STRING",
          secondOperator: "string",
          status: "CREATED",
          weightNameValueList: [
            {
              name: "string",
              value: 0,
            },
          ],
        },
        {
          displayName: "string",
          firstOperator: "string",
          isModified: true,
          name: "creditScore",
          parameterNameValueList: [
            {
              name: "string",
              value: 0,
            },
          ],
          parameterNumberRangeValueList: [
            {
              minimum: "0",
              maximum: "1",
              value: 0.98,
              baseline: true,
              impact: "Refernce",
            },
            {
              minimum: "0",
              maximum: "1",
              value: 0.95,
              baseline: false,
              impact: "High",
            },
            {
              minimum: "0",
              maximum: "1",
              value: 0.75,
              baseline: false,
              impact: "Medium",
            },
            {
              minimum: "0",
              maximum: "1",
              value: 0.4,
              baseline: false,
              impact: "Low",
            },
          ],
          parameterSourceEnum: "BORROWER_PROFILE",
          parameterType: "NUMBER",
          secondOperator: "string",
          status: "CREATED",
          weightNameValueList: [
            {
              name: "string",
              value: 0,
            },
          ],
        },
      ],
      ruleManagerEquation: {
        expression:
          "((creditTpScore-300)*0.34/550) + (nationality*0.98) + (netIncome*1.24) + (dependents*2.32) + (maritalStatus*0.88) + (residentialStatus*1.12)",
        name: "string",
        parameters: [
          {
            name: "nationality",
            parameterSelectionTypeEnum: "DIRECT_SUBSTITUTION",
            type: "STRING",
          },
          {
            name: "creditScore",
            parameterSelectionTypeEnum: "DIRECT_SUBSTITUTION",
            type: "NUMBER",
          },
        ],
      },
    },
  },
  addCategoryData: {
    minimum: "",
    maximum: "",
    name: "",
    value: "",
    baseline: false,
    impact: "To be calculated",
  },
  dynamicParameterDTOListObject: {
    displayName: "string",
    firstOperator: "string",
    isModified: true,
    name: "nationality",
    parameterNameValueList: [
    ],
    parameterNumberRangeValueList: [
    ],
    parameterSourceEnum: "BORROWER_PROFILE",
    parameterType: "STRING",
    secondOperator: "string",
    status: "CREATED",
    weightNameValueList: [
      {
        name: "string",
        value: 0,
      },
    ],
  },
  dRulesDataSample: {
    basicInfoData: {
      category: "string",
      description: "string",
      fromDate: "string",
      toDate: "string",
    },
    droolsRuleSetId: "string",
    name: "string",
    ruleManagerData: {
      dynamicParameterDTOList: [
        {
          displayName: "string",
          firstOperator: "string",
          isModified: true,
          name: "string",
          parameterNameValueList: [
            {
              name: "string",
              value: 0,
            },
          ],
          parameterNumberRangeValueList: [
            {
              maximum: "string",
              minimum: "string",
              resident: true,
              value: "string",
            },
          ],
          parameterSourceEnum: "BORROWER_PROFILE",
          parameterType: "STRING",
          secondOperator: "string",
          status: "CREATED",
          weightNameValueList: [
            {
              name: "string",
              value: 0,
            },
          ],
        },
      ],
      ruleManagerConfig: [
        {
          blocked: true,
          criteriaType: "BORROWER_PROFILE",
          criteriaValues: ["string"],
          displayName: "string",
          error: "string",
          fieldType: "STRING",
          firstOperator: "string",
          isModified: true,
          name: "string",
          numberCriteriaRangeList: [
            {
              maximum: "string",
              minimum: "string",
              resident: true,
            },
          ],
          racId: "string",
          secondOperator: "string",
          sectionId: "string",
          sectionName: "string",
          status: "CREATED",
          usageList: [
            {
              ruleUsage: "ELIGIBILITY",
              used: true,
            },
          ],
        },
      ],
      ruleManagerEquation: {
        expression: "string",
        name: "string",
        parameters: [
          {
            name: "string",
            parameterSelectionTypeEnum: "DIRECT_SUBSTITUTION",
            type: "STRING",
          },
        ],
      },
    },
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
      state.addCategoryData = {
        minimum: "",
        maximum: "",
        name: "",
        value: "",
        baseline: false,
        impact: "To be calculated",
      };
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
      .addCase(updateDrulesName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateDrulesName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
        toast.success("Name updated successfully!");
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
      });
  },
});

export const {
  handleChangeBasicInfoData,
  handleChangeRuleManagerData,
  addParameterTag,
  handleChangeParametersData,
  handleChangeAddCategoryData,
  addCategoryToParametersData,
  deleteCategoryFromParametersData,
} = drlRulesetSlice.actions;
export default drlRulesetSlice.reducer;
