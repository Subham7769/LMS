import { useParams, useNavigate } from "react-router-dom";

const DownloadReports = () => {
  const { subID } = useParams();
  const navigate = useNavigate();
  const handleDownloadCSV = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const url =
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/borrowers/" +
        subID +
        "/simah-report-CSV";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/csv",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "report_CSV.csv"); // You can rename the downloaded file here
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  const handleDownloadPDF = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const url =
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/borrowers/" +
        subID +
        "/simahReport-To-PDF";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.setAttribute("download", "report_PDF.pdf"); // You can rename the downloaded file here
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <>
      <div className="flex gap-10">
        <div onClick={handleDownloadCSV}>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export CSV File
          </button>
        </div>
        <div onClick={handleDownloadPDF}>
          <button
            type="button"
            className="cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export PDF File
          </button>
        </div>
      </div>
    </>
  );
};

export default DownloadReports;
