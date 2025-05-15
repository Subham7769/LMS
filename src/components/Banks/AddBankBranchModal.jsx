import React from "react";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputSelectCreatable from "../Common/InputSelectCreatable/InputSelectCreatable";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";

const AddBankBranchModal = ({ isOpen, onClose, bankData, handleInputChange, handleAddFields, bankOptions, setBankOptions }) => {

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed z-20 inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center ">
        <div className="bg-white border border-red-600 p-8 rounded-xl w-1/2 relative shadow-lg transition-all duration-500 ease-in-out">
          <div
            onClick={onClose}
            className="h-9 w-9 cursor-pointer rounded-full text-white absolute top-1 right-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                fill="rgb(220 38 38)"
              />
            </svg>
          </div>
          <div className="mb-5 mt-3">
            <InputText
              labelName="Branch Name"
              inputName="branchName"
              inputValue={bankBranchDetailsList?.branchName}
              onChange={(e) => handleInputChange(e, "bankBranchDetailsList")}
              isValidation={true}
            />
            <InputText
              labelName="Branch Code"
              inputName="branchCode"
              inputValue={bankBranchDetailsList?.branchCode}
              onChange={(e) => handleInputChange(e, "bankBranchDetailsList")}
              isValidation={true}
            />
            <InputText
              labelName="Sort Code"
              inputName="sortCode"
              inputValue={bankBranchDetailsList?.sortCode}
              onChange={(e) => handleInputChange(e, "bankBranchDetailsList")}
              isValidation={true}
            />
          </div>
          <div className="text-right">
            <Button
              buttonIcon={CheckCircleIcon}
              buttonName={"Add Branch"}
              onClick={handleAddFields}
              rectangle={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBankBranchModal;
