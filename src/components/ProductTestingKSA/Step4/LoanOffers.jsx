import React, { useState } from "react";

const loanOptions = [
    {
        id: 1,
        amount: "50,000 SAR",
        term: "24 months",
        monthlyPayment: "2,250 SAR",
        profitRate: "9.5%",
    },
    {
        id: 2,
        amount: "50,000 SAR",
        term: "36 months",
        monthlyPayment: "1,650 SAR",
        profitRate: "10.5%",
    },
];

const steps = [
    "Loan Offers",
    "Digital Contract",
    "Promissory Note",
    "IBAN Verification",
    "Completion",
];

const LoanOffers = ({ onNext }) => {
    const [selectedOfferId, setSelectedOfferId] = useState(null);

    const handleSelect = (id) => setSelectedOfferId(id);
    const handleContinue = () => {
        if (selectedOfferId !== null) {
            onNext();
        }
    };

    return (
        <div className="space-y-6">
            {/* Stepper */}
            <div>
                <p className="text-sm text-gray-500 mb-2">Step 1 of 4</p>
                <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
                    <div className="bg-teal-600 h-2 rounded-full w-1/4" />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium mb-6">
                    {["Loan Offers",
                        "Digital Contract",
                        "Promissory Note",
                        "IBAN Verification",
                        "Completion"].map(
                            (step, idx) => (
                                <span key={idx} className={idx === 0 ? "text-teal-600" : ""}>
                                    {step}
                                </span>
                            )
                        )}
                </div>
            </div>

            {/* Offer Selection */}
            <div>
                <h2 className="text-xl font-semibold mb-1">Loan offers after Credit scoring, affordability check</h2>
                <p className="text-gray-600">Select from the available financing offers</p>
            </div>

            {loanOptions.map((offer) => (
                <label
                    key={offer.id}
                    className={`block border rounded-xl p-4 cursor-pointer transition ${selectedOfferId === offer.id ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-lg">Offer #{offer.id}</h3>
                            <div className="mt-2 space-y-1 text-sm text-gray-700">
                                <p><strong>Amount:</strong> {offer.amount}</p>
                                <p><strong>Term:</strong> {offer.term}</p>
                                <p><strong>Monthly Payment:</strong> {offer.monthlyPayment}</p>
                                <p><strong>Profit Rate:</strong> {offer.profitRate}</p>
                            </div>
                        </div>
                        <input
                            type="radio"
                            name="loanOffer"
                            checked={selectedOfferId === offer.id}
                            onChange={() => handleSelect(offer.id)}
                            className="w-5 h-5 accent-emerald-600"
                        />
                    </div>
                </label>
            ))}

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={selectedOfferId === null}
                className={`w-full py-2 rounded-md text-white font-semibold ${selectedOfferId === null ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-700"
                    }`}
            >
                Continue with Selected Offer
            </button>
        </div>
    );
};

export default LoanOffers;
