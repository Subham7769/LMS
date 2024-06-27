import React from 'react'
import Body from '../components/Common/Body/Body'
import ListTable from "../components/Common/ListTable/ListTable";
import { GroupStats, HeaderList, ProductList } from '../data/GroupData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const ProductGroupPage = () => {
    return (
        <Body>
            <StatContainer stats={GroupStats} />
            <ListTable 
            ListName={"Product Group List"} 
            ListHeader={HeaderList} 
            ListItem={ProductList}
            HandleAction={null}
            Searchable={true}
            />
        </Body>
    )
}

export default ProductGroupPage