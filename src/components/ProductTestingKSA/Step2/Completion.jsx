import React from "react";
import { CheckCircle2 } from "lucide-react"; // npm install lucide-react
import { useNavigate } from "react-router-dom";
import { useActiveTab } from "../ActiveTabContext";

const Completion = ({
    maxLoanAmount = "150,000 SAR",
    monthlyInstallment = "2,500 SAR",
    loanPeriod = "5 Years",
    onBack,
    onNext,
}) => {
    const navigate = useNavigate();
    const { setActiveTab } = useActiveTab();

    const gotoEligibilityVerification = () => {
        setActiveTab("eligibility-verification"); // Set the active tab to "eligibility-verification"
        navigate("/loan/product-testing-KSA/eligibility-verification"); // Navigate to the pre-eligibility check page
    }

    return (
        <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-6">
            {/* Stepper */}
            <div>
                <p className="text-sm text-gray-500 mb-2">Step 4 of 4</p>
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
                    Congratulations!
                </h2>
                <p className="text-sm text-gray-600 text-center">
                    You’ve successfully completed the Pre-Eligibility Check.
                </p>
            </div>

            {/* Loan Summary */}
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-700">
                <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Max Loan Amount</span>
                    <span>{maxLoanAmount}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Monthly Installment</span>
                    <span>{monthlyInstallment}</span>
                </div>
                <div className="flex justify-between border-b py-2">
                    <span className="font-medium">Loan Period</span>
                    <span>{loanPeriod}</span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6">

                <button
                    onClick={gotoEligibilityVerification}
                    className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition"
                >
                    Continue to Eligibility Verification
                </button>
            </div>
        </div>
    );
};

export default Completion;
