import LoadingState from "../LoadingState";
import useBorrowerInfo from "../utils/useBorrowerInfo";
import PaymentHistoryComp from "./PaymentHistoryComp";

const PaymentHistory = () => {
  const url = "/repayments";
  const repaymentsData = useBorrowerInfo(url);
  if (repaymentsData.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <PaymentHistoryComp repaymentsData={repaymentsData} />
    </>
  );
};
export default PaymentHistory;
