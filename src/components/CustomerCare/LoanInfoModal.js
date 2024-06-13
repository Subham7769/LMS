import {
  ClipboardDocumentIcon,
  ClipboardIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";

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

const LoanInfoModal = ({ visible, onClose, loanDetails, mgLeft }) => {
  const [loansarrModal, setLoansarrModal] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(loanDetails.loanId);
      setCopySuccess("Copied!");
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"ID Copied!"}
          message={"ID was copied successfully!"}
        />
      ));
    } catch (err) {
      setCopySuccess("Failed to copy!");
      toast.custom((t) => (
        <Failed
          t={t}
          toast={toast}
          title={"Failed!"}
          message={"The ID was not copied!"}
        />
      ));
    }
  };

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
      <Toaster position="top-center" reverseOrder={false} />
      <div
        id="loanInfoContainer"
        onClick={handleOnClose}
        style={{ marginLeft: `${mgLeft}px` }}
        className="fixed inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white border border-red-600 p-8 rounded-xl w-3/4 h-[500px] relative shadow-lg transition-all duration-500 ease-in-out">
          <div className="font-semibold text-center text-xl text-gray-700 mb-5">
            Loan Information
          </div>
          <div className="flex gap-5 text-left border-b border-gray-300 pb-5">
            <div className="flex flex-col gap-y-3 border-r border-gray-300 pr-5">
              <div className="flex gap-2">
                <div className="w-28">Loan Id </div>
                <div className="font-bold text-black">
                  : <span className="mr-2">{""}</span>
                  {loanDetails.loanId}
                </div>
                <div>
                  <button onClick={copyToClipboard}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 text-black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-28">Loan Amount </div>
                <div className="font-bold text-black">
                  : <span className="mr-2">{""}</span>
                  {loanDetails.loanAmount}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3">
              <div className="flex">
                <div className="w-44">Loan Status </div>
                <div className="font-bold text-black">
                  :<span className="mr-2">{""}</span>
                  {loanStatusOptions[loanDetails.loanStatus].label}
                </div>
              </div>
              <div className="flex">
                <div className="w-44">Outstanding Principal </div>
                <div className="font-bold text-black">
                  :<span className="mr-2">{""}</span>
                  {loanDetails.outstandingPrincipal}
                </div>
              </div>
            </div>
          </div>
          <div className="text-lg mt-5">Installment Schedule</div>
          <div className="overflow-auto max-h-[260px] pr-5">
            <table className="divide-y divide-gray-300 w-full">
              <thead className="bg-white sticky top-0">
                <tr className="divide-x divide-gray-200">
                  <th className="py-3.5 px-2 text-center text-gray-900">No.</th>
                  <th className="py-3.5 px-2 text-center text-gray-900">
                    Date
                  </th>
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
            className="h-9 w-9 cursor-pointer rounded-full text-white absolute top-2 right-2"
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
      </div>
    </>
  );
};

export default LoanInfoModal;
