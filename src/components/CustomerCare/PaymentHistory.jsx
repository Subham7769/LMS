import React, { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

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

const TableHeader = () => (
  <thead>
    <tr className="divide-x divide-gray-200">
      {[
        "Payment Date",
        "Payment Amount",
        "Loan Id",
        "Payment Status",
        "Triggered By",
      ].map((header, index) => (
        <th key={index} className="py-3.5 px-4 text-center text-gray-900">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

const TableCell = ({ children }) => (
  <td className="whitespace-nowrap py-4 px-4 text-gray-500">
    <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
      {children}
    </div>
  </td>
);

const TableRow = ({ repayment }) => (
  <tr className="divide-x divide-gray-200 text-center w-full">
    {[
      repayment.formattedProcessDate,
      repayment.repaymentAmount,
      repayment.loanId,
      repayment.repaymentStatus,
      repayment.repaymentOriginator,
    ].map((text, index) => (
      <TableCell key={index}>{text}</TableCell>
    ))}
  </tr>
);

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
    <table className="divide-y divide-gray-300">
      <TableHeader />
      <tbody className="divide-y divide-gray-200 bg-white">
        {repaymentsArr.map((repay, index) => (
          <TableRow key={repay.loanId + index} repayment={repay} />
        ))}
      </tbody>
    </table>
  );
};

export default PaymentHistory;
