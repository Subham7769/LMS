import React, { useState } from "react";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import {
  suspendUser,
  clearFormData,
} from "../../redux/Slices/userManagementSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateValidationError } from "../../redux/Slices/validationSlice";
import Modal from "../Common/Modal/Modal";

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
      <Modal
        title={"Suspend User"}
        primaryButtonName="Suspend"
        primaryOnClick={handleSuspendUser}
        secondaryOnClick={onClose}
      >
        <form>
          <InputTextArea
            labelName="Reason for Suspension"
            inputName="suspensionReason"
            inputValue={suspensionReason}
            onChange={(e) => setSuspensionReason(e.target.value)}
            required
            isValidation={true}
            rowCount={4}
          />
        </form>
      </Modal>
    </>
  );
};

export default SuspendUserModal;
