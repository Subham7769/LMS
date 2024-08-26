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
  async (formData, { rejectWithValue, dispatch }) => {
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
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Optionally, refetch the data to update the store
      dispatch(fetchCreditScoreETInfo(formData.rules[0].creditScoreEtTempId));
    } catch (error) {
      console.error("Failed to update data:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating the Credit Score ET Name
export const updateCreditScoreETName = createAsyncThunk(
  "creditScoreET/updateCreditScoreETName",
  async ({ creditScoreETId, updatecsetName }, { rejectWithValue }) => {
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
  formData: {
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
      state.formData = action.payload;
    },
    setCreditScoreETName: (state, action) => {
      state.creditScoreETName = action.payload;
    },
    handleChangeDispatch: (state, action) => {
      const { name, value } = action.payload;
      const isOperator = state.formData.operators.hasOwnProperty(name);
      const isRuleField = state.formData.rules[0].hasOwnProperty(name);

      if (isOperator) {
        state.formData.operators[name] = value;
      } else if (isRuleField) {
        state.formData.rules[0][name] = value;
      }
    },
    addTenure: (state, action) => {
      state.formData.rules[0].tenure.push(action.payload);
    },
    deleteTenure: (state, action) => {
      state.formData.rules[0].tenure.splice(action.payload, 1);
    },
    updateTenure: (state, action) => {
      const { index, value } = action.payload;
      state.formData.rules[0].tenure[index] = value;
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
          state.formData = action.payload;
        } else {
          state.formData = {
            operators: {
              firstCreditScoreOperator: "",
              secondCreditScoreOperator: "",
            },
            rules: [
              {
                firstCreditScore: "",
                secondCreditScore: "",
                creditScoreEtTempId: action.meta.arg, // Assuming creditScoreEtTempId is passed as an argument
                ruleName: "0",
                fieldType: "Employer",
                tenure: [],
              },
            ],
          };
          console.log(state.formData);
        }
      })
      .addCase(fetchCreditScoreETInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })
      .addCase(saveCreditScoreET.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveCreditScoreET.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveCreditScoreET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCreditScoreETName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCreditScoreETName.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCreditScoreETName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCloneCSET.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCloneCSET.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createCloneCSET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(handleDeleteCSET.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleDeleteCSET.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(handleDeleteCSET.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFormData,
  setCreditScoreETName,
  handleChangeDispatch,
  addTenure,
  deleteTenure,
  updateTenure,
} = creditScoreETSlice.actions;

export default creditScoreETSlice.reducer;
