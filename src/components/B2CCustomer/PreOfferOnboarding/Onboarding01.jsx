import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchLoanProductData
} from "../../../redux/Slices/personalLoansSlice";

import { useActiveTab } from "../ActiveTabContext";
import ProductListSection from "./ProductListSection";


const Onboarding01 = ({ onNext }) => {

  const dispatch = useDispatch();
  const { formData } = useActiveTab();

  useEffect(() => {
    dispatch(fetchLoanProductData());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.loanType) {
      onNext();
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
          I need{" "}
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">

          {/* Product List Section */}
          <ProductListSection />

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500"
              disabled={!formData.loanType}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding01;
