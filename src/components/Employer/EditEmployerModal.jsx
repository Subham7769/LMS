import React from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import { daysOfMonth, upcomingMonths } from "../../data/OptionsData";
import Modal from "../Common/Modal/Modal";
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

  console.log(empData);

  return (
    <>
      <Modal
        primaryButtonName={"Update"}
        primaryOnClick={() => handleSave(empData?.employerId, index)}
        secondaryOnClick={onClose}
        title={"Edit Employer"}
      >
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
      </Modal>
    </>
  );
};

export default EditEmployerModal;
