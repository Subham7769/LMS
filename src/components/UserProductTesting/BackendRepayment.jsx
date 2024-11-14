import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  getRepaymentInfo,
  submitRepayment,
} from "../../redux/Slices/userProductTestingSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const BackendRepayment = () => {
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const dispatch = useDispatch();
  const [amount, setamount] = useState("");
  const [userloanID, setuserloanID] = useState("");
  const { loanIdOptions, repaymentData, loading, error } = useSelector(
    (state) => state.userProductTesting
  );

  useEffect(() => {
    dispatch(getRepaymentInfo({ userID, navigate }));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, []);

  const handleLoanIdChange = (selectedOption) => {
    setuserloanID(selectedOption);
    const selectedLoan = repaymentData.find(
      (loan) => loan.loanId === selectedOption
    );
    if (selectedLoan) {
      setamount(selectedLoan.closureAmount);
    }
  };

  const handleSubmit = async ({ userloanID, amount, userID, navigate }) => {
    const dataToValidate = {
      amount,
      userloanID,
    };
    await dispatch(validateForm(dataToValidate));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(submitRepayment({ userloanID, amount, userID, navigate }));
    }
  };

  if (repaymentData.length === 0) {
    return (
      <ContainerTile className="text-center" loading={loading} error={error}>
        No Open Loans to Pay
      </ContainerTile>
    );
  }

  return (
    <>
      <ContainerTile loading={loading} error={error}>
        <h2 className="mb-5 py-2">
          <b>Proceed for Repayments</b>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputSelect
            labelName={"Select Loan Id"}
            inputName={"userloanID"}
            inputValue={userloanID}
            inputOptions={loanIdOptions}
            onChange={(e) => handleLoanIdChange(e.target.value)}
            isValidation={true}
            searchable={false}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"amount"}
            inputValue={amount}
            onChange={(e) => setamount(e.target.value)}
            placeHolder={"5000"}
            isValidation={true}
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
