import React, { useEffect } from "react";
import AddRefundFields from "./AddRefundFields";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import { validateForm } from "../../../redux/Slices/validationSlice";
import {
  submitRefund,
  saveDraftRefundData,
  getDocsByIdnUsage,
  setRefundApplicationId,
  getRefundApplicationsByID,
} from "../../../redux/Slices/personalRefundSlice";
import {
  clearValidationError,
  setFields,
} from "../../../redux/Slices/validationSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { sanitizeUid } from "../../../utils/sanitizeUid";
import { getOpenLoans } from "../../../redux/Slices/personalRefundSlice";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";

const AddRefund = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refundApplicationId } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { refundData, loading, openLoans } = useSelector(
    (state) => state.personalRefund
  );

  useEffect(() => {
    if (openLoans.length < 1) {
      dispatch(getOpenLoans());
    }
    if (!currentPath.includes("new")) {
      dispatch(getRefundApplicationsByID(refundApplicationId));
    }
    dispatch(setRefundApplicationId(refundApplicationId));
    const keysArray = [
      "loanId",
      "refundAmount",
      "causeOfRefund",
      "relatedPaySlipMonth",
    ];
    dispatch(setFields(keysArray));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, openLoans, refundApplicationId]);


  const handleDraft = async () => {
    const [loanId, userId] = refundData?.refundDetails?.loanId.split("@");
    const draftPayload = {
      ...refundData,
      refundDetails: {
        ...refundData.refundDetails,
        loanId: loanId,
      },
    };
    await dispatch(saveDraftRefundData(draftPayload)).unwrap();
    navigate(
      "/loan/loan-origination-system/personal/refund/refund-application"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure borrowerId is set to sanitized uniqueID
    const sanitizedUniqueID = sanitizeUid(refundData.refundDetails.borrowerId);
    const [loanId, userId] = refundData?.refundDetails?.loanId.split("@");
    const updatedRefundData = {
      ...refundData,
      refundDetails: {
        ...refundData.refundDetails,
        borrowerId: sanitizedUniqueID,
        loanId: loanId,
      },
    };
    await dispatch(validateForm(flattenToSimpleObject(updatedRefundData)));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const submitPayload = {
      ...updatedRefundData.refundDetails,
      documents: updatedRefundData.documents,
      refundApplicationId: updatedRefundData.refundApplicationId,
    };
    if (isValid) {
      await dispatch(saveDraftRefundData(updatedRefundData)).unwrap();
      await dispatch(submitRefund(submitPayload)).unwrap();
      navigate(
        "/loan/loan-origination-system/personal/refund/refund-application"
      );
    }
  };

  const handleCancel = () => {
    navigate(
      "/loan/loan-origination-system/personal/refund/refund-application"
    );
  };

  if (loading) {
    return <ContainerTile loading={loading} />;
  }

  return (
    <>
      <div
        className={`border rounded-lg shadow-sm bg-white mb-3 hover:bg-indigo-50 px-4 py-4`}
      >
        <div className="text-gray-500 ">
          Refund Application ID: {refundApplicationId}
        </div>
      </div>
      <AddRefundFields
        refundData={refundData}
        openLoans={openLoans}
        loanId={refundData.refundDetails.loanId}
      />
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

export default AddRefund;
