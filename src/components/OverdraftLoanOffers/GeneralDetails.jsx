import LoadingState from "../LoadingState/LoadingState";
import ListTable from "../Common/ListTable/ListTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOverdraftLoanAccount } from "../../redux/Slices/overdraftLoanOffersSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import convertToReadableString from '../../utils/convertToReadableString'

const GeneralDetails = () => {
  const dispatch = useDispatch();
  const { overdraftDetails,accountNumberList, accountNumber, loading, error } = useSelector(state => state.overdraftLoanOffers)
  console.log(overdraftDetails)

  useEffect(() => {
    if (accountNumberList.length > 0) {
      dispatch(getOverdraftLoanAccount(accountNumberList[0].value));
    }
  }, [accountNumberList, dispatch]);

  useEffect(() => {
    if (accountNumber) {
      dispatch(getOverdraftLoanAccount(accountNumber));
    }
  }, [accountNumber, dispatch]);

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  const withModel = [
    "installmentDetailsList",
    "debitHistoryList",
    "paymentHistoryList",
    "supplementaryAccountsList"
  ];

  const renderListDetails = (key, data) => {
    if (!data) {
      return <ContainerTile><InfoRow label={`${convertToReadableString(key)}`} value={data} /></ContainerTile>
    }

    return (
      <div className={key === "supplementaryAccountsList" || key === "installmentDetailsList" || key === "paymentHistoryList" || key === "debitHistoryList" ? "col-span-2" : ""}>
        <ListTable
          ListName={`${convertToReadableString(key)}`}
          ListHeader={Object.keys(data[0]).map(item => convertToReadableString(item))}
          ListItem={Object.values(data).map(value => value)}
          Divider={true}
        />
      </div>
    );
  };

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <>
      <ContainerTile>
        <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
          {
            Object.entries(overdraftDetails).map(([key, value]) => {
              if (withModel.includes(key)) {
                // Skip rendering for fields in withModel
                return null;
              }

              // Conditional rendering for specific keys
              if (key === 'creationDate') {
                return <InfoRow key={key} label="Creation Date" value={new Date(value).toLocaleDateString()} />;
              }

              if (key === 'activationDate') {
                return <InfoRow key={key} label="Activation Date" value={new Date(value).toLocaleDateString()} />;
              }

              if (key === 'currency') {
                return (
                  <>
                    <InfoRow key={`${key}_name`} label="Currency" value={value.name} />
                    <InfoRow key={`${key}_correction`} label="Correction Factor" value={value.correctionFactor} />
                  </>
                );
              }

              // Default rendering for other fields
              return <InfoRow key={key} label={convertToReadableString(key)} value={value} />;
            })
          }
        </div>
      </ContainerTile >
      <div className="grid grid-cols-2 gap-4 text-[14px] pb-2 mt-5">
        {
          Object.entries(overdraftDetails).map(([key, value]) => {
            if (withModel.includes(key)) {
              return renderListDetails(key, value);
            }

            // Handle other fields here if needed
            return null;
          })
        }
      </div>
    </>
  );
};
export default GeneralDetails;
