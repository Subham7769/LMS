import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  creditScoreData: [],
  formData: {
    aweightage: "",
    bweightage: "",
    creditScoreEqTempId: "",
    cweightage: "",
    dweightage: "",
    eweightage: "",
    fweightage: "",
    residentsCreditScore: "",
    expatriatesCreditScore: "",
    rentStatusScore: "",
    ownStatusScore: "",
    marriedStatusScore: "",
    singleStatusScore: "",
    divorcedStatusScore: "",
    widowedStatusScore: "",
    separatedStatusScore: "",
    unknownStatusScore: "",
    dependentsRules: {
      operators: {
        firstDependentsOperator: "",
        secondDependentsOperator: "",
      },
      rules: [
        {
          ruleName: "1",
          fieldType: "Employer",
          creditScoreEqTempId: "",
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
        {
          ruleName: "2",
          fieldType: "Employer",
          creditScoreEqTempId: "",
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
        {
          ruleName: "3",
          fieldType: "Employer",
          creditScoreEqTempId: "",
          firstDependent: "",
          secondDependent: "",
          value: "",
        },
      ],
    },
  },
  error: null,
  loading: false,
};

export const fetchCreditScore = createAsyncThunk(
  "creditScore/fetchCreditScore",
  async (creditScoreId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/credit-score-equation/${creditScoreId}`,
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
        return rejectWithValue("Unauthorized");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update Credit Score
export const updateCreditScore = createAsyncThunk(
  "creditScore/updateCreditScore",
  async ({ creditScoreId, formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/credit-score-equation/${creditScoreId}`,
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
        return rejectWithValue("Failed to Update! Invalid field Dependents");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clone Credit Score
export const cloneCreditScore = createAsyncThunk(
  "creditScore/cloneCreditScore",
  async ({ creditScoreId, cloneCSEName }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_CREATE_CLONE
        }${creditScoreId}/clone/${cloneCSEName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to clone credit score");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Rename Credit Score
export const renameCreditScore = createAsyncThunk(
  "creditScore/renameCreditScore",
  async ({ creditScoreId, updatecseName }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_CREDIT_SCORE_NAME_UPDATE
        }${creditScoreId}/name/${updatecseName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to rename credit score");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete Credit Score
export const deleteCreditScore = createAsyncThunk(
  "creditScore/deleteCreditScore",
  async (creditScoreId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_DELETE}${creditScoreId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to delete credit score");
      }

      return creditScoreId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const creditScoreSlice = createSlice({
  name: "creditScore",
  creditScoreData: [],
  initialState,
  reducers: {
    setFormData: (state, action) => {
      const { name, value, id } = action.payload;

      const isOperator =
        state.formData.dependentsRules.operators.hasOwnProperty(name);
      const isRuleField = state.formData.dependentsRules.rules.some(
        (rule) => rule.ruleName === id && rule.hasOwnProperty(name)
      );

      if (isOperator) {
        state.formData.dependentsRules.operators[name] = value;
      } else if (isRuleField) {
        state.formData.dependentsRules.rules =
          state.formData.dependentsRules.rules.map((rule) =>
            rule.ruleName === id ? { ...rule, [name]: value } : rule
          );
      } else {
        state.formData[name] = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        // Check if action.payload is empty or null
        if (!action.payload.id) {
          state.formData = {
            aweightage: "",
            bweightage: "",
            creditScoreEqTempId: action.meta.arg,
            cweightage: "",
            dweightage: "",
            eweightage: "",
            fweightage: "",
            residentsCreditScore: "",
            expatriatesCreditScore: "",
            rentStatusScore: "",
            ownStatusScore: "",
            marriedStatusScore: "",
            singleStatusScore: "",
            divorcedStatusScore: "",
            widowedStatusScore: "",
            separatedStatusScore: "",
            unknownStatusScore: "",
            dependentsRules: {
              operators: {
                firstDependentsOperator: "",
                secondDependentsOperator: "",
              },
              rules: [
                {
                  ruleName: "1",
                  fieldType: "Employer",
                  creditScoreEqTempId: action.meta.arg,
                  firstDependent: "",
                  secondDependent: "",
                  value: "",
                },
                {
                  ruleName: "2",
                  fieldType: "Employer",
                  creditScoreEqTempId: action.meta.arg,
                  firstDependent: "",
                  secondDependent: "",
                  value: "",
                },
                {
                  ruleName: "3",
                  fieldType: "Employer",
                  creditScoreEqTempId: action.meta.arg,
                  firstDependent: "",
                  secondDependent: "",
                  value: "",
                },
              ],
            },
          };
        } else {
          // If not empty, update formData with the payload
          state.formData = {
            ...state.formData,
            ...action.payload,
          };
          console.log(state.formData);
        }
      })
      .addCase(fetchCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCreditScore.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cloneCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(cloneCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure the payload is an array before assigning it
        state.creditScoreData = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(cloneCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(renameCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(renameCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        // Ensure the payload is an array before assigning it
        state.creditScoreData = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(renameCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        state.creditScoreData = state.creditScoreData.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFormData } = creditScoreSlice.actions;

export default creditScoreSlice.reducer;
