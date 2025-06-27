import React from "react";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";
import { ministriesOptions } from "../../data/LosData";
import { useSelector } from "react-redux";

const EditEmployerModal = ({
  isOpen,
  onClose,
  index,
  affordabilityOptions,
  handleChange,
  handleSave,
}) => {
  const { allEmployerData } = useSelector((state) => state.employer);
  const empData = allEmployerData[index];

  if (!isOpen || !empData) return null;

  return (
    <>
      <div className="fixed z-20 inset-0 bg-stone-200/10 backdrop-blur-sm flex justify-center items-center">
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
          <div className="grid md:grid-cols-2 gap-4 mb-5 mt-3">
            <InputText
              labelName="Employer Name"
              inputName="employerName"
              inputValue={empData?.employerName}
              onChange={(e) => handleChange(e, empData?.employerId)}
              isValidation={true}
            />
            <InputSelect
              labelName="Affordability Criteria"
              inputOptions={affordabilityOptions}
              inputName="affordabilityCriteriaTempId"
              inputValue={empData?.affordabilityCriteriaTempId}
              onChange={(e) => handleChange(e, empData?.employerId)}
              isValidation={true}
            />
            <InputSelect
              labelName="Day of Month"
              inputOptions={daysOfMonth}
              inputName="firstEmiDay"
              inputValue={empData?.firstEmiDay}
              onChange={(e) => handleChange(e, empData?.employerId)}
              isValidation={true}
            />
            <InputSelect
              labelName="Which Month ?"
              inputOptions={upcomingMonths}
              inputName="moratoriumMonths"
              inputValue={empData?.moratoriumMonths}
              onChange={(e) => handleChange(e, empData?.employerId)}
              isValidation={true}
            />
            <div className="md:col-span-2">
              <InputSelect
                labelName="Ministry"
                inputOptions={ministriesOptions}
                inputName="ministries"
                inputValue={empData?.ministries}
                onChange={(e) => handleChange(e, empData?.employerId)}
                isValidation={true}
                isMulti={true}
                searchable={true}
                isClearable={true}
              />
            </div>
          </div>
          <div className="text-right">
            <Button
              buttonIcon={CheckCircleIcon}
              buttonName={"Update"}
              onClick={() => handleSave(empData?.employerId, index)}
              rectangle={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEmployerModal;
