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
        `${import.meta.env.VITE_BORROWERS_READ_ALL_PERSONAL_BORROWER}?page=${page}&size=${size}`,
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

// Change Borrower Status
export const changeBorrowerStatus = createAsyncThunk(
  "borrowers/changeStatus", // Action type
  async ({ uid, newStatus }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_CHANGE_STATUS
        }/${uid}/status/${newStatus}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to change borrower status"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Update Borrower Information
export const updateBorrowerInfo = createAsyncThunk(
  "borrowers/updateInfo", // Action type
  async ({ borrowerData, uid }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_UPDATE_ENDPOINT}${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(borrowerData), // Send updated borrower data
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update borrower information"
        );
      }

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
  updateBorrowerData: {},
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "borrowers",
  initialState,
  reducers: {
    updateAddBorrowerField: (state, action) => {
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
    resetBorrowerData: (state, action) => {
      state.addBorrowerData = initialState.addBorrowerData;
    },
    updateBorrowerUpdateField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.updateBorrowerData[section]) {
        state.updateBorrowerData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in updateBorrowerData
        state.updateBorrowerData[field] = type === "checkbox" ? checked : value;
      }
    },
    setUpdateBorrower: (state, action) => {
      const { uid } = action.payload;
      const borrower = state.allBorrowersData.find((item) => item.uid === uid);
      if (borrower) {
        state.updateBorrowerData = borrower.borrowerProfile;
      } else {
        state.updateBorrowerData = null; // Reset if no match found
      }
    },
    resetUpdateBorrowerData: (state, action) => {
      state.updateBorrowerData = initialState.updateBorrowerData;
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
        // Update state with the borrowers array
        state.allBorrowersData = action.payload.content;
        state.error = null;
      })
      .addCase(fetchAllBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(changeBorrowerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeBorrowerStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Borrower Status Changed Successfully");
      })
      .addCase(changeBorrowerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateBorrowerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBorrowerInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Borrower Information Updated Successfully");
      })
      .addCase(updateBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  updateAddBorrowerField,
  resetBorrowerData,
  updateBorrowerUpdateField,
  setUpdateBorrower,
  resetUpdateBorrowerData,
} = borrowersSlice.actions;

export default borrowersSlice.reducer;
