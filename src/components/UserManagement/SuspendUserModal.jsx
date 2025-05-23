import React, { useState } from "react";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import {
  suspendUser,
  clearFormData,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateValidationError } from "../../redux/Slices/validationSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SuspendUserModal = ({ isOpen, onClose, userDetails }) => {
  const [suspensionReason, setSuspensionReason] = useState("");
  const dispatch = useDispatch();
  const { validationError } = useSelector((state) => state.validation);

  const handleSuspendUser = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (suspensionReason === "") {
      dispatch(
        updateValidationError({ ...validationError, suspensionReason: true })
      );
      isValid = false;
    }
    if (isValid) {
      await dispatch(
        suspendUser({
          userName: userDetails.username,
          reason: suspensionReason,
        })
      ).unwrap();
      onClose();
      dispatch(clearFormData());
    }
  };

  // console.log(validationError);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-800 flex flex-col w-3/4 md:w-1/2 rounded-lg shadow-lg p-4">
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
          <form className="mb-4">
            <InputText
              labelName="Reason for Suspension"
              inputName="suspensionReason"
              inputValue={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              required
              isValidation={true}
            />
          </form>
          <div className="flex gap-3 justify-end">
            <Button
              buttonName={"Cancel"}
              onClick={() => {
                onClose();
              }}
              buttonType="destructive"
            />
            <Button
              buttonName={"Suspend"}
              onClick={handleSuspendUser}
              buttonType="secondary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuspendUserModal;
