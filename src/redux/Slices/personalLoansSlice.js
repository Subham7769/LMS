import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

const initialState = {
  addLoanData: {
    generalDetails: {
      loanProduct: "",
      borrower: "",
      disbursedBy: "",
      principalAmount: "",
      loanReleaseDate: "",
      interestMethod: "",
      loanInterest: "",
      interestPer: "",
      loanDuration: "",
      durationPer: "",
      repaymentCycle: "",
      numberOfTenure: "",
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
  approveLoans: [
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
    },
  ],
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
      applicationStatus: "rejected",
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
  loanProductOptions: [],
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
        console.log(state.loanProductOptions);
      })
      .addCase(fetchLoanProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { updateLoanField } = personalLoansSlice.actions;

export default personalLoansSlice.reducer;
