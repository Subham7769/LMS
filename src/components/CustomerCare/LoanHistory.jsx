import LoanHistoryComp from "./LoanHistoryComp";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState";

const LoanHistory = () => {
  const url = "/loans";
  const loanHistoryData = useBorrowerInfo(url);
  if (loanHistoryData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

  return (
    <>
      <LoanHistoryComp loanHistoryData={loanHistoryData} />
    </>
  );
};
export default LoanHistory;
