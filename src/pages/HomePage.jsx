import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { HomeStats } from "../data/HomeData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/productSlice";

const HomePage = () => {
  const { HeaderList, ProductList } = useSelector(
    (state) => state.product.productStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={HomeStats} />
      <ListTable
        ListName={"Product List"}
        ListHeader={HeaderList}
        ListItem={ProductList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default HomePage;
