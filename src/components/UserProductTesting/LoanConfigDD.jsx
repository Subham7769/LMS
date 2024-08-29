import LoanConfig from "./LoanConfig";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { getUserLoanOptions,submitLoanConfiguration } from "../../redux/Slices/userProductTestingSlice";
import LoadingState from "../LoadingState/LoadingState";


const LoanConfigDD = () => {
  const [loanType, setLoanType] = useState([]);
  const [amount, setAmount] = useState("");
  const {loanOptions, loanConfigData, showModal, loading, error} = useSelector(state => state.userProductTesting)
  const { userID } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserLoanOptions(userID));
  }, [dispatch, userID]);

  useEffect(() => {
    if (["CASH_LOAN_V1", "BNPL_LOAN"].includes(loanType)) {
      setAmount("");
    }
  }, [loanType]);

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <div className="flex flex-col gap-5">
      <ContainerTile>
        <div className="grid grid-cols-5 gap-4 items-end">
          <InputSelect
            labelName={"Loan Type"}
            inputName={"loanType"}
            inputOptions={loanOptions}
            inputValue={loanType}
            onChange={(e) => setLoanType(e.target.value)}
          />
          {["CASH_LOAN_V1", "BNPL_LOAN"].includes(loanType) && (
            <InputNumber
              labelName={"Amount"}
              inputName={"amount"}
              inputValue={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeHolder={"5000"}
            />
          )}
          <div>
            <Button
              buttonIcon={CheckCircleIcon}
              rectangle={true}
              buttonName={"Submit"}
              onClick={()=>dispatch(submitLoanConfiguration({ loanType, amount, userID }))}
            />
          </div>

        </div>
      </ContainerTile>
      {showModal && (
        <LoanConfig
          visible={showModal}
          loanConfigDataProp={loanConfigData}
          loanType={loanType.value}
          amount={amount}
        />
      )}
      {error && (
        <div className="mt-5 text-red-400 font-medium">{error}</div>
      )}
    </div>
  );
};

export default LoanConfigDD;
