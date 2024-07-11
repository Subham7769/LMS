import React from "react";
import Body from "../components/Common/Body/Body";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { DebtBurdenStats, DebtCaseHeaderList, DebtPlanList } from "../data/DebtBurdenData";

const DebtBurdenPage = () => {
  return (
    <Body>
      <StatContainer stats={DebtBurdenStats} />
      <ListTable
        ListName={"Debt Burden List"}
        ListHeader={DebtCaseHeaderList}
        ListItem={DebtPlanList}
        HandleAction={null}
        Searchable={true}
      />
    </Body>
  );
};

export default DebtBurdenPage;
