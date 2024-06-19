import LoadingState from "../LoadingState";
import useBorrowerInfo from "../../Utils/useBorrowerInfo";
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
