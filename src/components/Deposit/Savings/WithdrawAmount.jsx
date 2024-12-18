import React, { useEffect, useState } from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Button from "../../Common/Button/Button";
import InputNumber from "../../Common/InputNumber/InputNumber";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAccountDetailsById,
  setFilteredAccountNumber,
  updateWithdrawAmount,
} from "../../../redux/Slices/accountsSlice";

const WithdrawAmount = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const { accountDetails, filteredAccountNumber, loading, error } = useSelector(
    (state) => state.accounts
  );
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    if (accountDetails.length == 0) {
      dispatch(fetchAccountDetailsById(userID));
    } else {
      dispatch(setFilteredAccountNumber(accountDetails[0]?.accountNumber));
    }
  }, [accountDetails, userID, dispatch]);

  const accountNumberOptions = accountDetails.map((acc) => ({
    label: acc.accountNumber,
    value: acc.accountNumber,
  }));

  const handleSubmit = async () => {
    const withdrawAmountData = {
      accountNumber: filteredAccountNumber,
      amount: withdrawAmount,
    };
    await dispatch(updateWithdrawAmount(withdrawAmountData)).unwrap();
    dispatch(fetchAccountDetailsById(userID));
  };
  return (
    <>
      <ContainerTile loading={loading}>
        <div className="text-lg">Proceed for Withdrawing Amount</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputSelect
            labelName="Select Account Number"
            inputOptions={accountNumberOptions}
            inputName="filteredAccountNumber"
            inputValue={filteredAccountNumber}
            onChange={(e) => {
              dispatch(setFilteredAccountNumber(e.target.value));
            }}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"withdrawAmount"}
            inputValue={withdrawAmount}
            onChange={(e) => {
              setWithdrawAmount(e.target.value);
            }}
            placeHolder={"5000"}
          />
        </div>
        <Button rectangle={true} buttonName={"Submit"} onClick={handleSubmit} />
      </ContainerTile>
    </>
  );
};

export default WithdrawAmount;
