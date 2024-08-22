import LoadingState from "../LoadingState/LoadingState";
import ListTable from "../Common/ListTable/ListTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchBorrowerData } from "../../redux/Slices/borrowerSlice";
import { useParams } from "react-router-dom";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

const CustomerAddress = () => {
  const { subID } = useParams();
  const url = "/simah-recent-response";
  const dispatch = useDispatch();
  // const { CreditBureauDetails, loading, error } = useSelector(state => state.customerCare);
  const CreditBureauDetails = useBorrowerInfo(url);

  const { address } = CreditBureauDetails.response.message.item[0].rspreport.consumer[0].addresses;

  useEffect(() => {
    dispatch(fetchBorrowerData({ subID, url }))
  }, [dispatch])

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
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
