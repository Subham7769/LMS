import {  HeaderList } from "../data/LedgerData";
import LedgerListTable from "../components/LedgerListTable/LedgerListTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLedgerData } from "../redux/Slices/ledgerSlice";
import LoadingState from "../components/LoadingState/LoadingState";

const LedgerPage = () => {
  const dispatch = useDispatch();
  const { ledgerData, loading, error } = useSelector(state => state.ledger)

  useEffect(()=>{
    dispatch(fetchLedgerData())
  },[dispatch])

    // Conditional rendering based on loading and error states
    if (loading) {
      return <LoadingState />;
    }

  return (
        <LedgerListTable
          ListName={"Ledger List"}
          ListHeader={HeaderList}
          ListItem={ledgerData}
        />
  );
};

export default LedgerPage;
