import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { ProjectStats } from "../data/ProjectData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/projectSlice";

const ProjectPage = () => {
  const { HeaderList, ProjectList } = useSelector(
    (state) => state.project.projectStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);

  return (
    <>
      <StatContainer stats={ProjectStats} />
      <ListTable
        ListName={"Project List"}
        ListHeader={HeaderList}
        ListItem={ProjectList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default ProjectPage;
