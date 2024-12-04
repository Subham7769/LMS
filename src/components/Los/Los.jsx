import React, { useEffect } from "react";
import StatContainer from "../Common/StatContainer/StatContainer";
import { HomeStats } from "../../data/HomeData";

const DebtBurdenPage = () => {

  return (
    <>
      <StatContainer stats={HomeStats} />
    </>
  );
};

export default DebtBurdenPage;