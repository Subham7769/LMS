import React, { useEffect } from 'react'
import ListTable from "../components/Common/ListTable/ListTable";
import { HomeStats} from '../data/reportingConfigData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/reportingConfigSlice";

const ReportingConfigPage = () => {
  const { HeaderList, ProductList } = useSelector(
    (state) => state.reportingConfig.reportingConfigStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);

  return (
    <>
      {/* <StatContainer stats={HomeStats} /> */}
      <ListTable
        ListName={"Reporting Config List"}
        ListHeader={HeaderList}
        ListItem={ProductList}
        Searchable={true}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  )
}

export default ReportingConfigPage