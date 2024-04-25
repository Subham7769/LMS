import { CBDetails } from "../../config";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const CreditInstrument = () => {
  const cidetail =
    CBDetails.response.message.item[0].rspreport.consumer[0].cidetails.cidetail;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <>
      <div className="flex  items-start">
        <table className="divide-y divide-gray-300 border-r border-gray-300 ">
          <thead>
            <tr className="divide-x divide-gray-200">
              <th className="py-3.5 px-4 text-center">Credit Instrument</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Creditor
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Product
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Account Number
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Credit Limit
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Issue Date
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Product Expire Date
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Status
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Closed Date
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Tenure
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Payment Frequency
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Instalment Amount
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Consumer Sallary
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Security Type
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Outstanding Balance
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Past Due Balance
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Last Amount Paid
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Last Payment Date
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                As Of Date
              </td>
            </tr>
            <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
              <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                Summary
              </td>
            </tr>
          </tbody>
        </table>
        <div className="w-[1005px]">
          <Slider {...settings}>
            {cidetail.map((ci, index) => {
              return (
                <table
                  key={index}
                  className="divide-y divide-gray-300 border-r border-gray-300 w-[200px]"
                >
                  <thead>
                    <tr className="divide-x divide-gray-200">
                      <th className="py-3.5 px-4 text-center">{index + 1}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cicrdtr}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciprd}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          title={ci.ciaccno}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.ciaccno}
                          </div>
                          <div>
                            <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cilimit}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciissudt}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciprodexpdt}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cistatus}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciclsddt}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.citnr}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cifrq}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciinstl}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cisal}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cisec}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cicub}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciodb}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cilastamtpd}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.cilastpaydt}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        {ci.ciasofdt}
                      </td>
                    </tr>
                    <tr className="divide-x divide-gray-200 text-center w-full h-[58px]">
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div
                          title={ci.cisummry}
                          className="w-[168px] cursor-pointer flex mx-auto hover:text-gray-900"
                        >
                          <div className="w-[152px] whitespace-nowrap overflow-hidden text-ellipsis">
                            {ci.cisummry}
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

export default CreditInstrument;
