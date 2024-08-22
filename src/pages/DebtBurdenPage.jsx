import React from "react";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { DebtBurdenStats, HeaderList, ProductList } from "../data/DebtBurdenData";

const DebtBurdenPage = () => {
  return (
    <>
      <StatContainer stats={DebtBurdenStats} />
      <ListTable
        ListName={"Debt Burden List"}
        ListNameAlign={""}
        ListHeader={HeaderList}
        ListItem={ProductList}
        Searchable={true}
        SearchBy={"caseId"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default DebtBurdenPage;
