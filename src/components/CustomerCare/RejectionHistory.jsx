import { useEffect, useState } from "react";
import ListTable from "../Common/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchBorrowerData } from "../../redux/Slices/borrowerSlice";
import { useParams } from "react-router-dom";

const RejectionHistory = () => {
  const { subID } = useParams();
  const dispatch = useDispatch();
  const url = "/rejection-history";
  const { rejectionHistory, loading, error } = useSelector(state => state.customerCare);
  const [rejectionsArr, setRejectionsArr] = useState([]);

  useEffect(() => {
    dispatch(fetchBorrowerData({ subID, url }))
  }, [dispatch])

  useEffect(() => {
    if (rejectionHistory.length > 0) {
      const formattedRejections = rejectionHistory.map((reject) => {
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
  }, [rejectionHistory]);


  return (
    <ListTable
      ListHeader={["Rejection Date", "Rejection Reason"]}
      ListItem={rejectionsArr.map((reject) => ({
        rejectionDate: reject.formattedRejectionDate,
        rejectionReason: reject.rejectionReason,
      }))}
      Divider={true}
      loading={loading}
      error={error}
    />
  );
};

export default RejectionHistory;
