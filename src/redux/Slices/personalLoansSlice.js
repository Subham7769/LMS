import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import convertToTitleCase from "../../utils/convertToTitleCase";
import { sanitizeUid } from "../../utils/sanitizeUid";

export const getLoanApplications = createAsyncThunk(
  "personalLoans/getLoanApplications",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_APPLICATION_PERSONAL
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
  "personalLoans/getLoanApplicationsByID",
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
  "personalLoans/getDocsByIdnUsage",
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
  "personalLoans/cancelLoanApplicationsByID",
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
  "personalLoans/getLoanApplicationByField",
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
  "personalLoans/fetchLoanProductData",
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
  "personalLoans/fetchBorrowerById",
  async (uid, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_LOAN_READ_BORROWER_PROFILE}${uid}`,
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

export const uploadSignedLoanAgreement = createAsyncThunk(
  "personalLoans/uploadSignedLoanAgreement",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const { loanId } = fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_SIGNED_AGREEMENT_UPLOAD
        }${loanId}/signed-loan-agreement`,
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

export const uploadDocumentFile = createAsyncThunk(
  "personalLoans/uploadDocumentFile",
  async ({ formData, fileUploadParams }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const { loanApplicationId, documentKey, verified, borrowerType } =
        fileUploadParams;
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_FILE_UPLOAD_PERSONAL
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
  "personalLoans/deleteDocumentFile",
  async (fileDeleteParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId } = fileDeleteParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_DELETE_PERSONAL}${docId}`;

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
  "personalLoans/downloadDocumentFile",
  async (fileDownloadParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId, docName } = fileDownloadParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_DOWNLOAD_PERSONAL}${docId}`;

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
  "personalLoans/previewDocumentFile",
  async (filePreviewParams, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const { docId } = filePreviewParams;
    const url = `${import.meta.env.VITE_LOAN_FILE_PREVIEW_PERSONAL}${docId}`;

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
  "personalLoans/getMaxPrincipalData",
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
  "personalLoans/saveDraftLoanData",
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
  "personalLoans/submitLoan",
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
  "personalLoans/getLoanOffers",
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
  "personalLoans/deleteLoanOffers",
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
  "personalLoans/handleProceed",
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
  "personalLoans/getPendingLoans",
  async ({ page, size, getPayload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_PENDING_PERSONAL
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
  "personalLoans/getLoansByField",
  async ({ field, value, getPayload }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_PENDING_BY_FIELD_PERSONAL
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
  "personalLoans/approveLoan",
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
  "personalLoans/rejectLoan",
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
  "personalLoans/getLoanHistory",
  async ({ page, size }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_HISTORY_PERSONAL
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
  "personalLoans/getLoanHistoryByField",
  async ({ field, value }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_LOAN_HISTORY_BY_FIELD_PERSONAL
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

export const getFullLoanDetails = createAsyncThunk(
  "personalLoans/getFullLoanDetails",
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

export const getRepaymentHistory = createAsyncThunk(
  "personalLoans/getRepaymentHistory",
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

export const getLoanAgreement = createAsyncThunk(
  "personalLoans/getLoanAgreement",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_FULL_LOAN_DETAILS_BY_ID_PERSONAL
        }${uid}/loan-agreement/${loanId}`,
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

export const getLoanStatement = createAsyncThunk(
  "personalLoans/getLoanStatement",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_STATEMENT_BY_ID
        }${uid}/loan-statement/${loanId}`,
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

export const getOutrightSettlement = createAsyncThunk(
  "personalLoans/getOutrightSettlement",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_STATEMENT_BY_ID
        }${uid}/loan-outright-settlement/${loanId}`,
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

export const getDisbursementFile = createAsyncThunk(
  "personalLoans/getDisbursementFile",
  async ({ loanId, uid }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${
          import.meta.env.VITE_LOAN_READ_DISBURSEMENT_FILE_BY_ID
        }${uid}/loan-disbursement/${loanId}`,
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
  "personalLoans/generateLoanApplicationId",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_GET_DRAFT_APPLICATION_ID}PERSONAL`;
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

export const closeLoan = createAsyncThunk(
  "personalLoans/closeLoan",
  async (closeLoanPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("authToken");
    const url = `${import.meta.env.VITE_LOAN_CLOSE_VIA_WALLET}`;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(closeLoanPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to close loan");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRefinanceDetails = createAsyncThunk(
  "personalLoans/getRefinanceDetails",
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

export const fetchBorrowerDataLoanHistory = createAsyncThunk(
  "personalLoans/fetchBorrowerDataLoanHistory",
  async ({ subID }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_BORROWER_INFO_LOAN_HISTORY}${subID}/all-loans`,
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
        return rejectWithValue({ message: "Unauthorized" });
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

const initialState = {
  borrowerData: {},
  loanApplications: [],
  loanApplicationsTotalElements: 0,
  addLoanData: {
    borrowerName: "",
    borrowerType: "PERSONAL_BORROWER",
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
      firstEmiDate: "",
      loanReleaseDate: "",
      repaymentTenure: 0,
      repaymentTenureType: "",
      repaymentTenureStr: "",
      principalAmount: "",
      sector: "",
      branch: "",
      agentName: "",
      lhacoName: "",
      uniqueID: "",
    },
    refinanceDetails: [
      {
        name: "",
        loanId: "",
        installmentOnPaySlip: "",
        refinanceAmount: "",
        refinanceYesNo: false,
      },
    ],
    documents: [],
    loanApplicationId: "",
  },
  approveLoans: [],
  approveLoansTotalElements: 0,
  loanHistory: [],
  borrowerLoanHistory: [],
  paymentHistory: [],
  loanHistoryTotalElements: 0,
  loanConfigData: {
    profile: {
      cashTCL: 1500000,
      netCashTCL: 1500000,
      cashCreditScore: 0.9,
    },
    cashLoanStats: {
      maxLoanDuration: 186,
      minLoanDuration: 186,
      maxLoanDurationMonths: 6,
      minLoanDurationMonths: 6,
      maxLoanAmount: 60000,
      minLoanAmount: 60000,
      maxTenure: 6,
      minTenure: 6,
      maxEligibleDuration: 1116,
      minEligibleDuration: 31,
      maxEligibleDurationMonths: 36,
      minEligibleDurationMonths: 1,
      minLoanProductAmount: 100,
      maxLoanAmountForBorrower: 151315,
    },
    dynamicCashLoanOffers: [
      {
        transactionId: "2bd78e19-51b4-438a-a368-cc31c78caadc",
        serviceFee: 2700,
        serviceFeeTax: 0,
        totalLoanAmount: 71374.28,
        totalInterestAmount: 8674.28,
        totalManagementFee: 0,
        totalManagementVatFee: 0,
        principalAmount: 60000,
        duration: 186,
        instalmentsNumber: 6,
        dailyInterestRate: 0.00126598497855257,
        durationInMonths: 6,
        schema: "Payroll Backed Loans",
        installmentSummaryResponse: [
          {
            installmentValue: 11445.71,
            installmentDate: "2025-07-10",
            totalRequiredAmount: 11895.71,
            interestValue: 2400,
            principalValue: 9045.71,
            closingAmount: 60000,
            earlySettlementFee: 0,
            savedFee: 8674.26,
            savedFeePercent: 100,
            principalOutstandingAmount: 50954.29,
            totalOutstandingAmount: 59478.55,
            termCost: 0,
            thirdPartyCost: 0,
            serviceFee: 450,
            managementFee: 0,
            vatFee: 0,
          },
          {
            installmentValue: 11445.71,
            installmentDate: "2025-08-10",
            totalRequiredAmount: 11895.71,
            interestValue: 2038.17,
            principalValue: 9407.54,
            closingAmount: 50954.29,
            earlySettlementFee: 0,
            savedFee: 6274.26,
            savedFeePercent: 100,
            principalOutstandingAmount: 41546.75,
            totalOutstandingAmount: 47582.84,
            termCost: 0,
            thirdPartyCost: 0,
            serviceFee: 450,
            managementFee: 0,
            vatFee: 0,
          },
          {
            installmentValue: 11445.71,
            installmentDate: "2025-09-10",
            totalRequiredAmount: 11895.71,
            interestValue: 1661.87,
            principalValue: 9783.84,
            closingAmount: 41546.75,
            earlySettlementFee: 0,
            savedFee: 4236.09,
            savedFeePercent: 100,
            principalOutstandingAmount: 31762.91,
            totalOutstandingAmount: 35687.13,
            termCost: 0,
            thirdPartyCost: 0,
            serviceFee: 450,
            managementFee: 0,
            vatFee: 0,
          },
          {
            installmentValue: 11445.71,
            installmentDate: "2025-10-10",
            totalRequiredAmount: 11895.71,
            interestValue: 1270.52,
            principalValue: 10175.19,
            closingAmount: 31762.91,
            earlySettlementFee: 0,
            savedFee: 2574.22,
            savedFeePercent: 100,
            principalOutstandingAmount: 21587.72,
            totalOutstandingAmount: 23791.42,
            termCost: 0,
            thirdPartyCost: 0,
            serviceFee: 450,
            managementFee: 0,
            vatFee: 0,
          },
          {
            installmentValue: 11445.71,
            installmentDate: "2025-11-10",
            totalRequiredAmount: 11895.71,
            interestValue: 863.51,
            principalValue: 10582.2,
            closingAmount: 21587.72,
            earlySettlementFee: 0,
            savedFee: 1303.7,
            savedFeePercent: 100,
            principalOutstandingAmount: 11005.52,
            totalOutstandingAmount: 11895.71,
            termCost: 0,
            thirdPartyCost: 0,
            serviceFee: 450,
            managementFee: 0,
            vatFee: 0,
          },
          {
            installmentValue: 11445.71,
            installmentDate: "2025-12-10",
            totalRequiredAmount: 11895.71,
            interestValue: 440.19,
            principalValue: 11005.52,
            closingAmount: 11005.52,
            earlySettlementFee: 0,
            savedFee: 440.19,
            savedFeePercent: 100,
            principalOutstandingAmount: 0,
            totalOutstandingAmount: 0,
            termCost: 0,
            thirdPartyCost: 0,
            serviceFee: 450,
            managementFee: 0,
            vatFee: 0,
          },
        ],
        annualInterestRatePercent: 24,
        dailyInterestRatePercentWithoutFee: 0.13,
        annualInterestRatePercentWithoutFee: 24,
        monthlyInterestRatePercent: 4,
        aprAsPerTenorPercent: 0,
        monthlyInterestRatePercentWithoutFee: 4,
        annualFlatRatePercent: 48,
        monthlyFlatRatePercent: 4,
        aprWithoutFeePerMonthPercent: 2,
        aprPerMonthPercent: 2,
        loanFlatRate: 0.14457,
        averageNumberOfInstallment: 6.016438356098449,
        disbursedAmount: 55928,
        crbCharge: 100,
        insuranceFee: 2400,
        insuranceLevy: 72,
        applicationFees: 1500,
        discountRate: 0,
        discountFee: 0,
      },
    ],
    loanApplicationId: "LHPX129",
  },
  loanProductData: [],
  loanProductOptions: [],
  loanOfferFields: {
    loanProductId: "",
    uid: "",
  },
  fullLoanDetails: {},
  loanAgreementData: {},
  loanStatement: {},
  disbursement: {},
  outrightSettlement: {},
  error: null,
  loading: false,
};

const personalLoansSlice = createSlice({
  name: "personalLoans",
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
      } else if (section === "refinanceDetails") {
        state.addLoanData.refinanceDetails[index][field] =
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
    updateLoanOfferFields: (state, action) => {
      const { name, value } = action.payload;
      state.loanOfferFields[name] = value; // Dynamically update the field in loanConfigFields
    },
    resetLoanOfferFields: (state, action) => {
      state.loanOfferFields = initialState.loanOfferFields;
      state.loanConfigData = {};
    },
    setLoanApplicationId: (state, action) => {
      state.addLoanData.loanApplicationId = action.payload;
    },
    setLoanBorrowerId: (state, action) => {
      state.addLoanData.generalLoanDetails.borrowerId = action.payload;
      state.addLoanData.generalLoanDetails.uniqueID = action.payload;
    },
    handleAddRefinance: (state) => {
      state.addLoanData.refinanceDetails.push({
        name: "",
        loanId: "",
        installmentOnPaySlip: "",
        refinanceAmount: "",
        refinanceYesNo: false,
      });
    },
    handleDeleteRefinance: (state, action) => {
      const index = action.payload;
      state.addLoanData.refinanceDetails =
        state.addLoanData.refinanceDetails.filter((_, i) => i !== index);
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
        const filteredLoans = action.payload.content.filter(
          (loan) => loan.status !== "CANCEL"
        );
        state.loanApplications = filteredLoans;
        state.loanApplicationsTotalElements = filteredLoans.length;
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
        state.loading = true; //
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
        const updatedLoanProductOptions = action.payload
          .filter((item) => item.eligibleCustomerType === "CONSUMER")
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
      .addCase(uploadSignedLoanAgreement.pending, (state) => {
        state.loading = true; //
      })
      .addCase(uploadSignedLoanAgreement.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("File uploaded successfully");
      })
      .addCase(uploadSignedLoanAgreement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      })
      .addCase(uploadDocumentFile.pending, (state) => {
        state.loading = true; //
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
      .addCase(deleteDocumentFile.pending, (state) => {
        state.loading = true; //
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
        state.loading = true; //
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
      .addCase(previewDocumentFile.pending, (state) => {
        state.loading = true; //
        state.error = null;
      })
      .addCase(previewDocumentFile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(previewDocumentFile.rejected, (state, action) => {
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
        state.loading = true;
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
        toast.success("Offer generated successfully");
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
        toast.error(`API Error: ${action.payload}`);
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
      .addCase(getLoanStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLoanStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.loanStatement = action.payload;
      })
      .addCase(getLoanStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getOutrightSettlement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOutrightSettlement.fulfilled, (state, action) => {
        state.loading = false;
        state.outrightSettlement = action.payload;
      })
      .addCase(getOutrightSettlement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(getDisbursementFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDisbursementFile.fulfilled, (state, action) => {
        state.loading = false;
        state.disbursement = action.payload;
      })
      .addCase(getDisbursementFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(closeLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeLoan.fulfilled, (state, action) => {
        state.loading = false;
        toast.success("Loan closed successfully!");
      })
      .addCase(closeLoan.rejected, (state, action) => {
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
        state.addLoanData.refinanceDetails = [
          {
            name: "Longhorn Associates",
            loanId: responseData.loanId,
            installmentOnPaySlip: responseData.installments[0].amount,
            refinanceAmount: responseData.xcClosingAmount,
            refinanceYesNo: true,
          },
        ];
      })
      .addCase(getRefinanceDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Error: ${action.payload}`);
      })
      .addCase(fetchBorrowerDataLoanHistory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBorrowerDataLoanHistory.fulfilled, (state, action) => {
        state.borrowerLoanHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchBorrowerDataLoanHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const {
  resetAddLoanData,
  updateLoanField,
  updateLoanOfferFields,
  resetLoanOfferFields,
  setLoanApplicationId,
  setLoanBorrowerId,
  handleAddRefinance,
  handleDeleteRefinance,
} = personalLoansSlice.actions;

export default personalLoansSlice.reducer;
