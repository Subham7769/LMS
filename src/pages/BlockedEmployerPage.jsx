import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { BlockedEmployerHeaderList, BlockedEmployerList, BlockedEmployerStats } from "../data/BlockEmployerData";

const BlockedEmployerPage = () => {
  return (
    <>
      <StatContainer stats={BlockedEmployerStats} />
      <ListTable
        ListName={"Blocked Employer List"}
        ListHeader={BlockedEmployerHeaderList}
        ListItem={BlockedEmployerList}
        HandleAction={null}
        Searchable={true}
        Sortable={true} // New prop to enable/disable sorting
        Divider={false}
      />
    </>
  );
};

export default BlockedEmployerPage;
