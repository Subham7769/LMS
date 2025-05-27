import React from "react";
import { CheckCircle2 } from "lucide-react"; // npm install lucide-react
import { useNavigate } from "react-router-dom";
import { useActiveTab } from "../ActiveTabContext";
import Stepper from "../../Common/Stepper/Stepper";
import { useSelector } from "react-redux";
// This API to get credit report from Simah after consent

const Completion = ({
    amlCheck = true,
    salaryVerification = true,
    nafathVerification = true,
    creditCheck = true,
    onBack,
    onNext,
}) => {
    const navigate = useNavigate();
    const { setActiveTab } = useActiveTab();
    const { creditConsentData } = useSelector(state => state.productTestingKSA)


    const gotoLoanApplication = () => {
        setActiveTab("loan-application"); // Set the active tab to "loan-application"
        navigate("/loan/product-testing-KSA/loan-application"); // Navigate to the pre-eligibility check page
    }

    // Determine results
    const amlResult = creditConsentData.amlVerified ? "Passed" : "Failed";
    const nafathResult = creditConsentData.salaryVerified ? "Verified" : "Not Verified";
    const salaryResult = creditConsentData.salaryVerified ? "Verified" : "Not Verified";
    const creditResult = creditConsentData.creditCheckVerified ? "Approved" : "Rejected";

    // Eligibility status
    const isEligible = amlCheck && salaryVerification && creditCheck && nafathVerification;

    return (
        <div className="bg-white mx-auto p-6 rounded-xl shadow-md space-y-6">
            {/* Stepper */}
            <Stepper title={"KSA Financing"} currentStep={6} steps={["Identity Verification","Verification Code","AML Verification", "Salary Verification", "Credit History", "Completion"]} />

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
                    <span className="font-medium">Nafath Biometrics Verification</span>
                    <span className={nafathVerification ? "text-green-600" : "text-red-600"}>{nafathResult}</span>
                </div>
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
            <div className="flex justify-between mt-6">
                <button
                    onClick={() => { onBack() }}
                    className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
                >
                    Back
                </button>
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
