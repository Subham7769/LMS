import LoadingState from "../LoadingState/LoadingState";
import ListTable from "../Common/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBorrowerData } from "../../redux/Slices/borrowerSlice";
import { useParams } from "react-router-dom";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const CustomerAddress = () => {
  const { subID } = useParams();  // Extracting subID from the URL
  const url = "/simah-recent-response";  // The URL endpoint
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (subID) {  // Check if subID exists
      console.log("Fetching Customer Address Data");
      dispatch(fetchBorrowerData({ subID, url }));
    }
  }, [dispatch, subID, url]);  // Add subID and url to the dependency array
  
  const { CreditBureauDetails, loading, error } = useSelector(state => state.customerCare);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  const address = CreditBureauDetails?.response?.message?.item[0]?.rspreport?.consumer[0]?.addresses?.address || [];

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
        caloaddt: add.caloaddt || "N/A",
        cacadt: add.cacadt || "N/A",
        cacad1E: add.cacad1E || "N/A",
        cacad6: add.cacad6 || "N/A",
        cacad7: add.cacad7 || "N/A",
        cacad8E: add.cacad8E || "N/A",
        cacad9: add.cacad9 || "N/A",
      }))}
      Divider={true}
    />
  );
};

export default CustomerAddress;
