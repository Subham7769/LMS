import PersonDetailsSection from "./PersonDetailsSection";


const Onboarding01 = ({ onNext }) => {

  const handleSubmit = (e) => {
    e.preventDefault();
      onNext();
  };

  return (
    <div className="px-4">
      <div className="w-[90%] mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-4">Personal Details</h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">


          {/* Person Details Section */}
          <div className="grid grid-cols-2 gap-2">

            <PersonDetailsSection />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn hover:cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:hover:bg-gray-500"
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
