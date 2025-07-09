import React, { useState } from "react";
import InputText from "../Common/InputText/InputText";
import { addBank } from "../../redux/Slices/bankSlice";
import { useDispatch } from "react-redux";
import Modal from "../Common/Modal/Modal";

const AddBankModal = ({ isOpen, onClose }) => {
  const [bankName, setBankName] = useState("");
  const dispatch = useDispatch();

  const AddBank = async () => {
    await dispatch(addBank({ bankName })).unwrap();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Modal
        primaryButtonName={"Add"}
        primaryOnClick={AddBank}
        secondaryOnClick={onClose}
        title={"Add New Bank"}
      >
        <InputText
          labelName="Bank Name"
          inputName="bankName"
          inputValue={bankName}
          onChange={(e) => setBankName(e.target.value)}
          isValidation={true}
          disabled={false}
        />
      </Modal>
    </>
  );
};

export default AddBankModal;
