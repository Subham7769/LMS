import React, { useEffect } from "react";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import convertToReadableString from "../../../utils/convertToReadableString";
import { convertDate } from "../../../utils/convertDate";
import formatNumber from "../../../utils/formatNumber";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOutrightSettlement } from "../../../redux/Slices/personalLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";

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

const OutrightSettlementPrint = () => {
  const dispatch = useDispatch();
  const { loanApplicationId, userId } = useParams();
  const { outrightSettlement, loading } = useSelector(
    (state) => state.personalLoans
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(getOutrightSettlement({ loanId: loanApplicationId, uid: userId }));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 2000);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
    // dispatch, loanApplicationId, userId,
  }, [location.pathname]);

  if (
    loading ||
    (outrightSettlement && Object.keys(outrightSettlement).length === 0)
  ) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  const transformedLoanStatementTransactions =
    outrightSettlement.loanStatementTransactions.map((lsTransaction) => {
      return {
        ...lsTransaction,
        descriptionOfTransaction: convertToTitleCase(
          lsTransaction.descriptionOfTransaction
        ),
        transactionDate: convertDate(lsTransaction.transactionDate),
        debits: formatNumber(lsTransaction.debits),
        credits: formatNumber(lsTransaction.credits),
        loanBalance: formatNumber(lsTransaction.loanBalance),
      };
    });

  const transFormendOutrightSettlementDetails =
    outrightSettlement.outrightSettlementDetails.map((osDetails) => {
      return {
        ...osDetails,
        date: convertDate(osDetails.date),
        amount: formatNumber(osDetails.amount),
      };
    });

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        {/* Header with Logo and Title */}
        <div className="flex w-full items-center relative">
          <div className="absolute left-0 top-0">
            <img src={longHornLogo} className="w-32" />
          </div>
          <div className="font-semibold text-center flex-1">
            Loan Outright Setlement Quote
          </div>
        </div>
        {/* Table Wrapper for Scroll on Screen */}
        <div className="overflow-x-auto mb-5 no-scroll w-[99%] text-center">
          <table className="min-w-full table-auto print-table mb-5">
            <tr className="">
              <td className="border border-gray-300 px-2 py-1">Customer Id</td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.customerId}
              </td>
              <td className="border border-gray-300 px-2 py-1">Loan Id</td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.loanId}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Statement Value Date
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(outrightSettlement.statementValueDate)}
              </td>
            </tr>
          </table>
          {/* Borrower Information */}
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5">
            <tr className="border border-gray-300">
              <td
                colSpan={7}
                className="border border-gray-300 bg-red-500 text-center font-bold py-1"
              >
                BORROWER INFORMATION
              </td>
            </tr>

            <tr className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">
                Customer Name
              </td>
              <td className="border border-gray-300 px-2 py-1">Employee Id</td>
              <td className="border border-gray-300 px-2 py-1">NRC Id</td>
              <td className="border border-gray-300 px-2 py-1">Employer</td>
              <td className="border border-gray-300 px-2 py-1">Sector</td>
              <td className="border border-gray-300 px-2 py-1">Loan Status</td>
              <td className="border border-gray-300 px-2 py-1">Gender</td>
            </tr>

            <tr className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.customerName}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.employeeId}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.nrcId}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.employer}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.sector}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.loanStatus}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.gender}
              </td>
            </tr>
          </table>
          {/* Loan Informantion */}
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5">
            <tr className="border border-gray-300">
              <td
                colSpan={7}
                className="border border-gray-300 bg-red-500 text-center font-bold py-1"
              >
                LOAN INFORMATION
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">
                Loan Issue Date
              </td>
              <td className="border border-gray-300 px-2 py-1">
                First Payment Date
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Loan Maturity Date
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Loan Tenor (Months)
              </td>
              <td className="border border-gray-300 px-2 py-1">Loan Amount</td>
              <td className="border border-gray-300 px-2 py-1">
                Monthly Instalment
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Interest Rate
              </td>
            </tr>
            <tr className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(outrightSettlement.loanIssueDate)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(outrightSettlement.firstPaymentDate)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(outrightSettlement.loanMaturityDate)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.loanTenor}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {formatNumber(outrightSettlement.loanAmount)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {formatNumber(outrightSettlement.monthlyInstalment)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {outrightSettlement.interestRate}
              </td>
            </tr>
          </table>
          {/* Transactions */}
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5">
            <thead>
              <tr className="bg-background-light-secondary">
                <th
                  className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold"
                  colSpan={6}
                >
                  DETAILS OF CUSTOMER LOAN STATEMENT
                </th>
              </tr>
              <tr className="bg-background-light-secondary">
                {Object.keys(transformedLoanStatementTransactions[0]).map(
                  (key) => (
                    <th
                      key={key}
                      className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold"
                    >
                      {convertToReadableString(key)}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {transformedLoanStatementTransactions.map(
                (lsTransaction, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {Object.values(lsTransaction).map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>

          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5">
            <thead>
              <tr className="bg-background-light-secondary">
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  0-29 Days
                </th>
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  30-59 Days
                </th>
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  60-89 Days
                </th>
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  Above 89 Days
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(outrightSettlement.days0to29)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(outrightSettlement.days30to59)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(outrightSettlement.days60to89)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(outrightSettlement.above89Days)}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table">
            <thead>
              <tr className="bg-background-light-secondary">
                <th
                  className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold"
                  colSpan={3}
                >
                  OUTRIGHT SETTMENT DETAILS
                </th>
              </tr>
            </thead>
            <tbody>
              {transFormendOutrightSettlementDetails.map(
                (lsTransaction, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    {Object.values(lsTransaction).map((value, valueIndex) => (
                      <td
                        key={valueIndex}
                        className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="font-semibold">
        Note: This quote is only valid for 7 days after which it expires and the
        borower has to apply for a new.
      </div>
    </>
  );
};

export default OutrightSettlementPrint;
