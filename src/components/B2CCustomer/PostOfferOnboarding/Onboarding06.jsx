import { useNavigate } from "react-router-dom";
import UploadDocuments from "./UploadDocuments";
import { useEffect } from "react";
import { getDocsByIdnUsage } from "../../../redux/Slices/B2CLoansSlice";
import { useDispatch, useSelector } from "react-redux";

function Onboarding02({ onNext, onBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addLoanData, loading, loanProductData } = useSelector((state) => state.B2CLoans);

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
    navigate("/customer/thank-you")
  };


  return (
    <div className="px-4">
      <div className="w-[90%] mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-4">Upload Documents</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">

          {/* Document Upload Section */}
          <UploadDocuments documents={addLoanData.documents} />


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
            >
              Complete Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding02;
