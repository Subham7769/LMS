import React, { useState } from "react";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { addBankBranch } from "../../redux/Slices/bankSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "../../assets/icons";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-800 flex flex-col w-3/4 rounded-lg shadow-lg p-4">
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
          <div className="grid xl:grid-cols-3 gap-5 mb-5 mt-3">
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
          <div className="text-right">
            <Button
              buttonIcon={CheckIcon}
              buttonName={"Add Branch"}
              onClick={AddBankBranch}
              rectangle={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBankBranchModal;
