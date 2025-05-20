import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  fetchLoanProductData,
  getLoanOffers,
  resetLoanOfferFields,
  saveDraftLoanData,
  submitLoan,
  updateLoanOfferFields,
} from "../../../redux/Slices/smeLoansSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import InspectionVerificationFields from "./InspectionVerificationFields";
import { sanitizeUid } from "../../../utils/sanitizeUid";

const InspectionVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loanApplicationId, BorrowerId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;

  const { addLoanData, loanProductOptions, loanOfferFields, inspectionVerification, loading, loanProductData } = useSelector(
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
  useEffect(() => {
    dispatch(fetchLoanProductData());
    return () => {
      dispatch(clearValidationError());
      dispatch(resetLoanOfferFields());
    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedLoanData = {};

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


  const handleGetOffers = async () => {
    await dispatch(validateForm(loanOfferFields));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(getLoanOffers(loanOfferFields));
      dispatch(fetchBorrowerById(sanitizeUid(loanOfferFields?.uid)));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateLoanOfferFields({ name, value }));
  };

  return (
    <>
      <ContainerTile className={"mb-5 bg-gray-50"} loading={loading}>
        <div className="grid grid-cols-3 gap-5 items-end">
          <InputSelect
            labelName={"Loan Product"}
            inputName="loanProductId"
            inputOptions={loanProductOptions}
            inputValue={loanOfferFields.loanProductId}
            onChange={handleChange}
            disabled={false}
            isValidation={true}
          />
          <InputText
            labelName={"Borrower Serial No."}
            inputName="uid"
            inputValue={loanOfferFields.uid}
            onChange={handleChange}
            disabled={false}
            isValidation={true}
          />
          <div>
            <Button
              buttonName="Get Verification data"
              onClick={handleGetOffers}
              rectangle={true}
            />
          </div>
        </div>
      </ContainerTile>
      {/* {inspectionVerification?.inspectionBasics?.loanApplicationId && <> */}
      {true && <>
        <InspectionVerificationFields inspectionVerification={inspectionVerification} />
        <div className="flex justify-end mt-5 gap-x-5">
          <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
        </div>
      </>
      }
    </>
  );
};

export default InspectionVerification;
