import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const postData = {
  msisdn: "966500666496",
  firstNameEn: "MOHAMMED",
  lastNameEn: "ABIDABRAHIM",
  middleNameEn: "MAHMOUD",
  firstNameAr: "محمد",
  lastNameAr: "عبيد ابراهيم",
  middleNameAr: "محمود",
  gender: "M",
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
    maritalStatus: "Married",
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
  "userProductTesting/getUserEligibility",
  async ({ userID, url }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios({
        method: "POST",
        url: `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/${userID}${url}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        return rejectWithValue("User not found");
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized access");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getBorrowerInfo = createAsyncThunk(
  "borrower/getBorrowerInfo",
  async (userID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios({
        method: "PUT",
        url: `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/${userID}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { ...postData, idNumber: userID },
      });

      // Handle specific status codes
      if (response.status === 404) {
        return rejectWithValue("User Not Found");
      } else if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized");
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserLoanOptions = createAsyncThunk(
  "loanOptions/getUserLoanOptions",
  async (userID, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/${userID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ ...postData, idNumber: userID }),
        }
      );

      if (response.status === 404) {
        return rejectWithValue("User Not Found");
      }

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized");
      }

      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitLoanConfiguration = createAsyncThunk(
  "loanConfig/submitLoanConfiguration",
  async ({ loanType, amount, userID }, { rejectWithValue }) => {
    const postData1 = {
      loan_type: loanType,
      customer_type: "CONSUMER",
      amount,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/${userID}/loans/configurations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData1),
        }
      );

      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      return rejectWithValue(error.message);
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
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/${userID}/disbursement`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for token expiration or invalid token
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        navigate("/login");
        return rejectWithValue("Unauthorized or Forbidden access.");
      }

      const json = await response.json();
      return json; // Return disbursement data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async Thunk for handling disbursement status update
export const submitDisbursement = createAsyncThunk(
  "disbursement/submitDisbursement",
  async ({ userID, formData, navigate }, { rejectWithValue }) => {
    const transID = formData.userloanID + "-reactivate";
    const postData = {
      loanId: formData.userloanID,
      status: true,
      transactionId: transID,
      activationType: 2,
      processDate: "2024-05-09 15:18:00",
      amount: formData.amount,
      reconciliationMethod: "mobile wallet",
    };

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-payment-service/lmscarbon/api/v1/borrowers/${userID}/disbursement-status`,
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
      if (response.status === 400) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      if (response.status === 202) {
        setTimeout(() => {
          navigate("/borrower/" + userID + "/loanNpayment");
        }, 1000);
        return "Disbursement done Successfully !!";
      }
      
    } catch (error) {
      return rejectWithValue(error.message);
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
        `https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/${userID}/loans/closure`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for token expiration or invalid token
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return rejectWithValue("Unauthorized access. Redirecting to login.");
      }

      if (response.status === 404) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      if (response.status === 500) {
        return rejectWithValue("No data found for this User Id");
      }

      const data = await response.json();
      return data; // Successfully return the repayment data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// AsyncThunk for handling repayment
export const submitRepayment = createAsyncThunk(
  "repayment/submitRepayment",
  async ({ userloanID, amount, userID,navigate }, { rejectWithValue }) => {
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
        `https://api-test.lmscarbon.com/carbon-payment-service/lmscarbon/api/v1/borrowers/${userID}/backend-repayments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (response.status === 400 || response.status === 404) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      if (response.status === 202) {
        setTimeout(() => {
          navigate("/borrower/" + userID + "/loanNpayment");
        }, 1000);
        return "Repayment done Successfully !!";
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//  AsyncThunk for Fetching User data
export const getBorrowerDetails = createAsyncThunk(
  "client/getBorrowerDetails",
  async (userID, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/${userID}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// AsyncThunk for updating User data
export const updateFamilyDetails = createAsyncThunk(
  "family/updateFamilyDetails",
  async ({ familyDetails, userID }, { dispatch, rejectWithValue }) => {
    const url = `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/${userID}/borrower-profile`;
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
        return rejectWithValue(data || { message: "Failed to update data" });
      }

      // Dispatch to fetch updated family details after successful update
      await dispatch(getBorrowerDetails(userID));

      // Return parsed data (or null if empty)
      return data;
    } catch (error) {
      // Catch and return the error
      return rejectWithValue(error.message);
    }
  }
);

// AsyncThunk for updating employment details
export const updateEmploymentDetails = createAsyncThunk(
  "client/updateEmploymentDetails",
  async ({ EmploymentDetails, userID }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const url2 = `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/emp-test-info/${userID}`;

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Dispatch to fetch updated family details after successful update
      await dispatch(getBorrowerDetails(userID));

      return await response.json();  // Return updated data or any success message
    } catch (error) {
      return rejectWithValue(error.message);  // Handle error in rejected case
    }
  }
);


const initialState = {
  eligibility: {},
  register: {},
  loanOptions: [],
  loanConfigData: {},
  disbursementData: {},
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
  showModal: false,
  loading: false,
  error: null,
};

const userProductTestingSlice = createSlice({
  name: "userProductTesting",
  initialState,
  reducers: {
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(getUserLoanOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserLoanOptions.fulfilled, (state, action) => {
        state.loading = false;
        const eligibleProjects =
          action.payload.registrationResults.projects.filter(
            (project) => project.isRegister
          );
        state.loanOptions = eligibleProjects.map(({ loanProducts }) => ({
          value: loanProducts[0].productName,
          label: loanProducts[0].productName.replace(/_/g, " "),
        }));
      })
      .addCase(getUserLoanOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
      })
      .addCase(getDisbursementInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisbursementInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.disbursementData = action.payload;
      })
      .addCase(getDisbursementInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitDisbursement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitDisbursement.fulfilled, (state) => {
        state.loading = false;
        console.log(action.payload)
      })
      .addCase(submitDisbursement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        state.error = action.error.message;
      })
      .addCase(submitRepayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRepayment.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(submitRepayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
        console.log(action.payload?.recentGosiData?.employmentStatusInfo[0])
        state.error = null;
      })
      .addCase(getBorrowerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateFamilyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFamilyDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      })
      .addCase(updateFamilyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });
  },
});

export const { updateFamilyDetailsField, updateEmploymentDetailsField } =
  userProductTestingSlice.actions;
export default userProductTestingSlice.reducer;
