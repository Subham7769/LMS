import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  toast } from "react-toastify"

// Async thunk for fetching user data
export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_USER_READ}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching role data
export const fetchRoles = createAsyncThunk(
  "roles/fetchRoles",
  async (_, { rejectWithValue,dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `${import.meta.env.VITE_USER_ROLES_READ}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedRoleData = response.data.map(({ id, name }) => ({
        label: name,
        value: id,
      }));
      dispatch(fetchUsers());
      return formattedRoleData.filter((item) => item.label !== "ROLE_SUPERADMIN");
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
        return rejectWithValue(errorData.message);
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
        return rejectWithValue(errorData);
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
        if (response.status === 401 || response.status === 403) {
          localStorage.clear();
          window.location.href = "/login"; // Redirect to login page
          return;
        }
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      dispatch(fetchUsers()); // Fetch the updated user list after deletion
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
        return rejectWithValue(errorData.message);
      }
      dispatch(fetchUsers()); // Refresh the user list after suspension
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk for creating a new user
export const createUser = createAsyncThunk(
  "userManagement/createUser",
  async ({ formData, userRole }, { rejectWithValue, dispatch }) => {
    const selectedRoles = userRole.map((item) => ({
      id: item.value,
      name: item.label,
    }));

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
        return rejectWithValue(errorData.message);
      }

      dispatch(fetchUsers()); // Refresh user list after creation
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
    const selectedRoles = userRole.map((item) => ({
      id: item.value,
      name: item.label,
    }));

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
        return rejectWithValue(errorData.message);
      }
      dispatch(fetchUsers());
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState: {
    roleData:[],
    allUsersInfo: [],
    loading: false,
    error: null,
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
    })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsersInfo = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
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
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
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
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
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
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
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
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
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
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
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
        state.error = action.error.message;
        toast.error(`Error : ${action.error.message}` )
      });
  },
});

export const {
  setIsModalOpen,
  setFormData,
  setConfirmPassword,
  setUserRole,
  clearFormData,
} = userManagementSlice.actions;

export default userManagementSlice.reducer;
