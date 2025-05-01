import React from "react";
import { CheckCircle2 } from "lucide-react"; // npm install lucide-react
import { useNavigate } from "react-router-dom";
import { useActiveTab } from "../ActiveTabContext";

const Completion = ({
    amlCheck = true,
    salaryVerification = true,
    creditCheck = true,
    onBack,
    onNext,
}) => {
    const navigate = useNavigate();
    const { setActiveTab } = useActiveTab();

    const gotoLoanApplication = () => {
        setActiveTab("loan-application"); // Set the active tab to "loan-application"
        navigate("/loan/product-testing-KSA/loan-application"); // Navigate to the pre-eligibility check page
    }

    // Determine results
    const amlResult = amlCheck ? "Passed" : "Failed";
    const salaryResult = salaryVerification ? "Verified" : "Not Verified";
    const creditResult = creditCheck ? "Approved" : "Rejected";

    // Eligibility status
    const isEligible = amlCheck && salaryVerification && creditCheck;

    return (
        <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-6">
            {/* Stepper */}
            <div>
                <p className="text-sm text-gray-500 mb-2">Step 3 of 4</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                    <div className="bg-teal-600 h-2 rounded-full w-full" />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
                    {["Initial Details", "Loan Estimate", "Identity Verification", "Completion"].map(
                        (step, idx) => (
                            <span key={idx} className={idx === 3 ? "text-teal-600" : ""}>
                                {step}
                            </span>
                        )
                    )}
                </div>
            </div>

            {/* Checkmark Icon */}
            <div className="flex flex-col items-center space-y-2">
                <CheckCircle2 className="h-16 w-16 text-teal-600" />
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {isEligible ? "Eligibility Verified!" : "Eligibility Not Verified"}
                </h2>
                <p className="text-sm text-gray-600 text-center">
                    {isEligible
                        ? "You’ve successfully passed the eligibility checks."
                        : "Unfortunately, you did not pass all eligibility checks."}
                </p>
            </div>

            {/* Eligibility Results */}
            <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between border-b py-2">
                    <span className="font-medium">AML Check</span>
                    <span className={amlCheck ? "text-green-600" : "text-red-600"}>{amlResult}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Salary Verification</span>
                    <span className={salaryVerification ? "text-green-600" : "text-red-600"}>{salaryResult}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Credit Check</span>
                    <span className={creditCheck ? "text-green-600" : "text-red-600"}>{creditResult}</span>
                </div>
            </div>

            {/* Eligibility Status */}
            <div className="mt-4">
                {isEligible ? (
                    <div className="p-4 bg-green-100 text-green-700 rounded-lg text-center">
                        <p className="font-medium">You are eligible to proceed to the Loan Application stage.</p>
                    </div>
                ) : (
                    <div className="p-4 bg-red-100 text-red-700 rounded-lg text-center">
                        <p className="font-medium">You are not eligible to proceed.</p>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6">
                <button
                    onClick={gotoLoanApplication}
                    className={`bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition ${!isEligible ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    disabled={!isEligible}
                >
                    Continue to Loan Application
                </button>
            </div>
        </div>
    );
};

export default Completion;
