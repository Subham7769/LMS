import React, { useEffect, useState } from "react";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Button from "../../Common/Button/Button";
import InputNumber from "../../Common/InputNumber/InputNumber";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccountDetailsById,
  getRecieverAccountDetails,
  handleChangeInTransferDetailsData,
  transferFunds,
} from "../../../redux/Slices/accountsSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useParams } from "react-router-dom";

const Internal = () => {
  const dispatch = useDispatch();
  const { userID } = useParams();
  const { accountDetails, transferDetails,recieverAccountDetails, loading } = useSelector(
    (state) => state.accounts
  );
  const [reciverUserId, setReciverUserId] = useState("")

  useEffect(() => {
    if (accountDetails.length == 0) {
      dispatch(fetchAccountDetailsById(userID));
    }
    dispatch(
      handleChangeInTransferDetailsData({ name: "isExternal", value: false })
    );
  }, [accountDetails, userID, dispatch]);

  const accountNumberOptions = accountDetails.map((acc) => ({
    label: acc.accountNumber + " (" + acc.accountCurrency + ")",
    value: acc.accountNumber,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeInTransferDetailsData({ name, value }));
  };

  const handleRecieverAccountDetails = () => {
    dispatch(getRecieverAccountDetails(reciverUserId));
  }

  const recieverAccountNumberOptions = recieverAccountDetails.map(
    (acc) => ({
      label: acc.accountNumber + " (" + acc.accountCurrency + ")",
      value: acc.accountNumber,
    })
  );

  const handleTransfer = async () => {
    await dispatch(transferFunds(transferDetails)).unwrap();
    await dispatch(fetchAccountDetailsById(userID)).unwrap();
  };

  return (
    <ContainerTile loading={loading} className={"relative"}>
      <div className="text-lg mb-5">Transfer funds within bank</div>
      <div className="grid grid-cols-3 gap-5 items-end mb-5">
        <InputNumber
          labelName={"Reciver User ID"}
          inputName={"reciverUserId"}
          inputValue={reciverUserId}
          onChange={(e) => setReciverUserId(e.target.value)}
        />
        <div className="">
          <Button
            buttonName={"Get Details"}
            rectangle={true}
            onClick={handleRecieverAccountDetails}
          />
        </div>
      </div>
      {recieverAccountNumberOptions.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-5 items-end">
            <InputSelect
              labelName="From Account"
              inputName={"fromAccountNumber"}
              inputValue={transferDetails.fromAccountNumber}
              inputOptions={accountNumberOptions}
              onChange={handleChange}
            />
            <InputSelect
              labelName="To Account"
              inputName={"toAccountNumber"}
              inputValue={transferDetails.toAccountNumber}
              inputOptions={recieverAccountNumberOptions}
              onChange={handleChange}
            />
            <InputNumber
              labelName={"Amount"}
              inputName={"amount"}
              inputValue={transferDetails?.amount}
              onChange={handleChange}
            />
          </div>
          <div className="text-right mt-5">
            <Button
              buttonName={"Submit"}
              rectangle={true}
              onClick={handleTransfer}
            />
          </div>
          <div className="absolute left-2 bottom-1 text-xs text-gray-500">
            Note: Transfers are allowed only between accounts with the same
            currency.
          </div>
        </>
      ) : (
        ""
      )}
    </ContainerTile>
  );
};

export default Internal;
