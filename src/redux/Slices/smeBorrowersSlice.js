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
  async (_, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_READ_ALL_COMPANY_BORROWER}`,
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
      console.log(data)
      return data; // This will be the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Fetch All Borrowers  by Loan Officer
export const fetchAllCompanyBorrowersByType = createAsyncThunk(
  "borrowers/fetchAllCompanyBorrowersByType", // action type
  async ({ page = 0, size = 12, borrowerType }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
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

// Fetch All Borrowers  by Loan Officer
export const fetchAllCompanyBorrowersByLoanOfficer = createAsyncThunk(
  "borrowers/fetchAllCompanyBorrowersByLoanOfficer", // action type
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
  async ({ UpdateCompanyData, uid }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_UPDATE_COMPANY_DETAILS_COMPANY_BORROWER
        }${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify({ ...UpdateCompanyData }), // Send updated borrower data
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

// Draft Company Borrower Information
export const draftCompanyBorrowerInfo = createAsyncThunk(
  "borrowers/draftCompanyBorrowerInfo", // action type
  async (addDraftCompanyData, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_CREATE_DRAFT_COMPANY_BORROWER}`, //.env line no 331
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(addDraftCompanyData),
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

// Fetch Drafted COmpanies
export const fetchDraftedCompanyBorrowers = createAsyncThunk(
  "borrowers/fetchDraftedCompanyBorrowers", // Action type
  async ({ page = 0, size = 10 }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_GET_DRAFT_COMPANY_BORROWER
        }?type=COMPANY_BORROWER&page=${page}&size=${size}`,
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

// Fetch Drafted Borrower By Field
export const fetchDraftedCompanyBorrowerByField = createAsyncThunk(
  "borrowers/fetchDraftedCompanyBorrowerByField", // action type
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

// Async thunk to update borrower status
export const updateDraftCompanyBorrowerStatus = createAsyncThunk(
  "borrowers/updateDraftCompanyBorrowerStatus",
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

// Update Director Information
export const updateDirectorInfo = createAsyncThunk(
  "borrowers/updateDirectorInfo", // Action type
  async ({ updateDirectorData, uid }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_UPDATE_DIRECTOR_DETAILS_COMPANY_BORROWER
        }${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify([{ ...updateDirectorData }]), // Send updated borrower data
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

// Update Shareholder Information
export const updateShareholderInfo = createAsyncThunk(
  "borrowers/updateShareholderInfo", // Action type
  async ({ updateShareholderData, uid }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_UPDATE_SHAREHOLDER_DETAILS_COMPANY_BORROWER
        }${uid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify([{ ...updateShareholderData }]), // Send updated borrower data
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

// Delete Director Information
export const deleteDirectorInfo = createAsyncThunk(
  "borrowers/deleteDirectorInfo", // Action type
  async ({ companyId, directorId }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_DELETE_DIRECTOR_DETAILS_COMPANY_BORROWER
        }${companyId}/directors-kyc/${directorId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to delete director information"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Delete Shareholder Information
export const deleteShareholderInfo = createAsyncThunk(
  "borrowers/deleteShareholderInfo", // Action type
  async ({ companyId, shareholderId }, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken"); // Retrieve the auth token
      const response = await fetch(
        `${
          import.meta.env
            .VITE_BORROWERS_DELETE_SHAREHOLDER_DETAILS_COMPANY_BORROWER
        }${companyId}/share-holder/${shareholderId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to delete shareholder information"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  }
);

// Change Borrower Status
export const changeCompanyBorrowerStatus = createAsyncThunk(
  "borrowers/changeCompanyBorrowerStatus", // Action type
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

// Upload Documents
export const uploadCompanyDocumentFile = createAsyncThunk(
  "borrowers/uploadCompanyDocumentFile",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("authToken");
      const {
        companyBorrowerId,
        documentKey,
        verified,
        borrowerType,
        authToken,
      } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_FILE_UPLOAD_COMPANY_BORROWER
        }?companyUniqueId=${companyBorrowerId}&documentKey=${documentKey}&verified=${verified}`,
        {
          method: "POST",
          headers: {
            Authorization: `${authToken}`,
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

export const uploadDirectorDocumentFile = createAsyncThunk(
  "borrowers/uploadDirectorDocumentFile",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem("authToken");
      const {
        companyBorrowerId,
        documentKey,
        verified,
        borrowerType,
        authToken,
        directorId,
      } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_BORROWERS_FILE_UPLOAD_COMPANY_BORROWER
        }?companyUniqueId=${companyBorrowerId}&directorId=${directorId}&documentKey=${documentKey}&verified=${verified}`,
        {
          method: "POST",
          headers: {
            Authorization: `${authToken}`,
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

// Delete Documents
export const deleteDocumentFile = createAsyncThunk(
  "borrowers/deleteDocumentFile",
  async (fileDeleteParams, { rejectWithValue }) => {
    // const token = localStorage.getItem("authToken");
    const { docId, authToken } = fileDeleteParams;
    const url = `${
      import.meta.env.VITE_BORROWERS_FILE_DELETE_COMPANY_BORROWER
    }${docId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Verify Document Information
export const verifyDocumentInfo = createAsyncThunk(
  "documents/verifyDocumentInfo",
  async ({ verifyDocumentData, auth }, { rejectWithValue }) => {
    try {
      // const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWERS_VERIFY_DOCUMENTS_COMPANY_BORROWER}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth}`,
          },
          body: JSON.stringify(verifyDocumentData),
        }
      );

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to verify document information"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch Company Documents
export const fetchCompanyDocuments = createAsyncThunk(
  "company/fetchCompanyDocuments", // Action type
  async ({ companyId, auth }, { rejectWithValue }) => {
    if (companyId) {
      try {
        // const auth = localStorage.getItem("authToken"); // Retrieve auth token
        const response = await fetch(
          `${
            import.meta.env
              .VITE_BORROWERS_GET_COMPANY_DOCUMENTS_COMPANY_BORROWER
          }${companyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${auth}`,
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch company documents"
          );
        }

        const data = await response.json();
        return data; // Return the fetched documents as the action payload
      } catch (error) {
        return rejectWithValue(error.message); // Return the error message
      }
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
      registeredDistrict: "",
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
      // shareholdingStructure: "",
      sourceOfRepayment: "",
      tradeUnion: "", //optional
    },
  },
  companyDetails: {},
  companyDocuments: [
    {
      docId: "",
      companyBorrowerId: "",
      docName: "",
      contentType: "",
      fileType: "",
      size: 0,
      extraMetadata: "",
      uploadedDate: "",
      documentKey: "PARTNERSHIP_AGREEMENT",
      verified: false,
    },
    {
      docId: "",
      companyBorrowerId: "",
      docName: "",
      contentType: "",
      fileType: "",
      size: 0,
      extraMetadata: "",
      uploadedDate: "",
      documentKey: "TAX_REGISTRATION_CERTIFICATE",
      verified: false,
    },
    {
      docId: "",
      companyBorrowerId: "",
      docName: "",
      contentType: "",
      fileType: "",
      size: 0,
      extraMetadata: "",
      uploadedDate: "",
      documentKey: "TAX_CLEARANCE_CERTIFICATE",
      verified: false,
    },
    {
      docId: "",
      companyBorrowerId: "",
      docName: "",
      contentType: "",
      fileType: "",
      size: 0,
      extraMetadata: "",
      uploadedDate: "",
      documentKey: "SHAREHOLDER_AGREEMENT",
      verified: false,
    },
    {
      docId: "",
      companyBorrowerId: "",
      docName: "",
      contentType: "",
      fileType: "",
      size: 0,
      extraMetadata: "",
      uploadedDate: "",
      documentKey: "CERTIFICATE_OF_INCORPORATION",
      verified: false,
    },
    {
      docId: "",
      companyBorrowerId: "",
      docName: "",
      contentType: "",
      fileType: "",
      size: 0,
      extraMetadata: "",
      uploadedDate: "",
      documentKey: "ARTICLES_OF_ASSOCIATION",
      verified: false,
    },
  ],
  directorDocuments: [],
  directorsKycDetails: [],
  existingDirectorDetails: [],
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
      country: "Zambia",
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
      kinCountry: "Zambia",
      kinDistrict: "",
      kinEmail: "",
      kinEmployer: "",
      kinGender: "",
      kinRelationship: "",
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
      country: "Zambia",
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
      shareholdingPercentage: "",
    },
  },
  allCompanies: [],
  allDraftedCompanies: [],
  allBorrowersData: [],
  allDraftedBorrowersTotalElements: "",
  allBorrowersTotalElements: "",
  updateCompanyData: {},
  updateDirectorData: {},
  updateShareholderData: {},
  error: null,
  loading: false,
  companyId: null,
};

