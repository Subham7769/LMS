import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { DocumentConfigStats } from "../data/DocumentConfigData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/documentConfigSlice";

const DocumentConfigPage = () => {
  const { DocumentConfigHeaderList, DocumentConfigList } = useSelector(
    (state) => state.documentConfig.documentConfigStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);

  return (
    <>
      {/* <StatContainer stats={DocumentConfigStats} />{" "} */}
      {/* Assuming there's a similar stats component for Document Config */}
      <ListTable
        ListName="Document Config List"
        ListHeader={DocumentConfigHeaderList}
        ListItem={DocumentConfigList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default DocumentConfigPage;
