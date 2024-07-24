import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import { maritalOptions, booleanOptions } from "../../data/OptionsData";
import Button from "../Common/Button/Button";

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

  const handleChange = (e) => {
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
      setFormData({
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
      });
    }
  }, [clientData]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2
        className="mb-5 px-3 py-2 hover:bg-gray-100 rounded-md w-1/5 cursor-pointer"
        title="Family Details"
      >
        <b>Family Details</b>
      </h2>
      <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
        <form className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Marital Status */}
            <InputSelect
              labelName="Marital Status"
              inputName="maritalStatus"
              className="focus:ring focus:ring-blue-600 pb-2"
              inputOptions={maritalOptions}
              inputValue={formData.maritalStatus}
              onChange={handleChange}
            />
          {/* No. of Domestic Workers */}
            <InputNumber
              labelName="No. of Domestic Workers"
              inputName="noOfDomesticWorkers"
              inputValue={formData.noOfDomesticWorkers}
              onChange={handleChange}
              placeHolder="1"
              required
            />
          {/* No. of Children */}
            <InputNumber
              labelName="No. of Children"
              inputName="noOfChildren"
              inputValue={formData.noOfChildren}
              onChange={handleChange}
              placeHolder="3"
              required
            />
          {/* Total Dependents */}
            <InputNumber
              labelName="Total Dependents"
              inputName="totalDependent"
              inputValue={formData.totalDependent}
              onChange={handleChange}
              placeHolder="4"
              required
            />
          {/* Dependents in Private School */}
            <InputNumber
              labelName="Dependents in Private School"
              inputName="noOfDependentsInPrivateSchools"
              inputValue={formData.noOfDependentsInPrivateSchools}
              onChange={handleChange}
              placeHolder="2"
            />
          {/* Dependents in Public School */}
            <InputNumber
              labelName="Dependents in Public School"
              name="noOfDependentsInPublicSchools"
              value={formData.noOfDependentsInPublicSchools}
              onChange={handleChange}
              placeHolder="2"
            />
          {/* Bread Winner */}
            <InputSelect
              labelName="Bread Winner"
              inputName="breadWinner"
              inputOptions={booleanOptions}
              inputValue={formData.breadWinner}
              onChange={handleChange}
            />
        </form>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button buttonIcon={CheckCircleIcon} buttonName={"Update"} onClick={updateData} rectangle={true}/>
        </div>
      </div>
    </>
  );
}

export default FamilyDetails;
