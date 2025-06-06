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
      parameterTags: [],
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
    handleChangeRuleManageroData: (state, action) => {
      const { name, value } = action.payload;
      state.dRulesData.ruleManagerData[name] = value;
    },
    addParameterTag: (state, action) => {
      const tag = action.payload;
      const existingTags = state.dRulesData.ruleManagerData.parameterTags;
      if (tag && !existingTags.includes(tag)) {
        state.dRulesData.ruleManagerData.parameterTags.push(tag);
      }
    },
  },
});

export const {
  handleChangeBasicInfoData,
  handleChangeRuleManageroData,
  addParameterTag,
} = drlRulesetSlice.actions;
export default drlRulesetSlice.reducer;
