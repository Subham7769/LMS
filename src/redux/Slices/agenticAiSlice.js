import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Define async thunks for fetching data and performing actions
export const fetchName = createAsyncThunk(
  "tcl/fetchName",
  async (tclId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${import.meta.env.VITE_TCL_READ}${tclId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || "Failed to read");
      }
      const data = await response.json();
      return data.tclName;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const InitialState = {
  chatMessages: [
    {
      id: 1,
      type: "userText",
      message: "Can anyone help? I have a question about Acme Professional",
      timestamp: "2:40 PM",
      avatar: "User01",
    },
    {
      id: 2,
      type: "botText",
      message: `Hey Dominik Lamakani 👋\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 🙌`,
      timestamp: "2:40 PM",
      avatar: "Bot",
      // statusIcon: "double-check-green",
    },
    {
      id: 3,
      type: "image",
      imageSrc: "",
      downloadable: true,
      uploading: false,
      failed: false,
      fileUrl: "/docs/Bank_Summary.docx",
      timestamp: "2:48 PM",
      avatar: "User01",
    },
    {
      id: 4,
      type: "document",
      docType: "pdf",
      downloadable: true,
      uploading: false,
      failed: false,
      fileName: "Loan_Terms_Agreement.pdf",
      fileUrl: "/docs/Loan_Terms_Agreement.pdf",
      icon: "PdfIcon",
      timestamp: "2:49 PM",
      avatar: "User01",
    },
    {
      id: 5,
      type: "document",
      docType: "word",
      downloadable: true,
      uploading: false,
      failed: false,
      fileName: "Profile_Summary.docx",
      fileUrl: "/docs/Profile_Summary.docx",
      icon: "DocIcon",
      timestamp: "2:50 PM",
      avatar: "User01",
    },
    {
      id: 6,
      type: "userText",
      message: "What do you think? Duis aute irure dolor in reprehenderit 🔥",
      timestamp: "2:51 PM",
      avatar: "User01",
    },
    {
      id: 7,
      type: "botText",
      message: `Sed euismod nisi porta lorem mollis...`,
      timestamp: "2:55 PM",
      avatar: "Bot",
      // statusIcon: "single-check-gray",
    },
    {
      id: 8,
      type: "date-separator",
      content: "Tuesday, 20 January",
    },
    {
      id: 10,
      type: "image",
      imageSrc: "",
      downloadable: true,
      uploading: true,
      failed: false,
      fileUrl: "/docs/Bank_Summary.docx",
      timestamp: "2:48 PM",
      avatar: "User01",
    },
    {
      id: 11,
      type: "document",
      docType: "pdf",
      downloadable: true,
      uploading: true,
      failed: false,
      fileName: "Loan_Terms_Agreement.pdf",
      fileUrl: "/docs/Loan_Terms_Agreement.pdf",
      icon: "PdfIcon",
      timestamp: "2:49 PM",
      avatar: "User01",
    },
    {
      id: 12,
      type: "document",
      docType: "word",
      downloadable: true,
      uploading: true,
      failed: false,
      fileName: "Bank_Summary.docx",
      fileUrl: "/docs/Bank_Summary.docx",
      icon: "DocIcon",
      timestamp: "2:50 PM",
      avatar: "User01",
    },
    {
      id: 16,
      type: "botTyping",
      avatar: "Bot",
    },
    {
      id: 17,
      type: "userTyping",
      avatar: "User01",
    },
    {
      id: 18,
      type: "botText",
      message: `Hey Dominik Lamakani 👋\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 🙌`,
      timestamp: "2:40 PM",
      avatar: "Bot",
      // statusIcon: "double-check-green",
    },
    {
      id: 13,
      type: "image",
      imageSrc: "",
      downloadable: true,
      uploading: false,
      failed: true,
      fileUrl: "/docs/Bank_Summary.docx",
      timestamp: "2:48 PM",
      avatar: "User01",
    },
    {
      id: 14,
      type: "document",
      docType: "pdf",
      downloadable: true,
      uploading: false,
      failed: true,
      fileName: "Loan_Terms_Agreement.pdf",
      fileUrl: "/docs/Loan_Terms_Agreement.pdf",
      icon: "PdfIcon",
      timestamp: "2:49 PM",
      avatar: "User01",
    },
    {
      id: 15,
      type: "document",
      docType: "word",
      downloadable: true,
      uploading: false,
      failed: true,
      fileName: "Bank_Summary.docx",
      fileUrl: "/docs/Bank_Summary.docx",
      icon: "DocIcon",
      timestamp: "2:50 PM",
      avatar: "User01",
    },
  ],
  loading: false,
  error: null,
};

const agenticAiSlice = createSlice({
  name: "agenticAi",
  initialState: InitialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchName.fulfilled, (state, action) => {
        state.loading = false;
        state.itemName = action.payload;
      })
      .addCase(fetchName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`API Error : ${action.payload}`);
      });
  },
});

export const { setLoading } = agenticAiSlice.actions;
export default agenticAiSlice.reducer;
