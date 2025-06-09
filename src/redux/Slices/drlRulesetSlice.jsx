import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const drlRulesetInitialState = {
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
});

export const {
  handleChangeBasicInfoData,
  handleChangeRuleManagerData,
  addParameterTag,
  handleChangeParametersData,
  handleChangeAddCategoryData,
} = drlRulesetSlice.actions;
export default drlRulesetSlice.reducer;
