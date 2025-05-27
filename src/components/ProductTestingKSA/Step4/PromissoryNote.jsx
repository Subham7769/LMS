import React, { useState } from "react";
import { Download, UploadCloud, Info, CheckCheck } from "lucide-react";
import Stepper from "../../Common/Stepper/Stepper";

const steps = [
  "Loan Offers",
  "Digital Contract",
  "Promissory Note",
  "IBAN Verification",
  "Completion",
];

const PromissoryNote = ({ onNext }) => {
  const [uploaded, setUploaded] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);


  return (
    <div className="space-y-6">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={4} steps={["Self Declaration", "Loan Offers", "Digital Contract", "Promissory Note", "IBAN Verification", "Completion"]} />

      {/* Promissory Note Content */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Promissory Note</h2>
        {/* <p className="text-gray-600">Download, sign, and upload your promissory note</p> */}

        {/* Promissory Note Upload Box */}
        {/* <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-4">
          <div>
            <h3 className="font-medium text-gray-800 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              Promissory Note
            </h3>
            <p className="text-sm text-gray-600 mt-1">Your personal commitment to repay the loan</p>
          </div>
          <div className="flex gap-5">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-teal-600 hover:underline text-sm bg-teal-50 px-3 py-2 rounded-md border border-teal-200"
            >
              <Download className="w-4 h-4" />
              Download Promissory Note
            </a>

            <label className="inline-flex items-center gap-2 text-sm text-blue-700 cursor-pointer bg-blue-50 px-3 py-2 rounded-md border border-blue-200">
              <UploadCloud className="w-4 h-4" />
              <input
                type="file"
                onChange={() => setUploaded(true)}
                className="hidden"
              />
              Upload Signed Document
              {uploaded && <CheckCheck className="w-4 h-4 text-blue-700" />}
            </label>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4 text-sm space-y-1">
            <p className="font-medium">Important information about the Promissory Note:</p>
            <ul className="list-disc list-inside">
              <li>Print the document on white paper</li>
              <li>Sign with blue ink pen in the designated area</li>
              <li>Make sure your signature matches your ID</li>
              <li>Scan or take a clear photo of the signed document</li>
            </ul>
          </div>
        </div> */}

        {/* Consent */}
        <div className="flex items-start gap-2 mt-4">
          <input
            type="checkbox"
            id="consent"
            checked={consentGiven}
            onChange={(e) => setConsentGiven(e.target.checked)}
            className="mt-1"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
          I consent to issue and sign the digital promissory note(s) through the Nafith platform, acknowledging its legal validity under Saudi Arabian law.
          </label>
        </div>
        <button
          onClick={onNext}
          // disabled={!consentGiven}
          className={`w-full py-2 rounded-md text-white font-semibold ${!consentGiven ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PromissoryNote;
