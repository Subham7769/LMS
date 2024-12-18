import React, { useEffect, useState } from "react";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Button from "../../Common/Button/Button";
import InputNumber from "../../Common/InputNumber/InputNumber";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccountDetailsById,
  getFilteredAccountDetails,
  handleChangeInFilteredAccountData,
  setFilteredAccountNumber,
  updateAccount,
} from "../../../redux/Slices/accountsSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useParams } from "react-router-dom";
import { statusOption } from "../../../data/OptionsData";
import LoadingState from "../../LoadingState/LoadingState";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const { accountDetails,filteredAccountNumber,filteredAccountDetails, loading, error } =
    useSelector((state) => state.accounts);

  useEffect(() => {
    if (accountDetails.length == 0) {
      dispatch(fetchAccountDetailsById(userID));
    } else {
      dispatch(setFilteredAccountNumber(accountDetails[0]?.accountNumber));
    }
  }, [accountDetails, userID, dispatch]);

  useEffect(() => {
    if (filteredAccountNumber) {
      dispatch(getFilteredAccountDetails(filteredAccountNumber));
    }
  }, [filteredAccountNumber, dispatch]);

  const accountNumberOptions = accountDetails.map((acc) => ({
    label: acc.accountNumber,
    value: acc.accountNumber,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeInFilteredAccountData({ name, value }));
  };

  const handleUpdateAccount = async () => {
    await dispatch(updateAccount(filteredAccountDetails)).unwrap();
    await dispatch(fetchAccountDetailsById(userID)).unwrap();
  };

  return (
    <>
      <div className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer flex justify-between items-center w-full">
        <div className="w-1/4 font-bold">Update Account Details</div>
        <div className="w-1/4">
          <InputSelect
            labelName="Account Number List"
            inputName={"filteredAccountNumber"}
            inputValue={filteredAccountNumber}
            inputOptions={accountNumberOptions}
            onChange={(e) => {
              dispatch(setFilteredAccountNumber(e.target.value));
            }}
          />
        </div>
      </div>

      {Object.keys(filteredAccountDetails || {}).length > 0 ? (
        <ContainerTile loading={loading}>
          <div className="grid grid-cols-4 gap-5 items-end">
            <InputNumber
              labelName={"Daily Deposit Limit"}
              inputName={"dailyDepositLimit"}
              inputValue={filteredAccountDetails?.dailyDepositLimit}
              onChange={handleChange}
            />
            <InputNumber
              labelName={"Daily Withdrawal Limit"}
              inputName={"dailyWithdrawalLimit"}
              inputValue={filteredAccountDetails?.dailyWithdrawalLimit}
              onChange={handleChange}
            />
            <InputNumber
              labelName={"Max Deposit Limit"}
              inputName={"maxDepositLimit"}
              inputValue={filteredAccountDetails?.maxDepositLimit}
              onChange={handleChange}
            />
            <InputNumber
              labelName={"Minimum Balance"}
              inputName={"minimumBalance"}
              inputValue={filteredAccountDetails?.minimumBalance}
              onChange={handleChange}
            />
            <InputNumber
              labelName={"Minimum Balance To Apply Interest"}
              inputName={"minimumBalanceToApplyInterest"}
              inputValue={filteredAccountDetails?.minimumBalanceToApplyInterest}
              onChange={handleChange}
            />
            <InputNumber
              labelName={"Withdrawal Transaction Limit"}
              inputName={"withdrawalTransactionLimit"}
              inputValue={filteredAccountDetails?.withdrawalTransactionLimit}
              onChange={handleChange}
            />
            <InputSelect
              labelName="Account Status"
              inputName={"status"}
              inputValue={filteredAccountDetails?.status}
              inputOptions={statusOption}
              onChange={handleChange}
            />
          </div>
          <div className="text-right mt-5">
            <Button
              buttonName={"Update"}
              rectangle={true}
              onClick={handleUpdateAccount}
            />
          </div>
        </ContainerTile>
      ) : (
        <LoadingState />
      )}
    </>
  );
};

export default UpdateProfile;
