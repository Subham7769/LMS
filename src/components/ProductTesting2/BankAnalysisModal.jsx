import formatNumber from "../../utils/formatNumber";
import BankStatementAnalyzer from "../BankStatementAnalyzer/BankStatementAnalyzer";
import LoadingState from "../LoadingState/LoadingState";
import Modal from "../Common/Modal/Modal";

const BankAnalysisModal = ({ loading, onClose, bankConfigData, docId }) => {
  console.log(docId);
  console.log(bankConfigData);
  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Modal
        title={"Bank Statement Analysis"}
        isFooter={false}
        secondaryOnClick={onClose}
        modalWidth="lg:w-3/4"
      >
        <div className="overflow-auto h-[400px]">
          <BankStatementAnalyzer
            docId={docId}
            proposedMontlyFinancing={formatNumber(
              bankConfigData[0]?.totalRequiredAmount.toFixed(2)
            )}
          />
        </div>
      </Modal>
    </>
  );
};

export default BankAnalysisModal;
