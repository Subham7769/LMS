import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export const fetchAllBank = createAsyncThunk(
  "bank/fetchAllBank",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BANKS_READ_ALL_BANKS}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get item");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addBank = createAsyncThunk(
  "bank/addBank",
  async ({ bankName }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BANKS_CREATE_NEW_BANK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bankName }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add item");
      }

      // Fetch the updated data after successful addition
      dispatch(fetchAllBank());
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBank = createAsyncThunk(
  "bank/deleteBank",
  async ({ bankId }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BANKS_DELETE_BANKS}${bankId}`,
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
        return rejectWithValue(errorData.message || "Failed to delete item");
      }

      // Fetch the updated data after deletion
      dispatch(fetchAllBank());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addBankBranch = createAsyncThunk(
  "bank/addBankBranch",
  async (
    { bankId, branchCode, branchName, sortCode },
    { dispatch, rejectWithValue }
  ) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BANKS_CREATE_NEW_BANK_BRANCH}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bankId, branchCode, branchName, sortCode }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add item");
      }

      // Fetch the updated data after successful addition
      dispatch(fetchAllBank());
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateBankBranch = createAsyncThunk(
  "bank/updateBankBranch",
  async ({ updatedBankBranch, branchId }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BANKS_UPDATE_BANK_BRANCH}${branchId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedBankBranch),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to save item");
      }

      dispatch(fetchAllBank());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBankBranch = createAsyncThunk(
  "bank/deleteBankBranch",
  async ({ branchId, bankId }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BANKS_DELETE_BANK_BRANCH
        }${bankId}/branches/${branchId}`,
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
        return rejectWithValue(errorData.message || "Failed to delete item");
      }

      // Fetch the updated data after deletion
      dispatch(fetchAllBank());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const InitialState = {
  allBanksData: [],
  bankOptions: [],
  bankBranchOptions: [],
  sortCodeBranchCodeOptions: [],
  loading: false,
  error: null,
};

export const bankSlice = createSlice({
  name: "bank",
  initialState: InitialState,
  reducers: {
    handleChangeBankData: (state, action) => {
      const { id, name, value } = action.payload;
      const updatedData = state.allBanksData.map((item) => {
        if (item.employerId === id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      state.allBanksData = updatedData;
    },
    handleChangeBankBranch: (state, action) => {
      const { name, value, branchId, bankId } = action.payload;
      const updatedData = state.allBanksData.map((bank) => {
        if (bank.bankId === bankId) {
          return {
            ...bank,
            bankBranchDetailsList: bank.bankBranchDetailsList.map((branch) => {
              if (branch.branchId === branchId) {
                return { ...branch, [name]: value };
              }
              return branch;
            }),
          };
        }
        return bank;
      });
      state.allBanksData = updatedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBank.fulfilled, (state, action) => {
        state.loading = false;
        state.allBanksData = action.payload;

        // Bank Option Creation
        state.bankOptions = action.payload.map((bank) => ({
          label: bank.bankName,
          value: bank.bankName,
        }));

        // Branch options creation
        const BranchArray = action.payload.map((bank) => {
          const bankMappedBranches = {
            [bank.bankName]: bank.bankBranchDetailsList.map((branch) => ({
              label: branch.branchName,
              value: branch.branchName,
            })),
          };
          return bankMappedBranches;
        });
        state.bankBranchOptions = Object.assign({}, ...BranchArray);

        // Sort code Branch Code options Creation
        const SortCodeBranchCodeArray = action.payload.map((bank) => {
          const branchMappedSortCodeBranchCodes = bank.bankBranchDetailsList.reduce((acc, branch) => {
            acc[branch.branchName] = {
              sortCode: branch.sortCode,
              branchCode: branch.branchCode,
            };
            return acc;
          }, {});
        
          return {
            ...branchMappedSortCodeBranchCodes,
          };
        });
        state.sortCodeBranchCodeOptions = Object.assign({}, ...SortCodeBranchCodeArray);

      })
      .addCase(fetchAllBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addBank.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBank.fulfilled, (state) => {
        state.loading = false;
        toast.success("Bank Added Successfully");
      })
      .addCase(addBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteBank.pending, (state) => {
        // state.loading = true;
      })
      .addCase(deleteBank.fulfilled, (state) => {
        state.loading = false;
        toast.success("Bank Deleted Successfully");
      })
      .addCase(deleteBank.rejected, (state, action) => {
        state.loading = false;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addBankBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBankBranch.fulfilled, (state) => {
        state.loading = false;
        toast.success("Bank Branch Added Successfully");
      })
      .addCase(addBankBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateBankBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBankBranch.fulfilled, (state) => {
        state.loading = false;
        toast.success("Saved Successfully");
      })
      .addCase(updateBankBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteBankBranch.pending, (state) => {
        // state.loading = true;
      })
      .addCase(deleteBankBranch.fulfilled, (state) => {
        state.loading = false;
        toast.success("Deleted Successfully");
      })
      .addCase(deleteBankBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { setBankData, handleChangeBankData, handleChangeBankBranch } =
  bankSlice.actions;
export default bankSlice.reducer;
