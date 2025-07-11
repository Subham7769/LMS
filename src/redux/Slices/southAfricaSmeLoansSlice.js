import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import convertToTitleCase from "../../utils/convertToTitleCase";
import { nanoid } from "nanoid";
import { sanitizeUid } from "../../utils/sanitizeUid";

export const getLoanApplications = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanApplications",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_APPLICATION_COMPANY
        }?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLoanApplicationsByID = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanApplicationsByID",
  async (loanApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_APPLICATION_BY_ID_PERSONAL
        }${loanApplicationId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDocsByIdnUsage = createAsyncThunk(
  "southAfricaSmeLoansSlice/getDocsByIdnUsage",
  async ({ dynamicDocumentTempId, usage }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_DOCUMENTS_BY_ID_AND_USAGE
        }${dynamicDocumentTempId}/usage/${usage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelLoanApplicationsByID = createAsyncThunk(
  "southAfricaSmeLoansSlice/cancelLoanApplicationsByID",
  async (loanApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_CANCEL_APPLICATION_BY_ID_PERSONAL
        }${loanApplicationId}/status?status=CANCEL`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const cloneLoanApplicationsByID = createAsyncThunk(
  "personalLoans/cloneLoanApplicationsByID",
  async (loanApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_CLONE_APPLICATION_BY_ID_PERSONAL
        }${loanApplicationId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLoanApplicationByField = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanApplicationByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_APPLICATION_BY_FIELD_PERSONAL
        }${field}&value=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLoanProductData = createAsyncThunk(
  "southAfricaSmeLoansSlice/fetchLoanProductData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_READ_ALL_PRODUCT}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBorrowerById = createAsyncThunk(
  "southAfricaSmeLoansSlice/fetchBorrowerById",
  async (uid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_READ_COMPANY_PROFILE}${uid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadDocumentFile = createAsyncThunk(
  "southAfricaSmeLoansSlice/uploadDocumentFile",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const {
        loanApplicationId,
        documentKey,
        verified,
        borrowerType,
        authToken,
      } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_FILE_UPLOAD_COMPANY
        }?loanApplicationId=${loanApplicationId}&documentKey=${documentKey}&verified=${verified}&borrowerType=${borrowerType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to upload");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const uploadInspectionVerificationDocumentFile = createAsyncThunk(
  "southAfricaSmeLoansSlice/uploadInspectionVerificationDocumentFile",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const {
        loanApplicationId,
        documentKey,
        verified,
        borrowerType,
        authToken,
      } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_FILE_UPLOAD_COMPANY
        }?loanApplicationId=${loanApplicationId}&documentKey=${documentKey}&verified=${verified}&borrowerType=${borrowerType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to upload");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDocumentFile = createAsyncThunk(
  "southAfricaSmeLoansSlice/deleteDocumentFile",
  async (fileDeleteParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId, authToken } = fileDeleteParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_DELETE_COMPANY}${docId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const downloadDocumentFile = createAsyncThunk(
  "southAfricaSmeLoansSlice/downloadDocumentFile",
  async (fileDeleteParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId, authToken, docName } = fileDeleteParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_DOWNLOAD_COMPANY}${docId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete");
      }

      // Convert response to a Blob
      const blob = await response.blob();

      // Create a URL for the Blob
      const downloadUrl = URL.createObjectURL(blob);

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.href = downloadUrl;

      a.download = docName;
      document.body.appendChild(a);
      a.click();

      // Clean up the URL object and remove the anchor element
      URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      return "File downloaded successfully";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const previewDocumentFile = createAsyncThunk(
  "southAfricaSmeLoansSlice/previewDocumentFile",
  async (filePreviewParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId, authToken, docName } = filePreviewParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_PREVIEW_COMPANY}${docId}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to preview");
      }

      const data = await response.json();
      const byteCharacters = atob(data.base64Content);
      const byteNumbers = new Uint8Array(
        Array.from(byteCharacters, (char) => char.charCodeAt(0))
      );
      const blob = new Blob([byteNumbers], { type: data.contentType });

      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, "_blank");
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);

      return "File opened successfully";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMaxPrincipalData = createAsyncThunk(
  "southAfricaSmeLoansSlice/getMaxPrincipalData",
  async (maxPrincipalPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_GET_MAX_PRINCIPAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(maxPrincipalPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveDraftLoanData = createAsyncThunk(
  "southAfricaSmeLoansSlice/saveDraftLoanData",
  async (addLoanData, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_SAVE_DRAFT_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addLoanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const submitLoan = createAsyncThunk(
  "southAfricaSmeLoansSlice/submitLoan",
  async (generalLoanDetails, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_SUBMIT_CREATE_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(generalLoanDetails),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLoanOffers = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanOffers",
  async (loanOfferFields, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const sanitizedUid = sanitizeUid(loanOfferFields.uid);
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_READ_LOAN_OFFERS_PERSONAL}${
          loanOfferFields.loanProductId
        }/caching/${sanitizedUid}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLoanOffers = createAsyncThunk(
  "southAfricaSmeLoansSlice/deleteLoanOffers",
  async (loanApplicationId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_DELETE_LOAN_OFFERS_PERSONAL
        }${loanApplicationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to delete");
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleProceed = createAsyncThunk(
  "southAfricaSmeLoansSlice/handleProceed",
  async ({ proceedPayload, uid }, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${
      import.meta.env.VITE_LOAN_SUBMIT_PUT_PERSONAL
    }${uid}/submit-loan`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(proceedPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPendingLoans = createAsyncThunk(
  "southAfricaSmeLoansSlice/getPendingLoans",
  async ({ page, size, getPayload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_PENDING_COMPANY
        }?page=${page}&size=${size}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getPayload),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLoansByField = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoansByField",
  async ({ field, value, getPayload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_PENDING_BY_FIELD_COMPANY
        }${field}&value=${value}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getPayload),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const approveLoan = createAsyncThunk(
  "southAfricaSmeLoansSlice/approveLoan",
  async (approveLoanPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_APPROVE_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(approveLoanPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
      return approveLoanPayload.applicationStatus;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const rejectLoan = createAsyncThunk(
  "southAfricaSmeLoansSlice/rejectLoan",
  async (rejectLoanPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_REJECT_PERSONAL}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rejectLoanPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to transfer");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getLoanHistory = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanHistory",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_HISTORY_COMPANY
        }?page=${page}&size=${size}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLoanHistoryByField = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanHistoryByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_HISTORY_BY_FIELD_COMPANY
        }${field}&value=${value}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRepaymentHistory = createAsyncThunk(
  "southAfricaSmeLoansSlice/getRepaymentHistory",
  async ({ loanId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_FULL_REPAYMENT_HISTORY_BY_LOAN_ID
        }${loanId}/loan-repayments`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getFullLoanDetails = createAsyncThunk(
  "southAfricaSmeLoansSlice/getFullLoanDetails",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_FULL_LOAN_DETAILS_BY_ID_PERSONAL
        }${uid}/loan-details/${loanId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLoanAgreement = createAsyncThunk(
  "southAfricaSmeLoansSlice/getLoanAgreement",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_FULL_LOAN_DETAILS_BY_ID_PERSONAL
        }${uid}/sme-loan-agreement/${loanId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generateLoanApplicationId = createAsyncThunk(
  "southAfricaSmeLoansSlice/generateLoanApplicationId",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_GET_DRAFT_APPLICATION_ID}COMPANY`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to generate ID");
      }
      const responseData = await response.json();
      return responseData.sequenceId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRefinanceDetails = createAsyncThunk(
  "southAfricaSmeLoansSlice/getRefinanceDetails",
  async ({ loanId, uid, uniqueID }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_FULL_LOAN_DETAILS_BY_ID_PERSONAL
        }${uid}/loan-details/${loanId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to fetch");
      }
      const responseData = await response.json();
      return { responseData, uniqueID };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getInspectionVerificationDetails = createAsyncThunk(
  "southAfricaSmeLoansSlice/getInspectionVerificationDetails",
  async ({ borrowerSerialNo, loanProductId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      const url = `${
        import.meta.env.VITE_LOAN_READ_INSPECTION_VERIFICATION_DETAILS
      }?borrowerSerialNo=${borrowerSerialNo}&loanProductId=${loanProductId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to fetch inspection verification"
        );
      }

      const responseData = await response.json();
      return { responseData, borrowerSerialNo, loanProductId };
    } catch (error) {
      return rejectWithValue(error?.message || "Unexpected error occurred");
    }
  }
);

export const submitInspectionVerification = createAsyncThunk(
  "loan/submitInspectionVerification",
  async (submitPayload, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_CREATE_INSPECTION_VERIFICATION_DETAILS}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(submitPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to submit inspection verification"
        );
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      return rejectWithValue(error?.message || "Something went wrong");
    }
  }
);

const initialState = {
  borrowerData: {},
  loanApplications: [],
  loanApplicationsTotalElements: 0,
  addLoanData: {
    borrowerName: "",
    borrowerType: "COMPANY_BORROWER",
    generalLoanDetails: {
      borrowerId: "",
      disbursedBy: "Bank",
      interestMethod: "",
      loanDurationStr: "",
      loanDuration: "",
      loanDurationType: "",
      loanInterest: 0,
      loanInterestType: "",
      loanInterestStr: "",
      loanProductId: "",
      loanCreationDate: "",
      loanReleaseDate: "",
      firstEmiDate: "",
      repaymentTenure: 0,
      repaymentTenureType: "",
      repaymentTenureStr: "",
      principalAmount: 0,
      sector: "",
      reasonForBorrowing: "",
      refinancedLoanId: "",
      refinancedLoanAmount: 0,
      branch: "",
      agentName: "",
      lhacoName: "",
      uniqueID: "",
    },
    proformaDetails: {
      amountOfInvoice: "",
      amountOfOrder: "",
      amountOfProforma: "",
      invoiceDate: "",
      invoiceExpectedDateOfPayment: "",
      invoiceNo: "",
      orderDate: "",
      orderExpiryDate: "",
      orderNo: "",
      proformaExpectedDateOfPayment: "",
      proformaInvoiceDate: "",
      proformaInvoiceNo: "",
    },
    offTakerDetails: {
      cellPhoneNumber: "",
      contactperson: "",
      country: "Zambia",
      industry: "",
      location: "",
      nameOfCompany: "",
      natureOfBusiness: "",
      position: "",
      province: "",
    },
    supplierDetails: {
      cellPhoneNumber: "",
      contactperson: "",
      country: "Zambia",
      emailAddress: "",
      industry: "",
      location: "",
      nameOfCompany: "",
      natureOfBusiness: "",
      phoneNumber: "",
      physicalAddress: "",
      position: "",
      postalAddress: "",
      province: "",
    },
    equipmentVendorDetails: {
      vendorContactPerson: "",
      deliveryTimeframe: "",
      installationRequirements: "",
      maintenanceContractIncluded: "",
      warrantyDetails: "",
      tradeInDetails: "",
    },
    verificationWorkflow: {
      verificationStatus: "",
      VerificationNotes: "",
      verificationDate: "",
      toBeVerifiedBy: "",
    },
    collateralDetails: {
      contactPerson: "",
      collateralType: "",
      marketValue: "",
      lastValuationDate: "",
      insuranceStatus: "",
      insuranceExpiryDate: "",
      locationOfCollateral: "",
      plotVehicleNo: "",
      stateOfCollateral: "",
    },
    lhaDetails: {
      loanOfficerFindings: "",
      business: "",
      office: "",
      businessOperations: "",
      otherDetails: "",
      otherComments: "",
    },
    documents: [],
    loanApplicationId: "",
  },
  inspectionVerification: {
    inspectionBasics: {
      loanApplicationId: "",
      inspectionType: "",
      inspectionDate: "",
      inspector: "",
      overallStatus: "",
    },
    equipmentIdentification: {
      makeModelVerified: false,
      serialNumber: "",
      serialNumberMatches: false,
      yearOfManufacture: "",
      equipmentPhoto: null,
    },
    conditionAssessment: {
      overallConditionRating: "",
      hourMeterReading: "",
      hourMeterPhoto: null,
      usageLevelAssessment: "",
    },
    keySystemsCheck: {
      engineCondition: "",
      hydraulicSystem: "",
      electricalSystems: "",
      structuralIntegrity: "",
      attachmentsCondition: "",
    },
    operationalVerification: {
      startupTestPerformed: false,
      equipmentFullyOperational: false,
      unusualNoisesVibrations: false,
      operationalTestVideo: null,
    },
    valueImpactFactors: {
      verifiedEquipmentValue: "",
      valueVariancePercentage: "",
      criticalIssuesIdentified: false,
      criticalIssuesDescription: "",
    },
    documentationCheck: {
      titleOwnershipVerified: false,
      warrantyDocumentationAvailable: false,
      insuranceRequirementsMet: false,
    },
    documents: [
      {
          "docName": "",
          "docId": "",
          "verified": false,
          "documentKey": "FRONT_VIEW"
      },
      {
          "docName": "",
          "docId": "",
          "verified": false,
          "documentKey": "REAR_VIEW"
      },
      {
          "docName": "",
          "docId": "",
          "verified": false,
          "documentKey": "SERIAL_NUMBER"
      },
      {
          "docName": "",
          "docId": "",
          "verified": false,
          "documentKey": "CRITICAL_ISSUES"
      },
  ],
    verificationOutcome: {
      fundingRecommendation: "",
      conditionRequirements: "",
      inspectorComments: "",
      digitalSignature: null,
    },
  },
  approveLoans: [],
  approveLoansTotalElements: 0,
  loanHistory: [],
  paymentHistory: [],
  loanHistoryTotalElements: 0,
  loanConfigData: {},
  loanProductData: [],
  loanProductOptions: [],
  loanOfferFields: {
    loanProductId: "",
    uid: "",
  },
  fullLoanDetails: {},
  loanAgreementData: {
    businessDetails: {
      nameOfBusiness: "",
      natureOfCompany: "",
      companyRegistrationNo: "",
      industry: "",
      dateOfIncorporation: "",
      principalBusinessActivities: "",
      numberOfEmployees: "",
    },
    contactDetails: {
      contactPerson: "",
      cellPhoneNumber: "",
      position: "",
      postalAddress: "",
      physicalAddress: "",
      location: "",
      province: "",
      country: "",
      emailAddress: "",
      phoneNumber: "",
    },
    profomaDetails: {
      orderNo: "",
      orderDate: "",
      amountOfOrder: "",
      orderExpiryDate: "",
      proformaInvoiceNo: "",
      proformaInvoiceDate: "",
      amountOfProforma: "",
      proformaExpectedDateOfPayment: "",
      invoiceNo: "",
      invoiceDate: "",
      amountOfInvoice: "",
      invoiceExpectedDateOfPayment: "",
    },
    offTakerDetails: {
      nameOfCompany: "",
      industry: "",
      natureOfBusiness: "",
      location: "",
      province: "",
      country: "",
      contactperson: "",
      position: "",
      cellPhoneNumber: "",
    },
    supplierDetails: {
      nameOfCompany: "",
      industry: "",
      natureOfBusiness: "",
      location: "",
      province: "",
      country: "",
      contactperson: "",
      position: "",
      cellPhoneNumber: "",
      postalAddress: "",
      physicalAddress: "",
      emailAddress: "",
      phoneNumber: "",
    },
    generalLoanDetails: {
      loanProduct: "",
      loanAmount: "",
      tenor: "",
      repaymentFrequency: "",
      annualInterestRate: "",
      interest: "",
      totalRepayment: "",
      modeOfRepayment: "",
      firstRepaymentDate: "",
      loanEndDate: "",
    },
    collateralDetails: {
      collateralType: "",
      marketValue: "",
      lastValuationDate: "",
      insuranceStatus: "",
      insuranceExpiryDate: "",
      locationOfCollateral: "",
      plotVehicleNo: "",
      stateOfCollateral: "",
    },
    bankingDetails: {
      bankName: "",
      accountName: "",
      accountNumber: "",
      branchName: "",
      branchCode: "",
      swift: "",
      tpin: "",
    },
    loanOfficerFinding: {
      loanOfficerFindings: "",
      business: "",
      office: "",
      businessOperations: "",
      collateralSearchResultsAndOtherDetails: "",
      otherComments: "",
    },
    directorDetails: [
      {
        name: "",
        gender: "",
        phoneNo: "",
        postalAddress: "",
        physicalAddress: "",
        emailAddress: "",
        nationality: "",
        nrcNo: "",
      },
    ],
    shareHolderDetails: [
      {
        name: "",
        gender: "",
        phoneNo: "",
        postalAddress: "",
        physicalAddress: "",
        emailAddress: "",
        nationality: "",
        nrcNo: "",
      },
    ],
    creditOfficerComments: "",
    ccoFoComments: "",
  },
  error: null,
  loading: false,
};

const southAfricaSmeLoansSliceSlice = createSlice({
  name: "southAfricaSmeLoans",
  initialState,
  reducers: {
    resetAddLoanData: (state, action) => {
      state.addLoanData = initialState.addLoanData;
    },
    updateLoanField: (state, action) => {
      const { section, field, value, type, checked, index } = action.payload;
      // If section is provided, update specific field in that section
      if (section === "documents") {
        state.addLoanData.documents[index][field] =
          type === "checkbox" ? checked : value;
      } else if (section && state.addLoanData[section]) {
        state.addLoanData[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in addLoanData
        state.addLoanData = {
          ...state.addLoanData,
          [field]: value,
        };
      }
    },
    updateInspectionVerificationField: (state, action) => {
      const { section, field, value, type, checked, index } = action.payload;
      // If section is provided, update specific field in that section
      if (section === "documents") {
        state.inspectionVerification.documents[index][field] =
          type === "checkbox" ? checked : value;
      } else if (section && state.inspectionVerification[section]) {
        state.inspectionVerification[section][field] =
          type === "checkbox" ? checked : value;
      } else {
        // If no section, update directly in inspectionVerification
        state.inspectionVerification = {
          ...state.inspectionVerification,
          [field]: value,
        };
      }
    },
    updateLoanOfferFields: (state, action) => {
      const { name, value } = action.payload;
      state.loanOfferFields[name] = value; // Dynamically update the field in loanConfigFields
    },
    resetLoanOfferFields: (state, action) => {
      state.loanOfferFields = initialState.loanOfferFields;
      state.loanConfigData = {};
    },
    resetInspectionVerificationFields: (state, action) => {
      state.inspectionVerification = initialState.inspectionVerification;
    },
    setLoanApplicationId: (state, action) => {
      state.addLoanData.loanApplicationId = action.payload;
    },
    setLoanBorrowerId: (state, action) => {
      state.addLoanData.generalLoanDetails.borrowerId = action.payload;
      state.addLoanData.generalLoanDetails.uniqueID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateLoanApplicationId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateLoanApplicationId.fulfilled, (state, action) => {
        state.addLoanData.loanApplicationId = action.payload;
      })
      .addCase(generateLoanApplicationId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getLoanApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.loanApplications = action.payload.content;
        state.loanApplicationsTotalElements = action.payload.totalElements;
      })
      .addCase(getLoanApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getLoanApplicationsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanApplicationsByID.fulfilled, (state, action) => {
        state.loading = false;
        state.addLoanData = action.payload;
      })
      .addCase(getLoanApplicationsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getDocsByIdnUsage.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(getDocsByIdnUsage.fulfilled, (state, action) => {
        state.loading = false;

        // If the payload is an empty array, retain the existing documents
        if (Array.isArray(action.payload) && action.payload.length === 0) {
          return;
        }

        state.addLoanData.documents = action.payload.map((doc) => {
          // Find matching document from existing state based on documentKeyName
          const existingDoc = state.addLoanData.documents.find(
            (d) => d.documentKey === doc.documentKeyName
          );

          return {
            docName: existingDoc ? existingDoc.docName : "",
            docId: existingDoc ? existingDoc.docId : "",
            verified: existingDoc ? existingDoc.verified : false,
            documentKey: doc.documentKeyName, // Use documentKeyName from the API response
          };
        });
      })
      .addCase(getDocsByIdnUsage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        // toast.error(`API Error : ${action.payload}`);
      })
      .addCase(cancelLoanApplicationsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelLoanApplicationsByID.fulfilled, (state, action) => {
        state.loading = false;
        toast("Loan Application Cancelled!!");
      })
      .addCase(cancelLoanApplicationsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(cloneLoanApplicationsByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cloneLoanApplicationsByID.fulfilled, (state, action) => {
        state.loading = false;
        state.addLoanData = action.payload;
      })
      .addCase(cloneLoanApplicationsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getLoanApplicationByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanApplicationByField.fulfilled, (state, action) => {
        state.loading = false;

        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        // Check if loanId is null in each object and filter accordingly
        state.loanApplications = payload;

        // hide the pagination
        state.loanApplicationsTotalElements = 0;
      })
      .addCase(getLoanApplicationByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(fetchLoanProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.loanProductData = action.payload;
        console.log(action.payload);
        const updatedLoanProductOptions = action.payload
          .filter((item) => item.eligibleCustomerType === "CORPORATE")
          .map((item) => ({
            label: convertToTitleCase(item.productType),
            value: item.loanProductId,
          }));
        state.loanProductOptions = updatedLoanProductOptions;
        state.addLoanData.generalLoanDetails.loanProductId =
          updatedLoanProductOptions[0].value;
      })
      .addCase(fetchLoanProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(fetchBorrowerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBorrowerById.fulfilled, (state, action) => {
        state.loading = false;
        state.borrowerData = action.payload;
      })
      .addCase(fetchBorrowerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(uploadDocumentFile.pending, (state) => {
        // state.loading = true;
      })
      .addCase(uploadDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        const { docId, documentKey } = action.payload;
        state.addLoanData.documents = state.addLoanData.documents.map(
          (doc) =>
            doc.documentKey === documentKey
              ? { ...doc, docId } // Update the matching document
              : doc // Keep other documents unchanged
        );
        toast.success("File uploaded successfully");
      })
      .addCase(uploadDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(uploadInspectionVerificationDocumentFile.pending, (state) => {
        // state.loading = true;
      })
      .addCase(
        uploadInspectionVerificationDocumentFile.fulfilled,
        (state, action) => {
          state.loading = false;
          const { docId, documentKey } = action.payload;
          state.inspectionVerification.documents =
            state.inspectionVerification.documents.map(
              (doc) =>
                doc.documentKey === documentKey
                  ? { ...doc, docId } // Update the matching document
                  : doc // Keep other documents unchanged
            );
          toast.success("File uploaded successfully");
        }
      )
      .addCase(
        uploadInspectionVerificationDocumentFile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(`API Error : ${action.payload}`);
        }
      )
      .addCase(deleteDocumentFile.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        toast(`Document deleted Successfully`);
      })
      .addCase(deleteDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(downloadDocumentFile.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(downloadDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`Document downloaded Successfully`);
      })
      .addCase(downloadDocumentFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(saveDraftLoanData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveDraftLoanData.fulfilled, (state, action) => {
        state.loading = false;
        toast(`Draft Saved Successfully`);
      })
      .addCase(saveDraftLoanData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(getMaxPrincipalData.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(getMaxPrincipalData.fulfilled, (state, action) => {
        state.loading = false;
        state.addLoanData.generalLoanDetails.principalAmount = action.payload;
        toast(`Principal amount cannot be greater than fetched amount`);
      })
      .addCase(getMaxPrincipalData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(submitLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loanConfigData = action.payload;
        state.loanOfferFields.loanProductId =
          state.addLoanData.generalLoanDetails.loanProductId;
        state.loanOfferFields.uid =
          state.addLoanData.generalLoanDetails.uniqueID;
        state.addLoanData = initialState.addLoanData;
        // toast.success("Offer generated successfully");
      })
      .addCase(submitLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoanOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanOffers.fulfilled, (state, action) => {
        state.loading = false;
        state.loanConfigData = action.payload;
      })
      .addCase(getLoanOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(deleteLoanOffers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLoanOffers.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteLoanOffers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(handleProceed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleProceed.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(
          "Loan submitted successfully. Awaiting approval from the next step approver."
        );
      })
      .addCase(handleProceed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(getPendingLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPendingLoans.fulfilled, (state, action) => {
        state.loading = false;
        state.approveLoans = action.payload.content;
        state.approveLoansTotalElements = action.payload.totalElements;
      })
      .addCase(getPendingLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoansByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoansByField.fulfilled, (state, action) => {
        state.loading = false;

        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        // Check if loanId is null in each object and filter accordingly
        state.approveLoans = payload.some((item) => item.loanId === null)
          ? [] // Set to an empty array if any loanId is null
          : payload;

        // hide the pagination
        state.approveLoansTotalElements = 0;
      })
      .addCase(getLoansByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(approveLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveLoan.fulfilled, (state, action) => {
        state.loading = false;
        toast.success(`Loan ${action.payload.toLowerCase()} successfully`);
      })
      .addCase(approveLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(rejectLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectLoan.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loan rejected successfully");
      })
      .addCase(rejectLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error: ${action.payload}`);
      })
      .addCase(getLoanHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.loanHistory = action.payload.content;
        state.loanHistoryTotalElements = action.payload.totalElements;
      })
      .addCase(getLoanHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoanHistoryByField.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanHistoryByField.fulfilled, (state, action) => {
        state.loading = false;
        // Check if payload is an array or a single object
        const payload = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        // Check if loanId is null in each object and filter accordingly
        state.loanHistory = payload.some((item) => item.loanId === null)
          ? [] // Set to an empty array if any loanId is null
          : payload;

        // hide the pagination
        state.loanHistoryTotalElements = 0;
      })
      .addCase(getLoanHistoryByField.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getRepaymentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRepaymentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentHistory = action.payload;
      })
      .addCase(getRepaymentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getFullLoanDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFullLoanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.fullLoanDetails = action.payload;
      })
      .addCase(getFullLoanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getLoanAgreement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanAgreement.fulfilled, (state, action) => {
        state.loading = false;
        state.loanAgreementData = action.payload;
      })
      .addCase(getLoanAgreement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getRefinanceDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRefinanceDetails.fulfilled, (state, action) => {
        state.loading = false;
        const { responseData, uniqueID } = action.payload;
        state.addLoanData.generalLoanDetails.uniqueID = uniqueID;
        state.addLoanData.generalLoanDetails.refinancedLoanId =
          responseData.loanId;
        state.addLoanData.generalLoanDetails.refinancedLoanAmount =
          responseData.xcClosingAmount;
      })
      .addCase(getRefinanceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getInspectionVerificationDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInspectionVerificationDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.inspectionVerification = {
          ...action.payload.responseData[0],
          documents: [
            ...initialState.inspectionVerification.documents,
            ...action.payload.responseData[0].documents,
          ],
        };
        state.error = null;
      })
      .addCase(getInspectionVerificationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch inspection verification details";
      })
      .addCase(submitInspectionVerification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInspectionVerification.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
        toast.success(`Inspection Verification Submitted.`);

        state.error = null;
      })
      .addCase(submitInspectionVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetAddLoanData,
  updateLoanField,
  resetInspectionVerificationFields,
  updateInspectionVerificationField,
  updateLoanOfferFields,
  resetLoanOfferFields,
  setLoanApplicationId,
  setLoanBorrowerId,
} = southAfricaSmeLoansSliceSlice.actions;

export default southAfricaSmeLoansSliceSlice.reducer;
