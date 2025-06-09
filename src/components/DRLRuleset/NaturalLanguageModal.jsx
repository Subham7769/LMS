import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputTextArea from "../Common/InputTextArea/InputTextArea";

const NaturalLanguageModal = ({ isOpen, onClose }) => {
  const [rule, setRule] = useState("");
  const handleGenerateRule = () => {};
  const handleChange = (e) => {
    setRule(e.target.value);
  };
  if (!isOpen) return null;
  return (
    <>
      <Modal
        title={"Natural Language Rule Builder"}
        primaryButtonName="Generate Rule"
        primaryOnClick={handleGenerateRule}
        secondaryOnClick={onClose}
      >
        <InputTextArea
          labelName={"Describe your rule in natural language"}
          inputName="rule"
          inputValue={rule}
          onChange={handleChange}
          rowCount={5}
          placeHolder={"Eg: If monthly income is above 1000 and nationality is Zambian or Egyptian then approve the loan"}
        />
      </Modal>
    </>
  );
};

export default NaturalLanguageModal;
