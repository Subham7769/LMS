import React from 'react'
import Body from '../components/Common/Body/Body'
import ListTable from "../components/Common/ListTable/ListTable";
import { HomeStats, HeaderList, ProductList } from '../data/HomeData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const HomePage = () => {
    return (
        <Body>
            <StatContainer stats={HomeStats} />
            <ListTable ListName={"Product List"} ListHeader={HeaderList} ListItem={ProductList}/>
        </Body>
    )
}

export default HomePage