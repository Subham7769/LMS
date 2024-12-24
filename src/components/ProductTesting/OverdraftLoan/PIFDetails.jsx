import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOverdraftLoanAccountPIF,
  getOverdraftAccountNumberList,
} from "../../../redux/Slices/overdraftLoanSlice";
import { useEffect } from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import convertToReadableString from "../../../utils/convertToReadableString";
import { useParams } from "react-router-dom";

const PIFDetails = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  const { accountPIF, accountNumberList, accountNumber, loading, error } =
    useSelector((state) => state.overdraftLoan);

  // console.log(accountPIF)

  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  useEffect(() => {
    if (!accountNumberList) {
      dispatch(getOverdraftAccountNumberList(userID));
    }
  }, [accountNumberList, userID, dispatch]);

  useEffect(() => {
    if (accountNumber) {
      dispatch(getOverdraftLoanAccountPIF(accountNumber));
    }
  }, [accountNumber, dispatch]);

  return (
    <ContainerTile loading={loading} error={error}>
      <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
        {Object.entries(accountPIF).map(([key, value]) => (
          <InfoRow
            key={key}
            label={convertToReadableString(key)}
            value={value}
          />
        ))}
      </div>
    </ContainerTile>
  );
};

export default PIFDetails;
