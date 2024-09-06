import React from 'react'
import { OverdraftLoanOffersStats } from '../data/OverdraftLoanOffersData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import SearchBox from '../components/Common/SearchBox/SearchBox';


const OverDraftLoanOffersPage = () => {
    return (
        <>
            <StatContainer stats={OverdraftLoanOffersStats} />
            <SearchBox/>
        </>
    )
}

export default OverDraftLoanOffersPage