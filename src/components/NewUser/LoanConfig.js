import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

const LoanConfig = () => {
  const [loanConfigData, setloanConfigData] = useState([]);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation

  useEffect(() => {
    getLoanConfigInfo();
  }, []);

  async function getLoanConfigInfo() {
    const postData = {
      loan_type: "BNPL",
      customer_type: "CONSUMER",
      amount: 5000,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://194.163.172.33:32299/carbon-offers-service/xcbe/api/v1/borrowers/" +
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
      const json = await data.json();
      // console.log(json);
      setloanConfigData(json);
    } catch (error) {
      console.error(error);
    }
  }
  if (loanConfigData.length === 0) {
    return (
      <>
        <div>Fetching Data</div>
      </>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <div className="flex  items-start">
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
                  <div className="w-[320px]">Apr As Per Tenor Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Apr Per Month Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">
                    Apr Without Fee Per Month Percent
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
                  <div className="w-[320px]">Instalments Number</div>
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
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Transaction Id</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-[868px]">
          <Slider {...settings}>
            {loanConfigData.dynamicCashLoanOffers.map((ci, index) => {
              return (
                <table
                  key={index}
                  className="divide-y divide-gray-300 border-r border-gray-300 w-full"
                >
                  <thead>
                    <tr className="divide-x divide-gray-200 h-[58px] w-[217px]">
                      <th className="py-3.5 px-4 text-center">{index + 1}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
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
