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

export const uploadTCLFile = createAsyncThunk(
  "tcl/uploadTCLFile",
  async ({ tclId, selectedFile }, { rejectWithValue, dispatch }) => {
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_TCL_UPLOAD_URL}${tclId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      // Dispatch to fetch updated data after successful upload
      dispatch(fetchData(tclId));

      return "File uploaded successfully!";
    } catch (error) {
      return rejectWithValue("Error uploading file. Please try again.");
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
        tclFileId: TCLDetails.tclFileId,
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

export const deleteTCLFile = createAsyncThunk(
  "tcl/deleteTCLFile",
  async ({ tclFileId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_TCL_FILE_DELETE}${tclFileId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error message from the server
        return rejectWithValue(errorData.message || "Failed to delete item");
      }
      return tclFileId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tclInitialState = {
  itemName: "",
  tableData: [],
  data: [],
  tableDataHistory: {}, // New field for storing table data per tclId
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
      state.error = action.error.message;
    },
    clearTableData: (state, action) => {
      // Store current tableData in history before clearing it
      const { tclId } = action.payload;
      if (tclId && state.tableData.length > 0) {
        state.tableDataHistory[tclId] = state.tableData;
      }
      state.tableData = [];
    },
    restoreTableData: (state, action) => {
      const { tclId } = action.payload;
      state.tableData = state.tableDataHistory[tclId] || [];
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
        state.error = action.error.message;
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(updateTCL.fulfilled, (state, action) => {
        state.itemName = action.payload.tclName;
        state.error = null;
      })
      .addCase(updateTCL.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTCL.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTCL.fulfilled, (state, action) => {
        toast.success("TCL deleted successfully!");
      })
      .addCase(deleteTCL.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTCLFile.fulfilled, (state, action) => {
        state.tableData = state.tableData.filter(
          (item) => item.value !== action.payload
        );
      })
      .addCase(deleteTCLFile.rejected, (state, action) => {
        toast.error(action.payload);
        state.error = action.error.message;
      })
      .addCase(uploadTCLFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadTCLFile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload); // Notify the user of success
      })
      .addCase(uploadTCLFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.payload); // Notify the user of the error
      });
  },
});

export const {
  setLoading,
  setData,
  setError,
  clearTableData,
  restoreTableData,
  removeTableDataByIndex,
} = tclSlice.actions;
export default tclSlice.reducer;
