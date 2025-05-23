import React, { useState } from "react";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import {
  addBank,
  fetchAllBank
} from "../../redux/Slices/bankSlice";
import { useDispatch } from "react-redux";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "../../assets/icons";

const AddBankModal = ({ isOpen, onClose }) => {
  const [bankName, setBankName] = useState("")
  const dispatch = useDispatch();

  const AddBank = async () => {
    await dispatch(addBank({ bankName })).unwrap();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-800 flex flex-col w-3/4 xl:w-1/2 rounded-lg shadow-lg p-4">
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
          <div className="mb-5 mt-3">
            <InputText
              labelName="Bank Name"
              inputName="bankName"
              inputValue={bankName}
              onChange={(e) => setBankName(e.target.value)}
              isValidation={true}
              disabled={false}
            />
          </div>
          <div className="text-right">
            <Button
              buttonIcon={CheckIcon}
              buttonName={"Add Bank"}
              onClick={AddBank}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBankModal;
