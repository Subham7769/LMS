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
import { RowChanged, Warning } from "./Toasts";
import LoadingState from "./LoadingState";

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
  const [tenureType, setTenureType] = useState([]);
  const [racType, setRacType] = useState("");
  const [fee, setFee] = useState("");
  const [racOptions, setRacOptions] = useState(racOptionsInitial);
  const RACDataInfo = useRACInfo();
  const [notice, setNotice] = useState(false);
  const [initialTenureType, setInitialTenureType] = useState([]);
  const [initialInterestPeriodType, setInitialInterestPeriodType] = useState(
    []
  );
  const [newInterest, setNewInterest] = useState("");
  const [newTenure, setNewTenure] = useState("");
  const [delay, setDelay] = useState(false);

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
      setInitialInterestPeriodType(formattedPER);
      const formattedTenureType = {
        value: productConfigData.tenureType,
        label: productConfigData.tenureType,
      };
      setTenureType(formattedTenureType);
      setInitialTenureType(formattedTenureType);
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

  // For Tracking if the user is changing PER or Tenure Type
  useEffect(() => {
    if (
      JSON.stringify(tenureType) === JSON.stringify(initialTenureType) &&
      JSON.stringify(interestPeriodType) ===
        JSON.stringify(initialInterestPeriodType)
    ) {
      setNotice(false);
    } else {
      setNotice(true);
    }
  }, [tenureType, interestPeriodType]);

  const [inputList, setInputList] = useState([
    {
      interestRate: "",
      tenure: "",
    },
  ]);
  const handleAddFields = () => {
    setInputList([
      {
        interestRate: newInterest,
        tenure: newTenure,
      },
      ...inputList,
    ]);
    setNewTenure("");
    setNewInterest("");
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Notice!"}
        message={"Please click the save button to ensure your entry is saved"}
      />
    ));
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
    setNotice(false);
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Deleted!"}
        message={"Please click the save button to confirm removal of entry"}
      />
    ));
  };
  const handleSave = async () => {
    const token = localStorage.getItem("authToken"); // Retrieve the authentication token
    // if (newInterest && newTenure) {
    //   handleAddFields();
    // }

    // Define the data to be sent with the POST request
    const postData = {
      eligibleCustomerType: eligibleCustomerType.value,
      fee: fee,
      interestEligibleTenure: inputList,
      interestPeriodType: interestPeriodType.value,
      tenureType: tenureType.value,
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
        setNotice(false);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  if (productConfigData?.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex items-center justify-between ">
          {/* <div className="text-lg">{productConfigData.productType}</div> */}
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
              className="w-[200px]"
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
          {/* <div className="relative">
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
          </div> */}
          <div className="relative">
            <label
              htmlFor="rac"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              RAC
            </label>
            <Select
              className="w-[300px]"
              options={racOptions}
              // id={`rac_${item.id}`}
              name="rac"
              value={racType}
              // onChange={(newValue) => handleDDChange("rac", newValue, index)}
              onChange={(racselectedOption) => setRacType(racselectedOption)}
              isSearchable={false}
            />
          </div>
          <div className="relative mt-6">
            <button
              onClick={handleAddFields}
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <PlusIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        {notice && (
          <p className="text-red-500 font-bold text-sm text-start mt-2">
            Please Note that changing the PER/Tenure Type will change it for all
            loans
          </p>
        )}
        <div className="flex gap-5 items-end mt-5 border-b pb-5">
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
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="2%"
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
            <label htmlFor="tenure" className=" px-1 text-xs text-gray-900">
              Tenure
            </label>
            <input
              type="number"
              name="tenure"
              value={newTenure}
              onChange={(e) => setNewTenure(e.target.value)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="3"
            />
          </div>
          <div className="relative">
            <label
              htmlFor="tenureType"
              className=" bg-white px-1 text-xs text-gray-900 gray-"
            >
              Tenure Type
            </label>
            <Select
              className="w-36"
              options={options}
              // id={`per_${item.id}`}
              name="tenureType"
              value={tenureType}
              onChange={(tenureType) => {
                setTenureType(tenureType);
              }}
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
            <div className="relative">
              <label
                htmlFor="tenureType"
                className=" bg-white px-1 text-xs text-gray-900 gray-"
              >
                Tenure Type
              </label>
              <Select
                className="w-36"
                options={options}
                // id={`per_${item.id}`}
                name="tenureType"
                value={tenureType}
                onChange={(tenureType) => {
                  setTenureType(tenureType);
                }}
                isSearchable={false}
              />
            </div>
            {/* <button
              onClick={() => handleSave()}
              type="button"
              className="rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button> */}
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
