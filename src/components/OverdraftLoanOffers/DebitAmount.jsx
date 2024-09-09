import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { getDisbursementInfo, submitDisbursement } from "../../redux/Slices/userProductTestingSlice";
import LoadingState from "../LoadingState/LoadingState";

const DebitAmount = () => {
  const { disbursementData, loading, error } = useSelector(state => state.userProductTesting)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    amount: "",
    userloanID: "",
  });
  const navigate = useNavigate(); // Adding useNavigate for navigation
  const { userID } = useParams();


  useEffect(() => {
    dispatch(getDisbursementInfo({ userID, navigate }));
  }, []);

  useEffect(() => {
    console.log(disbursementData);
    setFormData({
      userloanID: disbursementData.loanId,
      amount: disbursementData.principleAmount,
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
    return <ContainerTile className="text-center">No DebitAmount</ContainerTile>;
  }

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
            inputValue={formData.userloanID}
            onChange={handleChange}
          />
          <InputNumber
            labelName={"Enter Amount"}
            inputName={"amount"}
            inputValue={formData.amount}
            onChange={handleChange}
            placeHolder={"5000"}
          />
        </div>
        <Button
          rectangle={true}
          buttonName={"Submit"}
          onClick={() => dispatch(submitDisbursement({ userID, formData, navigate}))}
        />
      </ContainerTile>
    </>
  );
};

export default DebitAmount;
