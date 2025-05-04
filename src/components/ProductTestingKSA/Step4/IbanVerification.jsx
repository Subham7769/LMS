import React, { useState } from "react";
import { Info } from "lucide-react";
import Stepper from "../../Common/Stepper/Stepper";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { verifyIban } from "../../../redux/Slices/ProductTestingKSA";

const steps = [
  "Loan Offers",
  "Digital Contract",
  "Promissory Note",
  "IBAN Verification",
  "Completion",
];

const IBANVerification = ({ onNext }) => {
  const [iban, setIban] = useState("SA1544778855885588559966");
  const [confirmed, setConfirmed] = useState(false);
  const dispatch = useDispatch();
  const { userId } = useActiveTab();
  // ab0de322-63b0-41f9-b882-30bbe4107fd2

  const isValid = iban.startsWith("SA") && iban.length === 24 && confirmed;

  const handleSubmit = async () => {
    await dispatch(verifyIban({ "ibanNumber": iban, userId })).unwrap();
    onNext()
  }
  return (
    <div className="space-y-6">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={4} steps={["Loan Offers", "Digital Contract", "Promissory Note", "IBAN Verification", "Completion"]} />

      {/* IBAN Verification Content */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">IBAN Verification</h2>
        <p className="text-gray-600">Verify your bank account details for loan disbursement</p>

        <div className="border border-gray-200 rounded-lg p-5 bg-white space-y-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">IBAN Number</label>
          <input
            type="text"
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="SA followed by 22 digits"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
          />
          <p className="text-xs text-gray-500">Format: SA followed by 22 digits</p>

          <div className="flex items-start bg-yellow-50 text-yellow-800 border border-yellow-200 p-3 rounded-md text-sm">
            <Info className="w-4 h-4 mt-0.5 mr-2" />
            <p>
              Please ensure your IBAN is correct. The loan amount will be transferred to this account.
              Incorrect IBAN details may delay your loan disbursement.
            </p>
          </div>

          <label className="inline-flex items-center mt-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={() => setConfirmed(!confirmed)}
              className="form-checkbox text-emerald-600 h-4 w-4 mr-2"
            />
            I confirm that the above bank details are correct and belong to me
          </label>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`w-full py-2 rounded-md text-white font-semibold ${isValid ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
};

export default IBANVerification;
