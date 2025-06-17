import React, { useEffect, useState } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { IncidentsHeaderList, IncidentsList } from "../data/WorkflowsData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/dynamicRacSlice";

const IncidentsPage = () => {
  // const { IncidentsHeaderList, RACList } = useSelector(
  //   (state) => state.dynamicRac.racStatsData
  // );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchList());
  // }, [dispatch, menus]);
  return (
    <>
      {/* <StatContainer stats={RacStats} /> */}
      <ListTable
        ListName="Incidents List"
        ListHeader={IncidentsHeaderList}
        ListItem={IncidentsList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default IncidentsPage;
