import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";
import {
  getDisbursementInfo,
  updateDisbursementData,
  submitDisbursement,
} from "../../redux/Slices/userProductTestingSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const DisbursementStatus = () => {
  const { disbursementData, loading, error } = useSelector(
    (state) => state.userProductTesting
  );
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adding useNavigate for navigation
  const { userID } = useParams();

  useEffect(() => {
    dispatch(getDisbursementInfo({ userID, navigate }));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, userID]);

  const handleSubmit = async ({ userID, disbursementData, navigate }) => {
    await dispatch(validateForm(disbursementData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(submitDisbursement({ userID, disbursementData, navigate }));
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  console.log(disbursementData);

  return (
    <div className="flex flex-col gap-5">
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg">Proceed for disbursement</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputText
            labelName={"Loan Id"}
            inputName={"loanId"}
            disabled={true}
            inputValue={disbursementData?.loanId || ""}
            onChange={(e) => dispatch(updateDisbursementData(e.target))}
            isValidation={true}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"principleAmount"}
            inputValue={disbursementData?.principleAmount || ""}
            onChange={(e) => dispatch(updateDisbursementData(e.target))}
            placeHolder={"5000"}
            isValidation={true}
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={() => handleSubmit({ userID, disbursementData, navigate })}
        />
      </ContainerTile>
      {/* Render error message if `error` is present */}
      {disbursementData.status === 500 && (
        <ContainerTile className="text-center">
          No Loan Available for Disbursement
        </ContainerTile>
      )}
      {error && <ContainerTile>Error: {error}</ContainerTile>}
    </div>
  );
};

export default DisbursementStatus;
