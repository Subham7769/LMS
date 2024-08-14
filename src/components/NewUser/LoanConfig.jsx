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
      <>
        <LoadingState />
      </>
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

  const width =
    arrowVis < 4 ? arrowVis * 201 : window.innerWidth < 1280 ? 603 : 804; // Calculate width
  console.log(width);
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

  const tableDividerStyle =
    "divide-x divide-gray-200 text-center w-full h-[58px]";
  const tableSliderStyle = "whitespace-nowrap text-[14px] px-3 py-2 text-gray-500";
  return (
    <>
      <div className="grid grid-cols-2 gap-5">

          <ContainerTile>
          <div className="font-semibold text-center -mt-3 mb-3">Profile : </div>
            <div className="flex gap-5 mb-5  text-[16px] pb-4 ">
              <div className="flex gap-5  pr-5 ">
                <span>Cash Credit Score : </span>
                <span>{loanConfigData.profile.cashCreditScore}</span>
              </div>
              <div className="flex gap-5">
                <div>Cash TCL : </div>
                <div>{loanConfigData.profile.cashTCL}</div>
              </div>
            </div>
            <div className="flex gap-10 mb-5 text-[16px]">
              <div className="flex gap-5">
                <div>Net Cash TCL : </div>
                <div>{loanConfigData.profile.netCashTCL}</div>
              </div>
            </div>
          </ContainerTile>
          <ContainerTile>
          <div className="font-semibold text-center -mt-3 mb-3">Cash Loan Stats : </div>
            <div className="grid grid-cols-2 gap-5">
              <div className=" flex flex-col text-[16px]">
                <div className="flex gap-2 py-2">
                  <div className="w-40">Max Loan Amount : </div>
                  <div>{loanConfigData.cashLoanStats.maxLoanAmount}</div>
                </div>
                <div className="flex gap-2 py-2">
                  <div className="w-40">Min Loan Amount : </div>
                  <div>{loanConfigData.cashLoanStats.minLoanAmount}</div>
                </div>
              </div>
              <div className=" flex flex-col text-[16px]">
                <div className="flex gap-2 py-2">
                  <div className="w-52">Max Loan Duration Days : </div>
                  <div>{loanConfigData.cashLoanStats.maxLoanDuration}</div>
                </div>
                <div className="flex gap-2 py-2">
                  <div className="w-52">Min Loan Duration Days : </div>
                  <div>{loanConfigData.cashLoanStats.minLoanDuration}</div>
                </div>
              </div>
              <div className=" flex flex-col text-[16px]">
                <div className="flex gap-2 py-2">
                  <div className="w-40">Max Tenure Months : </div>
                  <div>{loanConfigData.cashLoanStats.maxTenure}</div>
                </div>
                <div className="flex gap-2 py-2">
                  <div className="w-40">Min Tenure Months : </div>
                  <div>{loanConfigData.cashLoanStats.minTenure}</div>
                </div>
              </div>
            </div>
          </ContainerTile>

      </div>
      <div className="flex items-start w-full shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Transaction Id</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Annual Flat Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Annual Interest Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Annual Interest Rate Percent Without Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  APR As Per Tenure Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>APR Per Month Percent</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  APR Without Fee Per Month Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Avrage Number Of installment
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Daily Interest Rate</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Daily Interest Rate Percent Without Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Duration</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Duration In Months</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Tenure</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Instalments Summary Response
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Loan Flat Rate</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Monthly Flat Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Monthly Interest Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Monthly Interest Rate Percent Without Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Principal Amount</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Schema</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Service Fee</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Service Fee Tax</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Total Interest Amount</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Total Loan Amount</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Total Management Fee</td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>
                  Total Management Vat Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className={tileClass}>Action</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={sliderContainWidth}>
          {/* <div className="w-[804px]"> */}
          <Slider {...settings}>
            {loanConfigData.dynamicCashLoanOffers.map((ci, index) => {
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
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.annualFlatRatePercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.annualInterestRatePercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.annualInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.aprAsPerTenorPercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.aprPerMonthPercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.aprWithoutFeePerMonthPercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.avrageNumberOfenstallment}
                      </td>
                    </tr>
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
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.dailyInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>{ci.duration}</td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.durationInMonths}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.instalmentsNumber}
                      </td>
                    </tr>
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
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>{ci.loanFlatRate}</td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.monthlyFlatRatePercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.monthlyInterestRatePercent}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.monthlyInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>{ci.principalAmount}</td>
                    </tr>
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
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>{ci.serviceFee}</td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>{ci.serviceFeeTax}</td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.totalInterestAmount}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>{ci.totalLoanAmount}</td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.totalManagementFee}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.totalManagementVatFee}
                      </td>
                    </tr>
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
      </div>
    </>
  );
};

export default LoanConfig;
