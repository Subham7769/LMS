import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchBorrowerDataPersonalInfo = createAsyncThunk(
  "borrower/fetchBorrowerDataPersonalInfo",
  async ({ subID }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWER_INFO_PERSONAL_INFO}${subID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 404) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Borrower Not Found");
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue({ message: "Unauthorized" });
      }
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const fetchBorrowerDataLoanHistory = createAsyncThunk(
  "borrower/fetchBorrowerDataLoanHistory",
  async ({ subID }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWER_INFO_LOAN_HISTORY}${subID}/all-loans`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 404) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Borrower Not Found");
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue({ message: "Unauthorized" });
      }
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const getFullLoanDetails = createAsyncThunk(
  "borrower/getFullLoanDetails",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_FULL_LOAN_DETAILS_BY_ID_PERSONAL
        }${uid}/loan-details/${loanId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBorrowerData = createAsyncThunk(
  "borrower/fetchBorrowerData",
  async ({ subID, url }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PAYMENT_HISTORY_READ}${subID}${url}`,
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
        return rejectWithValue(errorData.message || "Failed to get Details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const downloadClearanceLetter = createAsyncThunk(
  "borrower/downloadClearanceLetter",
  async ({ subID, loanId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${
        import.meta.env.VITE_BORROWER_INFO
      }clearance-letter/${subID}/${loanId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        // You can redirect using another approach, but we can't call navigate directly here
        return rejectWithValue({ message: "Unauthorized" });
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Return the download URL to be handled in the component
      return downloadUrl;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "download/handleDownload",
  async (
    { subID, fileType, endpoint, contentType, fileName },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${import.meta.env.VITE_BORROWER_INFO}${subID}/${endpoint}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        // Optionally navigate to login
        return rejectWithValue({ message: "Unauthorized" });
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  personalInfo: {
    id: "",
    uid: "",
    borrowerProfile: {
      personalDetails: {
        title: "",
        surname: "",
        firstName: "",
        otherName: "",
        uniqueIDType: "",
        uniqueID: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        dateOfBirth: "",
        age: null,
        placeOfBirth: "",
        loanOfficer: "",
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
        customerPhotoId: null,
        groupId: "",
        creditScore: null,
        freeCashInHand: null,
        grossSalary: null,
      },
      registrationDate: "",
      customerPhotoUploaded: false,
      paySlipsUploaded: false,
      paySlipsVerified: false,
      employerFormUploaded: false,
      employerFormVerified: false,
      bankStatementUploaded: false,
      bankStatementVerified: false,
      atmCardUploaded: false,
      atmCardVerified: false,
    },
    borrowerProfileType: "",
    borrowerProjectsEligibilityStatus: {},
    borrowerProductsEligibilityStatus: {},
    lmsProductsTclAmounts: {},
    lmsFreqCapForProject: null,
    deactivated: false,
    creationDate: "",
    lmsUserStatus: "",
    loans: {},
    requiredToRegisters: {},
    registrationResults: {
      projects: [],
      borrowerType: null,
    },
    resident: false,
  },
  creditProfile: [],
  loanOffersCalculations: {},
  loanHistory: [
    {
      uid: "",
      loanId: "",
      borrowerName: "",
      lmsUserStatus: "",
      loanProductName: "",
      disbursedBy: "",
      loanReleaseDate: "",
      principalAmount: null,
      interestMethod: "",
      repaymentCycle: "",
      numberOfTenure: null,
      loanInterest: null,
      perLoanInterest: "",
      loanDuration: null,
      perLoanDuration: "",
      applicationStatus: "",
      loanStatus: "",
      monthlyEMI: null,
      firstEmiPayment: "",
      loanCreationDate: "",
      borrowerDetails: {
        employerName: "",
        employmentDuration: "",
        creditScore: null,
        monthlyIncome: null,
        activeLoans: null,
        paymentHistory: "",
      },
      verifiedDocuments: [
        {
          docId: "",
          verified: false,
          docName: "",
          documentKey: "",
        },
      ],
      loanApplicationId: "",
    },
  ],
  fullLoanDetails: {},
  paymentHistory: [],
  rejectionHistory: [],
  CreditBureauDetails: {},
  loading: false,
  error: null,
  downloadLoading: false,
  downloadError: null,
};

const customerCareSlice = createSlice({
  name: "borrower",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowerDataPersonalInfo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBorrowerDataPersonalInfo.fulfilled, (state, action) => {
        state.personalInfo = action.payload;
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(fetchBorrowerDataPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchBorrowerData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBorrowerData.fulfilled, (state, action) => {
        const { url } = action.meta.arg;
        if (url.includes("/credit-profile")) {
          state.creditProfile = action.payload;
        } else if (url.includes("/loan-offers-calculations")) {
          state.loanOffersCalculations = action.payload;
        } else if (url.includes("/loans")) {
          state.loanHistory = action.payload;
          console.log(action.payload);
        } else if (url.includes("/repayments")) {
          state.paymentHistory = action.payload;
        } else if (url.includes("/rejection-history")) {
          state.rejectionHistory = action.payload;
        } else if (url.includes("/simah-recent-response")) {
          state.CreditBureauDetails = action.payload;
        } else {
          state.personalInfo = action.payload;
          console.log(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchBorrowerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchBorrowerDataLoanHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBorrowerDataLoanHistory.fulfilled, (state, action) => {
        state.loanHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchBorrowerDataLoanHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getFullLoanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFullLoanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.fullLoanDetails = action.payload;
      })
      .addCase(getFullLoanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(downloadClearanceLetter.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadClearanceLetter.fulfilled, (state, action) => {
        state.downloadLoading = false;
        // Download the PDF file
        const link = document.createElement("a");
        link.href = action.payload;
        link.setAttribute("download", "clearance_letter.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(action.payload);
      })
      .addCase(downloadClearanceLetter.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload;
        console.error("Download failed:", action.payload);
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export default customerCareSlice.reducer;
