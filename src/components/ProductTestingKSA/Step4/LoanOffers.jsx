import React, { useEffect, useState } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { getLoanOffers } from "../../../redux/Slices/ProductTestingKSA";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";

// getCarbonLoanConfigurationAndSubmitLoan
// 1st api- API for Max Loan amount check
// pass amount in 2nd API
// 2nd- API to return user's loan offers
// 3rd- Hit API for Changed Amount (Not Created) it will return Transaction Id
// 4th- Submit Loan API by Transaction Id will return Loan Id
// Go Further using this Loan Id


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


const LoanOffers = ({ onNext }) => {
    const [selectedOfferId, setSelectedOfferId] = useState(null);

    const dispatch = useDispatch();
    const { userId } = useActiveTab();

    const handleSelect = (id) => setSelectedOfferId(id);
    const handleContinue = () => {
        if (selectedOfferId !== null) {
            onNext();
        }
    };

    useEffect(() => {
        dispatch(getLoanOffers({  userId })).unwrap();
    }, [])

    return (
        <div className="space-y-6">
            {/* Stepper */}
            <Stepper title={"KSA Financing"} currentStep={1} steps={["Loan Offers", "Digital Contract", "Promissory Note", "IBAN Verification", "Completion"]} />

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
