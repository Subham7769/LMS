import LoanHistoryComp from "./LoanHistoryComp";
import useBorrowerInfo from "../utils/useBorrowerInfo";

const LoanHistory = () => {
  const url = "/loans";
  const loanHistoryData = useBorrowerInfo(url);
  if (loanHistoryData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
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
