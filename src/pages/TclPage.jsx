import React from 'react'
import Body from '../components/Common/Body/Body'
import { TclStats, HeaderList, ProductList } from '../data/TclData';
import StatContainer from '../components/Common/StatContainer/StatContainer';
import ListTable from '../components/Common/ListTable/ListTable';


const TclPage = () => {
    return (
        <Body>
            <StatContainer stats={TclStats} />
            <ListTable  ListName={"TCL List"} ListHeader={HeaderList} ListItem={ProductList}/>
        </Body>
    )
}

export default TclPage