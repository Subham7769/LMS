import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  getDisbursementInfo,
  updateDisbursementData,
  submitDisbursement,
} from "../../redux/Slices/userProductTestingSlice";
import LoadingState from "../LoadingState/LoadingState";

const DisbursementStatus = () => {
  const { disbursementData, loading, error } = useSelector(
    (state) => state.userProductTesting
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    amount: "",
    userloanID: "",
  });
  const navigate = useNavigate(); // Adding useNavigate for navigation
  const { userID } = useParams();

  useEffect(() => {
    dispatch(getDisbursementInfo({ userID, navigate }));
    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, userID]);

  useEffect(() => {
    console.log(disbursementData);
    setFormData({
      userloanID: disbursementData.loanId || "",
      amount: disbursementData.principleAmount || "",
    });
  }, [disbursementData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  if (disbursementData.status === 500) {
    return (
      <ContainerTile className="text-center">
        No Loan Available for Disbursement
      </ContainerTile>
    );
  }

  console.log(formData.userloanID + "formData");

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg">Proceed for disbursement</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputText
            labelName={"Loan Id"}
            inputName={"userloanID"}
            disabled={true}
            inputValue={disbursementData?.userloanID || ""}
            onChange={(e) => dispatch(updateDisbursementData(e))}
            showError={validationError.loanType}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, loanType: false })
              )
            }
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"amount"}
            inputValue={disbursementData?.amount || ""}
            onChange={handleChange}
            placeHolder={"5000"}
            showError={validationError.loanType}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, loanType: false })
              )
            }
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={() =>
            dispatch(submitDisbursement({ userID, formData, navigate }))
          }
        />
      </ContainerTile>
    </>
  );
};

export default DisbursementStatus;
