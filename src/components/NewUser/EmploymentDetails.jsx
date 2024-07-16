import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";

function EmploymentDetails() {
  // Params Data, API urls and Auth Token
  const { userID } = useParams();
  const token = localStorage.getItem("authToken");
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/";
  const url2 = `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1//borrowers/emp-test-info/${userID}`;

  // Data States
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    basicWage: "",
    housingAllowance: "",
    employerName: "",
    workingMonths: "",
    employmentStatus: "",
    establishmentActivity: "",
  });

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setClientData(data);
      setLoading(false);
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: ",
        error.message
      );
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The infomation has been updated successfully"}
          />
        ));
        fetchData();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  useEffect(() => {
    if (clientData.length === 0) {
      console.log("Fetching data");
    } else {
      const employmentInfo = clientData.recentGosiData.employmentStatusInfo[0];
      const assignedValues = {
        fullName: employmentInfo.fullName,
        basicWage: employmentInfo.basicWage,
        housingAllowance: employmentInfo.housingAllowance,
        employerName: employmentInfo.employerName,
        workingMonths: employmentInfo.workingMonths,
        employmentStatus: employmentInfo.employmentStatus,
        establishmentActivity: employmentInfo.establishmentActivity,
      };
      setFormData(assignedValues);
    }
  }, [clientData]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <h2 className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md w-1/5 cursor-pointer">
          <b>Employment Details</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Full Name */}
            <div className="col-span-1">
              <InputText
                labelName="Full Name"
                inputName="fullName"
                placeHolder="John Doe"
                inputValue={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Basic Wage */}
            <div className="col-span-1">
              <InputNumber
                labelName="Basic Wage"
                inputName="basicWage"
                placeHolder="4000"
                inputValue={formData.basicWage}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Housing Allowance */}
            <div className="col-span-1">
              <InputNumber
                labelName="Housing Allowance"
                inputName="housingAllowance"
                placeHolder="1000"
                inputValue={formData.housingAllowance}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Employer Name */}
            <div className="col-span-1">
              <InputText
                labelName="Employer Name"
                inputName="employerName"
                placeHolder="John"
                inputValue={formData.employerName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Working Months */}
            <div className="col-span-1">
              <InputNumber
                labelName="Working Months"
                inputName="workingMonths"
                placeHolder="24"
                inputValue={formData.workingMonths}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Employment Status */}
            <div className="col-span-1">
              <InputText
                labelName="Employment Status"
                inputName="employmentStatus"
                placeHolder="Unemployed"
                inputValue={formData.employmentStatus}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Establishment Activity */}
            <div className="col-span-1">
              <InputText
                labelName="Establishment Activity"
                inputName="establishmentActivity"
                placeHolder="Developer"
                inputValue={formData.establishmentActivity}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
          <div className="flex items-center justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={updateData}
              className="inline-flex items-center gap-x-1.5 mt-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-44 justify-center"
            >
              <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmploymentDetails;
