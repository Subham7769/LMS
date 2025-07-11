import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, CreditScoreEqList } from "../../data/CreditScoreEqData";
import { toast } from "react-toastify";

export const fetchCreditScore = createAsyncThunk(
  "creditScore/fetchCreditScore",
  async (creditScoreId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_READ}${creditScoreId}`,
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

// Update Credit Score
export const updateCreditScore = createAsyncThunk(
  "creditScore/updateCreditScore",
  async ({ creditScoreId, creditScoreData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_CREDIT_SCORE_READ}${creditScoreId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(creditScoreData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
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
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to clone credit score"
        );
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
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to rename credit score"
        );
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
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to delete credit score"
        );
      }

      return creditScoreId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "creditScore/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Credit Score"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const initialState = {
  creditScoreStatsData: {
    HeaderList,
    CreditScoreEqList,
  },
  creditScoreData: {
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
          secondDependent: "1",
          value: "",
        },
      ],
    },
  },
  error: null,
  loading: false,
};

const creditScoreSlice = createSlice({
  name: "creditScore",
  initialState,
  reducers: {
    setcreditScoreData: (state, action) => {
      const { name, value, id } = action.payload;

      const isOperator =
        state.creditScoreData.dependentsRules.operators.hasOwnProperty(name);
      const isRuleField = state.creditScoreData.dependentsRules.rules.some(
        (rule) => rule.ruleName === id && rule.hasOwnProperty(name)
      );

      if (isOperator) {
        state.creditScoreData.dependentsRules.operators[name] = value;
      } else if (isRuleField) {
        state.creditScoreData.dependentsRules.rules =
          state.creditScoreData.dependentsRules.rules.map((rule) =>
            rule.ruleName === id ? { ...rule, [name]: value } : rule
          );
      } else {
        state.creditScoreData[name] = value;
      }
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
          // createdOn: CreditScoreEqList[index]?.createdOn || "14/09/2022",
          // openLoans: CreditScoreEqList[index]?.openLoans || "2367",
          // totalDisbursedPrincipal:
          //   CreditScoreEqList[index]?.totalDisbursedPrincipal || "$234M",
          // status: CreditScoreEqList[index]?.status || "Inactive",
        }));

        // Assign the updatedList to CreditScoreEqList
        state.creditScoreStatsData.CreditScoreEqList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCreditScore.fulfilled, (state, action) => {
        state.loading = false;

        // Check if action.payload is empty or null
        if (!action.payload.id) {
          state.creditScoreData = {
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
          // If not empty, update creditScoreData with the payload
          state.creditScoreData = {
            ...state.creditScoreData,
            ...action.payload,
          };
        }
      })
      .addCase(fetchCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCreditScore.fulfilled, (state) => {
        state.loading = false;
        toast.success("Details updated successfully!");
      })
      .addCase(updateCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(cloneCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(cloneCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(cloneCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(renameCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(renameCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Name updated successfully!");
      })
      .addCase(renameCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteCreditScore.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCreditScore.fulfilled, (state, action) => {
        state.loading = false;
        toast("Deleted successfully!!");
      })
      .addCase(deleteCreditScore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { setcreditScoreData } = creditScoreSlice.actions;

export default creditScoreSlice.reducer;
