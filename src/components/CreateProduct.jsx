import useRACInfo from "../Utils/useRACInfo";
import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed, RowChanged, Warning } from "./Toasts";
import LoadingState from "./LoadingState";
import useGlobalConfig from "../Utils/useGlobalConfig";
import useAllProjectInfo from "../Utils/useAllProjectInfo";

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

const projectOptionsInitial = [
  { value: "p1", label: "Cash Project" },
  { value: "p2", label: "BNPL Project" },
  { value: "p3", label: "Overdraft Project" },
];

const CreateProduct = () => {
  const navigate = useNavigate();
  const [eligibleCustomerType, setEligibleCustomerType] = useState([]);
  const [interestPeriodType, setInterestPeriodType] = useState([]);
  const [tenureType, setTenureType] = useState([]);
  const [racType, setRacType] = useState("");
  const [fee, setFee] = useState("");
  const [productTypeName, setProductTypeName] = useState("");
  const [racOptions, setRacOptions] = useState(racOptionsInitial);
  const RACDataInfo = useRACInfo();
  const [projectType, setProjectType] = useState("");
  const [projectOptions, setProjectOptions] = useState(projectOptionsInitial);
  const ProjectDataInfo = useAllProjectInfo();
  const [notice, setNotice] = useState(false);
  const [initialTenureType, setInitialTenureType] = useState([]);
  const [initialInterestPeriodType, setInitialInterestPeriodType] = useState(
    []
  );
  const [newInterest, setNewInterest] = useState("");
  const [newTenure, setNewTenure] = useState("");
  const [disabledRAC, setDisabledRAC] = useState(false);

  useEffect(() => {
    const formattedRACData = RACDataInfo.map(({ name, href }) => ({
      value: href.replace("/newrac/", ""),
      label: name,
    }));
    setRacOptions(formattedRACData);
  }, [RACDataInfo]);

  useEffect(() => {
    const formattedProjectData = ProjectDataInfo.map(({ name, href }) => ({
      value: href.replace("/project/", ""),
      label: name,
    }));
    setProjectOptions(formattedProjectData);
    console.log(projectOptions);
  }, [ProjectDataInfo]);

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

  const [inputList, setInputList] = useState([]);
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
    // toast.custom((t) => (
    //   <Warning
    //     t={t}
    //     toast={toast}
    //     title={"Notice!"}
    //     message={"Please click the save button to ensure your entry is saved"}
    //   />
    // ));
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
      // tenureType: tenureType.value,
      productType: productTypeName,
      racId: racType.value,
      isDisableRac: disabledRAC,
      projectId: projectType.value,
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/loan-products",
        {
          method: "POST",
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
        setNotice(false);
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Success"}
            message={"Product Created Successfully !!"}
          />
        ));
        setTimeout(() => {
          navigate("/product/");
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="flex gap-5 border-b border-gray-300 pb-5 items-end">
          <div className="relative">
            <label
              htmlFor="eligibleCustomerType"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Eligible Customer Type
            </label>
            <Select
              className="w-[180px]"
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
            <label
              htmlFor="productTypeName"
              className=" px-1 text-xs text-gray-900"
            >
              Product Type
            </label>
            <input
              type="text"
              name="productTypeName"
              value={productTypeName}
              onChange={(e) => setProductTypeName(e.target.value)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Cash Loan"
            />
          </div>
          <div className="relative">
            <label htmlFor="fee" className=" px-1 text-xs text-gray-900">
              Processing Fee
            </label>
            <input
              type="text"
              name="fee"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="block w-28 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="1%"
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
              className="w-[240px]"
              options={racOptions}
              name="rac"
              value={racType}
              onChange={(racselectedOption) => setRacType(racselectedOption)}
              isSearchable={false}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="project"
              className=" bg-white px-1 text-xs text-gray-900"
            >
              Project
            </label>
            <Select
              className="w-[240px]"
              options={projectOptions}
              name="project"
              value={projectType}
              onChange={(productselectedOption) =>
                setProjectType(productselectedOption)
              }
              isSearchable={false}
            />
          </div>
          <div className="relative mt-1">
            <label
              htmlFor={`isDisableRac`}
              className=" text-gray-900 block text-xs text-center w-20 mb-2"
            >
              Disable RAC
            </label>
            <div className="flex h-6 justify-center">
              <input
                id={`isDisableRac`}
                value={disabledRAC}
                checked={disabledRAC}
                onChange={(e) => setDisabledRAC(e.target.checked)}
                name="isDisableRac"
                type="checkbox"
                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
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

export default CreateProduct;
