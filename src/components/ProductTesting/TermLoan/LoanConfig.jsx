import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import InstallmentSummery from "./InstallmentSummery";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputNumber from "../../Common/InputNumber/InputNumber";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserLoanOptions,
  submitLoanConfiguration,
  updateLoanConfigFieldsField,
  handleProceed,
} from "../../../redux/Slices/productTestingSlice";
import { useNavigate } from "react-router-dom";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import store from "../../../redux/store";

const LoanConfig = () => {
  const [settings, setSettings] = useState({});
  const [sliderContainWidth, setSliderContainWidth] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallmentData, setSelectedInstallmentData] = useState(null);
  const {
    loanOptions,
    loanConfigFields,
    loanConfigData,
    showModal,
    loading,
    error,
  } = useSelector((state) => state.productTesting);
  const { validationError } = useSelector((state) => state.validation);
  const { userID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    dispatch(getUserLoanOptions(userID));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, userID]);

  useEffect(() => {
    if (["CASH_LOAN_V1", "BNPL_LOAN"].includes(loanConfigFields.loanType)) {
      dispatch(updateLoanConfigFieldsField({ name: "amount", value: "" }));
    }
  }, [loanConfigFields.loanType]);

  useEffect(() => {
    if (loanConfigData) {
      const arrowVis = loanConfigData?.dynamicCashLoanOffers?.length;
      const width =
        arrowVis < 4 ? arrowVis * 201 : window.innerWidth < 1280 ? 603 : 804; // Calculate width
      setSettings({
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: arrowVis < 4 ? arrowVis : 4,
        slidesToScroll: 2,
        nextArrow: arrowVis < 4 ? "" : <SampleNextArrow />,
        prevArrow: arrowVis < 4 ? "" : <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1280,
            settings: {
              slidesToShow: arrowVis < 3 ? arrowVis : 3,
              slidesToScroll: 2,
            },
          },
        ],
      });

      setSliderContainWidth(`w-[${width}px]`);
    }
  }, [loanConfigData]);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={style} onClick={onClick}>
        <div className="bg-[#E3735E] h-6 w-6 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={style} onClick={onClick}>
        <div className="bg-[#E3735E] h-6 w-6 rounded-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>
      </div>
    );
  }

  const SubmitProceed = async (transactionId, index) => {
    dispatch(handleProceed({ transactionId, userID }))
      .unwrap() // Unwrap the result for error handling
      .then((loanId) => {
        console.log("Loan ID:", loanId);
        navigate("/loan/customer-care/" + userID + "/loan-payment-history");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInstallmentModal = (data) => {
    setIsModalOpen(true);
    setSelectedInstallmentData(data); // Set the selected installment data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstallmentData(null); // Clear the data when closing the modal
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
        })
      );
    }
  };

  console.log(validationError);

  const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-3 py-2">
      <div className="col-span-2">{label}:</div>
      <div>{value}</div>
    </div>
  );

  const LoanOfferRow = ({ label }) => (
    <tr className="divide-x divide-gray-200 h-[58px]">
      <td className="py-2 text-[14px] text-gray-500 text-center">{label}</td>
    </tr>
  );

  const tileClass = "py-2 text-[14px] text-gray-500";
  const tableDividerStyle =
    "divide-x divide-gray-200 text-center w-full h-[58px]";
  const tableSliderStyle =
    "whitespace-nowrap text-[14px] px-3 py-2 text-gray-500";

  return (
    <div className="flex flex-col gap-5 mt-4">
      <ContainerTile loading={loading} error={error}>
        <div className="grid grid-cols-5 gap-4 items-end">
          <InputSelect
            labelName={"Loan Type"}
            inputName={"loanType"}
            inputOptions={loanOptions}
            inputValue={loanConfigFields.loanType}
            onChange={handleChange}
            isValidation={true}
          />
          {["CASH_LOAN_V1", "BNPL_LOAN"].includes(
            loanConfigFields.loanType
          ) && (
            <InputNumber
              labelName={"Amount"}
              inputName={"amount"}
              inputValue={loanConfigFields.amount}
              onChange={handleChange}
              placeHolder={"5000"}
            />
          )}
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
          <div className="grid grid-cols-2 gap-5">
            <ContainerTile loading={loading} error={error}>
              <div className="font-semibold text-center -mt-3 mb-3">
                Profile :{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 text-[14px]">
                <InfoRow
                  label="Cash Credit Score"
                  value={loanConfigData?.profile?.cashCreditScore}
                />
                <InfoRow
                  label="Cash TCL"
                  value={loanConfigData?.profile?.cashTCL}
                />
                <InfoRow
                  label="Net Cash TCL"
                  value={loanConfigData?.profile?.netCashTCL}
                />
              </div>
            </ContainerTile>
            <ContainerTile loading={loading} error={error}>
              <div className="font-semibold text-center -mt-3 mb-3">
                Cash Loan Stats :{" "}
              </div>
              <div className="grid grid-cols-2 gap-5 text-[14px]">
                <InfoRow
                  label="Max Loan Amount"
                  value={loanConfigData?.cashLoanStats?.maxLoanAmount.toFixed(
                    2
                  )}
                />
                <InfoRow
                  label="Min Loan Amount"
                  value={loanConfigData?.cashLoanStats?.minLoanAmount.toFixed(
                    2
                  )}
                />
                <InfoRow
                  label="Max Loan Duration Days"
                  value={loanConfigData?.cashLoanStats?.maxLoanDuration}
                />
                <InfoRow
                  label="Min Loan Duration Days"
                  value={loanConfigData?.cashLoanStats?.minLoanDuration}
                />
                <InfoRow
                  label="Max Tenure Months"
                  value={loanConfigData?.cashLoanStats?.maxTenure}
                />
                <InfoRow
                  label="Min Tenure Months"
                  value={loanConfigData?.cashLoanStats?.minTenure}
                />
              </div>
            </ContainerTile>
          </div>
          <ContainerTile
            className="flex items-start w-full"
            loading={loading}
            error={error}
          >
            <div className="w-[330px]">
              <table className="divide-y divide-gray-300  w-full border-r border-gray-300">
                <thead className="bg-gray-50">
                  <tr className={tableDividerStyle}>
                    <th className="py-3.5  text-center ">
                      Dynamic Cash Loan Offers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {[
                    "Transaction Id",
                    "Annual Flat Rate Percent",
                    "Annual Interest Rate Percent",
                    "Annual Interest Rate Percent Without Fee",
                    "APR As Per Tenure Percent",
                    "APR Per Month Percent",
                    "APR Without Fee Per Month Percent",
                    "Average Number Of Installments",
                    "Daily Interest Rate",
                    "Daily Interest Rate Percent Without Fee",
                    "Duration",
                    "Duration In Months",
                    "Tenure",
                    "Installments Summary Response",
                    "Loan Flat Rate",
                    "Monthly Flat Rate Percent",
                    "Monthly Interest Rate Percent",
                    "Monthly Interest Rate Percent Without Fee",
                    "Principal Amount",
                    "Schema",
                    "Service Fee",
                    "Service Fee Tax",
                    "Total Interest Amount",
                    "Total Loan Amount",
                    "Total Management Fee",
                    "Total Management VAT Fee",
                    "Action",
                  ].map((label) => (
                    <tr className={tableDividerStyle} key={label}>
                      <td className={tileClass}>{label}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={sliderContainWidth}>
              {/* <div className="w-[804px]"> */}
              <Slider {...settings}>
                {loanConfigData?.dynamicCashLoanOffers?.map((ci, index) => {
                  return (
                    <table
                      key={index}
                      className="divide-y divide-gray-300 border-r border-gray-300 w-full"
                    >
                      <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200 h-[58px]">
                          <th className="py-3.5 text-center">{index + 1}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr className={tableDividerStyle}>
                          <td className={tableSliderStyle}>
                            <div
                              title={ci?.transactionId}
                              className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                            >
                              <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                                {ci?.transactionId}
                              </div>
                              <div>
                                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <LoanOfferRow label={ci?.annualFlatRatePercent} />
                        <LoanOfferRow label={ci?.annualInterestRatePercent} />
                        <LoanOfferRow
                          label={ci?.annualInterestRatePercentWithoutFee}
                        />
                        <LoanOfferRow label={ci?.aprAsPerTenorPercent} />
                        <LoanOfferRow label={ci?.aprPerMonthPercent} />
                        <LoanOfferRow
                          label={ci?.aprWithoutFeePerMonthPercent}
                        />
                        <LoanOfferRow label={ci?.avrageNumberOfenstallment} />
                        <tr className={tableDividerStyle}>
                          <td className={tableSliderStyle}>
                            <div
                              title={ci?.dailyInterestRate}
                              className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                            >
                              <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                                {ci?.dailyInterestRate}
                              </div>
                              <div>
                                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <LoanOfferRow
                          label={ci?.dailyInterestRatePercentWithoutFee}
                        />
                        <LoanOfferRow label={ci?.duration} />
                        <LoanOfferRow label={ci?.durationInMonths} />
                        <LoanOfferRow label={ci?.instalmentsNumber} />
                        <tr className={tableDividerStyle}>
                          <td className={tableSliderStyle}>
                            <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  handleInstallmentModal(
                                    ci?.installmentSummaryResponse
                                  )
                                }
                              >
                                EMI Details
                              </div>
                            </div>
                          </td>
                        </tr>
                        <LoanOfferRow label={ci?.loanFlatRate} />
                        <LoanOfferRow label={ci?.monthlyFlatRatePercent} />
                        <LoanOfferRow label={ci?.monthlyInterestRatePercent} />
                        <LoanOfferRow
                          label={ci?.monthlyInterestRatePercentWithoutFee}
                        />
                        <LoanOfferRow label={ci?.principalAmount} />
                        <tr className={tableDividerStyle}>
                          <td className={tableSliderStyle}>
                            <div
                              title={ci?.schema}
                              className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                            >
                              <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                                {ci?.schema}
                              </div>
                              <div>
                                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                              </div>
                            </div>
                          </td>
                        </tr>
                        <LoanOfferRow label={ci?.serviceFee} />
                        <LoanOfferRow label={ci?.serviceFeeTax} />
                        <LoanOfferRow label={ci?.totalInterestAmount} />
                        <LoanOfferRow label={ci?.totalLoanAmount} />
                        <LoanOfferRow label={ci?.totalManagementFee} />
                        <LoanOfferRow label={ci?.totalManagementVatFee} />
                        <tr className={tableDividerStyle}>
                          <td className={tableSliderStyle}>
                            <div
                              className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer font-medium"
                              onClick={() =>
                                SubmitProceed(ci.transactionId, index)
                              }
                            >
                              Proceed
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                })}
              </Slider>
            </div>
            {isModalOpen && selectedInstallmentData && (
              <InstallmentSummery
                isOpen={isModalOpen}
                onClose={closeModal}
                installDataProp={selectedInstallmentData}
              />
            )}
          </ContainerTile>
        </>
      )}
    </div>
  );
};

export default LoanConfig;
