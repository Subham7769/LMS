import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCreditScoreEligibleTenureData } from "../../redux/Slices/sidebarSlice";

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
        throw new Error("Failed to fetch data");
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
        throw new Error("Failed to fetch name");
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
  async (creditScoreET, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_UPDATE}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(creditScoreET),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Optionally, refetch the data to update the store
      dispatch(
        fetchCreditScoreETInfo(creditScoreET.rules[0].creditScoreEtTempId)
      );
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
        throw new Error(`HTTP error! Status: ${response.status}`);
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

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to clone Credit Score ET");
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
        throw new Error("Failed to delete Credit Score ET");
      }

      dispatch(fetchCreditScoreEligibleTenureData());
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
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
        tenure: [],
      },
    ],
    tags: [],
    tenure: "",
  },
  creditScoreETName: "",
  loading: false,
  error: null,
};

const creditScoreETSlice = createSlice({
  name: "creditScoreET",
  initialState: creditScoreETInitialState,
  reducers: {
    setFormData: (state, action) => {
      state.creditScoreET = action.payload;
    },
    setCreditScoreETName: (state, action) => {
      state.creditScoreETName = action.payload;
    },
    handleChangeDispatch: (state, action) => {
      const { name, value } = action.payload;
      const isOperator = state.creditScoreET.operators.hasOwnProperty(name);
      const isRuleField = state.creditScoreET.rules[0].hasOwnProperty(name);

      if (isOperator) {
        state.creditScoreET.operators[name] = value;
      } else if (isRuleField) {
        state.creditScoreET.rules[0][name] = value;
      } else {
        state.creditScoreET = { ...state.creditScoreET, ...action.payload };
      }
    },
    setTenure: (state, action) => {
      state.creditScoreET = { ...state.creditScoreET, ...action.payload };
    },
    addTenure: (state, action) => {
      state.creditScoreET.rules[0].tenure.push(action.payload);
      state.creditScoreET.tags.push({
        index: state.creditScoreET.tags.length, // Use the current length of the tags array as the latest index
        tenure: action.payload,
      });
      state.creditScoreET.tenure = "";
    },
    deleteTenure: (state, action) => {
      // Delete the tenure from the rules array
      state.creditScoreET.rules[0].tenure.splice(action.payload, 1);

      // Delete the corresponding entry from the tags array based on the index
      state.creditScoreET.tags = state.creditScoreET.tags
        .filter((tag) => tag.index !== action.payload)
        .map((tag, index) => ({ ...tag, index })); // Update the indices in tags to maintain consistency
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditScoreETInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditScoreETInfo.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.operators) {
          state.creditScoreET.operators = action.payload.operators;
          state.creditScoreET.rules = action.payload.rules;
          // state.creditScoreET.tags = action.payload.rules[0].tenure;
          state.creditScoreET.tags = action.payload.rules.flatMap((item) =>
            item.tenure.map((tenure, index) => ({
              // ruleName: item.ruleName, // Include ruleName from each payload item
              index,
              tenure: tenure, // Include each blockEmployersName as name
            }))
          );
        } else {
          state.creditScoreET = {
            ...creditScoreETInitialState.creditScoreET,
            rules: [
              {
                ...creditScoreETInitialState.creditScoreET.rules[0],
                creditScoreEtTempId: action.meta.arg,
              },
            ],
          };
          // state.creditScoreET.operators = action.payload.operators || creditScoreETInitialState.creditScoreET.operators;
        }
      })
      .addCase(fetchCreditScoreETInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(saveCreditScoreET.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCreditScoreET.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCreditScoreET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateCreditScoreETName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCreditScoreETName.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCreditScoreETName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCloneCSET.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCloneCSET.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCloneCSET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(handleDeleteCSET.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteCSET.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleDeleteCSET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFormData,
  setCreditScoreETName,
  handleChangeDispatch,
  addTenure,
  setTenure,
  deleteTenure,
} = creditScoreETSlice.actions;

export default creditScoreETSlice.reducer;
