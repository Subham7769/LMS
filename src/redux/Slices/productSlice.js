// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define async thunks for fetching data and performing actions
export const fetchData = createAsyncThunk(
  "product/fetchName",
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
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveProductData = createAsyncThunk(
  "product/saveData",
  async ({ loanProId, productData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json(); // Assuming the response contains the updated data
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
        throw new Error(`HTTP error! Status: ${response.status}`);
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
        throw new Error("Failed to delete the item");
      }

      return loanProId; // Return the deleted loanProId to handle it in the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createProductData = createAsyncThunk(
  "product/createProductData",
  async (productData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");

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

      const postResponse = await fetch(
        `${import.meta.env.VITE_PRODUCT_CREATE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(filteredproductData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      }
      return filteredproductData;
      // Assuming the server responds with the newly created product data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productInitialState = {
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
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveProductData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = action.payload; // Update productData with the response data
      })
      .addCase(saveProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateProductName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProductName.fulfilled, (state, action) => {
        state.loading = false;
        state.productData.productType = action.payload; // Update the productData with the new product name
      })
      .addCase(updateProductName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteLoanProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLoanProduct.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteLoanProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createProductData.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state
      })
      .addCase(createProductData.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set the error message if the request fails
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
