import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';


// AsyncThunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        'https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/change-requests-notification/by-status/CREATED',
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // Assuming the response data is directly assignable to notifications
    } catch (error) {
      // Handle and return error
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



const notificationInitialState = {
  notifications:[],
  loading:false,
  error:null,
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
        console.log(action.payload)
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addUpdateFields, setUpdateMap, clearUpdateMap } =
  notificationSlice.actions;
export default notificationSlice.reducer;
