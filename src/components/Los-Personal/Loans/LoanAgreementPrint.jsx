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
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
      <div className="h-4 bg-background-light-primary rounded"></div>
    </div>
  );
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
    keyFactStatements = {},
    upfrontFees = {},
    termsAndConditions = {},
    repayment = {},
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
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              PERSONAL DETAILS
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(personalDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(personalDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;{personalDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              LOAN DETAILS
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(loanDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(loanDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;
                    {typeof loanDetails[key] === "number"
                      ? loanDetails[key].toFixed(2) // Round off numbers to 2 decimal places
                      : loanDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              LOAN OFFICER DETAILS
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(loanOfficerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(loanOfficerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;{loanOfficerDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              CUSTOMER
            </div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(customerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(customerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;{customerDetails[key]}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              CONTACT DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(contactDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(contactDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;{contactDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              EMPLOYMENT DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(employmentDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(employmentDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                  >
                    &nbsp;{employmentDetails[key]}
                  </div>
                ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              NEXT OF KIN DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] mb-5">
              <div className="border-r border-border-gray-primary">
                {Object.keys(nextOfKinDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
              </div>
              <div>
                {Object.keys(nextOfKinDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pr-1 pt-1 text-right"
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
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500 mb-24">
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
