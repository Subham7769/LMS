import React from "react";
import Body from "../components/Common/Body/Body";
import { RecoveryStats, RecoveryHeaderList, RecoveryProductList } from "../data/RecoveryData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";

const RecoveryPage = () => {
  return (
    <Body>
      <StatContainer stats={RecoveryStats} />
      <ListTable
        ListName={"Recovery List"}
        ListHeader={RecoveryHeaderList}
        ListItem={RecoveryProductList}
        HandleAction={null}
        Searchable={true}
      />
    </Body>
  );
};

export default RecoveryPage;
