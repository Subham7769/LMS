// redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const formattedDate = (date) => {
  return date.substring(0, 10);
};

// Define async thunks for fetching data and performing actions
export const fetchData = createAsyncThunk(
  "project/fetchName",
  async (projectId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("projectToken");
      const response = await fetch(
        `${import.meta.env.VITE_PROJECT_READ}${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401 || response.status === 403) {
        localStorage.clear();
        return rejectWithValue("Unauthorized");
      }
      const data = await response.json();
      data.startDate = formattedDate(data.startDate);
      data.endDate = formattedDate(data.endDate);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProject = createAsyncThunk(
  "project/updateProject",
  async ({ formData, projectId, clientIdsString }, { rejectWithValue }) => {
    const formattedStartDate =
      new Date(formData.startDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const formattedEndDate =
      new Date(formData.endDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);

    if (endDateObj < startDateObj) {
      toast.error("End date cannot be earlier than start date.");
      return rejectWithValue(
        "Validation Error: End date cannot be earlier than start date."
      );
    }

    const {
      tclAmount,
      minLoanOperator,
      minLoanAmount,
      maxLoanOperator,
      maxLoanAmount,
      tclOperator,
      minInstallmentsOperator,
      minInstallmentsAmount,
      maxInstallmentsOperator,
      maxInstallmentsAmount,
      downPaymentOperator,
      downPaymentWay,
      openLoanOperator,
      downPaymentPercentage,
      openLoanAmount,
      entityCreationDate,
      ...filteredFormData
    } = formData;

    const postData = {
      ...filteredFormData,
      clientIds: clientIdsString.split(","),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      projectTimeZone: formData.projectTimeZone,
      paymentOption: formData.paymentOption,
      bearers: formData.bearers,
      projectId: projectId,
      criteria: `tcl ${formData.tclOperator} ${
        formData.tclAmount
      } and loanAmount ${formData.minLoanOperator} ${
        formData.minLoanAmount
      } and loanAmount ${formData.maxLoanOperator} ${
        formData.maxLoanAmount
      } and numberOfInstallments ${formData.minInstallmentsOperator} ${
        formData.minInstallmentsAmount
      } and numberOfInstallments ${formData.maxInstallmentsOperator} ${
        formData.maxInstallmentsAmount
      } and freqCap ${formData.openLoanOperator} ${formData.openLoanAmount}${
        formData.loanType === "asset"
          ? ` and downPaymentPercentage ${formData.downPaymentOperator} ${formData.downPaymentPercentage}`
          : ""
      }`,
    };

    try {
      const authToken = localStorage.getItem("projectToken");
      const response = await fetch(`${import.meta.env.VITE_PROJECT_UPDATE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
        console.log(errorData.message);
        return rejectWithValue(
          errorData.message || "Failed to update the project"
        );
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update the project");
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ formData, clientIdsString }, { rejectWithValue, dispatch }) => {
    const formattedStartDate =
      new Date(formData.startDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const formattedEndDate =
      new Date(formData.endDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);

    if (endDateObj < startDateObj) {
      toast.error("End date cannot be earlier than start date.");
      return rejectWithValue(
        "Validation Error: End date cannot be earlier than start date."
      );
    }

    const requiredFields = [
      "startDate",
      "endDate",
      "currencyName",
      "interestRatePeriod",
      "country",
      "location",
      "projectDescription",
      "interestPeriodUnit",
      "loanType",
      "lateRepaymentPenalty",
      "earlyRepaymentDiscount",
      "maxPaymetAttemps",
      "serviceFee",
      "downRepaymentGracePeriod",
      "emiRepaymentGracePeriod",
      "loanGracePeriod",
      "rollOverGracePeriod",
      "rollOverPenaltyFee",
      "lateEmiPenaltyFactor",
      "name",
      "managementFee",
      "vatFee",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").trim()}.`
        );
        return rejectWithValue(`Validation Error: ${field}`);
      }
    }

    const {
      tclAmount,
      minLoanOperator,
      minLoanAmount,
      maxLoanOperator,
      maxLoanAmount,
      tclOperator,
      minInstallmentsOperator,
      minInstallmentsAmount,
      maxInstallmentsOperator,
      maxInstallmentsAmount,
      downPaymentOperator,
      downPaymentWay,
      openLoanOperator,
      downPaymentPercentage,
      openLoanAmount,
      ...filteredFormData
    } = formData;

    const postData = {
      ...filteredFormData,
      clientIds: clientIdsString.split(","),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      projectTimeZone: "GMT-180",
      paymentOption: ["mobile wallet", "top up", "credit card"],
      bearers: ["SMS", "USSD"],
      criteria: `tcl ${formData.tclOperator} ${
        formData.tclAmount
      } and loanAmount ${formData.minLoanOperator} ${
        formData.minLoanAmount
      } and loanAmount ${formData.maxLoanOperator} ${
        formData.maxLoanAmount
      } and numberOfInstallments ${formData.minInstallmentsOperator} ${
        formData.minInstallmentsAmount
      } and numberOfInstallments ${formData.maxInstallmentsOperator} ${
        formData.maxInstallmentsAmount
      } and freqCap ${formData.openLoanOperator} ${formData.openLoanAmount}${
        formData.loanType === "asset"
          ? ` and downPaymentPercentage ${formData.downPaymentOperator} ${formData.downPaymentPercentage}`
          : ""
      }`,
    };

    try {
      const projectToken = localStorage.getItem("projectToken");
      const response = await fetch(`${import.meta.env.VITE_PROJECT_CREATE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${projectToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        return rejectWithValue(errorMessage || "Failed to create project.");
      }

      const data = await response.json();

      return data; // Return data to handle the response in the component if needed
    } catch (error) {
      console.error("Error creating project:", error);
      return rejectWithValue(error.message || "Failed to create project.");
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async ({ projectId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PROJECT_DELETE}${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to delete the item"
        );
      }

      // Optionally, return some data or a status code here
      return projectId;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete the item");
    }
  }
);

const projectInitialState = {
  formData: {
    name: "",
    projectDescription: "",
    country: "",
    location: "",
    currencyName: "",
    loanType: "",
    flatInterestRate: "",
    interestRatePeriod: "",
    interestPeriodUnit: "",
    downRepaymentGracePeriod: "",
    emiRepaymentGracePeriod: "",
    loanGracePeriod: "",
    rollOverGracePeriod: "",
    rollOverPenaltyFactor: "",
    rollOverPenaltyFee: "",
    rollOverInterestRate: "",
    lateEmiPenaltyFactor: "",
    maxPaymetAttemps: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    lateRepaymentPenalty: "",
    earlyRepaymentDiscount: "",
    serviceFee: "",
    calculateInterest: false,
    hasEarlyLateRepayment: false,
    hasDownPayment: false,
    tclIncludeFee: true,
    tclIncludeInterest: true,
    managementFee: "",
    tclRef: "",
    vatFee: "",
    clientIds: [],
    tclAmount: "",
    minLoanOperator: "",
    minLoanAmount: "",
    maxLoanOperator: "",
    maxLoanAmount: "",
    tclOperator: "",
    minInstallmentsOperator: "",
    minInstallmentsAmount: "",
    maxInstallmentsOperator: "",
    maxInstallmentsAmount: "",
    downPaymentOperator: "",
    downPaymentWay: "",
    downPaymentPercentage: "",
    openLoanOperator: "",
    openLoanAmount: "",
  },
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState: projectInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetFormData: (state) => {
      state.formData = projectInitialState.formData;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    handleChangeInFormData: (state, action) => {
      const { name, value, checked, type } = action.payload;
      const positiveIntegerFields = [
        "interestRatePeriod",
        "downRepaymentGracePeriod",
        "emiRepaymentGracePeriod",
        "loanGracePeriod",
        "rollOverGracePeriod",
      ];

      let updatedValue;

      if (type === "checkbox") {
        updatedValue = checked;
      } else {
        if (positiveIntegerFields.includes(name)) {
          if (value !== "" && !/^[0-9]\d*$/.test(value)) {
            // You can handle validation error here or outside in your component
            return;
          }
        }
        updatedValue = value;
      }

      state.formData[name] = updatedValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        const data = action.payload;
        const criteria = data.criteria;
        const regex = /(\w+)\s*(<=|>=|<|>|==)\s*(\d+)/g;
        let match;
        const results = {};

        while ((match = regex.exec(criteria)) !== null) {
          const [_, field, operator, amount] = match;
          if (!results[field]) {
            results[field] = [];
          }
          results[field].push({ operator, amount });
        }
        state.loading = false;
        state.formData = {
          ...action.payload,
          minLoanOperator: results.loanAmount?.[0]?.operator || "",
          minLoanAmount: results.loanAmount?.[0]?.amount || "",
          maxLoanOperator: results.loanAmount?.[1]?.operator || "",
          maxLoanAmount: results.loanAmount?.[1]?.amount || "",
          minInstallmentsOperator:
            results.numberOfInstallments?.[0]?.operator || "",
          minInstallmentsAmount:
            results.numberOfInstallments?.[0]?.amount || "",
          maxInstallmentsOperator:
            results.numberOfInstallments?.[1]?.operator || "",
          maxInstallmentsAmount:
            results.numberOfInstallments?.[1]?.amount || "",
          tclOperator: results.tcl?.[0]?.operator || "",
          tclAmount: results.tcl?.[0]?.amount || "",
          openLoanOperator: results.freqCap?.[0]?.operator || "",
          openLoanAmount: results.freqCap?.[0]?.amount || "",
          downPaymentPercentage:
            results.downPaymentPercentage?.[0].amount || "",
          downPaymentOperator:
            results.downPaymentPercentage?.[0].operator || "",
        };
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        toast.success("Project deleted successfully!");
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.rejected, (state, action) => {
        toast.error("Failed to delete project");
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload;

        // Update state with created project details if needed
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setLoading,
  setFormData,
  resetFormData,
  setError,
  parseCriteria,
  handleChangeInFormData,
} = projectSlice.actions;
export default projectSlice.reducer;
