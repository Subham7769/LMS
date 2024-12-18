import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

      const authToken = response.headers.get("Authorization");
      const token = authToken ? authToken.replace("Bearer ", "") : null;
      const data = await response.json();
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
      state.userData = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
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
        localStorage.setItem("roleName", action.payload?.data?.roles[0]?.name);

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
} = authSlice.actions;
export default authSlice.reducer;
