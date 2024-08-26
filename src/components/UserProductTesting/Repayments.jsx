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


const Repayment = () => {
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const dispatch = useDispatch();
  const [amount, setamount] = useState("");
  const [userloanID, setuserloanID] = useState([]);
  const { loanIdOptions, repaymentData, repaymentSubmit, loading, error } = useSelector(state => state.userProductTesting)

  useEffect(() => {
    dispatch(getRepaymentInfo({ userID, navigate }))
  }, []);

  const handleLoanIdChange = (selectedOption) => {
    setuserloanID(selectedOption);
    const selectedLoan = repaymentData.find((loan) => loan.loanId === selectedOption);
    console.log(selectedLoan);
    if (selectedLoan) {
      setamount(selectedLoan.closureAmount);
    }
  };

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
          <InputSelect labelName={"Select Loan Id"} inputName={"userloanID"} inputValue={userloanID} inputOptions={loanIdOptions} onChange={(e)=>handleLoanIdChange(e.target.value)} searchable={false} />
          <InputNumber labelName={"Enter Amount"} inputName={"amount"} inputValue={amount} onChange={(e) => setamount(e.target.value)} placeHolder={"5000"} />
        </div>
        <Button rectangle={true} buttonName={"Submit"} onClick={() => dispatch(submitRepayment({ userloanID, amount,userID,navigate }))} />
      </ContainerTile>
    </>
  );
};

export default Repayment;
