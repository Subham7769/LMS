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
import { RowChanged, Warning } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import { FaSort, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import DynamicName from "../Common/DynamicName/DynamicName";
import Button from "../Common/Button/Button";
import {
  tenureOptions,
  tenureTypeOptions,
  options,
} from "../../data/OptionsData";
import ProductInputFields from "./ProductInputFields";
import { fetchProductData } from "../../redux/Slices/sidebarSlice";
import { useDispatch } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
  const navigate = useNavigate();
  // Initial Data
  const [productConfigData, setProductConfigData] = useState([]);
  const dispatch = useDispatch();

  // Sort & Pagination
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
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
    overdraft: null,
    productType: "",
    projectId: "",
    racId: "",
    refinancedWith: null,
    rulePolicyTempId: "",
    tclFileId: "",
    recoveryEquationTempId: "",
  });

  const handleChange = (e) => {
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
            interestRate: tenure.interestRate,
            interestPeriodType: tenure.interestPeriodType,
            loanTenure: tenure.loanTenure,
            loanTenureType: tenure.loanTenureType,
            repaymentTenure: tenure.repaymentTenure,
            repaymentTenureType: tenure.repaymentTenureType,
          })
        ),
        interestPeriodType: productConfigData.interestPeriodType,
        managementFeeVat: productConfigData.managementFeeVat,
        numberOfEmisForEarlySettlement:
          productConfigData.numberOfEmisForEarlySettlement,
        overdraft: productConfigData.overdraft,
        productType: productConfigData.productType,
        projectId: productConfigData.projectId,
        racId: productConfigData.racId,
        refinancedWith: productConfigData.refinancedWith,
        rulePolicyTempId: productConfigData.rulePolicyTempId,
        tclFileId: productConfigData.tclFileId,
        recoveryEquationTempId: productConfigData.recoveryEquationTempId,
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
        `${import.meta.env.VITE_PRODUCT_READ}${productType}`,
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

  const handleInterestChange = (index, field, eventOrValue) => {
    // Determine if the input is an event object or a value
    const value =
      eventOrValue && eventOrValue.target
        ? eventOrValue.target.value
        : eventOrValue.value || eventOrValue;

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

  const handleDelete = (indexInPage) => {
    const absoluteIndex = indexOfFirstItem + indexInPage;
    const deleteList = [...formData.interestEligibleTenure];
    deleteList.splice(absoluteIndex, 1);
    setFormData((prevState) => ({
      ...prevState,
      interestEligibleTenure: deleteList,
    }));
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
      disableRac: formData.disableRac,
      managementFeeVat: formData.managementFeeVat,
      numberOfEmisForEarlySettlement: formData.numberOfEmisForEarlySettlement,
      overdraft: formData.overdraft,
      productType: formData.productType,
      projectId: formData.projectId,
      racId: formData.racId,
      refinancedWith: formData.refinancedWith,
      rulePolicyTempId: formData.rulePolicyTempId,
      tclFileId: formData.tclFileId,
      recoveryEquationTempId: formData.recoveryEquationTempId,
    };

    try {
      const postResponse = await fetch(
        `${import.meta.env.VITE_PRODUCT_UPDATE}${loanProId}`,
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

  async function handleProductNameChange(newName) {
    toast.loading("Updating name, please wait...", { duration: 3000 });
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${import.meta.env.VITE_PRODUCT_READ}${productType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check for token expiration or invalid token
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }

      const productConfigDetails = await response.json();

      // Replace the data of the field
      productConfigDetails.productType = newName;

      // Rename disableRac to isDisableRac and keep its value
      // productConfigDetails.isDisableRac = productConfigDetails.disableRac;
      // delete productConfigDetails.disableRac;

      // Submit the updated data back using PUT request
      const updateResponse = await fetch(
        `${import.meta.env.VITE_PRODUCT_UPDATE}${loanProId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productConfigDetails),
        }
      );

      // Check if the update was successful
      if (updateResponse.ok) {
        toast.success("Name Updated, redirecting...");
        navigate(
          `/product/${newName}/loan-product-config/${projectId}/${loanProId}`
        );
        window.location.reload();
      } else {
        console.error(
          "Failed to update product info",
          await updateResponse.text()
        );
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  const handleDeleteLoanProduct = async (deleteURL) => {
    try {
      const token = localStorage.getItem("authToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_PRODUCT_DELETE}${deleteURL}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the item");
      }
      dispatch(fetchProductData());
      navigate("/product");
      // Refresh the page after navigation
      // window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
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

  // Sort the items based on sortConfig
  const sortedItems = [...formData.interestEligibleTenure].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Calculate the indices for current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

  // Determine total number of pages
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

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
      <div className="flex justify-between items-center mb-5">
        <DynamicName
          initialName={productType}
          onSave={handleProductNameChange}
        />
        <Button
          buttonIcon={TrashIcon}
          onClick={() => handleDeleteLoanProduct(loanProId)}
          circle={true}
        />
      </div>
      <ContainerTile>
        <ProductInputFields
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
        <div>
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" onClick={() => handleSort("interestRate")}>
                  <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Simple Interest {getSortIcon("interestRate")}
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("interestPeriodType")}
                >
                  <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    PER {getSortIcon("interestPeriodType")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("LoanTenure")}>
                  <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Loan Tenure {getSortIcon("LoanTenure")}
                  </div>
                </th>
                <th scope="col" onClick={() => handleSort("tenureType")}>
                  <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Loan Tenure Type {getSortIcon("tenureType")}
                  </div>
                </th>

                <th scope="col" onClick={() => handleSort("RepaymentTenure")}>
                  <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Repayment Tenure {getSortIcon("RepaymentTenure")}
                  </div>
                </th>
                <th
                  scope="col"
                  onClick={() => handleSort("RepaymentTenureType")}
                >
                  <div className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider cursor-pointer flex">
                    Repayment Tenure Type {getSortIcon("RepaymentTenureType")}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider"
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
                          inputName={`interestPeriodType-${index}`}
                          inputValue={item.interestPeriodType}
                          onChange={(selectedOption) =>
                            handleInterestChange(
                              index,
                              "interestPeriodType",
                              selectedOption
                            )
                          }
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.interestPeriodType
                            ? item.interestPeriodType
                            : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputNumber
                          inputName={`loanTenure-${index}`}
                          inputValue={item.loanTenure}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "loanTenure",
                              e.target.value
                            )
                          }
                          placeHolder="3"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.loanTenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={tenureTypeOptions}
                          inputName={`loanTenureType-${index}`}
                          inputValue={item.loanTenureType}
                          onChange={(selectedOption) =>
                            handleInterestChange(
                              index,
                              "loanTenureType",
                              selectedOption
                            )
                          }
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.loanTenureType ? item.loanTenureType : ""}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputNumber
                          inputName={`repaymentTenure-${index}`}
                          inputValue={item.repaymentTenure}
                          onChange={(e) =>
                            handleInterestChange(
                              index,
                              "repaymentTenure",
                              e.target.value
                            )
                          }
                          placeHolder="3"
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.repaymentTenure}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingIndex === index ? (
                        <InputSelect
                          inputOptions={tenureTypeOptions}
                          inputName={`repaymentTenureType-${index}`}
                          inputValue={item.repaymentTenureType}
                          onChange={(selectedOption) =>
                            handleInterestChange(
                              index,
                              "repaymentTenureType",
                              selectedOption
                            )
                          }
                        />
                      ) : (
                        <span className="block w-full py-1.5 text-gray-900 sm:text-sm sm:leading-6">
                          {item.repaymentTenureType
                            ? item.repaymentTenureType
                            : ""}
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
                      <Button
                      buttonIcon={TrashIcon}
                      onClick={() => handleDelete(index)}
                      circle={true}
                    />
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
      </ContainerTile>
    </>
  );
};

export default LoanProductConfig;
