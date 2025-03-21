import { XCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";
import ListTable from "../Common/ListTable/ListTable";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
    </div>
  );
};

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

const RepaymentHistoryModal = ({ isOpen, onClose, paymentHistory, loading }) => {
  if (!isOpen) return null;
  const [repaymentsArr, setRepaymentsArr] = useState([]);

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
    repaymentStatus: repayment.textualRepaymentStatus,
    repaymentOriginator: repayment.repaymentOriginator,
  }));

  const listHeader = [
    "Payment Date",
    "Payment Amount",
    "Loan Id",
    "Payment Status",
    "Triggered By",
  ];


  if (loading) {
    return (
      <div className="fixed z-20 inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white border  p-8 rounded-xl w-3/4 h-[500px] relative shadow-lg transition-all duration-500 ease-in-out">
          <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
            <ShimmerTable />
            <ShimmerTable />
            <ShimmerTable />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="relative bg-white flex flex-col w-3/4 rounded-lg shadow-lg p-4">
          <div
            onClick={onClose}
            className="h-9 w-9 z-20 cursor-pointer rounded-full text-white absolute -top-3 -right-3 self-end"
          >
            <XCircleIcon className="w-9 h-9" fill="rgb(220 38 38)" />
          </div>
          <div className="text-xl font-semibold flex gap-x-2 items-center">
            <CalendarIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Repayment History
          </div>

          <ListTable
            ListHeader={listHeader}
            ListItem={listItems}
            Divider={true}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default RepaymentHistoryModal;
