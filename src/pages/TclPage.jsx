import React from 'react'
import { TclStats, HeaderList, ProductList } from '../data/TclData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import ListTable from '../components/Common/ListTable/ListTable';


const TclPage = () => {
    return (
        <>
            <StatContainer stats={TclStats} />
            <ListTable
                ListName={"TCL List"}
                ListHeader={HeaderList}
                ListItem={ProductList}
                Searchable={true}
                Sortable={true} // New prop to enable/disable sorting
            />
        </>
    )
}

export default TclPage