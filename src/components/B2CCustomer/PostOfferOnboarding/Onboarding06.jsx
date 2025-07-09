import { useNavigate } from "react-router-dom";
import UploadDocuments from "./UploadDocuments";
import { useEffect, useRef } from "react";
import { getDocsByIdnUsage, fetchLoanProductData, fetchPersonalBorrowerById, getLoanApplicationsByID, saveDraftLoanData, submitPersonalLoan, deleteLoanOffers } from "../../../redux/Slices/B2CLoansSlice";
import { useDispatch, useSelector } from "react-redux";

function Onboarding02({ onNext, onBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addLoanData, loading, loanProductData, personalBorrower } = useSelector((state) => state.B2CLoans);

  useEffect(() => {
    dispatch(fetchLoanProductData());
  }, [dispatch]);

  useEffect(() => {
    const BorrowerId = personalBorrower?.cachedDetails?.cachedBorrowerId;
    const loanApplicationId = personalBorrower?.cachedDetails?.cachedLoanApplicationId;

    const init = async () => {
      if (BorrowerId) {
        dispatch(fetchPersonalBorrowerById(BorrowerId));
      }

      if (loanApplicationId) {
        try {
          // 0. Delete Cached Offers
          await dispatch(deleteLoanOffers(loanApplicationId)).unwrap();

          // 1. Then get loan application
          await dispatch(getLoanApplicationsByID(loanApplicationId)).unwrap();
        } catch (err) {
          console.error("Failed to delete loan offers:", err);
        }
      }
    };

    init();
  }, []);

  useEffect(() => {
    const cachedLoanProductId = personalBorrower?.cachedDetails?.cachedLoanProductId;

    if (loanProductData.length > 0 && cachedLoanProductId) {
      const selectedDynamicDoc = loanProductData.find(
        (product) => product?.loanProductId === cachedLoanProductId
      );

      if (selectedDynamicDoc?.dynamicDocumentTempId) {
        dispatch(
          getDocsByIdnUsage({
            dynamicDocumentTempId: selectedDynamicDoc.dynamicDocumentTempId,
            usage: "BORROWER_OFFERS",
          })
        );
      }
    }
  }, [
    loanProductData,
    personalBorrower?.cachedDetails?.cachedLoanProductId,
    dispatch,
  ]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const loanApplicationId = personalBorrower?.cachedDetails?.cachedLoanApplicationId;

    // 1. Save Draft
    await dispatch(saveDraftLoanData(addLoanData)).unwrap();
    console.log("Saved Draft Loan!");

    // 2. Submit Loan
    const submitPayload = {
      ...addLoanData.generalLoanDetails,
      documents: addLoanData.documents,
      loanApplicationId,
      refinanceDetails: addLoanData.refinanceDetails,
    };
    await dispatch(submitPersonalLoan(submitPayload)).unwrap();
    console.log("Submitted Loan!");

    // 7. Navigate
    navigate("/customer/final-offers");
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
