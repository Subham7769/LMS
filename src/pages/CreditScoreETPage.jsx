import React from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import {
  CreditScoreETList,
  HeaderList,
  CreditScoreETStats,
} from "../data/CreditScoreETData";

const CreditScoreETPage = () => {
  return (
    <>
      <StatContainer stats={CreditScoreETStats} />
      <ListTable
        ListName={"Credit Score Eligible Tenure List"}
        ListHeader={HeaderList}
        ListItem={CreditScoreETList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default CreditScoreETPage;
