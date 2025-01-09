import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { GroupStats } from "../data/GroupData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/productGroupSlice";

const ProductGroupPage = () => {
  const { HeaderList, ProductGroupList } = useSelector(
    (state) => state.productGroup.productGroupStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      {/* <StatContainer stats={GroupStats} /> */}
      <ListTable
        ListName={"Product Group List"}
        ListHeader={HeaderList}
        ListItem={ProductGroupList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default ProductGroupPage;
