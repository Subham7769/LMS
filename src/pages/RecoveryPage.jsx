import React from 'react';
import ListTable from "../components/Common/ListTable/ListTable";
import { RecoveryStats, RecoveryHeaderList, RecoveryProductList } from '../data/RecoveryData';
import StatContainer from '../components/Common/StatContainer/StatContainer';

const RecoveryPage = () => {

  return (
    <>
      <StatContainer stats={RecoveryStats} /> {/* Assuming there's a similar stats component for recovery */}
      <ListTable
        ListName="Recovery List"
        ListHeader={RecoveryHeaderList}
        ListItem={RecoveryProductList}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
      />
    </>
  );
};

export default RecoveryPage;
