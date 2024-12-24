import React, { useEffect, useState } from "react";
import ListTable from "../Common/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowerData } from "../../redux/Slices/customerCareSlice";
import { useParams } from "react-router-dom";

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
  const { paymentHistory, loading, error } = useSelector(
    (state) => state.customerCare
  );
  const [repaymentsArr, setRepaymentsArr] = useState([]);

  useEffect(() => {
    dispatch(fetchBorrowerData({ subID, url }));
  }, [dispatch]);

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
  }));

  const listHeader = [
    "Payment Date",
    "Payment Amount",
    "Loan Id",
    "Payment Status",
    "Triggered By",
  ];

  return (
    <>
      {repaymentsArr.length === 0 ? (
        <div className="text-center shadow-md bg-gray-100 border-gray-300 border py-5 rounded-xl mt-4 px-5">
          No Loan Data
        </div>
      ) : (
        <ListTable
          ListHeader={listHeader}
          ListItem={listItems}
          Divider={true}
          loading={loading}
        />
      )}
    </>
  );
};
export default PaymentHistory;
