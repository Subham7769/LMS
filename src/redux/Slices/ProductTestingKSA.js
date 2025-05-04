import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// OTP generation
export const generatePreEligibilityOtp = createAsyncThunk(
  "preEligibility/generateOtp",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const finalData = {
        mobile: formData.mobile,
        nationality: formData.nationality,
        userId: formData.nationalId,
        dob: `${formData.day}-${formData.month}-${formData.year}`,
      };
      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_OTP}/otp/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Include Authorization if needed
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(finalData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to generate OTP");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const validatePreEligibilityOtp = createAsyncThunk(
  "preEligibility/validateOtp",
  async ({ userId, otp }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_OTP_VALIDATION}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization if required
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId, otp }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP validation failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkFinanceEligibility = createAsyncThunk(
  "preEligibility/checkFinanceEligibility",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_FINANCE_CHECK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Finance eligibility check failed"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyNafath = createAsyncThunk(
  "preEligibility/verifyNafath",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_NAFATH_VERIFICATION}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Nafath verification failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBorrowerProfile = createAsyncThunk(
  "preEligibility/getBorrowerProfile",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_AML_USER_DETAILS
        }/${userId}/get-borrower-profile`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to fetch borrower profile"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const AMLStatusCheck = createAsyncThunk(
  "preEligibility/AMLStatusCheck",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_AML_CHECK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userId),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "AML check failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBorrowerSalaryDetails = createAsyncThunk(
  "preEligibility/getSalaryDetails",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // Assuming you're storing the token in localStorage
      const response = await fetch(
        `${
          import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_AML_USER_SALARY_DETAILS
        }/${userId}/employment-info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the authorization token
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch salary details");
      }

      const data = await response.json();
      return data; // Returning the response data to be used by reducers
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyBorrowerSalaryDetails = createAsyncThunk(
  "preEligibility/verifySalary",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_SALARY_CHECK}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userId),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Salary verification failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCreditConsent = createAsyncThunk(
  "borrower/getCreditConsent",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_KSA_GET_PRE_ELIGIBILITY_CREDIT_CHECK
        }/${userId}/credit-data`,
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
        throw new Error(errorData.message || "Failed to fetch credit consent");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLoanOffers = createAsyncThunk(
  "loanOffers/getLoanOffers",
  async ({ offerData, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_KSA_GET_LOAN_OFFERS
        }/${userId}/loans/configurations`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offerData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch loan offers");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const selectLoanOffer = createAsyncThunk(
  "loanOffers/selectLoanOffer",
  async ({ userId, offerSelection }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_KSA_SELECT_LOAN_OFFER
        }/${userId}/loan/offer/selection`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(offerSelection),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to submit selected loan offer"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitLoanApplication = createAsyncThunk(
  "loan/submitLoanApplication",
  async ({ userId, contractNumber, transactionId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_SUBMIT_LOAN}/${userId}/loans`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ transactionId, contractNumber }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to submit loan application"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyIban = createAsyncThunk(
  "preEligibility/verifyIban",
  async (payload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_VERIFY_IBAN}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "IBAN verification failed"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLoanDetails = createAsyncThunk(
  "loan/fetchLoanDetails",
  async ({ userId, loanId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_KSA_GET_LOAN_DETAILS}/borrowers/${userId}/loans/${loanId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch loan details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Initial state
const initialState = {
  registrationDetails: {
    mobileNumber: "",
    nationality: "",
    nationalId: "",
    day: "",
    month: "",
    year: "",
    agreed: false,
  },
  loanEstimate: {
    userId: "",
    maxLoanAmount: 0,
    emiMonthlyPayment: 0,
    tenure: 0,
  },
  AMLUserDetails: {
    firstNameEn: "",
    middleNameEn: "",
    lastNameEn: "",
    firstNameAr: "",
    middleNameAr: "",
    lastNameAr: "",
    gender: "",
    dateOfBirth: "",
    idType: "",
    idNumber: "",
    idExpiryDate: "",
    occupation: "",
    nationality: "",
    nationalityId: null,
    residenceDetails: {
      buildingNumber: "",
      streetName: "",
      city: "",
      cityId: null,
      postOfficeBox: "",
      neighborhood: "",
      additionalNumbers: "",
      rent: false,
      unitNumber: "",
      region: "",
      homeOwnership: "",
      residentialType: "",
    },
    totalMonthlyExpenses: 0.0,
    maritalDetails: {
      maritalStatus: "",
      noOfDomesticWorkers: 0,
      noOfChildren: 0,
      totalDependent: 0,
      noOfDependentsInPrivateSchools: 0,
      noOfDependentsInPublicSchools: 0,
      breadWinner: false,
    },
    registrationDate: "",
  },
  preEligibilityCompletion: {},
  salaryDetails: {
    totalSalary: 0,
    salaryPeriod: "",
    employerName: "",
    fullName: "",
    employeeId: "",
  },
  creditConsentData: {},
  loanOffers: {},
  submittedLoanResponse: {},
  loanDetails:{},
  loading: false,
  error: null,
};

const productTestingKSASlice = createSlice({
  name: "productTestingKSASlice",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { section, field, value, type, checked } = action.payload;
      // If section is provided, update specific field in that section
      if (section === "personalInfo") {
        state.personalInfo[field] = type === "checkbox" ? checked : value;
      } else if (section === "refinanceDetails") {
        state.refinanceDetails[field] = type === "checkbox" ? checked : value;
      } else if (section && state[section]) {
        state[section][field] = type === "checkbox" ? checked : value;
      }
    },
    updateOffer: (state, action) => {
      const { selectedOfferId, amount } = action.payload;

      function calculateEMI(principal, annualInterestRate, tenureInMonths) {
        const monthlyRate = annualInterestRate / (12 * 100); // Annual to monthly rate (decimal)
       
        return (
          (principal *
            monthlyRate *
            Math.pow(1 + monthlyRate, tenureInMonths)) /
          (Math.pow(1 + monthlyRate, tenureInMonths) - 1)
        );
      }

      state.loanOffers.dynamicCashLoanOffers =
        state.loanOffers.dynamicCashLoanOffers.map((offer) => {
          // if (offer.transactionId === selectedOfferId) {
            return {
              ...offer,
              principalAmount: amount,
              installmentSummaryResponse: offer.installmentSummaryResponse.map(
                (summary) => ({
                  ...summary,
                  totalRequiredAmount: calculateEMI(
                    amount,
                    offer.annualInterestRatePercent,
                    offer.durationInMonths
                  ),
                })
              ),
            };
          // }
          return offer;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generatePreEligibilityOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generatePreEligibilityOtp.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("OTP sent successfully");
      })
      .addCase(generatePreEligibilityOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch OTP failed";
        toast.error(`Failed to fetch OTP: ${action.payload}`);
      })
      .addCase(validatePreEligibilityOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpValidated = false;
      })
      .addCase(validatePreEligibilityOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpValidated = true;
        console.log(action.payload);
        state.registrationDetails = action.payload;
        toast.success("OTP validated successfully");
      })
      .addCase(validatePreEligibilityOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP validation failed";
        state.otpValidated = false;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(checkFinanceEligibility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkFinanceEligibility.fulfilled, (state, action) => {
        state.loading = false;
        state.loanEstimate = action.payload;
      })
      .addCase(checkFinanceEligibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Finance Eligibility Error: ${action.payload}`);
      })
      .addCase(verifyNafath.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyNafath.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.preEligibilityCompletion = action.payload; // Store response as needed
        toast.success("Nafath verification successful");
      })
      .addCase(verifyNafath.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Nafath verification failed";
        toast.error(`Error: ${state.error}`);
      })
      .addCase(getBorrowerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBorrowerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.AMLUserDetails = action.payload; // or any specific field
      })
      .addCase(getBorrowerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch user profile";
        toast.error(`User Profile Error: ${state.error}`);
      })
      .addCase(AMLStatusCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AMLStatusCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.AMLUserDetails = action.payload; // Save AML result if needed
        toast.success("AML check completed successfully");
      })
      .addCase(AMLStatusCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "AML check failed";
        toast.error(`AML Error: ${state.error}`);
      })
      .addCase(getBorrowerSalaryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBorrowerSalaryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.salaryDetails = action.payload; // Store the salary details
      })
      .addCase(getBorrowerSalaryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch salary details.";
      })
      .addCase(verifyBorrowerSalaryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyBorrowerSalaryDetails.fulfilled, (state, action) => {
        state.loading = false;
        // state.salaryVerificationResponse = action.payload;
        toast.success("Salary Verification done successfully");
      })
      .addCase(verifyBorrowerSalaryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Salary verification request failed.";
      })
      .addCase(getCreditConsent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCreditConsent.fulfilled, (state, action) => {
        state.loading = false;
        state.creditConsentData = action.payload;
        toast.success("Credit check done successfully");
      })
      .addCase(getCreditConsent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch credit consent data.";
      })
      .addCase(getLoanOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.loanOffers = action.payload;
      })
      .addCase(getLoanOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching loan offers";
      })
      .addCase(selectLoanOffer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectLoanOffer.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.submittedLoanResponse = action.payload;
      })
      .addCase(selectLoanOffer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to select loan offer";
      })
      .addCase(submitLoanApplication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLoanApplication.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.submittedLoanResponse = action.payload;
      })
      .addCase(submitLoanApplication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to submit loan application";
      })
      .addCase(verifyIban.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyIban.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("IBAN Verification done successfully");
      })
      .addCase(verifyIban.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateField, updateOffer } = productTestingKSASlice.actions;
export default productTestingKSASlice.reducer;
