import React from 'react'
import ListTable from "../components/Common/ListTable/ListTable";
import { GroupStats, HeaderList, ProductList } from '../data/GroupData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const ProductGroupPage = () => {
    return (
        <>
            <StatContainer stats={GroupStats} />
            <ListTable 
            ListName={"Product Group List"} 
            ListHeader={HeaderList} 
            ListItem={ProductList}
            HandleAction={null}
            Searchable={true}
            Sortable={true} // New prop to enable/disable sorting
            Divider={false}
            />
        </>
    )
}

export default ProductGroupPage