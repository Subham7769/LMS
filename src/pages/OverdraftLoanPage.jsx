import React from "react";
import { OverdraftLoanStats } from "../data/OverdraftLoanData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import SearchBox from "../components/Common/SearchBox/SearchBox";

const OverdraftLoanPage = () => {
  return (
    <>
      <StatContainer stats={OverdraftLoanStats} />
      <SearchBox />
    </>
  );
};

export default OverdraftLoanPage;
