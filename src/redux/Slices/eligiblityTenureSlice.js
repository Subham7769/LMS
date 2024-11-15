import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCreditScoreEligibleTenureData } from "./sidebarSlice";
import { HeaderList, CreditScoreETList } from "../../data/CreditScoreETData";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

// Thunks for fetching Credit Score ET Info
export const fetchCreditScoreETInfo = createAsyncThunk(
  "creditScoreET/fetchCreditScoreETInfo",
  async (creditScoreETId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_READ
        }${creditScoreETId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunks for fetching Credit Score ET Name
export const fetchCreditScoreETName = createAsyncThunk(
  "creditScoreET/fetchCreditScoreETName",
  async (creditScoreETId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_NAME_READ
        }${creditScoreETId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for saving the Credit Score ET
export const saveCreditScoreET = createAsyncThunk(
  "creditScoreET/saveCreditScoreET",
  async (creditScoreETId, { rejectWithValue, dispatch, getState }) => {
    const token = localStorage.getItem("authToken");

    // Access current state of creditScoreET
    const { creditScoreET } = getState().creditScoreET;
    console.log(creditScoreETId);
    // Structure the data as per the API requirement
    const postData = {
      operators: { ...creditScoreET.operators },
      rules: creditScoreET.rules.map((rule) => ({
        creditScoreEtTempId: creditScoreETId,
        fieldType: rule.fieldType,
        firstCreditScore: rule.firstCreditScore,
        ruleName: rule.ruleName,
        secondCreditScore: rule.secondCreditScore,
        tenure: rule.tenure,
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_UPDATE}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData), // Send the structured postData
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      // const data = await handleApiErrors(response);

      // Optionally, refetch the data to update the store
      dispatch(fetchCreditScoreETInfo(creditScoreETId));
      // return data;
    } catch (error) {
      console.log("Failed to update data:", error);
      return rejectWithValue(error);
    }
  }
);

// Thunk for saving the Credit Score ET Add NewRange
export const AddNewRange = createAsyncThunk(
  "creditScoreET/AddNewRange",
  async (creditScoreETId, { rejectWithValue, dispatch, getState }) => {
    const token = localStorage.getItem("authToken");

    // Access current state of creditScoreET
    const { creditScoreET, newRangeData } = getState().creditScoreET;

    // Structure the data as per the API requirement
    const postData = {
      operators: { ...creditScoreET.operators },
      rules: [
        ...newRangeData.rules.map((newRule) => ({
          creditScoreEtTempId: creditScoreETId,
          fieldType: newRule.fieldType,
          firstCreditScore: newRule.firstCreditScore,
          ruleName: newRule.ruleName,
          secondCreditScore: newRule.secondCreditScore,
          tenure: newRule.tenure,
        })),
      ],
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_ADD_RANGE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData), // Send the structured postData
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      // Optionally, refetch the data to update the store
      dispatch(fetchCreditScoreETInfo(creditScoreETId));
    } catch (error) {
      console.error("Failed to update data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating the Credit Score ET Name
export const updateCreditScoreETName = createAsyncThunk(
  "creditScoreET/updateCreditScoreETName",
  async (
    { creditScoreETId, updatecsetName },
    { rejectWithValue, dispatch }
  ) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_NAME_UPDATE
        }${creditScoreETId}/name/${updatecsetName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      const csetDetails = await response.json();
      console.log(csetDetails);
      dispatch(fetchCreditScoreEligibleTenureData());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for creating a clone of the Credit Score ET
export const createCloneCSET = createAsyncThunk(
  "creditScoreET/createCloneCSET",
  async ({ creditScoreETId, cloneCSETName }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_CREATE_CLONE
        }${creditScoreETId}/clone/${cloneCSETName}`,
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
        return rejectWithValue(errorData.message);
      }
      const csetDetails = await response.json();
      dispatch(fetchCreditScoreEligibleTenureData());
      return csetDetails;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a Credit Score ET
export const handleDeleteCSET = createAsyncThunk(
  "creditScoreET/handleDeleteCSET",
  async (creditScoreETId, { rejectWithValue, dispatch }) => {
    // Access current state of creditScoreET
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_DELETE
        }${creditScoreETId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      dispatch(fetchCreditScoreEligibleTenureData());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for deleting a Credit Score ET Range by ruleName
export const handleDeleteRange = createAsyncThunk(
  "creditScoreET/handleDeleteRange",
  async ({ creditScoreETId, ruleName }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_DELETE_RANGE
        }${creditScoreETId}/${ruleName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to delete Credit Score ET"
        );
      }
      // Optionally, refetch the data to update the store
      dispatch(fetchCreditScoreETInfo(creditScoreETId));
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "creditScoreET/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Eligible Tenure"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

// Initial state
const creditScoreETInitialState = {
  creditScoreET: {
    operators: {
      firstCreditScoreOperator: "",
      secondCreditScoreOperator: "",
    },
    rules: [
      {
        firstCreditScore: "",
        secondCreditScore: "",
        creditScoreEtTempId: "",
        ruleName: "0",
        fieldType: "Employer",
        tenureValue: "",
        tenureType: "MONTHS",
        dataIndex: "",
        tenure: [],
        tags: [],
      },
    ],
  },
  newRangeData: {
    operators: {
      firstCreditScoreOperator: "",
      secondCreditScoreOperator: "",
    },
    rules: [
      {
        firstCreditScore: "",
        secondCreditScore: "",
        creditScoreEtTempId: "",
        ruleName: "0",
        fieldType: "Employer",
        tenureValue: "",
        tenureType: "MONTHS",
        tenure: [],
        tags: [],
      },
    ],
  },
  creditScoreETId: "",
  creditScoreETName: "",
  loading: false,
  error: null,
  creditScoreETData: {
    HeaderList,
    CreditScoreETList,
  },
};

const eligiblityTenureSlice = createSlice({
  name: "creditScoreET",
  initialState: creditScoreETInitialState,
  reducers: {
    setFormData: (state, action) => {
      state.creditScoreET = action.payload;
    },
    setCreditScoreETName: (state, action) => {
      state.creditScoreETName = action.payload;
    },
    updateCreditScoreETId: (state, action) => {
      state.creditScoreETId = action.payload;
      state.creditScoreET.rules = state.creditScoreET.rules.map((rule) => ({
        ...rule,
        creditScoreEtTempId: action.payload,
      }));
      state.newRangeData.rules[0].creditScoreEtTempId = action.payload;
    },
    updateCreditScoreET: (state, action) => {
      const { name, value, ruleIndex } = action.payload;

      // Check if the field being updated is inside `operators`
      const isOperator = state.creditScoreET.operators.hasOwnProperty(name);

      // Check if the field being updated is inside the specified rule
      const isRuleField =
        ruleIndex !== undefined &&
        state.creditScoreET.rules[ruleIndex]?.hasOwnProperty(name);

      if (isOperator) {
        // Update the `operators` part of the state
        state.creditScoreET.operators[name] = value;
        state.newRangeData.operators[name] = value;
      } else if (isRuleField) {
        // Update the specific field inside the specified rule
        state.creditScoreET.rules[ruleIndex][name] = value;
      }
    },
    updateNewRange: (state, action) => {
      const { name, value } = action.payload;

      // Check if the field being updated is inside `operators`
      const isOperator = state.newRangeData.operators.hasOwnProperty(name);

      // Check if the field being updated is inside the specified rule
      const isRuleField = state.newRangeData.rules[0]?.hasOwnProperty(name);

      if (isOperator) {
        // Update the `operators` part of the state
        state.newRangeData.operators[name] = value;
        state.creditScoreET.operators[name] = value;
      } else if (isRuleField) {
        // Update the specific field inside the specified rule
        state.newRangeData.rules[0][name] = value;
      }
    },
    setTenure: (state, action) => {
      const { name, value, ruleIndex } = action.payload;
      if (ruleIndex !== undefined && state.creditScoreET.rules[ruleIndex]) {
        state.creditScoreET.rules[ruleIndex][name] = value;
      }
    },
    setNewRangeTenure: (state, action) => {
      const { name, value } = action.payload;
      state.newRangeData.rules[0][name] = value;
    },
    addTenure: (state, action) => {
      const { ruleIndex } = action.payload;
      state.creditScoreET.rules[ruleIndex].tags.push({
        index: state.creditScoreET.rules[ruleIndex].tags.length,
        tenureValue: state.creditScoreET.rules[ruleIndex].tenureValue,
        tenureType: state.creditScoreET.rules[ruleIndex].tenureType,
      });
      state.creditScoreET.rules[ruleIndex].tenure.push(
        state.creditScoreET.rules[ruleIndex].tenureValue
      );
      state.creditScoreET.rules[ruleIndex].tenureValue = "";
    },
    addNewRangeTenure: (state, action) => {
      state.newRangeData.rules[0].tags.push({
        index: state.newRangeData.rules[0].tags.length,
        tenureValue: state.newRangeData.rules[0].tenureValue,
        tenureType: state.newRangeData.rules[0].tenureType,
      });
      state.newRangeData.rules[0].tenure.push(
        state.newRangeData.rules[0].tenureValue
      );
      state.newRangeData.rules[0].tenureValue = "";
    },
    deleteTenure: (state, action) => {
      console.log(action.payload);
      const { ruleIndex, tag } = action.payload;
      const { index, tenureValue } = tag;
      // Delete the tenure from the rules array
      state.creditScoreET.rules[ruleIndex].tags = state.creditScoreET.rules[
        ruleIndex
      ].tags.filter(
        (tag) => tag.index !== index && tag.tenureValue !== tenureValue
      );
      state.creditScoreET.rules[ruleIndex].tenure = state.creditScoreET.rules[
        ruleIndex
      ].tenure.filter((tenure) => tenure !== tenureValue);
    },
    deleteNewRangeTenure: (state, action) => {
      console.log(action.payload);
      const { tag } = action.payload;
      const { index, tenureValue } = tag;
      // Delete the tenure from the rules array
      state.newRangeData.rules[0].tags =
        state.newRangeData.rules[0].tags.filter(
          (tag) => tag.index !== index && tag.tenureValue !== tenureValue
        );
      state.newRangeData.rules[0].tenure =
        state.newRangeData.rules[0].tenure.filter(
          (tenure) => tenure !== tenureValue
        );
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
          name: newListItem.name,
          href: newListItem.href,
          createdOn: CreditScoreETList[index]?.createdOn || "14/09/2022",
          openLoans: CreditScoreETList[index]?.openLoans || "1490",
          totalDisbursedPrincipal:
            CreditScoreETList[index]?.totalDisbursedPrincipal || "$750M",
          status: CreditScoreETList[index]?.status || "Active",
        }));

        // Assign the updatedList to CreditScoreETList
        state.creditScoreETData.CreditScoreETList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCreditScoreETInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditScoreETInfo.fulfilled, (state, action) => {
        if (action.payload.operators) {
          state.creditScoreET.operators = action.payload.operators;
          state.newRangeData.operators = action.payload.operators;
          state.creditScoreET.rules = action.payload.rules.map((rule) => ({
            ...rule, // Spread existing rule properties
            tenureValue: "",
            tenureType: "MONTHS",
            dataIndex: nanoid(),
            tags: rule.tenure.map((tenureValue, index) => ({
              index,
              tenureValue, // Create an object with index and tenure
              tenureType: "MONTHS",
            })),
          }));
        } else {
          state.creditScoreET.rules = null;
        }
        state.loading = false;
      })
      .addCase(fetchCreditScoreETInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(fetchCreditScoreETName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditScoreETName.fulfilled, (state, action) => {
        state.loading = false;
        state.creditScoreETName = action.payload.name.replace(/-/g, " ");
      })
      .addCase(fetchCreditScoreETName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(saveCreditScoreET.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCreditScoreET.fulfilled, (state) => {
        state.loading = false;
        toast.success("Data updated successfully!");
      })
      .addCase(saveCreditScoreET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(AddNewRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewRange.fulfilled, (state) => {
        state.loading = false;
        state.newRangeData = {
          operators: { ...state.creditScoreET.operators },
          rules: [
            {
              firstCreditScore: "",
              secondCreditScore: "",
              creditScoreEtTempId: "",
              ruleName: "0",
              fieldType: "Employer",
              tenureValue: "",
              tenure: [],
              tags: [],
            },
          ],
        };
        toast.success("New Range added successfully!");
      })
      .addCase(AddNewRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(updateCreditScoreETName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCreditScoreETName.fulfilled, (state) => {
        state.loading = false;
        toast.success("Name Updated!");
      })
      .addCase(updateCreditScoreETName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(createCloneCSET.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCloneCSET.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Clone Successful!");
      })
      .addCase(createCloneCSET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(handleDeleteCSET.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteCSET.fulfilled, (state) => {
        state.loading = false;
        toast("Eligible Tenure Deleted!");
      })
      .addCase(handleDeleteCSET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      })
      .addCase(handleDeleteRange.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteRange.fulfilled, (state) => {
        state.loading = false;
        toast("Eligible Tenure Range Deleted!");
      })
      .addCase(handleDeleteRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`${action.payload}`);
      });
  },
});

export const {
  setFormData,
  updateCreditScoreETId,
  setCreditScoreETName,
  updateCreditScoreET,
  updateNewRange,
  setNewRangeTenure,
  addTenure,
  addNewRangeTenure,
  setTenure,
  deleteTenure,
  deleteNewRangeTenure,
} = eligiblityTenureSlice.actions;

export default eligiblityTenureSlice.reducer;
