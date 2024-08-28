import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import InstallmentInfoComp from "./InstallmentInfoComp";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

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

const LoanConfig = ({ visible, loanConfigDataProp }) => {
  const [loanConfigData, setloanConfigData] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallmentData, setSelectedInstallmentData] = useState(null);

  useEffect(() => {
    if (!visible) return null;
    setloanConfigData(loanConfigDataProp);
  }, [loanConfigDataProp]);

  const handleProceed = async (transactionId, index) => {
    const postData = {
      transactionId: transactionId,
      contractNumber: "test18monthTenure",
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
        userID +
        "/loans",
        {
          method: "PuT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        console.log(errorData.message);
        return; // Stop further execution
      }
      const loanId = await data.json();
      console.log(loanId.loanId);
      navigate("/borrower/" + userID + "/loanNpayment");
    } catch (error) {
      console.error(error);
    }
  };

  if (loanConfigData.length === 0) {
    return (
        <LoadingState />
    );
  }
  const arrowVis = loanConfigData.dynamicCashLoanOffers.length;
  console.log(arrowVis);
  const settings = {
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
  };

  const width = arrowVis < 4 ? arrowVis * 201 : window.innerWidth < 1280 ? 603 : 804; // Calculate width
  const sliderContainWidth = `w-[${width}px]`;

  const handleInstallmentModal = (data) => {
    setIsModalOpen(true);
    setSelectedInstallmentData(data); // Set the selected installment data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstallmentData(null); // Clear the data when closing the modal
  };

  const tileClass = "py-2 text-[14px] text-gray-500"
  const tableDividerStyle = "divide-x divide-gray-200 text-center w-full h-[58px]";
  const tableSliderStyle = "whitespace-nowrap text-[14px] px-3 py-2 text-gray-500";

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

  return (
    <>
      <div className="grid grid-cols-2 gap-5">
        <ContainerTile>
          <div className="font-semibold text-center -mt-3 mb-3">Profile : </div>
          <div className="grid grid-cols-2 gap-5 text-[14px]">
            <InfoRow label="Cash Credit Score" value={loanConfigData.profile.cashCreditScore} />
            <InfoRow label="Cash TCL" value={loanConfigData.profile.cashTCL} />
            <InfoRow label="Net Cash TCL" value={loanConfigData.profile.netCashTCL} />
          </div>
        </ContainerTile>
        <ContainerTile>
          <div className="font-semibold text-center -mt-3 mb-3">Cash Loan Stats : </div>
          <div className="grid grid-cols-2 gap-5 text-[14px]">
            <InfoRow label="Max Loan Amount" value={loanConfigData.cashLoanStats.maxLoanAmount.toFixed(2)} />
            <InfoRow label="Min Loan Amount" value={loanConfigData.cashLoanStats.minLoanAmount.toFixed(2)} />
            <InfoRow label="Max Loan Duration Days" value={loanConfigData.cashLoanStats.maxLoanDuration} />
            <InfoRow label="Min Loan Duration Days" value={loanConfigData.cashLoanStats.minLoanDuration} />
            <InfoRow label="Max Tenure Months" value={loanConfigData.cashLoanStats.maxTenure} />
            <InfoRow label="Min Tenure Months" value={loanConfigData.cashLoanStats.minTenure} />
          </div>
        </ContainerTile>
      </div>
      <ContainerTile className="flex items-start w-full">
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
            {loanConfigData.dynamicCashLoanOffers.map((ci, index) => {
              return (
                <table key={index} className="divide-y divide-gray-300 border-r border-gray-300 w-full" >
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200 h-[58px]">
                      <th className="py-3.5 text-center">{index + 1}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        <div
                          title={ci.transactionId}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.transactionId}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <LoanOfferRow label={ci.annualFlatRatePercent} />
                    <LoanOfferRow label={ci.annualInterestRatePercent} />
                    <LoanOfferRow label={ci.annualInterestRatePercentWithoutFee} />
                    <LoanOfferRow label={ci.aprAsPerTenorPercent} />
                    <LoanOfferRow label={ci.aprPerMonthPercent} />
                    <LoanOfferRow label={ci.aprWithoutFeePerMonthPercent} />
                    <LoanOfferRow label={ci.avrageNumberOfenstallment} />
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        <div
                          title={ci.dailyInterestRate}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.dailyInterestRate}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <LoanOfferRow label={ci.dailyInterestRatePercentWithoutFee} />
                    <LoanOfferRow label={ci.duration} />
                    <LoanOfferRow label={ci.durationInMonths} />
                    <LoanOfferRow label={ci.instalmentsNumber} />
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          <div
                            className="cursor-pointer"
                            onClick={() =>
                              handleInstallmentModal(
                                ci.installmentSummaryResponse
                              )
                            }
                          >
                            EMI Details
                          </div>
                        </div>
                      </td>
                    </tr>
                    <LoanOfferRow label={ci.loanFlatRate} />
                    <LoanOfferRow label={ci.monthlyFlatRatePercent} />
                    <LoanOfferRow label={ci.monthlyInterestRatePercent} />
                    <LoanOfferRow label={ci.monthlyInterestRatePercentWithoutFee} />
                    <LoanOfferRow label={ci.principalAmount} />
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        <div
                          title={ci.schema}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.schema}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <LoanOfferRow label={ci.serviceFee} />
                    <LoanOfferRow label={ci.serviceFeeTax} />
                    <LoanOfferRow label={ci.totalInterestAmount} />
                    <LoanOfferRow label={ci.totalLoanAmount} />
                    <LoanOfferRow label={ci.totalManagementFee} />
                    <LoanOfferRow label={ci.totalManagementVatFee} />
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        <div
                          className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer font-medium"
                          onClick={() => handleProceed(ci.transactionId, index)}
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
          <InstallmentInfoComp
            isOpen={isModalOpen}
            onClose={closeModal}
            installDataProp={selectedInstallmentData}
          />
        )}
      </ContainerTile>
    </>
  );
};

export default LoanConfig;