const borrowersSlice = createSlice({
  name: "smeBorrowers",
  initialState,
  reducers: {
    setCompanyId: (state, action) => {
      const { companyId } = action.payload;
      state.companyId = companyId;
    },
    // for Adding company
    handleChangeAddCompanyField: (state, action) => {
      const { section, field, value, type, checked, index } = action.payload;
      // If section is provided, update specific field in that section
      if (section === "documents") {
        state.addCompanyData.documents[index][field] =
          type === "checkbox" ? checked : value;
      } else if (section && state.addCompanyData[section]) {
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
    // For Edit / Update UI Company
    handleChangeUpdateCompanyField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.updateCompanyData[section]) {
        state.updateCompanyData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in updateCompanyData
        state.updateCompanyData[field] = type === "checkbox" ? checked : value;
      }
    },
    setUpdateCompany: (state, action) => {
      const { uid } = action.payload;
      const borrower = state.allBorrowersData.find((item) => item.uid === uid);
      if (borrower) {
        // console.log(borrower);
        const { shareHolderDetails, directorsKycDetails, ...rest } =
          borrower.companyBorrowerProfile;
        state.updateCompanyData = rest;
      } else {
        state.updateCompanyData = null; // Reset if no match found
      }
    },
    setUpdateDraftCompany: (state, action) => {
      const { borrowerProfileDraftId } = action.payload;
      const borrower = state.allDraftedCompanies.find(
        (item) => item.borrowerProfileDraftId === borrowerProfileDraftId
      );
      if (borrower) {
        console.log(borrower);
        state.updateCompanyData = borrower.companyBorrowerProfileDraft;
      } else {
        state.updateCompanyData = null; // Reset if no match found
      }
    },
    resetUpdateCompanyData: (state, action) => {
      state.updateCompanyData = initialState.updateCompanyData;
    },

    // for Director
    addDirector: (state, action) => {
      const { loanOfficer } = action.payload;
      if (state.directorsKycDetails.length < 1) {
        state.directorsKycDetails.push({
          ...state.newDirector,
          personalDetails: {
            ...state.newDirector.personalDetails,
            loanOfficer: loanOfficer,
          },
        });
      }
    },
    removeDirector: (state, action) => {
      const { index } = action.payload;
      state.directorsKycDetails.splice(index, 1);
    },
    resetDirector: (state, action) => {
      const { index } = action.payload;
      state.directorsKycDetails[index] = { ...state.newDirector };
      toast.success("Director Reset Successfully");
    },
    handleChangeAddDirectorField: (state, action) => {
      const { section, field, value, type, checked, index } = action.payload;
      // If section is provided, update specific field in that section
      if (section === "documents") {
        state.directorsKycDetails[0].documents[index][field] =
          type === "checkbox" ? checked : value;
      } else if (section && state.directorsKycDetails[0][section]) {
        state.directorsKycDetails[0][section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in directorsKycDetails
        state.directorsKycDetails[0][field] =
          type === "checkbox" ? checked : value;
      }
    },
    // For Edit / Update UI Director
    handleChangeUpdateDirectorField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.updateDirectorData[section]) {
        state.updateDirectorData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in updateDirectorData
        state.updateDirectorData[field] = type === "checkbox" ? checked : value;
      }
    },
    setUpdateDirector: (state, action) => {
      const { uid, uniqueID } = action.payload;

      // Step 1: Find the borrower by `uid`
      const borrower = state.allBorrowersData.find((item) => item.uid === uid);

      if (borrower) {
        // Step 2: Find the specific director by `uniqueID` within `directorKYCDetails`
        const director =
          borrower.companyBorrowerProfile.directorsKycDetails?.find(
            (director) => director.personalDetails.uniqueID === uniqueID
          );
        if (director) {
          state.updateDirectorData = director;
        } else {
          // No matching shareholder found
          state.updateDirectorData = null;
        }
      } else {
        // No matching borrower found
        state.updateDirectorData = null;
      }
    },
    setUpdateExistingDirector: (state, action) => {
      const { uid, uniqueID } = action.payload;

      // Step 1: Find the borrower by `uid`
      const director = state.existingDirectorDetails.find(
        (item) => item.uid === uid && item.personalDetails.uniqueID === uniqueID
      );
      if (director) {
        state.updateDirectorData = director;
      } else {
        // No matching borrower found
        state.updateDirectorData = null;
      }
    },
    resetUpdateDirectorData: (state, action) => {
      state.updateDirectorData = initialState.updateDirectorData;
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
    // For Edit / Update UI Shareholder
    handleChangeUpdateShareholderField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.updateShareholderData[section]) {
        state.updateShareholderData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in updateShareholderData
        state.updateShareholderData[field] =
          type === "checkbox" ? checked : value;
      }
    },
    setUpdateShareholder: (state, action) => {
      const { uid, uniqueID } = action.payload;

      // Step 1: Find the borrower by `uid`
      const borrower = state.allBorrowersData.find((item) => item.uid === uid);

      if (borrower) {
        // Step 2: Find the specific shareholder by `uniqueID` within `shareHolderDetails`
        const shareholder =
          borrower.companyBorrowerProfile.shareHolderDetails?.find(
            (shareholder) => shareholder.personalDetails.uniqueID === uniqueID
          );
        if (shareholder) {
          state.updateShareholderData = shareholder;
        } else {
          // No matching shareholder found
          state.updateShareholderData = null;
        }
      } else {
        // No matching borrower found
        state.updateShareholderData = null;
      }
    },
    setUpdateExistingShareholder: (state, action) => {
      const { uid, uniqueID } = action.payload;

      // Step 1: Find the shareholder by `uid`
      const shareholder = state.existingShareholderDetails.find(
        (item) => item.uid === uid && item.personalDetails.uniqueID === uniqueID
      );
      if (shareholder) {
        state.updateShareholderData = shareholder;
      } else {
        // No matching shareholder found
        state.updateShareholderData = null;
      }
    },
    resetUpdateShareholderData: (state, action) => {
      state.updateShareholderData = initialState.updateShareholderData;
    },

    // Documents
    handleChangeCompanyDocuments: (state, action) => {
      const { field, value, type, checked, index } = action.payload;
      // If section is provided, update specific field in that section
      state.companyDocuments[index][field] =
        type === "checkbox" ? checked : value;
    },
    handleChangeDirectorDocuments: (state, action) => {
      const { field, value, type, checked, directorId, documentId } =
        action.payload;

      // Find the director by directorId
      state.existingDirectorDetails = state.existingDirectorDetails.map(
        (director) => {
          if (director.personalDetails.uniqueID === directorId) {
            // Find the document by documentId (docId)
            const updatedDocuments = director.documents.map((doc) => {
              if (doc.docId === documentId) {
                // Update the specified field in the document
                return {
                  ...doc,
                  [field]: type === "checkbox" ? checked : value, // Update field value based on type
                };
              }
              return doc; // Keep other documents unchanged
            });

            return {
              ...director,
              documents: updatedDocuments, // Assign the updated documents array
            };
          }
          return director; // Keep other directors unchanged
        }
      );
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
      .addCase(draftCompanyBorrowerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(draftCompanyBorrowerInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Draft Saved Successfully");
      })
      .addCase(draftCompanyBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Store the error message
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
      })
      .addCase(fetchDraftedCompanyBorrowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDraftedCompanyBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        state.allDraftedCompanies = action.payload.content;
        state.allDraftedBorrowersTotalElements = action.payload.totalElements;
      })
      .addCase(fetchDraftedCompanyBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch drafted company borrowers.";
        toast.error(`API Error : ${action.payload}`); // Notify the user of the error
      })
      .addCase(fetchDraftedCompanyBorrowerByField.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(
        fetchDraftedCompanyBorrowerByField.fulfilled,
        (state, action) => {
          state.loading = false;
          state.allDraftedCompanies = action.payload;
        }
      )
      .addCase(fetchDraftedCompanyBorrowerByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateDraftCompanyBorrowerStatus.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(updateDraftCompanyBorrowerStatus.fulfilled, (state, action) => {
        state.loading = false;
        toast(`Draft Status updated!`);
      })
      .addCase(updateDraftCompanyBorrowerStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrower by field"; // Set error message
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchAllCompanyBorrowersByLoanOfficer.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllCompanyBorrowersByLoanOfficer.fulfilled,
        (state, action) => {
          state.loading = false;
          // Update state with the borrowers array
          state.allBorrowersData = action.payload.content;
          state.allBorrowersTotalElements = action.payload.totalElements;
          state.error = null;
        }
      )
      .addCase(
        fetchAllCompanyBorrowersByLoanOfficer.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(`API Error : ${action.payload}`);
        }
      )
      .addCase(fetchAllCompanyBorrowersByType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCompanyBorrowersByType.fulfilled, (state, action) => {
        state.loading = false;
        // Update state with the borrowers array
        state.allBorrowersData = action.payload.content;
        state.allBorrowersTotalElements = action.payload.totalElements;
        state.error = null;
      })
      .addCase(fetchAllCompanyBorrowersByType.rejected, (state, action) => {
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
      .addCase(fetchAllCompanyBorrowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCompanyBorrowers.fulfilled, (state, action) => {
        state.loading = false;
        state.allCompanies = action.payload.map((company) => ({
          label: company.companyName,
          value: company.companyUniqueId,
        }));
      })
      .addCase(fetchAllCompanyBorrowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch borrowers";
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchCompanyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDetails = action.payload;

        // Check if shareHolderDetails is null or undefined, and assign an empty array if true
        state.existingShareholderDetails = (
          action.payload.shareHolderDetails ?? []
        ).map((shareHolder) => ({
          ...shareHolder,
          dataIndex: nanoid(),
          uid: action.payload.companyDetails.companyUniqueId,
        }));

        // Check if directorsKycDetails is null or undefined, and assign an empty array if true
        state.existingDirectorDetails = (
          action.payload.directorsKycDetails ?? []
        ).map((director) => ({
          ...director,
          dataIndex: nanoid(),
          uid: action.payload.companyDetails.companyUniqueId,
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
        toast.success("Company Information Updated Successfully");
      })
      .addCase(updateCompanyBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateShareholderInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShareholderInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Shareholder Information Updated Successfully");
      })
      .addCase(updateShareholderInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateDirectorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDirectorInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Director Information Updated Successfully");
      })
      .addCase(updateDirectorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteDirectorInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDirectorInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Director Information Deleted Successfully");
      })
      .addCase(deleteDirectorInfo.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to delete director information.";
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteShareholderInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShareholderInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Shareholder deleted successfully");
      })
      .addCase(deleteShareholderInfo.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to delete shareholder information";
        toast.error(`API Error: ${action.payload}`);
      })
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
      .addCase(uploadCompanyDocumentFile.pending, (state) => {
        // state.loading = true;
      })
      .addCase(uploadCompanyDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        const { documentKey } = action.payload;
        state.companyDocuments = state.companyDocuments.map(
          (doc) =>
            doc.documentKey === documentKey
              ? { ...action.payload } // Update the matching document
              : doc // Keep other documents unchanged
        );
        toast.success("File uploaded successfully");
      })
      .addCase(uploadCompanyDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(uploadDirectorDocumentFile.pending, (state) => {
        // state.loading = true;
      })
      .addCase(uploadDirectorDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        const { directorId, documentKey } = action.payload;

        // Find the director and update the matching document
        state.existingDirectorDetails = state.existingDirectorDetails.map(
          (director) => {
            if (director.personalDetails.uniqueID === directorId) {
              // Update the document within the director's documents array
              const updatedDocuments = director.documents.map(
                (doc) =>
                  doc.documentKey === documentKey
                    ? { ...doc, ...action.payload } // Update the matching document
                    : doc // Keep other documents unchanged
              );

              return {
                ...director,
                documents: updatedDocuments, // Assign the updated documents array
              };
            }
            return director; // Keep other directors unchanged
          }
        );

        toast.success("File uploaded successfully");
      })
      .addCase(uploadDirectorDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteDocumentFile.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`Document deleted Successfully`);
      })
      .addCase(deleteDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchCompanyDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.companyDocuments = action.payload.filter(
          (doc) =>
            doc.hasOwnProperty("companyBorrowerId") &&
            !doc.hasOwnProperty("directorId")
        );

        let directorDocuments = action.payload.filter(
          (doc) =>
            doc.hasOwnProperty("companyBorrowerId") &&
            doc.hasOwnProperty("directorId")
        );

        // Map through existingDirectorDetails to assign documents
        state.existingDirectorDetails = state.existingDirectorDetails.map(
          (director) => {
            const matchedDocuments = directorDocuments.filter(
              (doc) => doc.directorId === director.personalDetails.uniqueID
            );
            return {
              ...director,
              documents: matchedDocuments, // Assign matched documents
            };
          }
        );
      })
      .addCase(fetchCompanyDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyDocumentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyDocumentInfo.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`Document Verification Submitted Successfully`);
      })
      .addCase(verifyDocumentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to verify document";
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setCompanyId,
  handleChangeAddCompanyField,
  resetCompanyData,
  handleChangeUpdateCompanyField,
  setUpdateCompany,
  setUpdateDraftCompany,
  resetUpdateCompanyData,
  addDirector,
  removeDirector,
  resetDirector,
  handleChangeAddDirectorField,
  handleChangeUpdateDirectorField,
  setUpdateDirector,
  setUpdateExistingDirector,
  resetUpdateDirectorData,
  addShareholder,
  removeShareholder,
  resetShareholder,
  handleChangeAddShareholderField,
  handleChangeUpdateShareholderField,
  setUpdateShareholder,
  setUpdateExistingShareholder,
  resetUpdateShareholderData,
  handleChangeCompanyDocuments,
  handleChangeDirectorDocuments,
} = borrowersSlice.actions;

export default borrowersSlice.reducer;
