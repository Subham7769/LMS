import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { getRepaymentInfo, submitRepayment } from "../../redux/Slices/userProductTestingSlice";
import LoadingState from "../LoadingState/LoadingState";
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

const BackendRepayment = () => {
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const dispatch = useDispatch();
  const [amount, setamount] = useState("");
  const [userloanID, setuserloanID] = useState('');
  const { loanIdOptions, repaymentData, loading, error } = useSelector(state => state.userProductTesting)
  const { validationError } = useSelector((state) => state.validation);
  const fields = ["amount", "userloanID"];

  useEffect(() => {
    dispatch(getRepaymentInfo({ userID, navigate }))
    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, []);

  const handleLoanIdChange = (selectedOption) => {
    setuserloanID(selectedOption);
    const selectedLoan = repaymentData.find((loan) => loan.loanId === selectedOption);
    if (selectedLoan) {
      setamount(selectedLoan.closureAmount);
    }
  };

  
  const handleSubmit = ({ userloanID, amount, userID, navigate }) => {
    const isValid = validateFormFields(fields, {amount,userloanID}, dispatch);
    if (isValid) {
      dispatch(submitRepayment({ userloanID, amount, userID, navigate }))
    }
  }

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile className="text-center">Error: {error}</ContainerTile>;
  }

  if (repaymentData.length === 0) {
    return <ContainerTile className="text-center">No Open Loans to Pay</ContainerTile>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg">Proceed for Repayments</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputSelect
            labelName={"Select Loan Id"}
            inputName={"userloanID"}
            inputValue={userloanID}
            inputOptions={loanIdOptions}
            onChange={(e) => handleLoanIdChange(e.target.value)}
            showError={validationError.userloanID}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, userloanID: false })
              )
            }
            searchable={false}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"amount"}
            inputValue={amount}
            onChange={(e) => setamount(e.target.value)}
            placeHolder={"5000"}
            showError={validationError.amount}
            onFocus={() =>
              dispatch(
                setValidationError({ ...validationError, amount: false })
              )
            }
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={() => handleSubmit({ userloanID, amount, userID, navigate })}
        />
      </ContainerTile>
    </>
  );
};

export default BackendRepayment;
