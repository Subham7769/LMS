import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const postData = {
  msisdn: "966500666496",
  firstNameEn: "MOHAMMED",
  lastNameEn: "ABIDABRAHIM",
  middleNameEn: "MAHMOUD",
  firstNameAr: "محمد",
  lastNameAr: "عبيد ابراهيم",
  middleNameAr: "محمود",
  gender: "MALE",
  dateOfBirth: "1983-07-29",
  idType: "IQAMA ID",
  idNumber: "",
  idExpiryDate: "2030-08-24",
  nationality: "لبنان",
  nationalityId: 122,
  occupation: "N/A",
  residenceDetails: {
    buildingNumber: "4083",
    streetName: "اغادير",
    city: "الرياض",
    cityId: 85,
    neighborhood: "الملك عبد العزيز",
    postOfficeBox: "12233",
    additionalNumbers: "7787",
    unitNumber: "1",
    rent: true,
    homeOwnership: 0,
    residentialType: "VILLA",
  },
  maritalDetails: {
    maritalStatus: "MARRIED",
    noOfDomesticWorkers: 0,
    noOfChildren: 3,
    totalDependent: 5,
    breadWinner: true,
    noOfDependentsInPrivateSchools: "2",
    noOfDependentsInPublicSchools: "0",
  },
  totalMonthlyExpenses: 0.0,
  monthlyExpenses: {
    RE: 0.0,
    FLE: 0.0,
    TE: 0.0,
    CE: 0.0,
    UE: 0.0,
    EE: 0.0,
    HHE: 0.0,
    HCE: 0.0,
    IP: 0.0,
    EDT: 0.0,
    MR: 0.0,
    OMR: 0.0,
  },
};

