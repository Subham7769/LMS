import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { RulePolicyStats } from "../data/RulePolicyData";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/rulePolicySlice";

const RulePolicyPage = () => {
  const { HeaderList, RulePolicyList } = useSelector(
    (state) => state.rulePolicy.rulePolicyStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={RulePolicyStats} />
      <ListTable
        ListName={"Rule Policy List"}
        ListHeader={HeaderList}
        ListItem={RulePolicyList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default RulePolicyPage;
