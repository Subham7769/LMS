import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import RejectionHistoryComp from "./RejectionHistoryComp";

const RejectionHistory = () => {
  const url = "/rejection-history";
  const rejectionHistoryData = useBorrowerInfo(url);
  if (rejectionHistoryData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  return (
    <>
      <RejectionHistoryComp rejectionHistoryData={rejectionHistoryData} />
    </>
  );
};

export default RejectionHistory;
