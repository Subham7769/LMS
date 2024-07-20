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
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { RowChanged, Warning } from "./Toasts";
import LoadingState from "./LoadingState";
import useDBInfo from "../utils/useDBInfo";
import useBEInfo from "../utils/useBEInfo";
import useCreditScoreEq from "../utils/useCreditScoreEq";
import useRulePolicy from "../utils/useRulePolicy";
import useTCLInfo from "../utils/useTCLInfo";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import useAllProjectInfo from "../utils/useAllProjectInfo";
import InputSelect from "./Common/InputSelect/InputSelect";
import InputText from "./Common/InputText/InputText";
import InputCheckbox from "./Common/InputCheckbox/InputCheckbox";
import InputNumber from "./Common/InputNumber/InputNumber";
import {
  tenureOptions,
  tenureTypeOptions,
  options,
  recoveryOptions,
} from "../data/OptionsData";

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
  const navigate = useNavigate();
  // Initial Data
  const [productConfigData, setProductConfigData] = useState([]);

  // Custom Hooks
  const RACDataInfo = useRACInfo();
  const DBRConfigInfo = useDBInfo();
  const BEDataInfo = useBEInfo();
  const RPDataInfo = useRulePolicy();
  const CSDataInfo = useCreditScoreEq();
  const TCLDataInfo = useTCLInfo();

  // Options
  const [dbrOptions, setDbrOptions] = useState([]);
  const [beOptions, setBeOptions] = useState([]);
  const [rpOptions, setRpOptions] = useState([]);
  const [csOptions, setCsOptions] = useState([]);
  const [racOptions, setRacOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [TCLOptions, setTCLOptions] = useState([]);

  // New Data States
  const [newInterest, setNewInterest] = useState("");
  const [newTenure, setNewTenure] = useState("");

  // Sort & Pagination
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const ProjectDataInfo = useAllProjectInfo();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    loanProductId: "",
    blockEmployersTempId: "",
    creditScoreEqTempId: "",
    creditScoreEtTempId: "",
    dbcTempId: "",
    disableRac: null,
    eligibleCustomerType: "",
    fee: "",
    interestEligibleTenure: [{ interestRate: "", tenure: "" }],
    interestPeriodType: "",
    managementFeeVat: "",
    numberOfEmisForEarlySettlement: "",
    productType: "",
    projectId: "",
    racId: "",
    refinancedWith: null,
    rulePolicyTempId: "",
    tclFileId: "",
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));

    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
      
    }
  };

  console.log(formData);

  useEffect(() => {
    if (productConfigData.length === 0) {
      console.log("Fetching Product Config Data");
    } else {
      const assignedData = {
        loanProductId: productConfigData.loanProductId,
        blockEmployersTempId: productConfigData.blockEmployersTempId,
        creditScoreEqTempId: productConfigData.creditScoreEqTempId,
        creditScoreEtTempId: productConfigData.creditScoreEtTempId,
        dbcTempId: productConfigData.dbcTempId,
        disableRac: productConfigData.disableRac,
        eligibleCustomerType: productConfigData.eligibleCustomerType,
        fee: productConfigData.fee,
        interestEligibleTenure: productConfigData.interestEligibleTenure.map(
          (tenure) => ({
            interestRate: tenure.interestRate || "",
            tenure: tenure.tenure || "",
          })
        ),
        interestPeriodType: productConfigData.interestPeriodType,
        managementFeeVat: productConfigData.managementFeeVat,
        numberOfEmisForEarlySettlement:
          productConfigData.numberOfEmisForEarlySettlement,
        productType: productConfigData.productType,
        projectId: productConfigData.projectId,
        racId: productConfigData.racId,
        refinancedWith: productConfigData.refinancedWith,
        rulePolicyTempId: productConfigData.rulePolicyTempId,
        tclFileId: productConfigData.tclFileId,

      };
      setFormData(assignedData);
    }
  }, [productConfigData]);

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
    getProductInfo();
  }, [productType, projectId]);

  async function getProductInfo() {
    setProductConfigData([]);
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/" +
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
      setLoading(false);
      //   window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const formattedRACData = RACDataInfo.map(({ name, href }) => ({
      value: href.replace("/newrac/", ""),
      label: name,
    }));
    const formattedCSData = CSDataInfo.map(({ name, href }) => ({
      value: href.replace("/credit-score/", ""),
      label: name,
    }));
    const finalData = DBRConfigInfo.map(({ name, href }) => ({
      value: href.replace("/newdbc/", ""),
      label: name,
    }));
    const formattedProjectData = ProjectDataInfo.map(({ name, href }) => ({
      value: href.replace("/project/", ""),
      label: name,
    }));
    const formattedBEData = BEDataInfo.map(({ name, href }) => ({
      value: href.replace("/blocked-employer/", ""),
      label: name,
    }));
    const rpData = RPDataInfo.map(({ name, href }) => ({
      value: href.replace("/rule-policy/", ""),
      label: name,
    }));
    const formattedTCLData = TCLDataInfo.map(({ name, href }) => ({
      value: href.replace("/tcl/", ""),
      label: name,
    }));

    setRacOptions(formattedRACData);
    setDbrOptions(finalData);
    setProjectOptions(formattedProjectData);
    setBeOptions(formattedBEData);
    setRpOptions(rpData);
    setCsOptions(formattedCSData);
    setTCLOptions(formattedTCLData)
  }, [
    RACDataInfo,
    DBRConfigInfo,
    ProjectDataInfo,
    BEDataInfo,
    RPDataInfo,
    CSDataInfo,
    TCLDataInfo
  ]);

  const handleAddFields = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interestEligibleTenure: [
        ...prevFormData.interestEligibleTenure,
        {
          interestRate: newInterest,
          tenure: newTenure,
        },
      ],
    }));
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

  const handleInterestChange = (index, field, value) => {
    const updatedInterestTenure = formData.interestEligibleTenure.map(
      (item, idx) => {
        if (index === idx) {
          return { ...item, [field]: value };
        }
        return item;
      }
    );
    setFormData((prevState) => ({
      ...prevState,
      interestEligibleTenure: updatedInterestTenure,
    }));
  };
  const handleDelete = (index) => {
    const deleteList = [...formData.interestEligibleTenure];
    deleteList.splice(index, 1);
    setFormData((prevState) => ({ ...prevState, interestEligibleTenure: deleteList }));
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

    // Define the data to be sent with the POST request
    const postData = {
      blockEmployersTempId: formData.blockEmployersTempId,
      creditScoreEqTempId: formData.creditScoreEqTempId,
      creditScoreEtTempId: formData.creditScoreEtTempId,
      dbcTempId: formData.dbcTempId,
      eligibleCustomerType: formData.eligibleCustomerType,
      fee: formData.fee,
      interestEligibleTenure: formData.interestEligibleTenure,
      interestPeriodType: formData.interestPeriodType,
      isDisableRac: formData.disableRac,
      managementFeeVat: formData.managementFeeVat,
      numberOfEmisForEarlySettlement: formData.numberOfEmisForEarlySettlement,
      productType: formData.productType,
      projectId: formData.projectId,
      racId: formData.racId,
      refinancedWith: formData.refinancedWith,
      rulePolicyTempId: formData.rulePolicyTempId,
      tclFileId: formData.tclFileId,
    };

    try {
      const postResponse = await fetch(
        "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/" +
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
      }
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

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

  const sortedItems = [...formData.interestEligibleTenure].sort((a, b) => {
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
  const totalPages = Math.ceil(
    formData.interestEligibleTenure.length / itemsPerPage
  );

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

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <div className="border-b border-gray-300 pb-5">
          <div className="grid grid-cols-5 gap-5 items-end pb-2">
            <div className="relative">
              <InputSelect
                labelName="Eligible Customer Type"
                inputOptions={tenureOptions}
                inputName="eligibleCustomerType"
                inputValue={
                  formData.eligibleCustomerType
                    ? formData.eligibleCustomerType
                    : ""
                }
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="RAC"
                inputOptions={racOptions}
                inputName="racId"
                inputValue={formData.racId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Project"
                inputOptions={projectOptions}
                inputName="projectId"
                inputValue={formData.projectId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="TCL"
                inputOptions={TCLOptions}
                inputName="tclFileId"
                inputValue={formData.tclFileId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-9 h-9 rounded-md bg-indigo-600 p-2 ml-4 mt-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-5 gap-5 items-end mb-4">
            <div className="relative mt-1">
              <InputSelect
                inputOptions={recoveryOptions}
                labelName="Recovery Type"
                inputName="recoveryType"
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="DBR Config"
                inputOptions={dbrOptions}
                inputName="dbcTempId"
                inputValue={formData.dbcTempId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Blocked Employer"
                inputOptions={beOptions}
                inputName="blockEmployersTempId"
                inputValue={formData.blockEmployersTempId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
            <div className="relative">
              <InputSelect
                labelName="Rule Policy"
                inputOptions={rpOptions}
                inputName="rulePolicyTempId"
                inputValue={formData.rulePolicyTempId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 items-end">
            <div className="relative">
              <InputSelect
                labelName="Credit Score Rule"
                inputOptions={csOptions}
                inputName="creditScoreEqTempId"
                inputValue={formData.creditScoreEqTempId}
                onChange={handleInputChange}
                isSearchable={false}
              />
            </div>
          </div>
          <div className="grid grid-cols-5 gap-5 items-end">
            <div className="relative mt-4">
              <InputText
                labelName="Processing Fee"
                inputName="fee"
                inputValue={formData.fee}
                onChange={handleInputChange}
                placeHolder="1%"
              />
            </div>
            <div className="relative mt-4">
              <InputText
                labelName="Management Fee Vat"
                inputName="managementFeeVat"
                inputValue={formData.managementFeeVat}
                onChange={handleInputChange}
                placeHolder="15%"
              />
            </div>
            <div className="relative mt-4">
              <InputText
                labelName="No. of Installments For Early Settlement"
                inputName="numberOfEmisForEarlySettlement"
                inputValue={formData.numberOfEmisForEarlySettlement}
                onChange={handleInputChange}
                placeHolder="3"
              />
            </div>

            <div className="relative mb-2">
              <InputCheckbox
                labelName="Refinanced With"
                inputChecked={formData.refinancedWith}
                onChange={handleInputChange}
                inputName="refinancedWith"
              />
            </div>
            <div className="relative mb-2">
              <InputCheckbox
                labelName="Disable RAC"
                inputChecked={formData.disableRac}
                onChange={handleInputChange}
                inputName="disableRac"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-5 items-end mt-5 border-b pb-5">
          <div className="relative">
            <InputText
              labelName="Simple Interest"
              inputName="interestRate"
              inputValue={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeHolder="2%"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="PER"
              inputOptions={options}
              inputName="interestPeriodType"
              inputValue={formData.interestPeriodType}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative">
            <label htmlFor="tenure" className=" px-1 text-xs text-gray-900">
              Tenure
            </label>
            <InputNumber
              inputName="tenure"
              inputValue={newTenure}
              onChange={(e) => setNewTenure(e.target.value)}
              placeHolder="3"
            />
          </div>
          <div className="relative">
            <InputSelect
              labelName="Tenure Type"
              inputOptions={tenureTypeOptions}
              inputName="tenureType"
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
                        <InputText
                          inputName={`interestRate-${index}`}
                          inputValue={item.interestRate}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "interestRate",
                              e.target.value
                            )
                          }
                          placeHolder="2%"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestRate}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={options}
                          inputName="interestPeriodType"
                          inputValue={formData.interestPeriodType}
                          onChange={handleInputChange}
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {formData.interestPeriodType
                            ? formData.interestPeriodType
                            : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputNumber
                          inputName={`tenure-${index}`}
                          inputValue={item.tenure}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "tenure",
                              e.target.value
                            )
                          }
                          placeHolder="3"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.tenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={tenureTypeOptions}
                          inputName="tenureType"
                          isSearchable={false}
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {""}
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
          <div className="mt-4 w-full flex justify-center gap-5 items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center px-4 py-2 rounded-md ${currentPage === 1
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
              className={`flex items-center px-4 py-2 rounded-md ${currentPage === totalPages
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
