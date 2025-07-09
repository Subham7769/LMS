import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HeaderList, ProductGroupList } from "../../data/GroupData";
import { toast } from "react-toastify";
import convertToTitleCase from "../../utils/convertToTitleCase";

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
      // console.log(data);

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLoanProducts = createAsyncThunk(
  "productGroup/fetchLoanProducts",
  async (_, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_PRODUCTS_READ}`,
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
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInList = createAsyncThunk(
  "productGroup/fetchInList",
  async (_, { rejectWithValue }) => {
    try {
      const auth = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_INLIST_READ}`,
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
      return data.inList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProductGroup = createAsyncThunk(
  "productGroup/updateProductGroup",
  async (productGroupData, { rejectWithValue, dispatch }) => {
    const token = localStorage.getItem("authToken");
    const { tags, ...formDataWithoutTags } = productGroupData;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_GROUP_UPDATE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formDataWithoutTags),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to update");
      }
      // Optionally, refetch the data to update the store
    } catch (error) {
      console.error("Failed to update data:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const fetchList = createAsyncThunk(
  "productGroup/fetchList",
  async (_, { getState }) => {
    const sideBarState = getState().sidebar;
    const Menu = sideBarState?.menus.find(
      (menu) => menu.title === "Product Group"
    );
    const submenuItems = Menu ? Menu.submenuItems : [];
    return submenuItems;
  }
);

const initialState = {
  productGroupData: {
    activeList: {
      inList: [],
      lastUpdatedDate: "",
      userName: "",
    },
    activeLoansCount: [
      {
        activeLoansCount: "",
        productType: "",
      },
    ],
    carbonFinanceHardLimit: {
      hardLimit: "",
      lastUpdatedDate: "",
      userName: "",
    },
    configName: "",
    overDuePercentage: {
      lastUpdatedDate: "",
      percentageFromEmi: "",
      userName: "",
    },
    carbonRenewCreditTp: {
      lastUpdatedDate: "",
      renewInDays: "",
      userName: "",
    },
    product: "",
    limit: "",
    tags: [],
  },
  productTypeOptions: [],
  inListOption: [],
  loading: false,
  error: null,
  productGroupStatsData: {
    HeaderList,
    ProductGroupList,
  },
};

const productGroupSlice = createSlice({
  name: "productGroup",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      // state.formData = { ...state.formData, ...action.payload };
      const { name, value } = action.payload;
      state.productGroupData[name] = value;
    },
    handleChangeDispatch: (state, action) => {
      const { name, value } = action.payload;
      const isOverDuePercentage =
        state.productGroupData.overDuePercentage.hasOwnProperty(name);
      const isFinanceHardLimit =
        state.productGroupData.carbonFinanceHardLimit.hasOwnProperty(name);
      const isRenewCreditReport =
        state.productGroupData.carbonRenewCreditTp.hasOwnProperty(name);

      if (isOverDuePercentage) {
        state.productGroupData.overDuePercentage[name] = value;
      } else if (isFinanceHardLimit) {
        state.productGroupData.carbonFinanceHardLimit[name] = value;
      } else if (isRenewCreditReport) {
        state.productGroupData.carbonRenewCreditTp[name] = value;
      } else {
        state.productGroupData = {
          ...state.productGroupData,
          ...action.payload,
        };
      }
    },
    addProductTag: (state, action) => {
      const newTag = action.payload;

      // Add tag to tags array
      state.productGroupData.tags.push({
        product: newTag.product,
        limit: newTag.limit,
      });

      // Add tag to activeLoansCount array
      state.productGroupData.activeLoansCount.push({
        activeLoansCount: newTag.limit,
        productType: newTag.product,
      });

      // Add tag to activeList.inList array
      state.productGroupData.activeList.inList.push(newTag.product);

      state.productGroupData.product = "";
      state.productGroupData.limit = "";
    },
    deleteProductTag: (state, action) => {
      const tag = action.payload;

      // Remove from tags
      state.productGroupData.tags = state.productGroupData.tags.filter(
        (t) => t.product !== tag
      );

      // Remove from activeLoansCount
      state.productGroupData.activeLoansCount =
        state.productGroupData.activeLoansCount.filter(
          (loan) => loan.productType !== tag
        );

      // Remove from activeList.inList
      state.productGroupData.activeList.inList =
        state.productGroupData.activeList.inList.filter(
          (product) => product !== tag
        );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        // If action.payload has fewer or equal objects than ProjectList, only map action.payload

        const updatedList = action.payload.map((newListItem, index) => ({
          name: newListItem.name,
          href: newListItem.href,
          // createdOn: ProductGroupList[index]?.createdOn || "14/09/2022",
          // openLoans: ProductGroupList[index]?.openLoans || "2367",
          // totalDisbursedPrincipal:
          //   ProductGroupList[index]?.totalDisbursedPrincipal || "$234M",
          // status: ProductGroupList[index]?.status || "Inactive",
        }));

        // Assign the updatedList to ProductGroupList
        state.productGroupStatsData.ProductGroupList = updatedList;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.productGroupData = {
          ...state.productGroupData,
          ...action.payload,
        };
        const formattedTags = state.productGroupData.activeLoansCount.map(
          (item) => ({
            product: convertToTitleCase(item.productType),
            limit: item.activeLoansCount,
          })
        );
        state.productGroupData = {
          ...state.productGroupData,
          tags: formattedTags,
        };
      })
      .addCase(fetchPGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchLoanProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanProducts.fulfilled, (state, action) => {
        state.loading = false;
        const formattedProductTypeOptions = action.payload.map((item) => ({
          value: item,
          label: item,
        }));
        state.productTypeOptions = formattedProductTypeOptions;
      })
      .addCase(fetchLoanProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchInList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInList.fulfilled, (state, action) => {
        state.loading = false;
        state.inListOption = action.payload;
        const formattedProductTypeOptions = action.payload.map((item) => ({
          value: item,
          label: item,
        }));
        state.inListOption = formattedProductTypeOptions;
      })
      .addCase(fetchInList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(updateProductGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductGroup.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Details updated successfully!");
      })
      .addCase(updateProductGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  setFormData,
  handleChangeDispatch,
  deleteProductTag,
  addProductTag,
} = productGroupSlice.actions;

export default productGroupSlice.reducer;
