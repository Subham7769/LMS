import React, { memo } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const Arrow = ({ className, style, onClick, direction }) => (
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
          d={direction === "next" ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"}
        />
      </svg>
    </div>
  </div>
);

const SampleNextArrow = memo((props) => <Arrow {...props} direction="next" />);
const SamplePrevArrow = memo((props) => <Arrow {...props} direction="prev" />);

const TableHeader = () => (
  <thead className="bg-gray-50">
    <tr className="divide-x divide-gray-200">
      <th className="py-3.5 px-4 text-center">Credit Instrument</th>
    </tr>
  </thead>
);

const TableRow = ({ children }) => (
  <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
    <td className="whitespace-nowrap py-4 px-3 text-gray-500">{children}</td>
  </tr>
);

const CreditInstrument = () => {
  const { CreditBureauDetails, loading, error } = useSelector(
    (state) => state.customerCare
  );


  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const headerList = [
    "Creditor",
    "Product",
    "Account Number",
    "Credit Limit",
    "Issue Date",
    "Product Expire Date",
    "Status",
    "Closed Date",
    "Tenure",
    "Payment Frequency",
    "Instalment Amount",
    "Consumer Salary",
    "Security Type",
    "Outstanding Balance",
    "Past Due Balance",
    "Last Amount Paid",
    "Last Payment Date",
    "As Of Date",
    "Summary",
  ];

  const cidetail =
    CreditBureauDetails?.response?.message?.item[0]?.rspreport?.consumer[0]
      ?.cidetails?.cidetail;

  return (
    <ContainerTile
      loading={loading}
      className={"mt-4"}
    >
      <div className="flex items-start shadow-md bg-gray-100 mt-4">
        <table className="divide-y divide-gray-300 border-r border-gray-200 w-full text-[14px]">
          <TableHeader />
          <tbody className="divide-y divide-gray-200 bg-white">
            {headerList.map((header, index) => (
              <TableRow key={index}>{header}</TableRow>
            ))}
          </tbody>
        </table>
        <div className="w-[984px]">
          <Slider {...settings}>
            {cidetail?.map((ci, index) => (
              <table
                key={index}
                className="divide-y divide-gray-300  w-[200px] text-[14px]"
              >
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th className="py-3.5 px-4 text-center">{index + 1}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <TableRow>{ci?.cicrdtr}</TableRow>
                  <TableRow>{ci?.ciprd}</TableRow>
                  <TableRow>
                    <div
                      title={ci?.ciaccno}
                      className="w-[165px] cursor-pointer flex mx-auto hover:text-gray-900"
                    >
                      <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {ci?.ciaccno}
                      </div>
                      <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                    </div>
                  </TableRow>
                  <TableRow>{ci?.cilimit}</TableRow>
                  <TableRow>{ci?.ciissudt}</TableRow>
                  <TableRow>{ci?.ciprodexpdt ? ci?.ciprodexpdt : "-"}</TableRow>
                  <TableRow>{ci?.cistatus}</TableRow>
                  <TableRow>{ci?.ciclsddt ? ci?.ciclsddt : "-"}</TableRow>
                  <TableRow>{ci?.citnr}</TableRow>
                  <TableRow>{ci?.cifrq}</TableRow>
                  <TableRow>{ci?.ciinstl}</TableRow>
                  <TableRow>{ci?.cisal}</TableRow>
                  <TableRow>{ci?.cisec}</TableRow>
                  <TableRow>{ci?.cicub}</TableRow>
                  <TableRow>{ci?.ciodb}</TableRow>
                  <TableRow>{ci?.cilastamtpd}</TableRow>
                  <TableRow>{ci?.cilastpaydt}</TableRow>
                  <TableRow>{ci?.ciasofdt}</TableRow>
                  <TableRow>
                    <div
                      title={ci?.cisummry}
                      className="w-[165px] cursor-pointer flex mx-auto hover:text-gray-900"
                    >
                      <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                        {ci?.cisummry}
                      </div>
                      <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                    </div>
                  </TableRow>
                </tbody>
              </table>
            ))}
          </Slider>
        </div>
      </div>
    </ContainerTile>
  );
};

export default CreditInstrument;
