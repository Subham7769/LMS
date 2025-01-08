import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import HoverButton from "../../Common/HoverButton/HoverButton";
import Accordion from "../../Common/Accordion/Accordion";
import {
  resetCompanyData,
  registerBorrower,
  handleChangeAddShareholderField,
  addShareholder,
  removeShareholder,
  fetchAllCompanyBorrowersByLoanOfficer,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "./AddUpdateDirectorFields";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { companyRegistrationOptions } from "../../../data/LosData";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddUpdateShareholderFields from "./AddUpdateShareholderFields";
const AddShareHolder = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const { shareHolderDetails, allCompanies, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const [companyId, setCompanyId] = useState("");

  function flattenToSimpleObject(nestedObject) {
    const result = {};

    function recurse(current) {
      for (const key in current) {
        if (typeof current[key] === "object" && current[key] !== null) {
          recurse(current[key]);
        } else {
          result[key] = current[key];
        }
      }
    }

    recurse(nestedObject);
    console.log(result);
    return result;
  }

  useEffect(() => {
    if (allCompanies.length < 1) {
      const loanOfficer = localStorage.getItem("username");
      dispatch(fetchAllCompanyBorrowersByLoanOfficer({ loanOfficer }));
    }
  }, []);
  console.log(isValid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(shareHolderDetails)));
    if (isValid) {
      dispatch(registerBorrower(shareHolderDetails));
    }
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-5 items-center">
        <InputSelect
          labelName={"Company"}
          inputName={"companyId"}
          inputOptions={allCompanies}
          inputValue={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        />
        <div></div>
        <div></div>
        {/* <Button
          buttonName="Add Director"
          onClick={() => dispatch(addShareholder())}
          rectangle={true}
          className={"h-[70%]"}
        /> */}
        <div className="flex justify-end gap-2 h-[90%]">
          <HoverButton
            icon={PlusIcon}
            text="Add Shareholder"
            onClick={() => dispatch(addShareholder())}
          />
        </div>
      </div>
      <div className=" flex flex-col">
        {shareHolderDetails.map((Data, index) => (
          <div className="relative" key={`Director${index}`}>
            <Accordion
              heading={`Shareholder ${index + 1} Details`}
              renderExpandedContent={() => (
                <>
                  <AddUpdateShareholderFields
                    BorrowerData={Data}
                    handleChangeReducer={handleChangeAddShareholderField}
                  />
                </>
              )}
            />
            <XCircleIcon
              onClick={() => dispatch(removeShareholder({ index }))}
              className="h-7 w-7 absolute -right-3 -top-3 text-red-500 hover:text-red-600 hover:cursor-pointer"
              title="Delete Director"
            />
          </div>
        ))}
      </div>
      {/* <AddUpdateDirectorFields BorrowerData={shareHolderDetails.shareHolderDetails[0]}  handleChangeReducer={handleChangeAddShareholderField} /> */}
      <div className="flex justify-end gap-5 col-span-4 mx-10 mt-4">
        <Button
          buttonName="Reset"
          onClick={() => dispatch(resetCompanyData())}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
        />
        <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );
};

export default AddShareHolder;
