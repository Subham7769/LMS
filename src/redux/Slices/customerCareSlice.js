import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  personalInfo: {
    borrowerProfile: {
      firstNameEn: "",
      middleNameEn: "",
      lastNameEn: "",
      gender: "",
      dateOfBirth: "",
      idExpiryDate: "",
      occupation: "N/A",
      nationality: "",
      residenceDetails: {
        buildingNumber: "",
        streetName: "",
        city: "",
        postOfficeBox: "",
        neighborhood: "",
        additionalNumbers: "",
        rent: false,
      },
      maritalDetails: {
        maritalStatus: "",
        noOfDomesticWorkers: 0,
        noOfChildren: 0,
        totalDependent: 0,
      },
    },
  },
  creditProfile: [],
  loanOffersCalculations: {},
  loanHistory: [],
  paymentHistory: [],
  rejectionHistory: [],
  CreditBureauDetails: {},
  loading: false,
  error: null,
  downloadLoading: false,
  downloadError: null,
};

export const fetchBorrowerData = createAsyncThunk(
  "borrower/fetchBorrowerData",
  async ({ subID, url }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWER_INFO}${subID}${url}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 404) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Borrower Not Found");
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        return rejectWithValue({message:"Unauthorized"});
      }
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const downloadClearanceLetter = createAsyncThunk(
  "borrower/downloadClearanceLetter",
  async ({ subID, loanId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${
        import.meta.env.VITE_BORROWER_INFO
      }clearance-letter/${subID}/${loanId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        // You can redirect using another approach, but we can't call navigate directly here
        return rejectWithValue({ message: "Unauthorized" });
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      // Return the download URL to be handled in the component
      return downloadUrl;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const downloadFile = createAsyncThunk(
  "download/handleDownload",
  async (
    { subID, fileType, endpoint, contentType, fileName },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      const url = `${import.meta.env.VITE_BORROWER_INFO}${subID}/${endpoint}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken");
        // Optionally navigate to login
        return rejectWithValue({ message: "Unauthorized" });
      }

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to get Details");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);

      return { success: true };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const customerCareSlice = createSlice({
  name: "borrower",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBorrowerData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBorrowerData.fulfilled, (state, action) => {
        const { url } = action.meta.arg;
        if (url.includes("/credit-profile")) {
          state.creditProfile = action.payload;
        } else if (url.includes("/loan-offers-calculations")) {
          state.loanOffersCalculations = action.payload;
        } else if (url.includes("/loans")) {
          state.loanHistory = action.payload;
          console.log(action.payload)
        } else if (url.includes("/repayments")) {
          state.paymentHistory = action.payload;
        } else if (url.includes("/rejection-history")) {
          state.rejectionHistory = action.payload;
        } else if (url.includes("/simah-recent-response")) {
          state.CreditBureauDetails = action.payload;
        } else {
          state.personalInfo = action.payload;
          console.log(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchBorrowerData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(downloadClearanceLetter.pending, (state) => {
        state.downloadLoading = true;
        state.downloadError = null;
      })
      .addCase(downloadClearanceLetter.fulfilled, (state, action) => {
        state.downloadLoading = false;
        // Download the PDF file
        const link = document.createElement("a");
        link.href = action.payload;
        link.setAttribute("download", "clearance_letter.pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(action.payload);
      })
      .addCase(downloadClearanceLetter.rejected, (state, action) => {
        state.downloadLoading = false;
        state.downloadError = action.payload;
        console.error("Download failed:", action.payload);
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(downloadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(downloadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(downloadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export default customerCareSlice.reducer;
