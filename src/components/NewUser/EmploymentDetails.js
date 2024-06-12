import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState";

function EmploymentDetails() {
  const [clientData, setClientData] = useState([]);
  const [fullName, setFullName] = useState("");
  const [basicWage, setBasicWage] = useState("");
  const [housingAllowance, setHousingAllowance] = useState("");
  const [employerName, setEmployerName] = useState("");
  // const [dateOfJoining, setDateOfJoining] = useState(null);
  const [workingMonths, setWorkingMonths] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  // const [workingMonthsFromGosi, setWorkingMonthsFromGosi] = useState("");
  // const [salaryStartingDate, setSalaryStartingDate] = useState(null);
  const [establishmentActivity, setEstablishmentActivity] = useState("");
  // const [totalDeductions, setTotalDeductions] = useState("");
  const { userID } = useParams();
  const token = localStorage.getItem("authToken");
  const url =
    "http://10.10.10.70:32014/carbon-product-service/xcbe/api/v1/borrowers/";
  const url2 = `http://10.10.10.70:32014/carbon-registration-service/xcbe/api/v1//borrowers/emp-test-info/${userID}`;

  const fetchData = async () => {
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
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation: ",
        error.message
      );
    }
  };

  const updateData = async (e) => {
    e.preventDefault();
    // const formattedJoiningDate = `${dateOfJoining} 00:00:00`;
    // const formattedstartDate = `${salaryStartingDate} 00:00:00`;
    const payload = {
      fullName: fullName,
      basicWage: basicWage,
      housingAllowance: housingAllowance,
      employerName: employerName,
      // dateOfJoining: formattedJoiningDate,
      workingMonths: workingMonths,
      employmentStatus: employmentStatus,
      // workingMonthsFromGosi: workingMonthsFromGosi,
      // salaryStartingDate: formattedstartDate,
      establishmentActivity: establishmentActivity,
      // totalDeductions: totalDeductions,
    };
    try {
      const response = await fetch(url2, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
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

  const formattedDate = (date) => {
    if (date.includes("/")) {
      // Convert dd/mm/yy to yyyy-mm-dd
      const [day, month, year] = date.split("/");
      return `20${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    } else {
      // Return the first 10 characters
      return date.substring(0, 10);
    }
  };

  useEffect(() => {
    if (clientData.length === 0) {
      console.log("Fetching data");
    } else {
      const employmentInfo = clientData.recentGosiData.employmentStatusInfo[0];
      setFullName(employmentInfo.fullName);
      setBasicWage(employmentInfo.basicWage);
      setHousingAllowance(employmentInfo.housingAllowance);
      setEmployerName(employmentInfo.employerName);
      // setDateOfJoining(formattedDate(employmentInfo?.dateOfJoining));
      setWorkingMonths(employmentInfo.workingMonths);
      setEmploymentStatus(employmentInfo.employmentStatus);
      // setWorkingMonthsFromGosi(employmentInfo.workingMonthsFromGosi);
      // setSalaryStartingDate(formattedDate(employmentInfo?.salaryStartingDate));
      setEstablishmentActivity(employmentInfo.establishmentActivity);
      // setTotalDeductions(employmentInfo.totalDeductions);
    }
  }, [clientData]);

  if (clientData.length === 0) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <h2 className="mb-5">
          Name: <b>Employment Details</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Full Name */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Basic Wage */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="basicWage"
              >
                Basic Wage
              </label>
              <input
                type="number"
                name="basicWage"
                placeholder="4000"
                value={basicWage}
                onChange={(e) => setBasicWage(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Housing Allowance */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="housingAllowance"
              >
                Housing Allowance
              </label>
              <input
                type="number"
                name="housingAllowance"
                placeholder="1000"
                value={housingAllowance}
                onChange={(e) => setHousingAllowance(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Employer Name */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="employerName"
              >
                Employer Name
              </label>
              <input
                type="text"
                name="employerName"
                placeholder="John"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Date of Joining
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="dateOfJoining"
              >
                Date of Joining
              </label>
              <input
                type="date"
                name="dateOfJoining"
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div> */}

            {/* Working Months */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="workingMonths"
              >
                Working Months
              </label>
              <input
                type="number"
                name="workingMonths"
                placeholder="24"
                value={workingMonths}
                onChange={(e) => setWorkingMonths(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Employment Status */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="employmentStatus"
              >
                Employment Status
              </label>
              <input
                type="text"
                name="employmentStatus"
                placeholder="Unemployed"
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Working Months From Gosi */}
            {/* <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="workingMonthsFromGosi"
              >
                Working Months From Gosi
              </label>
              <input
                type="number"
                name="workingMonthsFromGosi"
                placeholder="24"
                value={workingMonthsFromGosi}
                onChange={(e) => setWorkingMonthsFromGosi(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div> */}

            {/* Salary Starting Date */}
            {/* <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="salaryStartingDate"
              >
                Salary Starting Date
              </label>
              <input
                type="date"
                name="salaryStartingDate"
                value={salaryStartingDate}
                onChange={(e) => setSalaryStartingDate(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div> */}

            {/* Establishment Activity */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="establishmentActivity"
              >
                Establishment Activity
              </label>
              <input
                type="text"
                name="establishmentActivity"
                placeholder="Developer"
                value={establishmentActivity}
                onChange={(e) => setEstablishmentActivity(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Total Deductions */}
            {/* <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="totalDeductions"
              >
                Total Deductions
              </label>
              <input
                type="number"
                name="totalDeductions"
                placeholder="0"
                value={totalDeductions}
                onChange={(e) => setTotalDeductions(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div> */}
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
