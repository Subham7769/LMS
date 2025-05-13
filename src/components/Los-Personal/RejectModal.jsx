import React from "react";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import Button from "../Common/Button/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const RejectModal = ({
  isOpen,
  onClose,
  userDetails,
  handleRejection,
  rejectionReason,
  setRejectionReason,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900/30 backdrop-blur-sm">
        <div className="relative bg-white dark:bg-gray-800 flex flex-col gap-7 p-5 rounded-lg shadow-lg w-3/4 lg:w-2/5 ">
          <XMarkIcon
            onClick={onClose}
            className="absolute top-1 right-1 h-6 w-6 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400"
          />
          <form>
            <InputTextArea
              labelName="Reason for Rejection"
              inputName="rejectionReason"
              inputValue={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
              isValidation={true}
              rowCount={5}
            />
          </form>
          <div className="flex gap-3 justify-end">
            <Button
              buttonName={"Cancel"}
              onClick={onClose}
              rectangle={true}
              buttonType="secondary"
            />
            <Button
              buttonName={"Reject"}
              onClick={() => handleRejection(userDetails)}
              rectangle={true}
              className={"self-end"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectModal;
