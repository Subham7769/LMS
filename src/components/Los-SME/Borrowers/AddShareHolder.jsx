import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import HoverButton from "../../Common/HoverButton/HoverButton";
import Accordion from "../../Common/Accordion/Accordion";
import {
  handleChangeAddShareholderField,
  handleChangeUpdateShareholderField,
  addShareholder,
  removeShareholder,
  resetShareholder,
  addShareholderInfo,
  fetchAllCompanyBorrowersByLoanOfficer,
  fetchCompanyDetails,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddUpdateShareholderFields from "./AddUpdateShareholderFields";
import UpdateShareholderFields from "./UpdateShareholderFields";
const AddShareHolder = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const {
    shareHolderDetails,
    existingShareholderDetails,
    allCompanies,
    error,
    loading,
  } = useSelector((state) => state.smeBorrowers);
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

  const loanOfficer = localStorage.getItem("username");

  useEffect(() => {
    if (allCompanies.length < 1) {
      dispatch(fetchAllCompanyBorrowersByLoanOfficer({ loanOfficer }));
    }
  }, [dispatch]);

  // console.log(isValid);

  const handleSubmitNewShareholder = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(shareHolderDetails)));
    if (isValid) {
      dispatch(addShareholderInfo({ shareHolderDetails, companyId }))
        .unwrap()
        .then(() => {
          // After successful addition, fetch the updated company details
          dispatch(fetchCompanyDetails({ companyId }));
          dispatch(removeShareholder({ index:0 }))
        });
    }
  };
  const handleSubmitExistingShareholder = async (e,index) => {
    e.preventDefault();
    console.log(index)
    await dispatch(validateForm(flattenToSimpleObject(existingShareholderDetails[index])));
    if (isValid) {
      const {dataIndex, ...shareHolderDetailsUpdates} =  existingShareholderDetails[index]
      dispatch(addShareholderInfo({ shareHolderDetails:shareHolderDetailsUpdates, companyId }))
        .unwrap()
        .then(() => {
          // After successful addition, fetch the updated company details
          dispatch(fetchCompanyDetails({ companyId }));
          dispatch(removeShareholder({ index:0 }))
        });
    }
  };

  const changeCompany = (e) => {
    setCompanyId(e.target.value);
    dispatch(fetchCompanyDetails({ companyId: e.target.value }));
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-5 items-center">
        <InputSelect
          labelName={"Company"}
          inputName={"companyId"}
          inputOptions={allCompanies}
          inputValue={companyId}
          onChange={changeCompany}
        />
        <div></div>
        <div></div>
        <div className="flex justify-end gap-2 h-[90%]">
          {shareHolderDetails.length < 1 && (
            <HoverButton
              icon={PlusIcon}
              text="Add Shareholder"
              onClick={() => dispatch(addShareholder({ loanOfficer }))}
            />
          )}
        </div>
      </div>
      {existingShareholderDetails.length > 0 && (
        <div className=" flex flex-col mb-6">
          <p className="font-semibold mb-2">Existing Shareholders</p>
          {existingShareholderDetails.map((Data, index) => (
            <div className="relative" key={`Shareholder${index}`}>
              <Accordion
                heading={`Shareholder ${index + 1} Details`}
                renderExpandedContent={() => (
                  <>
                    <UpdateShareholderFields
                      BorrowerData={Data}
                      handleChangeReducer={handleChangeUpdateShareholderField}
                      dataIndex={Data.dataIndex}
                      index={index}
                    />
                    <div className="flex justify-end gap-5 col-span-4 mx-10 mt-4">
                      <Button
                        buttonName="Delete"
                        onClick={() => dispatch(resetShareholder({ index }))}
                        rectangle={true}
                        className={"bg-red-500 hover:bg-red-600"}
                      />
                      <Button
                        buttonName="Update"
                        onClick={(e)=>handleSubmitExistingShareholder(e,index)}
                        rectangle={true}
                        disabled={!companyId}
                      />
                    </div>
                  </>
                )}
              />
            </div>
          ))}
        </div>
      )}

      {shareHolderDetails.length > 0 && (
        <div className=" flex flex-col">
          <p className="font-semibold mb-2">New Shareholder</p>
          {shareHolderDetails.map((Data, index) => (
            <div className="relative" key={`Shareholder${index}`}>
              <Accordion
                heading={`New Shareholder Details`}
                renderExpandedContent={() => (
                  <>
                    <AddUpdateShareholderFields
                      BorrowerData={Data}
                      handleChangeReducer={handleChangeAddShareholderField}
                    />
                    <div className="flex justify-end gap-5 col-span-4 mx-10 mt-4">
                      <Button
                        buttonName="Reset"
                        onClick={() => dispatch(resetShareholder({ index }))}
                        rectangle={true}
                        className={"bg-red-500 hover:bg-red-600"}
                      />
                      <Button
                        buttonName="Submit"
                        onClick={handleSubmitNewShareholder}
                        rectangle={true}
                        disabled={!companyId}
                      />
                    </div>
                  </>
                )}
              />
              <XCircleIcon
                onClick={() => dispatch(removeShareholder({ index }))}
                className="h-7 w-7 absolute -right-3 -top-3 text-red-500 hover:text-red-600 hover:cursor-pointer"
                title="Delete Shareholder"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddShareHolder;
