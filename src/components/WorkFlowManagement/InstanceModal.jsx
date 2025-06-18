import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputText from "../Common/InputText/InputText";
import InputEmail from "../Common/InputEmail/InputEmail";
import InputDate from "../Common/InputDate/InputDate";
import { handleChangeCreateInstanceData } from "../../redux/Slices/workflowManagementSlice";
import { useDispatch, useSelector } from "react-redux";

const InstanceModal = ({ isOpen, onClose }) => {
  const { createInstanceData } = useSelector((state) => state.workflowManagement);
  const dispatch = useDispatch();
  const handleSubmit = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeCreateInstanceData({ name, value }));
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <Modal
        title={"Initiate Debt Collection"}
        primaryButtonName={"Submit"}
        primaryOnClick={handleSubmit}
        secondaryOnClick={onClose}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <InputText
            labelName="Customer Name"
            inputName={"name"}
            inputValue={createInstanceData.name}
            onChange={handleChange}
          />
          <InputEmail
            labelName="Customer Email"
            inputName={"email"}
            inputValue={createInstanceData.email}
            onChange={handleChange}
          />
          <InputText
            labelName="Invoice Amount"
            inputName={"amount"}
            inputValue={createInstanceData.amount}
            onChange={handleChange}
          />
          <div>
            <InputDate
              labelName="Due Date"
              inputName={"dueDate"}
              inputValue={createInstanceData.dueDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InstanceModal;
