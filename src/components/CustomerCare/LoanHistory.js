import { loans } from "../../config";
import { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const LoanHistory = () => {
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
  }, [loansarr]);
  return (
    <>
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
                    View Details
                  </div>
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
