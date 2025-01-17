import React from 'react'
import { CustomerCareStats } from '../data/CustomerCareData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import SearchBox from '../components/Common/SearchBox/SearchBox';


const CustomerCarePage = () => {
    return (
        <>
            {/* <StatContainer stats={CustomerCareStats} /> */}
            <SearchBox/>
        </>
    )
}

export default CustomerCarePage