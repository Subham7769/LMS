import { useParams } from "react-router-dom";
import Button from "../Common/Button/Button";
import { useDispatch } from "react-redux";
import { downloadFile } from "../../redux/Slices/borrowerSlice";

const DownloadReports = () => {
  const { subID } = useParams();
  const dispatch = useDispatch();

  const handleDownloadFile = (fileType, endpoint, contentType, fileName) => {
    dispatch(
      downloadFile({ subID, fileType, endpoint, contentType, fileName })
    );
  };

  return (
    <div className="flex gap-10">
      <Button
        buttonName="Export CSV File"
        onClick={() =>
          handleDownloadFile(
            "csv",
            "simah-report-CSV",
            "application/csv",
            "report_CSV.csv"
          )
        }
        rectangle
      />
      <Button
        buttonName="Export PDF File"
        onClick={() =>
          handleDownloadFile(
            "pdf",
            "simahReport-To-PDF",
            "application/pdf",
            "report_PDF.pdf"
          )
        }
        rectangle
      />
    </div>
  );
};

export default DownloadReports;
