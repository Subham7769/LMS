// redux/slices/tclSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { convertDate } from "../../utils/convertDate";
import { fetchTCLData } from "../../redux/Slices/sidebarSlice";
import { HeaderList, TCLList } from "../../data/TclData";
import { toast } from "react-toastify";

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
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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

// export const uploadTCLFile = createAsyncThunk(
//   "tcl/uploadTCLFile",
//   async ({ tclId, selectedFile }, { rejectWithValue, dispatch }) => {
//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       const token = localStorage.getItem("authToken");
//       const response = await fetch(
//         `${import.meta.env.VITE_TCL_UPLOAD_URL}${tclId}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to upload file");
//       }

//       // Dispatch to fetch updated data after successful upload
//       dispatch(fetchData(tclId));

//       return "File uploaded successfully!";
//     } catch (error) {
//       return rejectWithValue("Error uploading file. Please try again.");
//     }
//   }
// );

export const uploadTCLFile = createAsyncThunk(
  "tcl/uploadTCLFile",
  async ({ formData, fileUploadParams }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const { tclId } = fileUploadParams;
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
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to upload");
      }
      dispatch(fetchData(tclId));
      return "File uploaded successfully!";
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
        `${import.meta.env.VITE_TCL_FILE_ADD_DATA}${fileSelectedOption}`,
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

export const fetchList = createAsyncThunk(
  "tcl/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find((menu) => menu.title === "TCL");
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const tclInitialState = {
  tclStatsData: {
    HeaderList,
    TCLList,
  },
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
      .addCase(fetchList.pending, (state) => {
        state.loading = true; // Data is being fetched
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        // If action.payload has fewer or equal objects than TCLList, only map action.payload
        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          // createdOn: TCLList[index]?.createdOn || "14/09/2022",
          // openLoans: TCLList[index]?.openLoans || "1490",
          // totalDisbursedPrincipal:
          //   TCLList[index]?.totalDisbursedPrincipal || "$750M",
          // status: TCLList[index]?.status || "Active",
        }));

        // Assign the updatedList to TCLList
        state.tclStatsData.TCLList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
        toast.error(`API Error : ${action.payload}`);
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
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteTCL.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTCL.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("TCL deleted successfully!");
      })
      .addCase(deleteTCL.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteTCLFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTCLFile.fulfilled, (state, action) => {
        state.loading = false;
        state.tableData = state.tableData.filter(
          (item) => item.value !== action.payload
        );
        toast.success("File deleted successfully");
      })
      .addCase(deleteTCLFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
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
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
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
