import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputTextArea from "../Common/InputTextArea/InputTextArea";

const UpdateTaskModal = ({ isOpen, onClose }) => {
  const [comments, setComments] = useState("");
  const handleSubmit = () => {};
  const handleChange = (e) => {
    setComments(e.target.value)
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <Modal
        title={"Update Task"}
        primaryButtonName={"Mark Completed"}
        primaryOnClick={handleSubmit}
        secondaryOnClick={onClose}
      >
        <div className="">
          <InputTextArea
            labelName="Enter Comments"
            inputName={"comments"}
            inputValue={comments}
            onChange={handleChange}
            rowCount={5}
          />
        </div>
      </Modal>
    </>
  );
};

export default UpdateTaskModal;
