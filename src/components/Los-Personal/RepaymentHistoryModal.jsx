import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ListTable from "../Common/ListTable/ListTable";
import { useEffect, useState } from "react";
import Modal from "../Common/Modal/Modal";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
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
      <div className="fixed z-50 inset-0 bg-gray-900/30 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl w-3/4 h-[500px] relative shadow-lg transition-all duration-500 ease-in-out">
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
      <Modal
        title={"Repayment History"}
        isFooter={false}
        secondaryOnClick={onClose}
        modalWidth="lg:w-3/4"
      >
        <ListTable
          ListHeader={listHeader}
          ListItem={listItems}
          Divider={true}
          loading={loading}
          Paginated={false}
        />
      </Modal>
    </>
  );
};

export default RepaymentHistoryModal;
