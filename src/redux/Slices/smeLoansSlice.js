import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const fetchLoanProductData = createAsyncThunk(
  "smeLoans/fetchLoanProductData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_READ_ALL_PRODUCT}`,
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

export const fetchBorrowerById = createAsyncThunk(
  "smeLoans/fetchBorrowerById",
  async (uid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_READ_BORROWER_PROFILE}${uid}`,
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

export const submitLoan = createAsyncThunk(
  "smeLoans/submitLoan",
  async (generalDetails, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_SUBMIT_CREATE_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(generalDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLoanOffers = createAsyncThunk(
  "smeLoans/getLoanOffers",
  async (loanOfferFields, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_READ_LOAN_OFFERS_PERSONAL}${
          loanOfferFields.loanProductId
        }/caching/${loanOfferFields.uid}`,
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

export const handleProceed = createAsyncThunk(
  "smeLoans/handleProceed",
  async ({ proceedPayload, uid }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_LOAN_SUBMIT_PUT_PERSONAL
    }${uid}/submit-loan`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(proceedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPendingLoans = createAsyncThunk(
  "smeLoans/getPendingLoans",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_PENDING_PERSONAL
        }?page=${page}&size=${size}`,
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

export const getLoansByField = createAsyncThunk(
  "smeLoans/getLoansByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_PENDING_BY_FIELD_PERSONAL
        }${field}&value=${value}`,
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

export const approveLoan = createAsyncThunk(
  "smeLoans/approveLoan",
  async (approveLoanPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_APPROVE_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(approveLoanPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectLoan = createAsyncThunk(
  "smeLoans/rejectLoan",
  async (rejectLoanPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_REJECT_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rejectLoanPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLoanHistory = createAsyncThunk(
  "smeLoans/getLoanHistory",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_HISTORY_PERSONAL
        }?page=${page}&size=${size}`,
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

export const getLoanHistoryByField = createAsyncThunk(
  "smeLoans/getLoanHistoryByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_HISTORY_BY_FIELD_PERSONAL
        }${field}&value=${value}`,
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

export const getFullLoanDetails = createAsyncThunk(
  "smeLoans/getFullLoanDetails",
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

const initialState = {
  borrowerData: {},
  addLoanData: {
    generalDetails: {
      borrowerId: "",
      disbursedBy: "",
      interestMethod: "",
      loanDuration: 0,
      loanInterest: 0,
      loanProductId: "",
      loanReleaseDate: "",
      numberOfTenure: 0,
      perLoanDuration: "",
      perLoanInterest: "",
      principalAmount: 0,
      repaymentCycle: "",
      reasonForBorrowing: "",
    },
    profomaDetails: {
      orderNo: "",
      orderDate: "",
      amountOfOrder: "",
      orderExpiryDate: "",
      proformaInvoiceNo: "",
      proformaInvoiceDate: "",
      amountofProforma: "",
      proformaExpectedDateOfPayment: "",
      invoiceNo: "",
      invoiceDate: "",
      amountOfInvoice: "",
      invoiceExpectedDateOfPayment: "",
    },
    offTakerDetails: {
      nameOfCompany: "",
      industry: "",
      natureOfBusiness: "",
      location: "",
      province: "",
      country: "",
      contactperson: "",
      position: "",
      cellPhoneNumber: "",
    },
    supplierDetails: {
      nameOfCompany: "",
      industry: "",
      natureOfBusiness: "",
      location: "",
      province: "",
      country: "",
      contactperson: "",
      position: "",
      cellPhoneNumber: "",
      postalAddress: "",
      physicalAddress: "",
      emailAddress: "",
      phoneNumber: "",
    },
    collateralDetails: {
      collateralType: "",
      marketValue: "",
      lastValutionDate: "",
      insuranceStatus: "",
      insuranceExpiryDate: "",
      locationOfCollateral: "",
      plotVehicleNo: "",
      stateOfCollateral: "",
    },
    LHADetails: {
      loanOfficerFindings: "",
      business: "",
      office: "",
      businessOperations: "",
      otherDetails: "",
      otherComments: "",
    },
    requiredDocuments: {
      resolutionToBorrow: null,
      resolutionToBorrowVerified: false,
      purchaseOrder: null,
      purchaseOrderVerified: false,
      invoice: null,
      invoiceVerified: false,
      profomaInvoice: null,
      profomaInvoiceVerified: false,
      quotationsFromSupplier: null,
      quotationsFromSupplierVerified: false,
      bankStatement: null,
      bankStatementVerified: false,
      creditReferenceBureauReport: null,
      creditReferenceBureauReportVerified: false,
      confirmationOfBankingDetails: null,
      confirmationOfBankingDetailsVerified: false,
    },
  },
  approveLoans: [],
  approveLoansTotalElements: 0,
  loanHistory: [],
  loanHistoryTotalElements: 0,
  loanConfigData: {},
  loanProductOptions: [],
  loanOfferFields: {
    loanProductId: "",
    uid: "",
  },
  fullLoanDetails: {},
  error: null,
  loading: false,
};

const smeLoansSlice = createSlice({
  name: "smeLoans",
  initialState,
  reducers: {
    updateLoanField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.addLoanData[section]) {
        state.addLoanData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in addLoanData
        state.addLoanData = {
          ...state.addLoanData,
          [field]: value,
        };
      }
    },
    updateLoanOfferFields: (state, action) => {
      const { name, value } = action.payload;
      state.loanOfferFields[name] = value; // Dynamically update the field in loanConfigFields
    },
    resetAddLoanData: (state, action) => {
      state.addLoanData = initialState.addLoanData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanProductData.fulfilled, (state, action) => {
        state.loading = false;
        const updatedLoanProductOptions = action.payload
          .filter((item) => item.eligibleCustomerType === "CORPORATE")
          .map((item) => ({
            label: item.productType.replace(/_/g, " "),
            value: item.loanProductId,
          }));
        state.loanProductOptions = updatedLoanProductOptions;
        console.log(state.loanProductOptions);
      })
      .addCase(fetchLoanProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchBorrowerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBorrowerById.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowerData = action.payload;
      })
      .addCase(fetchBorrowerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(submitLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loanConfigData = action.payload;
        state.loanOfferFields.loanProductId =
          state.addLoanData.generalDetails.loanProductId;
        state.loanOfferFields.uid = state.addLoanData.generalDetails.borrowerId;
        state.addLoanData = initialState.addLoanData;
        toast.success("Offer generated successfully");
      })
      .addCase(submitLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoanOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.loanConfigData = action.payload;
      })
      .addCase(getLoanOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(handleProceed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleProceed.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loan submittted successfully");
      })
      .addCase(handleProceed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(getPendingLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.approveLoans = action.payload.content;
        state.approveLoansTotalElements = action.payload.totalElements;
      })
      .addCase(getPendingLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoansByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoansByField.fulfilled, (state, action) => {
        state.loading = false;

        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        // Check if loanId is null in each object and filter accordingly
        state.approveLoans = payload.some((item) => item.loanId === null)
          ? [] // Set to an empty array if any loanId is null
          : payload;
      })
      .addCase(getLoansByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(approveLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveLoan.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loan approved successfully");
      })
      .addCase(approveLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(rejectLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectLoan.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loan rejected successfully");
      })
      .addCase(rejectLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(getLoanHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loanHistory = action.payload.content;
        state.loanHistoryTotalElements = action.payload.totalElements;
      })
      .addCase(getLoanHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoanHistoryByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanHistoryByField.fulfilled, (state, action) => {
        state.loading = false;
        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        // Check if loanId is null in each object and filter accordingly
        state.loanHistory = payload.some((item) => item.loanId === null)
          ? [] // Set to an empty array if any loanId is null
          : payload;
      })
      .addCase(getLoanHistoryByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
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
      });
  },
});

export const { updateLoanField, updateLoanOfferFields, resetAddLoanData } =
  smeLoansSlice.actions;

export default smeLoansSlice.reducer;
