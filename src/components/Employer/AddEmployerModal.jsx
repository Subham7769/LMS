import React from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputSelectCreatable from "../Common/InputSelectCreatable/InputSelectCreatable";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";
import Modal from "../Common/Modal/Modal";

const AddEmployerModal = ({ isOpen, onClose, employerData,affordabilityOptions, handleInputChange, handleAddFields, employerOptions, setEmployerOptions }) => {

  if (!isOpen) return null;

  return (
    <>
      <Modal
        primaryButtonName={"Add"}
        primaryOnClick={handleAddFields}
        secondaryOnClick={onClose}
        title={"Add New Employer"}
      >
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
      </Modal>
    </>
  );
};

export default AddEmployerModal;
