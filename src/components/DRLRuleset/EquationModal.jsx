import React from "react";
import Modal from "../Common/Modal/Modal";
import InputTextArea from "../Common/InputTextArea/InputTextArea";

const EquationModal = ({ isOpen, onClose, ruleManagerData, handleChange }) => {
  if (!isOpen) return null;
  return (
    <>
      <Modal
        primaryButtonName={"Save"}
        primaryOnClick={onClose}
        secondaryOnClick={onClose}
        title={"Update Rules Equation"}
        modalWidth="lg:w-3/4"
      >
        <InputTextArea
          labelName="Equation"
          inputName="ruleManagerEquation"
          inputValue={ruleManagerData.ruleManagerEquation}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default EquationModal;
