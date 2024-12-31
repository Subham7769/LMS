import React, { useEffect } from "react";
import { TclStats } from "../data/TclData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/tclSlice";

const TclPage = () => {
  const { HeaderList, TCLList } = useSelector(
    (state) => state.tcl.tclStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      {/* <StatContainer stats={TclStats} /> */}
      <ListTable
        ListName={"TCL List"}
        ListHeader={HeaderList}
        ListItem={TCLList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default TclPage;
