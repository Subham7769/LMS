import React from 'react'
import Body from '../components/Common/Body/Body'
import ListTable from "../components/Common/ListTable/ListTable";
import { GroupStats, HeaderList, ProductList } from '../data/GroupData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const GroupPage = () => {
    return (
        <Body>
            <StatContainer stats={GroupStats} />
            <ListTable ListName={"Group List"} ListHeader={HeaderList} ListItem={ProductList}/>
        </Body>
    )
}

export default GroupPage