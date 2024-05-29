import useRACInfo from "./utils/useRACInfo";
import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged } from "./Toasts";

const options = [
  { value: "DAILY", label: "DAILY" },
  { value: "WEEKLY", label: "WEEKLY" },
  { value: "MONTHLY", label: "MONTHLY" },
  { value: "YEARLY", label: "YEARLY" },
];

const tenureOptions = [
  { value: "CORPORATE", label: "CORPORATE" },
  { value: "E_COMMERCE", label: "E_COMMERCE" },
  { value: "CONSUMER", label: "CONSUMER" },
];

const racOptionsInitial = [
  { value: "r1", label: "Cash Product RAC" },
  { value: "r2", label: "BNPL Product RAC" },
  { value: "r3", label: "Overdraft Product RAC" },
];

const LoanProductConfig = () => {
  const { productType } = useParams();
  const navigate = useNavigate();
  const [productConfigData, setProductConfigData] = useState([]);
  const [eligibleCustomerType, setEligibleCustomerType] = useState([]);
  const [interestPeriodType, setInterestPeriodType] = useState([]);
  const [racType, setRacType] = useState("");
  const [fee, setFee] = useState("");
  const [racOptions, setRacOptions] = useState(racOptionsInitial);
  const RACDataInfo = useRACInfo();

  useEffect(() => {
    getProductInfo();
  }, [productType]);

  async function getProductInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xcbe/api/v1/configs/loan-products/" +
          productType,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const productConfigDetails = await data.json();
      // console.log(racDetails);
      setProductConfigData(productConfigDetails);
      //   window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    if (productConfigData.length === 0) {
      console.log("Fetching data");
    } else {
      setFee(productConfigData.fee);
      const formattedCustomerType = {
        value: productConfigData.eligibleCustomerType,
        label: productConfigData.eligibleCustomerType,
      };
      const formattedPER = {
        value: productConfigData.interestPeriodType,
        label: productConfigData.interestPeriodType,
      };
      setEligibleCustomerType(formattedCustomerType);
      setInterestPeriodType(formattedPER);
      setRacType(
        racOptions.find((option) => option.value === productConfigData.racId)
      );
      setInputList(productConfigData.interestEligibleTenure);
    }
  }, [productConfigData]);

  useEffect(() => {
    const formattedRACData = RACDataInfo.map(({ name, href }) => ({
      value: href.replace("/newrac/", ""),
      label: name,
    }));
    setRacOptions(formattedRACData);
  }, [RACDataInfo]);
  const [inputList, setInputList] = useState([
    {
      interestRate: "",
      tenure: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      ...inputList,
      {
        interestRate: "",
        tenure: "",
      },
    ]);
  };
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
  const handleDelete = (index) => {
    const deleteList = [...inputList];
    deleteList.splice(index, 1);
    setInputList(deleteList);
  };
  const handleSave = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token

    // Define the data to be sent with the POST request
    const postData = {
      eligibleCustomerType: eligibleCustomerType.value,
      fee: fee,
      interestEligibleTenure: inputList,
      interestPeriodType: interestPeriodType.value,
      productType: productConfigData.productType,
      racId: racType.value,
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "https://api-dev.lmscarbon.com/carbon-product-service/xcbe/api/v1/configs/loan-products/" +
          productType,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!postResponse.ok) {
        throw new Error(`HTTP error! Status: ${postResponse.status}`);
      } else if (postResponse.ok) {
        toast.custom((t) => <RowChanged t={t} toast={toast} />);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };
  if (productConfigData.length === 0) {
    return <>Fetching Data</>;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          <div className="text-lg">{productConfigData.productType}</div>
          <button
            onClick={handleAddFields}
            type="button"
            className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="flex gap-5 border-b border-gray-300 pb-5">
          <div className="relative">
            <label
              htmlFor="eligibleCustomerType"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Eligible Customer Type
            </label>
            <Select
              className="w-40"
              options={tenureOptions}
              // id={`tenureType_${item.id}`}
              name="eligibleCustomerType"
              value={eligibleCustomerType}
              onChange={(eligibleCustomerType) => {
                setEligibleCustomerType(eligibleCustomerType);
              }}
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label htmlFor="fee" className=" px-1 text-xs text-gray-900">
              Processing Fee
            </label>
            <input
              type="text"
              name="fee"
              // id={`minCredit_${item.id}`}
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="1%"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="interestPeriodType"
              className=" bg-white px-1 text-xs text-gray-900 gray-"
            >
              PER
            </label>
            <Select
              className="w-36"
              options={options}
              // id={`per_${item.id}`}
              name="interestPeriodType"
              value={interestPeriodType}
              onChange={(interestPeriodType) => {
                setInterestPeriodType(interestPeriodType);
              }}
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="rac"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              RAC
            </label>
            <Select
              className="w-44"
              options={racOptions}
              // id={`rac_${item.id}`}
              name="rac"
              value={racType}
              // onChange={(newValue) => handleDDChange("rac", newValue, index)}
              onChange={(racselectedOption) => setRacType(racselectedOption)}
              isSearchable={false}
            />
          </div>
        </div>
        {inputList.map((item, index) => (
          <div key={index} className="flex gap-5 items-end mt-5">
            <div className="relative">
              <label
                htmlFor="interestRate"
                className="px-1 text-xs text-gray-900"
              >
                Simple Interest
              </label>
              <input
                type="text"
                name="interestRate"
                // id={`simpleInterest_${item.id}`}
                value={item.interestRate}
                onChange={(e) => handleChange(e, index)}
                className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="2%"
              />
            </div>
            <div className="relative">
              <label htmlFor="tenure" className=" px-1 text-xs text-gray-900">
                Tenure
              </label>
              <input
                type="number"
                name="tenure"
                // id={`tenure_${item.id}`}
                value={item.tenure}
                onChange={(e) => handleChange(e, index)}
                className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="3"
              />
            </div>
            {/* <div className="relative">
            <label
              htmlFor={`minCredit_${item.id}`}
              className=" px-1 text-xs text-gray-900"
            >
              Min Credit Score
            </label>
            <input
              type="number"
              name="minCredit"
              id={`minCredit_${item.id}`}
              value={item.minCredit}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.3"
            />
          </div>
          <div className="relative">
            <label
              htmlFor={`maxCredit_${item.id}`}
              className=" px-1 text-xs text-gray-900"
            >
              Max Credit Score
            </label>
            <input
              type="number"
              name="maxCredit"
              id={`maxCredit_${item.id}`}
              value={item.maxCredit}
              onChange={(e) => handleChange(e, item.id)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="2"
            />
          </div> */}
            <button
              onClick={() => handleDelete(index)}
              type="button"
              className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        ))}
        <div className="text-right mt-5">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default LoanProductConfig;
