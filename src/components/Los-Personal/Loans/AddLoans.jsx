import React, { useEffect, useRef } from "react";
import AddLoanFields from "./AddLoanFields";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import { validateFormNullCheck } from "../../../redux/Slices/validationSlice";
import {
  saveDraftLoanData,
  submitLoan,
  getLoanApplicationsByID,
  fetchLoanProductData,
  setLoanApplicationId,
  setLoanBorrowerId,
  getMaxPrincipalData,
  getDocsByIdnUsage,
} from "../../../redux/Slices/personalLoansSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { sanitizeUid } from "../../../utils/sanitizeUid";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import { toast } from "react-toastify";
import { fieldToSectionMapPersonalLoans } from "../../../data/fieldSectionMapData";

const AddLoans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanApplicationId, BorrowerId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { addLoanData, loading, loanProductData } = useSelector(
    (state) => state.personalLoans
  );
  const sectionRefs = useRef({});
  // Decode the BorrowerId to restore its original value
  const decodedBorrowerId = decodeURIComponent(BorrowerId);
  // const isValid = useSelector((state) => state.validation.isValid);

  useEffect(() => {
    if (!currentPath.includes("new")) {
      dispatch(getLoanApplicationsByID(loanApplicationId));
    }
    dispatch(fetchLoanProductData());
    const keysArray = [
      "loanProductId",
      "disbursedBy",
      "uniqueID",
      "loanDurationStr",
      "repaymentTenureStr",
      "principalAmount",
      "loanCreationDate",
      "loanReleaseDate",
      "branch",
    ];
    dispatch(setFields(keysArray));
    dispatch(setLoanApplicationId(loanApplicationId));
    if (decodedBorrowerId !== "undefined") {
      dispatch(setLoanBorrowerId(decodedBorrowerId));
    }

    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, loanApplicationId, decodedBorrowerId]);

  // Fetch Documents by Id
  useEffect(() => {
    if (addLoanData?.generalLoanDetails?.loanProductId) {
      const selectedDynamicDoc = loanProductData.find(
        (product) =>
          product?.loanProductId ===
          addLoanData?.generalLoanDetails?.loanProductId
      );
      dispatch(
        getDocsByIdnUsage({
          dynamicDocumentTempId: selectedDynamicDoc?.dynamicDocumentTempId,
          usage: "BORROWER_OFFERS",
        })
      );
    }
  }, [dispatch, addLoanData?.generalLoanDetails?.loanProductId]);

  // console.log(loanOfferFields);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure borrowerId is set to the sanitized uniqueID
    if (!addLoanData?.generalLoanDetails?.uniqueID) {
      toast.error("Please enter a valid Borrower Unique ID ");
    }
    const sanitizedUniqueID = sanitizeUid(
      addLoanData.generalLoanDetails.uniqueID
    );
    const updatedLoanData = {
      ...addLoanData,
      generalLoanDetails: {
        ...addLoanData.generalLoanDetails,
        borrowerId: sanitizedUniqueID,
      },
    };
    await dispatch(validateFormNullCheck(flattenToSimpleObject(updatedLoanData)));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const firstInvalidKey = Object.keys(state.validation.validationError).find(
      (key) => state.validation.validationError[key]
    );

    if (firstInvalidKey) {
      const sectionName = fieldToSectionMapPersonalLoans[firstInvalidKey];
      const ref = sectionRefs.current[sectionName];
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    const submitPayload = {
      ...updatedLoanData.generalLoanDetails,
      documents: updatedLoanData.documents,
      loanApplicationId: updatedLoanData.loanApplicationId,
      refinanceDetails: updatedLoanData.refinanceDetails,
    };
    if (isValid) {
      await dispatch(saveDraftLoanData(updatedLoanData)).unwrap();
      await dispatch(submitLoan(submitPayload)).unwrap();
      navigate("/loan/loan-origination-system/personal/loans/loan-offers");
    }
  };

  const handleDraft = async () => {
    // Ensure borrowerId is set to the sanitized uniqueID
    if (!addLoanData?.generalLoanDetails?.uniqueID) {
      toast.error("Please enter a valid Borrower Unique ID ");
    }
    const sanitizedUniqueID = sanitizeUid(
      addLoanData.generalLoanDetails.uniqueID
    );
    const updatedLoanData = {
      ...addLoanData,
      generalLoanDetails: {
        ...addLoanData.generalLoanDetails,
        borrowerId: sanitizedUniqueID,
      },
    };
    await dispatch(saveDraftLoanData(updatedLoanData)).unwrap();
    navigate("/loan/loan-origination-system/personal/loans/loan-application");
  };

  const handleCanel = async () => {
    navigate("/loan/loan-origination-system/personal/loans/loan-application");
  };

  const getMaxPrincipal = async () => {
    const maxPrincipalPayload = {
      loanProductId: addLoanData.generalLoanDetails.loanProductId,
      borrowerId: addLoanData.generalLoanDetails.uniqueID,
      interestMethod: addLoanData.generalLoanDetails.interestMethod,
      loanInterest: addLoanData.generalLoanDetails.loanInterest,
      loanInterestType: addLoanData.generalLoanDetails.loanInterestType,
      tenure: addLoanData.generalLoanDetails.repaymentTenure,
      refinanceDetails: addLoanData.refinanceDetails,
    };
    await dispatch(getMaxPrincipalData(maxPrincipalPayload)).unwrap();
  };

  return (
    <>
      <div
        className={`text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-sm mb-3 p-4`}
      >
        Loan Application ID: {addLoanData?.loanApplicationId}
      </div>
      <AddLoanFields addLoanData={addLoanData} sectionRefs={sectionRefs} />
      {/* Resuable Button component not used because bg-gray-600 was not getting applied over bg-indigo-600 */}
      <div className="text-xs text-text-light-tertiary flex gap-1 my-2">
        <InformationCircleIcon className="-mt-0.5 h-5 w-5" aria-hidden="true" />
        Loan Product, Borrower Id, Loan Duration & Repayment Tenure required for
        fetching max principal Amount
      </div>
      <div className="grid grid-cols-2 md:flex justify-end gap-5 ">
        <Button
          buttonName="Get Max Principal Amt"
          onClick={getMaxPrincipal}
          buttonType="tertiary"
          loading={loading}
          disabled={
            !(
              addLoanData?.generalLoanDetails?.loanDuration &&
              addLoanData?.generalLoanDetails?.repaymentTenureStr
            )
          }
        />
        <Button
          buttonName="Save Draft"
          onClick={handleDraft}
          buttonType="secondary"
          loading={loading}
        />
        <Button buttonName="Submit" onClick={handleSubmit} loading={loading} />
        <Button
          buttonName="Cancel"
          onClick={handleCanel}
          loading={loading}
          buttonType="destructive"
        />
      </div>
    </>
  );
};

export default AddLoans;
