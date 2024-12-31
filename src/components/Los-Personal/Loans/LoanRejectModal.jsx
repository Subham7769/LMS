import React, { useState } from "react";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateValidationError } from "../../../redux/Slices/validationSlice";
import {
  getPendingLoans,
  rejectLoan,
} from "../../../redux/Slices/personalLoansSlice";
import { useNavigate } from "react-router-dom";

const LoanRejectModal = ({ isOpen, onClose, userDetails }) => {
  const [rejectionReason, setRejectionReason] = useState("");
  const dispatch = useDispatch();
  const { validationError } = useSelector((state) => state.validation);
  const navigate = useNavigate();

  const handleRejection = async (rowData) => {
    const rejectLoanPayload = {
      amount: rowData.principalAmount,
      applicationStatus: "REJECTED",
      loanId: rowData.loanId,
      uid: rowData.uid,
      rejectionReason: rejectionReason,
    };
    console.log(rejectLoanPayload);
    let isValid = true;
    if (rejectionReason === "") {
      dispatch(
        updateValidationError({ ...validationError, rejectionReason: true })
      );
      isValid = false;
    }
    if (isValid) {
      await dispatch(rejectLoan(rejectLoanPayload)).unwrap();
      await dispatch(getPendingLoans({ page: 0, size: 20 })).unwrap();
      onClose();
      navigate(`/loan/loan-origination-system/personal/loans/loan-history`);
      setRejectionReason("");
    }
  };

  // console.log(validationError);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white flex flex-col gap-7 p-5 rounded-lg shadow-lg w-4/5 ">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left">
            <InputText
              labelName="Reason for Rejection"
              inputName="rejectionReason"
              inputValue={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              required
              isValidation={true}
            />
          </form>
          <div className="flex gap-3 justify-center md:justify-end">
            <Button
              buttonName={"Cancel"}
              onClick={() => {
                onClose();
              }}
              className={" bg-gray-600 text-white hover:bg-gray-500 self-end"}
              rectangle={true}
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

export default LoanRejectModal;
