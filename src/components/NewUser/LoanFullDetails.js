import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoanHistoryComp from "../CustomerCare/LoanHistoryComp";

const LoanFullDetails = () => {
  const { loanID } = useParams();
  const { userID } = useParams();
  const navigate = useNavigate();
  const [loanFullDetailsData, setloanFullDetailsData] = useState([]);
  useEffect(() => {
    getLoanFullDetails();
  }, []);
  async function getLoanFullDetails() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-dev.lmscarbon.com/carbon-offers-service/xcbe/api/v1/borrowers/" +
          userID +
          "/loans/" +
          loanID,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        navigate("/user"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      // console.log(json);
      setloanFullDetailsData([json]);
    } catch (error) {
      console.error(error);
    }
  }

  const transID = loanID + "-reactivate";
  const handleDisbursement = async () => {
    const postData = {
      loanId: loanID,
      status: true,
      transactionId: transID,
      activationType: 2,
      processDate: "2024-05-09 15:18:00",
      amount: 5000,
      reconciliationMethod: "mobile wallet",
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-dev.lmscarbon.com/carbon-payment-service/xcbe/api/v1/borrowers/" +
          userID +
          "/disbursement-status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      if (data.status === 202) {
        console.log("Disbursement done Successfully !!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const RtransID = "MANUAL_" + loanID;
  const RinstID = loanID + "-1";
  const handleRepayment = async () => {
    const postData = {
      requestId: null,
      loanId: loanID,
      transactionId: RtransID,
      installmentId: RinstID,
      processDate: "2024-04-09 10:00:13",
      status: true,
      repaymentOriginator: "USER_PAYMENT",
      reconciliationMethod: "sariee transfer",
      payAll: true,
      serviceFeeRepayment: false,
      emiAmount: 7874.57,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-dev.lmscarbon.com/carbon-payment-service/xcbe/api/v1/borrowers/" +
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
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      if (data.status === 202) {
        console.log("Repayment done Successfully !!");
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loanFullDetailsData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
      </>
    );
  }
  console.log(loanFullDetailsData);
  return (
    <>
      <div className="flex gap-4">
        <div
          className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer"
          onClick={handleDisbursement}
        >
          Proceed for Dibursement
        </div>
        <div
          className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer"
          onClick={handleRepayment}
        >
          Proceed for Repayment
        </div>
      </div>
      <LoanHistoryComp loanHistoryData={loanFullDetailsData} />
      {/* <div className="flex">
        <div className="flex">
          <div>Loan Id :</div>
          <div>{loanFullDetailsData.loanId}</div>
        </div>
        <div className="flex">
          <div>Loan Id :</div>
          <div>{loanFullDetailsData.loanId}</div>
        </div>
        <div className="flex">
          <div>Loan Id :</div>
          <div>{loanFullDetailsData.loanId}</div>
        </div>
      </div>
      <div className="rounded-xl pt-5 pb-7 px-5 border border-red-600 mt-8 relative">
        <div className="flex gap-6 py-3">
          <div className="py-2 pr-6 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Consumer Credit Bureau liabilities"
              >
                Consumer CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :{" "}
              </div>
              <div>{simahLiabilitiesTotalMontllyInstallments.consumer}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Gross Debt Burden Ratio (Without Mortgage) Credit Bureau liabilities"
              >
                GDBR (Without MTG) CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :
              </div>
              <div>
                {simahLiabilitiesTotalMontllyInstallments.gdbrWithoutMTG}
              </div>
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Gross Debt Burden Ratio (With Mortgage) Credit Bureau liabilities"
              >
                GDBR (With MTG) CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :{" "}
              </div>
              <div>{simahLiabilitiesTotalMontllyInstallments.gdbrWithMTG}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Total calculated existing Credit Bureau liabilities"
              >
                Total calculated existing CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :
              </div>
              <div>{simahLiabilitiesTotalMontllyInstallments.gdbrWithMTG}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-80">Adjustment for Disposable Income : </div>
              <div>{adjustedEMI}</div>
            </div>
          </div>
          <div className=" pr-6 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-44">Credit Bureau Score : </div>
              <div>{simahScore}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Derived Credit Score : </div>
              <div>{creditScore}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Gross income : </div>
              <div>{gosiFullWage}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Net income : </div>
              <div>{netIncome}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44 cursor-pointer" title="Debt Burden Ratio">
                DBR{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :
              </div>
              <div>{eligibleDBR}</div>
            </div>
          </div>
          <div className="pr-6 py-2 flex flex-col">
            <div className="flex gap-2 py-2">
              <div className="w-52">Disposal income : </div>
              <div>{disposableIncome.toFixed(2)}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Maximum EMI amount : </div>
              <div>{eligibleEMI}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Propensity to pay : </div>
              <div>{propensityToPay.toFixed(2)}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Bare Minimum Expenses : </div>
              <div>{bareMinimumExpenses}</div>
            </div>
          </div>
        </div>
        <div className="absolute text-xs text-gray-400 bottom-1 left-2">
          *CB - Credit Bureau, *GDBR - Gross Debt Burden Ratio, *MTG - Mortgage
        </div>
      </div> */}
      {/* <div>{loanFullDetailsData.loanAmount}</div> */}
    </>
  );
};

export default LoanFullDetails;
