import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputNumber from "../Common/InputNumber/InputNumber";

const SalienceModal = ({ isOpen, onClose }) => {
  const [salience, setSalience] = useState();
  const handleUpdateSalience = () => {};
  const handleChange = (e) => {
    setSalience(e.target.value);
  };
  if (!isOpen) return null;
  return (
    <>
      <Modal
        title={"Update Salience"}
        primaryButtonName="Update"
        primaryOnClick={handleUpdateSalience}
        secondaryOnClick={onClose}
      >
        <InputNumber
          labelName={"Enter Salience"}
          inputName="salience"
          inputValue={salience}
          onChange={handleChange}
        />
      </Modal>
    </>
  );
};

export default SalienceModal;
