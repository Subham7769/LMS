import { useEffect, useState } from "react";

const loanStatusOptions = [
  { value: 0, label: "All" },
  { value: 1, label: "Pending Approval" },
  { value: 2, label: "Activated" },
  { value: 3, label: "Closed" },
  { value: 4, label: "Frozen" },
  { value: 5, label: "Roll Overed" },
  { value: 6, label: "Cancelled" },
  { value: 7, label: "Late" },
  { value: 8, label: "Returned" },
  { value: 9, label: "Defaulted" },
];

const LoanInfoModal = ({ visible, onClose, loanDetails }) => {
  const [loansarrModal, setLoansarrModal] = useState([]);
  useEffect(() => {
    if (!loanDetails) return;
    const formattedLoansModal = loanDetails.installments.map((loanModal) => {
      const dateObjSubmit = new Date(loanModal.installmentDate);
      const yearSubmit = dateObjSubmit.getFullYear();

      // Month formatting with leading zero and to lowercase
      const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(2, "0");
      const monthNameSubmit = new Date(
        yearSubmit,
        monthSubmit - 1
      ).toLocaleString("en-US", { month: "short" });
      const daySubmit = String(dateObjSubmit.getDate()).padStart(2, "0");
      const formattedInstallmentDate = `${daySubmit} ${monthNameSubmit} ${yearSubmit}`;

      return {
        ...loanModal,
        formattedInstallmentDate: formattedInstallmentDate,
      };
    });
    setLoansarrModal(formattedLoansModal);
  }, [loanDetails]);
  if (!visible) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "loanInfoContainer") onClose();
  };
  return (
    <>
      <div
        id="loanInfoContainer"
        onClick={handleOnClose}
        className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white p-4 rounded overflow-y-auto overflow-x-hidden h-[400px] relative">
          <div className="font-semibold text-center text-xl text-gray-700 mb-5">
            Loan Information
          </div>
          <div className="flex gap-10 text-left border-b border-gray-300 pb-5">
            <div className="flex flex-col gap-y-3 border-r border-gray-300 pr-10">
              <div className="flex gap-2">
                <div className="w-28">Loan Id : </div>
                <div>{loanDetails.loanId}</div>
              </div>
              <div className="flex gap-2">
                <div className="w-28">Loan Amount : </div>
                <div>{loanDetails.loanAmount}</div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex">
                <div className="w-44">Loan Status : </div>
                <div>{loanStatusOptions[loanDetails.loanStatus].label}</div>
              </div>
              <div className="flex">
                <div className="w-44">Outstanding Principal : </div>
                <div>{loanDetails.outstandingPrincipal}</div>
              </div>
            </div>
          </div>
          <div className="text-lg mt-5">Installment Schedule</div>
          <table className="divide-y divide-gray-300">
            <thead>
              <tr className="divide-x divide-gray-200">
                <th className="py-3.5 px-2 text-center text-gray-900">No.</th>
                <th className="py-3.5 px-2 text-center text-gray-900">Date</th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Amount
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Status
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Interest Value
                </th>
                <th className="py-3.5 px-2 text-center text-gray-900">
                  Principal Value
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loansarrModal.map((loan, index) => {
                return (
                  <tr
                    key={loan.installmentId}
                    className="divide-x divide-gray-200 text-center w-full"
                  >
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4 px-2 text-gray-500 whitespace-nowrap">
                      <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                        {loan.formattedInstallmentDate}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                        {loan.totalRequiredAmount}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                        {loan.installmentStatus}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                        {loan.interestValue}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                      <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                        {loan.princpleValue}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div
          onClick={onClose}
          className="h-9 w-9 cursor-pointer rounded-full text-white absolute top-32 right-[300px]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              fill="rgb(220 38 38)"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default LoanInfoModal;
