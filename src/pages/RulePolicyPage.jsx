import React from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import {
  RulePolicyList,
  HeaderList,
  RulePolicyStats,
} from "../data/RulePolicyData";

const RulePolicyPage = () => {
  return (
    <>
      <StatContainer stats={RulePolicyStats} />
      <ListTable
        ListName={"Rule Policy List"}
        ListHeader={HeaderList}
        ListItem={RulePolicyList}
        HandleAction={null}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
        Divider={false}
      />
    </>
  );
};

export default RulePolicyPage;
