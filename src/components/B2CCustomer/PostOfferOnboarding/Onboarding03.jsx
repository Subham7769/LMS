import React, { useState } from "react";
import { useActiveTab } from "../ActiveTabContext";
import { registerBorrower } from "../../../redux/Slices/personalBorrowersSlice";
import { useDispatch } from "react-redux";
import { generateLoanApplicationId, saveDraftLoanData, submitLoan } from "../../../redux/Slices/personalLoansSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IncomeDetailSection from "./IncomeDetailSection";

function Onboarding03({ onNext, onBack }) {
  const { formData } = useActiveTab();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    onNext();
  };

  // console.log(formData)

  return (
    <div className="px-4">
      <div className="w-[90%] mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-4">Income Details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">

          {/* Income Details Section */}
           <div className="grid grid-cols-2 gap-2">
            <IncomeDetailSection />
          </div>
          
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
              className="btn bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded"
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
