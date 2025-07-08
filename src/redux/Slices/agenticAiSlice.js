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
  AllSessionChats: {
    SessionId_01: [
      {
        id: 1,
        type: "date-separator",
        date: "Tuesday, 20 January",
      },
      {
        id: 2,
        type: "userText",
        message: "Can anyone help? I have a question about Acme Professional",
        timestamp: "2:40 PM",
        avatar: "User",
      },
      {
        id: 3,
        type: "botText",
        message: `Hey Dominik Lamakani 👋\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 🙌`,
        timestamp: "2:40 PM",
        avatar: "Bot",
      },
      {
        id: 4,
        type: "image",
        imageSrc: "",
        downloadable: true,
        uploading: false,
        failed: false,
        fileUrl: "/docs/Bank_Summary.docx",
        timestamp: "2:48 PM",
        avatar: "User",
      },
      {
        id: 5,
        type: "document",
        docType: "pdf",
        downloadable: true,
        uploading: false,
        failed: false,
        fileName: "Loan_Terms_Agreement.pdf",
        fileUrl: "/docs/Loan_Terms_Agreement.pdf",
        icon: "PdfIcon",
        timestamp: "2:49 PM",
        avatar: "User",
      },
      {
        id: 6,
        type: "document",
        docType: "word",
        downloadable: true,
        uploading: false,
        failed: false,
        fileName: "Profile_Summary.docx",
        fileUrl: "/docs/Profile_Summary.docx",
        icon: "DocIcon",
        timestamp: "2:50 PM",
        avatar: "User",
      },
      {
        id: 7,
        type: "userText",
        message: "What do you think? Duis aute irure dolor in reprehenderit 🔥",
        timestamp: "2:51 PM",
        avatar: "User",
      },
      {
        id: 8,
        type: "botText",
        message: `Sed euismod nisi porta lorem mollis...`,
        timestamp: "2:55 PM",
        avatar: "Bot",
      },
      {
        id: 9,
        type: "image",
        imageSrc: "",
        downloadable: true,
        uploading: true,
        failed: false,
        fileUrl: "/docs/Bank_Summary.docx",
        timestamp: "2:48 PM",
        avatar: "User",
      },
      {
        id: 10,
        type: "document",
        docType: "pdf",
        downloadable: true,
        uploading: true,
        failed: false,
        fileName: "Loan_Terms_Agreement.pdf",
        fileUrl: "/docs/Loan_Terms_Agreement.pdf",
        icon: "PdfIcon",
        timestamp: "2:49 PM",
        avatar: "User",
      },
      {
        id: 11,
        type: "document",
        docType: "word",
        downloadable: true,
        uploading: true,
        failed: false,
        fileName: "Bank_Summary.docx",
        fileUrl: "/docs/Bank_Summary.docx",
        icon: "DocIcon",
        timestamp: "2:50 PM",
        avatar: "User",
      },
      {
        id: 12,
        type: "botTyping",
        avatar: "Bot",
      },
      {
        id: 13,
        type: "userTyping",
        avatar: "User",
      },
      {
        id: 14,
        type: "botText",
        message: `Hey Dominik Lamakani 👋\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 🙌`,
        timestamp: "2:40 PM",
        avatar: "Bot",
      },
      {
        id: 15,
        type: "image",
        imageSrc: "",
        downloadable: true,
        uploading: false,
        failed: true,
        fileUrl: "/docs/Bank_Summary.docx",
        timestamp: "2:48 PM",
        avatar: "User",
      },
      {
        id: 16,
        type: "document",
        docType: "pdf",
        downloadable: true,
        uploading: false,
        failed: true,
        fileName: "Loan_Terms_Agreement.pdf",
        fileUrl: "/docs/Loan_Terms_Agreement.pdf",
        icon: "PdfIcon",
        timestamp: "2:49 PM",
        avatar: "User",
      },
      {
        id: 17,
        type: "document",
        docType: "word",
        downloadable: true,
        uploading: false,
        failed: true,
        fileName: "Bank_Summary.docx",
        fileUrl: "/docs/Bank_Summary.docx",
        icon: "DocIcon",
        timestamp: "2:50 PM",
        avatar: "User",
      },
      {
        id: 18,
        type: "date-separator",
        timestamp: "Tuesday, 22 January",
        sessionId: "SessionID_01",
      },
      {
        id: 19,
        sessionId: "SessionID_01",
        type: "document",
        docType: "pdf",
        downloadable: true,
        deletable: true,
        uploading: false,
        failed: true,
        fileName: "Bank_Summary.docx",
        fileUrl: "/docs/Bank_Summary.docx",
        icon: "DocIcon",
        date: "Tuesday, 22 January",
        timestamp: "2:50 PM",
        avatar: "User",
      },
      {
        id: 20,
        type: "image",
        imageSrc: "",
        downloadable: true,
        uploading: false,
        failed: true,
        fileUrl: "/docs/Bank_Summary.docx",
        timestamp: "2:48 PM",
        avatar: "User",
      },
    ],
    SessionID_02: [
      {
        id: 21,
        type: "userText",
        message: "How do I apply for a loan renewal?",
        timestamp: "10:00 AM",
        avatar: "User",
      },
      {
        id: 22,
        type: "botText",
        message: "Please provide your Borrower ID to check eligibility.",
        timestamp: "10:01 AM",
        avatar: "Bot",
      },
      {
        id: 23,
        type: "userTyping",
        avatar: "User",
      },
    ],
    SessionID_03: [
      {
        id: 24,
        type: "image",
        imageSrc: "",
        downloadable: true,
        uploading: false,
        failed: false,
        fileUrl: "/uploads/selfie.jpg",
        timestamp: "11:15 AM",
        avatar: "User",
      },
      {
        id: 25,
        type: "botText",
        message: "We are validating your identity, please wait...",
        timestamp: "11:16 AM",
        avatar: "Bot",
      },
    ],
    SessionID_04: [
      {
        id: 26,
        type: "userText",
        message: "I’m getting an error while uploading documents.",
        timestamp: "12:00 PM",
        avatar: "User",
      },
      {
        id: 27,
        type: "document",
        docType: "word",
        downloadable: true,
        uploading: false,
        failed: true,
        fileName: "Income_Statement.docx",
        fileUrl: "/docs/Income_Statement.docx",
        icon: "DocIcon",
        timestamp: "12:01 PM",
        avatar: "User",
      },
      {
        id: 28,
        type: "botText",
        message:
          "Document upload failed. Please try again with a valid format.",
        timestamp: "12:02 PM",
        avatar: "Bot",
      },
    ],
    SessionID_05: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
      {
        id: 30,
        type: "botText",
        message: "Sure, please provide your registered mobile number.",
        timestamp: "1:11 PM",
        avatar: "Bot",
      },
      {
        id: 31,
        type: "userText",
        message: "9876543210",
        timestamp: "1:12 PM",
        avatar: "User",
      },
      {
        id: 32,
        type: "botText",
        message: "Thank you! Fetching your loan details now...",
        timestamp: "1:13 PM",
        avatar: "Bot",
      },
    ],
    SessionID_06: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_07: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_08: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_09: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_10: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_11: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_12: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
    SessionID_13: [
      {
        id: 29,
        type: "userText",
        message: "Can I check my loan status?",
        timestamp: "1:10 PM",
        avatar: "User",
      },
    ],
  },
  defaultSessionId: "SessionId_01",
  selectedSessionId: null,
  searchSessionTerm: "",
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
    setSelectedSessionId: (state, action) => {
      state.selectedSessionId = action.payload;
    },
    setSearchSessionTerm: (state, action) => {
      state.searchSessionTerm = action.payload;
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

export const {
  setLoading,
  setSelectedSessionId,
  setHistory,
  setSearchSessionTerm,
} = agenticAiSlice.actions;
export default agenticAiSlice.reducer;
