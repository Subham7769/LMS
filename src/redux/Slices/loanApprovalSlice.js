import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import {
  LoanApprovalHeaderList,
  LoanApprovalList,
} from "../../data/LoanApprovalData";

export const fetchName = createAsyncThunk(
  "loanApproval/fetchName",
  async (approvalsConfigurationsTempId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_APPROVAL_NAME_READ
        }${approvalsConfigurationsTempId}`,
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
      return data.name;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateLoanApprovalName = createAsyncThunk(
  "loanApproval/updateLoanApprovalName",
  async ({ approvalsConfigurationsTempId, newName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_LOAN_APPROVAL_NAME_UPDATE
    }${approvalsConfigurationsTempId}/name/${newName}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        return newName;
      } else {
        return rejectWithValue("Failed to update name");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLoanApproval = createAsyncThunk(
  "loanApproval/deleteLoanApproval",
  async (approvalsConfigurationsTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_LOAN_APPROVAL_DELETE
      }/${approvalsConfigurationsTempId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to delete");
    }

    return approvalsConfigurationsTempId; // Return the ID for any further processing
  }
);

export const createClone = createAsyncThunk(
  "loanApproval/createClone",
  async ({ approvalsConfigurationsTempId, cloneName }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `${
        import.meta.env.VITE_LOAN_APPROVAL_CREATE_CLONE
      }${approvalsConfigurationsTempId}/clone/${cloneName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return rejectWithValue("Failed to create clone");
    }

    const data = await response.json();
    return data; // Assuming it returns the new affordabilityCriteriaTempId
  }
);

export const fetchData = createAsyncThunk(
  "loanApproval/fetchData",
  async (approvalsConfigurationsTempId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_APPROVAL_READ
        }${approvalsConfigurationsTempId}`,
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

export const addLoanApproveData = createAsyncThunk(
  "loanApproval/addLoanApproveData",
  async (addLoanApproveDataPayload, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_APPROVAL_ADD}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addLoanApproveDataPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to add item");
      }

      // Fetch the updated data after successful addition
      dispatch(
        fetchData(addLoanApproveDataPayload.approvalsConfigurationsTempId)
      );
      // Reset the form after adding
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateLoanApproveData = createAsyncThunk(
  "loanApproval/updateLoanApproveData",
  async (updateLoanApproveDataPayload, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_APPROVAL_ADD}${
          updateLoanApproveDataPayload.approvalsConfigurationsRuleId
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateLoanApproveDataPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to save item");
      }

      dispatch(
        fetchData(updateLoanApproveDataPayload.approvalsConfigurationsTempId)
      );
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchList = createAsyncThunk(
  "loanApproval/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Loan Approval"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const loanApprovalInitialState = {
  itemName: "",
  loanApprovalStatsData: {
    LoanApprovalHeaderList,
    LoanApprovalList,
  },
  loanapprovalData: [],
  addLoanapprovalData: {
    minimum: "",
    maximum: "",
    approvalRoles: [
      {
        roleName: "",
        finalApprove: false,
        reject: false,
      },
    ],
  },
  loading: false,
  error: null,
};

export const loanApprovalSlice = createSlice({
  name: "loanApproval",
  initialState: loanApprovalInitialState,
  reducers: {
    setAddLoanapprovalData: (state, action) => {
      const { name, value, index } = action.payload;
      if (name === "roleName" || name === "finalApprove" || name === "reject") {
        state.addLoanapprovalData.approvalRoles[index][name] = value;
      } else {
        state.addLoanapprovalData[name] = value;
      }
    },
    handleAddRolesInput: (state) => {
      state.addLoanapprovalData.approvalRoles.push({
        roleName: "",
        finalApprove: false,
        reject: false,
      });
    },
    handleDeleteRolesInput: (state, action) => {
      const index = action.payload;
      state.addLoanapprovalData.approvalRoles =
        state.addLoanapprovalData.approvalRoles.filter((_, i) => i !== index);
    },
    handleLoanapprovalData: (state, action) => {
      const { name, value, index, idx } = action.payload;
      if (name === "roleName" || name === "finalApprove" || name === "reject") {
        state.loanapprovalData[0].loanCriteriaRangeRolesList[
          index
        ].approvalRoles[idx][name] = value;
      } else {
        state.loanapprovalData[0].loanCriteriaRangeRolesList[index][name] =
          value;
      }
    },
    handleAddRolesInputExisting: (state, action) => {
      const index = action.payload;
      console.log(state.loanapprovalData[0]);
      state.loanapprovalData[0].loanCriteriaRangeRolesList[
        index
      ].approvalRoles.push({
        roleName: "",
        finalApprove: false,
        reject: false,
      });
    },
    handleDeleteRolesInputExisting: (state, action) => {
      const { index, idx } = action.payload;
      state.loanapprovalData[0].loanCriteriaRangeRolesList[
        index
      ].approvalRoles = state.loanapprovalData[0].loanCriteriaRangeRolesList[
        index
      ].approvalRoles.filter((_, i) => i !== idx);
    },
    handleDeleteApprover: (state, action) => {
      const index = action.payload;
      state.loanapprovalData[0].loanCriteriaRangeRolesList =
        state.loanapprovalData[0].loanCriteriaRangeRolesList.filter(
          (_, i) => i !== index
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true; // Data is being fetched
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.loading = false;
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

        // Assign the updatedList to RecoveryList
        state.loanApprovalStatsData.LoanApprovalList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      .addCase(updateLoanApprovalName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLoanApprovalName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
        toast.success("Name updated successfully!");
      })
      .addCase(updateLoanApprovalName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteLoanApproval.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLoanApproval.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loan Approval criteria deleted!");
      })
      .addCase(deleteLoanApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createClone.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClone.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Clone created successfully!");
      })
      .addCase(createClone.rejected, (state, action) => {
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload[0] != null) {
          const updatedLoanapprovalData = action.payload.map((data) => ({
            ...data,
            loanCriteriaRangeRolesList: data.loanCriteriaRangeRolesList.map(
              (role) => ({
                ...role,
                dataIndex: nanoid(),
              })
            ),
          }));
          state.loanapprovalData = updatedLoanapprovalData;
        } else {
          state.loanapprovalData = {
            approvalsConfigurationsTempId: action.meta.arg,
            loanCriteriaRangeRolesList: [
              loanApprovalInitialState.addLoanapprovalData,
            ],
          };
        }
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addLoanApproveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLoanApproveData.fulfilled, (state) => {
        state.loading = false;
        state.addLoanapprovalData =
          loanApprovalInitialState.addLoanapprovalData;
        toast.success("Added Successfully");
      })
      .addCase(addLoanApproveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateLoanApproveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLoanApproveData.fulfilled, (state) => {
        state.loading = false;
        state.addLoanapprovalData =
          loanApprovalInitialState.addLoanapprovalData;
        toast.success("Saved Successfully");
      })
      .addCase(updateLoanApproveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setAddLoanapprovalData,
  handleAddRolesInput,
  handleDeleteRolesInput,
  handleLoanapprovalData,
  handleAddRolesInputExisting,
  handleDeleteRolesInputExisting,
  handleDeleteApprover,
} = loanApprovalSlice.actions;
export default loanApprovalSlice.reducer;
