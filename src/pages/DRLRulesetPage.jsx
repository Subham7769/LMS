import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/drlRulesetSlice";

const DRLRulesetPage = () => {
  const { HeaderList, DRLRulesetList } = useSelector(
    (state) => state.drlRuleset.dRulesStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
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
