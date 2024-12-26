import React, { useEffect } from "react";
import StatContainer from "../Common/StatContainer/StatContainer";
import { HomeStats } from "../../data/HomeData";

const LosSME = () => {

  return (
    <>
      <StatContainer stats={HomeStats} />
    </>
  );
};

export default LosSME;