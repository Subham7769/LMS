import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  addBorrowerData: {
    personalDetails: {
      title: "",
      surname: "",
      otherName: "",
      uniqueIDType: "",
      uniqueID: "",
      gender: "",
      maritalStatus: "",
      nationality: "",
      dateOfBirth: "",
      placeOfBirth: "",
      loanOfficer: localStorage.getItem("username"),
    },
    contactDetails: {
      mobile1: "",
      mobile2: "",
      landlinePhone: "",
      houseNumber: "",
      street: "",
      residentialArea: "",
      country: "",
      province: "",
      district: "",
      email: "",
      postBox: "",
    },
    employmentDetails: {
      employer: "",
      occupation: "",
      employmentDistrict: "",
      employmentLocation: "",
      workStartDate: "",
      workPhoneNumber: "",
      workPhysicalAddress: "",
      employeeNo: "",
      workType: "",
    },
    bankDetails: {
      bankName: "",
      accountName: "",
      accountType: "",
      branch: "",
      branchCode: "",
      sortCode: "",
      accountNo: "",
    },
    nextOfKinDetails: {
      kinTitle: "",
      kinSurname: "",
      kinOtherName: "",
      kinNrcNo: "",
      kinGender: "",
      kinMobile1: "",
      kinMobile2: "",
      kinEmail: "",
      kinHouseNo: "",
      kinStreet: "",
      kinResidentialArea: "",
      kinDistrict: "",
      kinCountry: "",
      kinProvince: "",
      kinEmployer: "",
      kinOccupation: "",
      kinLocation: "",
      kinWorkPhoneNumber: "",
    },
    otherDetails: {
      reasonForBorrowing: "",
      sourceOfRepayment: "",
      groupId: "",
      creditScore: 0,
      freeCashInHand:0,
      grossSalary:0
    },
  },
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "borrowers",
  initialState,
  reducers: {
    updateBorrowerField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.addBorrowerData[section]) {
        state.addBorrowerData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in addBorrowerData
        state.addBorrowerData[field] = type === "checkbox" ? checked : value;
      }
    },
    resetBorrowerData: (state) => {
      state.addBorrowerData = initialState.addBorrowerData;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const { updateBorrowerField, resetBorrowerData } =
  borrowersSlice.actions;

export default borrowersSlice.reducer;
