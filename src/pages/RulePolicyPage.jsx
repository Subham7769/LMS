import React from "react";
import Body from "../components/Common/Body/Body";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import {
  RulePolicyList,
  HeaderList,
  RulePolicyStats,
} from "../data/RulePolicyData";

const RulePolicyPage = () => {
  return (
    <Body>
      <StatContainer stats={RulePolicyStats} />
      <ListTable
        ListName={"Rule Policy List"}
        ListHeader={HeaderList}
        ListItem={RulePolicyList}
        HandleAction={null}
        Searchable={true}
      />
    </Body>
  );
};

export default RulePolicyPage;
