import { useEffect, useState } from "react";

const RejectionHistoryComp = ({ rejectionHistoryData }) => {
  const [rejectionsarr, setRejectionsarr] = useState(
    rejectionHistoryData.map((repay) => ({
      ...repay,
      formattedRejectionDate: "",
    }))
  );
  useEffect(() => {
    const formattedrejections = rejectionsarr.map((repay) => {
      const dateObjSubmit = new Date(repay.rejectionDate);
      const yearSubmit = dateObjSubmit.getFullYear();

      // Month formatting with leading zero and to lowercase
      const monthSubmit = String(dateObjSubmit.getMonth() + 1).padStart(2, "0");
      const monthNameSubmit = new Date(
        yearSubmit,
        monthSubmit - 1
      ).toLocaleString("en-US", { month: "short" });
      const daySubmit = String(dateObjSubmit.getDate()).padStart(2, "0");
      const formattedRejectionDate = `${daySubmit} ${monthNameSubmit} ${yearSubmit}`;

      return {
        ...repay,
        formattedRejectionDate: formattedRejectionDate,
      };
    });
    setRejectionsarr(formattedrejections);
  }, []);
  return (
    <>
      <table className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-4 text-center">Rejection Date</th>
            <th className="py-3.5 px-4 text-center ">Rejection Reason</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {rejectionsarr.map((reject) => {
            return (
              <tr
                key={reject.id}
                className="divide-x divide-gray-200 text-center w-full"
              >
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {reject.formattedRejectionDate}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                  <div className=" mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {reject.rejectionReason}
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

export default RejectionHistoryComp;
