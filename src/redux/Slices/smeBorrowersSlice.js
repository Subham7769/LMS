import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Register a Borrower
export const registerBorrower = createAsyncThunk(
  "borrowers/register", // action type
  async (addCompanyData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_BORROWERS_CREATE_COMPANY_BORROWER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(addCompanyData),
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
export const fetchAllCompanyBorrowers = createAsyncThunk(
  "borrowers/fetchAll", // action type
  async ({ page = 0, size = 12 }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_READ_ALL_COMPANY_BORROWER
        }?page=${page}&size=${size}`,
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
          import.meta.env.VITE_BORROWERS_CHANGE_STATUS_COMPANY_BORROWER
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
        `${import.meta.env.VITE_BORROWERS_UPDATE_COMPANY_BORROWER}${uid}`,
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
  addCompanyData: {
    companyDetails: {
      companyName: "",
      companyShortName: "",
      natureOfCompany: "", 
      companyRegistrationNo: "",
      countryOfRegistration: "Zambia",
      dateOfIncorporation: "",
      province: "",
      locationOfHQ: "",
      industry: "",
      natureOfBusiness: "",
      numberOfPermanentEmployees: "", 
    },
    companyContactDetails: {
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
    bankDetails: {
      bankName: "",
      accountName: "",
      accountType: "",
      branch: "",
      branchCode: "",
      sortCode: "",
      accountNo: "",
    },
    companyOtherDetails: {
      creditScore: "",
      customerPhotoId: "",//optional
      freeCashInHand: "",
      grossSalary: "",
      groupId: "",
      reasonForBorrowing: "",
      shareholdersCountryOfResidence: [],
      shareholdersNames: [],
      shareholdingStructure: "",
      sourceOfRepayment: "",
      tradeUnion: "",//optional
    },
    directorsKycDetails: [
      {
        bankDetails: {
          accountName: "",
          accountNo: "",
          accountType: "",
          bankName: "",
          branch: "",
          branchCode: "",
          sortCode: "",
        },
        contactDetails: {
          country: "",
          district: "",
          email: "",
          houseNumber: "",
          landlinePhone: "",
          mobile1: "",
          mobile2: "",
          postBox: "",
          province: "",
          residentialArea: "",
          street: "",
        },
        employmentDetails: {
          employeeNo: "",
          employer: "",
          employmentDistrict: "",
          employmentLocation: "",
          occupation: "",
          workPhoneNumber: "",
          workPhysicalAddress: "",
          workStartDate: "",
          workType: "",
        },
        nextOfKinDetails: {
          kinCountry: "",
          kinDistrict: "",
          kinEmail: "",
          kinEmployer: "",
          kinGender: "",
          kinHouseNo: "",
          kinLocation: "",
          kinMobile1: "",
          kinMobile2: "",
          kinNrcNo: "",
          kinOccupation: "",
          kinOtherName: "",
          kinProvince: "",
          kinResidentialArea: "",
          kinStreet: "",
          kinSurname: "",
          kinTitle: "",
          kinWorkPhoneNumber: "",
        },
        otherDetails: {
          customerPhotoId: "",
          shareholdersCountryOfResidence: [],
          shareholdersNames: [],
          shareholdingStructure: "",
        },
        personalDetails: {
          age: 0,
          dateOfBirth: "",
          firstName: "",
          gender: "",
          loanOfficer: "",
          maritalStatus: "",
          nationality: "",
          otherName: "",
          placeOfBirth: "",
          surname: "",
          title: "",
          uniqueID: "",
          uniqueIDType: "",
        },
      },
      
    ],
  },
  newDirector:{
    bankDetails: {
      accountName: "",
      accountNo: "",
      accountType: "",
      bankName: "",
      branch: "",
      branchCode: "",
      sortCode: "",
    },
    contactDetails: {
      country: "",
      district: "",
      email: "",
      houseNumber: "",
      landlinePhone: "",
      mobile1: "",
      mobile2: "",
      postBox: "",
      province: "",
      residentialArea: "",
      street: "",
    },
    employmentDetails: {
      employeeNo: "",
      employer: "",
      employmentDistrict: "",
      employmentLocation: "",
      occupation: "",
      workPhoneNumber: "",
      workPhysicalAddress: "",
      workStartDate: "",
      workType: "",
    },
    nextOfKinDetails: {
      kinCountry: "",
      kinDistrict: "",
      kinEmail: "",
      kinEmployer: "",
      kinGender: "",
      kinHouseNo: "",
      kinLocation: "",
      kinMobile1: "",
      kinMobile2: "",
      kinNrcNo: "",
      kinOccupation: "",
      kinOtherName: "",
      kinProvince: "",
      kinResidentialArea: "",
      kinStreet: "",
      kinSurname: "",
      kinTitle: "",
      kinWorkPhoneNumber: "",
    },
    otherDetails: {
      customerPhotoId: "",
      shareholdersCountryOfResidence: [],
      shareholdersNames: [],
      shareholdingStructure: "",
    },
    personalDetails: {
      age: 0,
      dateOfBirth: "",
      firstName: "",
      gender: "",
      loanOfficer: "",
      maritalStatus: "",
      nationality: "",
      otherName: "",
      placeOfBirth: "",
      surname: "",
      title: "",
      uniqueID: "",
      uniqueIDType: "",
    },
  },
  allBorrowersData: [],
  updateBorrowerData: {},
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "smeBorrowers",
  initialState,
  reducers: {
    updateAddCompanyField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.addCompanyData[section]) {
        state.addCompanyData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in addCompanyData
        state.addCompanyData[field] = type === "checkbox" ? checked : value;
      }
    },
    resetCompanyData: (state, action) => {
      state.addCompanyData = initialState.addCompanyData;
    },
    updateCompanyUpdateField: (state, action) => {
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
    setUpdateCompany: (state, action) => {
      const { uid } = action.payload;
      const borrower = state.allBorrowersData.find((item) => item.uid === uid);
      if (borrower) {
        state.updateBorrowerData = borrower.borrowerProfile;
      } else {
        state.updateBorrowerData = null; // Reset if no match found
      }
    },
    resetUpdateCompanyData: (state, action) => {
      state.updateBorrowerData = initialState.updateBorrowerData;
    },
    addDirector:(state,action)=>{
      state.addCompanyData.directorsKycDetails.push(state.newDirector);
      toast.success("Director Added Successfully");
    },
    removeDirector:(state,action)=>{
      const {index} = action.payload;
        state.addCompanyData.directorsKycDetails.splice(index, 1);
        toast.error("Director Removed Successfully");
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
      .addCase(fetchAllCompanyBorrowers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCompanyBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with the borrowers array
        state.allBorrowersData = action.payload.content;
        state.error = null;
      })
      .addCase(fetchAllCompanyBorrowers.rejected, (state, action) => {
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
  updateAddCompanyField,
  resetCompanyData,
  updateCompanyUpdateField,
  setUpdateCompany,
  resetUpdateCompanyData,
  addDirector,
  removeDirector,
} = borrowersSlice.actions;

export default borrowersSlice.reducer;
