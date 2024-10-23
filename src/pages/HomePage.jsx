import React from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { HomeStats } from "../data/HomeData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { HeaderList, ProductList } = useSelector(
    (state) => state.product.productStatsData
  );
  return (
    <>
      <StatContainer stats={HomeStats} />
      <ListTable
        ListName={"Product List"}
        ListHeader={HeaderList}
        ListItem={ProductList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default HomePage;
