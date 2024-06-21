import useRACInfo from "../utils/useRACInfo";
import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  PencilIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import Select from "react-select";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Passed, RowChanged, Warning } from "./Toasts";
import LoadingState from "./LoadingState";
import useGlobalConfig from "../utils/useGlobalConfig";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import useAllProjectInfo from "../utils/useAllProjectInfo";

const options = [
  { value: "DAILY", label: "DAILY" },
  { value: "WEEKLY", label: "WEEKLY" },
  { value: "MONTHLY", label: "MONTHLY" },
  { value: "YEARLY", label: "YEARLY" },
];

const tenureTypeOptions = [
  { value: "DAY", label: "DAY" },
  { value: "WEEK", label: "WEEK" },
  { value: "MONTH", label: "MONTH" },
  { value: "YEAR", label: "YEAR" },
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

const tclOptionsInitial = [
  { value: "T1", label: "TCL 1" },
  { value: "T2", label: "TCL 2" },
  { value: "T3", label: "TCL 3" },
];

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
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
  const [managementFee, setManagementFee] = useState("");
  const [noOfEmis, setNoOfEmis] = useState("");
  const [refinanced, setRefinanced] = useState(null);
  const url = "project-system-configs";
  const [systemData, setSystemData] = useState([]);
  const systemConfigData = useGlobalConfig(url);
  const [projectId2, setProjectId2] = useState("");
  const [projectName, setProjectName] = useState("");
  const [triggerValue, setTriggerValue] = useState("");
  const [disabledRAC, setDisabledRAC] = useState(false);
  const [bnplBoolean, setBNPL] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [projectType, setProjectType] = useState("");
  const [projectOptions, setProjectOptions] = useState(projectOptionsInitial);
  const ProjectDataInfo = useAllProjectInfo();
  const [tclType, setTclType] = useState(tclOptionsInitial[0]);
  const [tclOptions, setTclOptions] = useState(tclOptionsInitial);

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    } else if (sortConfig.key === column && sortConfig.direction === "desc") {
      direction = ""; // This will reset the sort
    }
    setSortConfig({ key: column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig.key === column) {
      if (sortConfig.direction === "asc") {
        return <FaSortAmountDown className="ml-2" />;
      } else if (sortConfig.direction === "desc") {
        return <FaSortAmountUp className="ml-2" />;
      }
    }
    return <FaSort className="ml-2" title="Sort Data" />;
  };

  const toggleEdit = (index) => {
    setEditingIndex(editingIndex === index ? null : index);
  };

  useEffect(() => {
    if (systemConfigData.length > 0) {
      const matchedData = systemConfigData.filter(
        (data) => data.projectId === projectId
      );

      if (matchedData.length > 0) {
        setSystemData(matchedData);
      }
    }
  }, [systemConfigData, projectId]);

  useEffect(() => {
    if (systemData.length > 0) {
      setManagementFee(systemData[0].managementFeeVat);
      setNoOfEmis(systemData[0].numberOfEmisForEarlySettlement);
      setRefinanced(systemData[0].refinancedWith);
      setProjectId2(systemData[0].projectId);
      setProjectName(systemData[0].projectName);
      setTriggerValue(systemData[0].triggerValue);
      setBNPL(systemData[0].bnpl);
    }
  }, [systemData]);

  useEffect(() => {
    getProductInfo();
  }, [productType]);

  async function getProductInfo() {
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/loan-products/" +
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
      // setTenureType(formattedTenureType);
      setTenureType(tenureTypeOptions[2]);
      setInitialTenureType(formattedTenureType);
      setDisabledRAC(productConfigData.disableRac);
      setRacType(
        racOptions.find((option) => option.value === productConfigData.racId)
      );
      setProjectType(
        projectOptions.find(
          (option) => option.value === productConfigData.projectId
        )
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

  useEffect(() => {
    const formattedProjectData = ProjectDataInfo.map(({ name, href }) => ({
      value: href.replace("/project/", ""),
      label: name,
    }));
    setProjectOptions(formattedProjectData);
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
      isDisableRac: disabledRAC,
      projectId: projectType.value,
    };

    try {
      // POST request to add new fields
      const postResponse = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/loan-products/" +
          loanProId,
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

  async function handleBoth() {
    await handleSystemChanges();
    await handleSave();
  }

  async function handleSystemChanges() {
    const token = localStorage.getItem("authToken");
    const targetData = {
      projectId: projectId2,
      projectName: projectName,
      managementFeeVat: managementFee,
      numberOfEmisForEarlySettlement: noOfEmis,
      refinancedWith: refinanced,
      triggerValue: triggerValue,
      isBnpl: bnplBoolean,
    };
    console.log(targetData);
    try {
      const response = await fetch(
        "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/configs/project-system-configs",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(targetData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log(`Data for ${projectName} saved successfully`);
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Saved Successfully"}
            message={`The item ${projectName} has been updated`}
          />
        ));
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Page Changed"}
        message={`You have switched to page: ${newPage}`}
      />
    ));
  };

  const sortedItems = [...inputList].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Determine total number of pages
  const totalPages = Math.ceil(inputList.length / itemsPerPage);

  function informUser() {
    toast.custom((t) => (
      <Warning
        t={t}
        toast={toast}
        title={"Not Yet Saved"}
        message={"Please click the save button to confirm changes"}
      />
    ));
  }

  if (productConfigData?.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="border-b border-gray-300 pb-5">
          <div className="flex gap-5 items-end pb-7">
            <div className="relative">
              <label
                htmlFor="eligibleCustomerType"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                Eligible Customer Type
              </label>
              <Select
                className="w-[170px]"
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
                htmlFor="rac"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                RAC
              </label>
              <Select
                className="w-[230px]"
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
                className="w-[200px]"
                options={projectOptions}
                name="project"
                value={projectType}
                onChange={(projectSelectedOption) =>
                  setProjectType(projectSelectedOption)
                }
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="project"
                className=" bg-white px-1 text-xs text-gray-900"
              >
                TCL
              </label>
              <Select
                className="w-[180px]"
                options={tclOptions}
                name="project"
                value={tclType}
                onChange={(tclSelectedOption) => setTclType(tclSelectedOption)}
                isSearchable={false}
              />
            </div>
            <button
              type="button"
              onClick={handleBoth}
              className="w-9 h-9 rounded-md bg-indigo-600 p-2 ml-4 mt-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="flex gap-5 items-end">
            <div className="relative">
              <label htmlFor="fee" className=" px-1 text-xs text-gray-900">
                <div className="absolute -top-2">Processing Fee</div>
              </label>
              <input
                type="text"
                name="fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="block w-16 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="1%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`managementFeeVat`}
                className=" px-1 text-xs text-gray-900"
              >
                <div className="absolute -top-2">Management Fee Vat</div>
              </label>
              <input
                type="text"
                name="managementFeeVat"
                value={managementFee}
                onChange={(e) => setManagementFee(e.target.value)}
                className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="15%"
              />
            </div>
            <div className="relative">
              <label
                htmlFor={`numberOfEmisForEarlySettlement`}
                className=" px-1 text-xs text-gray-900"
              >
                <div className="absolute -top-2">
                  No. of Installments For Early Settlement
                </div>
              </label>
              <input
                type="number"
                name="numberOfEmisForEarlySettlement"
                value={noOfEmis}
                onChange={(e) => setNoOfEmis(e.target.value)}
                className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="3"
              />
            </div>
            <div className="relative mt-1">
              <label
                htmlFor={`refinaceWith`}
                className=" text-gray-900 block text-xs text-center w-16 mb-2"
              >
                <div className="absolute -top-8">Refinanced With</div>
              </label>
              <div className="flex h-6 justify-center">
                <input
                  id={`refinancedWith`}
                  value={refinanced}
                  checked={refinanced}
                  onChange={(e) => setRefinanced(e.target.checked)}
                  name="refinancedWith"
                  type="checkbox"
                  className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
            <div className="relative mt-1">
              <label
                htmlFor={`isDisableRac`}
                className=" text-gray-900 block text-xs text-center w-16 mb-2"
              >
                <div className="absolute -top-8">Disable RAC</div>
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
              options={tenureTypeOptions}
              // id={`per_${item.id}`}
              name="tenureType"
              defaultValue={tenureTypeOptions[0]}
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
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" onClick={() => handleSort("interestRate")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Simple Interest {getSortIcon("interestRate")}
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("interestPeriodType")}
                >
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    PER {getSortIcon("interestPeriodType")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("tenure")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Tenure {getSortIcon("tenure")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("tenureType")}>
                  <div className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Tenure Type {getSortIcon("tenureType")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length < 1 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          name="interestRate"
                          value={item.interestRate}
                          onChange={(e) => handleChange(e, index)}
                          className="block w-full max-w-[120px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="2%"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestRate}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <Select
                          className="w-[150px]"
                          options={options}
                          name="interestPeriodType"
                          value={interestPeriodType}
                          onChange={(interestPeriodType) => {
                            setInterestPeriodType(interestPeriodType);
                          }}
                          isSearchable={false}
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {interestPeriodType
                            ? interestPeriodType.label
                            : "Select"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <input
                          type="number"
                          name="tenure"
                          value={item.tenure}
                          onChange={(e) => handleChange(e, index)}
                          className="block w-[100px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          placeholder="3"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.tenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <Select
                          className="w-[150px]"
                          options={tenureTypeOptions}
                          name="tenureType"
                          value={tenureType}
                          onChange={(tenureType) => {
                            setTenureType(tenureType);
                          }}
                          isSearchable={false}
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {tenureType ? tenureType.label : "Select"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2">
                      <button onClick={() => toggleEdit(index)} type="button">
                        {editingIndex === index ? (
                          <div
                            onClick={informUser}
                            className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            <CheckCircleIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <PencilIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        className="w-9 h-9 rounded-full bg-red-600 p-2 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="mt-4 w-[60%] flex justify-center gap-5 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || currentItems.length < 1}
              className={`flex items-center px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-500"
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
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
      </div>
    </>
  );
};

export default LoanProductConfig;
