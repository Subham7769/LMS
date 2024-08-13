import React from 'react'
import ListTable from "../components/Common/ListTable/ListTable";
import { HomeStats, HeaderList, ProductList } from '../data/HomeData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const HomePage = () => {
    return (
        <>
            <StatContainer stats={HomeStats} />
            <ListTable 
            ListName={"Product List"} 
            ListHeader={HeaderList} 
            ListItem={ProductList}
            Searchable={true}
            Sortable={true} // New prop to enable/disable sorting
            />
        </>
    )
}

export default HomePage