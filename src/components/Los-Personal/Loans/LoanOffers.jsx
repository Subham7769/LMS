import InstallmentSummery from "./InstallmentSummery";
import React, { useEffect, useState } from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../Common/Button/Button";
import {
  fetchBorrowerById,
  fetchLoanProductData,
  getLoanOffers,
  handleProceed,
  updateLoanOfferFields,
} from "../../../redux/Slices/personalLoansSlice";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputNumber from "../../Common/InputNumber/InputNumber";
import {
  UserIcon,
  CogIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import formatNumber from "../../../utils/formatNumber";

const LoanOffers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallmentData, setSelectedInstallmentData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  const {
    borrowerData,
    loanProductOptions,
    loanConfigData,
    loanOfferFields,
    loading,
    error,
  } = useSelector((state) => state.personalLoans);

  useEffect(() => {
    dispatch(fetchLoanProductData());
  }, [dispatch]);

  const SubmitProceed = async (transactionId, index) => {
    const uid = loanOfferFields.uid;
    const proceedPayload = {
      transactionId: transactionId,
      loanApplicationId: loanConfigData.loanApplicationId,
    };
    await dispatch(handleProceed({ proceedPayload, uid })).unwrap();
    navigate(`/loan/loan-origination-system/personal/loans/approve-loans`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateLoanOfferFields({ name, value }));
  };

  const handleGetOffers = () => {
    dispatch(getLoanOffers(loanOfferFields));
    dispatch(fetchBorrowerById(loanOfferFields?.uid));
  };

  const handleInstallmentModal = (data) => {
    setIsModalOpen(true);
    setSelectedInstallmentData(data); // Set the selected installment data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstallmentData(null); // Clear the data when closing the modal
  };

  const InfoRow = ({ label, value }) => (
    <div className="mb-1.5">
      <div className="text-gray-600">{label}:</div>
      <div className="font-semibold text-lg">{value}</div>
    </div>
  );

  const InfoRow2 = ({ label, value }) => (
    <div className="mb-2">
      <div className="text-gray-500">{label}:</div>
      <div className="font-semibold text-lg">{value} %</div>
    </div>
  );

  return (
    <>
      <ContainerTile className={"mb-5 bg-gray-50"} loading={loading}>
        <div className="grid grid-cols-3 gap-5 items-end">
          <InputSelect
            labelName={"Loan Product"}
            inputName="loanProductId"
            inputOptions={loanProductOptions}
            inputValue={loanOfferFields.loanProductId}
            onChange={handleChange}
          />
          <InputNumber
            labelName={"Borrower"}
            inputName="uid"
            inputValue={loanOfferFields.uid}
            onChange={handleChange}
          />
          <div>
            <Button
              buttonName="Get Offers"
              onClick={handleGetOffers}
              rectangle={true}
            />
          </div>
        </div>
      </ContainerTile>
      {loanConfigData?.message === "No loan offers in cache" ? (
        <ContainerTile loading={loading} className={"bg-gray-50"}>
          <div className="text-center">No loan offers available</div>
        </ContainerTile>
      ) : Object.keys(loanConfigData || {}).length > 0 ? (
        <div className="flex flex-col gap-5 mt-4">
          <div className="text-center">
            <div className="text-xl font-semibold ">Your Loan Offer</div>
            <div className="text-gray-500">
              Let's review the details of your{" "}
              {
                loanProductOptions.find(
                  (item) => item.value == loanOfferFields.loanProductId
                )?.label
              }{" "}
              offer
            </div>
          </div>
          <div className="text-right -mt-14">
            <div className="text-gray-500 text-xs">Applied Schema</div>
            <div className="text-sm">
              {loanConfigData?.dynamicCashLoanOffers[0]?.schema}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <ContainerTile loading={loading} className={"bg-gray-50"}>
              <div className="flex justify-between items-baseline mb-3 text-blue-600">
                <div className="font-semibold text-lg flex gap-x-2 items-center">
                  <UserIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />{" "}
                  Meet Our Borrower
                </div>
                <div className="bg-blue-100 rounded-full h-7 w-7 text-center pt-0.5">
                  1
                </div>
              </div>
              <div className="font-semibold text-[15px] mb-2">
                {borrowerData?.personalDetails?.title}{" "}
                {borrowerData?.personalDetails?.firstName}{" "}
                {borrowerData?.personalDetails?.surname}
              </div>
              <div className="text-[14px]">
                <InfoRow
                  label="Credit Score"
                  value={loanConfigData?.profile?.cashCreditScore}
                />
                <InfoRow
                  label="Total Credit Limit (TCL)"
                  value={formatNumber(loanConfigData.profile.cashTCL)}
                />
                <InfoRow
                  label="Net Total Credit Limit"
                  value={formatNumber(loanConfigData?.profile?.netCashTCL)}
                />
              </div>
            </ContainerTile>
            <ContainerTile loading={loading} className={"bg-gray-50"}>
              <div className="flex justify-between items-baseline mb-3 text-green-600">
                <div className="font-semibold text-lg flex gap-x-2 items-center ">
                  <CogIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />{" "}
                  Avialable Loan Range
                </div>
                <div className="bg-green-100 rounded-full h-7 w-7 text-center pt-0.5">
                  2
                </div>
              </div>

              <div className="text-[14px]">
                <div className="text-gray-500">Loan Range:</div>
                <div className="font-semibold text-lg mb-2">
                  {formatNumber(
                    loanConfigData?.cashLoanStats?.minLoanAmount.toFixed(2)
                  )}{" "}
                  -{" "}
                  {formatNumber(
                    loanConfigData?.cashLoanStats?.maxLoanAmount.toFixed(2)
                  )}
                </div>
                <div className="text-gray-500">Duration Range:</div>
                <div className="font-semibold text-lg">
                  {loanConfigData?.cashLoanStats?.minLoanDuration} -{" "}
                  {loanConfigData?.cashLoanStats?.maxLoanDuration} days
                </div>
                <div className="text-gray-500">
                  ({loanConfigData?.cashLoanStats?.minLoanDurationMonths} -{" "}
                  {loanConfigData?.cashLoanStats?.maxLoanDurationMonths} months)
                </div>
                <div className="text-gray-500">
                  Average Installments:{" "}
                  {loanConfigData?.dynamicCashLoanOffers[0]?.avrageNumberOfenstallment.toFixed(
                    2
                  )}
                </div>
              </div>
            </ContainerTile>
          </div>
          {loanConfigData?.dynamicCashLoanOffers?.map((ci, index) => (
            <React.Fragment key={index}>
              <div className="grid grid-cols-2 gap-5">
                <ContainerTile loading={loading} className={"bg-gray-50"}>
                  <div className="flex justify-between items-baseline mb-3 text-violet-600">
                    <div className="font-semibold text-lg flex gap-x-2 items-center text-violet-600">
                      <CalculatorIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />{" "}
                      Interest Rates
                    </div>
                    <div className="bg-violet-100 rounded-full h-7 w-7 text-center pt-0.5">
                      3
                    </div>
                  </div>

                  <div className="text-[14px]">
                    <InfoRow2
                      label="Annual Rate (APR)"
                      value={ci?.annualInterestRatePercentWithoutFee}
                    />
                    <InfoRow2
                      label="Monthly Rate"
                      value={ci?.aprPerMonthPercent}
                    />
                    <InfoRow2
                      label="Daily Rate"
                      value={ci?.dailyInterestRatePercentWithoutFee}
                    />
                    <div className="border-t border-gray-300 pt-2">
                      <div className="text-gray-500">Monthly Flat Rate</div>
                      <div className="flex gap-x-2 items-baseline">
                        <div className="font-semibold text-lg">
                          {ci?.monthlyFlatRatePercent}%
                        </div>
                        <div className="text-gray-500">
                          (daily: {ci?.loanFlatRate}, annual:{" "}
                          {ci?.annualFlatRatePercent})
                        </div>
                      </div>
                    </div>
                  </div>
                </ContainerTile>
                <ContainerTile loading={loading} className={"bg-gray-50"}>
                  <div className="flex justify-between items-baseline mb-3 text-orange-600">
                    <div className="font-semibold text-lg flex gap-x-2 items-center text-orange-600">
                      <CalculatorIcon
                        className="-ml-0.5 h-5 w-5"
                        aria-hidden="true"
                      />{" "}
                      Financial Breakdown
                    </div>
                    <div className="bg-orange-100 rounded-full h-7 w-7 text-center pt-0.5">
                      4
                    </div>
                  </div>

                  <div className="text-[14px]">
                    <div className="text-gray-500">Principal Amount:</div>
                    <div className="font-semibold text-lg mb-2">
                      {formatNumber(ci?.principalAmount.toFixed(2))}
                    </div>
                    <div className="text-gray-500">Total Interest:</div>
                    <div className="font-semibold text-lg mb-2">
                      {formatNumber(ci?.totalInterestAmount.toFixed(2))}
                    </div>
                    <div className="text-gray-500">Service Fee:</div>
                    <div className="flex items-baseline gap-x-2">
                      <div className="font-semibold text-lg mb-2">
                        {ci?.serviceFee.toFixed(2)}
                      </div>
                      <div className="text-gray-500">
                        (tax: {ci?.serviceFeeTax.toFixed(2)})
                      </div>
                    </div>
                    <div className="text-gray-500">Management Fee:</div>
                    <div className="flex items-baseline gap-x-2">
                      <div className="font-semibold text-lg mb-2">
                        {ci?.totalManagementFee.toFixed(2)}
                      </div>
                      <div className="text-gray-500">
                        (VAT: {ci?.totalManagementVatFee.toFixed(2)})
                      </div>
                    </div>
                    <div className="border-t border-gray-300 pt-2 text-blue-600">
                      <div className="font-semibold">Total Loan Amount:</div>
                      <div className="font-bold text-lg">
                        {formatNumber(ci?.totalLoanAmount.toFixed(2))}
                      </div>
                    </div>
                  </div>
                </ContainerTile>
              </div>
              <ContainerTile
                loading={loading}
                className={"bg-gray-50 border-blue-400 border-2"}
              >
                <div className="font-semibold -mt-3 mb-4 text-lg flex gap-x-2 items-center text-blue-600">
                  <CurrencyDollarIcon
                    className="-ml-0.5 h-5 w-5"
                    aria-hidden="true"
                  />{" "}
                  Final Offer Summary
                </div>
                <div
                  className={"shadow-md bg-blue-50 rounded-xl pb-8 pt-6 px-5"}
                >
                  <div className="grid grid-cols-5 gap-4 items-center">
                    <div className="text-[14px]">
                      <div className="text-gray-500">Total Loan Amount</div>
                      <div className="font-semibold text-lg text-blue-600">
                        {formatNumber(ci?.totalLoanAmount.toFixed(2))}
                      </div>
                      <div
                        className="cursor-pointer text-blue-600 hover:underline"
                        onClick={() =>
                          handleInstallmentModal(ci?.installmentSummaryResponse)
                        }
                      >
                        View EMI Schedule
                      </div>
                    </div>
                    <div className="text-[14px]">
                      <div className="text-gray-500">Monthly EMI</div>
                      <div className="font-semibold text-lg">
                        {formatNumber(
                          ci?.installmentSummaryResponse[0]?.installmentValue.toFixed(
                            2
                          )
                        )}
                      </div>
                    </div>
                    <div className="text-[14px]">
                      <div className="text-gray-500">Tenure</div>
                      <div className="font-semibold text-lg">
                        {ci?.durationInMonths} Months
                      </div>
                      <div className="text-gray-500">({ci?.duration} Days)</div>
                    </div>
                    <div className="text-[14px]">
                      <div className="text-gray-500">Interest Rate</div>
                      <div className="font-semibold text-lg">
                        {ci?.monthlyInterestRatePercent}% Monthly
                      </div>
                      <div className="text-gray-500">
                        ({ci?.annualInterestRatePercent}% APR)
                      </div>
                    </div>
                    <div className="text-center">
                      <Button
                        buttonName="Proceed"
                        onClick={() => SubmitProceed(ci.transactionId, index)}
                        rectangle={true}
                      />
                    </div>
                  </div>
                </div>
              </ContainerTile>
              <div>
                <div className="text-center text-gray-500">
                  Loan Summary Id : {ci?.transactionId}
                </div>
                <div className="text-center text-gray-500">
                  Loan Application Id : {loanConfigData?.loanApplicationId}
                </div>
              </div>
            </React.Fragment>
          ))}
          {isModalOpen && selectedInstallmentData && (
            <InstallmentSummery
              isOpen={isModalOpen}
              onClose={closeModal}
              installmentConfigData={selectedInstallmentData}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoanOffers;
