import React from "react";
import ListTable from "../../Common/ListTable/ListTable";
import { CollateralRegisterHeaderList, CollateralRegisterList } from "../../../data/LosData";

const CollateralRegister = () => {

  return (
      <ListTable
        ListName={"Borrowers List"}
        ListHeader={CollateralRegisterHeaderList}
        ListItem={CollateralRegisterList}
        Searchable={true}
        SearchBy={"borrower"}
        Sortable={true} 
      />
  );
};

export default CollateralRegister;
