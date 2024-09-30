import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { RacStats, HeaderList, RACList } from "../data/RacData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/DynamicRacSlice";

const DynamicRacPage = () => {
  const { HeaderList, RACList } = useSelector(
    (state) => state.dynamicRac.racStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={RacStats} />
      <ListTable
        ListName="Dynamic RAC List"
        ListHeader={HeaderList}
        ListItem={RACList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default DynamicRacPage;
