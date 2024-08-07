import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './Slices/sidebarSlice';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export default store;
