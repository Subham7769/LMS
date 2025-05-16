import React from "react";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputSelectCreatable from "../Common/InputSelectCreatable/InputSelectCreatable";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";
import { CheckIcon } from "../../assets/icons";

const AddEmployerModal = ({ isOpen, onClose, employerData,affordabilityOptions, handleInputChange, handleAddFields, employerOptions, setEmployerOptions }) => {

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black/50 backdrop-blur-sm">
        <div className="bg-white p-5 rounded-lg w-3/4 xl:w-1/2 relative shadow-lg transition-all duration-500 ease-in-out">
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
          <div className="grid md:grid-cols-2 gap-4 mb-5 mt-3">
            <InputSelectCreatable
              labelName="Employer Name"
              inputOptions={employerOptions}
              inputName="employerName"
              inputValue={employerData?.employerName}
              onChange={handleInputChange}
              isValidation={true}
              searchable={true}
              setInputOptions={setEmployerOptions}
              isClearable={true}
            />
            <InputSelect
              labelName="Affordability Criteria"
              inputOptions={affordabilityOptions}
              inputName="affordabilityCriteriaTempId"
              inputValue={employerData?.affordabilityCriteriaTempId}
              onChange={handleInputChange}
              isValidation={true}
            />
            <InputSelect
              labelName="Day of Month"
              inputOptions={daysOfMonth}
              inputName="firstEmiDay"
              inputValue={employerData?.firstEmiDay}
              onChange={handleInputChange}
              isValidation={true}
            />
            <InputSelect
              labelName="Which Month ?"
              inputOptions={upcomingMonths}
              inputName="moratoriumMonths"
              inputValue={employerData?.moratoriumMonths}
              onChange={handleInputChange}
              isValidation={true}
            />
          </div>
          <div className="text-right">
            <Button
              buttonIcon={CheckIcon}
              buttonName={"Add"}
              onClick={handleAddFields}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployerModal;
