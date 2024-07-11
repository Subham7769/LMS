import Body from "../components/Common/Body/Body";
import StatContainer from "../components/Common/StatContainer/StatContainer";
import ListTable from "../components/Common/ListTable/ListTable";
import { BlockedEmployerHeaderList, BlockedEmployerList, BlockedEmployerStats } from "../data/BlockEmployerData";

const BlockedEmployerPage = () => {
  return (
    <Body>
      <StatContainer stats={BlockedEmployerStats} />
      <ListTable
        ListName={"Blocked Employer List"}
        ListHeader={BlockedEmployerHeaderList}
        ListItem={BlockedEmployerList}
        HandleAction={null}
        Searchable={true}
      />
    </Body>
  );
};

export default BlockedEmployerPage;
