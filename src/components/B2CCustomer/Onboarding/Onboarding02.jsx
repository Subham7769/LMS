import React, { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { useActiveTab } from "../ActiveTabContext";
import { useSelector } from "react-redux";
import { isYesterday } from "date-fns";
import InputSlider from "../../Common/InputSlider/InputSlider";

function Onboarding02({ onNext, onBack }) {
  const { formData, setFormData } = useActiveTab();
  const { loanProductData } = useSelector((state) => state.personalLoans);
  const [interestRate, setInterestRate] = useState(0);
  const [repaymentTenure, setRepaymentTenure] = useState("");
  const [loanPeriod, setLoanPeriod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  useEffect(() => {
    if (loanProductData) {
      const loanProduct = loanProductData.filter(
        (item) => item.loanProductId === formData.loanType
      );
      console.log(loanProduct)
      const eligibleTenures = loanProduct[0]?.interestEligibleTenure || [];

      const LoanPeriodArr = [...new Set(eligibleTenures.map(item => item.loanTenure))];
      const RepaymentTenureArr = [...new Set(eligibleTenures.map(item => item.repaymentTenure))];

      setLoanPeriod(LoanPeriodArr);
      setRepaymentTenure(RepaymentTenureArr);
    }
  }, [loanProductData]);

  useEffect(() => {
    if (loanProductData) {
      const loanProduct = loanProductData.filter(
        (item) => item.loanProductId === formData.loanType
      );
      const eligibleTenures = loanProduct[0]?.interestEligibleTenure || [];

      const matchedTenure = eligibleTenures.find(item => Number(item.loanTenure) === Number(formData.period));

      if (matchedTenure) {
        setFormData({
          ...formData,
          interestRate: parseFloat(matchedTenure.interestRate) || 0,
          repayment: matchedTenure.repaymentTenure || "",
        });
      }
    }
  }, [formData.period])

  // console.log("formData-", formData)


  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">Loan Details</h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
          {/* Loan Amount */}
          <InputSlider
            labelName="Loan Amount"
            inputName={"amount"}
            inputLevels={Array.from({ length: 10 }, (_, i) => (i + 1) * 20000)}
            inputValue={formData.amount}
            coloredTheme={false}
            onChange={({ target: { value } }) => setFormData({ ...formData, amount: value })}
          />

          {/* Loan Period */}
          <InputSlider
            labelName="Loan Period"
            inputName={"period"}
            inputLevels={loanPeriod}
            inputValue={formData.period}
            coloredTheme={false}
            onChange={({ target: { value } }) => setFormData({ ...formData, period: value })}
          />

          {/* Repayment Tenure */}
          <InputSlider
            labelName="Repayment Tenure"
            inputName={"repayment"}
            inputLevels={repaymentTenure}
            inputValue={formData.repayment}
            coloredTheme={false}
            onChange={({ target: { value } }) => setFormData({ ...formData, repayment: value })}
            disabled={true}
          />

          {/* Interest Rate */}
          <p className="text-sm mb-4">Interest Rate: {formData.interestRate}%</p>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="btn bg-gray-300 text-black px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              type="submit"
              className="btn bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding02;
