import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import Select from "react-select";

const loanIdOptionsInitial = [{ value: "test", label: "test" }];

const Repayment = () => {
  const [repaymentData, setrepaymentData] = useState([]);
  const [amount, setamount] = useState("");
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const { userID } = useParams();
  const [userloanID, setuserloanID] = useState([]);
  const [loanIdOptions, setloanIdOptions] = useState(loanIdOptionsInitial);

  const handleRepayment = async () => {
    const RtransID = "MANUAL_" + userloanID.value;
    const RinstID = userloanID.value + "-1";
    const postData = {
      requestId: null,
      loanId: userloanID.value,
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
        "https://api-dev.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
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
      (loan) => loan.loanId === selectedOption.value
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
      <div className="rounded-xl pt-5 pb-7 px-5 border border-red-600 mt-8 relative">
        <div className="text-lg">Proceed for Repayments</div>
        <div className="flex gap-4">
          <div className="relative my-5">
            <label htmlFor="userloanID" className=" px-1 text-xs text-gray-900">
              Select Loan Id
            </label>
            <Select
              className="w-96"
              options={loanIdOptions}
              name="userloanID"
              value={userloanID}
              onChange={handleLoanIdChange}
              isSearchable={false}
            />
          </div>
          <div className="relative my-5">
            <label htmlFor="amount" className=" px-1 text-xs text-gray-900">
              Enter Amount
            </label>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="5000"
            />
          </div>
        </div>
        <div
          className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer w-fit"
          onClick={handleRepayment}
        >
          Submit
        </div>
      </div>
    </>
  );
};

export default Repayment;
