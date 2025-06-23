import React, { useState } from "react";
import { registerB2CPersonalBorrower, updatePersonalBorrowerField } from "../../../redux/Slices/B2CLoansSlice";
import { useDispatch, useSelector } from "react-redux";
import { generatePersonalLoanApplicationId, saveDraftLoanData, submitPersonalLoan, B2CLogin } from "../../../redux/Slices/B2CLoansSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PersonDetailsSection from "./PersonDetailsSection";

function Onboarding03({ onNext, onBack }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addLoanData, personalBorrower } = useSelector((state) => state.B2CLoans)


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log(formattedDate)


    try {
      // 1. Generate Loan Application ID
      const loanApplicationId = await dispatch(generatePersonalLoanApplicationId()).unwrap();
      console.log("Loan Application ID:", loanApplicationId);

      dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedLoanApplicationId", value: loanApplicationId }));

      // 2. Register Borrower
      const borrowerResponse = await dispatch(registerB2CPersonalBorrower({
        ...personalBorrower,
        cachedDetails: {
          ...personalBorrower.cachedDetails,
          cachedLoanApplicationId: loanApplicationId
        }
      })).unwrap();

      console.log("Borrower Registered:", borrowerResponse.registrationResults);

      // 3. Login Borrower
      const loginResponse = await dispatch(B2CLogin({ email: personalBorrower.cachedDetails.cachedEmail, password: personalBorrower.cachedDetails.cachedPassword })).unwrap();
      console.log("Borrower LoggedIn :", loginResponse);


      // 5. Save Draft
      await dispatch(saveDraftLoanData(addLoanData)).unwrap();
      console.log("Saved Draft Loan!");

      // 6. Submit Loan
      const submitPayload = {
        ...addLoanData.generalLoanDetails,
        documents: addLoanData.documents,
        loanApplicationId,
        refinanceDetails: addLoanData.refinanceDetails,
      };
      await dispatch(submitPersonalLoan(submitPayload)).unwrap();
      console.log("Submitted Loan!");

      // 7. Navigate
      navigate("/customer/loan-offers");

    } catch (error) {
      console.error("Loan Submission Error:", error);
      toast(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-4">Contact & Salary</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">


          <PersonDetailsSection />


          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="btn bg-gray-300 text-black px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              className="btn hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Creating..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div >
  );
}

export default Onboarding03;
