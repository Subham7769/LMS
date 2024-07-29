import { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

const RejectionHistory = () => {
  const url = "/rejection-history";
  const rejectionHistoryData = useBorrowerInfo(url);
  const [rejectionsArr, setRejectionsArr] = useState([]);

  useEffect(() => {
    if (rejectionHistoryData.length > 0) {
      const formattedRejections = rejectionHistoryData.map((reject) => {
        const dateObj = new Date(reject.rejectionDate);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const monthName = new Date(year, month - 1).toLocaleString("en-US", {
          month: "short",
        });
        const formattedRejectionDate = `${day} ${monthName} ${year}`;

        return {
          ...reject,
          formattedRejectionDate,
        };
      });
      setRejectionsArr(formattedRejections);
    }
  }, [rejectionHistoryData]);

  if (rejectionHistoryData.length === 0) {
    return <LoadingState />;
  }

  return (
    <table className="divide-y divide-gray-300">
      <thead>
        <tr className="divide-x divide-gray-200">
          <th className="py-3.5 px-4 text-center">Rejection Date</th>
          <th className="py-3.5 px-4 text-center">Rejection Reason</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {rejectionsArr.map((reject) => (
          <tr
            key={reject.id}
            className="divide-x divide-gray-200 text-center w-full"
          >
            <td className="whitespace-nowrap py-4 px-4 text-gray-500">
              <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                {reject.formattedRejectionDate}
              </div>
            </td>
            <td className="whitespace-nowrap py-4 px-4 text-gray-500">
              <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                {reject.rejectionReason}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RejectionHistory;
