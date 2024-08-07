import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenusInitial } from "../../data/MenuData";
import axios from "axios";

const useFetchData = async (url, transformData, options = {}) => {
  const {
    tokenKey = "authToken",
    redirectPath = "/login",
    tokenUrl = null,
  } = options;
  let token = localStorage.getItem(tokenKey);
  if (tokenUrl) {
    const tokenResponse = await axios.get(tokenUrl);
    token = tokenResponse.data.value;
    localStorage.setItem("projectToken", tokenResponse.data.value);
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
      // navigate to redirectPath
      window.location.href = redirectPath;
      return;
    }

    const result = response.data;
    const transformedData = transformData(result);
    return transformedData;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchRACData = createAsyncThunk("fetchRACData", async () => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/";
  const transformData = (data) => {
    return data.map(({ name, racId }) => ({
      name,
      href: "/newrac/" + racId,
    }));
  };
  return await useFetchData(url, transformData);
});

export const fetchDBRData = createAsyncThunk("fetchDBRData", async () => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/dbc-temp/";
  const transformData = (data) => {
    return data.map(({ name, dbcTempId }) => ({
      name: name.replace(/-/g, " "),
      href: "/newdbc/" + dbcTempId,
    }));
  };
  return await useFetchData(url, transformData);
});

export const fetchBEData = createAsyncThunk("fetchBEData", async () => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/";
  const transformData = (data) => {
    return data.map(({ name, blockEmployerTempId }) => ({
      name: name.replace(/-/g, " "),
      href: "/blocked-employer/" + blockEmployerTempId,
    }));
  };
  return await useFetchData(url, transformData);
});

export const fetchProjectData = createAsyncThunk("fetchProjectData", async () => {
    const url =
      "https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/allprojects?limit=10&offset=0";
    const tokenUrl =
      "https://lms-api-dev.lmscarbon.com/lms-carbon-client-registration/api/v1/client/DarwinClient/token";
    const transformData = (data) => {
      return data.map(({ name, projectId }) => ({
        name,
        href: "/project/" + projectId,
      }));
    };
    return await useFetchData(url, transformData, { tokenUrl });
  }
);

export const fetchProductData = createAsyncThunk("fetchProductData", async () => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products";
    const transformData = (data) => {
      return data.map(({ productType, projectId, loanProductId }) => ({
        name: productType.replace(/_/g, " "),
        href: `/product/${productType}/loan-product-config/${projectId}/${loanProductId}`,
      }));
    };
    return await useFetchData(url, transformData);
  }
);

export const fetchCreditScoreEqData = createAsyncThunk("fetchCreditScoreEqData", async () => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/cse-temp";
    const transformData = (data) => {
      return data.map(({ creditScoreEqTempId, name }) => ({
        name: name.replace(/-/g, " "),
        href: "/credit-score/" + creditScoreEqTempId,
      }));
    };
    return await useFetchData(url, transformData);
  }
);

export const fetchRulePolicyData = createAsyncThunk("fetchRulePolicyData", async () => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp";
    const transformData = (data) => {
      return data.map(({ rulePolicyTempId, name }) => ({
        name: name.replace(/-/g, " "),
        href: "/rule-policy/" + rulePolicyTempId,
      }));
    };
    return await useFetchData(url, transformData);
  }
);

export const fetchTCLData = createAsyncThunk('fetchTCLData', async () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/all-tcl";
  const transformData = (data) => {
    return data.map(({ tclId, tclName }) => ({
      name: tclName.replace(/_/g, " "),
      href: "/tcl/" + tclId,
    }));
  };
  return await useFetchData(url, transformData);
});

export const fetchProdGroupData = createAsyncThunk('fetchProdGroupData', async () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/concurrent-loans/config";
  const transformData = (data) => {
    const ProdDetailsArray = Array.isArray(data) ? data : [data];
    return ProdDetailsArray.map(({ configId }) => ({
      name: configId.replace(/-/g, " "),
      href: "/product_group/" + configId,
    }));
  };
  return await useFetchData(url, transformData);
});

export const fetchRecoveryData = createAsyncThunk('fetchRecoveryData', async () => {
  const url = "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp";
  const transformData = (data) => {
    return data.map(({ name, recoveryEquationTempId }) => ({
      name: name.replace(/-/g, " "),
      href: "/recovery/" + recoveryEquationTempId,
    }));
  };
  return await useFetchData(url, transformData);
});

const initialState = {
  open: JSON.parse(localStorage.getItem("sidebarOpen")) ?? true,
  submenuStates: MenusInitial.map((menu) =>
    menu.submenu ? { isOpen: false } : null
  ),
  menus: MenusInitial,
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
      state.menus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRACData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "RAC") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchDBRData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "DBR Config") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchBEData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Blocked Employer") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Project") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Product") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchCreditScoreEqData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Credit Score") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchRulePolicyData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Rule Policy") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchTCLData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "TCL") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProdGroupData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Product Group") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchRecoveryData.fulfilled, (state, action) => {
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Recovery") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
  },
});

export const { toggleSidebar, setSubmenuStates, setMenus } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
