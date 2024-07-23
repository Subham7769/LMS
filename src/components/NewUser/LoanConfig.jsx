import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingState from "../LoadingState/LoadingState";

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

const LoanConfig = ({ visible, loanType, amount }) => {
  const [loanConfigData, setloanConfigData] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  const [productNotFound, setProductNotFound] = useState(false);

  const [showModalIndex, setShowModalIndex] = useState(null); // State to track the index of the clicked button
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  console.log(visible + "---" + loanType + "---" + amount);

  useEffect(() => {
    if (!visible) return null;
    getLoanConfigInfo();
  }, []);

  const handleViewDetails = async (transactionId, index) => {
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

  const closeModal = () => {
    setShowModalIndex(null); // Reset the state to close the modal
  };

  async function getLoanConfigInfo() {
    const postData = {
      loan_type: loanType,
      customer_type: "CONSUMER",
      amount: amount,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
          userID +
          "/loans/configurations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        navigate("/user"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      if (data.status === 500) {
        setProductNotFound(true);
        console.log("checking");
        return;
      }
      const json = await data.json();
      // console.log(json);
      setloanConfigData(json);
    } catch (error) {
      console.error(error);
    }
  }

  if (productNotFound) {
    return (
      <>
        <div className="text-red-600 mt-4">
          There is no loan product with this type
        </div>
      </>
    );
  }
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
  };
  return (
    <>
      <div className="flex gap-5 items-baseline mb-8">
        <div>
          <div className="font-semibold mt-5 mb-2">Profile : </div>
          <div className="rounded-xl pt-6 pb-2 px-5 border border-red-600 w-fit">
            <div>
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
            </div>
            <div>
              <div className="flex gap-10 mb-5">
                <div className="flex gap-5">
                  <div>Net Cash TCL : </div>
                  <div>{loanConfigData.profile.netCashTCL}</div>
                </div>
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
              <div className=" pr-5 py-2 flex flex-col border-r border-gray-300">
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
      <div className="flex items-start">
        <div className="w-[330px]">
          <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
            <thead>
              <tr className="divide-x divide-gray-200 h-[58px]">
                <th className="py-3.5  text-center ">
                  <div className="w-[320px]">Dynamic Cash Loan Offers</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2 text-gray-500">
                  <div className="w-[320px]">Transaction Id</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Annual Flat Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Annual Interest Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    Annual Interest Rate Percent Without Fee
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">APR As Per Tenure Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">APR Per Month Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    APR Without Fee Per Month Percent
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Avrage Number Of installment</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Daily Interest Rate</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    Daily Interest Rate Percent Without Fee
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Duration</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Duration In Months</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Tenure</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Instalments Summary Response</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Loan Flat Rate</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Monthly Flat Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Monthly Interest Rate Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="  text-gray-500">
                  <div className="w-[320px]">
                    Monthly Interest Rate Percent Without Fee
                  </div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Principal Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Schema</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Service Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Service Fee Tax</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Interest Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Loan Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Management Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Management Vat Fee</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[804px]">
          <Slider {...settings}>
            {loanConfigData.dynamicCashLoanOffers.map((ci, index) => {
              return (
                <table
                  key={index}
                  className="divide-y divide-gray-300 border-r border-gray-300 w-full"
                >
                  <thead>
                    <tr className="divide-x divide-gray-200 h-[58px]">
                      <th className="py-3.5 text-center">{index + 1}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
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
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 text-gray-500">
                        {ci.annualFlatRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.annualInterestRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.annualInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.aprAsPerTenorPercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.aprPerMonthPercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.aprWithoutFeePerMonthPercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.avrageNumberOfenstallment}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
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
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.dailyInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.duration}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.durationInMonths}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.instalmentsNumber}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          <Link
                            // onClick={() => handleViewDetails(ci, index)}
                            to={
                              "/user/" +
                              userID +
                              "/loan-config/" +
                              index +
                              "/installment"
                            }
                          >
                            EMI Details
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.loanFlatRate}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.monthlyFlatRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.monthlyInterestRatePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.monthlyInterestRatePercentWithoutFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.principalAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
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
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.serviceFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.serviceFeeTax}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalInterestAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalLoanAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalManagementFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalManagementVatFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer font-medium"
                          onClick={() =>
                            handleViewDetails(ci.transactionId, index)
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
      </div>
    </>
  );
};

export default LoanConfig;
