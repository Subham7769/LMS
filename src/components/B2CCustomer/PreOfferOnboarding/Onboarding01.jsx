import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoanProductData,
  getDocsByIdnUsage
} from "../../../redux/Slices/B2CLoansSlice";

import ProductListSection from "./ProductListSection";


const Onboarding01 = ({ onNext }) => {
  const dispatch = useDispatch();
  const { addLoanData,loanProductData } = useSelector((state) => state.B2CLoans);

  useEffect(() => {
    dispatch(fetchLoanProductData());
  }, [dispatch]);

  // Fetch Documents by Id
  useEffect(() => {
    if (addLoanData?.generalLoanDetails?.loanProductId) {
      const selectedDynamicDoc = loanProductData.find(
        (product) =>
          product?.loanProductId ===
          addLoanData?.generalLoanDetails?.loanProductId
      );
      dispatch(
        getDocsByIdnUsage({
          dynamicDocumentTempId: selectedDynamicDoc?.dynamicDocumentTempId,
          usage: "BORROWER_OFFERS",
        })
      );
    }
  }, [dispatch, addLoanData?.generalLoanDetails?.loanProductId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addLoanData.generalLoanDetails.loanProductId) {
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
              className="btn hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500"
              disabled={!addLoanData.generalLoanDetails.loanProductId}
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
