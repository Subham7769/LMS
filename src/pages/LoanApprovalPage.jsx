import React, { useEffect } from "react";
import ListTable from "../components/Common/ListTable/ListTable";
import { LoanApprovalStats } from "../data/LoanApprovalData";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../redux/Slices/loanApprovalSlice";

const LoanApprovalPage = () => {
  const { LoanApprovalHeaderList, LoanApprovalList } = useSelector(
    (state) => state.loanApproval.loanApprovalStatsData
  );
  const { menus } = useSelector((state) => state.sidebar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch, menus]);

  return (
    <>
      {/* <StatContainer stats={LoanApprovalStats} />{" "} */}
      {/* Assuming there's a similar stats component for Approval Config */}
      <ListTable
        ListName="Approval Config List"
        ListHeader={LoanApprovalHeaderList}
        ListItem={LoanApprovalList}
        Searchable={true}
        SearchBy={"name"}
        Sortable={false} // New prop to enable/disable sorting
      />
    </>
  );
};

export default LoanApprovalPage;
