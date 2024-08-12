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
    return Promise.reject(error.message || "Data fetch failed");
  }
};
// const useFetchData = async (url, transformData, options = {}) => {
//   const {
//     tokenKey = "authToken",
//     redirectPath = "/login",
//     tokenUrl = null,
//   } = options;
//   let token = localStorage.getItem(tokenKey);
//   if (tokenUrl) {
//     const tokenResponse = await axios.get(tokenUrl);
//     token = tokenResponse.data.value;
//     localStorage.setItem("projectToken", tokenResponse.data.value);
//   }

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.status === 401 || response.status === 403) {
//       localStorage.removeItem(tokenKey);
//       // navigate to redirectPath
//       window.location.href = redirectPath;
//       return;
//     }

//     const result = response.data;
//     const transformedData = transformData(result);
//     return transformedData;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

export const fetchRACData = createAsyncThunk(
  "fetchRACData",
  async (_, { rejectWithValue }) => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rac/";
    const transformData = (data) => {
      return data.map(({ name, racId }) => ({
        name,
        href: "/newrac/" + racId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDBRData = createAsyncThunk("fetchDBRData", async (_,{rejectWithValue}) => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/dbc-temp/";
  const transformData = (data) => {
    return data.map(({ name, dbcTempId }) => ({
      name: name.replace(/-/g, " "),
      href: "/newdbc/" + dbcTempId,
    }));
  };
  try {
    
    return await useFetchData(url, transformData);
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const fetchBEData = createAsyncThunk("fetchBEData", async (_, {rejectWithValue}) => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/be-temp/";
  const transformData = (data) => {
    return data.map(({ name, blockEmployerTempId }) => ({
      name: name.replace(/-/g, " "),
      href: "/blocked-employer/" + blockEmployerTempId,
    }));
  };
  try {
    
    return await useFetchData(url, transformData);
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const fetchProjectData = createAsyncThunk(
  "project/fetchProjectData",
  async (_, { rejectWithValue }) => {
    const url = `https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/allprojects?limit=10&offset=0`;
    const tokenUrl =
    "https://lms-api-dev.lmscarbon.com/lms-carbon-client-registration/api/v1/client/DarwinClient/token";
    const transformData = (data) => {
      return data.map(({ name, projectId }) => ({
        name,
        href: "/project/" + projectId,
      }));
    };
    try {
      return await useFetchData(url, transformData,{tokenUrl});
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchProductData = createAsyncThunk(
  "product/fetchProductData",
  async (_, { rejectWithValue }) => {
    const url = `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products`;
    const transformData = (data) => {
      return data.map(({ productType, projectId, loanProductId }) => ({
        name: productType.replace(/_/g, " "),
        href: `/product/${productType}/loan-product-config/${projectId}/${loanProductId}`,
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
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/cse-temp";
    const transformData = (data) => {
      return data.map(({ creditScoreEqTempId, name }) => ({
        name: name.replace(/-/g, " "),
        href: "/credit-score/" + creditScoreEqTempId,
      }));
    };
    try {
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRulePolicyData = createAsyncThunk(
  "fetchRulePolicyData",
  async (_,{rejectWithValue}) => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/rule-policy-temp";
    const transformData = (data) => {
      return data.map(({ rulePolicyTempId, name }) => ({
        name: name.replace(/-/g, " "),
        href: "/rule-policy/" + rulePolicyTempId,
      }));
    };
    try {
      
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const fetchTCLData = createAsyncThunk("fetchTCLData", async (_,{rejectWithValue}) => {
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/tcl/all-tcl";
  const transformData = (data) => {
    return data.map(({ tclId, tclName }) => ({
      name: tclName.replace(/_/g, " "),
      href: "/tcl/" + tclId,
    }));
  };
  try {
    
    return await useFetchData(url, transformData);
  } catch (error) {
    return rejectWithValue(error.message)
  }
});

export const fetchProdGroupData = createAsyncThunk(
  "fetchProdGroupData",
  async (_,{rejectWithValue}) => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/concurrent-loans/config";
    const transformData = (data) => {
      const ProdDetailsArray = Array.isArray(data) ? data : [data];
      return ProdDetailsArray.map(({ configId }) => ({
        name: configId.replace(/-/g, " "),
        href: "/product_group/" + configId,
      }));
    };
    try {
      
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const fetchRecoveryData = createAsyncThunk(
  "fetchRecoveryData",
  async (_,{rejectWithValue}) => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/recovery-temp";
    const transformData = (data) => {
      return data.map(({ name, recoveryEquationTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/recovery/" + recoveryEquationTempId,
      }));
    };
    try {
      
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

export const fetchCreditScoreEligibleTenureData = createAsyncThunk(
  "fetchCreditScoreEligibleTenureData",
  async (_,{rejectWithValue}) => {
    const url =
      "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/cset-temp";
    const transformData = (data) => {
      return data.map(({ name, creditScoreEtTempId }) => ({
        name: name.replace(/-/g, " "),
        href: "/credit-score-eligible-tenure/" + creditScoreEtTempId,
      }));
    };
    try {
      
      return await useFetchData(url, transformData);
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
);

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
      state.menus = action.payload;
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
      })

      .addCase(fetchProjectData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Project") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.loading = false;
        const submenuItems = action.payload;
        const updatedMenus = state.menus.map((menu) => {
          if (menu.title === "Product") {
            return { ...menu, submenuItems };
          }
          return menu;
        });
        state.menus = updatedMenus;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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
            if (menu.title === "Credit Score Eligible Tenure") {
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
      });
  },
});

export const { toggleSidebar, setSubmenuStates, setMenus } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
