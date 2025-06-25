import React, { useState } from "react";
import formatNumber from "../../../utils/formatNumber";
import Button from "../../Common/Button/Button";
import { SunIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import {
  handleProceed,
  OfferSelected,
  getFullLoanDetails,
  updatePersonalBorrowerField,
} from "../../../redux/Slices/B2CLoansSlice";
import { useDispatch, useSelector } from "react-redux";

const B2CAccordion = ({
  icon: Icon,
  renderExpandedContent,
  error = false,
  isOpen = false,
  data,
  index,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);
  const navigate = useNavigate(); // Adding useNavigate for navigation
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { loanConfigData, personalBorrower } = useSelector((state) => state.B2CLoans);
  const { cachedBorrowerId } = personalBorrower.cachedDetails

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const SubmitProceed = async (transactionId, index) => {
    if (pathname.includes("/loan-offers")) {
      navigate(`/customer/loan-finalization`);
    } else if (pathname.includes("/final-offers")) {
      const proceedPayload = {
        transactionId: transactionId,
        loanApplicationId: loanConfigData.loanApplicationId,
        createdBy: "OnlineUser",
      };

      const proceedResponse = await dispatch(handleProceed({ proceedPayload, uid: cachedBorrowerId })).unwrap();
      console.log(proceedResponse)

      if (proceedResponse.loanId) {
        dispatch(updatePersonalBorrowerField({ section: "cachedDetails", field: "cachedLoanId", value: proceedResponse.loanId }));
        await dispatch(OfferSelected({ uid: cachedBorrowerId, loanId: proceedResponse.loanId })).unwrap();
        await dispatch(getFullLoanDetails({ uid: cachedBorrowerId, loanId: proceedResponse.loanId })).unwrap();
        navigate(`/customer/final-loan`);
      }
    }

  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-sm mb-3 p-4`}
    >
      <div className="relative w-full p-4 sm:p-6 border rounded bg-blue-50 dark:bg-blue-900/10">

        {/* Top Badge */}
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-tl-lg rounded-br-lg font-medium">
          Limited Period Offer
          <span className="block text-[10px] text-white/80">Plan prices to increase soon</span>
        </div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pt-6">
          {/* Left: Sun Icon & Company Name */}
          <div className="flex items-center gap-3">
            <SunIcon className="h-6 w-6 text-yellow-600" />
            <div>
              <div className="font-semibold text-base text-slate-800">Loan Company Name</div>
              <div className="text-sm text-slate-500">iProtect Smart</div>
            </div>
          </div>

          {/* Right side: Savings Info */}
          <div className="text-sm text-green-600 font-medium">
            Buy Online & Save <span className="text-lg font-bold">₹13.4K</span>
          </div>

        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 ">
          {/* Loan Amount */}
          <div>
            <div className="text-sm">Total Loan Amount</div>
            <div className="text-lg font-bold text-blue-600">
              ₹ {formatNumber(data?.totalLoanAmount.toFixed(2))}
            </div>
          </div>

          {/* EMI */}
          <div>
            <div className="text-sm">Monthly EMI</div>
            <div className="text-lg font-bold text-green-600 ">
              ₹ {formatNumber(data?.installmentSummaryResponse[0]?.totalRequiredAmount.toFixed(2))}
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="text-sm">Tenure</div>
            <div className="text-lg font-bold text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ">
              {data?.durationInMonths} Months
              <span className="text-xs text-slate-500"> ({data?.duration} Days)</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="text-sm">Interest Rate</div>
            <div className="text-lg font-bold text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ">
              {data?.monthlyInterestRatePercent}% <span className="text-xs text-slate-500">({data?.annualInterestRatePercent}% APR)</span>
            </div>
          </div>

          {/* Button */}
          {(pathname.includes("/loan-offers") || pathname.includes("/final-offers") ) && <div className="flex items-center justify-start md:justify-center">
            <Button
              buttonName={"Proceed"}
              onClick={() => SubmitProceed(data.transactionId, index)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
            />
          </div>}
        </div>

      </div>
      {/* Benefits Section (Optional Tags) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm relative mt-5" >
        <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
          ✅ Pre-approved limit included
        </div>
        <div className="px-3 py-1 border border-slate-300 rounded-full text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ">
          ✔ Flexible Repayment Options
        </div>
        <div className="px-3 py-1 border border-slate-300 rounded-full text-gray-500/90 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 ">
          ✔ No Hidden Charges
        </div>

        {/* View More Toggle */}
        <div className="md:absolute md:bottom-0 md:right-17 p-3">
          <span
            className="text-center text-sm text-blue-500 hover:text-blue-600 cursor-pointer transition "
            onClick={toggleExpand}
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? "View Less" : "View More"}
          </span>
        </div>
      </div>



      {
        isExpanded && (
          <div className="p-3">
            <div className="bg-gray-50 dark:bg-gray-950/[0.15] dark:text-gray-400 p-3 px-0">
              {renderExpandedContent ? renderExpandedContent() : children}
            </div>
          </div>
        )
      }
    </div >
  );
};

export default B2CAccordion;
