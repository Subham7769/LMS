import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputSlider from "../../Common/InputSlider/InputSlider";
import { updateAddLoanDataGeneralDetailsField, updatePersonalBorrowerField } from '../../../redux/Slices/B2CLoansSlice';


function LoanRequirementSection({ onNext, onBack }) {
  const [loanPeriod, setLoanPeriod] = useState([1, 2]);
  const dispatch = useDispatch();
  const { loanProductOptions, loanProductData, addLoanData,loading } = useSelector((state) => state.B2CLoans);


  const handleInputChange = (e) => {
    // console.log( e.target)
    const { name, value, type, checked } = e.target;
    dispatch(updateAddLoanDataGeneralDetailsField({ field: name, value, type, checked }));
    if (name === "principalAmount") {
      dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedAmount", value, type, checked }));

    } else if (name === "loanDuration") {
      dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedPeriod", value, type, checked }));
    }
  };


  useEffect(() => {
    if (loanProductData) {
      const loanProduct = loanProductData.filter(
        (item) => item.loanProductId === addLoanData?.generalLoanDetails?.loanProductId
      );
      console.log(loanProduct)
      const eligibleTenures = loanProduct[0]?.interestEligibleTenure || [];

      const LoanPeriodArr = [...new Set(eligibleTenures.map(item => item.loanTenure))];
      const RepaymentTenureArr = [...new Set(eligibleTenures.map(item => item.repaymentTenure))];

      setLoanPeriod(LoanPeriodArr);
    }
  }, [loanProductData]);

  useEffect(() => {
    if (loanProductData) {
      const loanProduct = loanProductData.filter(
        (item) => item.loanProductId === addLoanData.generalLoanDetails.loanProductId
      );
      const eligibleTenures = loanProduct[0]?.interestEligibleTenure || [];

      const matchedTenure = eligibleTenures.find(item => Number(item.loanTenure) === Number(addLoanData.generalLoanDetails.loanDuration));

      if (matchedTenure) {
        dispatch(updateAddLoanDataGeneralDetailsField({
          field: "loanInterest",
          value: parseFloat(matchedTenure.interestRate) || 0,
        }));
        dispatch(updateAddLoanDataGeneralDetailsField({
          field: "repaymentTenure",
          value: matchedTenure.repaymentTenure || "",
        }));

        dispatch(updateAddLoanDataGeneralDetailsField({
          field: "loanInterestStr",
          value: `${parseFloat(matchedTenure.interestRate) || 0}% PER YEAR REDUCING`,
        }));
        dispatch(updateAddLoanDataGeneralDetailsField({
          field: "repaymentTenureStr",
          value: `${matchedTenure.repaymentTenure || ""} MONTHS`,
        }));
        dispatch(updateAddLoanDataGeneralDetailsField({
          field: "loanDurationStr",
          value: `${addLoanData.generalLoanDetails.loanDuration || ""} MONTHS`,
        }));

        dispatch(updatePersonalBorrowerField({
          section: "cachedDetails",
          field: "cachedInterestRate",
          value: parseFloat(matchedTenure.interestRate) || 0,
        }));

        dispatch(updatePersonalBorrowerField({
          section: "cachedDetails",
          field: "cachedRepayment",
          value: matchedTenure.repaymentTenure || "",
        }));


      }
    }
  }, [addLoanData.generalLoanDetails.loanDuration])


  if (loading) {
    return (<p>Loading...</p>)
  }
console.log(loanPeriod)


  return (
    <>

      {/* Loan Amount */}
      <InputSlider
        labelName="Loan Amount"
        inputName={"principalAmount"}
        inputLevels={Array.from({ length: 10 }, (_, i) => (i + 1) * 20000)}
        inputValue={addLoanData?.generalLoanDetails?.principalAmount}
        coloredTheme={false}
        onChange={(e) => handleInputChange(e)}
      />

      {/* Loan Period */}
      <InputSlider
        labelName="Loan Period"
        inputName={"loanDuration"}
        inputLevels={loanPeriod}
        inputValue={addLoanData?.generalLoanDetails?.loanDuration}
        coloredTheme={false}
        onChange={(e) => handleInputChange(e)}
      />

      {/* Repayment Tenure */}
      {/* <InputSlider
        labelName="Repayment Tenure"
        inputName={"repaymentTenure"}
        inputLevels={repaymentTenure}
        inputValue={addLoanData.generalLoanDetails.repaymentTenure}
        coloredTheme={false}
        onChange={(e) => handleInputChange(e)}
        disabled={true}
      /> */}

      {/* Interest Rate */}
      <p className="text-sm">Interest Rate: {addLoanData.generalLoanDetails.loanInterest}%</p>

    </>
  );
}

export default LoanRequirementSection;
