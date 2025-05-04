import React, { useEffect, useState } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { checkFinanceEligibility, getLoanOffers, selectLoanOffer, submitLoanApplication, updateOffer } from "../../../redux/Slices/ProductTestingKSA";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { useSelector } from "react-redux";
import InputRange from "../../Common/InputRange/InputRange";

// getCarbonLoanConfigurationAndSubmitLoan
// 1st api- API for Max Loan amount check
// pass amount in 2nd API
// 2nd- API to return user's loan offers
// 3rd- Hit API for Changed Amount (Not Created) it will return Transaction Id
// 4th- Submit Loan API by Transaction Id will return Loan Id
// Go Further using this Loan Id



const LoanOffers = ({ onNext }) => {
    const [selectedOfferId, setSelectedOfferId] = useState(132);
    const [amount, setAmount] = useState("");
    const { loanEstimate, loanOffers } = useSelector(state => state.productTestingKSA)


    const dispatch = useDispatch();
    const { userId } = useActiveTab();

    const handleSelect = (id) => setSelectedOfferId(id);

    const handleContinue = () => {
        if (selectedOfferId !== null) {
            if (amount) {
                const SeletedOffer = loanOffers.dynamicCashLoanOffers.filter((offer) => offer.transactionId === selectedOfferId);
                console.log(selectedOfferId)
                console.log(SeletedOffer)
                const offerSelection = {
                    "loan_type": "PERSONAL_FINANCE",
                    "customer_type": "CONSUMER",
                    "amount": amount,
                    "selectedTenure": SeletedOffer[0]?.durationInMonths,
                }
                dispatch(selectLoanOffer({ offerSelection, userId })).unwrap();
            }
            else {
                dispatch(submitLoanApplication({ transactionId: selectedOfferId, contractNumber: "123456789", userId })).unwrap();
            }
            onNext();
        }
    };

    useEffect(() => {
        dispatch(checkFinanceEligibility({
            employmentSector: "Private",
            monthlyInstallment: "5000",
            salary: "80000",
            userId,
            workingMonths: "12"
        })).unwrap();

        const offerData = {
            loan_type: "PERSONAL_FINANCE",
            customer_type: "CONSUMER",
            amount: loanEstimate?.maxLoanAmount,
        }
        dispatch(getLoanOffers({ offerData, userId })).unwrap();
    }, [userId])

    const handleMaxChangeAmount = (e) => {
        setAmount(e.target.value)
        dispatch(updateOffer({ selectedOfferId, amount: e.target.value }))
    }


    // function calculateEMI(P, annualRate, N) {
    //     const R = annualRate / (12 * 100); // Convert annual interest rate to monthly decimal

    //     const numerator = P * R * Math.pow(1 + R, N);
    //     const denominator = Math.pow(1 + R, N) - 1;

    //     const EMI = numerator / denominator;
    //     return EMI;
    //   }


    return (
        <div className="space-y-6">
            {/* Stepper */}
            <Stepper title={"KSA Financing"} currentStep={2} steps={["Self Declaration", "Loan Offers", "Digital Contract", "Promissory Note", "IBAN Verification", "Completion"]} />

            {/* Offer Selection */}
            <div>
                <h2 className="text-xl font-semibold mb-1">Loan offers after Credit scoring, affordability check</h2>
                <p className="text-gray-600">Select from the available financing offers</p>
            </div>

            <InputRange
                labelName={"Principle Loan Amount"}
                labelNameMin={"Min"}
                labelNameMax={"Max"}
                inputNameMin="amount"
                inputNameMax="amount"
                inputValueMin={5000}
                inputValueMax={amount}
                placeHolder="Select a value"
                min={5000}
                max={loanOffers?.cashLoanStats?.maxLoanAmount || 1000000}
                handleMinChange={() => { }}
                handleMaxChange={handleMaxChangeAmount}
                unitSymbol={"SAR"}

            />


            {loanOffers?.dynamicCashLoanOffers?.map((offer) => (
                <label
                    key={offer?.id}
                    className={`block border rounded-xl p-4 cursor-pointer transition ${selectedOfferId === offer?.transactionId ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
                        }`}
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="font-medium text-lg">Offer #{offer?.transactionId}</h3>
                            <div className="mt-2 space-y-1 text-sm text-gray-700">
                                <p><strong>Amount:</strong> {offer?.principalAmount}</p>
                                <p><strong>Term:</strong> {offer?.durationInMonths}</p>
                                <p><strong>Monthly Payment:</strong> {offer?.installmentSummaryResponse[0]?.totalRequiredAmount}</p>
                                <p><strong>APR:</strong> {offer?.annualInterestRatePercent}</p>
                            </div>
                        </div>
                        <input
                            type="radio"
                            name="loanOffer"
                            checked={selectedOfferId === offer?.transactionId}
                            onChange={() => handleSelect(offer?.transactionId)}
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
