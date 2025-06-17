import React, { useEffect, useState } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { HeaderList, WorkflowsList } from "../data/WorkflowsData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/dynamicRacSlice";
import InstanceModal from "../components/WorkFlowManagement/InstanceModal";

const WorkflowsPage = () => {
  // const { HeaderList, RACList } = useSelector(
  //   (state) => state.dynamicRac.racStatsData
  // );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [showInstanceModal, setShowInstanceModal] = useState(false);

  const handleInstance = () => {
    setShowInstanceModal(true);
  };

  const closeInstance = () => {
    setShowInstanceModal(false);
  };

  const ActionList = [
    {
      name: "Create Instance",
      action: handleInstance,
      type: "primary",
    },
  ];
  // useEffect(() => {
  //   dispatch(fetchList());
  // }, [dispatch, menus]);
  return (
    <>
      {/* <StatContainer stats={RacStats} /> */}
      <ListTable
        ListName="Workflows List"
        ListHeader={HeaderList}
        ListItem={WorkflowsList}
        ListAction={ActionList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
      <InstanceModal isOpen={showInstanceModal} onClose={closeInstance} />
    </>
  );
};

export default WorkflowsPage;
