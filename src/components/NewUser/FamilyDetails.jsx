import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import { maritalOptions, booleanOptions } from "../../data/OptionsData";

function FamilyDetails() {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    maritalStatus: "",
    noOfDomesticWorkers: "",
    noOfChildren: "",
    totalDependent: "",
    noOfDependentsInPrivateSchools: "",
    noOfDependentsInPublicSchools: "",
    breadWinner: "",
  });

  // Params Data, API urls and Authorisation Token
  const { userID } = useParams();
  const token = localStorage.getItem("authToken");
  const url =
    "https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/api/v1/borrowers/";
  const url2 = `https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/${userID}/borrower-profile`;

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
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ maritalDetails: formData }),
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

  const handleInputChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [userID]);

  useEffect(() => {
    if (clientData.length === 0) {
      console.log("Fetching data");
    } else {
      const assignedValues = {
        maritalStatus: clientData.borrowerProfile.maritalDetails.maritalStatus,
        noOfDomesticWorkers:
          clientData.borrowerProfile.maritalDetails.noOfDomesticWorkers,
        noOfChildren: clientData.borrowerProfile.maritalDetails.noOfChildren,
        totalDependent:
          clientData.borrowerProfile.maritalDetails.totalDependent,
        noOfDependentsInPrivateSchools:
          clientData.borrowerProfile.maritalDetails
            .noOfDependentsInPrivateSchools,
        noOfDependentsInPublicSchools:
          clientData.borrowerProfile.maritalDetails
            .noOfDependentsInPublicSchools,
        breadWinner: clientData.borrowerProfile.maritalDetails.breadWinner,
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
        <h2
          className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md w-1/5 cursor-pointer"
          title="Family Details"
        >
          <b>Family Details</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Marital Status */}
            <div className="col-span-1">
              <InputSelect
                labelName="Marital Status"
                inputName="maritalStatus"
                className="focus:ring focus:ring-blue-600 pb-2"
                inputOptions={maritalOptions}
                inputValue={formData.maritalStatus}
                onChange={handleInputChange}
              />
            </div>

            {/* No. of Domestic Workers */}
            <div className="col-span-1">
              <InputNumber
                labelName="No. of Domestic Workers"
                inputName="noOfDomesticWorkers"
                inputValue={formData.noOfDomesticWorkers}
                onChange={handleInputChange}
                placeHolder="1"
                required
              />
            </div>

            {/* No. of Children */}
            <div className="col-span-1">
              <InputNumber
                labelName="No. of Children"
                inputName="noOfChildren"
                inputValue={formData.noOfChildren}
                onChange={handleInputChange}
                placeHolder="3"
                required
              />
            </div>

            {/* Total Dependents */}
            <div className="col-span-1">
              <InputNumber
                labelName="Total Dependents"
                inputName="totalDependent"
                inputValue={formData.totalDependent}
                onChange={handleInputChange}
                placeHolder="4"
                required
              />
            </div>

            {/* Dependents in Private School */}
            <div className="col-span-1">
              <InputNumber
                labelName="Dependents in Private School"
                inputName="noOfDependentsInPrivateSchools"
                inputValue={formData.noOfDependentsInPrivateSchools}
                onChange={handleInputChange}
                placeHolder="2"
              />
            </div>

            {/* Dependents in Public School */}
            <div className="col-span-1">
              <InputNumber
                labelName="Dependents in Public School"
                name="noOfDependentsInPublicSchools"
                value={formData.noOfDependentsInPublicSchools}
                onChange={handleInputChange}
                placeHolder="2"
              />
            </div>

            {/* Bread Winner */}
            <div className="col-span-1">
              <InputSelect
                labelName="Bread Winner"
                inputName="breadWinner"
                inputOptions={booleanOptions}
                inputValue={formData.breadWinner}
                onChange={handleInputChange}
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
