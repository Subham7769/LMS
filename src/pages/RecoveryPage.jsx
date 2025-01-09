import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { RecoveryStats } from "../data/RecoveryData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/recoverySlice";

const RecoveryPage = () => {
  const { RecoveryHeaderList, RecoveryList } = useSelector(
    (state) => state.recovery.recoveryStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      {/* <StatContainer stats={RecoveryStats} />{" "} */}
      {/* Assuming there's a similar stats component for recovery */}
      <ListTable
        ListName="Recovery List"
        ListHeader={RecoveryHeaderList}
        ListItem={RecoveryList}
        Searchable={true}
        SearchBy={"caseId"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default RecoveryPage;
