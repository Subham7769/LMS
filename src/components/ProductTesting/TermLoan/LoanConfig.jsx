import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InstallmentSummery from "./InstallmentSummery";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import CardInfo from "../../Common/CardInfo/CardInfo";
import formatNumber from "../../../utils/formatNumber";
import {
  UserIcon,
  CogIcon,
  CalculatorIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import {
  getUserLoanOptions,
  submitLoanConfiguration,
  updateLoanConfigFieldsField,
  handleProceed,
} from "../../../redux/Slices/productTestingSlice";
import { fetchBorrowerById } from "../../../redux/Slices/personalLoansSlice";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import store from "../../../redux/store";

const LoanConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallmentData, setSelectedInstallmentData] = useState(null);
  const {
    loanOptions,
    loanConfigFields,
    loanConfigData,
    showModal,
    consumerType,
    loading,
    error,
  } = useSelector((state) => state.productTesting);
  // const { borrowerData } = useSelector((state) => state.personalLoans);
  const { validationError } = useSelector((state) => state.validation);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    dispatch(getUserLoanOptions(userID));
    // if (userID) {
    //   dispatch(fetchBorrowerById(userID));
    // }
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, userID]);

  const SubmitProceed = async (transactionId, index) => {
    dispatch(handleProceed({ transactionId, userID }))
      .unwrap() // Unwrap the result for error handling
      .then((loanId) => {
        console.log("Loan ID:", loanId);
        // navigate("/loan/customer-care/" + userID + "/loan-payment-history");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateLoanConfigFieldsField({ name, value }));
  };

  const handleSubmit = async () => {
    await dispatch(validateForm(loanConfigFields));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        submitLoanConfiguration({
          loanType: loanConfigFields.loanType,
          amount: loanConfigFields.amount,
          userID,
          consumerType,
        })
      );
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

  console.log(showModal);

  return (
    <div className="flex flex-col gap-5 mt-4">
      <ContainerTile>
        <div className="grid grid-cols-5 gap-4 items-end">
          <InputSelect
            labelName={"Loan Type"}
            inputName={"loanType"}
            inputOptions={loanOptions}
            inputValue={loanConfigFields.loanType}
            onChange={handleChange}
            isValidation={true}
          />
          <InputNumber
            labelName={"Amount"}
            inputName={"amount"}
            inputValue={loanConfigFields.amount}
            onChange={handleChange}
            placeHolder={"5000"}
          />
          <div>
            <Button
              buttonIcon={CheckCircleIcon}
              rectangle={true}
              buttonName={"Submit"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </ContainerTile>
      {showModal && (
        <>
          <div className="flex flex-col gap-5 mt-4">
            <div className="text-center">
              <div className="text-xl font-semibold ">Your Loan Offer</div>
              <div className="text-gray-500">
                Let's review the details of your{" "}
                {
                  loanOptions.find(
                    (item) => item.value == loanConfigFields.loanType
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
              <CardInfo
                cardTitle="Meet Our Borrower"
                cardIcon={UserIcon}
                color={"blue"}
                cardNumber="1"
                loading={loading}
              >
                {/* <div className="font-semibold text-[15px] mb-2">
                  {borrowerData?.personalDetails?.title}{" "}
                  {borrowerData?.personalDetails?.firstName}{" "}
                  {borrowerData?.personalDetails?.surname}
                </div> */}
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
              <CardInfo
                cardTitle="Avialable Loan Range"
                cardIcon={CogIcon}
                color={"green"}
                cardNumber="2"
                loading={loading}
              >
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
                  <div className="text-gray-500 mb-2">
                    ({loanConfigData?.cashLoanStats?.minLoanDurationMonths} -{" "}
                    {loanConfigData?.cashLoanStats?.maxLoanDurationMonths}{" "}
                    months)
                  </div>
                  <div className="text-gray-500">Average Installments: </div>
                  <div className="font-semibold text-lg">
                    {loanConfigData?.dynamicCashLoanOffers[0]?.avrageNumberOfenstallment.toFixed(
                      2
                    )}
                  </div>
                </div>
              </CardInfo>
            </div>
            {loanConfigData?.dynamicCashLoanOffers?.map((ci, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-2 gap-5">
                  <CardInfo
                    cardTitle="Interest Rates"
                    cardIcon={CalculatorIcon}
                    color={"violet"}
                    // cardNumber={index + 3}
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
                  <CardInfo
                    cardTitle="Financial Breakdown"
                    cardIcon={CalculatorIcon}
                    color={"red"}
                    // cardNumber={index + 4}
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
                <CardInfo
                  cardTitle="Final Offer Summary"
                  className={
                    "border-2 border-blue-300 rounded-xl shadow-md px-4 pb-5"
                  }
                  cardIcon={CurrencyDollarIcon}
                  color={"blue"}
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
                            handleInstallmentModal(
                              ci?.installmentSummaryResponse
                            )
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
                        <div className="text-gray-500">
                          ({ci?.duration} Days)
                        </div>
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
                        {/* <Button
                          buttonName="Proceed"
                          onClick={() => SubmitProceed(ci.transactionId, index)}
                          rectangle={true}
                        /> */}
                      </div>
                    </div>
                  </div>
                </CardInfo>
                <div>
                  <div className="text-center text-gray-500 border-b border-border-gray-primary mb-5 pb-5">
                    Loan Summary Id : {ci?.transactionId}
                  </div>
                  {/* <div className="text-center text-gray-500">
                    Loan Application Id : {loanConfigData?.loanApplicationId}
                  </div> */}
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
        </>
      )}
    </div>
  );
};

export default LoanConfig;
