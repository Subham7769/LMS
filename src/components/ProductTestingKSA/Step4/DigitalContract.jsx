import React, { useState } from "react";
import { Download, UploadCloud, CheckCheck } from "lucide-react";
import Stepper from "../../Common/Stepper/Stepper";

const steps = [
  "Loan Offers",
  "Digital Contract",
  "Promissory Note",
  "IBAN Verification",
  "Completion",
];

const DigitalContract = ({ onNext }) => {
  const [loanAgreementUploaded, setLoanAgreementUploaded] = useState(false);
  const [saleConsentUploaded, setSaleConsentUploaded] = useState(false);

  const isContinueDisabled = !(loanAgreementUploaded && saleConsentUploaded);

  return (
    <div className="space-y-6">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={2} steps={["Loan Offers", "Digital Contract", "Promissory Note", "IBAN Verification", "Completion"]} />

      {/* Digital Contract Content */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Digital Contract</h2>
        <p className="text-gray-600">Download, sign, and upload your documents</p>

        {/* Loan Agreement */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
          <h3 className="font-medium text-gray-800">Loan Agreement</h3>
          <p className="text-sm text-gray-600">This document outlines the terms and conditions of your loan</p>
          <div className=" flex flex-col gap-3 ">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm bg-teal-50 p-2 w-fit border border-teal-200 rounded-lg"
            >
              <Download className="w-4 h-4" />
              Download Document
            </a>

            <label className="inline-flex items-center gap-2 text-sm text-blue-700 cursor-pointer bg-blue-50 p-2 w-fit border border-blue-200 rounded-lg">
              <UploadCloud className="w-4 h-4" />
              <input
                type="file"
                onChange={() => setLoanAgreementUploaded(true)}
                className="hidden"
              />
              Upload Signed Document
              {loanAgreementUploaded && <CheckCheck className="w-4 h-4 text-blue-700" />}
            </label>
          </div>
          <p className="text-xs text-gray-500">
            Please download the document, sign it, and upload the signed copy.
          </p>
        </div>

        {/* Sale Consent */}
        <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
          <h3 className="font-medium text-gray-800">Sale Consent Document</h3>
          <p className="text-sm text-gray-600">
            Assigns KSA as agent to sell commodity on your behalf to the broker as per Shariah financing
          </p>
          <div className=" flex flex-col gap-3 ">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm bg-teal-50 p-2 w-fit border border-teal-200 rounded-lg"
            >
              <Download className="w-4 h-4" />
              Download Document
            </a>

            <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer bg-blue-50 p-2 w-fit border border-blue-200 rounded-lg">
              <UploadCloud className="w-4 h-4" />
              <input
                type="file"
                onChange={() => setSaleConsentUploaded(true)}
                className="hidden"
              />
              Upload Signed Document
              {saleConsentUploaded && <CheckCheck className="w-4 h-4 text-blue-700" />}
            </label>
          </div>
          <p className="text-xs text-gray-500">
            This document is required for Shariah compliance.
          </p>
        </div>

        {/* Reminder Note */}
        <div className="bg-blue-50 text-blue-700 text-sm border border-blue-200 rounded-md p-3">
          <span className="font-medium">Please ensure</span> that all signed documents are clearly legible.
          Your signature should match the one on your ID.
        </div>

        {/* Continue Button */}
        <button
          onClick={onNext}
          disabled={isContinueDisabled}
          className={`w-full py-2 rounded-md text-white font-semibold ${isContinueDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DigitalContract;
