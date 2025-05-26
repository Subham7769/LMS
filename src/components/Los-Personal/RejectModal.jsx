import React from "react";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import Modal from "../Common/Modal/Modal";

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
      <Modal
        title={"Reject Loan Application"}
        primaryButtonName={"Reject"}
        primaryOnClick={() => handleRejection(userDetails)}
        secondaryOnClick={onClose}
      >
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
      </Modal>
    </>
  );
};

export default RejectModal;
