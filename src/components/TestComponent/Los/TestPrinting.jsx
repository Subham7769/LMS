import React, { useRef } from "react";
import {
  PDFDownloadLink,
  PDFViewer,
  Document,
  Page,
  Text,
} from "@react-pdf/renderer";

// Create Document Component
const PrintDocument = () => (
  <Document>
    <Page>
      <Text>Content to print goes here!</Text>
    </Page>
  </Document>
);

const TestPrinting = () => {
  const ref = useRef();
  return (
    <div>
      <div ref={ref}>
        <h1>Component Content</h1>
        <p>This content will be included in the PDF.</p>
      </div>
      <PDFDownloadLink document={<PrintDocument />} fileName="sample.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download PDF"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default TestPrinting;
