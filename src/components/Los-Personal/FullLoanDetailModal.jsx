import { XCircleIcon, CalendarIcon } from "@heroicons/react/24/outline";
import ExpandableTable from "../Common/ExpandableTable/ExpandableTable";
import { convertDate } from "../../utils/convertDate";
import { toast } from "react-toastify";
import { loanStatusOptions } from "../../data/OptionsData";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

const FullLoanDetailModal = ({ isOpen, onClose, loanDetails, loading }) => {
  if (!isOpen) return null;

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

  const columns = [
    { label: "EMI No.", field: "emiNo" },
    { label: "Date", field: "installmentDate" },
    { label: "Interest Value", field: "interestValue" },
    { label: "Amount", field: "amount" },
    { label: "Status", field: "status" },
  ];

  const dataWithEmiNo = loanDetails?.installments?.map((item, index) => ({
    ...item,
    emiNo: index + 1,
    installmentDate: convertDate(item.installmentDate),
    status: item.paid ? "Paid" : "Unpaid",
  }));

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(loanDetails.loanId);
      toast.success("ID was copied successfully!");
    } catch (err) {
      toast.error("The ID was not copied!");
    }
  };

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
            EMI Schedule Details
          </div>
          <div className="grid grid-cols-3 gap-5 my-3 shadow bg-gray-100 rounded-lg py-3 px-5 text-sm">
            <div className="grid grid-cols-[auto,1fr] gap-x-2 border-r border-gray-300">
              <div>Loan Id</div>
              <div className="font-bold text-black flex w-[120px] items-center">
                : <span className="mr-2">{""}</span>
                <div className="whitespace-nowrap overflow-hidden text-ellipsis w-[100px]">
                  {loanDetails.loanId}
                </div>
                <button onClick={copyToClipboard} className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-black"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                    />
                  </svg>
                </button>
              </div>
              <div>Total Amount</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {loanDetails.totalAmount}
              </div>
              <div>Loan Status</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {loanDetails.carbonLoanStatus}
              </div>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-x-2 border-r border-gray-300">
              <div>Remaining Principal</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {loanDetails.remainingPrincipal}
              </div>
              <div>Remaining Interest</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {loanDetails.remainingInterest}
              </div>
              <div>Closing Amount</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {loanDetails.xcClosingAmount}
              </div>
            </div>
            <div className="grid grid-cols-[auto,1fr] gap-x-2 border-r border-gray-300">
              <div>Total Outstanding</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {loanDetails.totalOutstanding}
              </div>
              <div>Submit Date</div>
              <div className="font-bold text-black">
                : <span className="mr-2">{""}</span>
                {convertDate(loanDetails.submitDate)}
              </div>
            </div>
          </div>
          <div className="overflow-auto h-[400px]">
            <ExpandableTable columns={columns} data={dataWithEmiNo} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FullLoanDetailModal;
