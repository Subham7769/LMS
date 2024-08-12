// redux/slices/tclSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { convertDate } from "../../utils/convertDate";
import { fetchTCLData } from "../../redux/Slices/sidebarSlice";

// Define async thunks for fetching data and performing actions
export const fetchName = createAsyncThunk(
  "tcl/fetchName",
  async (tclId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_TCL_READ}${tclId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }
      const data = await response.json();
      return data.tclName;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchData = createAsyncThunk(
  "tcl/fetchData",
  async (tclId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_TCL_FILENAME_READ}${tclId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }
      const data = await response.json();
      const formattedTCLInfoData = data.map(({ fileName, tclFileId }) => ({
        value: tclFileId,
        label: fileName.replace(/.csv/g, " "),
      }));
      return formattedTCLInfoData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTCLData = createAsyncThunk(
  "tcl/addTCLData",
  async (fileSelectedOption, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/files/by-id/${fileSelectedOption.value}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized");
      }

      const TCLDetails = await data.json();
      const formattedTCLInfoData = {
        name: TCLDetails.fileName,
        minTCL: TCLDetails.minTcl,
        avgTCL: TCLDetails.avgTcl,
        maxTCL: TCLDetails.maxTcl,
        totalUser: TCLDetails.totalUser,
        uploadedDate: convertDate(TCLDetails.createTime),
        totalRows: TCLDetails.totalRows,
      };

      const { tcl } = getState();
      const alreadyExists = tcl.tableData.some(
        (item) => item.name === formattedTCLInfoData.name
      );

      if (alreadyExists) {
        return rejectWithValue(
          "The selected file is already added to the table."
        );
      }

      return formattedTCLInfoData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTCL = createAsyncThunk(
  "tcl/updateTCL",
  async ({ tclId, updateTCLName }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        `${import.meta.env.VITE_TCL_NAME_UPDATE}${tclId}/name/${updateTCLName}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized");
      }

      const TCLDetails = await data.json();
      return TCLDetails;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTCL = createAsyncThunk(
  "tcl/deleteTCL",
  async (deleteURL, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_TCL_DELETE}${deleteURL}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        return rejectWithValue("Failed to delete the item");
      }

      dispatch(fetchTCLData());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tclInitialState = {
  itemName: "",
  tableData: [],
  data: [],
  loading: false,
  error: null,
};

const tclSlice = createSlice({
  name: "tcl",
  initialState: tclInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearTableData: (state) => {
      state.tableData = [];
    },
    removeTableDataByIndex: (state, action) => {
      state.tableData = state.tableData.filter((_, i) => i !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
      })
      .addCase(fetchName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTCLData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTCLData.fulfilled, (state, action) => {
        state.loading = false;
        state.tableData = [action.payload, ...state.tableData];
        state.error = null;
      })
      .addCase(addTCLData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTCL.fulfilled, (state, action) => {
        state.itemName = action.payload.tclName;
        state.error = null;
      })
      .addCase(updateTCL.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTCL.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTCL.fulfilled, (state, action) => {
        toast.success("Recovery configuration deleted successfully!");
      })
      .addCase(deleteTCL.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  setLoading,
  setData,
  setError,
  clearTableData,
  removeTableDataByIndex,
} = tclSlice.actions;
export default tclSlice.reducer;
