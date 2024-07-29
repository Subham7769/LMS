import React from "react";
import Body from "../components/Common/Body/Body";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import {
  CreditScoreEqList,
  HeaderList,
  CreditScoreEqStats,
} from "../data/CreditScoreEqData";

const CreditScoreEqPage = () => {
  return (
    <Body>
      <StatContainer stats={CreditScoreEqStats} />
      <ListTable
        ListName={"Credit Score Equation List"}
        ListHeader={HeaderList}
        ListItem={CreditScoreEqList}
        HandleAction={null}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
        Divider={false}
      />
    </Body>
  );
};

export default CreditScoreEqPage;
