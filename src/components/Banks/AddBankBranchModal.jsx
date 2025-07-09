import React, { useState } from "react";
import InputText from "../Common/InputText/InputText";
import { useDispatch } from "react-redux";
import { addBankBranch } from "../../redux/Slices/bankSlice";
import Modal from "../Common/Modal/Modal";

const AddBankBranchModal = ({ isOpen, onClose, currentBankId }) => {
  const [branchName, setBranchName] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [sortCode, setSortCode] = useState("");
  const dispatch = useDispatch();

  if (!isOpen) return null;


  const AddBankBranch = async () => {
    await dispatch(addBankBranch({
      "bankId": currentBankId,
      branchCode,
      branchName,
      sortCode
    })).unwrap();
    onClose();
  }

  return (
    <>
      <Modal
        primaryButtonName={"Add Branch"}
        primaryOnClick={AddBankBranch}
        secondaryOnClick={onClose}
        title={"Add New Bank Branch"}
      >
        <div className="grid lg:grid-cols-2 gap-5 mb-5 mt-3">
          <InputText
            labelName="Branch Name"
            inputName="branchName"
            inputValue={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            isValidation={true}
            disabled={false}
          />
          <InputText
            labelName="Branch Code"
            inputName="branchCode"
            inputValue={branchCode}
            onChange={(e) => setBranchCode(e.target.value)}
            isValidation={true}
            disabled={false}
          />
          <InputText
            labelName="Sort Code"
            inputName="sortCode"
            inputValue={sortCode}
            onChange={(e) => setSortCode(e.target.value)}
            isValidation={true}
            disabled={false}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddBankBranchModal;
