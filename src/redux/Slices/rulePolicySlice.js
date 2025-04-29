import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, RulePolicyList } from "../../data/RulePolicyData";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

// Async thunk to fetch data
export const fetchRulePolicyData = createAsyncThunk(
  "rulePolicy/fetchData",
  async (rulePolicyId, thunkAPI) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RULE_POLICY_READ}${rulePolicyId}`,
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

    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      return thunkAPI.rejectWithValue("Failed to fetch data");
    }
  }
);

// Async thunk for updating the finance amount with tenure rules
export const updateFinanceAmountWithTenureRules = createAsyncThunk(
  "rulePolicy/updateFinanceAmountWithTenureRules",
  async (inputList, { rejectWithValue }) => {
    try {
      const payload = {
        financeAmountWithTenureRules: inputList,
      };
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_MFAT_UPDATE_ENTRY}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update entry");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return rejectWithValue("Failed to update data");
    }
  }
);

// Create MaxFinAmt Entry Thunk
export const createMaxFinAmtEntry = createAsyncThunk(
  "rulePolicy/createMaxFinAmtEntry",
  async (_, { getState, dispatch }) => {
    const state = getState();
    const { maxFinAmtRules } = state.rulePolicy;
    const authToken = localStorage.getItem("authToken");
    const payload = {
      financeAmountWithTenureRules: [maxFinAmtRules],
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_MFAT_CREATE_ENTRY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add entry");
      }

      dispatch(fetchRulePolicyData(maxFinAmtRules.rulePolicyTempId));
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
);

// Delete MaxFinAmt Entry Thunk
export const deleteMaxFinAmtEntry = createAsyncThunk(
  "rulePolicy/deleteMaxFinAmtEntry",
  async ({ rulePolicyId, ruleName }, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_RULE_POLICY_MFAT_DELETE_ENTRY
        }${rulePolicyId}/finance-amount-with-tenure-rule/${ruleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete entry");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for adding a new Risk-Based Pricing Equation Rule
export const addRiskBasedPricingEquationRule = createAsyncThunk(
  "rulePolicy/addRiskBasedPricingEquationRule",
  async (navigate, { getState, rejectWithValue, dispatch }) => {
    const state = getState().rulePolicy;
    const token = localStorage.getItem("authToken");

    const postData = {
      riskBasedPricingEquationRules: [
        {
          ...state.rules,
        },
      ],
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_RBPE_CREATE_ENTRY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add entry");
      }

      // Dispatch fetchRulePolicyData to refresh the data after successful addition
      dispatch(fetchRulePolicyData(state.rules.rulePolicyTempId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating  Risk-Based Pricing Equation Rule
export const updateRBPE = createAsyncThunk(
  "rulePolicy/updateRBPE",
  async ({ index, updatedRule }, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { riskBasedPricingEquation } = getState().rulePolicy;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_RBPE_UPDATE_ENTRY}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            riskBasedPricingEquationRules: [
              { ...riskBasedPricingEquation.rules[index], ...updatedRule },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update entry");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a risk-based pricing equation rule
export const deleteRiskBasedPricingEquationRule = createAsyncThunk(
  "rulePolicy/deleteRiskBasedPricingEquationRule",
  async ({ rulePolicyId, ruleName }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_RULE_POLICY_RBPE_DELETE_ENTRY
        }${rulePolicyId}/risk-based-pricing-equation-rule/${ruleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete entry");
      }
      dispatch(fetchRulePolicyData(rulePolicyId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addRiskBasedPricingRule = createAsyncThunk(
  "rulePolicy/addRiskBasedPricingRule",
  async ({ rulePolicyId, navigate }, { getState }) => {
    const { riskBasedPricingInput } = getState().rulePolicy;
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RULE_POLICY_RBP_CREATE_ENTRY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(riskBasedPricingInput),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to add entry");
    }
  }
);

export const deleteRiskBasedPricingRule = createAsyncThunk(
  "rulePolicy/deleteRiskBasedPricingRule",
  async ({ rulePolicyId, ruleName, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_RULE_POLICY_RBP_DELETE_ENTRY
        }${rulePolicyId}/risk-based-pricing-rule/${ruleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete entry");
      }

      return ruleName; // Return the deleted rule name as the payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRiskBasedPricingRules = createAsyncThunk(
  "rulePolicy/updateRiskBasedPricingRules",
  async ({ rulePolicyId, postData, navigate }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_RBP_UPDATE_ENTRY}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update entry");
      }
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const addLengthOfServiceRule = createAsyncThunk(
  "rulePolicy/addLengthOfServiceRule",
  async (navigate, { getState }) => {
    const { lengthOfService } = getState().rulePolicy;
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RULE_POLICY_LOS_CREATE_ENTRY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(lengthOfService),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to add entry");
    }
  }
);

export const deleteLengthOfServiceRule = createAsyncThunk(
  "rulePolicy/deleteLengthOfServiceRule",
  async ({ rulePolicyId, ruleName }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_RULE_POLICY_LOS_DELETE_ENTRY
        }${rulePolicyId}/length-of-service-point-rule/${ruleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete entry");
      }

      return ruleName; // Return the deleted rule name as the payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLengthOfServiceRule = createAsyncThunk(
  "rulePolicy/updateLengthOfServiceRule",
  async ({ postData }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_LOS_UPDATE_ENTRY}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update entry");
      }
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const addCityTagRule = createAsyncThunk(
  "rulePolicy/addCityTagRule",
  async (cityPostData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_CITY_CREATE_ENTRY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(cityPostData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add entry");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return rejectWithValue("Failed to update data");
    }
  }
);

export const deleteCityTagRule = createAsyncThunk(
  "rulePolicy/deleteCityTagRule",
  async ({ rulePolicyId, tagToDeleteRuleName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_RULE_POLICY_CITY_DELETE_ENTRY
        }${rulePolicyId}/city-point-rule/${tagToDeleteRuleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete entry");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return rejectWithValue("Failed to update data");
    }
  }
);

export const addOccupationTagRule = createAsyncThunk(
  "rulePolicy/addOccupationTagRule",
  async (occupationPostData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_OCCUPATION_CREATE_ENTRY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(occupationPostData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add entry");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return rejectWithValue("Failed to update data");
    }
  }
);

export const deleteOccupationTagRule = createAsyncThunk(
  "rulePolicy/deleteOccupationTagRule",
  async ({ rulePolicyId, tagToDeleteRuleName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_RULE_POLICY_OCCUPATION_DELETE_ENTRY
        }${rulePolicyId}/employment-sector-point-rule/${tagToDeleteRuleName}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete entry");
      }
    } catch (error) {
      console.error("Error updating data:", error);
      return rejectWithValue("Failed to update data");
    }
  }
);

export const fetchName = createAsyncThunk(
  "rulePolicy/fetchName",
  async (rulePolicyId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_RULE_POLICY_NAME_READ}${rulePolicyId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      return data.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateRulePolicyName = createAsyncThunk(
  "rulePolicy/updateRulePolicyName",
  async ({ rulePolicyId, updateRPName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_RULE_POLICY_NAME_UPDATE
    }${rulePolicyId}/name/${updateRPName}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return updateRPName;
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update name");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createClone = createAsyncThunk(
  "rulePolicy/createClone",
  async ({ rulePolicyId, cloneRPName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_RULE_POLICY_CREATE_CLONE
      }${rulePolicyId}/clone/${cloneRPName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Failed to create clone");
    }

    const data = await response.json();
    return data; // Assuming it returns the new recoveryEquationTempId
  }
);

export const deleteRulePolicy = createAsyncThunk(
  "rulePolicy/deleteRulePolicy",
  async (rulePolicyId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${import.meta.env.VITE_RULE_POLICY_DELETE}/${rulePolicyId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(
        errorData.message || "Failed to delete rule Policy"
      );
    }
  }
);

export const fetchList = createAsyncThunk(
  "rulePolicy/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Rule Policy"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const initialState = {
  itemName: "",
  cityData: [],
  occupationData: [],
  FAWTData: [],
  inputList: [],
  maxFinAmtRules: {
    ruleName: "0",
    fieldType: "Employer",
    rulePolicyTempId: null,
    financeAmount: "",
    tenure: "",
    dataIndex: nanoid(),
  },
  allRuleData: [],
  riskBasedPricingInput: {
    operators: {
      firstRiskBasedPricingOperator: ">",
      secondRiskBasedPricingOperator: "<",
    },
    riskBasedPricingRules: [
      {
        firstRiskBasedPricing: "",
        secondRiskBasedPricing: "",
        interestRate: "",
        interestPeriodType: "",
        ruleName: "0",
        rulePolicyTempId: null,
        fieldType: "Employer",
      },
    ],
  },
  riskBasedPricing: {
    operators: {
      firstRiskBasedPricingOperator: "",
      secondRiskBasedPricingOperator: "",
    },
    riskBasedPricingRules: [],
  },
  riskBasedPricingEquation: {},
  rules: {
    ruleName: "0",
    fieldType: "Employer",
    rulePolicyTempId: null,
    a_Weight: "",
    b_Weight: "",
    c_Weight: "",
    d_Weight: "",
  },
  lengthOfService: {
    operators: {
      firstLengthOfServiceOperator: "",
      secondLengthOfServiceOperator: "",
    },
    lengthOfServiceRules: [
      {
        firstLengthOfService: "",
        secondLengthOfService: "",
        point: "",
        rulePolicyTempId: "",
        ruleName: "0",
        fieldType: "Employer",
      },
    ],
  },
  LOSInputList: {
    operators: {
      firstLengthOfServiceOperator: "",
      secondLengthOfServiceOperator: "",
    },
    lengthOfServiceRules: [],
  },
  cityFormData: {
    name: "City",
    city: "",
    points: "",
    ruleName: "0",
    rulePolicyTempId: "",
    fieldType: "Employer",
    tags: [],
  },
  occupationFormData: {
    name: "Occupation",
    occupation: "",
    occpoints: "",
    ruleName: "0",
    rulePolicyTempId: "",
    fieldType: "Employer",
    tags: [],
  },
  currentPage: 1,
  sortConfig: { key: "", direction: "asc" },
  loading: false,
  error: null,
  rulePolicyStatsData: {
    HeaderList,
    RulePolicyList,
  },
};

// RulePolicy slice
const rulePolicySlice = createSlice({
  name: "rulePolicy",
  initialState,
  reducers: {
    setInputList: (state, action) => {
      state.inputList = action.payload;
    },
    updateInputListItem: (state, action) => {
      const { index, name, value } = action.payload;
      const list = [...state.inputList];
      const updatedItem = { ...list[index], [name]: value };
      list[index] = updatedItem;
      state.inputList = list;
    },
    setMaxFinAmtRules: (state, action) => {
      state.maxFinAmtRules = {
        ...state.maxFinAmtRules,
        ...action.payload,
      };
    },
    clearInputListItem: (state, action) => {
      state.inputList.splice(action.payload, 1);
    },
    updateRules: (state, action) => {
      state.rules = { ...state.rules, ...action.payload };
    },
    setRiskBasedPricingEquation: (state, action) => {
      state.riskBasedPricingEquation = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    updateRiskBasedPricing(state, action) {
      const { index, name, value } = action.payload;
      if (name.includes("Operator")) {
        state.riskBasedPricing.operators[name] = value;
      } else {
        state.riskBasedPricing.riskBasedPricingRules[index][name] = value;
      }
    },
    updateRiskBasedPricingInput(state, action) {
      const { name, value, rulePolicyId } = action.payload;
      state.riskBasedPricingInput.riskBasedPricingRules = [
        {
          ...state.riskBasedPricingInput.riskBasedPricingRules[0],
          rulePolicyTempId: rulePolicyId,
        },
      ];
      if (name.includes("Operator")) {
        // Update operators
        state.riskBasedPricingInput.operators = {
          ...state.riskBasedPricingInput.operators,
          [name]: value,
        };
      } else {
        state.riskBasedPricingInput.riskBasedPricingRules = [
          {
            ...state.riskBasedPricingInput.riskBasedPricingRules[0],
            [name]: value,
          },
        ];
      }
    },
    setLengthOfService(state, action) {
      const { name, value, rulePolicyId } = action.payload;
      state.lengthOfService.lengthOfServiceRules = [
        {
          ...state.lengthOfService.lengthOfServiceRules[0],
          rulePolicyTempId: rulePolicyId,
        },
      ];
      if (name.includes("Operator")) {
        // Update operators
        state.lengthOfService.operators = {
          ...state.lengthOfService.operators,
          [name]: value,
        };
      } else {
        state.lengthOfService.lengthOfServiceRules = [
          {
            ...state.lengthOfService.lengthOfServiceRules[0],
            [name]: value,
          },
        ];
      }
    },
    updateLOSInputList(state, action) {
      const { index, name, value } = action.payload;
      if (name.includes("Operator")) {
        state.LOSInputList.operators[name] = value;
      } else {
        state.LOSInputList.lengthOfServiceRules[index][name] = value;
      }
    },
    setCityFormData(state, action) {
      const { name, value, rulePolicyId } = action.payload;
      state.cityFormData = {
        ...state.cityFormData,
        [name]: value,
        rulePolicyTempId: rulePolicyId,
      };
    },
    setOccupationFormData(state, action) {
      const { name, value, rulePolicyId } = action.payload;
      state.occupationFormData = {
        ...state.occupationFormData,
        [name]: value,
        rulePolicyTempId: rulePolicyId,
      };
    },
    setRulePolicyId: (state, action) => {
      state.rules.rulePolicyTempId = action.payload;
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
          name: newListItem.name,
          href: newListItem.href,
          // createdOn: RulePolicyList[index]?.createdOn || "14/09/2022",
          // openLoans: RulePolicyList[index]?.openLoans || "2367",
          // totalDisbursedPrincipal:
          //   RulePolicyList[index]?.totalDisbursedPrincipal || "$234M",
          // status: RulePolicyList[index]?.status || "Inactive",
        }));

        // Assign the updatedList to RulePolicyList
        state.rulePolicyStatsData.RulePolicyList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRulePolicyData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRulePolicyData.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload;

        // Set the state based on the fetched data
        state.allRuleData = data;
        const tempriskBasedPricingEquation =
          data.find((rule) => rule.name === "riskBasedPricingEquation") || {};
        if (tempriskBasedPricingEquation.rules) {
          tempriskBasedPricingEquation.rules =
            tempriskBasedPricingEquation.rules.map((ruleData) => ({
              ...ruleData,
              dataIndex: nanoid(),
            }));
        }
        state.riskBasedPricingEquation = tempriskBasedPricingEquation;

        state.cityData = data.find((rule) => rule.name === "city")?.rules || [];
        state.occupationData =
          data.find((rule) => rule.name === "employmentSector")?.rules || [];
        state.FAWTData =
          data.find((rule) => rule.name === "financeAmountWithTenure")?.rules ||
          [];
        state.riskBasedPricing.riskBasedPricingRules =
          data
            .find((rule) => rule.name === "riskBasedPricing")
            ?.rules.map((rulesData) => ({
              ...rulesData,
              dataIndex: nanoid(), // Assign nanoid() to dataIndex
            })) || [];
        state.riskBasedPricing.operators = data.find(
          (rule) => rule.name === "riskBasedPricing"
        )?.operators;
        state.LOSInputList.lengthOfServiceRules =
          data
            .find((rule) => rule.name === "lengthOfService")
            ?.rules.map((rulesData) => ({
              ...rulesData,
              dataIndex: nanoid(), // Assign nanoid() to dataIndex
            })) || [];
        state.LOSInputList.operators = data.find(
          (rule) => rule.name === "lengthOfService"
        )?.operators;
      })
      .addCase(fetchRulePolicyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateFinanceAmountWithTenureRules.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFinanceAmountWithTenureRules.fulfilled, (state) => {
        state.loading = false;
        toast.success("Entry updated successfully!");
      })
      .addCase(updateFinanceAmountWithTenureRules.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createMaxFinAmtEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMaxFinAmtEntry.fulfilled, (state) => {
        state.loading = false;
        state.maxFinAmtRules = initialState.maxFinAmtRules;
        toast.success("Entry added successfully!");
      })
      .addCase(createMaxFinAmtEntry.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteMaxFinAmtEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteMaxFinAmtEntry.fulfilled, (state) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteMaxFinAmtEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addRiskBasedPricingEquationRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRiskBasedPricingEquationRule.fulfilled, (state) => {
        state.loading = true;
        state.rules = {
          ruleName: "0",
          fieldType: "Employer",
          rulePolicyTempId: state.rules.rulePolicyTempId,
          a_Weight: "",
          b_Weight: "",
          c_Weight: "",
          d_Weight: "",
        };
        toast.success("Entry added successfully!");
      })
      .addCase(addRiskBasedPricingEquationRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateRBPE.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRBPE.fulfilled, (state) => {
        state.loading = false;
        toast.success("Entry updated successfully!");
      })
      .addCase(updateRBPE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteRiskBasedPricingEquationRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRiskBasedPricingEquationRule.fulfilled, (state) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteRiskBasedPricingEquationRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addRiskBasedPricingRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRiskBasedPricingRule.fulfilled, (state, action) => {
        state.loading = false;
        state.riskBasedPricingInput = {
          operators: {
            firstRiskBasedPricingOperator: ">",
            secondRiskBasedPricingOperator: "<",
          },
          riskBasedPricingRules: [
            {
              firstRiskBasedPricing: "",
              secondRiskBasedPricing: "",
              interestRate: "",
              interestPeriodType: "",
              ruleName: "0",
              rulePolicyTempId: action.meta.arg,
              fieldType: "Employer",
            },
          ],
        };
        toast.success("Entry added successfully!");
      })
      .addCase(addRiskBasedPricingRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteRiskBasedPricingRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRiskBasedPricingRule.fulfilled, (state) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteRiskBasedPricingRule.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateRiskBasedPricingRules.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRiskBasedPricingRules.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Entry updated successfully!");
      })
      .addCase(updateRiskBasedPricingRules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addLengthOfServiceRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLengthOfServiceRule.fulfilled, (state, action) => {
        state.loading = false;
        state.lengthOfService = {
          operators: {
            firstLengthOfServiceOperator: "",
            secondLengthOfServiceOperator: "",
          },
          lengthOfServiceRules: [
            {
              firstLengthOfService: "",
              secondLengthOfService: "",
              point: "",
              rulePolicyTempId: "",
              ruleName: "0",
              fieldType: "Employer",
            },
          ],
        };
        toast.success("Entry added successfully!");
      })
      .addCase(addLengthOfServiceRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteLengthOfServiceRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLengthOfServiceRule.fulfilled, (state) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteLengthOfServiceRule.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateLengthOfServiceRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLengthOfServiceRule.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Entry updated successfully!");
      })
      .addCase(updateLengthOfServiceRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addCityTagRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCityTagRule.fulfilled, (state, action) => {
        state.loading = false;
        state.cityFormData = initialState.cityFormData;
        toast.success("Entry added successfully!");
      })
      .addCase(addCityTagRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteCityTagRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCityTagRule.fulfilled, (state) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteCityTagRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addOccupationTagRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(addOccupationTagRule.fulfilled, (state, action) => {
        state.loading = false;
        state.occupationFormData = initialState.occupationFormData;
        toast.success("Entry added successfully!");
      })
      .addCase(addOccupationTagRule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteOccupationTagRule.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOccupationTagRule.fulfilled, (state) => {
        state.loading = false;
        toast("Entry deleted successfully!");
      })
      .addCase(deleteOccupationTagRule.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
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
        state.error = action.error.message;
      })
      .addCase(updateRulePolicyName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRulePolicyName.fulfilled, (state, action) => {
        state.itemName = action.payload;
        toast.success("Name updated successfully!");
      })
      .addCase(updateRulePolicyName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createClone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClone.fulfilled, (state) => {
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(createClone.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteRulePolicy.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRulePolicy.fulfilled, (state) => {
        state.loading = false;
        toast("Rule Policy deleted successfully!");
      })
      .addCase(deleteRulePolicy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

// Actions
export const {
  setInputList,
  updateInputListItem,
  setMaxFinAmtRules,
  clearInputListItem,
  setRiskBasedPricingEquation,
  setPage,
  setSortConfig,
  updateRiskBasedPricing,
  updateRiskBasedPricingInput,
  updateRules,
  setLengthOfService,
  updateLOSInputList,
  setCityFormData,
  setOccupationFormData,
  setRulePolicyId,
} = rulePolicySlice.actions;

// Reducer
export default rulePolicySlice.reducer;
