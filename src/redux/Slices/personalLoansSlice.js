import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { loanOfferSampleData } from "../../data/loanOfferSampleData";

export const fetchLoanProductData = createAsyncThunk(
  "personalLoans/fetchLoanProductData",
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

export const submitLoan = createAsyncThunk(
  "personalLoans/submitLoan",
  async (generalDetails, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_SUBMIT_CREATE}`;

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
  "personalLoans/getLoanOffers",
  async (loanOfferFields, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_READ_LOAN_OFFERS}/${
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
  "personalLoans/handleProceed",
  async ({ proceedPayload, uid }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_SUBMIT_PUT}${uid}/submit-loan`;

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
  "personalLoans/getPendingLoans",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCT_READ_LOAN_PENDING
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

export const getLoansByUid = createAsyncThunk(
  "personalLoans/getLoansByUid",
  async (uid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCT_READ_LOAN_PENDING_BY_UID
        }/${uid}/pending-loans`,
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
  "personalLoans/approveLoan",
  async (approveLoanPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_APPROVE}`;

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
  "personalLoans/rejectLoan",
  async (loanId, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_REJECT}/${loanId}/REJECT`;

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

export const getLoanHistory = createAsyncThunk(
  "personalLoans/getLoanHistory",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCT_READ_LOAN_HISTORY
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

export const getLoanHistoryByUid = createAsyncThunk(
  "personalLoans/getLoanHistoryByUid",
  async (uid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_PRODUCT_READ_LOAN_HISTORY_BY_UID
        }/${uid}/pending-loans`,
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
    },
    advanceSettings: {
      decimalPlaces: "",
      interestStartDate: "",
      firstRepaymentDate: "",
      firstRepaymentAmount: "",
      lastRepaymentAmount: "",
      overrideMaturityDate: "",
      overrideRepaymentAmount: "",
      proRataBasis: "",
      interestChargeSchedule: "",
      principalChargeSchedule: "",
      balloonRepaymentAmount: "",
      moveFirstRepaymentDays: "",
    },
    automatedPayments: {
      automaticPayments: "",
      timeToPostBetween: "",
      cashOrBank: "",
    },
    extendLoan: {
      extendLoanAfterMaturity: "",
      extendLoanInterestType: "",
      calculateInterestOn: "",
      loanInterestRateAfterMaturity: "",
      recurringPeriodAfterMaturity: "",
      per: "",
      includeFeesAfterMaturity: "",
      loanStatusPastMaturity: "",
      applyToDate: "",
      loanStatus: "",
      selectGuarantors: "",
      loanTitle: "",
      description: "",
    },
    loanFiles: [],
  },
  approveLoans: [],
  loanHistory: [
    {
      generalDetails: {
        loanProduct: "Personal Loan",
        borrower: "John Doe",
        disbursedBy: "Bank XYZ",
        principalAmount: "5000",
        loanReleaseDate: "2024-01-15",
        interestMethod: "Flat",
        loanInterest: "5",
        interestPer: "Yearly",
        loanDuration: "12",
        durationPer: "Months",
        repaymentCycle: "Monthly",
        numberOfTenure: "12",
      },
      advanceSettings: {
        decimalPlaces: "2",
        interestStartDate: "2024-01-20",
        firstRepaymentDate: "2024-02-01",
        firstRepaymentAmount: "500",
        lastRepaymentAmount: "500",
        overrideMaturityDate: "2025-01-15",
        overrideRepaymentAmount: "",
        proRataBasis: "Yes",
        interestChargeSchedule: "Monthly",
        principalChargeSchedule: "Monthly",
        balloonRepaymentAmount: "",
        moveFirstRepaymentDays: "10",
      },
      automatedPayments: {
        automaticPayments: "Yes",
        timeToPostBetween: "09:00 - 17:00",
        cashOrBank: "Bank",
      },
      extendLoan: {
        extendLoanAfterMaturity: "No",
        extendLoanInterestType: "",
        calculateInterestOn: "",
        loanInterestRateAfterMaturity: "",
        recurringPeriodAfterMaturity: "",
        per: "",
        includeFeesAfterMaturity: "No",
        loanStatusPastMaturity: "Active",
        applyToDate: "",
        loanStatus: "Ongoing",
        selectGuarantors: "Guarantor A",
        loanTitle: "John's Personal Loan",
        description: "Loan for personal expenses",
      },
      loanFiles: ["file1.pdf", "file2.pdf"],
      applicationStatus: "Rejected",
    },
    {
      generalDetails: {
        loanProduct: "Business Loan",
        borrower: "Jane Smith",
        disbursedBy: "Bank ABC",
        principalAmount: "15000",
        loanReleaseDate: "2024-03-10",
        interestMethod: "Reducing Balance",
        loanInterest: "7",
        interestPer: "Yearly",
        loanDuration: "24",
        durationPer: "Months",
        repaymentCycle: "Quarterly",
        numberOfTenure: "8",
      },
      advanceSettings: {
        decimalPlaces: "2",
        interestStartDate: "2024-03-15",
        firstRepaymentDate: "2024-06-15",
        firstRepaymentAmount: "2000",
        lastRepaymentAmount: "2000",
        overrideMaturityDate: "",
        overrideRepaymentAmount: "",
        proRataBasis: "No",
        interestChargeSchedule: "Quarterly",
        principalChargeSchedule: "Quarterly",
        balloonRepaymentAmount: "",
        moveFirstRepaymentDays: "15",
      },
      automatedPayments: {
        automaticPayments: "No",
        timeToPostBetween: "",
        cashOrBank: "Cash",
      },
      extendLoan: {
        extendLoanAfterMaturity: "Yes",
        extendLoanInterestType: "Fixed",
        calculateInterestOn: "Principal",
        loanInterestRateAfterMaturity: "10",
        recurringPeriodAfterMaturity: "3",
        per: "Months",
        includeFeesAfterMaturity: "Yes",
        loanStatusPastMaturity: "Overdue",
        applyToDate: "2024-12-31",
        loanStatus: "Pending",
        selectGuarantors: "Guarantor B",
        loanTitle: "Jane's Business Loan",
        description: "Loan for business expansion",
      },
      loanFiles: ["document1.docx", "document2.xlsx"],
      applicationStatus: "Approved",
    },
    {
      generalDetails: {
        loanProduct: "Education Loan",
        borrower: "Alex Johnson",
        disbursedBy: "Bank PQR",
        principalAmount: "20000",
        loanReleaseDate: "2024-06-01",
        interestMethod: "Flat",
        loanInterest: "4",
        interestPer: "Monthly",
        loanDuration: "36",
        durationPer: "Months",
        repaymentCycle: "Monthly",
        numberOfTenure: "36",
      },
      advanceSettings: {
        decimalPlaces: "2",
        interestStartDate: "2024-06-10",
        firstRepaymentDate: "2024-07-10",
        firstRepaymentAmount: "600",
        lastRepaymentAmount: "600",
        overrideMaturityDate: "2027-06-01",
        overrideRepaymentAmount: "",
        proRataBasis: "Yes",
        interestChargeSchedule: "Monthly",
        principalChargeSchedule: "Monthly",
        balloonRepaymentAmount: "",
        moveFirstRepaymentDays: "10",
      },
      automatedPayments: {
        automaticPayments: "Yes",
        timeToPostBetween: "08:00 - 20:00",
        cashOrBank: "Bank",
      },
      extendLoan: {
        extendLoanAfterMaturity: "No",
        extendLoanInterestType: "",
        calculateInterestOn: "",
        loanInterestRateAfterMaturity: "",
        recurringPeriodAfterMaturity: "",
        per: "",
        includeFeesAfterMaturity: "No",
        loanStatusPastMaturity: "Closed",
        applyToDate: "",
        loanStatus: "Completed",
        selectGuarantors: "",
        loanTitle: "Alex's Education Loan",
        description: "Loan for higher studies",
      },
      loanFiles: ["certificate1.jpg", "certificate2.png"],
      applicationStatus: "Approved",
    },
  ],
  loanConfigData: {},
  loanProductOptions: [],
  loanOfferFields: {
    loanProductId: "",
    uid: "",
  },
  error: null,
  loading: false,
};

