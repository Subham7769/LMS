import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { AffordabilityStats } from "../data/AffordabilityData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/affordabilitySlice";

const AffordabilityPage = () => {
  const { AffordabilityHeaderList, AffordabilityList } = useSelector(
    (state) => state.affordability.affordabilityStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);

  return (
    <>
      {/* <StatContainer stats={AffordabilityStats} />{" "} */}
      {/* Assuming there's a similar stats component for Affordability */}
      <ListTable
        ListName="Affordability List"
        ListHeader={AffordabilityHeaderList}
        ListItem={AffordabilityList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default AffordabilityPage;
