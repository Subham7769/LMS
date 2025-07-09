import React, { useEffect, useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputNumber from "../Common/InputNumber/InputNumber";
import { useDispatch } from "react-redux";
import { updateSalienceBySectionId } from "../../redux/Slices/drlRulesetSlice";

const SalienceModal = ({ sectionId, isOpen, onClose, selectedSalience }) => {
  
  const [salience, setSalience] = useState(selectedSalience);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setSalience(selectedSalience);
    }
  }, [selectedSalience, isOpen]);
  const handleUpdateSalience = () => {
    if (salience !== undefined && salience !== "") {
      dispatch(
        updateSalienceBySectionId({ sectionId, salience: Number(salience) })
      );
      onClose();
    }
  };
  const handleChange = (e) => {
    setSalience(e.target.value);
  };
  if (!isOpen) return null;

  console.log(salience);
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
