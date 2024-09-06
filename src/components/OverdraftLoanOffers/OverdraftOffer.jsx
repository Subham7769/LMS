import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import LoadingState from "../LoadingState/LoadingState";
import { useNavigate } from "react-router-dom";
import { updateOverdraftOfferField, submitOverdraftOffer } from "../../redux/Slices/overdraftLoanOffersSlice";
import InstallmentSummery from "./InstallmentSummery";
import React from "react";


const OverdraftOffer = () => {
  const [settings, setSettings] = useState({});
  const [sliderContainWidth, setSliderContainWidth] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstallmentData, setSelectedInstallmentData] = useState(null);
  const { overdraftOffer, loanOptions, overdraftOfferData, showModal, loading, error } = useSelector(state => state.overdraftLoanOffers)
  const { userID } = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Adding useNavigate  for navigation


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Dispatch the action to update the state
    dispatch(updateOverdraftOfferField({ name, value }));
  };

  useEffect(() => {
    if (overdraftOfferData) {

      const arrowVis = overdraftOfferData?.length;
      const width = arrowVis < 4 ? arrowVis * 402 : window.innerWidth < 1280 ? 603 : 804; // Calculate width
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
      })

      setSliderContainWidth(`w-[${width}px]`);
    }
  }, [overdraftOfferData])

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

  const CreateOverdraft = async (transactionId, index) => {
    const postData = {
      transactionId: transactionId,
      contractNumber: "test18monthTenure",
    };
    console.log(postData)
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
      navigate("/customer-care/" + userID + "/loan-payment-history");
    } catch (error) {
      console.error(error);
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

  const convertToReadableString = (str) => {
    return str
      // Replace underscores with spaces
      .replace(/_/g, ' ')
      // Insert a space before each uppercase letter that follows a lowercase letter
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize the first letter of the string
      .replace(/^./, (str) => str.toUpperCase())
      // Ensure uppercase sequences remain intact
      .replace(/(?<=[a-z])([A-Z]{2,})/g, ' $1')
      .trim(); // Remove any leading or trailing whitespace
  };

  const LoanOfferRow = ({ label }) => {
    const text = typeof label === 'string' ? label : '';
    return (
      <tr className="divide-x divide-gray-200 h-[58px]">
        {overdraftOfferData.length > 1 && text.length > 15 ? (
          <td className="">
            <div className="flex items-center justify-center">
              <div className={"w-[150px] text-[14px] text-gray-500 whitespace-nowrap  text-center overflow-hidden text-ellipsis"}>{label}</div>
              <div>
                <InformationCircleIcon className="h-4 w-4 inline-block hover:text-black" />
              </div>
            </div>
          </td>
        ) : (
          <td className="py-2 text-[14px] text-gray-500 text-center">{label == null ? '-' : label}</td>
        )}
      </tr>
    );
  }

  const tileClass = "py-2 text-[14px] text-gray-500 w-[400px]"
  const tableDividerStyle = "divide-x divide-gray-200 text-center w-full h-[58px]";
  const tableSliderStyle = "whitespace-nowrap text-[14px] px-3 py-2 text-gray-500 flex justify-center items-center";

  // Conditional rendering based on loading and error states
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <div className="flex flex-col gap-5">
      <ContainerTile>
        <div className="grid grid-cols-5 gap-4 items-end">
          <InputSelect
            labelName={"Loan Type"}
            inputName={"loan_type"}
            inputOptions={loanOptions}
            inputValue={overdraftOffer.loan_type}
            onChange={handleChange}
          />
          {/* {["OVERDRAFT_LOAN"].includes(overdraftOffer.loan_type) && (
            <InputNumber
              labelName={"Amount"}
              inputName={"amount"}
              inputValue={overdraftOffer.amount}
              onChange={handleChange}
              placeHolder={"5000"}
            />
          )} */}
          <div>
            <Button
              buttonIcon={CheckCircleIcon}
              rectangle={true}
              buttonName={"Submit"}
              onClick={() => dispatch(submitOverdraftOffer(userID))}
            />
          </div>

        </div>
      </ContainerTile>
      {showModal && (
        <>
          <ContainerTile className="flex items-start w-full">
            <div className={`${overdraftOfferData.length > 1 ? 'w-[330px]' : "w-full"}`}>
              <table className="divide-y divide-gray-300 w-full border-r border-gray-300">
                <thead className="bg-gray-50">
                  <tr className={tableDividerStyle}>
                    <th className="py-3.5 text-center">
                      Dynamic OverDraft Loan Offers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {Object.keys(overdraftOfferData[0]).map((key, index) => (
                    index + 1 !== Object.keys(overdraftOfferData[0]).length ?
                      <tr className={tableDividerStyle} key={key}>
                        <td className={tileClass}>{convertToReadableString(key)}</td>
                      </tr>
                      :
                      <>
                        <tr className={tableDividerStyle} key={key}>
                          <td className={tileClass}>{convertToReadableString(key)}</td>
                        </tr>
                        <tr className={tableDividerStyle} key={key}>
                          <td className={tileClass}>Action</td>
                        </tr>
                      </>
                  ))}

                </tbody>
              </table>
            </div>
            {
              overdraftOfferData.length > 1 ? (
                <>
                  <div className={sliderContainWidth}>
                    <Slider {...settings}>
                      <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
                        <thead className="bg-gray-50">
                          <tr className="divide-x divide-gray-200 h-[58px]">
                            <th className="py-3.5 text-center">1</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                        {Object.entries(overdraftOfferData[0]).map(([key, value], index, array) => (
                          <React.Fragment key={key}>
                            <LoanOfferRow label={value} />
                            {index + 1 === Object.entries(overdraftOfferData[0]).length && (
                              <tr className={tableDividerStyle}>
                                <td className={tableSliderStyle}>
                                  <div
                                    className="text-white bg-indigo-500 rounded py-1 px-1.5 cursor-pointer font-medium"
                                    onClick={() => CreateOverdraft(ci.transactionId, index)}
                                  >
                                    Create Overdraft
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                        </tbody>
                      </table>
                    </Slider>
                  </div>
                </>) : (
                <>
                  <div className={"w-full"}>
                    <table className="divide-y divide-gray-300 border-r border-gray-300 w-full">
                      <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200 h-[58px]">
                          <th className="py-3.5 text-center">1</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {Object.entries(overdraftOfferData[0]).map(([key, value], index, array) => (
                          <React.Fragment key={key}>
                            <LoanOfferRow label={value} />
                            {index + 1 === Object.entries(overdraftOfferData[0]).length && (
                              <tr className={tableDividerStyle}>
                                <td className={tableSliderStyle}>
                                  <div
                                    className="text-white max-w-[200px] bg-indigo-500 rounded py-1 px-1.5 cursor-pointer font-medium"
                                    onClick={() => CreateOverdraft(overdraftOfferData[0].transactionId, index)}
                                  >
                                    Create Overdraft
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )
            }

          </ContainerTile>

        </>
      )}
    </div>
  );
};

export default OverdraftOffer;
