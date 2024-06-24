import React from 'react'
import Body from '../components/Common/Body/Body'
import { NewUserStats } from '../data/NewUserData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import SearchBox from '../components/Common/SearchBox/SearchBox';


const NewUserPage = () => {
    return (
        <Body>
            <StatContainer stats={NewUserStats} />
            <SearchBox/>
        </Body>
    )
}

export default NewUserPage