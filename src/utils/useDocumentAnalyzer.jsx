// src/hooks/useDocumentAnalysis.js
import { useState } from "react";

const API_BASE = import.meta.env.VITE_DOCUMENT_ANALYZER_API;

export function useDocumentAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [documentAnalysisReport, setDocumentAnalysisReport] = useState(null);

  const uploadDocument = async (requestId, description, file) => {
    
    console.log(" uploading document to analyzer")

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("request_id", requestId);
    formData.append("description", description);
    formData.append("file", file);

    console.log(formData)

    try {
      const res = await fetch(`${API_BASE}/upload/`, {
        method: "POST",
        headers: { accept: "application/json" },
        body: formData,
      });

      console.log(res);
      if (!res.ok) throw new Error("Upload failed");
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const initiateAnalysis = async (requestId) => {
    try {
      const res = await fetch(`${API_BASE}/initiate/${requestId}`, {
        method: "GET",
        headers: { accept: "application/json" },
      });
      if (!res.ok) throw new Error("Analysis initiation failed");
      return await res.json();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const fetchReport = async (requestId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/get-report/${requestId}`, {
        method: "GET",
        headers: { accept: "application/json" },
      });
      if (!res.ok) throw new Error("Fetching report failed");
      const data = await res.json();
      console.log(data)
      setDocumentAnalysisReport(data.fullReport);
      return data?.fullReport;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadDocument,
    initiateAnalysis,
    fetchReport,
    loading,
    error,
    documentAnalysisReport,
  };
}
