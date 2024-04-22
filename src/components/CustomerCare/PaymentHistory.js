import { repayments } from "../../config";
import { useEffect, useState } from "react";

const PaymentHistory = () => {
  const [repaymentsarr, setRepaymentsarr] = useState(
    repayments.map((repay) => ({
      ...repay,
      formattedProcessDate: "",
    }))
  );
  useEffect(() => {
    const formattedRepayments = repaymentsarr.map((repay) => {
      const dateObjSubmit = new Date(repay.processDate);
      const yearSubmit = dateObjSubmit.getFullYear();

      // Month formatting with leading zero and to lowercase
      const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(2, "0");
      const monthNameSubmit = new Date(
        yearSubmit,
        monthSubmit - 1
      ).toLocaleString("en-US", { month: "short" });
      const daySubmit = String(dateObjSubmit.getDate()).padStart(2, "0");
      const formattedProcessDate = `${daySubmit} ${monthNameSubmit} ${yearSubmit}`;

      return {
        ...repay,
        formattedProcessDate: formattedProcessDate,
      };
    });
    setRepaymentsarr(formattedRepayments);
  }, []);
  return (
    <>
      <table className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-4 text-center">Payment Date</th>
            <th className="py-3.5 px-4 text-center "> Payment Amount</th>
            <th className="py-3.5 px-4 text-center text-gray-900">Loan Id</th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Payment Status
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Triggered By
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {repaymentsarr.map((repay, index) => {
            return (
              <tr
                key={index}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {repay.formattedProcessDate}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {repay.repaymentAmount}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {repay.loanId}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {repay.repaymentStatus}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {repay.repaymentOriginator}
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
export default PaymentHistory;
