import { useParams, useNavigate } from "react-router-dom";
import Button from "../Common/Button/Button";
import { useDispatch } from "react-redux";
import { downloadFile } from "../../redux/Slices/borrowerSlice";

// const API_BASE_URL =
//   "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers";

const DownloadReports = () => {
  const { subID } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleDownload = async (fileType, endpoint, contentType, fileName) => {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const url = `${API_BASE_URL}/${subID}/${endpoint}`;
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": contentType,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       if (response.status === 401 || response.status === 403) {
  //         localStorage.removeItem("authToken");
  //         navigate("/login");
  //       }
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const blob = await response.blob();
  //     const downloadUrl = window.URL.createObjectURL(blob);
  //     const link = document.createElement("a");
  //     link.href = downloadUrl;
  //     link.setAttribute("download", fileName);
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //     window.URL.revokeObjectURL(downloadUrl);
  //   } catch (error) {
  //     console.error("Download failed:", error);
  //   }
  // };

  const handleDownloadFile = (fileType, endpoint, contentType, fileName) => {
    dispatch(downloadFile({ subID, fileType, endpoint, contentType, fileName }));
  };

  return (
    <div className="flex gap-10">
      <Button
        buttonName="Export CSV File"
        onClick={() => handleDownloadFile("csv", "simah-report-CSV", "application/csv", "report_CSV.csv")}
        rectangle
      />
      <Button
        buttonName="Export PDF File"
        onClick={() => handleDownloadFile("pdf", "simahReport-To-PDF", "application/pdf", "report_PDF.pdf")}
        rectangle
      />
    </div>
  );
};

export default DownloadReports;
