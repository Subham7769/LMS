import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  deleteDocumentFile,
  fetchLoanProductData,
  getInspectionVerificationDetails,
  resetInspectionVerificationFields,
  resetLoanOfferFields,
  submitInspectionVerification,
  updateInspectionVerificationField,
  updateLoanField,
  updateLoanOfferFields,
} from "../../../redux/Slices/smeLoansSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useNavigate } from "react-router-dom";
import store from "../../../redux/store";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import InspectionVerificationFields from "./InspectionVerificationFields";


const InspectionVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loanProductOptions, loanOfferFields, inspectionVerification, loading, loanProductData } = useSelector(
    (state) => state.smeLoans
  );

  useEffect(() => {
    dispatch(fetchLoanProductData());
    return () => {
      dispatch(clearValidationError());
      // dispatch(resetLoanOfferFields());
      dispatch(resetInspectionVerificationFields())

    };
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(inspectionVerification)));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const { uid, loanProductId } = loanOfferFields
    const submitPayload = {
      ...inspectionVerification,
      "borrowerSerial": uid,
      "loanProductId": loanProductId,
    };
    if (isValid) {
      await dispatch(submitInspectionVerification(submitPayload)).unwrap();
      navigate("/loan/loan-origination-system/sme/loans/loan-offers");
    }
  };

  const handleGetVerificationData = async () => {
    await dispatch(validateForm(loanOfferFields));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const { uid, loanProductId } = loanOfferFields

      dispatch(getInspectionVerificationDetails({ borrowerSerialNo: uid, loanProductId }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateLoanOfferFields({ name, value }));
  };

  if (loading) {
    return <ContainerTile loading={loading} />;
  }

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
              onClick={handleGetVerificationData}
              rectangle={true}
            />
          </div>
        </div>
      </ContainerTile>
      {inspectionVerification?.inspectionBasics?.loanApplicationId && <>
        <InspectionVerificationFields inspectionVerification={inspectionVerification} handleChangeReducer={updateInspectionVerificationField} />
        <div className="flex justify-end mt-5 gap-x-5">
          <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
        </div>
      </>
      }
    </>
  );
};

export default InspectionVerification;
