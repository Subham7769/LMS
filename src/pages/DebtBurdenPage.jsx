import React, { useEffect } from "react";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { DebtBurdenStats } from "../data/DebtBurdenData";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/dbrConfigSlice";

const DebtBurdenPage = () => {
  const { HeaderList, DebtBurdenList } = useSelector(
    (state) => state.dbrConfig.debtBurdenStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);
  return (
    <>
      <StatContainer stats={DebtBurdenStats} />
      <ListTable
        ListName={"Debt Burden List"}
        ListNameAlign={""}
        ListHeader={HeaderList}
        ListItem={DebtBurdenList}
        Searchable={true}
        SearchBy={"caseId"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default DebtBurdenPage;
