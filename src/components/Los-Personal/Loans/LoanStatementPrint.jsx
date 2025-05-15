import React, { useEffect } from "react";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import convertToReadableString from "../../../utils/convertToReadableString";
import { convertDate } from "../../../utils/convertDate";
import formatNumber from "../../../utils/formatNumber";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getLoanStatement } from "../../../redux/Slices/personalLoansSlice";

const ShimmerTable = () => {
  return (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );
};

const LoanStatementPrint = () => {
  const dispatch = useDispatch();
  const { loanApplicationId, userId } = useParams();
  const { loanStatement, loading } = useSelector(
    (state) => state.personalLoans
  );
  const location = useLocation();

  useEffect(() => {
    dispatch(getLoanStatement({ loanId: loanApplicationId, uid: userId }));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 1500);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
    // dispatch, loanApplicationId, userId,
  }, [location.pathname]);

  if (loading || (loanStatement && Object.keys(loanStatement).length === 0)) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  const transformedLoanStatementTransactions =
    loanStatement.loanStatementTransactions.map((lsTransaction) => {
      return {
        ...lsTransaction,
        transactionDate: convertDate(lsTransaction.transactionDate),
        debits: formatNumber(lsTransaction.debits),
        credits: formatNumber(lsTransaction.credits),
        loanBalance: formatNumber(lsTransaction.loanBalance),
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
          <div className="font-semibold text-center flex-1">LOAN STATEMENT</div>
        </div>

        {/* Table Wrapper for Scroll on Screen */}
        <div className="overflow-x-auto mb-5 no-scroll w-[99%] text-center">
          <table className="min-w-full table-auto print-table mb-5">
            <tr className="">
              <td className="border border-gray-300 px-2 py-1">Customer Id</td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.customerId}
              </td>
              <td className="border border-gray-300 px-2 py-1">Loan Id</td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.loanId}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Statement Value Date
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(loanStatement.statementValueDate)}
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
                {loanStatement.customerName}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.employeeId}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.nrcId}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.employer}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.sector}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.loanStatus}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.gender}
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
                {convertDate(loanStatement.loanIssueDate)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(loanStatement.firstPaymentDate)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {convertDate(loanStatement.loanMaturityDate)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.loanTenor}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {formatNumber(loanStatement.loanAmount)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {formatNumber(loanStatement.monthlyInstalment)}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {loanStatement.interestRate}
              </td>
            </tr>
          </table>
          {/* Transactions */}
          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table mb-5">
            <thead>
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
                  {formatNumber(loanStatement.days0to29)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.days30to59)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.days60to89)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.above89Days)}
                </td>
              </tr>
            </tbody>
          </table>

          <table className="min-w-full table-auto border-collapse border border-border-gray-primary print-table">
            <thead>
              <tr className="bg-background-light-secondary">
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  Total Expected to date
                </th>
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  Total Paid to date
                </th>
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  Arrears
                </th>
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  Advance Payment
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.totalExpectedToDate)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.totalPaidToDate)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.arrears)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {loanStatement.advancePayment}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default LoanStatementPrint;
