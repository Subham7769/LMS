import React from "react";
import { AccountsStats } from "../data/AccountsData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import SearchBox from "../components/Common/SearchBox/SearchBox";

const AccountsPage = () => {
  return (
    <>
      <StatContainer stats={AccountsStats} />
      <SearchBox />
    </>
  );
};

export default AccountsPage;
