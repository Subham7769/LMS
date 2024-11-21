import {  HeaderList } from "../data/LedgerData";
import LedgerListTable from "../components/LedgerListTable/LedgerListTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLedgerData } from "../redux/Slices/generalLedgerSlice";

const LedgerPage = () => {
  const dispatch = useDispatch();
  const { ledgerData, loading, error } = useSelector(state => state.ledger)

  useEffect(()=>{
    dispatch(fetchLedgerData())
  },[dispatch])

  return (
        <LedgerListTable
          ListName={"Ledger List"}
          ListHeader={HeaderList}
          ListItem={ledgerData}
          loading={loading}
          error={error}
        />
  );
};

export default LedgerPage;
