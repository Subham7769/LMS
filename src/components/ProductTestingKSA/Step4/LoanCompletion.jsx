import React from "react";
import { CheckCircle, Info } from "lucide-react";

const steps = [
  "Loan Offers",
  "Digital Contract",
  "Promissory Note",
  "IBAN Verification",
  "Completion",
];

const CompletionStep = ({ onDashboard }) => {
  return (
    <div className="space-y-6">
      {/* Stepper Header */}
      <div className="border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-2">Loan Application</h2>
        <div className="text-sm text-gray-600 mb-2">Step 5 of 5</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "100%" }}></div>
        </div>
        <div className="flex justify-between items-center text-sm font-medium">
          {steps.map((label, index) => (
            <div
              key={index}
              className={`flex-1 text-center ${
                index === 4
                  ? "text-emerald-600 font-semibold"
                  : index < 4
                  ? "text-gray-800"
                  : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto mb-1 rounded-full flex items-center justify-center ${
                  index === 4
                    ? "bg-emerald-500 text-white"
                    : index < 4
                    ? "bg-gray-300 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Completion Message */}
      <div className="bg-white rounded-xl shadow-sm border p-6 text-center space-y-6">
        <CheckCircle className="text-emerald-500 mx-auto w-12 h-12" />
        <div>
          <h2 className="text-xl font-semibold">Application Complete!</h2>
          <p className="text-gray-600 mt-1">
            Your loan has been approved and is being processed
          </p>
        </div>

        {/* Loan Details */}
        <div className="grid grid-cols-2 gap-4 text-left bg-gray-50 p-4 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Loan Amount</p>
            <p className="font-medium text-green-700 text-lg">50,000 SAR</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Payment</p>
            <p className="font-medium text-gray-700 text-lg">2,250 SAR</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Disbursement Date</p>
            <p className="font-medium text-gray-700">After 24 hours</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">First Payment Due</p>
            <p className="font-medium text-gray-700">May 29, 2025</p>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-md p-4 text-left text-sm space-y-1">
          <p className="font-medium flex items-center">
            <Info className="w-4 h-4 mr-2" /> What happens next?
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You will receive an SMS confirmation within 1 hour</li>
            <li>Funds will be transferred to your bank account after 24 hours</li>
            <li>Your loan details are available in the KSA app</li>
          </ul>
        </div>

        {/* Dashboard Button */}
        <button
          onClick={onDashboard}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-md font-semibold w-full"
        >
          Go to Dashboard
        </button>

        <p className="text-sm text-gray-400 mt-2">
          Need help? Contact our support team at 800-234-5678
        </p>
      </div>
    </div>
  );
};

export default CompletionStep;
