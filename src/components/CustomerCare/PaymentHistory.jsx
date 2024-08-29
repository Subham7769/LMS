import React, { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import ListTable from "../Common/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowerData } from "../../redux/Slices/borrowerSlice";
import { useParams } from "react-router-dom";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

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
  const dispatch = useDispatch();
  const { subID } = useParams();
  const { paymentHistory, loading, error } = useSelector((state) => state.customerCare);
  const [repaymentsArr, setRepaymentsArr] = useState([]);

  useEffect(() => {
    dispatch(fetchBorrowerData({ subID, url }))
  }, [dispatch])

  useEffect(() => {
    if (paymentHistory.length > 0) {
      setRepaymentsArr(
        paymentHistory.map((repay) => ({
          ...repay,
          formattedProcessDate: formatDate(repay.processDate),
        }))
      );
    }
  }, [paymentHistory]);

  const listItems = repaymentsArr.map((repayment) => ({
    processDate: repayment.formattedProcessDate,
    repaymentAmount: repayment.repaymentAmount,
    loanId: repayment.loanId,
    repaymentStatus: repayment.repaymentStatus,
    repaymentOriginator: repayment.repaymentOriginator,
  }))

  const listHeader = [
    "Payment Date",
    "Payment Amount",
    "Loan Id",
    "Payment Status",
    "Triggered By",
  ]

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }
  return (
    <ListTable
      ListHeader={listHeader}
      ListItem={listItems}
      Divider={true}
    />
  );
};

export default PaymentHistory;
