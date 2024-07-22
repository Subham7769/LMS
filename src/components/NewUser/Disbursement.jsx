import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";

const Disbursement = () => {
  const [disbursementData, setdisbursementData] = useState([]);
  const [amount, setamount] = useState("");
  const [userloanID, setuserloanID] = useState("");
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const { userID } = useParams();

  const handleDisbursement = async () => {
    const transID = userloanID + "-reactivate";
    const postData = {
      loanId: userloanID,
      status: true,
      transactionId: transID,
      activationType: 2,
      processDate: "2024-05-09 15:18:00",
      amount: amount,
      reconciliationMethod: "mobile wallet",
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-payment-service/lmscarbon/api/v1/borrowers/" +
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
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"Disbursement done Successfully !!"}
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
    getDisbursementInfo();
  }, []);

  async function getDisbursementInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
          userID +
          "/disbursement",
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
      const json = await data.json();
      setdisbursementData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(disbursementData);
    setuserloanID(disbursementData.loanId);
    setamount(disbursementData.principleAmount);
  }, [disbursementData]);

  if (disbursementData.length === 0) {
    return <div>Fetching Data</div>;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-xl pt-5 pb-7 px-5 border border-red-600 mt-8 relative">
        <div className="text-lg">Proceed for disbursement</div>
        <div className="flex gap-4">
          <div className="relative my-5">
            <label htmlFor="loanID" className=" px-1 text-xs text-gray-900">
              Loan Id
            </label>
            <input
              type="text"
              name="loanID"
              disabled
              value={userloanID}
              onChange={(e) => setuserloanID(e.target.value)}
              className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
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
          onClick={handleDisbursement}
        >
          Submit
        </div>
      </div>
    </>
  );
};

export default Disbursement;
