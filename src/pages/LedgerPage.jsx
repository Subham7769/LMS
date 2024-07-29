import React, { useState } from 'react'
import Body from '../components/Common/Body/Body'
import { ledgerArr, HeaderList } from '../data/LedgerData';
import LedgerListTable from '../components/LedgerListTable/LedgerListTable';
import { useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Common/Loader/Loader'



const CustomerCarePage = () => {
    const [ledgerData, setLedgerData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const fetchLedgerData = async () => {
            try {
                const fetchData = await axios.get("https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/gl/all", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(fetchData.data)
                setLedgerData(fetchData.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLedgerData();
    }, []);
    return (
        <Body>
            {ledgerData ? <LedgerListTable ListName={"Ledger List"} ListHeader={HeaderList} ListItem={ledgerData} /> : <Loader />}
        </Body>
    )
}

export default CustomerCarePage