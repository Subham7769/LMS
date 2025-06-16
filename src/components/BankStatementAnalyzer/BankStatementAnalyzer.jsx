import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputFile from "../Common/InputFile/InputFile";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Accordion from "../Common/Accordion/Accordion";
import { toast } from "react-toastify";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";

const DOC_AI_ENDPOINT = import.meta.env.VITE_DOC_AI_ENDPOINT;
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const serviceAccount = {
  private_key: import.meta.env.VITE_SERVICE_ACCT_PK,
  client_email: import.meta.env.VITE_SERVICE_ACCT_CLIENT_EMAIL,
};

const generateAccessToken = async () => {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: "RS256",
    typ: "JWT",
  };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };
  const base64url = (input) => {
    return btoa(JSON.stringify(input))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };
  const unsignedJWT = base64url(header) + "." + base64url(claimSet);
  const keyPem = serviceAccount.private_key
    .replace(/-----.* PRIVATE KEY-----/g, "")
    .replace(/\n/g, "");
  const binaryDerString = atob(keyPem);
  const binaryDer = new Uint8Array(
    [...binaryDerString].map((c) => c.charCodeAt(0))
  );
  const key = await crypto.subtle.importKey(
    "pkcs8",
    binaryDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(unsignedJWT)
  );
  const b64signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const jwt = `${unsignedJWT}.${b64signature}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const json = await res.json();
  return json.access_token;
};

const fetchDocumentBase64ByDocId = async (docId, authToken) => {
  const url = `${import.meta.env.VITE_LOAN_FILE_PREVIEW_COMPANY}${docId}`;
  const token = localStorage.getItem("authToken");
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
      throw new Error(errorData.message || "Failed to fetch document");
    }

    const data = await response.json();
    return data.base64Content;
  } catch (error) {
    console.error("Failed to fetch document by docId:", error);
    throw error;
  }
};

const renderValue = (value) => {
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc list-inside pl-4">
        {value.map((item, idx) => (
          <li key={idx}>
            {typeof item === "object" && item !== null
              ? Object.entries(item)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ")
              : item?.toString()}
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <table className="border border-gray-300 my-2">
        <thead>
          <tr>
            <th className="border px-2 py-1 text-left bg-gray-100">Key</th>
            <th className="border px-2 py-1 text-left bg-gray-100">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(value).map(([k, v], idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1">{k}</td>
              <td className="border px-2 py-1">
                {typeof v === "object" ? JSON.stringify(v) : v}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return value?.toString() ?? "";
};

const BankStatementAnalyzer = (prop) => {
  //const { docId } = prop;

  const location = useLocation();
  const toastId = useRef(null);

  // Support both prop and URL docId
  const query = new URLSearchParams(location.search);
  const docIdFromURL = query.get("docId");
  const docId = prop?.docId || docIdFromURL;
  const proposedMontlyFinancing = prop?.proposedMontlyFinancing || 5000;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState();
  const [dashboardHTML, setDashboardHTML] = useState("");

  const handleExport = () => {
    if (!analysisData) {
      alert("No analysis data to export.");
      return;
    }

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    doc.setFont("Courier", "bold");
    doc.setFontSize(14);
    doc.text("Bank Statement Analysis Report", 40, 40);

    let yPosition = 60;

    Object.entries(analysisData).forEach(([sectionTitle, sectionData]) => {
      doc.setFontSize(12);
      doc.setFont("Courier", "bold");
      doc.text(sectionTitle, 40, yPosition);
      yPosition += 15;

      const formatValue = (value) => {
        if (Array.isArray(value)) {
          return value
            .map((item) => {
              if (typeof item === "object") {
                return Object.entries(item)
                  .map(([k, v]) => `${k}: ${v}`)
                  .join(", ");
              }
              return item;
            })
            .join("\n");
        }
        if (typeof value === "object") {
          return Object.entries(value)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");
        }
        return value?.toString() ?? "";
      };

      const tableBody = Object.entries(sectionData).map(([key, value]) => [
        key,
        formatValue(value),
      ]);

      autoTable(doc, {
        head: [["Parameter", "Value"]],
        body: tableBody,
        startY: yPosition,
        margin: { left: 40, right: 40 },
        styles: { font: "courier", fontSize: 9, cellWidth: "wrap" },
        headStyles: { fillColor: [52, 73, 94] },
        theme: "grid",
        didDrawPage: (data) => {
          yPosition = data.cursor.y + 20;
        },
      });
    });

    doc.save("Bank_Statement_Analysis.pdf");
  };

  const analyzeWithDocument = async (pdfBase64) => {
    setLoading(true);
    toastId.current = toast.loading("Parsing the doc..."); // Show loader
    try {
      const token = await generateAccessToken();

      const docAIResponse = await axios.post(
        DOC_AI_ENDPOINT,
        {
          rawDocument: {
            content: pdfBase64,
            mimeType: "application/pdf",
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const documentJson = docAIResponse.data;

      // ✅ Update the existing toast instead of creating new one
      toast.update(toastId.current, {
        render: "Analyzing the content...",
        isLoading: true,
      });

      const openaiResponse = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a bank statement analyzer. Return a JSON object grouped by sections: 
                Bank details: Bank details, customer details, account number, address of the customer  
                Cash Flow Analysis: Cash Flow Analysis that contains Average Monthly Cash Flow,  Average Monthly Deposits,  Average Monthly Withdrawals,Monthwise Account Balance Trend with End Balance, Available Amount for Financing calculated with 30% of average monthly cash flow 
                Cash Flow Stability Assessment: Cash Flow Stability Assessment having Stability Score, Volatility Index as Low Medium High, Seasonal Patterns,Negative Balance Days,Insufficient Funds,Deposit Consistency,Revenue Diversification,Month-to-Month Variance
                Transaction Pattern Analysis: Transaction Pattern Analysis with Top 5 income source categories and top 5 expense categories with total %, Recurring trasactions and Unusal transactions
                Debt Service Capacity: Debt Service Capacity having fields monthly Current Debt Obligations,Proposed Equipment Financing is ${proposedMontlyFinancing}. Calculate Total Debt Service=Current Debt Obligations+Proposed Equipment Financing. Using this value calculate Debt Service Coverage Ratio, DSCR Assessment as Adequet, marginal or Weak. Also show monthly Recommended Maximum Financing
                Bank Statement Risk Indicators: Bank Statement Risk Indicators with analysis for Bounced Checks,No Loan Defaults,Irregular Large Withdrawals,No Unusual Payment Patterns,Unexplained Cash Deposits,No Overdraft Occurrences,Consistent Revenue Stream,Stable Operating Expenses,Minor Balance Fluctuations,Strong Liquidity Ratio and finally Risk Assessment and Bank statement Reliability as Low medium high.
                End of day balance: End of day balance for each day 
                Identify the currency from the statement and add it to all the values.
                Ensure your response is a valid JSON object:
              - Do NOT wrap it in triple backticks (no \`\`\`json).
              - Do NOT include comments (like //).
              - Do NOT add trailing commas.
              - Only return the raw JSON object, nothing else.
              - Ensure all json is correctly formatted without any errors.
                `,
            },
            {
              role: "user",
              content: `Here is the extracted text from a bank statement:\n\n${
                documentJson.document?.text ?? ""
              }`,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_KEY}`,
          },
        }
      );

      let parsedJson = null;
      try {
        const raw = openaiResponse.data.choices[0].message.content;
        const withoutBackticks = raw.replace(/^```json\s*|\s*```$/g, "").trim();
        const cleaned = withoutBackticks.replace(
          /:\s*"?(\d{1,3}(,\d{3})+(\.\d+)?)"?/g,
          (match) => {
            const number = match.replace(/,/g, "");
            return number;
          }
        );

        parsedJson = JSON.parse(cleaned);

        console.log(parsedJson);

        setAnalysisData(parsedJson);
        // ✅ Update the toast to success
        toast.update(toastId.current, {
          render: "Analysis complete!",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (e) {
        console.error("Failed to parse OpenAI response:", e);
        // ❌ Update the toast to error
        toast.update(toastId.current, {
          render: "Failed to analyze document.",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error analyzing statement:", error);
      alert("Something went wrong. Check console for details.");
    }
    setLoading(false);
  };

  const handleFileChange = async (e) => {
    setFile(e.target.value);
    const { files } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Content = reader.result.split(",")[1];
        await analyzeWithDocument(base64Content);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Auto-start if docId is provided

  useEffect(() => {
    const fetchDocAndAnalyze = async () => {
      if (!docId) return;

      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          alert("Missing auth token");
          return;
        }

        const base64Pdf = await fetchDocumentBase64ByDocId(docId, authToken);
        await analyzeWithDocument(base64Pdf);
      } catch (error) {
        console.error("Failed to auto-analyze docId:", error);
        alert("Failed to load and analyze document.");
      }
    };

    fetchDocAndAnalyze();
  }, [docId]);

  const renderSection = (title, data, index) => (
    <Accordion heading={title} isOpen={index === 0}>
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <tbody>
          {Object.entries(data).map(([key, value], idx) => (
            <tr key={idx}>
              <td className="text-[14px]">{key}</td>
              <td>{renderValue(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Accordion>
  );

  const renderPieChart = (data) => {
    const chartData = Object.entries(data).map(([key, value]) => ({
      name: key,
      value: parseFloat(value) || 0,
    }));
    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

    return (
      <RechartsPieChart width={400} height={300} className="mx-auto my-6">
        <Pie
          dataKey="value"
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {chartData.map((_, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    );
  };

  return (
    <div className="">
      {!docId && <DynamicHeader itemName={"Bank Statement Analyzer"} isEditable={false} />}
      <div className="flex flex-col md:flex-row gap-y-4 md:items-end justify-between mb-4">
        {!docId && (
          <InputFile
            labelName="Upload & Analyze"
            placeholder={"Upload only pdf files."}
            inputName={"file"}
            inputValue={file}
            onChange={(e) => handleFileChange(e)}
          />
        )}
        <div className="text-right">
          <Button
            buttonName="Download PDF"
            onClick={handleExport}
            disabled={!analysisData}
            rectangle={true}
          />
        </div>
      </div>

      {analysisData && (
        <>
          {Object.entries(analysisData).map(
            ([sectionTitle, sectionData], index) => (
              <div key={index}>
                {sectionTitle !== "currency" &&
                  renderSection(sectionTitle, sectionData, index)}
                {sectionTitle.toLowerCase().includes("expense") &&
                  typeof sectionData === "object" &&
                  Object.keys(sectionData).length > 1 && (
                    <ContainerTile className="mt-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Expenses Breakdown
                      </h2>
                      {renderPieChart(sectionData)}
                    </ContainerTile>
                  )}
              </div>
            )
          )}
        </>
      )}
      {dashboardHTML && (
        <ContainerTile loading={false}>
          <h2 className="text-xl font-bold mb-4">Summary Dashboard</h2>
          <div
            className="mt-4 whitespace-pre-wrap font-mono text-sm bg-white p-4 border rounded shadow"
            dangerouslySetInnerHTML={{ __html: dashboardHTML }}
          />
        </ContainerTile>
      )}
    </div>
  );
};

export default BankStatementAnalyzer;
