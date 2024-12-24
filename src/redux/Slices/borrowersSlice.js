import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Register a Borrower
export const registerBorrower = createAsyncThunk(
  "borrowers/register", // action type
  async (addBorrowerData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BORROWERS_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(addBorrowerData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register borrower");
      }

      const data = await response.json();
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Fetch All Borrowers
export const fetchAllBorrowers = createAsyncThunk(
  "borrowers/fetchAll", // action type
  async ({ page = 0, size = 12 }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-dev.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/all?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch borrowers");
      }

      const data = await response.json();
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

const initialState = {
  addBorrowerData: {
    personalDetails: {
      title: "",
      surname: "",
      otherName: "", //optional
      uniqueIDType: "",
      uniqueID: "",
      gender: "",
      maritalStatus: "",
      nationality: "Zambia",
      dateOfBirth: "",
      placeOfBirth: "",
      loanOfficer: localStorage.getItem("username"),
    },
    contactDetails: {
      mobile1: "",
      mobile2: "", //optional
      landlinePhone: "", //optional
      houseNumber: "", //optional
      street: "",
      residentialArea: "",
      country: "Zambia",
      province: "", //optional
      district: "", //optional
      email: "",
      postBox: "", //optional
    },
    employmentDetails: {
      employer: "",
      occupation: "",
      employmentDistrict: "", //optional
      employmentLocation: "",
      workStartDate: "",
      workPhoneNumber: "", //optional
      workPhysicalAddress: "", //optional
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
      kinOtherName: "", //optional
      kinNrcNo: "",
      kinGender: "",
      kinMobile1: "",
      kinMobile2: "", //optional
      kinEmail: "",
      kinHouseNo: "", //optional
      kinStreet: "",
      kinResidentialArea: "",
      kinDistrict: "", //optional
      kinCountry: "",
      kinProvince: "", //optional
      kinEmployer: "",
      kinOccupation: "",
      kinLocation: "", //optional
      kinWorkPhoneNumber: "", //optional
    },
    otherDetails: {
      reasonForBorrowing: "", //optional
      sourceOfRepayment: "", //optional
      groupId: "",
      creditScore: "",
      freeCashInHand: "",
      grossSalary: "",
    },
  },
  allBorrowersData: [],
  borrowers: [],
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
    builder
      .addCase(registerBorrower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBorrower.fulfilled, (state, action) => {
        state.loading = false;
        // state.borrower = action.payload; // Store the borrower data
        toast.success("Borrower Registered Successfully");
      })
      .addCase(registerBorrower.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
      })
      .addCase(fetchAllBorrowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // Extract all borrowerProfiles from the content array
        const borrowers = action.payload.content.map(
          (item) => item.borrowerProfile
        );

        // Update state with the borrowers array
        state.allBorrowersData = action.payload.content;
        state.error = null;
      })
      .addCase(fetchAllBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { updateBorrowerField, resetBorrowerData } =
  borrowersSlice.actions;

export default borrowersSlice.reducer;
