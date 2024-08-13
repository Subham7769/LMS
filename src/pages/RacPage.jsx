import React from 'react';
import ListTable from "../components/Common/ListTable/ListTable";
import { RacStats, HeaderList, ProductList } from '../data/RacData';
import StatContainer from '../components/Common/StatContainer/StatContainer';

const RacPage = () => {

  return (
    <>
      <StatContainer stats={RacStats} />
      <ListTable
        ListName="RAC List"
        ListHeader={HeaderList}
        ListItem={ProductList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default RacPage;
