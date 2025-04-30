import React from "react";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import Button from "../Common/Button/Button";

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
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-2/5 ">
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
          <div className="flex gap-3 justify-center md:justify-end">
            <Button
              buttonName={"Cancel"}
              onClick={() => {
                onClose();
              }}
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
