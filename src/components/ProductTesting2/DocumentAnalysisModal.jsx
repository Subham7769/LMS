import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { XCircleIcon } from "@heroicons/react/24/outline";
import formatNumber from "../../utils/formatNumber";
import BankStatementAnalyzer from "../BankStatementAnalyzer/BankStatementAnalyzer";
import LoadingState from "../LoadingState/LoadingState";

const DocumentAnalysisModal = ({ loading, onClose, configData }) => {
const reportData = {
  __html: configData
};
  console.log(configData);
  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative bg-white flex flex-col w-3/4 rounded-lg shadow-lg p-4">
          <div
            onClick={onClose}
            className="h-9 w-9 z-20 cursor-pointer rounded-full text-white absolute -top-3 -right-3 self-end"
          >
            <XCircleIcon className="w-9 h-9" fill="rgb(220 38 38)" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Document Analysis Report</h2>
          {console.log(configData)}
          {configData ?
          <div className="overflow-auto h-[400px]">
            <div dangerouslySetInnerHTML={reportData} />
          </div>
          :
            <div>No report generated</div>
          }
        </div>
      </div>
    </>
  );
};

export default DocumentAnalysisModal;
