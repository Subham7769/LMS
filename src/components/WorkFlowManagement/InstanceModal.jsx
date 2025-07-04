import React, { useState } from "react";
import Modal from "../Common/Modal/Modal";
import InputText from "../Common/InputText/InputText";
import InputEmail from "../Common/InputEmail/InputEmail";
import InputDate from "../Common/InputDate/InputDate";
import { handleChangeCreateInstanceData } from "../../redux/Slices/workflowManagementSlice";
import { useDispatch, useSelector } from "react-redux";

const InstanceModal = ({ isOpen, onClose, loanId }) => {
  const { createInstanceData } = useSelector((state) => state.workflowManagement);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const userName = userData?.username || "";
  //Submit Process
  const handleSubmit = async() => {
    const today = new Date();
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 5);

    // Format to 'YYYY-MM-DD' (Camunda-friendly ISO format)
    const formattedDueDate = dueDate.toISOString().split('T')[0];

    const payload = {
      loanId: loanId ? loanId : "LHP20000030LUS",
      email: 'umesh.kshirsagar@gmail.com',
      fullName: 'Full Name',
      customerType: "Personal",
      paymentHistory: "Good",
      accountNumber:"ACC293030",
      daysPastDue:"10",
      amountDue:"1000",
      dueDate:formattedDueDate,
      assignedUser:userName,
      // etc.
    };
    
    try {
      const response = await fetch(`${import.meta.env.VITE_CAMUNDA_API_BASE}/api/debtors/start-process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to start collection process');

      toast.success(`Collection process started for ${payload.loanId}`);
    } catch (error) {
      toast.error('Start collection error:', error);
      toast.error(`Failed to start Collection process for ${payload.loanId}`);

    }    


  };
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
