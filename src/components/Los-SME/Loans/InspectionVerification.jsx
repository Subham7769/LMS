import React, { useEffect } from "react";
import AddLoanFields from "./AddLoanFields";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  saveDraftLoanData,
  submitLoan,
  getLoanApplicationsByID,
  fetchLoanProductData,
  setLoanApplicationId,
  setLoanBorrowerId,
  getMaxPrincipalData,
  getDocsByIdnUsage,
} from "../../../redux/Slices/smeLoansSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { sanitizeUid } from "../../../utils/sanitizeUid";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import InspectionVerificationFields from "./InspectionVerificationFields";

const InspectionVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanApplicationId, BorrowerId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { addLoanData, inspectionVerification, loading, loanProductData } = useSelector(
    (state) => state.smeLoans
  );
  // Decode the BorrowerId to restore its original value
  const decodedBorrowerId = decodeURIComponent(BorrowerId);
  // const isValid = useSelector((state) => state.validation.isValid);

  // console.log(BorrowerId);

  // useEffect(() => {
  //   if (!currentPath.includes("inspection-verification")) {
  //     dispatch(getLoanApplicationsByID(loanApplicationId));
  //   }
  //   dispatch(fetchLoanProductData());
  //   const keysArray = [
  //     "loanProductId",
  //     "borrowerId",
  //     "disbursedBy",
  //     "loanReleaseDate",
  //     "loanDurationStr",
  //     "repaymentTenureStr",
  //     "branch",
  //   ];
  //   dispatch(setFields(keysArray));
  //   dispatch(setLoanApplicationId(loanApplicationId));
  //   if (decodedBorrowerId != "undefined") {
  //     dispatch(setLoanBorrowerId(decodedBorrowerId));
  //   }
  //   return () => {
  //     dispatch(clearValidationError());
  //   };
  // }, [dispatch, loanApplicationId, decodedBorrowerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLoanData={};

    await dispatch(validateForm(flattenToSimpleObject(updatedLoanData)));
    // console.log(updatedLoanData);
    const state = store.getState();
    const isValid = state.validation.isValid;
    const submitPayload = {};
    if (isValid) {
      await dispatch(saveDraftLoanData(submitPayload)).unwrap();
      await dispatch(submitLoan(submitPayload)).unwrap();
      navigate("/loan/loan-origination-system/sme/loans/loan-offers");
    }
  };

  const handleDraft = async () => {
    const updatedLoanData = {};
    await dispatch(saveDraftLoanData(updatedLoanData)).unwrap();
    navigate("/loan/loan-origination-system/sme/loans/loan-application");
  };

  const handleCancel = async () => {
    navigate("/loan/loan-origination-system/sme/loans/loan-application");
  };


  if (loading) {
    return <ContainerTile loading={loading} />;
  }

  return (
    <>
      <div
        className={`border rounded-lg shadow-sm bg-gray-50 mb-3 hover:bg-indigo-50 px-4 py-4`}
      >
        <div className="text-gray-500">
          Loan Application ID: {"1234657899"}
        </div>
      </div>
      <InspectionVerificationFields inspectionVerification={inspectionVerification} />
      {/* Reusable Button component not used because bg-gray-600 was not getting applied over bg-indigo-600 */}
      <div className="flex justify-end mt-5 items-end">
        <div className="flex gap-x-5">
          <Button
            buttonName="Save Draft"
            onClick={handleDraft}
            buttonType="secondary"
            rectangle={true}
          />
          <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
          <Button
            buttonName="Cancel"
            onClick={handleCancel}
            rectangle={true}
            buttonType="destructive"
          />
        </div>
      </div>
    </>
  );
};

export default InspectionVerification;
