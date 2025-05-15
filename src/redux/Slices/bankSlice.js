import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export const fetchAllBank = createAsyncThunk(
  "bank/fetchAllBank",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_BANKS_READ_ALL_BANKS}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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

export const addBankData = createAsyncThunk(
  "bank/addBankData",
  async (bankData, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EMPLOYER_ADD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bankData),
      });

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
  async ({  updatedBankBranch, branchId}, { dispatch, rejectWithValue }) => {
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
  async ({branchId, bankId}, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BANKS_DELETE_BANK_BRANCH}${bankId}/branches/${branchId}`,
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
  bankData: {
    bankName: "",
  },
  bankBranchDetailsList:{
    branchName: "",
    branchCode: "",
    sortCode: "",
  },
  loading: false,
  error: null,
};

export const bankSlice = createSlice({
  name: "bank",
  initialState: InitialState,
  reducers: {
    setBankData: (state, action) => {
      const { name, value, section } = action.payload;
      if (section === "bankBranchDetailsList") {
        state.bankData[section][name] = value;
      } else {
        state.bankData[name] = value;
      }
    },
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
      const { name, value,branchId,bankId } = action.payload;
      const updatedData = state.allBanksData.map((bank) => {
        if (bank.bankId === bankId) {
          return { ...bank,
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
      })
      .addCase(fetchAllBank.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addBankData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBankData.fulfilled, (state) => {
        state.loading = false;
        state.bankData = InitialState.bankData;
        toast.success("Added Successfully");
      })
      .addCase(addBankData.rejected, (state, action) => {
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
        state.loading = true;
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

export const { setBankData, handleChangeBankData,handleChangeBankBranch } = bankSlice.actions;
export default bankSlice.reducer;
