import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { XCircleIcon } from "@heroicons/react/24/outline";
import formatNumber from "../../utils/formatNumber";
import BankStatementAnalyzer from "../BankStatementAnalyzer/BankStatementAnalyzer";
import LoadingState from "../LoadingState/LoadingState";

const BankAnalysisModal = ({ loading, onClose, bankConfigData, docId }) => {
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
          <div className="overflow-auto h-[400px]">
            <BankStatementAnalyzer
              docId={docId}
              proposedMontlyFinancing={formatNumber(
                bankConfigData[0]?.totalRequiredAmount.toFixed(2)
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BankAnalysisModal;
