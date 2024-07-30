import React, { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import ListTable from "../Common/ListTable/ListTable";

// Utility function for date formatting
const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const monthName = new Date(year, month - 1).toLocaleString("en-US", {
    month: "short",
  });
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${day} ${monthName} ${year}`;
};

const PaymentHistory = () => {
  const url = "/repayments";
  const repaymentsData = useBorrowerInfo(url);

  const [repaymentsArr, setRepaymentsArr] = useState([]);

  useEffect(() => {
    if (repaymentsData.length > 0) {
      setRepaymentsArr(
        repaymentsData.map((repay) => ({
          ...repay,
          formattedProcessDate: formatDate(repay.processDate),
        }))
      );
    }
  }, [repaymentsData]);

  if (repaymentsData.length === 0) {
    return <LoadingState />;
  }

  return (
    <ListTable
      ListHeader={[
        "Payment Date",
        "Payment Amount",
        "Loan Id",
        "Payment Status",
        "Triggered By",
      ]}
      ListItem={repaymentsArr.map((repayment) => ({
        processDate: repayment.formattedProcessDate,
        repaymentAmount: repayment.repaymentAmount,
        loanId: repayment.loanId,
        repaymentStatus: repayment.repaymentStatus,
        repaymentOriginator: repayment.repaymentOriginator,
      }))}
      Divider={true}
    />
  );
};

export default PaymentHistory;
