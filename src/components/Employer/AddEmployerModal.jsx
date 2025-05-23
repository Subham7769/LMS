import React from "react";
import Button from "../Common/Button/Button";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputSelectCreatable from "../Common/InputSelectCreatable/InputSelectCreatable";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";
import { CheckIcon } from "../../assets/icons";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AddEmployerModal = ({ isOpen, onClose, employerData,affordabilityOptions, handleInputChange, handleAddFields, employerOptions, setEmployerOptions }) => {

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-800 flex flex-col w-3/4 xl:w-1/2 rounded-lg shadow-lg p-4">
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
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
