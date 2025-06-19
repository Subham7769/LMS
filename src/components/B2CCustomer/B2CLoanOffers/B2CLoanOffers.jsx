import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchPersonalBorrowerById,
  getB2CLoanOffers,
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
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import B2CAccordion from "../B2CAccordion/B2CAccordion";

const B2CLoanOffers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    loanProductOptions,
    loanConfigData,
    loanOfferFields,
    loading,
  } = useSelector((state) => state.B2CLoans);

  const { userData } = useSelector((state) => state.auth);
  const uid = loanOfferFields?.uid;
  const loanProductId = loanOfferFields?.loanProductId;

  useEffect(() => {
    const fetchOffers = async () => {
      console.log("Effect triggered: UID and loanProductId", { uid, loanProductId });

      if (uid && loanProductId) {
        try {
          dispatch(fetchPersonalBorrowerById(uid));
          const response = await dispatch(getB2CLoanOffers({ uid, loanProductId })).unwrap();
          if (response.message) {
            navigate("/customer/loan-finalization");
          }
        } catch (error) {
          console.error("Error fetching loan offers:", error);
        }
      }
    };

    fetchOffers(); // Call the async function
  }, [uid, loanProductId, dispatch, navigate]);

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

  const ShimmerTable = () => (
    <div className="grid grid-cols-4 gap-4 animate-pulse">
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
      <div className="h-4 bg-gray-200 rounded"></div>
    </div>
  );

  // 🚨 Guard if UID or loanProductId is missing
  if (!uid || !loanProductId) {
    return (
      <ContainerTile className="p-6">
        <div className="text-center text-gray-600 text-sm">
          Waiting for loan offer info... Please complete previous steps.
        </div>
      </ContainerTile>
    );
  }

  return (
    <div className="flex justify-center w-full p-5">
      {loanConfigData?.message ? (
        <ContainerTile loading={loading} className="p-5">
          <div className="text-center">{loanConfigData.message}</div>
        </ContainerTile>
      ) : Object.keys(loanConfigData || {}).length > 0 ? (
        <div className="flex flex-col gap-5 mt-2 w-full">
          <div className="text-xl font-semibold">Your Loan Offer</div>
          <div>
            Let's review the details of your{" "}
            {
              loanProductOptions.find(
                (item) => item.value === loanProductId
              )?.label
            }{" "}
            offer
          </div>

          <div className="text-right xl:-mt-14 text-xs">
            <div className="text-xs">Applied Schema</div>
            <div className="text-sm">
              {loanConfigData?.dynamicCashLoanOffers?.[0]?.schema}
            </div>
          </div>

          {loanConfigData?.dynamicCashLoanOffers?.map((offer, index) => (
            <B2CAccordion
              key={index}
              data={offer}
              index={index}
              renderExpandedContent={() => (
                <div className="flex flex-col gap-5">
                  <div className="grid md:grid-cols-3 gap-3">
                    {/* Card 1: Loan Range */}
                    <CardInfo
                      cardTitle="Available Loan Range"
                      cardIcon={CogIcon}
                      colorText="text-green-700"
                      numberBG="bg-green-700/20"
                      cardNumber="1"
                      loading={loading}
                    >
                      <div className="text-[14px]">
                        <div>Loan Range:</div>
                        <div className="font-semibold text-lg mb-2">
                          {formatNumber(
                            loanConfigData?.cashLoanStats?.minLoanProductAmount.toFixed(2)
                          )}{" "}
                          -{" "}
                          {formatNumber(
                            loanConfigData?.cashLoanStats?.maxLoanAmountForBorrower.toFixed(2)
                          )}
                        </div>
                        <div>Duration Range:</div>
                        <div className="font-semibold text-lg">
                          {loanConfigData?.cashLoanStats?.minEligibleDuration} -{" "}
                          {loanConfigData?.cashLoanStats?.maxEligibleDuration} days
                        </div>
                        <div className="mb-2">
                          ({loanConfigData?.cashLoanStats?.minEligibleDurationMonths} -{" "}
                          {loanConfigData?.cashLoanStats?.maxLoanDurationMonths} months)
                        </div>
                        <div>Average Installments:</div>
                        <div className="font-semibold text-lg">
                          {loanConfigData?.dynamicCashLoanOffers[0]?.instalmentsNumber.toFixed(2)}
                        </div>
                      </div>
                    </CardInfo>

                    {/* Card 2: Interest Rates */}
                    <CardInfo
                      cardTitle="Interest Rates"
                      cardIcon={CalculatorIcon}
                      colorText="text-violet-700"
                      numberBG="bg-violet-700/20"
                      cardNumber="2"
                      loading={loading}
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
                        <div className="border-t pt-2">
                          <div>Monthly Flat Rate</div>
                          <div className="flex gap-x-2 items-baseline">
                            <div className="font-semibold text-lg">
                              {offer?.monthlyFlatRatePercent}%
                            </div>
                            <div>
                              (daily: {offer?.loanFlatRate}%, annual:{" "}
                              {offer?.annualFlatRatePercent}%)
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardInfo>

                    {/* Card 3: Financial Breakdown */}
                    <CardInfo
                      cardTitle="Financial Breakdown"
                      cardIcon={CurrencyDollarIcon}
                      colorText="text-yellow-700"
                      numberBG="bg-yellow-700/20"
                      cardNumber="3"
                      loading={loading}
                    >
                      <div className="text-[14px]">
                        <div>Principal Amount:</div>
                        <div className="flex gap-x-2 items-baseline mb-2">
                          <div className="font-semibold text-lg">
                            {formatNumber(offer?.principalAmount.toFixed(2))}
                          </div>
                          <div>(Disbursed: {formatNumber(offer?.disbursedAmount.toFixed(2))})</div>
                        </div>

                        <div>Total Interest:</div>
                        <div className="font-semibold text-lg mb-2">
                          {formatNumber(offer?.totalInterestAmount.toFixed(2))}
                        </div>

                        <div>Total Admin Fee:</div>
                        <div className="flex items-baseline gap-x-2 mb-2">
                          <div className="font-semibold text-lg">
                            {offer?.serviceFee.toFixed(2)}
                          </div>
                          <div>(Tax: {offer?.serviceFeeTax.toFixed(2)})</div>
                        </div>

                        <div>Application Fee:</div>
                        <div className="flex items-baseline gap-x-2 mb-2">
                          <div className="font-semibold text-lg">
                            {offer?.applicationFees.toFixed(2)}
                          </div>
                          <div>(CRB: {offer?.crbCharge.toFixed(2)})</div>
                        </div>

                        <div>Insurance Fee:</div>
                        <div className="flex items-baseline gap-x-2 mb-2">
                          <div className="font-semibold text-lg">
                            {offer?.insuranceFee.toFixed(2)}
                          </div>
                          <div>(Levy: {offer?.insuranceLevy.toFixed(2)})</div>
                        </div>

                        <div className="border-t pt-2 text-sky-700">
                          <div className="font-semibold">Total Loan Amount:</div>
                          <div className="font-bold text-lg">
                            {formatNumber(offer?.totalLoanAmount.toFixed(2))}
                          </div>
                        </div>
                      </div>
                    </CardInfo>
                  </div>

                  <div className="text-center text-xs mt-4">
                    <div>Loan Summary ID: {offer?.transactionId}</div>
                    <div>Loan Application ID: {loanConfigData?.loanApplicationId}</div>
                  </div>
                </div>
              )}
            />
          ))}
        </div>
      ) : (
        <ShimmerTable />
      )}
    </div>
  );
};

export default B2CLoanOffers;
