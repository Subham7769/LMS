import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../Common/Button/Button";
import {
  fetchBorrowerById,
  fetchLoanProductData,
  getLoanOffers,
  handleProceed,
  resetLoanOfferFields,
  updateLoanOfferFields,
} from "../../../redux/Slices/B2CLoansSlice";
import {
  UserIcon,
  CogIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import formatNumber from "../../../utils/formatNumber";
import CardInfo from "../../Common/CardInfo/CardInfo";

import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import B2CAccordion from "../B2CAccordion/B2CAccordion";

const B2CLoanOffers = () => {
  const dispatch = useDispatch();

  const {
    loanProductOptions,
    loanConfigData,
    loanOfferFields,
    loading,
  } = useSelector((state) => state.B2CPersonalLoans);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const userName = userData?.username || "";

  useEffect(() => {
    dispatch(fetchLoanProductData());
    if (loanOfferFields?.uid) {
      // dispatch(fetchBorrowerById(sanitizeUid(loanOfferFields?.uid)));
    }
    return () => {
      dispatch(clearValidationError());
      dispatch(resetLoanOfferFields());
    };
  }, [dispatch]);


  const InfoRow = ({ label, value }) => (
    <div className="mb-1.5">
      <div>{label}:</div>
      <div className="font-semibold text-lg">{value}</div>
    </div>
  );

  const InfoRow2 = ({ label, value }) => (
    <div className="mb-2">
      <div>{label}:</div>
      <div className="font-semibold text-lg">{value} %</div>
    </div>
  );

  return (
    <div className={"flex justify-center w-full p-5"} >
      {loanConfigData?.message ? (
        <ContainerTile loading={loading} className={"p-5"}>
          <div className="text-center">{loanConfigData.message}</div>
        </ContainerTile>
      ) : Object.keys(loanConfigData || {}).length > 0 ? (
        <div className="flex flex-col gap-5 mt-2 w-full ">
          <div className="">
            <div className="text-xl font-semibold">Your Loan Offer</div>
            <div>
              Let's review the details of your{" "}
              {
                loanProductOptions.find(
                  (item) => item.value == loanOfferFields.loanProductId
                )?.label
              }{" "}
              offer
            </div>
          </div>
          <div className="text-right xl:-mt-14">
            <div className=" text-xs">Applied Schema</div>
            <div className="text-sm">
              {loanConfigData?.dynamicCashLoanOffers[0]?.schema}
            </div>
          </div>
          {loanConfigData?.dynamicCashLoanOffers?.map((offer, index) => (
            <React.Fragment key={index}>
              <B2CAccordion
                data={offer}
                index={index}
                renderExpandedContent={() => (
                  <div className="flex flex-col gap-5">
                    <div className="grid md:grid-cols-3 gap-3">
                      {/* Available Loan Range */}
                      <CardInfo
                        cardTitle="Available Loan Range"
                        cardIcon={CogIcon}
                        colorText={"text-green-700"}
                        colorBG={"bg-white dark:bg-gray-800"}
                        numberBG={"bg-green-700/20"}
                        cardNumber="1"
                        loading={loading}
                        className={
                          "border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 transition"
                        }
                      >
                        <div className="text-[14px]">
                          <div className="">Loan Range:</div>
                          <div className="font-semibold text-lg mb-2">
                            {formatNumber(
                              loanConfigData?.cashLoanStats?.minLoanProductAmount.toFixed(
                                2
                              )
                            )}{" "}
                            -{" "}
                            {formatNumber(
                              loanConfigData?.cashLoanStats?.maxLoanAmountForBorrower.toFixed(
                                2
                              )
                            )}
                          </div>
                          <div className="">Duration Range:</div>
                          <div className="font-semibold text-lg">
                            {loanConfigData?.cashLoanStats?.minEligibleDuration} -{" "}
                            {loanConfigData?.cashLoanStats?.maxEligibleDuration} days
                          </div>
                          <div className=" mb-2">
                            ({loanConfigData?.cashLoanStats?.minEligibleDurationMonths} -{" "}
                            {loanConfigData?.cashLoanStats?.maxLoanDurationMonths} months)
                          </div>
                          <div className="">Average Installments: </div>
                          <div className="font-semibold text-lg">
                            {loanConfigData?.dynamicCashLoanOffers[0]?.instalmentsNumber.toFixed(
                              2
                            )}
                          </div>
                        </div>
                      </CardInfo>

                      {/* Interest Rates */}
                      <CardInfo
                        cardTitle="Interest Rates"
                        cardIcon={CalculatorIcon}
                        colorText={"text-violet-700"}
                        colorBG={"bg-white dark:bg-gray-800"}
                        numberBG={"bg-violet-700/20"}
                        cardNumber="2"
                        loading={loading}
                        className={
                          "border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 transition"
                        }
                      >
                        <div className="text-[14px]">
                          <InfoRow2
                            label="Annual Rate (APR)"
                            value={offer?.annualInterestRatePercentWithoutFee}
                          />
                          <InfoRow2
                            label="Monthly Rate"
                            value={offer?.aprPerMonthPercent}
                          />
                          <InfoRow2
                            label="Daily Rate"
                            value={offer?.dailyInterestRatePercentWithoutFee}
                          />
                          <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                            <div className="">Monthly Flat Rate</div>
                            <div className="flex gap-x-2 items-baseline">
                              <div className="font-semibold text-lg">
                                {offer?.monthlyFlatRatePercent}%
                              </div>
                              <div className="">
                                (daily: {offer?.loanFlatRate}%, annual:{" "}
                                {offer?.annualFlatRatePercent}%)
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardInfo>

                      {/* Financial Breakdown */}
                      <CardInfo
                        cardTitle="Financial Breakdown"
                        cardIcon={CalculatorIcon}
                        colorText={"text-yellow-700"}
                        colorBG={"bg-white dark:bg-gray-800"}
                        numberBG={"bg-yellow-700/20"}
                        cardNumber="3"
                        loading={loading}
                        className={
                          "border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 transition"
                        }
                      >
                        <div className="text-[14px]">
                          <div className="">Principal Amount:</div>
                          <div className="flex items-baseline gap-x-2">
                            <div className="font-semibold text-lg mb-2">
                              {formatNumber(offer?.principalAmount.toFixed(2))}
                            </div>
                            <div className="">
                              (Disbursed Amt:{" "}
                              {formatNumber(offer?.disbursedAmount.toFixed(2))})
                            </div>
                          </div>
                          <div className="">Total Interest:</div>
                          <div className="font-semibold text-lg mb-2">
                            {formatNumber(offer?.totalInterestAmount.toFixed(2))}
                          </div>
                          <div className="">Total Admin Fee (or Service Fee):</div>
                          <div className="flex items-baseline gap-x-2">
                            <div className="font-semibold text-lg mb-2">
                              {offer?.serviceFee.toFixed(2)}
                            </div>
                            <div className="">
                              (tax: {offer?.serviceFeeTax.toFixed(2)})
                            </div>
                          </div>
                          <div className="">Application Fee:</div>
                          <div className="flex items-baseline gap-x-2">
                            <div className="font-semibold text-lg mb-2">
                              {offer?.applicationFees.toFixed(2)}
                            </div>
                            <div className="">(CRB: {offer?.crbCharge.toFixed(2)})</div>
                          </div>
                          <div className="">Insurance Fee:</div>
                          <div className="flex items-baseline gap-x-2">
                            <div className="font-semibold text-lg mb-2">
                              {offer?.insuranceFee.toFixed(2)}
                            </div>
                            <div className="">
                              (Levy: {offer?.insuranceLevy.toFixed(2)})
                            </div>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-600  pt-2 text-sky-700">
                            <div className="font-semibold">Total Loan Amount:</div>
                            <div className="font-bold text-lg">
                              {formatNumber(offer?.totalLoanAmount.toFixed(2))}
                            </div>
                          </div>
                        </div>
                      </CardInfo>
                    </div>
                    <div className="text-center text-xs">
                      <div>Loan Summary Id : {offer?.transactionId}</div>
                      <div>
                        Loan Application Id : {loanConfigData?.loanApplicationId}
                      </div>
                    </div>
                  </div>
                )}
              />

            </React.Fragment>
          ))}
        </div>
      ) : (
        ""
      )
      }
    </div >
  );
};

export default B2CLoanOffers;
