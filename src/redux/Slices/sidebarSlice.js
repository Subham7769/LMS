import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenusInitial } from "../../data/MenuData";
import axios from "axios";
import { toast } from "react-toastify";
import convertToTitleCase from "../../utils/convertToTitleCase";

const useFetchData = async (url, transformData, options = {}) => {
  const {
    tokenKey = "authToken",
    redirectPath = "/login",
    tokenUrl = null,
  } = options;

  let token = localStorage.getItem(tokenKey);

  if (tokenUrl) {
    try {
      const tokenResponse = await axios.get(tokenUrl);
      token = tokenResponse.data.value;
      localStorage.setItem("projectToken", token);
    } catch (error) {
      console.error("Error fetching token:", error);
      return Promise.reject("Token fetch failed");
    }
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem(tokenKey);
      window.location.href = redirectPath;
      return Promise.reject("Unauthorized");
    }

    const result = response.data;
    const transformedData = transformData(result);
    return transformedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return Promise.reject(error || "Data fetch failed");
  }
};

export const fetchRACData = createAsyncThunk(
  "fetchRACData",
  async (_, { rejectWithValue }) => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/";
    const transformData = (data) => {
      return data.map(({ name, racId }) => ({
        name,
        href: "/loan/rac/" + racId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRecoveryData = createAsyncThunk(
  "fetchRecoveryData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_RECOVERY_READ_ALL_RECOVERY}`;
    const transformData = (data) => {
      return data.map(({ name, recoveryEquationTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/recovery/" + recoveryEquationTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchAffordibilityData = createAsyncThunk(
  "fetchAffordibilityData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_AFFORDABILITY_READ_ALL_CRITERIA}`;
    const transformData = (data) => {
      return data.map(({ name, affordabilityCriteriaTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/affordability/" + affordabilityCriteriaTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchLoanApprovalData = createAsyncThunk(
  "fetchLoanApprovalData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_LOAN_APPROVAL_READ_ALL_CONFIGURATION}`;
    const transformData = (data) => {
      return data.map(({ name, approvalsConfigurationsTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/loan-approval/" + approvalsConfigurationsTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDocumentConfigData = createAsyncThunk(
  "fetchDocumentConfigData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_DOCUMENT_CONFIG_READ_ALL_TEMP}`;
    const transformData = (data) => {
      return data.map(({ name, dynamicDocumentTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/document-config/" + dynamicDocumentTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTCLData = createAsyncThunk(
  "fetchTCLData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_TCL_READ_ALL_TCL}`;
    const transformData = (data) => {
      return data.map(({ tclId, tclName }) => ({
        name: tclName.replace(/_/g, " "),
        href: "/loan/tcl/" + tclId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProjectData = createAsyncThunk(
  "project/fetchProjectData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_PROJECT_READ_ALL_PROJECT}`;
    const tokenUrl = `${import.meta.env.VITE_PROJECT_READ_PROJECT_TOKEN}`;
    const transformData = (data) => {
      return data.map(({ name, projectId }) => ({
        name,
        href: "/loan/project/" + projectId,
      }));
    };
    try {
      return await useFetchData(url, transformData, { tokenUrl });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_PRODUCT_READ_ALL_PRODUCT}`;
    const transformData = (data) => {
      return data.map(
        ({
          productType,
          projectId,
          loanProductId,
          eligibleCustomerType,
          interestEligibleTenure,
        }) => ({
          name: convertToTitleCase(productType),
          href: `/loan/loan-product/${productType}/loan-product-config/${projectId}/${loanProductId}`,
          customerType: convertToTitleCase(eligibleCustomerType),
          loanSchema: projectId,
          eligbleTenure: interestEligibleTenure.length,
        })
      );
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCreditScoreEligibleTenureData = createAsyncThunk(
  "fetchCreditScoreEligibleTenureData",
  async (_, { rejectWithValue }) => {
    const url = `${
      import.meta.env.VITE_CREDIT_SCORE_ELIGIBLE_TENURE_READ_ALL_TENURE
    }`;
    const transformData = (data) => {
      return data.map(({ name, creditScoreEtTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/credit-score-eligible-tenure/" + creditScoreEtTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDBRData = createAsyncThunk(
  "fetchDBRData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_DBR_READ_ALL_DBR}`;
    const transformData = (data) => {
      return data.map(({ name, dbcTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/dbr-config/" + dbcTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchBEData = createAsyncThunk(
  "fetchBEData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_BLOCKED_EMPLOYER_READ_ALL_BE}`;
    const transformData = (data) => {
      return data.map(({ name, blockEmployerTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/blocked-employer/" + blockEmployerTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCreditScoreEqData = createAsyncThunk(
  "fetchCreditScoreEqData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_CREDIT_SCORE_READ_ALL_CS}`;
    const transformData = (data) => {
      return data.map(({ creditScoreEqTempId, name }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/credit-score/" + creditScoreEqTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRulePolicyData = createAsyncThunk(
  "fetchRulePolicyData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_RULE_POLICY_READ_ALL_RP}`;
    const transformData = (data) => {
      return data.map(({ rulePolicyTempId, name }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/rule-policy/" + rulePolicyTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProdGroupData = createAsyncThunk(
  "fetchProdGroupData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_PRODUCT_GROUP_READ_ALL_PRODUCT_GROUP}`;
    const transformData = (data) => {
      const ProdDetailsArray = Array.isArray(data) ? data : [data];
      return ProdDetailsArray.map(({ configName, configId }) => ({
        name: configName.replace(/-/g, " "),
        href: "/loan/product-group/" + configId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchDynamicRacData = createAsyncThunk(
  "fetchDynamicRacData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_DYNAMIC_RAC_READ_ALL_RAC}`;

    // Function to transform the fetched data
    const transformData = (data) => {
      return data.map((item) => {
        const transformedItem = {
          name: item.racDetails.name.replace(/-/g, " "), // Transform the name if needed
          href: "/loan/dynamic-rac/" + item.racDetails.racId, // Construct href for navigation
          sections: item.sections,
        };
        return transformedItem;
      });
    };

    try {
      // Fetch data and transform it
      const data = await useFetchData(url, transformData);
      return data; // Transform the fetched data
    } catch (error) {
      return rejectWithValue(error); // Handle errors
    }
  }
);

export const fetchReportingConfigData = createAsyncThunk(
  "reportingConfig/fetchReportingConfigData",
  async (_, { rejectWithValue }) => {
    const url = `${import.meta.env.VITE_REPORTING_CONFIG_READ_ALL_RC}`;

    const transformData = (data) => {
      return data.map(({ name }) => ({
        name: name.replace(/-/g, " "),
        href: "/loan/reporting-config/" + name,
      }));
    };

    try {
      // Call useFetchData to fetch the data and transform it
      return await useFetchData(url, transformData);
    } catch (error) {
      // Handle errors and reject with value
      return rejectWithValue(error);
    }
  }
);

const ROLE_CREDITOR_ADMIN = [
  "Home",
  "RAC",
  "Recovery",
  "Affordability",
  "TCL",
  "Loan Schema",
  "Loan Product",
  "Eligible Tenure",
  "DBR Config",
  "Credit Score",
  "Rule Policy",
  "Product Group",
  "Business Rule",
  "Global Config",
  "Dynamic RAC",
];
const ROLE_CUSTOMER_CARE_MANAGER = ["Customer Care"];
const ROLE_CUSTOMER_CARE_USER = ["Customer Care"];
const ROLE_MAKER_ADMIN = [
  "Home",
  "RAC",
  "Recovery",
  "Affordability",
  "TCL",
  "Loan Schema",
  "Loan Product",
  "Eligible Tenure",
  "DBR Config",
  "Credit Score",
  "Rule Policy",
  "Product Group",
  "Business Rule",
  "Global Config",
  "Dynamic RAC",
];
const ROLE_CHECKER_ADMIN = [
  "Home",
  "RAC",
  "Recovery",
  "Affordability",
  "TCL",
  "Loan Schema",
  "Loan Product",
  "Eligible Tenure",
  "DBR Config",
  "Credit Score",
  "Rule Policy",
  "Product Group",
  "Business Rule",
  "Global Config",
  "Dynamic RAC",
];
const ROLE_TECHNICAL = ["Customer Care", "Product Testing", "General Ledger"];
const ROLE_VIEWER = [
  "Home",
  "Recovery",
  "Affordability",
  "Employer",
  "Approval Config",
  "Document Config",
  "TCL",
  "Loan Schema",
  "Loan Product",
  "Eligible Tenure",
  "DBR Config",
  "Credit Score",
  "Rule Policy",
  "Product Group",
  "Business Rule",
  "Global Config",
  "Server Config",
  "Customer Care",
  "General Ledger",
  "Dynamic RAC",
  "Reporting Config",
  "Reports",
];

const ROLE_LOAN_OFFICER = [
  "Home",
  "Recovery",
  "Affordability",
  "Employer",
  "Approval Config",
  "Document Config",
  "TCL",
  "Loan Schema",
  "Loan Product",
  "Eligible Tenure",
  "DBR Config",
  "Credit Score",
  "Rule Policy",
  "Product Group",
  "Customer Care",
  "Dynamic RAC",
  "Reporting Config",
  "Reports",
  "SME Loans",
  "Personal Loans",
];

const initialState = {
  open: JSON.parse(localStorage.getItem("sidebarOpen")) ?? true,
  submenuStates: MenusInitial.map((menu) =>
    menu.submenu ? { isOpen: false } : ""
  ),
  menus: MenusInitial,
  loading: false, // New loading state
  error: null, // New error state
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.open = !state.open;
      localStorage.setItem("sidebarOpen", JSON.stringify(state.open));
    },
    setSubmenuStates(state, action) {
      state.submenuStates = action.payload;
      localStorage.setItem(
        "submenuStates",
        JSON.stringify(state.submenuStates)
      );
    },
    setMenus(state, action) {
      const { roleName } = action.payload;
      switch (roleName) {
        case "ROLE_SUPERADMIN":
          state.menus = MenusInitial;
          break;

        case "ROLE_VIEWER":
          state.menus = MenusInitial.map((menu) => ({
            ...menu, // Spread all the other properties of the menu
            createButton: menu.createButton ? false : menu.createButton, // Set createButton to false if it exists
          })).filter((item) => ROLE_VIEWER.includes(item.title));
          break;

        case "ROLE_ADMIN":
          state.menus = MenusInitial;
          break;

        case "ROLE_CUSTOMER_CARE_USER":
          state.menus = MenusInitial.filter((item) =>
            ROLE_CUSTOMER_CARE_USER.includes(item.title)
          );
          break;

        case "ROLE_CREDITOR_ADMIN":
          state.menus = MenusInitial.filter((item) =>
            ROLE_CREDITOR_ADMIN.includes(item.title)
          );
          break;

        case "ROLE_CUSTOMER_CARE_MANAGER":
          state.menus = MenusInitial.filter((item) =>
            ROLE_CUSTOMER_CARE_MANAGER.includes(item.title)
          );
          break;

        case "ROLE_TICKETING_USER":
          state.menus = MenusInitial;
          break;

        case "ROLE_TICKETING_SUPERVISOR":
          state.menus = MenusInitial;
          break;

        case "ROLE_TECHNICAL":
          state.menus = MenusInitial.filter((item) =>
            ROLE_TECHNICAL.includes(item.title)
          );
          break;

        case "ROLE_MAKER_ADMIN":
          state.menus = MenusInitial.filter((item) =>
            ROLE_MAKER_ADMIN.includes(item.title)
          );
          break;

        case "ROLE_CHECKER_ADMIN":
          state.menus = MenusInitial.filter((item) =>
            ROLE_CHECKER_ADMIN.includes(item.title)
          );
          break;

        case "ROLE_LOAN_OFFICER":
          state.menus = MenusInitial.map((menu) => ({
            ...menu, // Spread all the other properties of the menu
            createButton: menu.createButton ? false : menu.createButton, // Set createButton to false if it exists
          })).filter((item) => ROLE_LOAN_OFFICER.includes(item.title));
          break;

        case "ROLE_CREDIT_OFFICER":
          state.menus = MenusInitial.filter((item) =>
            ROLE_LOAN_OFFICER.includes(item.title)
          );
          break;

        case "ROLE_CCO_AND_FINTECH_OFFICER":
          state.menus = MenusInitial;
          break;

        case "ROLE_CHIEF_EXECUTIVE_OFFICER":
        case "ROLE_MANAGEMENT_CREDIT_COMMITTEE":
        case "ROLE_BOARD":
          state.menus = MenusInitial.map((menu) => ({
            ...menu, // Spread all the other properties of the menu
            createButton: menu.createButton ? false : menu.createButton, // Set createButton to false if it exists
          }));
          break;

        default:
          state.menus = [];
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRACData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRACData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "RAC") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchRACData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchDBRData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDBRData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "DBR Config") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchDBRData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchBEData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBEData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Blocked Employer") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchBEData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchProjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Loan Schema") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Loan Product") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchCreditScoreEqData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreditScoreEqData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Credit Score") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchCreditScoreEqData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchRulePolicyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRulePolicyData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Rule Policy") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchRulePolicyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchTCLData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTCLData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "TCL") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchTCLData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchProdGroupData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProdGroupData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Product Group") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProdGroupData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchRecoveryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecoveryData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Recovery") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchRecoveryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchAffordibilityData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAffordibilityData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Affordability") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchAffordibilityData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchLoanApprovalData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanApprovalData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Approval Config") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchLoanApprovalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchDocumentConfigData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentConfigData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Document Config") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchDocumentConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })

      .addCase(fetchCreditScoreEligibleTenureData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCreditScoreEligibleTenureData.fulfilled,
        (state, action) => {
          state.loading = false;
          const submenuItems = action.payload;
          const updatedMenus = state.menus.map((menu) => {
            if (menu.title === "Eligible Tenure") {
              return { ...menu, submenuItems };
            }
            return menu;
          });
          state.menus = updatedMenus;
        }
      )
      .addCase(fetchCreditScoreEligibleTenureData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.error.message}`);
      })
      .addCase(fetchDynamicRacData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicRacData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Dynamic RAC") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
        state.loading = false;
      })
      .addCase(fetchDynamicRacData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.error.message}`);
      })
      .addCase(fetchReportingConfigData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportingConfigData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Reporting Config") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
        state.loading = false;
      })
      .addCase(fetchReportingConfigData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.error.message}`);
      });
  },
});

export const { toggleSidebar, setSubmenuStates, setMenus } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
