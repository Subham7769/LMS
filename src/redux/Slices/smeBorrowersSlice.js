import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

// Register a Borrower
export const registerCompanyBorrower = createAsyncThunk(
  "borrowers/registerCompanyBorrower", // action type
  async (addCompanyData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_CREATE_COMPANY_BORROWER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(addCompanyData),
        }
      );

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
  "borrowers/fetchAllCompanyBorrowers", // action type
  async ({ page = 0, size = 12, loanOfficer }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_READ_ALL_COMPANY_BORROWER_ALL_BY_LOAN_OFFICER
        }${loanOfficer}?page=${page}&size=${size}`,
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

// Fetch All Company Borrowers by Loan Officer
export const fetchAllCompanyBorrowersListByLoanOfficer = createAsyncThunk(
  "borrowers/fetchAllCompanyBorrowersListByLoanOfficer", // action type
  async ({ loanOfficer = "superadmin" }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_READ_ALL_COMPANY_BORROWER_LIST_BY_LOAN_OFFICER
        }${loanOfficer}`,
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

// Get Company Details by companyUniqueId
export const fetchCompanyDetails = createAsyncThunk(
  "company/fetchCompanyDetails",
  async ({ companyId }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_GET_COMPANY_DETAILS_COMPANY_BORROWER
        }${companyId}`,
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
        throw new Error(errorData.message || "Failed to fetch company details");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Director Information
export const addDirectorInfo = createAsyncThunk(
  "borrowers/addDirectorInfo",
  async ({ directorsKycDetails, companyId }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_ADD_DIRECTOR_COMPANY_BORROWER
        }${companyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(directorsKycDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update borrower information"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add Shareholder Information
export const addShareholderInfo = createAsyncThunk(
  "borrowers/addShareholderInfo",
  async ({ shareHolderDetails, companyId }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_ADD_SHAREHOLDER_COMPANY_BORROWER
        }${companyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(shareHolderDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update borrower information"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding directors' KYC details
export const addDirectorsKycDetails = createAsyncThunk(
  "companyBorrowers/addDirectorsKycDetails",
  async ({ directorsKycDetails, companyId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_ADD_DIRECTOR_COMPANY_BORROWER
        }${companyId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(directorsKycDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to add directors KYC details"
        );
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Change Company Borrower Status
export const changeCompanyBorrowerStatus = createAsyncThunk(
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

// Fetch Borrower By Field
export const fetchCompanyBorrowerByField = createAsyncThunk(
  "borrowers/fetchCompanyBorrowerByField", // action type
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_READ_ALL_BY_FIELD_NAME_COMPANY_BORROWER
        }?fieldName=${field}&value=${value}`,
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
        throw new Error(
          errorData.message || "Failed to fetch borrower by field"
        );
      }

      const data = await response.json();
      const length = data.length;
      if (length < 1) {
        throw new Error("User not Found");
      }
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Update Company Borrower Information
export const updateCompanyBorrowerInfo = createAsyncThunk(
  "borrowers/updateCompanyBorrowerInfo", // Action type
  async ({ borrowerData, uid }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_UPDATE_COMPANY_DETAILS_COMPANY_BORROWER}${uid}`,
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
      companyRegistrationNo: "",
      companyShortName: "",
      companyUniqueId: "",
      countryOfRegistration: "Zambia",
      dateOfIncorporation: "",
      industry: "",
      loanOfficer: "",
      locationOfHQ: "",
      natureOfBusiness: "",
      natureOfCompany: "",
      numberOfPermanentEmployees: "",
      province: "",
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
      customerPhotoId: "", //optional
      freeCashInHand: "",
      grossSalary: "",
      groupId: "",
      reasonForBorrowing: "",
      shareholdingStructure: "",
      sourceOfRepayment: "",
      tradeUnion: "", //optional
    },
  },
  companyDetails: {},
  directorsKycDetails: [],
  shareHolderDetails: [],
  existingShareholderDetails: [],
  newDirector: {
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
  newShareHolder: {
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
  allCompanies: [],
  allBorrowersData: [],
  allBorrowersTotalElements: "",
  updateBorrowerData: {},
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "smeBorrowers",
  initialState,
  reducers: {
    // for Adding company
    handleChangeAddCompanyField: (state, action) => {
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
    // For Edit / Update UI
    handleChangeUpdateCompanyField: (state, action) => {
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
        console.log(borrower);
        const { shareHolderDetails, directorsKycDetails, ...rest } =
          borrower.companyBorrowerProfile;
        state.updateBorrowerData = rest;
      } else {
        state.updateBorrowerData = null; // Reset if no match found
      }
    },
    resetUpdateCompanyData: (state, action) => {
      state.updateBorrowerData = initialState.updateBorrowerData;
    },
    // for Director
    addDirector: (state, action) => {
      const { loanOfficer, index } = action.payload;
      state.directorsKycDetails.push({
        ...state.newDirector,
        personalDetails: {
          ...state.newDirector.personalDetails,
          loanOfficer: loanOfficer,
        },
      });
      if (index !== 0) {
        toast.success("Director Added Successfully");
      }
    },
    removeDirector: (state, action) => {
      const { index } = action.payload;
      state.directorsKycDetails.splice(index, 1);
      toast.error("Director Removed Successfully");
    },
    resetDirector: (state, action) => {
      const { index } = action.payload;
      state.directorsKycDetails[index] = { ...state.newDirector };
      toast.success("Director Reset Successfully");
    },
    handleChangeAddDirectorField: (state, action) => {
      const { section, index, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.directorsKycDetails[index][section]) {
        state.directorsKycDetails[index][section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in directorsKycDetails
        state.directorsKycDetails[index][field] =
          type === "checkbox" ? checked : value;
      }
    },
    // for Shareholder
    addShareholder: (state, action) => {
      const { loanOfficer } = action.payload;
      if (state.shareHolderDetails.length < 1) {
        state.shareHolderDetails.push({
          ...state.newShareHolder,
          personalDetails: {
            ...state.newShareHolder.personalDetails,
            loanOfficer: loanOfficer,
          },
        });
      }
    },
    removeShareholder: (state, action) => {
      const { index } = action.payload;
      state.shareHolderDetails.splice(index, 1);
    },
    resetShareholder: (state, action) => {
      const { index } = action.payload;
      state.shareHolderDetails[index] = { ...state.newShareHolder };
      toast.success("Shareholder Reset Successfully");
    },
    handleChangeAddShareholderField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.shareHolderDetails[0][section]) {
        state.shareHolderDetails[0][section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in shareHolderDetails
        state.shareHolderDetails[0][field] =
          type === "checkbox" ? checked : value;
      }
    },
    handleChangeUpdateShareholderField: (state, action) => {
      const { section, index, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.existingShareholderDetails[index][section]) {
        state.existingShareholderDetails[index][section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in existingShareholderDetails
        state.existingShareholderDetails[index][field] =
          type === "checkbox" ? checked : value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompanyBorrower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerCompanyBorrower.fulfilled, (state, action) => {
        state.loading = false;
        // state.borrower = action.payload; // Store the borrower data
        toast.success("Borrower Registered Successfully");
      })
      .addCase(registerCompanyBorrower.rejected, (state, action) => {
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
      .addCase(fetchAllCompanyBorrowersListByLoanOfficer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCompanyBorrowersListByLoanOfficer.fulfilled,
        (state, action) => {
          state.loading = false;
          state.allCompanies = action.payload.map((company) => ({
            label: company.companyBorrowerProfile.companyDetails.companyName,
            value: company.uid,
          }));
        }
      )
      .addCase(
        fetchAllCompanyBorrowersListByLoanOfficer.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch borrowers";
          toast.error(`API Error : ${action.payload}`);
        }
      )
      .addCase(changeCompanyBorrowerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeCompanyBorrowerStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Borrower Status Changed Successfully");
      })
      .addCase(changeCompanyBorrowerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetails = action.payload;
        state.existingShareholderDetails =
          action.payload.shareHolderDetails.map((shareHolder) => ({
            ...shareHolder,
            dataIndex: nanoid(),
          }));
        state.error = null;
      })
      .addCase(fetchCompanyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch company details";
      })
      .addCase(addDirectorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDirectorInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Director Information Added Successfully");
      })
      .addCase(addDirectorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addShareholderInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addShareholderInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Shareholder Information Added Successfully");
      })
      .addCase(addShareholderInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(addDirectorsKycDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDirectorsKycDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Director Added Successfully");
      })
      .addCase(addDirectorsKycDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add directors KYC details.";
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchCompanyBorrowerByField.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchCompanyBorrowerByField.fulfilled, (state, action) => {
        state.loading = false;
        state.allBorrowersData = action.payload;
      })
      .addCase(fetchCompanyBorrowerByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateCompanyBorrowerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompanyBorrowerInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Borrower Information Updated Successfully");
      })
      .addCase(updateCompanyBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  handleChangeAddCompanyField,
  resetCompanyData,
  handleChangeUpdateCompanyField,
  setUpdateCompany,
  resetUpdateCompanyData,
  addDirector,
  removeDirector,
  resetDirector,
  handleChangeAddDirectorField,
  addShareholder,
  removeShareholder,
  resetShareholder,
  handleChangeAddShareholderField,
  handleChangeUpdateShareholderField,
} = borrowersSlice.actions;

export default borrowersSlice.reducer;
