import React from 'react';
import Body from '../components/Common/Body/Body';
import ListTable from "../components/Common/ListTable/ListTable";
import { RacStats, HeaderList, ProductList } from '../data/RacData';
import StatContainer from '../components/Common/StatContainer/StatContainer';

const RacPage = () => {

  return (
    <Body>
      <StatContainer stats={RacStats} />
      <ListTable
        ListName="RAC List"
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

export default RacPage;