// Async thunk to fetch user product testing data
export const getUserEligibility = createAsyncThunk(
  "productTesting/getUserEligibility",
  async ({ userID, url }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_USER_PRODUCT_TESTING}${userID}${url}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBorrowerInfo = createAsyncThunk(
  "borrower/getBorrowerInfo",
  async (userID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${import.meta.env.VITE_USER_PRODUCT_TESTING}${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...postData, idNumber: userID }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserLoanOptions = createAsyncThunk(
  "loanOptions/getUserLoanOptions",
  async (userID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING_REGISTRATION_RESULT_GET
        }${userID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          // body: JSON.stringify({ ...postData, idNumber: userID }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const submitLoanConfiguration = createAsyncThunk(
  "loanConfig/submitLoanConfiguration",
  async (
    { loanType, amount, branchName, userID, consumerType },
    { rejectWithValue }
  ) => {
    const postData1 = {
      loan_type: loanType,
      customer_type: consumerType,
      branchName,
      amount,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING_OFFERS
        }${userID}/loans/configurations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData1),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Define the asyncThunk
export const handleProceed = createAsyncThunk(
  "loan/handleProceed",
  async ({ transactionId, userID }, { rejectWithValue }) => {
    const postData = {
      transactionId: transactionId,
      contractNumber: "test18monthTenure",
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_SUBMIT_PUT_PERSONAL}${userID}/submit-loan`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      }

      const loanData = await response.json();
      return loanData.loanId; // Return loanId on success
    } catch (error) {
      return rejectWithValue(error); // Handle fetch or network errors
    }
  }
);

// Async Thunk for getting disbursement info
export const getDisbursementInfo = createAsyncThunk(
  "disbursement/getDisbursementInfo",
  async ({ userID, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING_OFFERS
        }${userID}/disbursement`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for token expiration or invalid token
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for handling disbursement status update
export const submitDisbursement = createAsyncThunk(
  "disbursement/submitDisbursement",
  async ({ userID, disbursementData, navigate }, { rejectWithValue }) => {
    const transID = disbursementData.loanId + "-reactivate";
    const postData = {
      loanId: disbursementData.loanId,
      status: true,
      transactionId: transID,
      activationType: 2,
      processDate: "2024-05-09 15:18:00",
      amount: disbursementData.principleAmount,
      reconciliationMethod: "mobile wallet",
    };

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING_PAYMENT
        }${userID}/disbursement-status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      // Handle error response
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      } else {
        setTimeout(() => {
          navigate("/loan/customer-care/" + userID + "/loan-payment-history");
        }, 1000);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Async Thunk for fetching repayment information
export const getRepaymentInfo = createAsyncThunk(
  "repayment/getRepaymentInfo",
  async ({ userID, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING_OFFERS
        }${userID}/loans/closure`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 500) {
          return rejectWithValue("No data found for this User Id");
        } else {
          const errorData = await response.json();
          return rejectWithValue(errorData.message || "Failed to get details");
        }
      }

      const data = await response.json();
      return data; // Successfully return the repayment data
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// AsyncThunk for handling repayment
export const submitRepayment = createAsyncThunk(
  "repayment/submitRepayment",
  async ({ userloanID, amount, userID, navigate }, { rejectWithValue }) => {
    const RtransID = "MANUAL_" + userloanID;
    const RinstID = userloanID + "-1";
    const postData = {
      requestId: null,
      loanId: userloanID,
      transactionId: RtransID,
      installmentId: RinstID,
      processDate: "2024-04-09 10:00:13",
      status: true,
      repaymentOriginator: "USER_PAYMENT",
      reconciliationMethod: "sariee transfer",
      payAll: true,
      serviceFeeRepayment: false,
      emiAmount: amount,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_USER_PRODUCT_TESTING_PAYMENT
        }${userID}/backend-repayments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get details");
      } else {
        setTimeout(() => {
          navigate("/loan/customer-care/" + userID + "/loan-payment-history");
        }, 1000);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//  AsyncThunk for Fetching User data
export const getBorrowerDetails = createAsyncThunk(
  "client/getBorrowerDetails",
  async (userID, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_BORROWER_INFO}${userID}`;

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
        return rejectWithValue(errorData || "Failed to get details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// AsyncThunk for updating User data
export const updateFamilyDetails = createAsyncThunk(
  "family/updateFamilyDetails",
  async ({ familyDetails, userID }, { dispatch, rejectWithValue }) => {
    const url = `${
      import.meta.env.VITE_USER_PRODUCT_TESTING
    }${userID}/borrower-profile`;
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ maritalDetails: familyDetails }),
      });

      // Check for empty response body
      const responseText = await response.text(); // get the response as text
      let data = null;

      // Only try to parse JSON if there is a response body
      if (responseText) {
        data = JSON.parse(responseText);
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData || "Failed to get details");
      }

      // Dispatch to fetch updated family details after successful update
      await dispatch(getBorrowerDetails(userID));

      // Return parsed data (or null if empty)
      return data;
    } catch (error) {
      // Catch and return the error
      return rejectWithValue(error);
    }
  }
);

// AsyncThunk for updating employment details
export const updateEmploymentDetails = createAsyncThunk(
  "client/updateEmploymentDetails",
  async ({ EmploymentDetails, userID }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const url2 = `${
      import.meta.env.VITE_USER_PRODUCT_TESTING
    }emp-test-info/${userID}`;

    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(EmploymentDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData || "Failed to get details");
      }

      // Dispatch to fetch updated family details after successful update
      await dispatch(getBorrowerDetails(userID));
    } catch (error) {
      return rejectWithValue(error); // Handle error in rejected case
    }
  }
);

const initialState = {
  eligibility: {},
  registrationDetails: {
    firstNameEn: "",
    lastNameEn: "",
    middleNameEn: "",
    firstNameAr: "",
    lastNameAr: "",
    middleNameAr: "",
    gender: "",
    dateOfBirth: "",
    idType: "",
    idNumber: "",
    idExpiryDate: "",
    nationality: "",
    nationalityId: "",
    occupation: "",
    residenceDetails: {
      buildingNumber: "",
      streetName: "",
      city: "",
      cityId: "",
      neighborhood: "",
      postOfficeBox: "",
      additionalNumbers: "",
      unitNumber: "",
      rent: "",
      homeOwnership: 0,
      residentialType: "VILLA",
    },
    maritalDetails: {
      maritalStatus: "",
      noOfDomesticWorkers: "",
      noOfChildren: "",
      totalDependent: "",
      breadWinner: "",
      noOfDependentsInPrivateSchools: "",
      noOfDependentsInPublicSchools: "",
    },
    totalMonthlyExpenses: 0.0,
    monthlyExpenses: {
      RE: 0.0,
      FLE: 0.0,
      TE: 0.0,
      CE: 0.0,
      UE: 0.0,
      EE: 0.0,
      HHE: 0.0,
      HCE: 0.0,
      IP: 0.0,
      EDT: 0.0,
      MR: 0.0,
      OMR: 0.0,
    },
  },
  register: {},
  loanOptions: [],
  loanConfigFields: {
    loanType: "",
    amount: "",
    branchName: "",
  },
  loanConfigData: {},
  disbursementData: {
    loanId: "",
    principleAmount: "",
  },
  repaymentData: [],
  loanIdOptions: [],
  familyDetails: {
    maritalStatus: "",
    noOfDomesticWorkers: "",
    noOfChildren: "",
    totalDependent: "",
    noOfDependentsInPrivateSchools: "",
    noOfDependentsInPublicSchools: "",
    breadWinner: false,
  },
  EmploymentDetails: {
    fullName: "",
    basicWage: "",
    housingAllowance: "",
    employerName: "",
    workingMonths: "",
    employmentStatus: "",
    establishmentActivity: "",
  },
  loanId: "",
  consumerType: "",
  showModal: false,
  loading: false,
  error: null,
};

const productTestingSlice = createSlice({
  name: "productTesting",
  initialState,
  reducers: {
    updateRegistrationDetailsField: (state, action) => {
      const { name, value } = action.payload;

      if (name.startsWith("residenceDetails.")) {
        const nestedField = name.split(".")[1];
        state.registrationDetails.residenceDetails[nestedField] = value;
      } else if (name.startsWith("maritalDetails.")) {
        const nestedField = name.split(".")[1];
        state.registrationDetails.maritalDetails[nestedField] = value;
      } else {
        // Handle top-level fields
        state.registrationDetails[name] = value;
      }
    },

    updateLoanConfigFieldsField: (state, action) => {
      const { name, value } = action.payload;
      state.loanConfigFields[name] = value; // Dynamically update the field in loanConfigFields
    },
    updateDisbursementData: (state, action) => {
      const { name, value } = action.payload;
      state.disbursementData[name] = value; // Dynamically update the field in loanConfigFields
    },
    updateFamilyDetailsField: (state, action) => {
      const { name, value } = action.payload;
      state.familyDetails[name] = value;
    },
    updateEmploymentDetailsField: (state, action) => {
      const { name, value } = action.payload;
      state.EmploymentDetails[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserEligibility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserEligibility.fulfilled, (state, action) => {
        state.loading = false;
        state.eligibility = action.payload;
      })
      .addCase(getUserEligibility.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getBorrowerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBorrowerInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(getBorrowerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getUserLoanOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.showModal = false;
        state.loanOptions = [];
        state.loanConfigFields = initialState.loanConfigFields; // Reset loanConfigFields
      })
      .addCase(getUserLoanOptions.fulfilled, (state, action) => {
        state.loading = false;

        const { registrationResults } = action.payload;
        const eligibleProjects = registrationResults.projects.filter(
          (project) => project.isRegister
        );

        // Check if borrowerType is PERSONAL_BORROWER
        if (registrationResults.borrowerType === "PERSONAL_BORROWER") {
          // Filter eligible projects
          // Extract loan products where customerType is CONSUMER
          const loanOptions = eligibleProjects.flatMap(({ loanProducts }) =>
            loanProducts
              .filter((product) => product.customerType === "CONSUMER") // Only include CONSUMER products
              .map((product) => ({
                value: product.productName,
                label: product.productName
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
              }))
          );

          state.loanOptions = loanOptions;
          state.consumerType = "CONSUMER";
        } else {
          // If borrowerType is not PERSONAL_BORROWER, set loanOptions to an empty array
          const loanOptions = eligibleProjects.flatMap(({ loanProducts }) =>
            loanProducts
              .filter((product) => product.customerType === "CORPORATE") // Only include CONSUMER products
              .map((product) => ({
                value: product.productName,
                label: product.productName
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase()),
              }))
          );

          state.loanOptions = loanOptions;
          state.consumerType = "CORPORATE";
        }
      })
      .addCase(getUserLoanOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(`API Error : ${action.payload}`);
      })
      .addCase(submitLoanConfiguration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLoanConfiguration.fulfilled, (state, action) => {
        state.loading = false;
        state.loanConfigData = action.payload;
        state.showModal = true;
      })
      .addCase(submitLoanConfiguration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(handleProceed.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(handleProceed.fulfilled, (state, action) => {
        state.loading = false;
        state.loanId = action.payload; // Set loanId from the successful request
      })
      .addCase(handleProceed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getDisbursementInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisbursementInfo.fulfilled, (state, action) => {
        state.loading = false;
        // if (action.payload.status !== 500) {
        state.disbursementData = action.payload;
        // }
      })
      .addCase(getDisbursementInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(submitDisbursement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDisbursement.fulfilled, (state) => {
        state.loading = false;
        toast.success("Disbursement Submitted Successfully");
      })
      .addCase(submitDisbursement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getRepaymentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRepaymentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.repaymentData = action.payload;
        state.loanIdOptions = action.payload.map(({ loanId }) => ({
          value: loanId,
          label: loanId,
        }));
      })
      .addCase(getRepaymentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(submitRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRepayment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Repayment Submitted Successfully");
      })
      .addCase(submitRepayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getBorrowerDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBorrowerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.familyDetails = {
          ...state.familyDetails,
          ...action.payload?.borrowerProfile?.maritalDetails,
        };
        state.EmploymentDetails = {
          ...state.familyDetails,
          ...action.payload?.recentGosiData?.employmentStatusInfo[0],
        };
        // console.log(action.payload?.recentGosiData?.employmentStatusInfo[0])
        state.error = null;
      })
      .addCase(getBorrowerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateFamilyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFamilyDetails.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        toast.success("Family Details Updated Successfully");
      })
      .addCase(updateFamilyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateEmploymentDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEmploymentDetails.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        toast.success("Employment Details Updated Successfully");
      })
      .addCase(updateEmploymentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  updateRegistrationDetailsField,
  updateLoanConfigFieldsField,
  updateDisbursementData,
  updateFamilyDetailsField,
  updateEmploymentDetailsField,
} = productTestingSlice.actions;
export default productTestingSlice.reducer;