const personalLoansSlice = createSlice({
  name: "personalLoans",
  initialState,
  reducers: {
    updateLoanField: (state, action) => {
      const { section, field, value } = action.payload;
      // If section is provided, update specific field in that section
      if (section && state.addLoanData[section]) {
        state.addLoanData[section][field] = value;
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
          .filter((item) => item.eligibleCustomerType === "CONSUMER")
          .map((item) => ({
            label: item.productType.replace(/_/g, " "),
            value: item.loanProductId,
          }));
        state.loanProductOptions = updatedLoanProductOptions;
      })
      .addCase(fetchLoanProductData.rejected, (state, action) => {
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
        toast.success("Details submittted successfully");
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
      })
      .addCase(getPendingLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoansByUid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoansByUid.fulfilled, (state, action) => {
        state.loading = false;
        state.approveLoans = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(getLoansByUid.rejected, (state, action) => {
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
      })
      .addCase(getLoanHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoanHistoryByUid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanHistoryByUid.fulfilled, (state, action) => {
        state.loading = false;
        state.loanHistory = action.payload;
      })
      .addCase(getLoanHistoryByUid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      });
  },
});

export const { updateLoanField, updateLoanOfferFields } =
  personalLoansSlice.actions;

export default personalLoansSlice.reducer;
