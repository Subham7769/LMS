import React, { useEffect } from "react";
import convertToReadableString from "../../../utils/convertToReadableString";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getLoanAgreement } from "../../../redux/Slices/personalLoansSlice";
import TermsNConditions from "./TermsNConditions";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import KeyStatements from "./KeyStatements";
import formatNumber from "../../../utils/formatNumber";

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
  const location = useLocation();

  useEffect(() => {
    dispatch(getLoanAgreement({ loanId: loanApplicationId, uid: userId }));

    // if (!location.pathname.includes("loan-origination-system")) {
    //   const timeoutId = setTimeout(() => {
    //     window.print();
    //   }, 1500);

    //   // Cleanup to avoid potential memory leaks
    //   return () => clearTimeout(timeoutId);
    // }
  }, [dispatch, loanApplicationId, userId, location.pathname]);

  const {
    personalDetails = {},
    contactDetails = {},
    bankDetails = {},
    loanDetails = {},
    employmentDetails = {},
    nextOfKinDetails = {},
    loanOfficerDetails = {},
    customerDetails = {},
    reasonForBorrowing = "",
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
      <div className={"flex flex-col justify-center align-middle gap-2"}>
        <div className="flex w-full items-center relative">
          <div className="absolute left-0 top-0">
            <img src={longHornLogo} className="w-32" />
          </div>
          <div className="font-semibold text-center flex-1">
            <div className="text-center mb-1">LOAN AGREEMENT - PART A</div>
            <div className="text-xs">
              Borrower ID: {personalDetails?.customerId} &nbsp;&nbsp; Loan ID:{" "}
              {loanDetails?.loanId}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 border-2 border-gray-500 text-xs">
          <div className="border-r border-gray-500">
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              PERSONAL DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(personalDetails)
                  .filter((key) => key !== "customerId")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pl-1 pt-1"
                    >
                      {convertToReadableString(key)}
                    </div>
                  ))}
              </div>
              <div>
                {Object.keys(personalDetails)
                  .filter((key) => key !== "customerId")
                  .map((key) => (
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
              BANK DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(bankDetails)
                  .filter((key) => key !== "swift" && key !== "tpin")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pl-1 pt-1"
                    >
                      {convertToReadableString(key)}
                    </div>
                  ))}
              </div>
              <div>
                {Object.keys(bankDetails)
                  .filter((key) => key !== "swift" && key !== "tpin")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                    >
                      &nbsp;{bankDetails[key]}
                    </div>
                  ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              REASON FOR BORROWING
            </div>
            <div className="border-b border-border-gray-primary pl-1">
              &nbsp;{reasonForBorrowing}
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              LOAN DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(loanDetails)
                  .filter((key) => key !== "loanId")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pl-1 pt-1"
                    >
                      {convertToReadableString(key)}
                    </div>
                  ))}
              </div>
              <div>
                {Object.keys(loanDetails)
                  .filter((key) => key !== "loanId")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                    >
                      &nbsp;
                      {typeof loanDetails[key] === "number"
                        ? formatNumber(loanDetails[key]) // Round off numbers to 2 decimal places
                        : loanDetails[key]}
                    </div>
                  ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              LOAN OFFICER <br></br> DETAILS
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(loanOfficerDetails)
                  .filter((key) => key !== "agentName" && key !== "agentCode")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pl-1 pt-1"
                    >
                      {convertToReadableString(key)}
                    </div>
                  ))}
              </div>
              <div>
                {Object.keys(loanOfficerDetails)
                  .filter((key) => key !== "agentName" && key !== "agentCode")
                  .map((key) => (
                    <div
                      key={key}
                      className="border-b border-border-gray-primary pr-1 pt-1 text-right"
                    >
                      &nbsp;{loanOfficerDetails[key]}
                    </div>
                  ))}
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500"></div>
            <div className="grid grid-cols-2 mb-5">
              <div className="border-r border-border-gray-primary">
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  Agent's Full Name
                </div>
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  Agent Code
                </div>
              </div>
              <div>
                <div className="border-b border-border-gray-primary pr-1 pt-1 text-right">
                  &nbsp;{loanOfficerDetails?.agentName}
                </div>
                <div className="border-b border-border-gray-primary pr-1 pt-1 text-right">
                  &nbsp;{loanOfficerDetails?.agentCode}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              CONTACT DETAILS
            </div>
            <div className="grid grid-cols-[45%,55%] ">
              <div className="border-r border-border-gray-primary">
                {Object.keys(contactDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
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
            <div className="grid grid-cols-[45%,55%]">
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
            <div className="grid grid-cols-[45%,55%]">
              <div className="border-r border-border-gray-primary">
                {Object.keys(nextOfKinDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
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
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
              </div>
            </div>
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500">
              LOAN AGREEMENT AND DISBURSEMENT ACKNOWLEDGEMENT BY BORROWER
            </div>
            <div className="grid grid-cols-2">
              <div className="border-r border-border-gray-primary">
                {Object.keys(customerDetails).map((key) => (
                  <div
                    key={key}
                    className="border-b border-border-gray-primary pl-1 pt-1"
                  >
                    {convertToReadableString(key)}
                  </div>
                ))}
                <div className="border-b border-white pl-1 pt-1">Signature</div>
                <div className="border-b border-border-gray-primary pl-1 pt-1">
                  &nbsp;
                </div>
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
            <div className="font-semibold text-center border-b border-border-gray-primary pt-2 bg-red-500"></div>
            <div className="text-gray-400 pt-5 px-2 font-light">
              Official Stamp
            </div>
          </div>
        </div>
        <div className="flex w-full items-center relative text-[8px]">
          <div className="absolute right-0 top-0 text-right">
            <a>e-mail: inform@longhorn-associates.com</a> <br />
            <a href="www.longhorn-associate.com" target="blank">
              www.longhorn-associate.com
            </a>
          </div>
          <div className="text-center flex-1">
            Longhorn Associates Ltd, Ground Floor, Garden View Office park,{" "}
            <br />
            Plot 1146/15, Lagos Road, P.O. Box 50655, Lusaka, Phone: 211252540
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
