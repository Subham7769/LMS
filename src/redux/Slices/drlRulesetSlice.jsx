import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { HeaderList, DRLRulesetList } from "../../data/DRLRulesetData";

export const fetchDrulesName = createAsyncThunk(
  "drlRuleset/fetchDrulesName",
  async (dRulesTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_DRULES_NAME_READ}${dRulesTempId}`,
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
  async ({ dRulesTempId, newName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_DRULES_NAME_UPDATE
    }${dRulesTempId}/name/${newName}`;

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

export const deleteDrlRuleset = createAsyncThunk(
  "drlRuleset/deleteDrlRuleset",
  async (dRulesTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_DRULES_DELETE}${dRulesTempId}`,
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

    return dRulesTempId; // Return the ID for any further processing
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
  itemName: "DRL Ruleset",
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
      ruleManagerEquation:
        "((creditTpScore-300)*A/550) + (nationality*B) + (netIncome*C) + (dependents*D) + (maritalStatus*E) + (residentialStatus*F)",
      parameterTags: [
        { name: "nationality", fieldType: "STRING" },
        { name: "creditScore", fieldType: "NUMBER" },
      ],
      paramertersData: [
        {
          id: 1,
          min: 0,
          max: 1,
          categoryValue: "US",
          numericalScore: 0.98,
          baseline: true,
          impact: "Refernce",
        },
        {
          id: 2,
          min: 0,
          max: 1,
          categoryValue: "UK",
          numericalScore: 0.95,
          baseline: false,
          impact: "High",
        },
        {
          id: 3,
          min: 0,
          max: 1,
          categoryValue: "Germany",
          numericalScore: 0.75,
          baseline: false,
          impact: "Medium",
        },
        {
          id: 4,
          min: 0,
          max: 1,
          categoryValue: "Other EU",
          numericalScore: 0.4,
          baseline: false,
          impact: "Low",
        },
      ],
      addCategoryData: {
        min: "",
        max: "",
        categoryValue: "",
        numericalScore: "",
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
      state.dRulesData.ruleManagerData[name] = value;
    },
    addParameterTag: (state, action) => {
      const newTag = action.payload; // { name, fieldType }
      const existingTags = state.dRulesData.ruleManagerData.parameterTags;

      const isDuplicate = existingTags.some(
        (tag) => tag.name === newTag.name && tag.fieldType === newTag.fieldType
      );

      if (newTag.name && newTag.fieldType && !isDuplicate) {
        state.dRulesData.ruleManagerData.parameterTags.push(newTag);
      }
    },
    handleChangeParametersData: (state, action) => {
      const { id, name, value } = action.payload;

      const updatedData = state.dRulesData.ruleManagerData.paramertersData.map(
        (item) => {
          if (name === "baseline") {
            return {
              ...item,
              baseline: item.id === id ? value : false,
            };
          }

          if (item.id === id) {
            return { ...item, [name]: value };
          }
          return item;
        }
      );

      state.dRulesData.ruleManagerData.paramertersData = updatedData;
    },
    handleChangeAddCategoryData: (state, action) => {
      const { name, value } = action.payload;
      state.dRulesData.ruleManagerData.addCategoryData[name] = value;
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
      });
  },
});

export const {
  handleChangeBasicInfoData,
  handleChangeRuleManagerData,
  addParameterTag,
  handleChangeParametersData,
  handleChangeAddCategoryData,
} = drlRulesetSlice.actions;
export default drlRulesetSlice.reducer;
