import React from 'react'
import Body from '../components/Common/Body/Body'
import ListTable from "../components/Common/ListTable/ListTable";
import { ProductStats, HeaderList, ProductList } from '../data/ProductData';
import StatContainer from '../components/Common/StatContainer/StatContainer';


const ProductPage = () => {
    return (
        <Body>
            <StatContainer stats={ProductStats} />
            <ListTable 
            ListName={"Product List"} 
            ListHeader={HeaderList} 
            ListItem={ProductList}
            HandleAction={null}
            Searchable={true}
            />
        </Body>
    )
}

export default ProductPage