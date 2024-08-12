import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const loanIdOptionsInitial = [{ value: "test", label: "test" }];

const Repayment = () => {
  const [repaymentData, setrepaymentData] = useState([]);
  const [amount, setamount] = useState("");
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const { userID } = useParams();
  const [userloanID, setuserloanID] = useState([]);
  const [loanIdOptions, setloanIdOptions] = useState(loanIdOptionsInitial);

  const handleRepayment = async () => {
    const RtransID = "MANUAL_" + userloanID.target.value;
    const RinstID = userloanID.target.value + "-1";
    const postData = {
      requestId: null,
      loanId: userloanID.target.value,
      transactionId: RtransID,
      installmentId: RinstID,
      processDate: "2024-04-09 10:00:13",
      status: true,
      repaymentOriginator: "USER_PAYMENT",
      reconciliationMethod: "sariee transfer",
      payAll: true,
      serviceFeeRepayment: false,
      emiAmount: amount,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-payment-service/lmscarbon/api/v1/borrowers/" +
          userID +
          "/backend-repayments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400 || data.status === 404) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      if (data.status === 202) {
        console.log("Repayment done Successfully !!");
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"Repayment done Successfully !!"}
          />
        ));
        setTimeout(() => {
          navigate("/borrower/" + userID + "/loanNpayment");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getrepaymentInfo();
  }, []);

  async function getrepaymentInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
          userID +
          "/loans/closure",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      if ( data.status === 404) {
        const errorData = await data.json();
        console.log(errorData.message);
        return <div>{errorData.message}</div>; // Stop further execution
      }
      if(data.status === 500){
        return <div>No data found for this User Id</div>
      }
      const json = await data.json();
      setrepaymentData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const formattedRACData = repaymentData.map(({ loanId }) => ({
      value: loanId,
      label: loanId,
    }));
    setloanIdOptions(formattedRACData);
  }, [repaymentData]);

  const handleLoanIdChange = (selectedOption) => {
    setuserloanID(selectedOption);
    const selectedLoan = repaymentData.find(
      (loan) => loan.loanId === selectedOption?.target?.value
    );
    console.log(selectedLoan);
    if (selectedLoan) {
      setamount(selectedLoan.closureAmount);
    }
  };

  if (repaymentData.length === 0) {
    return <div>No open loans to pay</div>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContainerTile>
        <div className="text-lg">Proceed for Repayments</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
          <InputSelect labelName={"Select Loan Id"} inputName={"userloanID"} inputValue={userloanID} inputOptions={loanIdOptions} onChange={handleLoanIdChange} searchable={false}/>
          <InputNumber labelName={"Enter Amount"} inputName={"amount"} inputValue={amount} onChange={(e) => setamount(e.target.value)} placeHolder={"5000"}/>
        </div>
        <Button rectangle={true} buttonName={"Submit"} onClick={handleRepayment}/>
      </ContainerTile>
    </>
  );
};

export default Repayment;
