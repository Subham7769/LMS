import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InstallmentInfoComp from "./InstallmentInfoComp";
import LoadingState from "../LoadingState";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={style} onClick={onClick}>
      <div className="bg-[#E3735E] h-6 w-6 rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={style} onClick={onClick}>
      <div className="bg-[#E3735E] h-6 w-6 rounded-full p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
    </div>
  );
}

// const loanConfigData = {
//   profile: {
//     cashTCL: 250000.0,
//     netCashTCL: 245000.0,
//     cashCreditScore: 0.59,
//     cashSeed: false,
//   },
//   cashLoanStats: {
//     maxLoanDuration: 558,
//     minLoanDuration: 93,
//     maxLoanDurationMonths: 18,
//     minLoanDurationMonths: 3,
//     maxLoanAmount: 5000.0,
//     minLoanAmount: 5000.0,
//     maxTenure: 18,
//     minTenure: 3,
//   },
//   dynamicCashLoanOffers: [
//     {
//       transactionId: "89a35df1-6afb-41ab-943a-d1fbd443da5e",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 31274.17,
//       totalInterestAmount: 26216.67,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 341,
//       instalmentsNumber: 11,
//       dailyInterestRate: 0.014519636499571664,
//       durationInMonths: 11,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2817.07,
//           principalValue: 20.81,
//           closingAmount: 7874.57,
//           earlySettlementFee: 2817.07,
//           savedFee: 23399.61,
//           savedFeePercent: 89.25,
//           totalOutsandingAmount: 28431.07,
//           termCost: 2805.35,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4979.19,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2805.35,
//           principalValue: 32.53,
//           closingAmount: 7836.81,
//           earlySettlementFee: 2805.35,
//           savedFee: 20594.26,
//           savedFeePercent: 88.01,
//           totalOutsandingAmount: 25587.96,
//           termCost: 2787.02,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4946.66,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2787.02,
//           principalValue: 50.86,
//           closingAmount: 7780.72,
//           earlySettlementFee: 2787.02,
//           savedFee: 17807.24,
//           savedFeePercent: 86.47,
//           totalOutsandingAmount: 22744.85,
//           termCost: 2758.37,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4895.8,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2758.37,
//           principalValue: 79.51,
//           closingAmount: 7695.98,
//           earlySettlementFee: 2758.37,
//           savedFee: 15048.87,
//           savedFeePercent: 84.51,
//           totalOutsandingAmount: 19901.74,
//           termCost: 2713.57,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4816.29,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2713.57,
//           principalValue: 124.31,
//           closingAmount: 7566.44,
//           earlySettlementFee: 2713.57,
//           savedFee: 12335.3,
//           savedFeePercent: 81.97,
//           totalOutsandingAmount: 17058.63,
//           termCost: 2643.53,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4691.98,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2643.53,
//           principalValue: 194.35,
//           closingAmount: 7366.86,
//           earlySettlementFee: 2643.53,
//           savedFee: 9691.77,
//           savedFeePercent: 78.57,
//           totalOutsandingAmount: 14215.52,
//           termCost: 2534.03,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4497.63,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2534.03,
//           principalValue: 303.85,
//           closingAmount: 7057.78,
//           earlySettlementFee: 2534.03,
//           savedFee: 7157.74,
//           savedFeePercent: 73.85,
//           totalOutsandingAmount: 11372.41,
//           termCost: 2362.84,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4193.78,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2362.84,
//           principalValue: 475.04,
//           closingAmount: 6577.51,
//           earlySettlementFee: 2362.84,
//           savedFee: 4794.9,
//           savedFeePercent: 66.99,
//           totalOutsandingAmount: 8529.3,
//           termCost: 2095.19,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 3718.74,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2025-03-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 2095.19,
//           principalValue: 742.69,
//           closingAmount: 5829.59,
//           earlySettlementFee: 2095.19,
//           savedFee: 2699.71,
//           savedFeePercent: 56.3,
//           totalOutsandingAmount: 5686.19,
//           termCost: 1676.75,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 2976.05,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2025-04-01",
//           totalRequiredAmount: 2843.11,
//           interestValue: 1676.75,
//           principalValue: 1161.13,
//           closingAmount: 4663.23,
//           earlySettlementFee: 1676.75,
//           savedFee: 1022.96,
//           savedFeePercent: 37.89,
//           totalOutsandingAmount: 2843.08,
//           termCost: 1022.96,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 1814.92,
//         },
//         {
//           installmentValue: 2837.88,
//           installmentDate: "2025-05-01",
//           totalRequiredAmount: 2843.08,
//           interestValue: 1022.96,
//           principalValue: 1814.92,
//           closingAmount: 2843.08,
//           earlySettlementFee: 1022.96,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 4.5,
//           vatFee: 0.7,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 619.76,
//       dailyInterestRatePercentWithoutFee: 1.45,
//       annualInterestRatePercentWithoutFee: 619.76,
//       monthlyInterestRatePercent: 56.34,
//       aprAsPerTenorPercent: 620.93,
//       monthlyInterestRatePercentWithoutFee: 56.34,
//       annualFlatRatePercent: 572.0,
//       monthlyFlatRatePercent: 47.67,
//       aprWithoutFeePerMonthPercent: 51.65,
//       aprPerMonthPercent: 51.65,
//       loanFlatRate: 5.24333,
//       avrageNumberOfenstallment: 11.0,
//     },
//     {
//       transactionId: "03f0c178-7c7c-4376-b5ee-691d689fecdd",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 6195.0,
//       totalInterestAmount: 1137.5,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 93,
//       instalmentsNumber: 3,
//       dailyInterestRate: 0.0033702237409187763,
//       durationInMonths: 3,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 2045.83,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 2065.0,
//           interestValue: 549.67,
//           principalValue: 1496.16,
//           closingAmount: 5607.17,
//           earlySettlementFee: 549.67,
//           savedFee: 587.82,
//           savedFeePercent: 51.68,
//           totalOutsandingAmount: 4129.99,
//           termCost: 385.19,
//           thirdPartyCost: 0.0,
//           managementFee: 16.67,
//           vatFee: 2.5,
//           principalOutstandingAmount: 3503.84,
//         },
//         {
//           installmentValue: 2045.83,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 2065.0,
//           interestValue: 385.19,
//           principalValue: 1660.64,
//           closingAmount: 3927.36,
//           earlySettlementFee: 385.19,
//           savedFee: 202.63,
//           savedFeePercent: 34.47,
//           totalOutsandingAmount: 2064.99,
//           termCost: 202.63,
//           thirdPartyCost: 0.0,
//           managementFee: 16.67,
//           vatFee: 2.5,
//           principalOutstandingAmount: 1843.2,
//         },
//         {
//           installmentValue: 2045.83,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 2064.99,
//           interestValue: 202.63,
//           principalValue: 1843.2,
//           closingAmount: 2064.99,
//           earlySettlementFee: 202.63,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 16.66,
//           vatFee: 2.5,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 32.98,
//       dailyInterestRatePercentWithoutFee: 0.34,
//       annualInterestRatePercentWithoutFee: 32.98,
//       monthlyInterestRatePercent: 10.99,
//       aprAsPerTenorPercent: 34.59,
//       monthlyInterestRatePercentWithoutFee: 10.99,
//       annualFlatRatePercent: 91.0,
//       monthlyFlatRatePercent: 7.58,
//       aprWithoutFeePerMonthPercent: 2.75,
//       aprPerMonthPercent: 2.75,
//       loanFlatRate: 0.2275,
//       avrageNumberOfenstallment: 3.0,
//     },
//     {
//       transactionId: "1a70dbc6-f20d-4aeb-8147-08f28db81ca1",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 6357.5,
//       totalInterestAmount: 1300.0,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 124,
//       instalmentsNumber: 4,
//       dailyInterestRate: 0.0030589616642975326,
//       durationInMonths: 4,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 1575.0,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 1589.38,
//           interestValue: 496.55,
//           principalValue: 1078.45,
//           closingAmount: 5554.05,
//           earlySettlementFee: 496.55,
//           savedFee: 803.45,
//           savedFeePercent: 61.8,
//           totalOutsandingAmount: 4768.12,
//           termCost: 389.45,
//           thirdPartyCost: 0.0,
//           managementFee: 12.5,
//           vatFee: 1.88,
//           principalOutstandingAmount: 3921.55,
//         },
//         {
//           installmentValue: 1575.0,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 1589.38,
//           interestValue: 389.45,
//           principalValue: 1185.55,
//           closingAmount: 4354.12,
//           earlySettlementFee: 389.45,
//           savedFee: 414.0,
//           savedFeePercent: 51.53,
//           totalOutsandingAmount: 3178.74,
//           termCost: 271.71,
//           thirdPartyCost: 0.0,
//           managementFee: 12.5,
//           vatFee: 1.88,
//           principalOutstandingAmount: 2736.0,
//         },
//         {
//           installmentValue: 1575.0,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 1589.38,
//           interestValue: 271.71,
//           principalValue: 1303.29,
//           closingAmount: 3036.45,
//           earlySettlementFee: 271.71,
//           savedFee: 142.29,
//           savedFeePercent: 34.37,
//           totalOutsandingAmount: 1589.36,
//           termCost: 142.29,
//           thirdPartyCost: 0.0,
//           managementFee: 12.5,
//           vatFee: 1.88,
//           principalOutstandingAmount: 1432.71,
//         },
//         {
//           installmentValue: 1575.0,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 1589.36,
//           interestValue: 142.29,
//           principalValue: 1432.71,
//           closingAmount: 1589.36,
//           earlySettlementFee: 142.29,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 12.5,
//           vatFee: 1.86,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 39.72,
//       dailyInterestRatePercentWithoutFee: 0.31,
//       annualInterestRatePercentWithoutFee: 39.72,
//       monthlyInterestRatePercent: 9.93,
//       aprAsPerTenorPercent: 41.41,
//       monthlyInterestRatePercentWithoutFee: 9.93,
//       annualFlatRatePercent: 78.0,
//       monthlyFlatRatePercent: 6.5,
//       aprWithoutFeePerMonthPercent: 3.31,
//       aprPerMonthPercent: 3.31,
//       loanFlatRate: 0.26,
//       avrageNumberOfenstallment: 4.0,
//     },
//     {
//       transactionId: "062f2b56-702c-4c61-b8b8-1756a17889df",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 6682.5,
//       totalInterestAmount: 1625.0,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 155,
//       instalmentsNumber: 5,
//       dailyInterestRate: 0.0031316541559531785,
//       durationInMonths: 5,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 1325.0,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 1336.5,
//           interestValue: 508.91,
//           principalValue: 816.09,
//           closingAmount: 5566.41,
//           earlySettlementFee: 508.91,
//           savedFee: 1116.09,
//           savedFeePercent: 68.68,
//           totalOutsandingAmount: 5346.0,
//           termCost: 425.85,
//           thirdPartyCost: 0.0,
//           managementFee: 10.0,
//           vatFee: 1.5,
//           principalOutstandingAmount: 4183.91,
//         },
//         {
//           installmentValue: 1325.0,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 1336.5,
//           interestValue: 425.85,
//           principalValue: 899.15,
//           closingAmount: 4655.76,
//           earlySettlementFee: 425.85,
//           savedFee: 690.24,
//           savedFeePercent: 61.84,
//           totalOutsandingAmount: 4009.5,
//           termCost: 334.33,
//           thirdPartyCost: 0.0,
//           managementFee: 10.0,
//           vatFee: 1.5,
//           principalOutstandingAmount: 3284.76,
//         },
//         {
//           installmentValue: 1325.0,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 1336.5,
//           interestValue: 334.33,
//           principalValue: 990.67,
//           closingAmount: 3653.59,
//           earlySettlementFee: 334.33,
//           savedFee: 355.91,
//           savedFeePercent: 51.56,
//           totalOutsandingAmount: 2673.0,
//           termCost: 233.5,
//           thirdPartyCost: 0.0,
//           managementFee: 10.0,
//           vatFee: 1.5,
//           principalOutstandingAmount: 2294.09,
//         },
//         {
//           installmentValue: 1325.0,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 1336.5,
//           interestValue: 233.5,
//           principalValue: 1091.5,
//           closingAmount: 2550.59,
//           earlySettlementFee: 233.5,
//           savedFee: 122.41,
//           savedFeePercent: 34.39,
//           totalOutsandingAmount: 1336.5,
//           termCost: 122.41,
//           thirdPartyCost: 0.0,
//           managementFee: 10.0,
//           vatFee: 1.5,
//           principalOutstandingAmount: 1202.59,
//         },
//         {
//           installmentValue: 1325.0,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 1336.5,
//           interestValue: 122.41,
//           principalValue: 1202.59,
//           closingAmount: 1336.5,
//           earlySettlementFee: 122.41,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 10.0,
//           vatFee: 1.5,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 50.89,
//       dailyInterestRatePercentWithoutFee: 0.31,
//       annualInterestRatePercentWithoutFee: 50.89,
//       monthlyInterestRatePercent: 10.18,
//       aprAsPerTenorPercent: 52.59,
//       monthlyInterestRatePercentWithoutFee: 10.18,
//       annualFlatRatePercent: 78.0,
//       monthlyFlatRatePercent: 6.5,
//       aprWithoutFeePerMonthPercent: 4.24,
//       aprPerMonthPercent: 4.24,
//       loanFlatRate: 0.325,
//       avrageNumberOfenstallment: 5.0,
//     },
//     {
//       transactionId: "51a92f22-8ddf-4bcb-a234-2883ddd53edb",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7007.5,
//       totalInterestAmount: 1950.0,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 186,
//       instalmentsNumber: 6,
//       dailyInterestRate: 0.003168992730900211,
//       durationInMonths: 6,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 1158.33,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 1167.91,
//           interestValue: 515.27,
//           principalValue: 643.06,
//           closingAmount: 5572.77,
//           earlySettlementFee: 515.27,
//           savedFee: 1434.71,
//           savedFeePercent: 73.58,
//           totalOutsandingAmount: 5839.57,
//           termCost: 449.0,
//           thirdPartyCost: 0.0,
//           managementFee: 8.33,
//           vatFee: 1.25,
//           principalOutstandingAmount: 4356.94,
//         },
//         {
//           installmentValue: 1158.33,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 1167.91,
//           interestValue: 449.0,
//           principalValue: 709.33,
//           closingAmount: 4853.86,
//           earlySettlementFee: 449.0,
//           savedFee: 985.71,
//           savedFeePercent: 68.7,
//           totalOutsandingAmount: 4671.66,
//           termCost: 375.9,
//           thirdPartyCost: 0.0,
//           managementFee: 8.33,
//           vatFee: 1.25,
//           principalOutstandingAmount: 3647.61,
//         },
//         {
//           installmentValue: 1158.33,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 1167.91,
//           interestValue: 375.9,
//           principalValue: 782.43,
//           closingAmount: 4061.85,
//           earlySettlementFee: 375.9,
//           savedFee: 609.81,
//           savedFeePercent: 61.87,
//           totalOutsandingAmount: 3503.75,
//           termCost: 295.27,
//           thirdPartyCost: 0.0,
//           managementFee: 8.33,
//           vatFee: 1.25,
//           principalOutstandingAmount: 2865.18,
//         },
//         {
//           installmentValue: 1158.33,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 1167.91,
//           interestValue: 295.27,
//           principalValue: 863.06,
//           closingAmount: 3189.21,
//           earlySettlementFee: 295.27,
//           savedFee: 314.54,
//           savedFeePercent: 51.58,
//           totalOutsandingAmount: 2335.84,
//           termCost: 206.33,
//           thirdPartyCost: 0.0,
//           managementFee: 8.33,
//           vatFee: 1.25,
//           principalOutstandingAmount: 2002.12,
//         },
//         {
//           installmentValue: 1158.33,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 1167.91,
//           interestValue: 206.33,
//           principalValue: 952.0,
//           closingAmount: 2227.63,
//           earlySettlementFee: 206.33,
//           savedFee: 108.21,
//           savedFeePercent: 34.4,
//           totalOutsandingAmount: 1167.93,
//           termCost: 108.21,
//           thirdPartyCost: 0.0,
//           managementFee: 8.33,
//           vatFee: 1.25,
//           principalOutstandingAmount: 1050.12,
//         },
//         {
//           installmentValue: 1158.33,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 1167.93,
//           interestValue: 108.21,
//           principalValue: 1050.12,
//           closingAmount: 1167.93,
//           earlySettlementFee: 108.21,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 8.35,
//           vatFee: 1.25,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 61.83,
//       dailyInterestRatePercentWithoutFee: 0.32,
//       annualInterestRatePercentWithoutFee: 61.83,
//       monthlyInterestRatePercent: 10.31,
//       aprAsPerTenorPercent: 63.53,
//       monthlyInterestRatePercentWithoutFee: 10.31,
//       annualFlatRatePercent: 78.0,
//       monthlyFlatRatePercent: 6.5,
//       aprWithoutFeePerMonthPercent: 5.15,
//       aprPerMonthPercent: 5.15,
//       loanFlatRate: 0.39,
//       avrageNumberOfenstallment: 6.0,
//     },
//     {
//       transactionId: "12e291ab-aa0f-4455-8b8f-53aecfd3c46e",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7105.0,
//       totalInterestAmount: 2047.5,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 217,
//       instalmentsNumber: 7,
//       dailyInterestRate: 0.0029019441327085005,
//       durationInMonths: 7,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 1015.0,
//           interestValue: 469.94,
//           principalValue: 536.85,
//           closingAmount: 5527.44,
//           earlySettlementFee: 469.94,
//           savedFee: 1577.59,
//           savedFeePercent: 77.05,
//           totalOutsandingAmount: 6090.03,
//           termCost: 419.48,
//           thirdPartyCost: 0.0,
//           managementFee: 7.14,
//           vatFee: 1.07,
//           principalOutstandingAmount: 4463.15,
//         },
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 1015.0,
//           interestValue: 419.48,
//           principalValue: 587.31,
//           closingAmount: 4931.92,
//           earlySettlementFee: 419.48,
//           savedFee: 1158.11,
//           savedFeePercent: 73.41,
//           totalOutsandingAmount: 5075.03,
//           termCost: 364.28,
//           thirdPartyCost: 0.0,
//           managementFee: 7.14,
//           vatFee: 1.07,
//           principalOutstandingAmount: 3875.84,
//         },
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 1015.0,
//           interestValue: 364.28,
//           principalValue: 642.51,
//           closingAmount: 4281.2,
//           earlySettlementFee: 364.28,
//           savedFee: 793.83,
//           savedFeePercent: 68.55,
//           totalOutsandingAmount: 4060.03,
//           termCost: 303.9,
//           thirdPartyCost: 0.0,
//           managementFee: 7.14,
//           vatFee: 1.07,
//           principalOutstandingAmount: 3233.33,
//         },
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 1015.0,
//           interestValue: 303.9,
//           principalValue: 702.89,
//           closingAmount: 3570.1,
//           earlySettlementFee: 303.9,
//           savedFee: 489.93,
//           savedFeePercent: 61.72,
//           totalOutsandingAmount: 3045.03,
//           termCost: 237.83,
//           thirdPartyCost: 0.0,
//           managementFee: 7.14,
//           vatFee: 1.07,
//           principalOutstandingAmount: 2530.44,
//         },
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 1015.0,
//           interestValue: 237.83,
//           principalValue: 768.96,
//           closingAmount: 2792.93,
//           earlySettlementFee: 237.83,
//           savedFee: 252.1,
//           savedFeePercent: 51.46,
//           totalOutsandingAmount: 2030.03,
//           termCost: 165.56,
//           thirdPartyCost: 0.0,
//           managementFee: 7.14,
//           vatFee: 1.07,
//           principalOutstandingAmount: 1761.48,
//         },
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 1015.0,
//           interestValue: 165.56,
//           principalValue: 841.23,
//           closingAmount: 1943.49,
//           earlySettlementFee: 165.56,
//           savedFee: 86.54,
//           savedFeePercent: 34.33,
//           totalOutsandingAmount: 1015.03,
//           termCost: 86.54,
//           thirdPartyCost: 0.0,
//           managementFee: 7.14,
//           vatFee: 1.07,
//           principalOutstandingAmount: 920.25,
//         },
//         {
//           installmentValue: 1006.79,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 1015.03,
//           interestValue: 86.54,
//           principalValue: 920.25,
//           closingAmount: 1015.03,
//           earlySettlementFee: 86.54,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 7.16,
//           vatFee: 1.08,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 65.79,
//       dailyInterestRatePercentWithoutFee: 0.29,
//       annualInterestRatePercentWithoutFee: 65.79,
//       monthlyInterestRatePercent: 9.4,
//       aprAsPerTenorPercent: 67.5,
//       monthlyInterestRatePercentWithoutFee: 9.4,
//       annualFlatRatePercent: 70.2,
//       monthlyFlatRatePercent: 5.85,
//       aprWithoutFeePerMonthPercent: 5.48,
//       aprPerMonthPercent: 5.48,
//       loanFlatRate: 0.4095,
//       avrageNumberOfenstallment: 7.0,
//     },
//     {
//       transactionId: "fddab102-b4e7-4127-bc1f-2d804af07655",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7224.17,
//       totalInterestAmount: 2166.67,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 248,
//       instalmentsNumber: 8,
//       dailyInterestRate: 0.0027169706197032184,
//       durationInMonths: 8,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 895.83,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 438.75,
//           principalValue: 457.08,
//           closingAmount: 5496.25,
//           earlySettlementFee: 438.75,
//           savedFee: 1727.89,
//           savedFeePercent: 79.75,
//           totalOutsandingAmount: 6321.12,
//           termCost: 398.64,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 4542.92,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 398.64,
//           principalValue: 497.19,
//           closingAmount: 4991.87,
//           earlySettlementFee: 398.64,
//           savedFee: 1329.25,
//           savedFeePercent: 76.93,
//           totalOutsandingAmount: 5418.1,
//           termCost: 355.02,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 4045.73,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 355.02,
//           principalValue: 540.81,
//           closingAmount: 4443.87,
//           earlySettlementFee: 355.02,
//           savedFee: 974.23,
//           savedFeePercent: 73.29,
//           totalOutsandingAmount: 4515.08,
//           termCost: 307.56,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 3504.92,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 307.56,
//           principalValue: 588.27,
//           closingAmount: 3848.41,
//           earlySettlementFee: 307.56,
//           savedFee: 666.67,
//           savedFeePercent: 68.43,
//           totalOutsandingAmount: 3612.06,
//           termCost: 255.94,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 2916.65,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 255.94,
//           principalValue: 639.89,
//           closingAmount: 3201.33,
//           earlySettlementFee: 255.94,
//           savedFee: 410.73,
//           savedFeePercent: 61.61,
//           totalOutsandingAmount: 2709.04,
//           termCost: 199.79,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 2276.76,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 199.79,
//           principalValue: 696.04,
//           closingAmount: 2498.1,
//           earlySettlementFee: 199.79,
//           savedFee: 210.94,
//           savedFeePercent: 51.36,
//           totalOutsandingAmount: 1806.02,
//           termCost: 138.71,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 1580.72,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 903.02,
//           interestValue: 138.71,
//           principalValue: 757.12,
//           closingAmount: 1733.79,
//           earlySettlementFee: 138.71,
//           savedFee: 72.23,
//           savedFeePercent: 34.24,
//           totalOutsandingAmount: 903.0,
//           termCost: 72.23,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.94,
//           principalOutstandingAmount: 823.6,
//         },
//         {
//           installmentValue: 895.83,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 903.0,
//           interestValue: 72.23,
//           principalValue: 823.6,
//           closingAmount: 903.0,
//           earlySettlementFee: 72.23,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 6.25,
//           vatFee: 0.92,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 70.2,
//       dailyInterestRatePercentWithoutFee: 0.27,
//       annualInterestRatePercentWithoutFee: 70.2,
//       monthlyInterestRatePercent: 8.78,
//       aprAsPerTenorPercent: 71.92,
//       monthlyInterestRatePercentWithoutFee: 8.78,
//       annualFlatRatePercent: 65.0,
//       monthlyFlatRatePercent: 5.42,
//       aprWithoutFeePerMonthPercent: 5.85,
//       aprPerMonthPercent: 5.85,
//       loanFlatRate: 0.43333,
//       avrageNumberOfenstallment: 8.0,
//     },
//     {
//       transactionId: "995a4ea0-e5d1-4341-be13-4a7ce426ca44",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7300.0,
//       totalInterestAmount: 2242.5,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 279,
//       instalmentsNumber: 9,
//       dailyInterestRate: 0.0025245253987769,
//       durationInMonths: 9,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 804.72,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 406.49,
//           principalValue: 398.23,
//           closingAmount: 5463.99,
//           earlySettlementFee: 406.49,
//           savedFee: 1835.99,
//           savedFeePercent: 81.87,
//           totalOutsandingAmount: 6488.87,
//           termCost: 374.11,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 4601.77,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 374.11,
//           principalValue: 430.61,
//           closingAmount: 5026.99,
//           earlySettlementFee: 374.11,
//           savedFee: 1461.88,
//           savedFeePercent: 79.62,
//           totalOutsandingAmount: 5677.76,
//           termCost: 339.1,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 4171.16,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 339.1,
//           principalValue: 465.62,
//           closingAmount: 4554.98,
//           earlySettlementFee: 339.1,
//           savedFee: 1122.78,
//           savedFeePercent: 76.8,
//           totalOutsandingAmount: 4866.65,
//           termCost: 301.25,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 3705.54,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 301.25,
//           principalValue: 503.47,
//           closingAmount: 4045.12,
//           earlySettlementFee: 301.25,
//           savedFee: 821.53,
//           savedFeePercent: 73.17,
//           totalOutsandingAmount: 4055.54,
//           termCost: 260.32,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 3202.07,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 260.32,
//           principalValue: 544.4,
//           closingAmount: 3494.33,
//           earlySettlementFee: 260.32,
//           savedFee: 561.21,
//           savedFeePercent: 68.31,
//           totalOutsandingAmount: 3244.43,
//           termCost: 216.06,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 2657.67,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 216.06,
//           principalValue: 588.66,
//           closingAmount: 2899.28,
//           earlySettlementFee: 216.06,
//           savedFee: 345.15,
//           savedFeePercent: 61.5,
//           totalOutsandingAmount: 2433.32,
//           termCost: 168.21,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 2069.01,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 168.21,
//           principalValue: 636.51,
//           closingAmount: 2256.38,
//           earlySettlementFee: 168.21,
//           savedFee: 176.94,
//           savedFeePercent: 51.26,
//           totalOutsandingAmount: 1622.21,
//           termCost: 116.46,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 1432.5,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 811.11,
//           interestValue: 116.46,
//           principalValue: 688.26,
//           closingAmount: 1561.73,
//           earlySettlementFee: 116.46,
//           savedFee: 60.48,
//           savedFeePercent: 34.18,
//           totalOutsandingAmount: 811.1,
//           termCost: 60.48,
//           thirdPartyCost: 0.0,
//           managementFee: 5.56,
//           vatFee: 0.83,
//           principalOutstandingAmount: 744.24,
//         },
//         {
//           installmentValue: 804.72,
//           installmentDate: "2025-03-01",
//           totalRequiredAmount: 811.1,
//           interestValue: 60.48,
//           principalValue: 744.24,
//           closingAmount: 811.1,
//           earlySettlementFee: 60.48,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 5.52,
//           vatFee: 0.86,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 73.17,
//       dailyInterestRatePercentWithoutFee: 0.25,
//       annualInterestRatePercentWithoutFee: 73.17,
//       monthlyInterestRatePercent: 8.13,
//       aprAsPerTenorPercent: 74.89,
//       monthlyInterestRatePercentWithoutFee: 8.13,
//       annualFlatRatePercent: 59.8,
//       monthlyFlatRatePercent: 4.98,
//       aprWithoutFeePerMonthPercent: 6.1,
//       aprPerMonthPercent: 6.1,
//       loanFlatRate: 0.4485,
//       avrageNumberOfenstallment: 9.0,
//     },
//     {
//       transactionId: "d0b4d7e4-bab4-4319-8e7e-6be44ab50954",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7440.83,
//       totalInterestAmount: 2383.33,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 310,
//       instalmentsNumber: 10,
//       dailyInterestRate: 0.0024248085460791824,
//       durationInMonths: 10,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 738.33,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 389.84,
//           principalValue: 348.49,
//           closingAmount: 5447.34,
//           earlySettlementFee: 389.84,
//           savedFee: 1993.46,
//           savedFeePercent: 83.64,
//           totalOutsandingAmount: 6696.72,
//           termCost: 362.67,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 4651.51,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 362.67,
//           principalValue: 375.66,
//           closingAmount: 5065.93,
//           earlySettlementFee: 362.67,
//           savedFee: 1630.79,
//           savedFeePercent: 81.81,
//           totalOutsandingAmount: 5952.64,
//           termCost: 333.38,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 4275.85,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 333.38,
//           principalValue: 404.95,
//           closingAmount: 4655.23,
//           earlySettlementFee: 333.38,
//           savedFee: 1297.41,
//           savedFeePercent: 79.56,
//           totalOutsandingAmount: 5208.56,
//           termCost: 301.81,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 3870.9,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 301.81,
//           principalValue: 436.52,
//           closingAmount: 4212.96,
//           earlySettlementFee: 301.81,
//           savedFee: 995.6,
//           savedFeePercent: 76.74,
//           totalOutsandingAmount: 4464.48,
//           termCost: 267.77,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 3434.38,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 267.77,
//           principalValue: 470.56,
//           closingAmount: 3736.65,
//           earlySettlementFee: 267.77,
//           savedFee: 727.83,
//           savedFeePercent: 73.1,
//           totalOutsandingAmount: 3720.4,
//           termCost: 231.08,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 2963.82,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 231.08,
//           principalValue: 507.25,
//           closingAmount: 3223.65,
//           earlySettlementFee: 231.08,
//           savedFee: 496.75,
//           savedFeePercent: 68.25,
//           totalOutsandingAmount: 2976.32,
//           termCost: 191.53,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 2456.57,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 191.53,
//           principalValue: 546.8,
//           closingAmount: 2671.1,
//           earlySettlementFee: 191.53,
//           savedFee: 305.22,
//           savedFeePercent: 61.44,
//           totalOutsandingAmount: 2232.24,
//           termCost: 148.9,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 1909.77,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 148.9,
//           principalValue: 589.43,
//           closingAmount: 2075.92,
//           earlySettlementFee: 148.9,
//           savedFee: 156.32,
//           savedFeePercent: 51.22,
//           totalOutsandingAmount: 1488.16,
//           termCost: 102.94,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 1320.34,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2025-03-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 102.94,
//           principalValue: 635.39,
//           closingAmount: 1434.78,
//           earlySettlementFee: 102.94,
//           savedFee: 53.38,
//           savedFeePercent: 34.15,
//           totalOutsandingAmount: 744.08,
//           termCost: 53.38,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 684.95,
//         },
//         {
//           installmentValue: 738.33,
//           installmentDate: "2025-04-01",
//           totalRequiredAmount: 744.08,
//           interestValue: 53.38,
//           principalValue: 684.95,
//           closingAmount: 744.08,
//           earlySettlementFee: 53.38,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 5.0,
//           vatFee: 0.75,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 77.97,
//       dailyInterestRatePercentWithoutFee: 0.24,
//       annualInterestRatePercentWithoutFee: 77.97,
//       monthlyInterestRatePercent: 7.8,
//       aprAsPerTenorPercent: 79.68,
//       monthlyInterestRatePercentWithoutFee: 7.8,
//       annualFlatRatePercent: 57.2,
//       monthlyFlatRatePercent: 4.77,
//       aprWithoutFeePerMonthPercent: 6.5,
//       aprPerMonthPercent: 6.5,
//       loanFlatRate: 0.47667,
//       avrageNumberOfenstallment: 10.0,
//     },
//     {
//       transactionId: "c0d57ed3-4e60-4d5a-a241-82e5edab5f61",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7560.0,
//       totalInterestAmount: 2502.5,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 341,
//       instalmentsNumber: 11,
//       dailyInterestRate: 0.002322730889233071,
//       durationInMonths: 11,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 682.05,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 372.85,
//           principalValue: 309.2,
//           closingAmount: 5430.35,
//           earlySettlementFee: 372.85,
//           savedFee: 2129.7,
//           savedFeePercent: 85.1,
//           totalOutsandingAmount: 6872.77,
//           termCost: 349.8,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4690.8,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 349.8,
//           principalValue: 332.25,
//           closingAmount: 5092.87,
//           earlySettlementFee: 349.8,
//           savedFee: 1779.9,
//           savedFeePercent: 83.58,
//           totalOutsandingAmount: 6185.49,
//           termCost: 325.02,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4358.55,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 325.02,
//           principalValue: 357.03,
//           closingAmount: 4730.61,
//           earlySettlementFee: 325.02,
//           savedFee: 1454.88,
//           savedFeePercent: 81.74,
//           totalOutsandingAmount: 5498.21,
//           termCost: 298.4,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 4001.52,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 298.4,
//           principalValue: 383.65,
//           closingAmount: 4341.73,
//           earlySettlementFee: 298.4,
//           savedFee: 1156.48,
//           savedFeePercent: 79.49,
//           totalOutsandingAmount: 4810.93,
//           termCost: 269.79,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 3617.87,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 269.79,
//           principalValue: 412.26,
//           closingAmount: 3924.24,
//           earlySettlementFee: 269.79,
//           savedFee: 886.69,
//           savedFeePercent: 76.67,
//           totalOutsandingAmount: 4123.65,
//           termCost: 239.04,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 3205.61,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 239.04,
//           principalValue: 443.01,
//           closingAmount: 3476.0,
//           earlySettlementFee: 239.04,
//           savedFee: 647.65,
//           savedFeePercent: 73.04,
//           totalOutsandingAmount: 3436.37,
//           termCost: 206.01,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 2762.6,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 206.01,
//           principalValue: 476.04,
//           closingAmount: 2994.73,
//           earlySettlementFee: 206.01,
//           savedFee: 441.64,
//           savedFeePercent: 68.19,
//           totalOutsandingAmount: 2749.09,
//           termCost: 170.51,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 2286.56,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 170.51,
//           principalValue: 511.54,
//           closingAmount: 2477.96,
//           earlySettlementFee: 170.51,
//           savedFee: 271.13,
//           savedFeePercent: 61.39,
//           totalOutsandingAmount: 2061.81,
//           termCost: 132.36,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 1775.02,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2025-03-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 132.36,
//           principalValue: 549.69,
//           closingAmount: 1923.04,
//           earlySettlementFee: 132.36,
//           savedFee: 138.77,
//           savedFeePercent: 51.18,
//           totalOutsandingAmount: 1374.53,
//           termCost: 91.37,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 1225.33,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2025-04-01",
//           totalRequiredAmount: 687.28,
//           interestValue: 91.37,
//           principalValue: 590.68,
//           closingAmount: 1327.13,
//           earlySettlementFee: 91.37,
//           savedFee: 47.4,
//           savedFeePercent: 34.16,
//           totalOutsandingAmount: 687.25,
//           termCost: 47.4,
//           thirdPartyCost: 0.0,
//           managementFee: 4.55,
//           vatFee: 0.68,
//           principalOutstandingAmount: 634.65,
//         },
//         {
//           installmentValue: 682.05,
//           installmentDate: "2025-05-01",
//           totalRequiredAmount: 687.25,
//           interestValue: 47.4,
//           principalValue: 634.65,
//           closingAmount: 687.25,
//           earlySettlementFee: 47.4,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 4.5,
//           vatFee: 0.7,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 82.03,
//       dailyInterestRatePercentWithoutFee: 0.23,
//       annualInterestRatePercentWithoutFee: 82.03,
//       monthlyInterestRatePercent: 7.46,
//       aprAsPerTenorPercent: 83.74,
//       monthlyInterestRatePercentWithoutFee: 7.46,
//       annualFlatRatePercent: 54.6,
//       monthlyFlatRatePercent: 4.55,
//       aprWithoutFeePerMonthPercent: 6.84,
//       aprPerMonthPercent: 6.84,
//       loanFlatRate: 0.5005,
//       avrageNumberOfenstallment: 11.0,
//     },
//     {
//       transactionId: "24fe222d-92d6-4700-b5bf-5edd1a929fc4",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 7657.5,
//       totalInterestAmount: 2600.0,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 372,
//       instalmentsNumber: 12,
//       dailyInterestRate: 0.002219286153342548,
//       durationInMonths: 12,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 633.33,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 355.69,
//           principalValue: 277.64,
//           closingAmount: 5413.19,
//           earlySettlementFee: 355.69,
//           savedFee: 2244.27,
//           savedFeePercent: 86.32,
//           totalOutsandingAmount: 7019.33,
//           termCost: 335.94,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 4722.36,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 335.94,
//           principalValue: 297.39,
//           closingAmount: 5111.0,
//           earlySettlementFee: 335.94,
//           savedFee: 1908.33,
//           savedFeePercent: 85.03,
//           totalOutsandingAmount: 6381.2,
//           termCost: 314.78,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 4424.97,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 314.78,
//           principalValue: 318.55,
//           closingAmount: 4787.65,
//           earlySettlementFee: 314.78,
//           savedFee: 1593.55,
//           savedFeePercent: 83.5,
//           totalOutsandingAmount: 5743.07,
//           termCost: 292.12,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 4106.42,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 292.12,
//           principalValue: 341.21,
//           closingAmount: 4441.64,
//           earlySettlementFee: 292.12,
//           savedFee: 1301.43,
//           savedFeePercent: 81.67,
//           totalOutsandingAmount: 5104.94,
//           termCost: 267.85,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 3765.21,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 267.85,
//           principalValue: 365.48,
//           closingAmount: 4071.36,
//           earlySettlementFee: 267.85,
//           savedFee: 1033.58,
//           savedFeePercent: 79.42,
//           totalOutsandingAmount: 4466.81,
//           termCost: 241.85,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 3399.73,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 241.85,
//           principalValue: 391.48,
//           closingAmount: 3675.08,
//           earlySettlementFee: 241.85,
//           savedFee: 791.73,
//           savedFeePercent: 76.6,
//           totalOutsandingAmount: 3828.68,
//           termCost: 214.0,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 3008.25,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 214.0,
//           principalValue: 419.33,
//           closingAmount: 3250.95,
//           earlySettlementFee: 214.0,
//           savedFee: 577.73,
//           savedFeePercent: 72.97,
//           totalOutsandingAmount: 3190.55,
//           termCost: 184.17,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 2588.92,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 184.17,
//           principalValue: 449.16,
//           closingAmount: 2796.99,
//           earlySettlementFee: 184.17,
//           savedFee: 393.56,
//           savedFeePercent: 68.12,
//           totalOutsandingAmount: 2552.42,
//           termCost: 152.22,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 2139.76,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2025-03-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 152.22,
//           principalValue: 481.11,
//           closingAmount: 2311.08,
//           earlySettlementFee: 152.22,
//           savedFee: 241.34,
//           savedFeePercent: 61.32,
//           totalOutsandingAmount: 1914.29,
//           termCost: 117.99,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 1658.65,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2025-04-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 117.99,
//           principalValue: 515.34,
//           closingAmount: 1790.94,
//           earlySettlementFee: 117.99,
//           savedFee: 123.35,
//           savedFeePercent: 51.11,
//           totalOutsandingAmount: 1276.16,
//           termCost: 81.33,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 1143.31,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2025-05-01",
//           totalRequiredAmount: 638.13,
//           interestValue: 81.33,
//           principalValue: 552.0,
//           closingAmount: 1234.14,
//           earlySettlementFee: 81.33,
//           savedFee: 42.02,
//           savedFeePercent: 34.07,
//           totalOutsandingAmount: 638.03,
//           termCost: 42.02,
//           thirdPartyCost: 0.0,
//           managementFee: 4.17,
//           vatFee: 0.63,
//           principalOutstandingAmount: 591.31,
//         },
//         {
//           installmentValue: 633.33,
//           installmentDate: "2025-06-01",
//           totalRequiredAmount: 638.03,
//           interestValue: 42.02,
//           principalValue: 591.31,
//           closingAmount: 638.03,
//           earlySettlementFee: 42.02,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 4.13,
//           vatFee: 0.57,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 85.37,
//       dailyInterestRatePercentWithoutFee: 0.22,
//       annualInterestRatePercentWithoutFee: 85.37,
//       monthlyInterestRatePercent: 7.11,
//       aprAsPerTenorPercent: 87.07,
//       monthlyInterestRatePercentWithoutFee: 7.11,
//       annualFlatRatePercent: 52.0,
//       monthlyFlatRatePercent: 4.33,
//       aprWithoutFeePerMonthPercent: 7.11,
//       aprPerMonthPercent: 7.11,
//       loanFlatRate: 0.52,
//       avrageNumberOfenstallment: 12.0,
//     },
//     {
//       transactionId: "9f351c4b-d3bc-4982-b983-bbd4788db018",
//       serviceFee: 50.0,
//       serviceFeeTax: 5.5,
//       totalLoanAmount: 8957.5,
//       totalInterestAmount: 3900.0,
//       totalManagementFee: 50.0,
//       totalManagementVatFee: 7.5,
//       principalAmount: 5000.0,
//       duration: 558,
//       instalmentsNumber: 18,
//       dailyInterestRate: 0.0021628332283842866,
//       durationInMonths: 18,
//       schema: "Digital Installment loan Product",
//       installmentSummaryResponse: [
//         {
//           installmentValue: 494.44,
//           installmentDate: "2024-07-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 346.35,
//           principalValue: 148.09,
//           closingAmount: 5403.85,
//           earlySettlementFee: 346.35,
//           savedFee: 3553.57,
//           savedFeePercent: 91.12,
//           totalOutsandingAmount: 8459.78,
//           termCost: 336.09,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 4851.91,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2024-08-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 336.09,
//           principalValue: 158.35,
//           closingAmount: 5242.3,
//           earlySettlementFee: 336.09,
//           savedFee: 3217.48,
//           savedFeePercent: 90.54,
//           totalOutsandingAmount: 7962.14,
//           termCost: 325.12,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 4693.56,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2024-09-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 325.12,
//           principalValue: 169.32,
//           closingAmount: 5069.78,
//           earlySettlementFee: 325.12,
//           savedFee: 2892.36,
//           savedFeePercent: 89.9,
//           totalOutsandingAmount: 7464.5,
//           termCost: 313.39,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 4524.24,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2024-10-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 313.39,
//           principalValue: 181.05,
//           closingAmount: 4885.53,
//           earlySettlementFee: 313.39,
//           savedFee: 2578.97,
//           savedFeePercent: 89.16,
//           totalOutsandingAmount: 6966.86,
//           termCost: 300.85,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 4343.19,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2024-11-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 300.85,
//           principalValue: 193.59,
//           closingAmount: 4688.74,
//           earlySettlementFee: 300.85,
//           savedFee: 2278.12,
//           savedFeePercent: 88.33,
//           totalOutsandingAmount: 6469.22,
//           termCost: 287.44,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 4149.6,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2024-12-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 287.44,
//           principalValue: 207.0,
//           closingAmount: 4478.54,
//           earlySettlementFee: 287.44,
//           savedFee: 1990.68,
//           savedFeePercent: 87.38,
//           totalOutsandingAmount: 5971.58,
//           termCost: 273.1,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 3942.6,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-01-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 273.1,
//           principalValue: 221.34,
//           closingAmount: 4254.0,
//           earlySettlementFee: 273.1,
//           savedFee: 1717.58,
//           savedFeePercent: 86.28,
//           totalOutsandingAmount: 5473.94,
//           termCost: 257.77,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 3721.26,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-02-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 257.77,
//           principalValue: 236.67,
//           closingAmount: 4014.13,
//           earlySettlementFee: 257.77,
//           savedFee: 1459.81,
//           savedFeePercent: 84.99,
//           totalOutsandingAmount: 4976.3,
//           termCost: 241.37,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 3484.59,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-03-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 241.37,
//           principalValue: 253.07,
//           closingAmount: 3757.86,
//           earlySettlementFee: 241.37,
//           savedFee: 1218.44,
//           savedFeePercent: 83.47,
//           totalOutsandingAmount: 4478.66,
//           termCost: 223.84,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 3231.52,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-04-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 223.84,
//           principalValue: 270.6,
//           closingAmount: 3484.06,
//           earlySettlementFee: 223.84,
//           savedFee: 994.6,
//           savedFeePercent: 81.63,
//           totalOutsandingAmount: 3981.02,
//           termCost: 205.1,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 2960.92,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-05-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 205.1,
//           principalValue: 289.34,
//           closingAmount: 3191.52,
//           earlySettlementFee: 205.1,
//           savedFee: 789.5,
//           savedFeePercent: 79.38,
//           totalOutsandingAmount: 3483.38,
//           termCost: 185.06,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 2671.58,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-06-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 185.06,
//           principalValue: 309.38,
//           closingAmount: 2878.94,
//           earlySettlementFee: 185.06,
//           savedFee: 604.44,
//           savedFeePercent: 76.56,
//           totalOutsandingAmount: 2985.74,
//           termCost: 163.63,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 2362.2,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-07-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 163.63,
//           principalValue: 330.81,
//           closingAmount: 2544.93,
//           earlySettlementFee: 163.63,
//           savedFee: 440.81,
//           savedFeePercent: 72.93,
//           totalOutsandingAmount: 2488.1,
//           termCost: 140.71,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 2031.39,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-08-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 140.71,
//           principalValue: 353.73,
//           closingAmount: 2188.0,
//           earlySettlementFee: 140.71,
//           savedFee: 300.1,
//           savedFeePercent: 68.08,
//           totalOutsandingAmount: 1990.46,
//           termCost: 116.21,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 1677.66,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-09-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 116.21,
//           principalValue: 378.23,
//           closingAmount: 1806.57,
//           earlySettlementFee: 116.21,
//           savedFee: 183.89,
//           savedFeePercent: 61.28,
//           totalOutsandingAmount: 1492.82,
//           termCost: 90.01,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 1299.43,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-10-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 90.01,
//           principalValue: 404.43,
//           closingAmount: 1398.94,
//           earlySettlementFee: 90.01,
//           savedFee: 93.88,
//           savedFeePercent: 51.05,
//           totalOutsandingAmount: 995.18,
//           termCost: 62.0,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 895.0,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-11-01",
//           totalRequiredAmount: 497.64,
//           interestValue: 62.0,
//           principalValue: 432.44,
//           closingAmount: 963.3,
//           earlySettlementFee: 62.0,
//           savedFee: 31.88,
//           savedFeePercent: 33.96,
//           totalOutsandingAmount: 497.54,
//           termCost: 31.88,
//           thirdPartyCost: 0.0,
//           managementFee: 2.78,
//           vatFee: 0.42,
//           principalOutstandingAmount: 462.56,
//         },
//         {
//           installmentValue: 494.44,
//           installmentDate: "2025-12-01",
//           totalRequiredAmount: 497.54,
//           interestValue: 31.88,
//           principalValue: 462.56,
//           closingAmount: 497.54,
//           earlySettlementFee: 31.88,
//           savedFee: 0.0,
//           savedFeePercent: 0.0,
//           totalOutsandingAmount: 0.0,
//           termCost: 0.0,
//           thirdPartyCost: 0.0,
//           managementFee: 2.74,
//           vatFee: 0.36,
//           principalOutstandingAmount: 0.0,
//         },
//       ],
//       annualInterestRatePercent: 124.68,
//       dailyInterestRatePercentWithoutFee: 0.22,
//       annualInterestRatePercentWithoutFee: 124.68,
//       monthlyInterestRatePercent: 6.93,
//       aprAsPerTenorPercent: 84.19,
//       monthlyInterestRatePercentWithoutFee: 6.93,
//       annualFlatRatePercent: 52.0,
//       monthlyFlatRatePercent: 4.33,
//       aprWithoutFeePerMonthPercent: 10.39,
//       aprPerMonthPercent: 10.39,
//       loanFlatRate: 0.78,
//       avrageNumberOfenstallment: 18.0,
//     },
//   ],
// };

