import { loans } from "../../config";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import LoanInfoModal from "./LoanInfoModal";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Select from "react-select";

const loanStatusOptions = [
  { value: "all", label: "All" },
  { value: "pendingApproval", label: "Pending Approval" },
  { value: "activated", label: "Activated" },
  { value: "closed", label: "Closed" },
  { value: "frozen", label: "Frozen" },
  { value: "rollOvered", label: "Roll Overed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "late", label: "Late" },
  { value: "returned", label: "Returned" },
  { value: "defaulted", label: "Defaulted" },
];

const LoanHistory = () => {
  const [selectedOption, setSelctedOption] = useState(loanStatusOptions[0]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
  };
  const [loansarr, setLoansarr] = useState(
    loans.map((loan) => ({
      ...loan,
      formattedSubmitDate: "",
      formattedPaidDate: "",
    }))
  );
  useEffect(() => {
    const formattedLoans = loansarr.map((loan) => {
      const dateObjSubmit = new Date(loan.submitDate);
      const yearSubmit = dateObjSubmit.getFullYear();

      // Month formatting with leading zero and to lowercase
      const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(2, "0");
      const monthNameSubmit = new Date(
        yearSubmit,
        monthSubmit - 1
      ).toLocaleString("en-US", { month: "short" });
      const daySubmit = String(dateObjSubmit.getDate()).padStart(2, "0");
      const formattedSubmitDate = `${daySubmit} ${monthNameSubmit} ${yearSubmit}`;

      const dateObjPaid = new Date(loan.paidDate); // Assuming paidDate exists
      const yearPaid = dateObjPaid.getFullYear();
      const monthPaid = String(dateObjPaid.getMonth() + 1).padStart(2, "0");
      const monthNamePaid = new Date(yearPaid, monthPaid - 1).toLocaleString(
        "en-US",
        { month: "short" }
      );
      const dayPaid = String(dateObjPaid.getDate()).padStart(2, "0");
      const formattedPaidDate = `${dayPaid} ${monthNamePaid} ${yearPaid}`;

      return {
        ...loan,
        formattedSubmitDate: formattedSubmitDate,
        formattedPaidDate: formattedPaidDate,
      };
    });
    setLoansarr(formattedLoans);
  }, []);
  const [showModal, setShowModal] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setShowModal(true);
  };
  return (
    <>
      <div className="flex items-end mb-10 w-full">
        <div className="w-1/3">&nbsp;</div>
        <div className="w-1/3 flex">
          <div>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
          </div>
        </div>
        <div className="relative w-1/3 flex justify-end">
          <div>
            <label
              htmlFor="loanStatus"
              className=" bg-white px-1 text-xs text-gray-900 gray-"
            >
              Select Loan Status
            </label>
            <Select
              className="w-52"
              options={loanStatusOptions}
              id="loanStatus"
              name="loanStatus"
              value={selectedOption}
              onChange={handleChange}
              isSearchable={false}
            />
          </div>
        </div>
      </div>
      <table className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-2 text-center">Loan ID</th>
            <th className="py-3.5 px-2 text-center ">Loan Status</th>
            <th className="py-3.5 px-2 text-center text-gray-900">Loan Type</th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              View Details
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Loan Amount
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Loan Origination
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Loan Disbursement
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Outstanding Principal
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Missed Installments Number
            </th>
            <th className="py-3.5 px-2 text-center text-gray-900">
              Clearnace Letter
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {loansarr.map((loan) => {
            return (
              <tr
                key={loan.loanId}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="py-4 px-2 text-gray-500 whitespace-nowrap">
                  <div
                    title={loan.loanId}
                    className="w-[100px] cursor-pointer flex mx-auto hover:text-gray-900"
                  >
                    <div className="w-[84px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {loan.loanId}
                    </div>
                    <div>
                      <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    Closed
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div
                    title={loan.loanType}
                    className="w-[100px] cursor-pointer flex mx-auto hover:text-gray-900"
                  >
                    <div className="w-[84px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {loan.loanType}
                    </div>
                    <div>
                      <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    <button onClick={() => handleViewDetails(loan)}>
                      View Details
                    </button>
                  </div>
                  <LoanInfoModal
                    onClose={() => setShowModal(false)}
                    visible={showModal}
                    loanDetails={selectedLoan}
                  />
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div
                    title={loan.loanAmount}
                    className="w-[100px] cursor-pointer flex mx-auto hover:text-gray-900"
                  >
                    <div className="w-[84px] whitespace-nowrap overflow-hidden text-ellipsis">
                      {loan.loanAmount}
                    </div>
                    <div>
                      <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {loan.formattedSubmitDate}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {loan.formattedPaidDate}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {loan.outstandingPrincipal}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {loan.missedInstallmentsNumber}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    PDF
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default LoanHistory;
