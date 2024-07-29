import React from 'react';
import Body from '../components/Common/Body/Body';
import ListTable from "../components/Common/ListTable/ListTable";
import { RecoveryStats, RecoveryHeaderList, RecoveryProductList } from '../data/RecoveryData';
import StatContainer from '../components/Common/StatContainer/StatContainer';

const RecoveryPage = () => {

  return (
    <Body>
      <StatContainer stats={RecoveryStats} /> {/* Assuming there's a similar stats component for recovery */}
      <ListTable
        ListName="Recovery List"
        ListHeader={RecoveryHeaderList}
        ListItem={RecoveryProductList}
        HandleAction={null}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
        Divider={false}
      />
    </Body>
  );
};

export default RecoveryPage;
