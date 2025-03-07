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

const AddLoans = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanApplicationId, BorrowerId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { addLoanData, loading, loanProductData } = useSelector(
    (state) => state.smeLoans
  );
  // Decode the BorrowerId to restore its original value
  const decodedBorrowerId = decodeURIComponent(BorrowerId);
  // const isValid = useSelector((state) => state.validation.isValid);

  console.log(BorrowerId);

  useEffect(() => {
    if (!currentPath.includes("new")) {
      dispatch(getLoanApplicationsByID(loanApplicationId));
    }
    dispatch(fetchLoanProductData());
    const keysArray = [
      "loanProductId",
      "borrowerId",
      "disbursedBy",
      "loanReleaseDate",
      "loanDurationStr",
      "repaymentTenureStr",
      "branch",
    ];
    dispatch(setFields(keysArray));
    dispatch(setLoanApplicationId(loanApplicationId));
    if (decodedBorrowerId) {
      dispatch(setLoanBorrowerId(decodedBorrowerId));
    }
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, loanApplicationId, decodedBorrowerId]);

  useEffect(() => {
    if (addLoanData.generalLoanDetails.loanProductId) {
      const selectedDynamicDoc = loanProductData.find(
        (product) =>
          product?.loanProductId ===
          addLoanData?.generalLoanDetails?.loanProductId
      );
      dispatch(
        getDocsByIdnUsage({
          dynamicDocumentTempId: selectedDynamicDoc.dynamicDocumentTempId,
          usage: "BORROWER_OFFERS",
        })
      );
    }
  }, [dispatch, addLoanData.generalLoanDetails.loanProductId]);

  function flattenToSimpleObject(nestedObject) {
    const result = {};

    function recurse(current) {
      for (const key in current) {
        if (typeof current[key] === "object" && current[key] !== null) {
          recurse(current[key]);
        } else {
          result[key] = current[key];
        }
      }
    }

    recurse(nestedObject);
    console.log(result);
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(addLoanData)));
    console.log(addLoanData);
    const state = store.getState();
    const isValid = state.validation.isValid;
    const submitPayload = {
      ...addLoanData.generalLoanDetails,
      documents: addLoanData.documents,
      loanApplicationId: addLoanData.loanApplicationId,
      collateralDetails: addLoanData.collateralDetails,
      lhaDetails: addLoanData.lhaDetails,
      offTakerDetails: addLoanData.offTakerDetails,
      proformaDetails: addLoanData.proformaDetails,
      supplierDetails: addLoanData.supplierDetails,
    };
    if (isValid) {
      await dispatch(submitLoan(submitPayload)).unwrap();
      await dispatch(saveDraftLoanData(addLoanData)).unwrap();
      navigate("/loan/loan-origination-system/sme/loans/loan-offers");
    }
  };

  const handleDraft = async () => {
    await dispatch(saveDraftLoanData(addLoanData)).unwrap();
    navigate("/loan/loan-origination-system/sme/loans/loan-application");
  };

  const handleCanel = async () => {
    navigate("/loan/loan-origination-system/sme/loans/loan-application");
  };

  const getMaxPrincipal = async () => {
    const maxPrincipalPayload = {
      loanProductId: addLoanData.generalLoanDetails.loanProductId,
      borrowerId: addLoanData.generalLoanDetails.borrowerId,
      interestMethod: addLoanData.generalLoanDetails.interestMethod,
      loanInterest: addLoanData.generalLoanDetails.loanInterest,
      loanInterestType: addLoanData.generalLoanDetails.loanInterestType,
      tenure: addLoanData.generalLoanDetails.repaymentTenure,
    };
    await dispatch(getMaxPrincipalData(maxPrincipalPayload)).unwrap();
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
          Loan Application ID: {addLoanData?.loanApplicationId}
        </div>
      </div>
      <AddLoanFields addLoanData={addLoanData} />
      {/* Reusable Button component not used because bg-gray-600 was not getting applied over bg-indigo-600 */}
      <div className="flex justify-between mt-5 items-end">
        <div className="text-xs text-text-light-tertiary flex items-center gap-1">
          <InformationCircleIcon
            className="-mt-0.5 h-5 w-5"
            aria-hidden="true"
          />
          Loan Product, Borrower Id, Loan Duration & Repayment Tenure required
          for fetching max principal Amount
        </div>
        <div className="flex gap-x-5">
          <Button
            buttonName="Get Max Principal Amt"
            onClick={getMaxPrincipal}
            buttonType="tertiary"
            rectangle={true}
          />
          <Button
            buttonName="Save Draft"
            onClick={handleDraft}
            buttonType="secondary"
            rectangle={true}
          />
          <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
          <Button
            buttonName="Cancel"
            onClick={handleCanel}
            rectangle={true}
            buttonType="destructive"
          />
        </div>
      </div>
    </>
  );
};

export default AddLoans;
