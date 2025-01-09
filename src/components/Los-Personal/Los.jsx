import React, { useEffect } from "react";
import StatContainer from "../Common/StatContainer/StatContainer";
import { HomeStats } from "../../data/HomeData";

const Los = () => {

  return (
    <>
      <StatContainer stats={HomeStats} />
    </>
  );
};

export default Los;