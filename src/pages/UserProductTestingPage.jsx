import React from 'react'
import { NewUserStats } from '../data/NewUserData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import SearchBox from '../components/Common/SearchBox/SearchBox';


const NewUserPage = () => {
    return (
        <>
            <StatContainer stats={NewUserStats} />
            <SearchBox/>
        </>
    )
}

export default NewUserPage