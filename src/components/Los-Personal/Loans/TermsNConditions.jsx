import React from "react";

const TermsNConditions = () => {
  return (
    <div className="flex flex-col justify-center align-middle gap-5 m-10">
      <style>
        {`/* Reset counters for ordered lists */
          ol {
            counter-reset: list-counter;
          }

          /* Top-level list items */
          ol > li {
            counter-increment: list-counter;
            padding-bottom: 10px
          }

          ol > li::before {
            content: counter(list-counter) ". ";
          }

          /* Second-level nested list */
          ol ol {
            counter-reset: sub-counter;
          }

          ol ol > li {
            counter-increment: sub-counter;
            padding-bottom: 5px
          }

          ol ol > li::before {
            content: counter(list-counter) "." counter(sub-counter) " ";
          }

          /* Third-level nested list */
          ol ol ol {
            counter-reset: sub-sub-counter;
          }

          ol ol ol > li {
            counter-increment: sub-sub-counter;
          }

          ol ol ol > li::before {
            content: counter(list-counter) "." counter(sub-counter) "." counter(sub-sub-counter) " ";
          }`}
      </style>
      <div className="text-xl font-semibold text-center">
        LOAN AGREEMENT PART B: GENERAL TERMS AND CONDITIONS
      </div>
      <ol>
        <li className="font-semibold">DEFINITIONS AND INTERPRETATIONS</li>
        <ol className="mb-4">
          <li>“Agreement” has the meaning set out in clause 2 below</li>
          <li>“Borrower” means the person or party named in Section A</li>
          <li>“Employer” means the person or party named in Section A</li>
          <li>
            “Credit Provider” means the person or party named in Section A
          </li>
          <li>‘”Loan” means the Loan made in terms of the Agreement</li>
          <li>“Period” shall be the full calendar month.</li>
          <li>“Section A” means the Loan application form.</li>
          <li>“Section B” means these General Terms and Conditions</li>
          <li>“Section C” means this document's identified section.</li>
          <li>Section “D” means the Key Facts Statement.</li>
        </ol>
        <li className="font-semibold">INTRODUCTION</li>
        <p className="mb-4">
          This Section B together with Section A, Section C, and D shall, upon
          acceptance by the Credit Provider, constitute a Loan agreement.
        </p>
        <li className="font-semibold">
          DECLARATION AND AUTHORISATION BY THE BORROWER{" "}
        </li>
        <ol className="mb-4">
          <li>The Borrower declares, agrees, and confirms that: </li>
          <ol>
            <li>
              all information provided by the Borrower to the Credit Provider in
              connection with the Agreement is true and correct and is
              sufficient for the Credit Provider to conduct a financial needs
              analysis of the Borrower’s financial situation.{" "}
            </li>
            <li>
              the Borrower has been availed and signed the Key Facts Statement
              for Consumer Credit in Section D, setting out the full details of
              everything that the Borrower has to pay if the Loan is granted,
              and this information is the same information that was shown and
              /or discussed with the Borrower before the Borrower signed the
              agreement;
            </li>
            <li>the Borrower understands the terms of this Agreement </li>
            <li>
              the Borrower has read the Agreement prior to signature of the
              Agreement;{" "}
            </li>
            <li>
              where the Agreement provides for repayment instalments to be
              deducted from the Borrower’s salary, the Borrower agrees that the
              Borrower may not unilaterally cancel any Stop Order or consent
              given pursuant to Section C until the Loan has been repaid in
              full; The Borrower will immediately advise the Credit Provider of
              any changes in payment point, employer or Banker.{" "}
            </li>
            <li>
              the Borrower is in a position both financially and legally to
              enter into this Agreement;{" "}
            </li>
            <li>
              the Borrower has disclosed to the Credit Provider all relevant
              facts regarding the Borrowers current and expected future
              financial position and that the Borrower will promptly notify the
              Credit Provider of any changes in the powers of the Borrower or of
              its representatives or agents. Notwithstanding any entry in the
              public registers, such changes will only become operative against
              the Credit Provider after the Credit Provider has been notified
              thereof in writing;{" "}
            </li>
            <li>
              the Credit Provider has made all required statutory disclosures to
              the Borrower in connection with this Agreement as are required
              under the Laws of Zambia.{" "}
            </li>
          </ol>
          <li>
            The Borrower agrees that by signing Sections A and B that the
            Borrower gives the Credit Provider permission to: 
          </li>
          <ol>
            <li>
              contact any thirdparty to check that the information which the
              Borrower has given in Section A is correct.
            </li>
            <li>
              {" "}
              transmit to any credit bureau, data about the Borrower’s
              application for and the granting credit to the Borrower pursuant
              to this Agreement
            </li>
            <li>
              enquire with the credit bureaus to which the Credit Provider
              transmits information to provide a credit profile and possibly a
              credit score on the creditworthiness of the Borrower to third
              parties.{" "}
            </li>
            <li>
              obtain details from any party about the Borrower’s financial
              status and banking details including a credit record and payment
              history;{" "}
            </li>
            <li>
              give information about this Loan to any party, including any
              credit bureaus or credit assessment agency.{" "}
            </li>
            <li>
              assign the Credit Provider’s rights, title and interest herein to
              any third party;{" "}
            </li>
            <li>
              disclose any fraudulent information or activity by the Borrower to
              the Zambia Police or any related security agency;
            </li>
            <li>
              transmit to any credit bureaus notice of any non-compliance by the
              Borrower with the terms and conditions of this Agreement;{" "}
            </li>
            <li>
              receive marketing material and offerings of other products offered
              by the Credit Provider to the Borrower even after this agreement
              has been terminated.{" "}
            </li>
          </ol>
          <li>
            The Borrower agrees that by signing Sections A and B the Borrower
            consents to the Credit Provider contacting the Borrower’s employer
            in order to obtain or confirm any details relating to the Borrower’s
            employment which it deems relevant in protecting its rights in terms
            of this Agreement. Among other things, the Credit Provider may
            confirm the status of the Borrower’s employment, remuneration, date
            on which the Borrower gets paid, and the bank account into which the
            Borrower’s salary is paid.{" "}
          </li>
          <li>
            The Borrower agrees that by signing Sections A and B that the
            Borrower   has   consented   and   does   consent   to   the  
            Credit Provider obtaining any of the Borrower’s personal information
            or other   information   it   may   deem   relevant   including  
            information relating to the Borrower’s financial status, banking
            details, credit record, payment history, residential and work
            address from any third party.
          </li>
          <li>
            Allow the Credit Provider at its discretion, to combine, consolidate
            or merge all or any of the Borrower’s accounts and liabilities
            anywhere whether in or outside the Republic of Zambia and may
            transfer or set off any sums in credit in such accounts in or
            towards satisfaction of any of the Borrower’s liabilities whether
            actual or contingent, primary or collateral notwithstanding that the
            credit balances on such accounts and the liabilities on any other
            accounts may not be expressed in the same currency and the Credit
            provider is hereby authorised to effect any necessary conversions at
            the Zambia National Commercial Bank rate of exchange then prevailing{" "}
          </li>
        </ol>
        <li className="font-semibold">
          APPLICATION,  APPROVAL AND DISBURSEMENT OF LOAN
        </li>
        <ol className="mb-4">
          <li>
            The Borrower applies for a Loan by completing and signing Sections
            A, B C and D of this Agreement. The Borrower’s signature will
            constitute an offer by the Borrower to the Credit Provider to enter
            into such an agreement which may be accepted or declined by the
            Credit Provider at its sole discretion. The Credit Provider is under
            no obligation or duty to approve the Borrower’s application for the
            said Loan and may decline or reject the Borrower’s application for
            any reason whatsoever.
          </li>
          <li>
            Once the Credit Provider has approved the Borrower’s application by
            counter signing this Agreement and disbursing funds to the Borrower
            on the disbursement date, by way of electronic fund transfer into
            the Borrower’s bank account as indicated in Section A or by any
            other means, the Borrower’s offer as set out in Sections A, B C and
            D shall be deemed to be accepted and a Loan Agreement on the terms
            as set out in this Agreement come into force and effect between the
            Borrower and the Credit Provider.{" "}
          </li>
        </ol>
        <li className="font-semibold">COOLING OFF PERIOD</li>
        <ol className="mb-4">
          <li>
            Once the Agreement comes into effect, the Borrower will have 24
            hours within which to terminate the Agreement
          </li>
          <li>
            In the event of the Borrower terminating this Agreement, the
            Borrower shall immediately repay the entire Loan to the Credit
            Provider.{" "}
          </li>
          <li>
            Upon termination of the Agreement as set out in 5.1, the Credit
            Provider shall not refund the Borrower any Adminstrative Fees that
            may have been charged for the loan disbursement.{" "}
          </li>
        </ol>
        <li className="font-semibold">INTEREST RATE </li>
        <ol className="mb-4">
          <li>
            Interest at the rate shown in Section A will accrue on a per period
            basis irrespective of the date of disbursement within the period and
            will be compounded monthly. Each calendar year consists of 12
            (twelve) periods.
          </li>
          <li>
            Any funds disbursedto the Borrower by the Credit Provider will be
            repayable to the Credit Provider together with the fees, charges and
            interest as reflected in Section A of this Agreement.
          </li>
          <li>
            The Credit Provider reserves the right to vary the interest rate and
            other charges and the method of calculation thereof at any time in
            line with market conditions or if (in LHA’s opinion) the Employer
            employee’s account conduct increases LHA’s risk regarding the Loan.
            The Borrower shall be notified of the said changes through the press
            media or through telephone Short Message System (SMS){" "}
          </li>
        </ol>
        <li className="font-semibold">LOAN RESCHEDULING</li>
        <ol className="mb-4">
          <li>
            The Borrower acknowledges that in the event of any instalment, or
            other payment, not being made on its due date, the Credit Provider
            shall be entitled (without prejudice to any other rights which the
            Credit Provider may have) to either demand repayment of the Loan
            (inclusive of capital, interest and other charges then outstanding)
            or to reschedule the Loan repayments, in which event a new schedule
            (Section A) will be deemed to have been executed by the Borrower in
            favour of the Credit Provider.{" "}
          </li>
          <li>
            Without detracting from, and without prejudice to the provisions of
            7.1, the Borrower acknowledges that in the event of the Borrower’s
            loan repayments falling into arrears, the Credit Provider shall be
            entitled (but not obliged) to cancel the existing loan and
            reschedule the Loan repayments due by the Borrower, in which event:{" "}
          </li>
          <ol>
            <li>
              The balance of the existing Loan inclusive of capital, interest
              and any and all other amounts or charges then owed by the Borrower
              to the Credit Provider (“the rescheduled capital”) will be
              calculated by the Credit Provider;{" "}
            </li>
            <li>
              The rescheduled capital will be deemed a further Loan made by the
              Credit Provider to the Borrower;
            </li>
            <li>
              {" "}
              The rescheduled capital together with interest thereon, insurance
              premiums and other charges, will be repayable by the Borrower to
              the Credit Provider by way of monthly instalments over a fixed
              period to be determined by the Credit Provider;{" "}
            </li>
            <li>
              {" "}
              A schedule (Section A) in accordance with the terms of this
              Agreement will be deemed to have been executed by the Borrower;
            </li>
            <li>
              The Borrower shall repay the rescheduled capital together with
              interest, insurance and all other charges in accordance with the
              provisions of the aforesaid schedule and he terms hereof.{" "}
            </li>
          </ol>
        </ol>
        <li className="font-semibold">INSURANCE</li>
        <ol className="mb-4">
          <li>
            The Borrower shall be insured for death and total permanent,
            disability. The effective insurance cover shall be in respect of the
            amount disbursed plus interest accrued less instalments due to a
            point at which the insurance becomes claimable. The insurance
            premium is an upfront payment. This cover is effective for all Loan
            product tenures{" "}
          </li>
          <li>
            The Borrower and anyone appointed to act on behalf of the Borrower
            agrees to submit to the Credit Provider documentation required for
            claim of insurance within 14 working days of the event leading to
            insurance claim.{" "}
          </li>
          <li>
            There shall be no insurance premium refund for loans that run their
            full tenure to maturity.{" "}
          </li>
          <li>
            In the event of default which will depirve the Credit provider of
            the Insurance Cover, the Borrower or the Borrowers estate will be
            liable for the settlement of the outstanding amount..{" "}
          </li>
          <li>
            In the event of the Loan being secured by property, the property
            pledged as security must be insured for ALL risks and the Credit
            Provider’s interest noted in the policy, a copy of which must be
            submitted for the Credit Provider’s records prior to the loan being
            disbursed. In the event that the Borrower fails to insure the
            property after the loan has been disbursed, the Credit Provider
            reserves the right to insure the property with any insurance firm
            and debit the cost to the Borrower’s loan account.{" "}
          </li>
          <li>
            The Borrower shall not commence any legal action against the insurer
            in respect of any such insurance policy where the Credit Provider’s
            interest has been noted without first informing the Credit Provider.
            The Credit Provider may, upon request, be enjoined to any such legal
            action.
          </li>
          <li>
            Notwithstanding any insurance that may be in effect in respect of
            the Loan or the repayment thereof, the Borrower remains liable for
            the repayment of the Loan in terms of this Agreement until its
            actual repayment.{" "}
          </li>
        </ol>
        <li className="font-semibold">REPAYMENT</li>
        <ol className="mb-4">
          <li>
            The Borrower agrees to repay the amount of the Loan, interest and
            other charges on the terms of this Agreement via a monthly
            instalment as shown in Section A.{" "}
          </li>
          <li>
            The first instalment payable under this Agreement shall be due
            within 30 days from the day on which the Loan was advanced to the
            Borrower or any third party nominated by the Borrower. All
            subsequent instalments shall become due on the first day of every
            subsequent month.
          </li>
          <li>
            Without prejudice to the provisions of Clauses 9.1 and 9.2 the
            Credit Provider may at its sole discretion collect each instalment
            due under this Agreement on the Borrowers salary day ("Collection
            Day") or at any time when funds are available in the Borrower’s bank
            account provided always that such collection dates fall on or after
            the due date of any such instalment. The Borrower acknowledges that
            any such collection by the Credit Provider does not constitute a
            waiver of its rights to enforce payment of any instalment under the
            provisions of Clauses 10.1 and 10.2 and is an indulgence granted to
            the Borrower by the Credit Provider.{" "}
          </li>
        </ol>
        <li className="font-semibold">COLLECTION FROM EMPLOYER</li>
        <ol className="mb-4">
          <li>
            By signing the Salary Deduction Consent as set out in Section C of
            this Agreement, the Borrower has authorised the Credit Provider to
            satisfy the Borrower’s obligations by way of deductions directly
            from the Borrower’s salary. The Borrower acknowledges that the
            Credit Provider is under no obligation to seek payment solely by way
            of deductions from the Borrower’s salary and that it has a right at
            any time to call for payment by other methods including without
            limitation by way of making a charge against the Borrower’s bank
            account or directly from the Borrower.{" "}
          </li>
          <li>
            The Borrower remains fully liable and responsible for payment of all
            amounts due and payable under this Agreement notwithstanding any
            failure by the Credit Provider or any other person to effect payment
            thereof by way of a deduction from the Borrower’s salary.{" "}
          </li>
          <li>
            The Borrower will immediately notify the Credit Provider if the
            Borrower changes employer, as indicated in Section A.{" "}
          </li>
          <li>
            The Credit Provider may deduct all amounts outstanding from the
            Borrower’s employment benefits at termination resulting from, but
            not limited to, desertion, early retirement, normal retirement,
            dismissal or medical reasons. Such benefits aor any final monies
            outstanding to the Borrower as agreed by the employer. Should the
            terminal benefits not be enough to pay off the loan, the Customer
            will be expcted to pay the balance.{" "}
          </li>
          <li>
            The Borrower agrees that should the Employer deduct funds from the
            Borrower’s Salary for purposes of the loan repayment to the Credit
            Provider but that such funds are not remitted to the Credit
            Provider, the Credit Provider will not consider such funds as having
            been paid by either the Borrower or the Employer even if such
            deductions reflect on the Borrower’s pay slip or any other document
            used by the Employer as proof of such deductions having been made.
            The Borrower agrees not to claim for refunds for and that the Credit
            Provider is not obliged to refund the Borrower such funds deducted
            by the Employer but not remitted to the Credit Provider. The
            Borrower agrees that the Credit Provider will only refund the
            Borrower such funds when the Employer remits the funds to the Credit
            Provider and that the Borrower will present to the Credit Provider
            other documentation or information necessary for the processing of
            the refund by the Credit Provider. The Borrower agrees that in an
            event that the Employer has deducted but not remitted monies to the
            Credit Provider, the Borrower’s refund will only be effected once
            monies have been received by the Credit Provider.{" "}
          </li>
        </ol>
        <li className="font-semibold">REPLACEMENT LOAN</li>
        <ol className="mb-4">
          <li>
            {" "}
            If the Borrower applies for a replacement Loan and the Credit
            Provider approves this application then the settlement value of the
            existing Loan shall be calculated by taking the outstanding Loan
            balance as at the beginning of the current period plus the daily
            interest from the beginning of the current period to the date of
            settlement.{" "}
          </li>
          <li>
            This new Loan balance shall be added to the additional capital
            disbursed which in total shall then constitute the new replacement
            Loan.{" "}
          </li>
        </ol>
        <li className="font-semibold">EVENTS OF DEFAULT:</li>
        <p className="mb-2">
          If any of the following events occur (the "Events of Default")
          individually and/or collectively, the Credit Provider shall, at its
          sole discretion, have the right, without prejudice to any other rights
          which may be available to Credit Provider to immediately cancel any
          Credit Facility/ies enjoyed by the Borrower, thereby making all
          amounts outstanding immediately due and payable, and thereafter claim
          immediate payment of all such amounts to the Credit Provider.{" "}
        </p>
        <p className="mb-2">Should the Borrower or its principals on the Borrowers behalf; </p>
        <ol className="mb-4">
          <li>
            Breach any other terms and conditions of this Agreement, or any
            other documentation relating hereto; or
          </li>
          <li>
            Commit an act of insolvency or suffer any default judgement against
            the Borrower to remain unsatisfied or not set aside for more than 14
            days, or be liquidated, wound up or placed under judicial
            management, or receivership, whether provisionally or finally, or,
            being a natural person, die or be declared insolvent,whether
            provisionally or finally; or{" "}
          </li>
          <li>
            Have made any materially incorrect or untrue statement or
            representation or omitted to disclose any material information
            relating to the loan facility, the Collateral, the Financial or
            other affairs of the Borrower or any Surety (if any) or Co-principal
            Debtor, whether intentionally or in error; or{" "}
          </li>
          <li>
            Fail to remedy a breach brought to the attention of the Borrower
            within the 14 days of being notified; or Default in the punctual
            payment of any amount falling due and payable under the loan
            agreement or any other documentation imposing an obligation on the
            Borrower to make payment to the Credit Provider or breach any other
            terms and conditions of this Agreement, or any other documentation
            relating hereto; or{" "}
          </li>
          <li>
            Experience any change in respect of the Borrower's position,
            financially or otherwise which may affect the Borrower's ability to
            comply with the Borrower’s obligations in respect of the loan
            facility or which constitutes a material adverse change in the
            financial or business standing of the Borrower; or{" "}
          </li>
          <li>
            Default under any material contract or agreement, with any other
            party, whether or not for borrowed money, howsoever the default may
            arise;{" "}
          </li>
          <li>
            If a salary backed loan, failing to notify the Credit Provider of
            changes in employment or salary paypoint. 
          </li>
        </ol>
        <li className="font-semibold">JURISDICTION</li>
        <p className="mb-4">
          This Agreement is governed by the laws of Zambia and the Borrower
          agrees that the courts of Zambia have exclusive jurisdiction to hear
          or deal with any dispute that arises in connection with this
          Agreement.
        </p>
        <li className="font-semibold">WHOLE AGREEMENT</li>
        <ol>
          <li>
            The Agreement sets out the entire agreement between the Borrower and
            the Credit Provider concerning the Loan and supersedes any
            representations, warranties, course of dealing or agreements
            (written or oral) previously made between the borrower and the
            Credit Provider.
          </li>
          <li>
            The Borrower confirms and acknowledges that in entering this
            Agreement the Borrower has not relied on any representation or
            statement other than those set out in this Agreement.{" "}
          </li>
        </ol>
      </ol>
      <div className="text-xl font-semibold text-center">
        SECTION C: PAYROLL INSTRUCTION
      </div>
      <p>
        In pursuance of the conditions on which the Loan, as reflected in
        Section A, was granted, I hereby irrevocably instruct the payroll
        department of my employer at the date of signing this Agreement, to
        deduct the instalments as reflected in Section A of this Agreement from
        my remuneration until the contractual amount has been repaid in full.
        The instalment amount may be varied at the request of the Credit
        Provider in the event of a general increase or decrease in the rates
        applicable to the Loan, or where the instalments are rescheduled as a
        result of default or other arrangements. A variation as aforementioned
        will result in the total contractual amount being adjusted accordingly.{" "}
      </p>
      <p>
        I acknowledge that the Loan would not have been granted to me had my
        employer not concluded an agreement with the Credit Provider in terms
        whereof my employer is contractually bound to make the aforementioned
        deductions. Having regard to this I further acknowledge that the
        deductions made in accordance with this payroll instruction may only be
        discontinued when I leave the employment as indicated in Section A or
        once the Loan has been repaid in full or where the Credit Provider in
        writing consents to the discontinuation thereof. Should my employment be
        terminated before the Loan has been repaid in full I hereby authorise my
        employer to deduct the then outstanding balance of the Loan from all
        amounts that become payable to me as a result of the termination of my
        employment.{" "}
      </p>
      <p>Signed at ________________________ on this ____ day of ______20___</p>
      <div>Full Name of Borrower:</div>
      <div>______________________________________</div>
      <div>Terms and Conditions </div>
    </div>
  );
};

export default TermsNConditions;
