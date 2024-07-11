import React from "react";
import Body from "../components/Common/Body/Body";
import ListTable from "../components/Common/ListTable/ListTable";
// import { ProductStats, HeaderList, ProductList } from "../data/ProductData";
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
      />
    </Body>
  );
};

export default CreditScoreEqPage;
