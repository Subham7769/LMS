import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { CreditScoreEqStats } from "../data/CreditScoreEqData";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/creditScoreSlice";

const CreditScoreEqPage = () => {
  const { HeaderList, CreditScoreEqList } = useSelector(
    (state) => state.creditScore.creditScoreStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={CreditScoreEqStats} />
      <ListTable
        ListName={"Credit Score Equation List"}
        ListHeader={HeaderList}
        ListItem={CreditScoreEqList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default CreditScoreEqPage;
