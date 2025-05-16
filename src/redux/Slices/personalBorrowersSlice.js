import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Fetch Drafted Borrowers
export const fetchDraftedPersonalBorrowers = createAsyncThunk(
  "borrowers/fetchDraftedPersonalBorrowers", // Action type
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_GET_DRAFT_COMPANY_BORROWER
        }?type=PERSONAL_BORROWER&page=${page}&size=${size}`,
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
          errorData.message || "Failed to fetch drafted company borrowers"
        );
      }

      const data = await response.json();
      return data; // Returning the fetched data as payload
    } catch (error) {
      return rejectWithValue(error.message); // Handling errors
    }
  }
);

export const getDraftBorrowerByID = createAsyncThunk(
  "borrowers/getDraftBorrowerByID", // Action type
  async (borrowerProfileDraftId, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_GET_DRAFT_BORROWER_BY_ID
        }${borrowerProfileDraftId}`,
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
          errorData.message || "Failed to fetch drafted borrowers"
        );
      }

      const data = await response.json();
      return data; // Returning the fetched data as payload
    } catch (error) {
      return rejectWithValue(error.message); // Handling errors
    }
  }
);

// Fetch Drafted Borrower By Field
export const fetchDraftedBorrowerByField = createAsyncThunk(
  "borrowers/fetchDraftedBorrowerByField", // action type
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_READ_ALL_DRAFT_BY_FIELD_NAME_COMPANY_BORROWER
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
        return rejectWithValue(errorData.message || "Failed to fetch");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Async thunk to update borrower status
export const updateDraftBorrowerStatus = createAsyncThunk(
  "borrowers/updateDraftBorrowerStatus",
  async ({ borrowerProfileDraftId, status }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_UPDATE_DRAFT_COMPANY_BORROWER
        }${borrowerProfileDraftId}/status?status=${status}`,
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
          errorData.message || "Failed to update borrower status"
        );
      }

      return { borrowerProfileDraftId, status }; // Returning the updated data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Register a Borrower
export const registerBorrower = createAsyncThunk(
  "borrowers/register", // action type
  async (addBorrowerData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_CREATE_PERSONAL_BORROWER}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(addBorrowerData),
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
export const fetchAllBorrowers = createAsyncThunk(
  "borrowers/fetchAllBorrowers", // action type
  async ({ page = 0, size = 12 }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_READ_ALL_BY_LOAN_OFFICER_PERSONAL_BORROWER
        }${username}?page=${page}&size=${size}`,
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

export const fetchAllBorrowersByType = createAsyncThunk(
  "borrowers/fetchAllBorrowersByType", // action type
  async ({ page = 0, size = 12, borrowerType }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_READ_ALL_COMPANY_BORROWER_ALL_BY_TYPE
        }${borrowerType}?page=${page}&size=${size}`,
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

export const fetchBorrowerInfo = createAsyncThunk(
  "borrowers/fetchBorrowerInfo", // action type
  async (uid, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_READ_INFO_PERSONAL_BORROWER}${uid}`,
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

export const viewPhoto = createAsyncThunk(
  "borrowers/viewPhoto",
  async (filePreviewParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId } = filePreviewParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_PREVIEW_PERSONAL}${docId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to preview");
      }

      const data = await response.json();

      return {
        base64Content: data.base64Content,
        contentType: data.contentType, // Example: "image/jpeg"
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Borrower By Field
export const fetchBorrowerByField = createAsyncThunk(
  "borrowers/fetchBorrowerByField", // action type
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_READ_ALL_BY_FIELD_NAME_PERSONAL_BORROWER
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

// Change Borrower Status
export const changeBorrowerStatus = createAsyncThunk(
  "borrowers/changeStatus", // Action type
  async ({ uid, newStatus }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_CHANGE_STATUS_PERSONAL_BORROWER
        }${uid}/status/${newStatus}`,
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
  "borrowers/updateBorrowerInfo", // Action type
  async ({ borrowerData, uid }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_UPDATE_PERSONAL_BORROWER}${uid}`,
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

export const uploadBorrowerPhotoFile = createAsyncThunk(
  "borrowers/uploadBorrowerPhotoFile",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_UPLOAD_PHOTO_PERSONAL_BORROWER}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to upload");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const draftBorrowerInfo = createAsyncThunk(
  "borrowers/draftBorrowerInfo", // action type
  async (addDraftBorrowerData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_CREATE_DRAFT_PERSONAL_BORROWER}`, //.env line no 331
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(addDraftBorrowerData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to register borrower");
      }
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

const initialState = {
  draftedBorrowerData: [],
  draftedBorrowerDataTotalElements: 0,
  addBorrowerData: {
    personalDetails: {
      title: "",
      firstName: "",
      surname: "",
      otherName: "", //optional
      uniqueIDType: "",
      uniqueID: "",
      gender: "",
      maritalStatus: "",
      nationality: "Zambia",
      dateOfBirth: "",
      placeOfBirth: "",
      loanOfficer: "",
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
      ministry: "",
    },
    incomeOnPaySlip: {
      basicPay: "",
      housingAllowance: "",
      transportAllowance: "",
      ruralHardshipAllowance: "",
      infectiousHealthRisk: "",
      healthShiftAllowance: "",
      interfaceAllowance: "",
      responsibilityAllowance: "",
      doubleClassAllowance: "",
      actingAllowance: "",
      otherAllowances: "",
    },
    deductionOnPaySlip: {
      totalDeductionsOnPayslip: "",
      totalDeductionsNotOnPayslip: "",
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
      kinRelationship: "",
      kinMobile1: "",
      kinMobile2: "", //optional
      kinEmail: "",
      kinHouseNo: "", //optional
      kinStreet: "",
      kinResidentialArea: "",
      kinDistrict: "", //optional
      kinCountry: "Zambia",
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
      customerPhotoId: "",
    },
  },
  allBorrowersData: [],
  allBorrowersTotalElements: 0,
  updateBorrowerData: [],
  error: null,
  loading: false,
};

const borrowersSlice = createSlice({
  name: "personalBorrowers",
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
    resetBorrowerFile: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      if (section && state.addBorrowerData[section]) {
        state.addBorrowerData[section][field] =
          type === "checkbox" ? checked : value;
      }
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
    setUpdateDraftBorrower: (state, action) => {
      const { borrowerProfileDraftId } = action.payload;
      const borrower = state.draftedBorrowerData.find(
        (item) => item.borrowerProfileDraftId === borrowerProfileDraftId
      );
      if (borrower) {
        console.log(borrower);
        state.updateBorrowerData = borrower.personalBorrowerProfileDraft;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDraftedPersonalBorrowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDraftedPersonalBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        state.draftedBorrowerData = action.payload.content;
        state.draftedBorrowerDataTotalElements = action.payload.totalElements;
      })
      .addCase(fetchDraftedPersonalBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch drafted personal borrowers.";
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
      })
      .addCase(getDraftBorrowerByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDraftBorrowerByID.fulfilled, (state, action) => {
        state.loading = false;
        state.addBorrowerData = action.payload.personalBorrowerProfileDraft;
      })
      .addCase(getDraftBorrowerByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchDraftedBorrowerByField.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchDraftedBorrowerByField.fulfilled, (state, action) => {
        state.loading = false;
        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.draftedBorrowerData = payload;
        // hide the pagination
        state.draftedBorrowerDataTotalElements = 0;
      })
      .addCase(fetchDraftedBorrowerByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateDraftBorrowerStatus.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateDraftBorrowerStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast(`Draft Status updated!`);
      })
      .addCase(updateDraftBorrowerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(registerBorrower.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerBorrower.fulfilled, (state, action) => {
        state.loading = false;
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
        state.allBorrowersTotalElements = action.payload.totalElements;
        state.error = null;
      })
      .addCase(fetchAllBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchAllBorrowersByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBorrowersByType.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with the borrowers array
        state.allBorrowersData = action.payload.content;
        state.allBorrowersTotalElements = action.payload.totalElements;
        state.error = null;
      })
      .addCase(fetchAllBorrowersByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchBorrowerInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBorrowerInfo.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with the borrowers array
        state.updateBorrowerData = action.payload.borrowerProfile;
        state.error = null;
      })
      .addCase(fetchBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(viewPhoto.pending, (state) => {
        state.loading = true;
      })
      .addCase(viewPhoto.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with the borrowers array
        state.error = null;
      })
      .addCase(viewPhoto.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchBorrowerByField.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchBorrowerByField.fulfilled, (state, action) => {
        state.loading = false;
        state.allBorrowersData = action.payload;
      })
      .addCase(fetchBorrowerByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
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
      })
      .addCase(uploadBorrowerPhotoFile.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadBorrowerPhotoFile.fulfilled, (state, action) => {
        state.loading = false;
        const { docId } = action.payload;
        console.log(docId);
        state.addBorrowerData.otherDetails.customerPhotoId = docId;
        if (state.updateBorrowerData?.otherDetails?.creditScore) {
          state.updateBorrowerData.otherDetails.customerPhotoId = docId;
        }
        toast.success("File uploaded successfully");
      })
      .addCase(uploadBorrowerPhotoFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(draftBorrowerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(draftBorrowerInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Draft Saved Successfully");
      })
      .addCase(draftBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
      });
  },
});

export const {
  updateAddBorrowerField,
  resetBorrowerData,
  updateBorrowerUpdateField,
  setUpdateBorrower,
  resetUpdateBorrowerData,
  setUpdateDraftBorrower,
  resetBorrowerFile,
} = borrowersSlice.actions;

export default borrowersSlice.reducer;
