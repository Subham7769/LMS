import React from "react";
import Body from "../components/Common/Body/Body";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { DebtBurdenStats, HeaderList, ProductList } from "../data/DebtBurdenData";

const DebtBurdenPage = () => {
  return (
    <Body>
      <StatContainer stats={DebtBurdenStats} />
      <ListTable
        ListName={"Debt Burden List"}
        ListHeader={HeaderList}
        ListItem={ProductList}
        HandleAction={null}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
        Divider={false}
      />
    </Body>
  );
};

export default DebtBurdenPage;
