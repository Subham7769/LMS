import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

// Async thunks for API calls
export const fetchLiabilityData = createAsyncThunk(
  "liabilitiesMatrix/fetchLiabilityData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_LIABILITIES_READ}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewLiabilityItem = createAsyncThunk(
  "liabilitiesMatrix/addNewLiabilityItem",
  async (newLiabilityForm, { dispatch, rejectWithValue }) => {
    const postData = {
      product: newLiabilityForm.product,
      simahDescriptionCode: newLiabilityForm.simahDescriptionCode,
      issuer: newLiabilityForm.issuer,
      applicabilityGDBR: newLiabilityForm.applicabilityGDBR,
      totalExposure: newLiabilityForm.totalExposure,
      defaultConsideredInSIMAHscore:
        newLiabilityForm.defaultConsideredInSIMAHscore,
      activeRule: newLiabilityForm.activeRule === "" ? "NO" : "YES",
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_LIABILITIES_ADD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        dispatch(fetchLiabilityData());
      } else {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add item");
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for updating a specific row
export const updateLiabilityItem = createAsyncThunk(
  "liabilitiesMatrix/updateLiabilityItem",
  async (
    { updatedItem, oldSimahDescriptionCode },
    { dispatch, rejectWithValue }
  ) => {
    const putData = {
      product: updatedItem.product,
      issuer: updatedItem.issuer,
      activeRule:
        updatedItem.activeRule === true || updatedItem.activeRule === "YES"
          ? "YES"
          : "NO",
      applicabilityGDBR: updatedItem.applicabilityGDBR,
      totalExposure: updatedItem.totalExposure,
      defaultConsideredInSIMAHscore: updatedItem.defaultConsideredInSIMAHscore,
      simahDescriptionCode: updatedItem.simahDescriptionCode,
      newSimahDescriptionCode: updatedItem.simahDescriptionCode,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LIABILITIES_UPDATE}${oldSimahDescriptionCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(putData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update item");
      }

      dispatch(fetchLiabilityData()); // Re-fetch the data after a successful update
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for deleting a specific row
export const deleteLiabilityItem = createAsyncThunk(
  "liabilitiesMatrix/deleteLiabilityItem",
  async (deleteURL, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LIABILITIES_DELETE}${deleteURL}`,
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

      dispatch(fetchLiabilityData()); // Re-fetch the data after a successful deletion
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to fetch data
export const fetchRiskGrades = createAsyncThunk(
  "riskGradeCal/fetchRiskGrades",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_READ}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        window.location.href = "/login";
        return rejectWithValue("Unauthorized");
      }
      const data = await response.json();
      const sorteddata = [...data].sort((a, b) => a.from - b.from);
      return sorteddata;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to add a new item
export const addRiskGrade = createAsyncThunk(
  "riskGradeCal/addRiskGrade",
  async (newRiskGradeForm, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_ADD}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newRiskGradeForm),
      });
      if (!response.ok) {
        throw new Error("Failed to add item");
      }
      dispatch(fetchRiskGrades());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to update an existing item
export const updateRiskGrade = createAsyncThunk(
  "riskGradeCal/updateRiskGrade",
  async (itemToUpdate, { dispatch, rejectWithValue }) => {
    const { id } = itemToUpdate;
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_UPDATE}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(itemToUpdate),
      });
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      dispatch(fetchRiskGrades());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk to delete an item
export const deleteRiskGrade = createAsyncThunk(
  "riskGradeCal/deleteRiskGrade",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_RISK_DELETE}${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      dispatch(fetchRiskGrades());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for fetching data
export const fetchExpenseData = createAsyncThunk(
  "bareMinimumExp/fetchExpenseData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EXPENSE_READ}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data.expenses;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for adding fields
export const addExpenseField = createAsyncThunk(
  "bareMinimumExp/addExpenseField",
  async (expenseForm, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EXPENSE_ADD}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(expenseForm),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Fetch the updated data after successful addition
      dispatch(fetchExpenseData());
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for saving updates
export const saveExpenseField = createAsyncThunk(
  "bareMinimumExp/saveExpenseField",
  async (id, { getState, dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { allExpenseData } = getState().globalConfig;
    const itemToUpdate = allExpenseData.find((item) => item.id === id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EXPENSE_UPDATE}${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemToUpdate),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      dispatch(fetchExpenseData());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async thunk for deleting fields
export const deleteExpenseField = createAsyncThunk(
  "bareMinimumExp/deleteExpenseField",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EXPENSE_DELETE}${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the item");
      }

      // Fetch the updated data after deletion
      dispatch(fetchExpenseData());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to fetch notification data
export const fetchNotificationData = createAsyncThunk(
  "notificationText/fetchNotificationData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NOTIFICATIONS_READ}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk to save notification data
export const saveNotificationData = createAsyncThunk(
  "notificationText/saveNotificationData",
  async (id, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { notificationInputList } = getState().globalConfig;
    const item = notificationInputList.find((item) => item.id === id);
    if (!item) {
      return rejectWithValue("Item not found");
    }

    const updatedItem = {
      notificationMessageEn: item.notificationMessageEn,
      notificationMessageAr: item.notificationMessageAr,
      notificationChannel: item.notificationChannel,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_NOTIFICATIONS_UPDATE}${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData)
      }

      // You can return this if you want to handle the result
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  allLiabilityData: [],
  newLiabilityForm: {
    product: "",
    simahDescriptionCode: "",
    issuer: "",
    applicabilityGDBR: "",
    totalExposure: "",
    activeRule: "",
    defaultConsideredInSIMAHscore: "",
    dataIndex: nanoid(),
  },
  allRiskGradeData: [],
  newRiskGradeForm: {
    id: Date.now(),
    from: "",
    to: "",
    grade: "",
  },
  allExpenseData: [],
  expenseForm: {
    expensesName: "",
    expensesFrequency: "",
    bareMinimum: "",
    dependantType: "",
  },
  notificationInputList: [],
  loading: false,
  error: null,
};

export const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  reducers: {
    handleLiabilityNewInputChange: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.newLiabilityForm[name] = checked ? "YES" : "NO";
      } else {
        state.newLiabilityForm[name] = value;
      }
    },
    handleLiabilityInputChange: (state, action) => {
      const { name, value, checked, type, index } = action.payload;
      const updatedData = state.allLiabilityData.map((item, idx) => {
        if (index === idx) {
          return {
            ...item,
            [name]: type === "checkbox" ? (checked ? "YES" : "NO") : value,
          };
        }
        return item;
      });
      state.allLiabilityData = updatedData;
    },
    handleRiskGradeNewInputChange: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.newRiskGradeForm[name] = checked;
      } else {
        state.newRiskGradeForm[name] = value;
      }
    },
    handleRiskGradeExistingInputChange: (state, action) => {
      const { id, name, value } = action.payload;
      const itemIndex = state.allRiskGradeData.findIndex(
        (item) => item.id === id
      );
      if (itemIndex !== -1) {
        state.allRiskGradeData[itemIndex][name] = value;
      }
    },
    updateExpenseFormData: (state, action) => {
      const { name, value, checked, type } = action.payload;
      if (type === "checkbox") {
        state.expenseForm[name] = checked;
      } else {
        state.expenseForm[name] = value;
      }
    },
    resetExpenseFormData: (state) => {
      state.expenseForm = initialState.expenseForm;
    },
    handleExpenseInputChange: (state, action) => {
      const { id, name, value } = action.payload;
      const updatedData = state.allExpenseData.map((item) => {
        if (item.id === id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      state.allExpenseData = updatedData;
    },
    handleNotificationChange: (state, action) => {
      const { name, value, id } = action.payload;
      const list = [...state.notificationInputList];
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        list[index][name] = value;
      }
      state.notificationInputList = list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLiabilityData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLiabilityData.fulfilled, (state, action) => {
        state.allLiabilityData = action.payload;
        state.loading = false;
      })
      .addCase(fetchLiabilityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(addNewLiabilityItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewLiabilityItem.fulfilled, (state) => {
        state.loading = false;
        state.newLiabilityForm = {
          product: "",
          simahDescriptionCode: "",
          issuer: "",
          applicabilityGDBR: "",
          totalExposure: "",
          activeRule: "",
          defaultConsideredInSIMAHscore: "",
        };
        toast.success("Added Successfully");
      })
      .addCase(addNewLiabilityItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateLiabilityItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLiabilityItem.fulfilled, (state) => {
        state.loading = false;
        toast.success("Updated Successfully");
      })
      .addCase(updateLiabilityItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteLiabilityItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLiabilityItem.fulfilled, (state) => {
        state.loading = false;
        toast.success("Deleted Successfully");
      })
      .addCase(deleteLiabilityItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchRiskGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRiskGrades.fulfilled, (state, action) => {
        const updatedRiskGradeData = action.payload.map((data) => ({
          ...data,
          dataIndex: nanoid(),
        }));

        state.allRiskGradeData = updatedRiskGradeData;
        state.loading = false;
      })
      .addCase(fetchRiskGrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(addRiskGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRiskGrade.fulfilled, (state) => {
        state.loading = false;
        state.newRiskGradeForm = {
          id: Date.now(),
          from: "",
          to: "",
          grade: "",
        };
        toast.success("Added Successfully");
      })
      .addCase(addRiskGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      // Update Item Reducers
      .addCase(updateRiskGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRiskGrade.fulfilled, (state) => {
        state.loading = false;
        toast.success("Updated Successfully");
      })
      .addCase(updateRiskGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      // Delete Item Reducers
      .addCase(deleteRiskGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRiskGrade.fulfilled, (state) => {
        state.loading = false;
        toast.success("Deleted Successfully");
      })
      .addCase(deleteRiskGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(fetchExpenseData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpenseData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedExpenseData = action.payload.map((data) => ({
          ...data,
          dataIndex: nanoid(),
        }));
        state.allExpenseData = updatedExpenseData;
      })
      .addCase(fetchExpenseData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(addExpenseField.pending, (state) => {
        state.loading = true;
      })
      .addCase(addExpenseField.fulfilled, (state) => {
        state.loading = false;
        toast.success("Added Successfully");
      })
      .addCase(addExpenseField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(saveExpenseField.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveExpenseField.fulfilled, (state) => {
        state.loading = false;
        toast.success("Saved Successfully");
      })
      .addCase(saveExpenseField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(deleteExpenseField.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExpenseField.fulfilled, (state) => {
        state.loading = false;
        toast.success("Deleted Successfully");
      })
      .addCase(deleteExpenseField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(fetchNotificationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedNotificationData = action.payload.map((data) => ({
          ...data,
          dataIndex: nanoid(),
        }));
        state.notificationInputList = updatedNotificationData;
      })
      .addCase(fetchNotificationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      })
      .addCase(saveNotificationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveNotificationData.fulfilled, (state) => {
        state.loading = false;
        toast.success("Updated Successfully");
      })
      .addCase(saveNotificationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        toast.error(`API Error : ${action.payload.message}`);
      });
  },
});

export const {
  handleLiabilityNewInputChange,
  handleLiabilityInputChange,
  handleRiskGradeNewInputChange,
  handleRiskGradeExistingInputChange,
  updateExpenseFormData,
  handleExpenseInputChange,
  resetExpenseFormData,
  handleNotificationChange,
} = globalConfigSlice.actions;
export default globalConfigSlice.reducer;
