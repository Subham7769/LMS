import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";
import InstallmentInfoComp from "./InstallmentInfoComp";

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
  }, []);

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
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
    ]
  };

  const handleInstallmentModal = (data) => {
    setIsModalOpen(true);
    setSelectedInstallmentData(data); // Set the selected installment data
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstallmentData(null); // Clear the data when closing the modal
  };

  const tableDividerStyle = "divide-x divide-gray-200 text-center w-full h-[58px]"
  const tableSliderStyle = "whitespace-nowrap p-4 text-gray-500"
  return (
    <>
      <div className="flex flex-col xl:flex-row xl:gap-5 items-baseline mb-8">
        <div>
          <div className="font-semibold mt-5 mb-2">Profile : </div>
          <div className="rounded-xl pt-6 pb-2 px-5 border border-red-600 w-fit">
            <div className="flex gap-5 mb-5 border-b border-gray-300 pb-4">
              <div className="flex gap-5 border-r border-gray-300 pr-5">
                <div>Cash Credit Score : </div>
                <div>{loanConfigData.profile.cashCreditScore}</div>
              </div>
              <div className="flex gap-5">
                <div>Cash TCL : </div>
                <div>{loanConfigData.profile.cashTCL}</div>
              </div>
            </div>
              <div className="flex gap-10 mb-5">
                <div className="flex gap-5">
                  <div>Net Cash TCL : </div>
                  <div>{loanConfigData.profile.netCashTCL}</div>
                </div>
              </div>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-2 mt-8">Cash Loan Stats : </div>
          <div className="rounded-xl pt-2 pb-2 px-5 border border-red-600 relative">
            <div className="flex gap-5 py-3">
              <div className="pr-5 py-2 flex flex-col border-r border-gray-300">
                <div className="flex gap-2 py-2">
                  <div className="w-40">Max Loan Amount : </div>
                  <div>{loanConfigData.cashLoanStats.maxLoanAmount}</div>
                </div>
                <div className="flex gap-2 py-2">
                  <div className="w-40">Min Loan Amount : </div>
                  <div>{loanConfigData.cashLoanStats.minLoanAmount}</div>
                </div>
              </div>
              <div className="pr-5 py-2 flex flex-col border-r border-gray-300">
                <div className="flex gap-2 py-2">
                  <div className="w-52">Max Loan Duration Days : </div>
                  <div>{loanConfigData.cashLoanStats.maxLoanDuration}</div>
                </div>
                <div className="flex gap-2 py-2">
                  <div className="w-52">Min Loan Duration Days : </div>
                  <div>{loanConfigData.cashLoanStats.minLoanDuration}</div>
                </div>
              </div>
              <div className="py-2 flex flex-col">
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
          </div>
        </div>
      </div>
      <div className="flex items-start w-fit shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <div className="w-[330px] ">
          <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
            <thead className="bg-gray-50">
              <tr className={tableDividerStyle}>
                <th className="py-3.5  text-center ">
                  Dynamic Cash Loan Offers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className={tableDividerStyle}>
                <td className="py-2 text-gray-500">
                  Transaction Id
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Annual Flat Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Annual Interest Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                    Annual Interest Rate Percent Without Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  APR As Per Tenure Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  APR Per Month Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  
                    APR Without Fee Per Month Percent
                  
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Avrage Number Of installment
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Daily Interest Rate
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  
                    Daily Interest Rate Percent Without Fee
                  
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Duration
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Duration In Months
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Tenure
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Instalments Summary Response
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Loan Flat Rate
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Monthly Flat Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Monthly Interest Rate Percent
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="  text-gray-500">
                  
                    Monthly Interest Rate Percent Without Fee
                  
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Principal Amount
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Schema
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Service Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Service Fee Tax
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Total Interest Amount
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Total Loan Amount
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Total Management Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Total Management Vat Fee
                </td>
              </tr>
              <tr className={tableDividerStyle}>
                <td className="py-2  text-gray-500">
                  Action
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[603px] xl:w-[804px] ">
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
                      <td className={tableSliderStyle}>
                        {ci.duration}
                      </td>
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
                          <div className="cursor-pointer" onClick={() => handleInstallmentModal(ci.installmentSummaryResponse)}>EMI Details</div>
                        </div>
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.loanFlatRate}
                      </td>
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
                      <td className={tableSliderStyle}>
                        {ci.principalAmount}
                      </td>
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
                      <td className={tableSliderStyle}>
                        {ci.serviceFee}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.serviceFeeTax}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.totalInterestAmount}
                      </td>
                    </tr>
                    <tr className={tableDividerStyle}>
                      <td className={tableSliderStyle}>
                        {ci.totalLoanAmount}
                      </td>
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
                          onClick={() =>
                            handleProceed(ci.transactionId, index)
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
        {isModalOpen && selectedInstallmentData   && (
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
