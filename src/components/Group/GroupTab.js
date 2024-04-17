import GroupComponent from "./GroupComponent";
import { useParams } from "react-router-dom";
const GroupTab = () => {
  const { grpNo } = useParams();
  return (
    <>
      <GroupComponent grpNo={grpNo} />
    </>
  );
};

export default GroupTab;
