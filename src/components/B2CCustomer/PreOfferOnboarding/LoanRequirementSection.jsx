import React, { useEffect, useState } from "react";
import { useActiveTab } from "../ActiveTabContext";
import { useSelector } from "react-redux";
import InputSlider from "../../Common/InputSlider/InputSlider";

function LoanRequirementSection({ onNext, onBack }) {
  const { formData, setFormData } = useActiveTab();
  const { loanProductData } = useSelector((state) => state.personalLoans);
  const [repaymentTenure, setRepaymentTenure] = useState(["1","2"]);
  const [loanPeriod, setLoanPeriod] = useState(["1","2"]);

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

  console.log("formData-", formData)


  return (
    <>

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
      {/* <InputSlider
        labelName="Repayment Tenure"
        inputName={"repayment"}
        inputLevels={repaymentTenure}
        inputValue={formData.repayment}
        coloredTheme={false}
        onChange={({ target: { value } }) => setFormData({ ...formData, repayment: value })}
        disabled={true}
      /> */}

      {/* Interest Rate */}
      <p className="text-sm">Interest Rate: {formData.interestRate}%</p>

    </>
  );
}

export default LoanRequirementSection;
