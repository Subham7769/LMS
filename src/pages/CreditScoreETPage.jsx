import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { CreditScoreETStats } from "../data/CreditScoreETData";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/eligiblityTenureSlice";

const CreditScoreETPage = () => {
  const { HeaderList, CreditScoreETList } = useSelector(
    (state) => state.creditScoreET.creditScoreETData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={CreditScoreETStats} />
      <ListTable
        ListName={"Eligible Tenure List"}
        ListHeader={HeaderList}
        ListItem={CreditScoreETList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default CreditScoreETPage;
