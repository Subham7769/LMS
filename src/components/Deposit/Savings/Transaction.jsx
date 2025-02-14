import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAccountDetailsById,
  getFilteredAccountDetails,
  setFilteredAccountNumber,
} from "../../../redux/Slices/accountsSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import ListTable from "../../Common/ListTable/ListTable";
import { convertDate } from "../../../utils/convertDate";

const Transaction = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const {
    accountDetails,
    filteredAccountNumber,
    filteredAccountDetails,
    loading,
    error,
  } = useSelector((state) => state.accounts);

  useEffect(() => {
    if (accountDetails.length == 0) {
      dispatch(fetchAccountDetailsById(userID));
    } else if (!filteredAccountNumber) {
      dispatch(setFilteredAccountNumber(accountDetails[0]?.accountNumber));
    }
  }, [accountDetails, userID, filteredAccountNumber, dispatch]);

  useEffect(() => {
    if (filteredAccountNumber) {
      dispatch(getFilteredAccountDetails(filteredAccountNumber));
    }
  }, [filteredAccountNumber, dispatch]);

  const transactionDetails =
    filteredAccountDetails?.transactionsHistory?.length > 0
      ? filteredAccountDetails.transactionsHistory.map((acc) => ({
          date: convertDate(acc.transactionDate),
          type: acc.transactionName,
          amount: Math.abs(acc.oldBalance - acc.newBalance),
          closingBalance: acc.newBalance,
        }))
      : [];

  const accountNumberOptions = accountDetails.map((acc) => ({
    label: acc.accountNumber,
    value: acc.accountNumber,
  }));

  return (
    <>
      <ContainerTile loading={loading}>
        <div className="mb-5 px-3 py-2 hover:bg-background-light-secondary rounded-md cursor-pointer flex justify-between items-center w-full">
          <div className="w-1/4 text-lg">Transactions List</div>
          <div className="w-1/3">
            <InputSelect
              labelName="Select Account Number"
              inputName={"filteredAccountNumber"}
              inputValue={filteredAccountNumber}
              inputOptions={accountNumberOptions}
              onChange={(e) => {
                dispatch(setFilteredAccountNumber(e.target.value));
              }}
            />
          </div>
        </div>
        {transactionDetails?.length > 0 ? (
          <ListTable
            ListHeader={["Date", "Type", "Amount", "Closing Balance"]}
            ListItem={transactionDetails}
            Divider={true}
            loading={loading}
          />
        ) : (
          <div className="text-center py-4 text-gray-500">
            No transaction history found.
          </div>
        )}
      </ContainerTile>
    </>
  );
};

export default Transaction;
