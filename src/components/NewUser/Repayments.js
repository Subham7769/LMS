import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";

const Repayment = () => {
  const [amount, setamount] = useState("");
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const { userID } = useParams();
  const { loanID } = useParams();
  const [userloanID, setuserloanID] = useState(loanID);

  const handleRepayment = async () => {
    const RtransID = "MANUAL_" + userloanID;
    const RinstID = userloanID + "-1";
    const postData = {
      requestId: null,
      loanId: userloanID,
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
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="rounded-xl pt-5 pb-7 px-5 border border-red-600 mt-8 relative">
        <div className="text-lg">Proceed for Repayments</div>
        <div className="flex gap-4">
          <div className="relative my-5">
            <label htmlFor="amount" className=" px-1 text-xs text-gray-900">
              Enter Loan Id
            </label>
            <input
              type="text"
              name="amount"
              value={userloanID}
              onChange={(e) => setuserloanID(e.target.value)}
              className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="7cc473f2-04a9-4779-ac7e-d8ff6fa19410"
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
