import React, { useEffect } from "react";
import longHornLogo from "../../../assets/image/longhorn-logo.png";
import convertToReadableString from "../../../utils/convertToReadableString";
import { convertDate } from "../../../utils/convertDate";
import formatNumber from "../../../utils/formatNumber";
import { useLocation } from "react-router-dom";

const loanStatement = {
  customerId: "CUST001",
  loanId: "LOAN001",
  statementValueDate: "01-01-2021",
  customerName: "John Doe",
  employeeId: "EMP001",
  nrcId: "NRC001",
  employer: "Longhorn",
  sector: "IT",
  loanStatus: "Performing",
  gender: "Female",
  loanIssueDate: "01-01-2021",
  firstPaymentDate: "01-02-2021",
  loanMaturityDate: "01-02-2021",
  loanTenor: "36",
  loanAmount: 1000000,
  monthlyInstalment: 2717.47,
  interestRate: "48%",
  loanStatementTransactions: [
    {
      transactionDate: "01-01-2021",
      descriptionOfTransaction: "LOAN DISBURSED",
      debits: 0.0,
      credits: 0.0,
      loanBalance: 45000.0,
      paymentStatus: "Full Payment",
    },
    {
      transactionDate: "01-02-2021",
      descriptionOfTransaction: "LOAN DISBURSED",
      debits: 579.1,
      credits: 0.0,
      loanBalance: 45000.0,
      paymentStatus: "",
    },
    {
      transactionDate: "01-03-2021",
      descriptionOfTransaction: "LOAN DISBURSED",
      debits: 1800,
      credits: 0.0,
      loanBalance: 45000.0,
      paymentStatus: "",
    },
  ],
  "0-29Days": 0.0,
  "30-59Days": 0.0,
  "60-89Days": 0.0,
  above89Days: 0.0,
  outrightSettlementBalance: 42537.44,
  totalExpectedToDate: 10869.64,
  totalPaidToDate: 10869.64,
  arrears: 0.0,
  advancePayment: "-",
};

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

const LoanStatementPrint = () => {
  const location = useLocation();
  useEffect(() => {
    // dispatch(getLoanAgreement({ loanId: loanApplicationId, uid: userId }));

    if (!location.pathname.includes("loan-origination-system")) {
      const timeoutId = setTimeout(() => {
        window.print();
      }, 1500);

      // Cleanup to avoid potential memory leaks
      return () => clearTimeout(timeoutId);
    }
    // dispatch, loanApplicationId, userId,
  }, [location.pathname]);
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
                <th className="border border-border-gray-primary px-4 py-2 text-center text-gray-700 font-semibold">
                  Outright Settlement Balance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement["0-29Days"])}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement["30-59Days"])}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement["60-89Days"])}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.above89Days)}
                </td>
                <td className="border border-border-gray-primary px-4 py-2 text-gray-600 text-center">
                  {formatNumber(loanStatement.outrightSettlementBalance)}
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
