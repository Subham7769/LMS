// src/redux/slices/notificationTextSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch notification data
export const fetchNotificationData = createAsyncThunk(
  "notificationText/fetchNotificationData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_NOTIFICATIONS_READ}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to save notification data
export const saveNotificationData = createAsyncThunk(
  "notificationText/saveNotificationData",
  async (id, { getState, rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { inputList } = getState().notificationText;
    const item = inputList.find((item) => item.id === id);
    if (!item) {
      return rejectWithValue("Item not found");
    }

    const updatedItem = {
      notificationMessageEn: item.notificationMessageEn,
      notificationMessageAr: item.notificationMessageAr,
      notificationChannel: item.notificationChannel,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_NOTIFICATIONS_UPDATE}${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedItem),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // You can return this if you want to handle the result
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationTextSlice = createSlice({
  name: "notificationText",
  initialState: {
    inputList: [],
    loading: false,
    error: null,
  },
  reducers: {
    handleChange: (state, action) => {
      const { name, value, id } = action.payload;
      const list = [...state.inputList];
      const index = list.findIndex((item) => item.id === id);
      if (index !== -1) {
        list[index][name] = value;
      }
      state.inputList = list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotificationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotificationData.fulfilled, (state, action) => {
        state.loading = false;
        state.inputList = action.payload;
      })
      .addCase(fetchNotificationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveNotificationData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveNotificationData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveNotificationData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { handleChange } = notificationTextSlice.actions;

export default notificationTextSlice.reducer;
