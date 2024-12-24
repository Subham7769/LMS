import React from "react";
import { SavingsStats } from "../data/SavingsData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import SearchBox from "../components/Common/SearchBox/SearchBox";

const SavingsPage = () => {
  return (
    <>
      <StatContainer stats={SavingsStats} />
      <SearchBox />
    </>
  );
};

export default SavingsPage;
