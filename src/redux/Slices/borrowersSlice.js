import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  addBorrowerData: {
    title: "",
    firstName: "",
    lastName: "",
    uniqueNumberType: "",
    uniqueNumber: "",
    gender: "",
    maritalStatus:"",
    nationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    workingStatus: "",

    businessName: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    landlinePhone: "",
    creditScore: 0,
    description: "",
    borrowerPhotoId: "",
    groupId: "",
  },
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "borrowers",
  initialState,
  reducers: {
    updateBorrowerField: (state, action) => {
      const { name, value, type, checked } = action.payload;
      state.addBorrowerData[name] = type === "checkbox" ? checked : value;
    },
    resetBorrowerData: (state) => {
      state.addBorrowerData = initialState.addBorrowerData;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {updateBorrowerField,resetBorrowerData} = borrowersSlice.actions;

export default borrowersSlice.reducer;
