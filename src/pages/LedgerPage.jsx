import React from 'react'
import Body from '../components/Common/Body/Body'
import { ledgerArr, HeaderList } from '../data/LedgerData';
import LedgerListTable from '../components/LedgerListTable/LedgerListTable';


const CustomerCarePage = () => {
    return (
        <Body>
            <LedgerListTable ListName={"Ledger List"} ListHeader={HeaderList} ListItem={ledgerArr}/>
        </Body>
    )
}

export default CustomerCarePage