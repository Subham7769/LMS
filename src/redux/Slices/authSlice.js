import { createSlice } from "@reduxjs/toolkit";

const initialUserData = JSON.parse(localStorage.getItem("userData")) || {};

// Initial state
const initialState = {
  userData: initialUserData,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    setUserData: (state, action) => {
      console.log(action.payload);
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
  },
});

export const { setLoading, setError, setUserData } = authSlice.actions;
export default authSlice.reducer;
