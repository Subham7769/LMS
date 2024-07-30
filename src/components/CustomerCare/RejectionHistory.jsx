import { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import ListTable from "../Common/ListTable/ListTable";

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
    <ListTable
      ListHeader={["Rejection Date", "Rejection Reason"]}
      ListItem={rejectionsArr.map((reject) => ({
        rejectionDate: reject.formattedRejectionDate,
        rejectionReason: reject.rejectionReason,
      }))}
      Divider={true}
    />
  );
};

export default RejectionHistory;
