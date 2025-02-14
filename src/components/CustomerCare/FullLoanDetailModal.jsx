import { loanStatusOptions } from "../../data/OptionsData";
import { toast } from "react-toastify";
import { convertDate } from "../../utils/convertDate";

const LoanDetailSection = ({ loanDetails, copyToClipboard }) => (
  <div className="flex border-b border-border-gray-primary pb-5">
    <div className="grid grid-cols-[auto,1fr] gap-x-2 border-r border-border-gray-primary pr-4">
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
    </div>
    <div className="grid grid-cols-[auto,1fr] gap-x-2 border-r border-border-gray-primary px-4">
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
    </div>
    <div className="grid grid-cols-[auto,1fr] gap-x-2 border-r border-border-gray-primary px-4">
      <div>Loan Status</div>
      <div className="font-bold text-black">
        : <span className="mr-2">{""}</span>
        {loanStatusOptions[loanDetails.loanStatus].label}
      </div>
      <div>Total Outstanding</div>
      <div className="font-bold text-black">
        : <span className="mr-2">{""}</span>
        {loanDetails.totalOutstanding}
      </div>
    </div>
    <div className="grid grid-cols-[auto,1fr] gap-x-2 pl-4">
      <div>Submit Date</div>
      <div className="font-bold text-black">
        : <span className="mr-2">{""}</span>
        {convertDate(loanDetails.submitDate)}
      </div>
    </div>
  </div>
);

const TableHeader = () => (
  <thead className="bg-white sticky top-0">
    <tr className="divide-x divide-gray-200">
      {["No.", "Date", "Amount", "Status", "Interest Value"].map(
        (item, index) => (
          <th key={index} className="py-3.5 px-2 text-center text-gray-900">
            {item}
          </th>
        )
      )}
    </tr>
  </thead>
);

const TableRow = ({ loan, index }) => (
  <tr className="divide-x divide-gray-200 text-center w-full">
    {[
      index + 1,
      convertDate(loan.installmentDate),
      loan.amount,
      loan.paid ? "Paid" : "Unpaid",
      loan.interestValue,
    ].map((value, i) => (
      <td key={i} className="whitespace-nowrap py-4 px-2 text-gray-500">
        <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      </td>
    ))}
  </tr>
);

const InstallmentScheduleTable = ({ loansarrModal }) => (
  <div className="overflow-auto max-h-[260px]">
    <table className="divide-y divide-gray-300 w-full">
      <TableHeader />
      <tbody className="divide-y divide-gray-200 bg-white">
        {loansarrModal.map((loan, index) => (
          <TableRow key={loan.installmentId} loan={loan} index={index} />
        ))}
      </tbody>
    </table>
  </div>
);

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

const FullLoanDetailModal = ({ isOpen, onClose, loanDetails, loading }) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(loanDetails.loanId);
      toast.success("ID was copied successfully!");
    } catch (err) {
      toast.error("The ID was not copied!");
    }
  };

  if (!isOpen) return null;

  const handleOnClose = (e) => {
    if (e.target.id === "loanInfoContainer") onClose();
  };

  if (loading) {
    return (
      <div className="fixed z-20 inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center">
        <div className="bg-white border border-red-600 p-8 rounded-xl w-3/4 h-[500px] relative shadow-lg transition-all duration-500 ease-in-out">
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
      <div
        id="loanInfoContainer"
        onClick={handleOnClose}
        className="fixed z-20 inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="bg-white border border-red-600 p-8 rounded-xl w-3/4 h-[500px] relative shadow-lg transition-all duration-500 ease-in-out">
          <div className="font-semibold text-center text-xl text-gray-700 mb-5">
            Loan Information
          </div>
          <LoanDetailSection
            loanDetails={loanDetails}
            copyToClipboard={copyToClipboard}
          />
          <div className="text-lg mt-5 text-center">Installment Schedule</div>
          <InstallmentScheduleTable loansarrModal={loanDetails.installments} />
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

export default FullLoanDetailModal;
