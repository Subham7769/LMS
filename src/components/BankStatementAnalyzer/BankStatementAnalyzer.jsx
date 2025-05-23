import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import ListTable from "../Common/ListTable/ListTable";

import { saveAs } from 'file-saver';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";

const DOC_AI_ENDPOINT = import.meta.env.VITE_DOC_AI_ENDPOINT;
const DOC_AI_TOKEN = import.meta.env.VITE_DOC_AI_TOKEN;
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const serviceAccount = {
  "private_key": import.meta.env.VITE_SERVICE_ACCT_PK,
  "client_email": import.meta.env.VITE_SERVICE_ACCT_CLIENT_EMAIL,
};

const generateAccessToken = async () => {
  const now = Math.floor(Date.now() / 1000);
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };
  const claimSet = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };
  const base64url = (input) => {
    return btoa(JSON.stringify(input))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };
  const unsignedJWT = base64url(header) + '.' + base64url(claimSet);
  const keyPem = serviceAccount.private_key
    .replace(/-----.* PRIVATE KEY-----/g, '')
    .replace(/\n/g, '');
  const binaryDerString = atob(keyPem);
  const binaryDer = new Uint8Array([...binaryDerString].map(c => c.charCodeAt(0)));
  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryDer.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(unsignedJWT)
  );
  const b64signature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  const jwt = `${unsignedJWT}.${b64signature}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });
  const json = await res.json();
  return json.access_token;
};

const fetchDocumentBase64ByDocId = async (docId, authToken) => {
  const url = `${import.meta.env.VITE_LOAN_FILE_PREVIEW_COMPANY}${docId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
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

const BankStatementAnalyzer = (prop) => {
  //const { docId } = prop;

  const location = useLocation();

  // Support both prop and URL docId
  const query = new URLSearchParams(location.search);
  const docIdFromURL = query.get('docId');
  const docId = prop?.docId || docIdFromURL;

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [dashboardHTML, setDashboardHTML] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleExport = () => {
  //   if (!dashboardHTML) return;
  //   const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

  //   doc.setFont("Courier", "bold");
  //   doc.setFontSize(12);
  //   doc.text("Cash Flow Analysis Results", 40, 40);

  //   const metrics = [
  //     ["Average Monthly Cash Flow", "AED 925,000"],
  //     ["Average Monthly Deposits", "AED 1,850,000"],
  //     ["Average Monthly Withdrawals", "AED 925,000"],
  //     ["End Balance (APR)", "AED 635,000"],
  //     ["Available for Financing (30%)", "AED 277,500"],
  //   ];

  //   autoTable(doc, {
  //     head: [["Metric", "Value"]],
  //     body: metrics,
  //     startY: 55,
  //     theme: 'grid',
  //     headStyles: { fillColor: [52, 73, 94] },
  //     styles: { font: 'courier', fontSize: 10 },
  //   });

  //   setLoading(false);
  // };

  const handleExport = () => {
    if (!analysisData) {
      alert("No analysis data to export.");
      return;
    }

    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });

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
          return value.map((item) => {
            if (typeof item === 'object') {
              return Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ');
            }
            return item;
          }).join('\n');
        }
        if (typeof value === 'object') {
          return Object.entries(value).map(([k, v]) => `${k}: ${v}`).join('\n');
        }
        return value?.toString() ?? '';
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
        styles: { font: 'courier', fontSize: 9, cellWidth: 'wrap' },
        headStyles: { fillColor: [52, 73, 94] },
        theme: 'grid',
        didDrawPage: (data) => {
          yPosition = data.cursor.y + 20;
        },
      });
    });

    doc.save("Bank_Statement_Analysis.pdf");
  };

  const analyzeWithDocument = async (pdfBase64) => {
    setLoading(true);
    try {
      const token = await generateAccessToken();

      const docAIResponse = await axios.post(
        DOC_AI_ENDPOINT,
        {
          rawDocument: {
            content: pdfBase64,
            mimeType: 'application/pdf'
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const documentJson = docAIResponse.data;

       const openaiResponse = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: `You are a bank statement analyzer. Return a JSON object grouped by sections: 
                Section 1: Cash Flow Analysis that contains Average Monthly Cash Flow,  Average Monthly Deposits,  Average Monthly Withdrawals,Monthwise Account Balance Trend with End Balance, Available Amount for Financing calculated with 30% of average monthly cash flow 
                Section 2: Cash Flow Stability Assessment having Stability Score, Volatility Index as Low Medium High, Seasonal Patterns,Negative Balance Days,Insufficient Funds,Deposit Consistency,Revenue Diversification,Month-to-Month Variance
                Section 3: Transaction Pattern Analysis with Top 5 income source categories and top 5 expense categories with total %, Recurring trasactions and Unusal transactions
                Section 4: Debt Service Capacity having fields monthly Current Debt Obligations, 
                Section 5: Bank Statement Risk Indicators with analysis for Bounced Checks,No Loan Defaults,Irregular Large Withdrawals,No Unusual Payment Patterns,Unexplained Cash Deposits,No Overdraft Occurrences,Consistent Revenue Stream,Stable Operating Expenses,Minor Balance Fluctuations,Strong Liquidity Ratio and finally Risk Assessment and Bank statement Reliability as Low medium high.
                Identify the currency from the statement and add it to all the values.
                `
              },
              {
                role: 'user',
                content: `Here is the extracted text from a bank statement:\n\n${documentJson.document?.text ?? ''}`
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${OPENAI_KEY}`,
            },
          }
        );

      let parsedJson = null;
      try {
        const raw = openaiResponse.data.choices[0].message.content;
        const withoutBackticks = raw.replace(/^```json\s*|\s*```$/g, '').trim();
        const cleaned = withoutBackticks.replace(/:\s*"?(\d{1,3}(,\d{3})+(\.\d+)?)"?/g, (match) => {
          const number = match.replace(/,/g, '');
          return number;
        });

        parsedJson = JSON.parse(cleaned);
        setAnalysisData(parsedJson);
      } catch (e) {
        console.error("Failed to parse OpenAI response:", e);
        alert("Failed to parse analysis result. Check console for details.");
      }

    } catch (error) {
      console.error('Error analyzing statement:', error);
      alert('Something went wrong. Check console for details.');
    }
    setLoading(false);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please upload a PDF file');
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Content = reader.result.split(',')[1];
      await analyzeWithDocument(base64Content);
    };
    reader.readAsDataURL(file);
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

  const renderSection = (title, data) => (
    <ContainerTile loading={loading} key={title}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f3f4f6' }}>
          <tr>
            <th style={{ textAlign: 'left', fontWeight: '600' }}>Parameter</th>
            <th style={{ textAlign: 'left', fontWeight: '600' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([key, value], idx) => (
            <tr key={idx}>
              <td style={{ fontWeight: '500', color: '#374151' }}>{key}</td>
              <td style={{ color: '#111827' }}>
                {Array.isArray(value) ? (
                  <ul className="list-disc list-inside pl-4">
                    {value.map((item, i) => (
                      <li key={i}>
                        {typeof item === 'object'
                          ? Object.entries(item).map(([k, v]) => `${k}: ${v}`).join(', ')
                          : item}
                      </li>
                    ))}
                  </ul>
                ) : typeof value === 'object' ? (
                  <ul className="list-disc list-inside pl-4">
                    {Object.entries(value).map(([k, v], i) => (
                      <li key={i}>{k}: {v}</li>
                    ))}
                  </ul>
                ) : (
                  value
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </ContainerTile>
  );

  const renderPieChart = (data) => {
    const chartData = Object.entries(data).map(([key, value]) => ({ name: key, value: parseFloat(value) || 0 }));
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

    return (
      <RechartsPieChart width={400} height={300} className="mx-auto my-6">
        <Pie dataKey="value" data={chartData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {chartData.map((_, idx) => <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Bank Statement Analyzer</h1>
      <div className="flex gap-4 items-center mb-4">
        {!docId &&
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        }
        <Button buttonIcon={PlusIcon} buttonName={loading ? 'Analyzing...' : 'Upload & Analyze'} onClick={handleUpload} disabled={loading || !!docId} rectangle={true} />
        <Button buttonIcon={PlusIcon} buttonName="Download PDF" onClick={handleExport} disabled={!analysisData} rectangle={true} />
      </div>

      {analysisData && (
        <>
          {Object.entries(analysisData).map(([sectionTitle, sectionData], index) => (
            <div key={index}>
              {sectionTitle!== "currency" && renderSection(sectionTitle, sectionData)}
              {sectionTitle.toLowerCase().includes('expense') && typeof sectionData === 'object' && Object.keys(sectionData).length > 1 && (
                <ContainerTile className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
                  {renderPieChart(sectionData)}
                </ContainerTile>
              )}
            </div>
          ))}
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
