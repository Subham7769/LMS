import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { HeaderList, DRLRulesetList } from "../data/DRLRulesetData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/dynamicRacSlice";

const DRLRulesetPage = () => {
  // const { HeaderList, RACList } = useSelector(
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
        ListName="DRL Ruleset List"
        ListHeader={HeaderList}
        ListItem={DRLRulesetList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default DRLRulesetPage;
