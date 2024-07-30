import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import ListTable from "../Common/ListTable/ListTable";

const CustomerAddress = () => {
  const url = "/simah-recent-response";
  const CBDetilsData = useBorrowerInfo(url);

  if (CBDetilsData.length === 0) {
    return <LoadingState />;
  }

  const { address } =
    CBDetilsData.response.message.item[0].rspreport.consumer[0].addresses;

  return (
    <ListTable
      ListHeader={[
        "No.",
        "Load date",
        "National Address",
        "Address Field 1",
        "Postal Box Number",
        "Postal Code",
        "State / City Name",
        "Country Code",
      ]}
      ListItem={address.map((add, index) => ({
        index: index + 1,
        caloaddt: add.caloaddt,
        cacadt: add.cacadt,
        cacad1E: add.cacad1E,
        cacad6: add.cacad6,
        cacad7: add.cacad7,
        cacad8E: add.cacad8E,
        cacad9: add.cacad9,
      }))}
      Divider={true}
    />
  );
};

export default CustomerAddress;