const LoanConfig = ({ visible, loanType, amount }) => {
  const [loanConfigData, setloanConfigData] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  const [showModalIndex, setShowModalIndex] = useState(null); // State to track the index of the clicked button
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  console.log(visible + "---" + loanType + "---" + amount);

  useEffect(() => {
    if (!visible) return null;
    getLoanConfigInfo();
  }, []);

  const handleViewDetails = async (transactionId, index) => {
    const postData = {
      transactionId: transactionId,
      contractNumber: "test18monthTenure",
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-offers-service/xcbe/api/v1/borrowers/" +
          userID +
          "/loans",
        {
          method: "PuT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      const loanId = await data.json();
      console.log(loanId.loanId);
      navigate("/borrower/" + userID + "/loanNpayment");
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModalIndex(null); // Reset the state to close the modal
  };

  async function getLoanConfigInfo() {
    const postData = {
      loan_type: loanType,
      customer_type: "CONSUMER",
      amount: amount,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-offers-service/xcbe/api/v1/borrowers/" +
          userID +
          "/loans/configurations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        navigate("/user"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      // console.log(json);
      setloanConfigData(json);
    } catch (error) {
      console.error(error);
    }
  }

  if (loanConfigData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <div className="font-semibold mt-5 mb-2">Profile : </div>
      <div className="rounded-xl pt-5 px-5 border border-red-600 w-fit">
        <div>
          <div className="flex gap-10 mb-5 border-b border-gray-300 pb-4">
            <div className="flex gap-5 border-r border-gray-300 pr-10">
              <div>Cash Credit Score : </div>
              <div>{loanConfigData.profile.cashCreditScore}</div>
            </div>
            <div className="flex gap-5">
              <div>Cash TCL : </div>
              <div>{loanConfigData.profile.cashTCL}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-10 mb-5 border-b border-gray-300 pb-4">
            {/* <div className="flex gap-5 border-r border-gray-300 w-[236px] pr-10">
              <div>Cash Seed : </div>
              <div>{loanConfigData.profile.cashSeed ? "True" : "False"}</div>
            </div> */}
            <div className="flex gap-5">
              <div>Net Cash TCL : </div>
              <div>{loanConfigData.profile.netCashTCL}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="font-semibold mb-2 mt-8">Cash Loan Stats : </div>
      <div className="rounded-xl pt-2 pb-2 px-5 border border-red-600 mb-8 relative">
        <div className="flex gap-6 py-3">
          {/* <div className=" pr-6 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-56">Max Loan Duration Months : </div>
              <div>{loanConfigData.cashLoanStats.maxLoanDurationMonths}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-56">Mix Loan Duration Months : </div>
              <div>{loanConfigData.cashLoanStats.minLoanDurationMonths}</div>
            </div>
          </div> */}
          <div className="pr-6 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-44">Max Loan Amount : </div>
              <div>{loanConfigData.cashLoanStats.maxLoanAmount}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Mix Loan Amount : </div>
              <div>{loanConfigData.cashLoanStats.minLoanAmount}</div>
            </div>
          </div>
          <div className=" pr-6 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-52">Max Loan Duration Days : </div>
              <div>{loanConfigData.cashLoanStats.maxLoanDuration}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Min Loan Duration Days : </div>
              <div>{loanConfigData.cashLoanStats.minLoanDuration}</div>
            </div>
          </div>
          <div className="pr-6 py-2 flex flex-col">
            <div className="flex gap-2 py-2">
              <div className="w-52">Max Tenure Months : </div>
              <div>{loanConfigData.cashLoanStats.maxTenure}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Min Tenure Months : </div>
              <div>{loanConfigData.cashLoanStats.minTenure}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start">
        <div className="w-[330px]">
          <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
            <thead>
              <tr className="divide-x divide-gray-200 h-[58px]">
                <th className="py-3.5  text-center ">
                  <div className="w-[320px]">Dynamic Cash Loan Offers</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2 text-gray-500">
                  <div className="w-[320px]">Transaction Id</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Annual Flat Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Annual Interest Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    Annual Interest Rate Percent Without Fee
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">APR As Per Tenure Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">APR Per Month Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    APR Without Fee Per Month Percent
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Avrage Number Of installment</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Daily Interest Rate</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    Daily Interest Rate Percent Without Fee
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Duration</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Duration In Months</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Tenure</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Instalments Summary Response</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Loan Flat Rate</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Monthly Flat Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Monthly Interest Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="  text-gray-500">
                  <div className="w-[320px]">
                    Monthly Interest Rate Percent Without Fee
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Principal Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Schema</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Service Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Service Fee Tax</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Interest Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Loan Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Management Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Management Vat Fee</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[804px]">
          <Slider {...settings}>
            {loanConfigData.dynamicCashLoanOffers.map((ci, index) => {
              return (
                <table
                  key={index}
                  className="divide-y divide-gray-300 border-r border-gray-300 w-full"
                >
                  <thead>
                    <tr className="divide-x divide-gray-200 h-[58px]">
                      <th className="py-3.5 text-center">{index + 1}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          title={ci.transactionId}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.transactionId}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 text-gray-500">
                        {ci.annualFlatRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.annualInterestRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.annualInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.aprAsPerTenorPercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.aprPerMonthPercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.aprWithoutFeePerMonthPercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.avrageNumberOfenstallment}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          title={ci.dailyInterestRate}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.dailyInterestRate}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.dailyInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.duration}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.durationInMonths}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.instalmentsNumber}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          <Link
                            // onClick={() => handleViewDetails(ci, index)}
                            to={
                              "/user/" +
                              userID +
                              "/loan-config/" +
                              index +
                              "/installment"
                            }
                          >
                            EMI Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.loanFlatRate}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.monthlyFlatRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.monthlyInterestRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.monthlyInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.principalAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          title={ci.schema}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.schema}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.serviceFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.serviceFeeTax}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalInterestAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalLoanAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalManagementFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalManagementVatFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer font-medium"
                          onClick={() =>
                            handleViewDetails(ci.transactionId, index)
                          }
                        >
                          Proceed
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default LoanConfig;
