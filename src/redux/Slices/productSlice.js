// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, ProductList } from "../../data/ProductData";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import { fetchNotifications } from "./notificationSlice";

// Define async thunks for fetching data and performing actions
export const fetchData = createAsyncThunk(
  "product/fetchData",
  async (productType, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_READ}${productType}`,
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
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveProductData = createAsyncThunk(
  "product/saveProductData",
  async (
    { loanProId, productData, roleName },
    { rejectWithValue, dispatch }
  ) => {
    const url =
      roleName !== "ROLE_MAKER_ADMIN"
        ? import.meta.env.VITE_PRODUCT_UPDATE
        : import.meta.env.VITE_PRODUCT_UPDATE_MAKER;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${url}${loanProId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to save");
      }
      if (roleName === "ROLE_MAKER_ADMIN") {
        dispatch(fetchNotifications());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductName = createAsyncThunk(
  "product/updateProductName",
  async ({ loanProId, newName }, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const productData = {
        ...getState().product.productData,
        productType: newName,
      };

      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_UPDATE}${loanProId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }

      return newName; // Return the updated data
    } catch (error) {
      console.error("An error occurred:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteLoanProduct = createAsyncThunk(
  "product/deleteLoanProduct",
  async (loanProId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_PRODUCT_DELETE}${loanProId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete");
      }

      return loanProId; // Return the deleted loanProId to handle it in the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductData = createAsyncThunk(
  "product/createProductData",
  async ({ productData, roleName }, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const url =
      roleName !== "ROLE_MAKER_ADMIN"
        ? import.meta.env.VITE_PRODUCT_CREATE
        : import.meta.env.VITE_PRODUCT_CREATE_MAKER;
    try {
      // Filter out objects with empty fields
      const filteredInterestEligibleTenure =
        productData.interestEligibleTenure.filter(
          (item) =>
            item.interestRate &&
            item.interestPeriodType &&
            item.loanTenure &&
            item.loanTenureType &&
            item.repaymentTenure &&
            item.repaymentTenureType
        );

      // Create a copy of productData with filtered interestEligibleTenure
      const filteredproductData = {
        ...productData,
        interestEligibleTenure: filteredInterestEligibleTenure,
      };

      const postResponse = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filteredproductData),
      });

      if (!postResponse.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to create");
      }
      if (roleName === "ROLE_MAKER_ADMIN") {
        dispatch(fetchNotifications());
      }

      return filteredproductData;
      // Assuming the server responds with the newly created product data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "product/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Loan Product"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const productInitialState = {
  productStatsData: {
    HeaderList,
    ProductList,
  },
  productData: {
    loanProductId: "",
    blockEmployersTempId: "",
    creditScoreEqTempId: "",
    creditScoreEtTempId: "",
    dbcTempId: "",
    disableRac: false,
    eligibleCustomerType: "",
    fee: "",
    interestEligibleTenure: [],
    managementFeeVat: "",
    numberOfEmisForEarlySettlement: "",
    overdraft: null,
    productType: "",
    projectId: "",
    racId: "",
    refinancedWith: false,
    rulePolicyTempId: "",
    tclFileId: "",
    recoveryEquationTempId: "",
    annualFee: "",
    overdraftProductPeriod: "",
    overDraftPaymentPrinciplePercentage: "",
    maxOverdraftPrincipalLimit: "",
    minOverdraftPrincipalLimit: "",
    interestMethod: "",
  },
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductData: (state, action) => {
      const { productType } = action.payload;
      state.productData = {
        ...productInitialState.productData, // Reset to initial state
        ...action.payload, // Apply the new changes
        productType: productType || state.productData.productType, // Ensure name field is set
      };
    },
    setError: (state, action) => {
      state.error = action.error.message;
    },
    updateProductDataField: (state, action) => {
      const { name, value } = action.payload;
      state.productData[name] = value;
    },
    updateInterestTenure: (state, action) => {
      const { index, field, value } = action.payload;
      state.productData.interestEligibleTenure[index][field] = value;
    },
    deleteInterestTenure: (state, action) => {
      const { index } = action.payload;
      state.productData.interestEligibleTenure.splice(index, 1);
    },
    addInterestTenure: (state, action) => {
      state.productData.interestEligibleTenure.push(action.payload);
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
          createdOn: ProductList[index]?.createdOn || "14/09/2022",
          openLoans: ProductList[index]?.openLoans || "1490",
          totalDisbursedPrincipal:
            ProductList[index]?.totalDisbursedPrincipal || "$750M",
          status: ProductList[index]?.status || "Active",
        }));

        // Assign the updatedList to ProductList
        state.productStatsData.ProductList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;

        // Create a copy of action.payload and add dataIndex for interestEligibleTenure
        const updatedProductData = {
          ...action.payload,
          interestEligibleTenure: action.payload.interestEligibleTenure.map(
            (tenure) => ({
              ...tenure,
              dataIndex: nanoid(), // Assign nanoid() to dataIndex
            })
          ),
        };

        // Update the state with the modified productData
        state.productData = updatedProductData;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(saveProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProductData.fulfilled, (state) => {
        state.loading = false;
        toast.success("Product data updated.");
      })
      .addCase(saveProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateProductName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductName.fulfilled, (state, action) => {
        state.loading = false;
        state.productData.productType = action.payload; // Update the productData with the new product name
        toast.success("Product Name updated.");
      })
      .addCase(updateProductName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error :  ${action.payload}`);
      })
      .addCase(deleteLoanProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLoanProduct.fulfilled, (state, action) => {
        state.loading = false;
        toast("Product Deleted.");
      })
      .addCase(deleteLoanProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(createProductData.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state
      })
      .addCase(createProductData.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Product created");
      })
      .addCase(createProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setLoading,
  setProductData,
  setError,
  updateProductDataField,
  updateInterestTenure,
  deleteInterestTenure,
  addInterestTenure,
} = productSlice.actions;
export default productSlice.reducer;
