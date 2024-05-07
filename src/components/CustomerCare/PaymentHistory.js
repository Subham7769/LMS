import useBorrowerInfo from "../utils/useBorrowerInfo";
import PaymentHistoryComp from "./PaymentHistoryComp";

const PaymentHistory = () => {
  const url = "/repayments";
  const repaymentsData = useBorrowerInfo(url);
  if (repaymentsData.length === 0) {
    return <>Fetching Data</>;
  }
  return (
    <>
      <PaymentHistoryComp repaymentsData={repaymentsData} />
    </>
  );
};
export default PaymentHistory;
