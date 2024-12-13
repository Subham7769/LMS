import React, { useState } from "react";
import InputSelect from "../../Common/InputSelect/InputSelect";
import Button from "../../Common/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { getFilteredAccountDetails } from "../../../redux/Slices/accountsSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const { accountDetails, filteredAccountDetails, loading, error } =
    useSelector((state) => state.accounts);
  const [filteredAccountNumber, setFilteredAccountNumber] = useState("");
  const accountNumberOptions = accountDetails.map((acc) => ({
    label: acc.accountNumber,
    value: acc.accountNumber,
  }));

  const handleChange = (e) => {
    setFilteredAccountNumber(e.target.value);
  };

  console.log(filteredAccountDetails);

  return (
    <>
      <div className="grid grid-cols-3 gap-5 items-end">
        <InputSelect
          labelName={"Select Account"}
          inputName={"filteredAccountNumber"}
          inputValue={filteredAccountNumber}
          inputOptions={accountNumberOptions}
          onChange={handleChange}
        />
        <div>
          <Button
            buttonName={"Submit"}
            rectangle={true}
            onClick={() =>
              dispatch(getFilteredAccountDetails(filteredAccountNumber))
            }
          />
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
