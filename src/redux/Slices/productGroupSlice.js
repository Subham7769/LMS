import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPGroups = createAsyncThunk(
  "productGroup/fetchPGroups",
  async (_, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_GROUP_READ}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue("Unauthorized");
      }

      const data = await response.json();

      const formattedData = {
        name: data.configId,
        product: "",
        limit: "",
        tags: data.activeLoansCount.map((item) => ({
          product: item.productType,
          limit: item.activeLoansCount,
        })),
        selectedOption: null,
        inList: data.activeList.inList,
        hardLimit: data.financeHardLimit.hardLimit,
        overduePercentage: data.overDuePercentage.percentageFromEmi,
      };

      const formattedProductTypeOptions = data.activeLoansCount.map((item) => ({
        value: item.productType,
        label: item.productType,
      }));

      return {
        formData: formattedData,
        productTypeOptions: formattedProductTypeOptions,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productGroupSlice = createSlice({
  name: "productGroup",
  initialState: {
    formData: {
      name: "",
      product: "",
      limit: "",
      tags: [],
      selectedOption: null,
      inList: false,
      hardLimit: "",
      overduePercentage: "",
    },
    productTypeOptions: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload.formData;
        state.productTypeOptions = action.payload.productTypeOptions;
      })
      .addCase(fetchPGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFormData } = productGroupSlice.actions;

export default productGroupSlice.reducer;
