import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { fetchProductData } from "./sidebarSlice";

// AsyncThunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_NOTIFICATION_REQUEST_READ}`,
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
      const notificationData = await response.json();
      return notificationData;
    } catch (error) {
      // Handle and return error
      return rejectWithValue(error.message);
    }
  }
);

export const updateNotificationStatus = createAsyncThunk(
  "notifications/updateNotificationStatus",
  async (notificationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_NOTIFICATION_UPDATE_STATUS
        }${notificationId}/notificationStatus/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
      return notificationId;
    } catch (error) {
      // Handle and return error
      return rejectWithValue(error.message);
    }
  }
);

export const updateNotificationRequest = createAsyncThunk(
  "notifications/updateNotificationRequest",
  async ({ updatedNotification, decision }, { rejectWithValue, dispatch }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_NOTIFICATION_APPROVE_REQUEST}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedNotification),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
      dispatch(fetchNotifications());
      dispatch(fetchProductData());
      return decision;
    } catch (error) {
      // Handle and return error
      return rejectWithValue(error.message);
    }
  }
);

const notificationInitialState = {
  notifications: [],
  loading: false,
  error: null,
  updateMap: {},
  updateFields: [],
  isValid: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationInitialState,
  reducers: {
    addUpdateFields: (state, action) => {
      const { inputName } = action.payload;
      state.updateFields.push(inputName);
      state.updateMap[inputName] = false; // Set all updateFields to false initially
    },
    setUpdateMap: (state, action) => {
      const inputName = action.payload;
      state.updateMap = {
        ...state.updateMap,
        [inputName]: true,
      };
    },
    clearUpdateMap: (state, action) => {
      state.updateMap = {};
      state.updateFields = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateNotificationStatus.pending, (state) => {
        // state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(updateNotificationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.map(
          (notification) =>
            notification.notificationId === action.payload
              ? { ...notification, notificationStatus: "read" } // Update status to "read"
              : notification // Keep other notifications unchanged
        );
      })
      .addCase(updateNotificationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(updateNotificationRequest.pending, (state) => {
        // state.loading = true;
        state.error = null; // Clear previous error
      })
      .addCase(updateNotificationRequest.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "APPROVED") {
          toast.success("Request Approved!");
        } else {
          toast.warn("Request Rejected!");
        }
      })
      .addCase(updateNotificationRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      });
  },
});

export const { addUpdateFields, setUpdateMap, clearUpdateMap } =
  notificationSlice.actions;
export default notificationSlice.reducer;
