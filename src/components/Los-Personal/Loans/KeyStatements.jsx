import React from "react";
import formatNumber from "../../../utils/formatNumber";

const KeyStatements = ({ loanDetails }) => {
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
      <table>
        <tr>
          <td colSpan={6}>SECTION I: KEY TERMS </td>
        </tr>
        <tr>
          <td colSpan={2}>LOAN SUMMARY</td>
          <td colSpan={2}>COST OF CREDIT</td>
          <td colSpan={2}>REPAYMENT SCHEDULE</td>
        </tr>
        <tr>
          <td rowSpan={2}>
            <div className="font-semibold">1. Amount of Loan</div>
            <div className="italic">Amount you are borrowing</div>
          </td>
          <td rowSpan={2} className="font-semibold">
            <div>(ZMW)</div>
            <div>{formatNumber(loanDetails.loanAmount)}</div>
          </td>
          <td rowSpan={2}>
            <div className="font-semibold">4. Interest</div>
            <div className="italic">
              Interest you will be charged on the loan
            </div>
          </td>
          <td rowSpan={2} className="font-semibold">
            <div>(ZMW)</div>
            <div>{formatNumber(loanDetails.loanAmount)}</div>
          </td>
          <td className="font-semibold">8. Date First Payment Due</td>
          <td>{} 28 Jan 2025</td>
        </tr>
        <tr>
          <td className="font-semibold">9. Number of Payments</td>
          <td>
            <div>(MONTHS)</div>
            <div>10</div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default KeyStatements;
