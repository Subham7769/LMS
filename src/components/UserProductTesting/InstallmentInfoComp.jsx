import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingState from "../LoadingState/LoadingState";
import { XCircleIcon } from "@heroicons/react/24/outline";

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

const InstallmentInfoComp = ({ isOpen, onClose, installDataProp }) => {
  const [installmentConfigData, setinstallmentConfigData] = useState([]);
  useEffect(() => {
    if (!isOpen) return null;
    setinstallmentConfigData(installDataProp);
  }, []);

  if (installmentConfigData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }
  const arrowVis =
    installmentConfigData.length;
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: arrowVis < 4 ? arrowVis : 3,
    slidesToScroll: 2,
    nextArrow: arrowVis < 4 ? "" : <SampleNextArrow />,
    prevArrow: arrowVis < 4 ? "" : <SamplePrevArrow />,
  };

  const width = arrowVis < 3 ? arrowVis * 201 : 603; // Calculate width
  const sliderContainWidth = `w-[${width}px]`;

  const installTableDividerStyle = "divide-x divide-gray-200 text-center w-full h-[58px]"
  const installTableColor = "py-2  text-gray-500"
  const installSliderStyle = "whitespace-nowrap p-4 text-gray-500"
  return (
    <>
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative bg-white flex flex-col w-fit rounded-lg shadow-lg ">
        <div onClick={onClose} className="h-9 w-9 cursor-pointer rounded-full text-white absolute -top-3 -right-3 self-end">
          <XCircleIcon className="w-9 h-9" fill="rgb(220 38 38)"/>
        </div>
        <div className="flex items-start h-[600px] overflow-y-auto p-6">
          <div className="w-[330px]">
            <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
              <thead>
                <tr className={installTableDividerStyle}>
                  <th className="py-3.5  text-center ">
                    Installment Summary Response
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Closing Amount
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Early Settlement Fee
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Installment Date
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Installment Value
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Interest Value
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Management Fee
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Principal Outstanding Amount
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Principal Value
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Saved Fee
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Saved Fee Percent
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Term Cost
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Third Party Cost
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Total Outsanding Amount
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Total Required Amount
                  </td>
                </tr>
                <tr className={installTableDividerStyle}>
                  <td className={installTableColor}>
                    Vat Fee
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={sliderContainWidth}>
            <Slider {...settings}>
              {installmentConfigData.map((ci, index) => {
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
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.closingAmount}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.earlySettlementFee}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.installmentDate}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.installmentValue}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.interestValue}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.managementFee}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.principalOutstandingAmount}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.principalValue}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.savedFee}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.savedFeePercent}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.termCost}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.thirdPartyCost}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.totalOutsandingAmount}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
                          {ci.totalRequiredAmount}
                        </td>
                      </tr>
                      <tr className={installTableDividerStyle}>
                        <td className={installSliderStyle}>
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
      </div>
    </div>
      
    </>
  );
};

export default InstallmentInfoComp;
