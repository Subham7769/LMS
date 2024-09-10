import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOverdraftLoanAccountPIF } from "../../redux/Slices/overdraftLoanOffersSlice";
import { useEffect } from 'react';
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import convertToReadableString from '../../utils/convertToReadableString'
import LoadingState from "../LoadingState/LoadingState";


const PIFDetails = () => {
  const dispatch = useDispatch();
  const { accountPIF,accountNumberList,accountNumber, loading, error } = useSelector(state => state.overdraftLoanOffers)

  console.log(accountPIF)

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  useEffect(() => {
    if (accountNumberList.length > 0) {
      dispatch(getOverdraftLoanAccountPIF(accountNumberList[0].value));
    }
  }, [accountNumberList, dispatch]);

  useEffect(() => {
    if (accountNumber) {
      dispatch(getOverdraftLoanAccountPIF(accountNumber));
    }
  }, [accountNumber, dispatch]);

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <ContainerTile>
      <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
        {
          Object.entries(accountPIF).map(([key, value]) => (<InfoRow key={key} label={convertToReadableString(key)} value={value} />))
        }
      </div>
    </ContainerTile >
  )
}

export default PIFDetails