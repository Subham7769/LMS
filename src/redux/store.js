// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slices/sidebarSlice";
import recoverySlice from "./Slices/recoverySlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    recovery: recoverySlice,
  },
});

export default store;
