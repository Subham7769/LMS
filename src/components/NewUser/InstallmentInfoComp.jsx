import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingState from "../LoadingState";

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

const InstallmentInfoComp = () => {
  const [installmentConfigData, setinstallmentConfigData] = useState([]);
  const { userID } = useParams();
  const { installIndex } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  //   useEffect(() => {
  //     if (!selectedInstallment) return;
  //   }, [selectedInstallment]);

  //   console.log(selectedInstallment);
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
      const json = await data.json();
      // console.log(json);
      setinstallmentConfigData(json);
    } catch (error) {
      console.error(error);
    }
  }
  if (installmentConfigData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  const arrowVis =
    installmentConfigData.dynamicCashLoanOffers[installIndex]
      .installmentSummaryResponse.length;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: arrowVis === 3 ? 3 : 4,
    slidesToScroll: 2,
    nextArrow: arrowVis === 3 ? "" : <SampleNextArrow />,
    prevArrow: arrowVis === 3 ? "" : <SamplePrevArrow />,
  };
  return (
    <>
      <div className="flex items-start">
        <div className="w-[330px]">
          <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
            <thead>
              <tr className="divide-x divide-gray-200 h-[58px]">
                <th className="py-3.5  text-center ">
                  <div className="w-[320px]">Installment Summary Response</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2 text-gray-500">
                  <div className="w-[320px]">Closing Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Early Settlement Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Installment Date</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Installment Value</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Interest Value</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Management Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Principal Outstanding Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Principal Value</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Saved Fee</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Saved Fee Percent</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Term Cost</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Third Party Cost</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Outsanding Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Total Required Amount</div>
                </td>
              </tr>
              <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                <td className="py-2  text-gray-500">
                  <div className="w-[320px]">Vat Fee</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={`${arrowVis === 3 ? "w-[603px]" : "w-[804px]"}`}>
          <Slider {...settings}>
            {installmentConfigData.dynamicCashLoanOffers[
              installIndex
            ].installmentSummaryResponse.map((ci, index) => {
              return (
                <table
                  key={index}
                  className="divide-y divide-gray-300 border-r border-gray-300 w-full"
                >
                  <thead>
                    <tr className="divide-x divide-gray-200 h-[58px]">
                      <th className="py-3.5 text-center">
                        <div className="w-[198px]">{index + 1}</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 text-gray-500">
                        {ci.closingAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.earlySettlementFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.installmentDate}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.installmentValue}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.interestValue}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.managementFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.principalOutstandingAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.principalValue}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.savedFee}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.savedFeePercent}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.termCost}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.thirdPartyCost}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalOutsandingAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.totalRequiredAmount}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.vatFee}
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

export default InstallmentInfoComp;
