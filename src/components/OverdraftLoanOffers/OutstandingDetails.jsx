import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOverdraftLoanAccountOutstanding } from "../../redux/Slices/overdraftLoanOffersSlice";
import { useEffect } from 'react';
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import convertToReadableString from '../../utils/convertToReadableString'
import LoadingState from "../LoadingState/LoadingState";


const OutstandingDetails = () => {
  const { accountNumber } = useParams();
  const dispatch = useDispatch();
  const { accountOutstanding, loading, error } = useSelector(state => state.overdraftLoanOffers)

  console.log(accountOutstanding)

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  useEffect(() => {
    dispatch(getOverdraftLoanAccountOutstanding(accountNumber))
  }, [dispatch])

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
          Object.entries(accountOutstanding).map(([key, value]) => (<InfoRow key={key} label={convertToReadableString(key)} value={value} />))
        }
      </div>
    </ContainerTile >
  )
}

export default OutstandingDetails