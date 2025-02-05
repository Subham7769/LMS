import React, { useEffect } from "react";
import convertToReadableString from "../../../utils/convertToReadableString";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getLoanAgreement } from "../../../redux/Slices/personalLoansSlice";
import TermsNConditions from "./TermsNConditions";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import KeyStatements from "./KeyStatements";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

const keyFactStatements = {
  amountOfLoan: 80000,
  durationOfLoanAgreement: 10,
  amountReceived: 69069,
  interest: 13385.99,
  otherFeesAndCharges: 14931,
  annualPercentageRate: "35%",
  totalCostOfCredit: 28281.99,
  dateFirstPaymentDue: "28 Jan 2025",
  numberOfPayment: 10,
  paymentFrequency: "Once per month",
  amountPerPayment: 9938.6,
};

const upfrontFees = {
  arrangementFee: 3600,
  collateralAppraisal: null,
  creditLifeInsurance: 3200,
  documentationFee: null,
  drawdownFee: null,
  managementFee: null,
  processingFee: 2000,
  administrationFeePerMonth: 600,
};

const termsAndConditions = {
  lateFees: null,
  defaultInterest: null,
  mandatorySavings: null,
  collateral: null,
  variableInterestRate: "",
  other: "",
};

const repayment = {
  repaymentSchedule: [
    {
      paymentDueDate: "2025-02-28T09:34:51.778Z",
      paymentAmount: 9938.6,
      principal: 7005.27,
      interestAndOtherFees: 2933.33,
      endingBalance: 72994.73,
    },
    {
      paymentDueDate: "2025-03-28T09:34:51.778Z",
      paymentAmount: 9938.6,
      principal: 7005.27,
      interestAndOtherFees: 2933.33,
      endingBalance: 72994.73,
    },
    {
      paymentDueDate: "2025-04-28T09:34:51.778Z",
      paymentAmount: 9938.6,
      principal: 7005.27,
      interestAndOtherFees: 2933.33,
      endingBalance: 72994.73,
    },
  ],
  totalPaymentAmount: 99385.99,
  totalInterestAndOtherFees: 19650.65
};

const LoanAgreementPrint = () => {
  const dispatch = useDispatch();
  const { loanApplicationId, userId } = useParams();
  const { loanAgreementData, loading } = useSelector(
    (state) => state.personalLoans
  );

  useEffect(() => {
    dispatch(getLoanAgreement({ loanId: loanApplicationId, uid: userId }));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 1500);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [dispatch, loanApplicationId, userId, location.pathname]);

  const {
    personalDetails = {},
    contactDetails = {},
    loanDetails = {},
    employmentDetails = {},
    nextOfKinDetails = {},
    loanOfficerDetails = {},
    customerDetails = {},
  } = loanAgreementData || {};

  if (loading) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  return (
    <>
      <div className={"flex flex-col justify-center align-middle gap-5 m-10"}>
        <div className="flex w-full items-center">
          <div className="">
            <img src={longHornLogo} className="w-32" />
          </div>
          <div className="text-xl font-semibold text-center flex-1">
            LOAN AGREEMENT - PART A
          </div>
        </div>
        <div className="grid grid-cols-2 border-2 border-gray-500 text-sm">
          <div className="border-r border-gray-500">
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              PERSONAL DETAILS
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(personalDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(personalDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;{personalDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              LOAN DETAILS
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(loanDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(loanDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;
                    {typeof loanDetails[key] === "number"
                      ? loanDetails[key].toFixed(2) // Round off numbers to 2 decimal places
                      : loanDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              LOAN OFFICER DETAILS
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(loanOfficerDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(loanOfficerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;{loanOfficerDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              CUSTOMER
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(customerDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(customerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;{customerDetails[key]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              CONTACT DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(contactDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(contactDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;{contactDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              EMPLOYMENT DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(employmentDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(employmentDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;{employmentDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500">
              NEXT OF KIN DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] mb-5">
              <div className="border-r border-gray-300">
                {Object.keys(nextOfKinDetails).map((key) => (
                  <div key={key} className="border-b border-gray-300 pl-1 pt-1">
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(nextOfKinDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-gray-300 pr-1 pt-1 text-right"
                  >
                    &nbsp;{nextOfKinDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-gray-400 pt-10 px-2 font-light">
              Official Stamp
            </div>
          </div>
          <div className="col-span-2">
            <div className="font-semibold text-center border-b border-gray-300 pt-2 bg-red-500 mb-24">
              CUSTOMER SIGNATURE
            </div>
          </div>
        </div>
      </div>
      {/* <TermsNConditions /> */}
      <KeyStatements
        keyFactStatements={keyFactStatements}
        upfrontFees={upfrontFees}
        termsAndConditions={termsAndConditions}
        repayment={repayment}
      />
    </>
  );
};

export default LoanAgreementPrint;
