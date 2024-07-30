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
import ListTable from "../Common/ListTable/ListTable";

const LoanProductConfig = () => {
  const { productType, loanProId, projectId } = useParams();
  const navigate = useNavigate();
  // Initial Data
  const [productConfigData, setProductConfigData] = useState([]);

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

  async function handleProductNameChange(newName) {
    toast.loading("Updating name, please wait...", { duration: 3000 });
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${productType}`,
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
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${loanProId}`,
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
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/configs/loan-products/${deleteURL}`,
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
      navigate("/product");
      // Refresh the page after navigation
      window.location.reload();

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
          className={
            "bg-red-600 hover:bg-red-500 focus-visible:outline-red-600"
          }
        />
      </div>
      <div className="shadow-md rounded-xl pb-8 pt-6 px-5 border border-red-600">
        <ProductInputFields
          formData={formData}
          handleChange={handleChange}
          setFormData={setFormData}
        />
        <div>
          <ListTable
            ListHeader={[
              "Simple Interest",
              "PER",
              "Tenure",
              "Tenure Type",
              "Repayment Tenure",
              "Repayment Tenure Type",
              "Actions",
            ]}
            ListItem={formData.interestEligibleTenure
              .filter(
                (item) =>
                  item.interestRate &&
                  item.interestPeriodType &&
                  item.loanTenure &&
                  item.loanTenureType &&
                  item.repaymentTenure &&
                  item.repaymentTenureType
              )
              .map((item) => ({
                interestRate: item.interestRate,
                interestPeriodType: item.interestPeriodType,
                loanTenure: item.loanTenure,
                loanTenureType: item.loanTenureType,
                repaymentTenure: item.repaymentTenure,
                repaymentTenureType: item.repaymentTenureType,
              }))}
            Divider={true}
            Sortable={true}
            Editable={true}
            HandleAction={handleDelete}
          />
        </div>
        <div className="text-right mt-5">
          <Button
            buttonIcon={CheckCircleIcon}
            buttonName={"Save"}
            onClick={handleSave}
            rectangle={true}
          />
        </div>
      </div>
    </>
  );
};

export default LoanProductConfig;
