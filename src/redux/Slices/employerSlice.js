import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export const fetchEmployerData = createAsyncThunk(
  "employer/fetchEmployerData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EMPLOYER_READ}`, {
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

export const addEmployerData = createAsyncThunk(
  "employer/addEmployerData",
  async (employerData, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${import.meta.env.VITE_EMPLOYER_ADD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add item");
      }

      // Fetch the updated data after successful addition
      dispatch(fetchEmployerData());
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEmployerData = createAsyncThunk(
  "employer/updateEmployerData",
  async ({ updatePayload, id }, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EMPLOYER_UPDATE}${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatePayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to save item");
      }

      dispatch(fetchEmployerData());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEmployerData = createAsyncThunk(
  "employer/deleteEmployerData",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_EMPLOYER_DELETE}${id}`,
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
      dispatch(fetchEmployerData());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const employerInitialState = {
  allEmployerData: [],
  employerData: {
    employerName: "",
    affordabilityCriteriaTempId: "",
    firstEmiDay: "",
    moratoriumMonths: "",
    ministries: "",
  },
  loading: false,
  error: null,
};

export const employerSlice = createSlice({
  name: "employer",
  initialState: employerInitialState,
  reducers: {
    setEmployerData: (state, action) => {
      const { name, value } = action.payload;
      state.employerData[name] = value;
    },
    handleChangeEmployerData: (state, action) => {
      const { id, name, value } = action.payload;
      const updatedData = state.allEmployerData.map((item) => {
        if (item.employerId === id) {
          return { ...item, [name]: value };
        }
        return item;
      });
      state.allEmployerData = updatedData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployerData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedEmployerData = action.payload.map((data) => ({
          ...data,
          dataIndex: nanoid(),
        }));
        state.allEmployerData = updatedEmployerData;
      })
      .addCase(fetchEmployerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addEmployerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addEmployerData.fulfilled, (state) => {
        state.loading = false;
        state.employerData = employerInitialState.employerData;
        toast.success("Added Successfully");
      })
      .addCase(addEmployerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateEmployerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployerData.fulfilled, (state) => {
        state.loading = false;
        toast.success("Saved Successfully");
      })
      .addCase(updateEmployerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteEmployerData.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployerData.fulfilled, (state) => {
        state.loading = false;
        toast.success("Deleted Successfully");
      })
      .addCase(deleteEmployerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { setEmployerData, handleChangeEmployerData } =
  employerSlice.actions;
export default employerSlice.reducer;
