import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Async thunk for fetching user data
export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_USER_READ}?limit=${size}&offset=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get users");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching role data
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_USER_ROLES_READ}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get roles");
      }
      const data = await response.json();
      const formattedRoleData = data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      dispatch(fetchUsers({ page: 0, size: 10 }));
      return formattedRoleData;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for activating a user
export const activateUser = createAsyncThunk(
  "userManagement/activateUser",
  async (userName, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_USER_ACTIVATE_USER}${userName}/activate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to activate user");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for generating a new password
export const generatePassword = createAsyncThunk(
  "userManagement/generatePassword",
  async (userName, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_USER_GENERATE_PASSWORD
        }${userName}/generate_password`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to generate password"
        );
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Thunk for deleting a user
export const deleteUser = createAsyncThunk(
  "userManagement/deleteUser",
  async (userName, { rejectWithValue, dispatch }) => {
    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_USER_DELETE}${userName}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete user");
      }
      dispatch(fetchUsers({ page: 0, size: 10 })); // Fetch the updated user list after deletion
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for suspending a user
export const suspendUser = createAsyncThunk(
  "userManagement/suspendUser",
  async ({ userName, reason }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_USER_SUSPEND}${userName}/suspend/${reason}`,
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
        return rejectWithValue(errorData.message || "Failed to suspend user");
      }
      dispatch(fetchUsers({ page: 0, size: 10 })); // Refresh the user list after suspension
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for creating a new user
export const createUser = createAsyncThunk(
  "userManagement/createUser",
  async ({ formData, userRole }, { rejectWithValue, dispatch }) => {
    const selectedRoles = [
      {
        id: userRole.target.value,
        name: userRole.target.label,
      },
    ];

    const postData = {
      active: true,
      email: formData.email,
      firstname: formData.firstname,
      lastname: formData.lastname,
      password: formData.password,
      roles: selectedRoles,
      username: formData.username,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_USER_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create user");
      }

      dispatch(fetchUsers({ page: 0, size: 10 })); // Refresh user list after creation
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for updating user data
export const updateUser = createAsyncThunk(
  "userManagement/updateUser",
  async (
    { userDetails, formData, userRole },
    { rejectWithValue, dispatch }
  ) => {
    const selectedRoles = [
      {
        id: userRole.target.value,
        name: userRole.target.label,
      },
    ];

    const postData = {
      active: true,
      email: formData.email,
      firstname: formData.firstname,
      lastname: formData.lastname,
      password: formData.password,
      roles: selectedRoles,
      username: formData.username,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_USER_UPDATE}${userDetails.username}/edit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update user");
      }
      dispatch(fetchUsers({ page: 0, size: 10 }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    roleData: [],
    allUsersInfo: [],
    allUsersInfoTotalElements: 0,
    loading: false,
    error: null,
    selectedUserData: null,
    isModalOpen: false,
    formData: {
      active: true,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      roles: [],
      username: "",
    },
    confirmPassword: "",
    userRole: [],
  },
  reducers: {
    setSelectedUserData: (state, action) => {
      state.selectedUserData = action.payload;
    },
    setIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    clearFormData: (state) => {
      state.formData = {
        active: true,
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        roles: [],
        username: "",
      };
      state.confirmPassword = "";
      state.userRole = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roleData = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersInfo = action.payload.content;
        state.allUsersInfoTotalElements = action.payload.totalElements;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error 123 : ${action.payload}`);
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        toast("User Deleted Successfully");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(suspendUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(suspendUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("User Suspended Successfully");
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("User Updated Successfully");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(activateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("User Activated Successfully");
      })
      .addCase(activateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(generatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePassword.fulfilled, (state) => {
        state.loading = false;
        toast.success("New Password Generated Successfully");
      })
      .addCase(generatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state) => {
        toast.success("User Created successfully");
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setSelectedUserData,
  setIsModalOpen,
  setFormData,
  setConfirmPassword,
  setUserRole,
  clearFormData,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
