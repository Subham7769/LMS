import React, { useState } from "react";
import { ledgerArr, HeaderList } from "../data/LedgerData";
import LedgerListTable from "../components/LedgerListTable/LedgerListTable";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/Common/Loader/Loader";

const LedgerPage = () => {
  const [ledgerData, setLedgerData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchLedgerData = async () => {
      try {
        const fetchData = await axios.get(
          `${import.meta.env.VITE_GENERAL_LEDGER_READ}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(fetchData.data);
        setLedgerData(fetchData.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLedgerData();
  }, []);
  return (
    <>
      {ledgerData ? (
        <LedgerListTable
          ListName={"Ledger List"}
          ListHeader={HeaderList}
          ListItem={ledgerData}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default LedgerPage;
