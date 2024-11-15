import React, { useEffect } from "react";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { BlockedEmployerStats } from "../data/BlockEmployerData";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/blockedEmployerSlice";

const BlockedEmployerPage = () => {
  const { HeaderList, BlockedEmployerList } = useSelector(
    (state) => state.blockedEmployer.beStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={BlockedEmployerStats} />
      <ListTable
        ListName={"Blocked Employer List"}
        ListHeader={HeaderList}
        ListItem={BlockedEmployerList}
        Searchable={true}
        SearchBy={"employerId"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default BlockedEmployerPage;
