import React, { useEffect, useState } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { InstancesHeaderList, InstancesList } from "../data/WorkflowsData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/dynamicRacSlice";

const InstancesPage = () => {
  // const { InstancesHeaderList, RACList } = useSelector(
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
        ListName="Instances List"
        ListHeader={InstancesHeaderList}
        ListItem={InstancesList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default InstancesPage;
