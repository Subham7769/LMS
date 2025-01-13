import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import HoverButton from "../../Common/HoverButton/HoverButton";
import Accordion from "../../Common/Accordion/Accordion";
import {
  handleChangeAddDirectorField,
  addDirector,
  removeDirector,
  resetDirector,
  addDirectorInfo,
  fetchAllCompanyBorrowersListByLoanOfficer,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "../../Los-SME/Borrowers/AddUpdateDirectorFields";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
const AddDirector = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const { directorsKycDetails, allCompanies, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const [companyId, setCompanyId] = useState("");
  const loanOfficer = localStorage.getItem("username");


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
    if (directorsKycDetails.length < 1) {
      dispatch(addDirector({ loanOfficer, index: 0 }));
    }
    if (allCompanies.length < 1) {
      dispatch(fetchAllCompanyBorrowersListByLoanOfficer({ loanOfficer }));
    }
  }, [dispatch]);

  console.log(isValid);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(directorsKycDetails)));
    if (isValid) {
      dispatch(addDirectorInfo({ directorsKycDetails, companyId }));
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
        <div className="flex justify-end gap-2 h-[90%]">
          <HoverButton
            icon={PlusIcon}
            text="Add Director"
            onClick={() => dispatch(addDirector({ loanOfficer }))}
          />
        </div>
      </div>
      <div className=" flex flex-col">
        {directorsKycDetails.map((Data, index) => (
          <div className="relative" key={`Director${index}`}>
            <Accordion
              heading={`Director ${index + 1} Details`}
              renderExpandedContent={() => (
                <>
                  <AddUpdateDirectorFields
                    BorrowerData={Data}
                    handleChangeReducer={handleChangeAddDirectorField}
                    index={index}
                  />
                  <div className="flex justify-center gap-5 col-span-4 mx-10 mt-4">
                    <Button
                      buttonName="Reset Director"
                      onClick={() => dispatch(resetDirector({ index }))}
                      rectangle={true}
                      className={"bg-red-500 hover:bg-red-600"}
                    />
                  </div>
                </>
              )}
            />
            <XCircleIcon
              onClick={() => dispatch(removeDirector({ index }))}
              className="h-7 w-7 absolute -right-3 -top-3 text-red-500 hover:text-red-600 hover:cursor-pointer"
              title="Delete Director"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-5 col-span-4 mx-10 mt-4">
        <Button
          buttonName="Submit"
          onClick={handleSubmit}
          rectangle={true}
          disabled={!companyId}
        />
      </div>
    </>
  );
};

export default AddDirector;
