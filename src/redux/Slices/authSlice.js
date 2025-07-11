import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchAppConfigData } from "./appConfigSlice";

// AsyncThunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      };

      const response = await fetch(
        `${import.meta.env.VITE_LOGIN}`,
        requestOptions
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }
      
      const data = await response.json();
      const token = data.token ? data.token.replace("Bearer ", "") : null; // Ensure token exists in the response

      return { token, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialUserData = JSON.parse(localStorage.getItem("userData")) || {};

// Initial state
const initialState = {
  isSignup: "Login",
  username: "",
  roleName: localStorage.getItem("roleName") || null,
  password: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
  buttonText: "Login",
  userData: initialUserData,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: !!localStorage.getItem("authToken"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsSignup: (state, action) => {
      state.isSignup = action.payload;
    },
    updateDataField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    resetError: (state, action) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setButtonText: (state, action) => {
      state.buttonText = action.payload;
    },
    logout: (state) => {
      console.log("User is being logged out!");
      state.userData = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      localStorage.removeItem("roleName");
      localStorage.removeItem("username");
    },
    setRole: (state, action) => {
      console.log(action.payload);
      state.roleName = action.payload;
      state.userData.roles[0].name = action.payload;
      localStorage.setItem("roleName", action.payload); // Persist role in localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.data;
        state.token = action.payload.token;
        state.isAuthenticated = true;

        // Store in localStorage
        localStorage.setItem("userData", JSON.stringify(action.payload.data));
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("roleName", action.payload.data?.roles[0]?.name);
        localStorage.setItem("username", action.payload?.data?.username);

        // Welcome Toast
        toast(`Welcome ${action.payload?.data?.username}`);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
        toast.error(`Failed to login: ${action.payload}`);
      });
  },
});

export const {
  setIsSignup,
  updateDataField,
  setButtonText,
  setError,
  resetError,
  logout,
  setRole,
} = authSlice.actions;
export default authSlice.reducer;
