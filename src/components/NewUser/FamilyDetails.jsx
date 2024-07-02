import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState";

const maritalOptions = [
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
];

const booleanOptions = [
  { value: true, label: "true" },
  { value: false, label: "false" },
];

function FamilyDetails() {
  const [clientData, setClientData] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [noOfDomesticWorkers, setDomesticWorkers] = useState("");
  const [noOfChildren, setNoChildren] = useState("");
  const [totalDependent, setTotalDependent] = useState("");
  const [noOfDependentsInPrivateSchools, setPrivateSchool] = useState("");
  const [noOfDependentsInPublicSchools, setPublicSchool] = useState("");
  const [breadWinner, setBreadWinner] = useState([]);
  const { userID } = useParams();
  const token = localStorage.getItem("authToken");
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/";
  const url2 = `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/${userID}/borrower-profile`;

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
    const payload = {
      maritalDetails: {
        maritalStatus: maritalStatus.value,
        noOfDomesticWorkers: noOfDomesticWorkers,
        noOfChildren: noOfChildren,
        totalDependent: totalDependent,
        noOfDependentsInPrivateSchools: noOfDependentsInPrivateSchools,
        noOfDependentsInPublicSchools: noOfDependentsInPublicSchools,
        breadWinner: breadWinner.value,
      },
    };
    try {
      const response = await fetch(url2, {
        method: "PUT",
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

  useEffect(() => {
    if (clientData.length === 0) {
      console.log("Fetching data");
    } else {
      const formattedMS = {
        value: clientData.borrowerProfile.maritalDetails.maritalStatus,
        label: clientData.borrowerProfile.maritalDetails.maritalStatus,
      };
      setMaritalStatus(formattedMS);
      setDomesticWorkers(
        clientData.borrowerProfile.maritalDetails.noOfDomesticWorkers
      );
      setNoChildren(clientData.borrowerProfile.maritalDetails.noOfChildren);
      setTotalDependent(
        clientData.borrowerProfile.maritalDetails.totalDependent
      );
      setPrivateSchool(
        clientData.borrowerProfile.maritalDetails.noOfDependentsInPrivateSchools
      );
      setPublicSchool(
        clientData.borrowerProfile.maritalDetails.noOfDependentsInPublicSchools
      );
      const formattedBreadWinner = {
        value: clientData.borrowerProfile.maritalDetails.breadWinner,
        label: `${clientData.borrowerProfile.maritalDetails.breadWinner}`,
      };
      setBreadWinner(formattedBreadWinner);
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
          Name: <b>Family Details</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Marital Status */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="maritalStatus"
              >
                Marital Status
              </label>
              <Select
                name="maritalStatus"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={maritalOptions}
                value={maritalStatus}
                onChange={(e) => setMaritalStatus(e)}
              />
            </div>

            {/* No. of Domestic Workers */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="noOfDomesticWorkers"
              >
                No. of Domestic Workers
              </label>
              <input
                type="number"
                name="noOfDomesticWorkers"
                value={noOfDomesticWorkers}
                onChange={(e) => setDomesticWorkers(e.target.value)}
                placeholder="1"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* No. of Children */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="noOfChildren"
              >
                No. of Children
              </label>
              <input
                type="number"
                name="noOfChildren"
                value={noOfChildren}
                onChange={(e) => setNoChildren(e.target.value)}
                placeholder="3"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Total Dependents */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="totalDependent"
              >
                Total Dependents
              </label>
              <input
                type="number"
                name="totalDependent"
                value={totalDependent}
                onChange={(e) => setTotalDependent(e.target.value)}
                placeholder="4"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>

            {/* Dependents in Private School */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="noOfDependentsInPrivateSchools"
              >
                Dependents in Private School
              </label>
              <input
                type="number"
                name="noOfDependentsInPrivateSchools"
                value={noOfDependentsInPrivateSchools}
                onChange={(e) => setPrivateSchool(e.target.value)}
                placeholder="2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Dependents in Public School */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="noOfDependentsInPublicSchools"
              >
                Dependents in Public School
              </label>
              <input
                type="number"
                name="noOfDependentsInPublicSchools"
                value={noOfDependentsInPublicSchools}
                onChange={(e) => setPublicSchool(e.target.value)}
                placeholder="2"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            {/* Bread Winner */}
            <div className="col-span-1">
              <label
                className="block text-gray-700 px-1 text-[14px]"
                htmlFor="breadWinner"
              >
                Bread Winner
              </label>
              <Select
                name="breadWinner"
                className="focus:ring focus:ring-blue-600 pb-2"
                options={booleanOptions}
                value={breadWinner}
                onChange={(e) => setBreadWinner(e)}
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

export default FamilyDetails;
