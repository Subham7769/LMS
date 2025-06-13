import LoadingState from "../LoadingState/LoadingState";
import Modal from "../Common/Modal/Modal";

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
      <Modal
        title={"Document Analysis Report"}
        isFooter={false}
        secondaryOnClick={onClose}
        modalWidth="lg:w-3/4"
      >
        {configData ? (
          <div className="overflow-auto h-[400px]">
            <div dangerouslySetInnerHTML={reportData} />
          </div>
        ) : (
          <div>No report generated</div>
        )}
      </Modal>
    </>
  );
};

export default DocumentAnalysisModal;
