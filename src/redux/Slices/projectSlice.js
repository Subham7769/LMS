// redux/slices/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { HeaderList, ProjectList } from "../../data/ProjectData";

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
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
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
  async ({ projectData, projectId, clientIdsString }, { rejectWithValue }) => {
    const formattedStartDate =
      new Date(projectData.startDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const formattedEndDate =
      new Date(projectData.endDate).toISOString().slice(0, 10) + ` 00:00:00`;
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
      ...filteredprojectData
    } = projectData;

    const postData = {
      ...filteredprojectData,
      clientIds: clientIdsString.split(","),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      projectTimeZone: projectData.projectTimeZone,
      paymentOption: projectData.paymentOption,
      bearers: projectData.bearers,
      projectId: projectId,
      criteria: `tcl ${projectData.tclOperator} ${
        projectData.tclAmount
      } and loanAmount ${projectData.minLoanOperator} ${
        projectData.minLoanAmount
      } and loanAmount ${projectData.maxLoanOperator} ${
        projectData.maxLoanAmount
      } and numberOfInstallments ${projectData.minInstallmentsOperator} ${
        projectData.minInstallmentsAmount
      } and numberOfInstallments ${projectData.maxInstallmentsOperator} ${
        projectData.maxInstallmentsAmount
      } and freqCap ${projectData.openLoanOperator} ${
        projectData.openLoanAmount
      }${
        projectData.loanType === "asset"
          ? ` and downPaymentPercentage ${projectData.downPaymentOperator} ${projectData.downPaymentPercentage}`
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
        console.log(errorData.message);
        return rejectWithValue(
          errorData.message || "Failed to update the project"
        );
      }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update the project");
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async ({ projectData, clientIdsString }, { rejectWithValue, dispatch }) => {
    const formattedStartDate =
      new Date(projectData.startDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const formattedEndDate =
      new Date(projectData.endDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);

    if (endDateObj < startDateObj) {
      toast.error("End date cannot be earlier than start date.");
      return rejectWithValue(
        "Validation Error: End date cannot be earlier than start date."
      );
    }

    // const requiredFields = [
    //   "startDate",
    //   "endDate",
    //   "currencyName",
    //   "interestRatePeriod",
    //   "country",
    //   "location",
    //   "projectDescription",
    //   "interestPeriodUnit",
    //   "loanType",
    //   "lateRepaymentPenalty",
    //   "earlyRepaymentDiscount",
    //   "maxPaymentAttempts",
    //   "serviceFee",
    //   "downRepaymentGracePeriod",
    //   "emiRepaymentGracePeriod",
    //   "loanGracePeriod",
    //   "rollOverGracePeriod",
    //   // "rollOverPenaltyFee",
    //   "lateEmiPenaltyFactor",
    //   "name",
    //   "managementFee",
    //   "vatFee",
    // ];

    // for (const field of requiredFields) {
    //   if (!projectData[field]) {
    //     toast.error(
    //       `Please fill in ${field.replace(/([A-Z])/g, " $1").trim()}.`
    //     );
    //     return rejectWithValue(`Validation Error: ${field}`);
    //   }
    // }

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
      ...filteredprojectData
    } = projectData;

    const postData = {
      ...filteredprojectData,
      clientIds: clientIdsString.split(","),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      projectTimeZone: "GMT-180",
      paymentOption: ["mobile wallet", "top up", "credit card"],
      bearers: ["SMS", "USSD"],
      criteria: `tcl ${projectData.tclOperator} ${
        projectData.tclAmount
      } and loanAmount ${projectData.minLoanOperator} ${
        projectData.minLoanAmount
      } and loanAmount ${projectData.maxLoanOperator} ${
        projectData.maxLoanAmount
      } and numberOfInstallments ${projectData.minInstallmentsOperator} ${
        projectData.minInstallmentsAmount
      } and numberOfInstallments ${projectData.maxInstallmentsOperator} ${
        projectData.maxInstallmentsAmount
      } and freqCap ${projectData.openLoanOperator} ${
        projectData.openLoanAmount
      }${
        projectData.loanType === "asset"
          ? ` and downPaymentPercentage ${projectData.downPaymentOperator} ${projectData.downPaymentPercentage}`
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
        const errorMessage = await response.json();
        return rejectWithValue(
          errorMessage.message || "Failed to create project."
        );
      }

      const data = await response.json();
      return data;
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

export const fetchList = createAsyncThunk(
  "project/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const projectMenu = sideBarState?.menus.find(
      (menu) => menu.title === "Loan Schema"
    );
    const submenuItems = projectMenu ? projectMenu.submenuItems : [];
    return submenuItems;
  }
);

const InitialState = {
  projectStatsData: {
    HeaderList,
    ProjectList,
  },
  projectData: {
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
    // rollOverPenaltyFee: "",
    rollOverInterestRate: "",
    rollOverTenure: "",
    rollOverTenureType: "",
    lateEmiPenaltyFactor: "",
    latePenaltyPeriod: "",
    maxPaymentAttempts: "",
    startDate: "",
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
    minLoanOperator: ">=",
    minLoanAmount: "",
    maxLoanOperator: "<=",
    maxLoanAmount: "",
    tclOperator: "<=",
    minInstallmentsOperator: ">=",
    minInstallmentsAmount: "",
    maxInstallmentsOperator: "<=",
    maxInstallmentsAmount: "",
    downPaymentOperator: "<=",
    downPaymentWay: "",
    downPaymentPercentage: "",
    openLoanOperator: "<=",
    openLoanAmount: "",
  },
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState: InitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProjectData: (state, action) => {
      const { name, value } = action.payload;
      state.projectData[name] = value;
    },
    resetProjectData: (state) => {
      state.projectData = InitialState.projectData;
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    handleChangeInProjectData: (state, action) => {
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

      state.projectData[name] = updatedValue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true; // Data is being fetched
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        // If action.payload has fewer or equal objects than ProjectList, only map action.payload

        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          // createdOn: ProjectList[index]?.createdOn || "14/09/2022",
          // openLoans: ProjectList[index]?.openLoans || "1490",
          // totalDisbursedPrincipal:
          //   ProjectList[index]?.totalDisbursedPrincipal || "$750M",
          // status: ProjectList[index]?.status || "Active",
        }));

        // Assign the updatedList to ProjectList
        state.projectStatsData.ProjectList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
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
        state.projectData = {
          ...state.projectData,
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
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.loading = false;
        toast.success("Project details updated");
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        toast.success("Project deleted successfully!");
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Project created");
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setLoading,
  setProjectData,
  resetProjectData,
  setError,
  parseCriteria,
  handleChangeInProjectData,
} = projectSlice.actions;
export default projectSlice.reducer;
