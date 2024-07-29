import React from 'react';
import Body from '../components/Common/Body/Body';
import ListTable from "../components/Common/ListTable/ListTable";
import { ProductStats, HeaderList, ProductList } from '../data/ProductData';
import StatContainer from '../components/Common/StatContainer/StatContainer';

const ProductPage = () => {

    return (
        <Body>
            <StatContainer stats={ProductStats} /> {/* Assuming there's a similar stats component for recovery */}
            <ListTable
                ListName="Recovery List"
                ListHeader={HeaderList}
                ListItem={ProductList}
                HandleAction={null}
                Searchable={true}
                Sortable={true} // New prop to enable/disable sorting
                Divider={false}
            />
        </Body>
    );
};

export default ProductPage;
