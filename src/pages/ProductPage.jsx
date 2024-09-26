import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { ProductStats } from "../data/ProductData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/productSlice";

const ProductPage = () => {
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
      <StatContainer stats={ProductStats} />{" "}
      {/* Assuming there's a similar stats component for recovery */}
      <ListTable
        ListName="Recovery List"
        ListHeader={HeaderList}
        ListItem={ProductList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default ProductPage;
