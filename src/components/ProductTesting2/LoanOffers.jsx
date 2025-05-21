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
  resetLoanOfferFields,
  updateLoanOfferFields,
} from "../../../redux/Slices/smeLoansSlice";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import {
  UserIcon,
  CogIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import formatNumber from "../../../utils/formatNumber";
import CardInfo from "../../Common/CardInfo/CardInfo";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";
import { sanitizeUid } from "../../../utils/sanitizeUid";
import store from "../../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";

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
  } = useSelector((state) => state.smeLoans);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const userName = userData?.username;
  
  useEffect(() => {
    dispatch(fetchLoanProductData());
    return () => {
      dispatch(clearValidationError());
      dispatch(resetLoanOfferFields());
    };
  }, [dispatch]);

  const SubmitProceed = async (transactionId, index) => {
    const uid = loanOfferFields.uid;
    const proceedPayload = {
      transactionId: transactionId,
      loanApplicationId: loanConfigData.loanApplicationId,
      createdBy: userName,
    };
    await dispatch(handleProceed({ proceedPayload, uid })).unwrap();
    navigate(`/loan/loan-origination-system/sme/loans/loan-history`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateLoanOfferFields({ name, value }));
  };

  const handleGetOffers = async () => {
    await dispatch(validateForm(loanOfferFields));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(getLoanOffers(loanOfferFields));
      dispatch(fetchBorrowerById(sanitizeUid(loanOfferFields?.uid)));
    }
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
            disabled={false}
            isValidation={true}
          />
          <InputText
            labelName={"Borrower Serial No."}
            inputName="uid"
            inputValue={loanOfferFields.uid}
            onChange={handleChange}
            disabled={false}
            isValidation={true}
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
            {/* Meet Our Borrower */}
            <CardInfo
              cardTitle="Meet Our Borrower"
              className={"border border-border-gray-primary"}
              cardIcon={UserIcon}
              colorText={"text-blue-primary"}
              colorBG={"bg-background-light-white"}
              numberBG={"bg-blue-secondary"}
              cardNumber="1"
              loading={loading}
            >
              <div className="font-semibold text-[15px] mb-2">
                {borrowerData?.companyDetails?.companyName}
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
            </CardInfo>

            {/* Available Loan Range */}
            <CardInfo
              cardTitle="Available Loan Range"
              className={"border border-border-gray-primary"}
              cardIcon={CogIcon}
              colorText={"text-green-primary"}
              colorBG={"bg-background-light-white"}
              numberBG={"bg-green-secondary"}
              cardNumber="2"
              loading={loading}
            >
              <div className="text-[14px]">
                <div className="text-gray-500">Loan Range:</div>
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
                <div className="text-gray-500">Duration Range:</div>
                <div className="font-semibold text-lg">
                  {loanConfigData?.cashLoanStats?.minEligibleDuration} -{" "}
                  {loanConfigData?.cashLoanStats?.maxEligibleDuration} days
                </div>
                <div className="text-gray-500 mb-2">
                  ({loanConfigData?.cashLoanStats?.minEligibleDurationMonths} -{" "}
                  {loanConfigData?.cashLoanStats?.maxLoanDurationMonths} months)
                </div>
                <div className="text-gray-500">Average Installments: </div>
                <div className="font-semibold text-lg">
                  {loanConfigData?.dynamicCashLoanOffers[0]?.instalmentsNumber.toFixed(
                    2
                  )}
                </div>
              </div>
            </CardInfo>
          </div>
          {loanConfigData?.dynamicCashLoanOffers?.map((ci, index) => (
            <React.Fragment key={index}>
              <div className="grid grid-cols-2 gap-5">
                {/* Interest Rates */}
                <CardInfo
                  cardTitle="Interest Rates"
                  className={"border border-border-gray-primary"}
                  cardIcon={CalculatorIcon}
                  colorText={"text-violet-primary"}
                  colorBG={"bg-background-light-white"}
                  numberBG={"bg-violet-secondary"}
                  cardNumber="3"
                  loading={loading}
                >
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
                    <div className="border-t border-border-gray-primary pt-2">
                      <div className="text-gray-500">Monthly Flat Rate</div>
                      <div className="flex gap-x-2 items-baseline">
                        <div className="font-semibold text-lg">
                          {ci?.monthlyFlatRatePercent}%
                        </div>
                        <div className="text-gray-500">
                          (daily: {ci?.loanFlatRate}%, annual:{" "}
                          {ci?.annualFlatRatePercent}%)
                        </div>
                      </div>
                    </div>
                  </div>
                </CardInfo>

                {/* Financial Breakdown */}
                <CardInfo
                  cardTitle="Financial Breakdown"
                  className={"border border-border-gray-primary"}
                  cardIcon={CalculatorIcon}
                  colorText={"text-orange-primary"}
                  colorBG={"bg-background-light-white"}
                  numberBG={"bg-orange-secondary"}
                  cardNumber="4"
                  loading={loading}
                >
                  <div className="text-[14px]">
                    <div className="text-gray-500">Principal Amount:</div>
                    <div className="flex items-baseline gap-x-2">
                      <div className="font-semibold text-lg mb-2">
                        {formatNumber(ci?.principalAmount.toFixed(2))}
                      </div>
                      <div className="text-gray-500">
                        (Disbursed Amt:{" "}
                        {formatNumber(ci?.disbursedAmount.toFixed(2))})
                      </div>
                    </div>
                    <div className="text-gray-500">
                      {ci?.totalInterestAmount > ci?.discountFee
                        ? "Total Interest:"
                        : "Discount Fee:"}
                    </div>
                    <div className="font-semibold text-lg mb-2">
                      {ci?.totalInterestAmount > ci?.discountFee
                        ? formatNumber(ci?.totalInterestAmount.toFixed(2))
                        : formatNumber(ci?.discountFee.toFixed(2))}
                    </div>
                    <div className="text-gray-500">
                      Total Admin Fee (or Service Fee):
                    </div>
                    <div className="flex items-baseline gap-x-2">
                      <div className="font-semibold text-lg mb-2">
                        {ci?.serviceFee.toFixed(2)}
                      </div>
                      <div className="text-gray-500">
                        (tax: {ci?.serviceFeeTax.toFixed(2)})
                      </div>
                    </div>
                    <div className="text-gray-500">Application Fee:</div>
                    <div className="flex items-baseline gap-x-2">
                      <div className="font-semibold text-lg mb-2">
                        {ci?.applicationFees.toFixed(2)}
                      </div>
                      <div className="text-gray-500">
                        (CRB: {ci?.crbCharge.toFixed(2)})
                      </div>
                    </div>
                    <div className="text-gray-500">Insurance Fee:</div>
                    <div className="flex items-baseline gap-x-2">
                      <div className="font-semibold text-lg mb-2">
                        {ci?.insuranceFee.toFixed(2)}
                      </div>
                      <div className="text-gray-500">
                        (Levy: {ci?.insuranceLevy.toFixed(2)})
                      </div>
                    </div>
                    <div className="border-t border-border-gray-primary pt-2 text-blue-600">
                      <div className="font-semibold">Total Loan Amount:</div>
                      <div className="font-bold text-lg">
                        {formatNumber(ci?.totalLoanAmount.toFixed(2))}
                      </div>
                    </div>
                  </div>
                </CardInfo>
              </div>

              {/* Final Offer Summary */}
              <CardInfo
                cardTitle="Final Offer Summary"
                className={
                  "border-2 border-blue-300 rounded-xl shadow-md px-4 pb-5"
                }
                colorBG={"bg-background-light-white"}
                cardIcon={CurrencyDollarIcon}
                colorText={"text-blue-primary"}
                loading={loading}
              >
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
                          ci?.installmentSummaryResponse[0]?.totalRequiredAmount.toFixed(
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
                      {!hasViewOnlyAccessGroup3(roleName) && (
                        <Button
                          buttonName="Proceed"
                          onClick={() => SubmitProceed(ci.transactionId, index)}
                          rectangle={true}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </CardInfo>
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
