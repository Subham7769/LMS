import React, { useEffect, useState } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { MyTasksHeaderList, MyTasksList } from "../data/WorkflowsData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/dynamicRacSlice";
import UpdateTaskModal from "../components/WorkFlowManagement/UpdateTaskModal";

const MyTasksPage = () => {
  // const { MyTasksHeaderList, RACList } = useSelector(
  //   (state) => state.dynamicRac.racStatsData
  // );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();
  const [updateTaskModal, setUpdateTaskModal] = useState(false);

  const handleUpdateTask = () => {
    setUpdateTaskModal(true);
  };

  const closeUpdateTask = () => {
    setUpdateTaskModal(false);
  };

  const ActionList = [
    {
      name: "Update Task",
      action: handleUpdateTask,
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
        ListName="My Tasks List"
        ListHeader={MyTasksHeaderList}
        ListItem={MyTasksList}
        ListAction={ActionList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
      <UpdateTaskModal isOpen={updateTaskModal} onClose={closeUpdateTask} />
    </>
  );
};

export default MyTasksPage;
