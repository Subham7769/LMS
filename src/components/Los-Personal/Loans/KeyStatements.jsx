import React from "react";
import formatNumber from "../../../utils/formatNumber";
import { convertDate } from "../../../utils/convertDate";

const KeyStatements = ({
  keyFactStatements,
  upfrontFees,
  termsAndConditions,
  repayment,
}) => {
  return (
    <div className="flex flex-col justify-center align-middle gap-5 m-10">
      <div className="text-xl font-semibold text-center">
        LOAN AGREEMENT PART D: KEY FACTS STATEMENT FOR CONSUMER CREDIT
      </div>
      <div className="italic text-red-500 font-semibold">
        <div>*Review carefully before agreeing to a loan.* </div>
        <div>
          *You have the right to get a copy of the full loan agreement.*
        </div>
      </div>

      {/* Section 1 Key Term */}
      <table className="w-full border border-gray-300 border-collapse">
        <tr className="border border-gray-300">
          <td
            colSpan={6}
            className="border border-gray-300 p-2 text-center font-semibold"
          >
            SECTION I: KEY TERMS
          </td>
        </tr>
        <tr className="border border-gray-300 text-center font-semibold">
          <td colSpan={2} className="border border-gray-300 p-2">
            LOAN SUMMARY
          </td>
          <td colSpan={2} className="border border-gray-300 p-2">
            COST OF CREDIT
          </td>
          <td colSpan={2} className="border border-gray-300 p-2">
            REPAYMENT SCHEDULE
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td rowSpan={2} className="border border-gray-300 p-2">
            <div className="font-semibold">1. Amount of Loan</div>
            <div className="italic text-sm">Amount you are borrowing</div>
          </td>
          <td
            rowSpan={2}
            className="border border-gray-300 p-2 font-semibold text-center"
          >
            <div>(ZMW)</div>
            <div>{formatNumber(keyFactStatements?.amountOfLoan)}</div>
          </td>
          <td rowSpan={2} className="border border-gray-300 p-2">
            <div className="font-semibold">4. Interest</div>
            <div className="italic text-sm">
              Interest you will be charged on the loan
            </div>
          </td>
          <td
            rowSpan={2}
            className="border border-gray-300 p-2 font-semibold text-center"
          >
            <div>(ZMW)</div>
            <div>{formatNumber(keyFactStatements.interest)}</div>
          </td>
          <td className="border border-gray-300 p-2 font-semibold">
            8. Date First Payment Due
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {keyFactStatements?.dateFirstPaymentDue}
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2 font-semibold">
            9. Number of Payments
          </td>
          <td className="border border-gray-300 p-2 text-center">
            <div>(MONTHS)</div>
            <div>{keyFactStatements?.numberOfPayment}</div>
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2 font-semibold">
            2. Duration of Loan Agreement
          </td>
          <td className="border border-gray-300 p-2 text-center">
            <div>(MONTHS)</div>
            <div>{keyFactStatements?.durationOfLoanAgreement}</div>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="font-semibold">5. Other Fees and Charges</div>
            <div className="italic text-sm">See details in Section IV</div>
          </td>
          <td className="border border-gray-300 p-2 font-semibold text-center">
            <div>(ZMW)</div>
            <div>{formatNumber(keyFactStatements?.otherFeesAndCharges)}</div>
          </td>
          <td className="border border-gray-300 p-2 font-semibold">
            10. Payment Frequency
          </td>
          <td className="border border-gray-300 p-2 font-semibold text-center">
            {keyFactStatements?.paymentFrequency}
          </td>
        </tr>
        <tr className="align-top">
          <td className="border border-gray-300 p-2">
            <div className="font-semibold">3. Amount Received</div>
            <div className="italic text-sm my-2">
              Amount you actually receive from the lender
            </div>
          </td>
          <td className="border border-gray-300 p-2 font-semibold text-center">
            <div>(ZMW)</div>
            <div className="my-2">
              {formatNumber(keyFactStatements?.amountReceived)}
            </div>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="font-semibold">6. Annual Percentage Rate</div>
            <div className="italic text-sm my-2">
              Total Cost of Credit as a comparable annual percentage
            </div>
            <div className="italic text-sm text-center">
              {keyFactStatements?.annualPercentageRate}
            </div>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="font-semibold">7. Total Cost of Credit</div>
            <div className="italic text-sm my-2">
              All costs for the loan, including interest and fees
            </div>
            <div className="font-semibold text-center">(ZMW)</div>
            <div className="font-semibold text-center">
              {formatNumber(keyFactStatements?.totalCostOfCredit)}
            </div>
          </td>
          <td className="border border-gray-300 p-2">
            <div className="font-semibold">11. Amount PER Payment</div>
            <div className="italic text-sm my-2">
              Includes capital, interest, and recurring fees{" "}
            </div>
          </td>
          <td className="border border-gray-300 p-2 font-semibold text-center">
            <div>(ZMW)</div>
            <div className="my-2">
              {formatNumber(keyFactStatements?.amountPerPayment)}
            </div>
          </td>
        </tr>
      </table>
      <div className="grid grid-cols-8">
        <div className="col-span-2 border border-gray-300 p-2 grid gap-y-2">
          <div className="font-semibold">1. Amount of Loan</div>
          <div className="italic text-sm">Amount you are borrowing</div>
          <div className="font-semibold">(ZMW)</div>
          <div className="font-semibold">
            {formatNumber(keyFactStatements?.amountOfLoan)}
          </div>
        </div>
        <div className="grid justify-center items-center text-5xl">+</div>
        <div className="col-span-2 border border-gray-300 p-2 grid gap-y-2">
          <div className="font-semibold">7. Total Cost of Credit</div>
          <div className="italic text-sm">
            All costs for the loan, including interest and fees
          </div>
          <div className="font-semibold">(ZMW)</div>
          <div className="font-semibold">
            {formatNumber(keyFactStatements?.totalCostOfCredit)}
          </div>
        </div>
        <div className="grid justify-center items-center text-5xl">=</div>
        <div className="col-span-2 border border-gray-300 p-2 grid gap-y-2">
          <div className="font-semibold">11. TOTAL AMOUNT YOU PAY</div>
          <div className="italic text-sm">
            Total amount you pay after making all payments
          </div>
          <div className="font-semibold">(ZMW)</div>
          <div className="font-semibold">
            {formatNumber(
              keyFactStatements?.amountOfLoan +
                keyFactStatements?.totalCostOfCredit
            )}
          </div>
        </div>
      </div>

      {/* Section 2 Risks */}
      <div className="mt-5 font-semibold text-center border border-gray-300 p-1">
        SECTION II: RISKS TO YOU
      </div>
      <div className="italic text-red-500 font-semibold">
        <div>
          * Late or missing payments may be reported to a credit reference
          bureau and may severely affect your financial situation, collateral,
          and ability to reborrow. *
        </div>
        <div>
          * Your interest rate will change based on changes in the Bank of
          Zambia’s Policy Rate. This change will affect the duration of your
          loan and your repayment amount. *
        </div>
      </div>

      {/* Section 3 Your rights */}
      <div className="mt-5 font-semibold text-center border border-gray-300 p-1">
        SECTION III: YOUR RIGHTS AND OBLIGATIONS
      </div>
      <ul className="list-disc">
        <li>
          <span className="font-semibold">Any questions or complaints? </span>
          Call +260 211 252 540, email infor@longhorn-associates.com, or write
          to P.O. Box 50655, Lusaka to contact us regarding your question or
          complaint.
        </li>
        <li>
          <span className="font-semibold">
            Unsatisfied with our response to your question or complaint?
          </span>{" "}
          Contact the Bank of Zambia for help at [TELEPHONE] or [EMAIL], write
          to [ADDRESS], or visit www.boz.zm
        </li>
        <li>
          <span className="font-semibold">
            Want to pay off your loan early?
          </span>{" "}
          You can do so without any penalties or fees. For more information
          please call +260 211 252 540
        </li>
        <li className="font-semibold">
          You are required to make payments on your loan according to your loan
          agreement and to notify us of any important changes in your situation.
        </li>
      </ul>

      {/* Section 4 Upfront fees */}
      <table className="mt-5 w-full border border-gray-300 border-collapse">
        <tr className="border border-gray-300">
          <td
            colSpan={6}
            className="border border-gray-300 p-2 text-center font-semibold"
          >
            SECTION IV: UPFRONT AND RECURRING FEES
          </td>
        </tr>
        <tr className="border border-gray-300 text-center font-semibold">
          <td colSpan={2} className="border border-gray-300 p-2">
            UPFRONT FEES
          </td>
          <td colSpan={2} className="border border-gray-300 p-2">
            UPFRONT FEES
          </td>
          <td colSpan={2} className="border border-gray-300 p-2">
            RECURRING FEES
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2">Arrangement fee (ZMW)</td>
          <td className="border border-gray-300 p-2 text-center">
            {upfrontFees.arrangementFee
              ? formatNumber(upfrontFees.arrangementFee)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">
            Collateral appraisal (ZMW)
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {upfrontFees.collateralAppraisal
              ? formatNumber(upfrontFees.collateralAppraisal)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">
            Credit life insurance (ZMW) per application
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {formatNumber(upfrontFees.creditLifeInsurance)}
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2">
            Documentation fee (ZMW)
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {upfrontFees?.documentationFee
              ? formatNumber(upfrontFees?.documentationFee)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">Drawdown fee (ZMW)</td>
          <td className="border border-gray-300 p-2 text-center">
            {upfrontFees.drawdownFee
              ? formatNumber(upfrontFees.drawdownFee)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">Management fee (ZMW)</td>
          <td className="border border-gray-300 p-2 text-center">
            {upfrontFees.managementFee
              ? formatNumber(upfrontFees.managementFee)
              : "N/A"}
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2">
            <div>Other (list all):</div>
            <div>Processing Fee (ZMW)</div>
            <div>CRB Fee (ZMW)</div>
          </td>
          <td className="border border-gray-300 p-2 text-center font-semibold">
            <div>{formatNumber(upfrontFees?.processingFee)}</div>
            <div>{upfrontFees?.crbfee}</div>
          </td>
          <td></td>
          <td
            colSpan={2}
            className="border border-gray-300 p-2 font-semibold text-center"
          >
            TOTAL UPFRONT AND RECURRING FEES AND CHARGES (EXCLUDING INTEREST)
          </td>
          <td className="border border-gray-300 p-2 font-semibold">
            <div>(ZMW)</div>
            <div>{formatNumber(keyFactStatements?.totalUpfrontFees)}</div>
          </td>
        </tr>
      </table>

      {/* Section 5 Terms & Conditions */}
      <table className="mt-5 w-full border border-gray-300 border-collapse">
        <tr className="border border-gray-300">
          <td
            colSpan={6}
            className="border border-gray-300 p-2 text-center font-semibold"
          >
            SECTION V: IMPORTANT TERMS AND CONDITIONS TO CONSIDER
          </td>
        </tr>
        <tr className="border border-gray-300 text-center font-semibold">
          <td colSpan={2} className="border border-gray-300 p-2">
            LATE PAYMENT PENALTIES
          </td>
          <td colSpan={2} className="border border-gray-300 p-2">
            TERMS AND CONDITIONS
          </td>
          <td colSpan={2} className="border border-gray-300 p-2">
            TERMS AND CONDITIONS
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2">
            {" "}
            Late fees if payment is more than [ ] days late:{" "}
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {termsAndConditions?.lateFees
              ? formatNumber(termsAndConditions?.lateFees)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">
            Cash deposit / mandatory savings:
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {termsAndConditions?.mandatorySavings
              ? formatNumber(termsAndConditions?.mandatorySavings)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">
            Variable interest rate applies
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {termsAndConditions?.variableInterestRate}
          </td>
        </tr>
        <tr className="border border-gray-300">
          <td className="border border-gray-300 p-2">
            Default interest if payment is more than [ ] days late
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {termsAndConditions?.defaultInterest
              ? formatNumber(termsAndConditions?.defaultInterest)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">
            COLLATERAL:{" "}
            <span className="italic">
              You are committing the following as collateral:
            </span>
          </td>
          <td className="border border-gray-300 p-2 text-center">
            {termsAndConditions.collateral
              ? formatNumber(termsAndConditions.collateral)
              : "N/A"}
          </td>
          <td className="border border-gray-300 p-2">Other:______</td>
          <td className="border border-gray-300 p-2 text-center">
            {termsAndConditions.other
              ? formatNumber(termsAndConditions.other)
              : "N/A"}
          </td>
        </tr>
      </table>

      {/* Section 6 Repayment Schedule */}
      <table className="mt-5 w-full border border-gray-300 border-collapse">
        <tr className="border border-gray-300">
          <td
            colSpan={6}
            className="border border-gray-300 p-2 text-center font-semibold"
          >
            SECTION VI: REPAYMENT SCHEDULE
          </td>
        </tr>
        <tr className="border border-gray-300 text-center font-semibold">
          <td className="border border-gray-300 p-2">Payment Number</td>
          <td className="border border-gray-300 p-2">Payment Due Date</td>
          <td className="border border-gray-300 p-2">Payment Amount</td>
          <td className="border border-gray-300 p-2">Principal</td>
          <td className="border border-gray-300 p-2">
            Interest and Other Fees and Charges
          </td>
          <td className="border border-gray-300 p-2">Ending Balance</td>
        </tr>
        <tr></tr>
        {repayment?.repaymentSchedule.map((repayment, index) => (
          <tr key={index + 1} className="border border-gray-300 text-center">
            <td className="border border-gray-300 p-2">{index + 1}</td>
            <td className="border border-gray-300 p-2">
              {convertDate(repayment?.paymentDueDate)}
            </td>
            <td className="border border-gray-300 p-2">
              {formatNumber(repayment?.paymentAmount)}
            </td>
            <td className="border border-gray-300 p-2">
              {formatNumber(repayment?.principal)}
            </td>
            <td className="border border-gray-300 p-2">
              {formatNumber(repayment?.interestAndOtherFees)}
            </td>
            <td className="border border-gray-300 p-2">
              {formatNumber(repayment?.endingBalance)}
            </td>
          </tr>
        ))}
        <tr className="border border-gray-300 text-center ">
          <td className="border border-gray-300 p-2 font-semibold">TOTAL</td>
          <td className="border border-gray-300 p-2"></td>
          <td className="border border-gray-300 p-2">
            {formatNumber(repayment?.totalPaymentAmount)}
          </td>
          <td className="border border-gray-300 p-2"></td>
          <td className="border border-gray-300 p-2">
            {formatNumber(repayment?.totalInterestAndOtherFees)}
          </td>
          <td className="border border-gray-300 p-2"></td>
        </tr>
      </table>

      <div className="italic text-red-500 font-semibold">
        <div>
          * This information is not final until signed by all parties, and does
          not replace the loan agreement.*
        </div>
        <div>
          * This information is valid for full duration of the loan (until it is
          fully paid). *
        </div>
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div>CERTIFIED CORRECT:</div>
        <div>
          I ACKNOWLEDGE RECEIPT OF THIS STATEMENT PRIOR TO SIGNING THE LOAN
          AGREEMENT:
        </div>
        <div>
          I ACKNOWLEDGE RECEIPT OF THIS STATEMENT PRIOR TO SIGNING THE
          GUARANTEE:
        </div>
        <div className="border-t border-gray-500">
          Credit provider representative
        </div>
        <div className="border-t border-gray-500">Borrower</div>
        <div className="border-t border-gray-500">
          Guarantor (if applicable)
        </div>
        <div className="border border-gray-500 p-2 font-semibold">
          Name of Borrower:
        </div>
        <div className="border border-gray-500 p-2 font-semibold">
          Application No:{" "}
        </div>
        <div className="border border-gray-500 p-2 font-semibold">
          Date prepared:
        </div>
      </div>
    </div>
  );
};

export default KeyStatements;
