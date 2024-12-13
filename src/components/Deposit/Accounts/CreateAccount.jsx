import React from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputNumber from "../../Common/InputNumber/InputNumber";
import Button from "../../Common/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  createAccount,
  handleChangeInNewAccountData,
} from "../../../redux/Slices/accountsSlice";
import { currencyOptions } from "../../../data/CountryData";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { newAccountData, loading, error } = useSelector(
    (state) => state.accounts
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeInNewAccountData({ name, value }));
  };

  const handleCreateAccount = async () => {
    await dispatch(createAccount(newAccountData)).unwrap();
    navigate(`/deposit/save/accounts/${newAccountData.uid}/summary`);
  };
  return (
    <ContainerTile loading={loading}>
      <div className="grid grid-cols-4 gap-5">
        <InputText
          labelName={"User Id"}
          inputName={"uid"}
          inputValue={newAccountData.uid}
          onChange={handleChange}
        />
        <InputSelect
          labelName={"Account Currency"}
          inputName={"accountCurrency"}
          inputValue={newAccountData.accountCurrency}
          searchable={true}
          inputOptions={currencyOptions}
          onChange={handleChange}
        />
        <InputText
          labelName={"Account Holder Name"}
          inputName={"accountHolderName"}
          inputValue={newAccountData.accountHolderNameid}
          onChange={handleChange}
        />
        <InputNumber
          labelName={"Balance Amount"}
          inputName={"balanceAmount"}
          inputValue={newAccountData.balanceAmount}
          onChange={handleChange}
        />
      </div>

      <div className="text-right mt-5">
        <Button
          buttonName={"Create"}
          rectangle={true}
          onClick={handleCreateAccount}
        />
      </div>
    </ContainerTile>
  );
};

export default CreateAccount;
