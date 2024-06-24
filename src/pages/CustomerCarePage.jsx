import React from 'react'
import Body from '../components/Common/Body/Body'
import { CustomerCareStats } from '../data/CustomerCareData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import SearchBox from '../components/Common/SearchBox/SearchBox';


const CustomerCarePage = () => {
    return (
        <Body>
            <StatContainer stats={CustomerCareStats} />
            <SearchBox/>
        </Body>
    )
}

export default CustomerCarePage