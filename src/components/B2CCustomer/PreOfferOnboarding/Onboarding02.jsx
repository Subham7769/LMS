import LoanRequirementSection from "./LoanRequirementSection";

function Onboarding02({ onNext, onBack }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };


  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">Loan Details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">

          {/* Loan Amount, Period, Repayment, Interest Rate */}
          <LoanRequirementSection />
          
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding02;
