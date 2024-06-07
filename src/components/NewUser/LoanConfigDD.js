import LoanConfig from "./LoanConfig";
import Select from "react-select";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import LoadingState from "../LoadingState";

const loanTypeOptionsInitital = [
  { value: "Cash loan", label: "Cash Loan" },
  { value: "BNPL", label: "BNPL" },
];

const LoanConfigDD = () => {
  const [loanType, setloanType] = useState([]);
  const [amount, setamount] = useState("");
  const [showModal, setShowModal] = useState(false); // State to track the index of the clicked button
  const [loanTypeOptions, setloanTypeOptions] = useState(
    loanTypeOptionsInitital
  );
  const [registrationResultsData, setregistrationResultsData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  // useEffect(() => {
  //   updateLoanOptions();
  // }, []);

  // async function updateLoanOptions() {
  //   const postData = {
  //     msisdn: "966500666496",
  //     firstNameEn: "MOHAMMED",
  //     lastNameEn: "ABIDABRAHIM",
  //     middleNameEn: "MAHMOUD",
  //     firstNameAr: "محمد",
  //     lastNameAr: "عبيد ابراهيم",
  //     middleNameAr: "محمود",
  //     gender: "M",
  //     dateOfBirth: "1983-07-29",
  //     idType: "IQAMA ID",
  //     idNumber: userID,
  //     idExpiryDate: "2030-08-24",
  //     nationality: "لبنان",
  //     nationalityId: 122,
  //     occupation: "N/A",
  //     residenceDetails: {
  //       buildingNumber: "4083",
  //       streetName: "اغادير",
  //       city: "الرياض",
  //       cityId: 85,
  //       neighborhood: "الملك عبد العزيز",
  //       postOfficeBox: "12233",
  //       additionalNumbers: "7787",
  //       unitNumber: "1",
  //       rent: true,
  //       homeOwnership: 0,
  //       residentialType: "VILLA",
  //     },
  //     maritalDetails: {
  //       maritalStatus: "Married",
  //       noOfDomesticWorkers: 0,
  //       noOfChildren: 3,
  //       totalDependent: 5,
  //       breadWinner: true,
  //       noOfDependentsInPrivateSchools: "2",
  //       noOfDependentsInPublicSchools: "0",
  //     },
  //     totalMonthlyExpenses: 0.0,
  //     monthlyExpenses: {
  //       RE: 0.0,
  //       FLE: 0.0,
  //       TE: 0.0,
  //       CE: 0.0,
  //       UE: 0.0,
  //       EE: 0.0,
  //       HHE: 0.0,
  //       HCE: 0.0,
  //       IP: 0.0,
  //       EDT: 0.0,
  //       MR: 0.0,
  //       OMR: 0.0,
  //     },
  //   };
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const data = await fetch(
  //       "https://api-dev.lmscarbon.com/carbon-registration-service/xcbe/api/v1/borrowers/" +
  //         userID,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(postData),
  //       }
  //     );
  //     if (data.status === 404) {
  //       console.log("User Not Found"); // Clear the token
  //       navigate("/user"); // Redirect to login page
  //       return; // Stop further execution
  //     }
  //     // Check for token expiration or invalid token
  //     if (data.status === 401 || data.status === 403) {
  //       localStorage.removeItem("authToken"); // Clear the token
  //       navigate("/login"); // Redirect to login page
  //       return; // Stop further execution
  //     }
  //     const json = await data.json();
  //     // console.log(json);
  //     setregistrationResultsData(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // if (registrationResultsData.length === 0) {
  //   return (
  //     <>
  //       <LoadingState />
  //     </>
  //   );
  // }

  // const eligibleProjects = registrationResultsData.registrationResults.filter(
  //   (result) => result.eligibleStatus === "ELIGIBLE"
  // );

  // console.log(eligibleProjects);

  const handleSave = async () => {
    const postData = {
      loan_type: loanType.value,
      customer_type: "CONSUMER",
      amount: amount,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-dev.lmscarbon.com/carbon-offers-service/xcbe/api/v1/borrowers/" +
          userID +
          "/loans/configurations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 400) {
        const errorData = await data.json();
        setErrorMessage(errorData.message);
        setErrorFlag(true);
        setShowModal(false);
        return; // Stop further execution
      }
      setShowModal(true);
      setErrorFlag(false);
    } catch (error) {
      console.error(error);
    }
    // setShowModal(true);
  };
  return (
    <>
      <div className="flex gap-4 items-end">
        <div className="relative">
          <label
            htmlFor="loanType"
            className=" bg-white px-1 text-xs text-gray-900"
          >
            Loan Type
          </label>
          <Select
            className="w-44"
            options={loanTypeOptions}
            name="loanType"
            value={loanType}
            onChange={(loanselectedOption) => setloanType(loanselectedOption)}
            isSearchable={false}
          />
        </div>
        {loanType.value === "BNPL" ? (
          <div className="relative">
            <label htmlFor="amount" className=" px-1 text-xs text-gray-900">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              className="block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="5000"
            />
          </div>
        ) : (
          ""
        )}
        <div className="">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Submit
          </button>
        </div>
      </div>
      {showModal ? (
        <LoanConfig
          visible={showModal}
          loanType={loanType.value}
          amount={amount}
        />
      ) : (
        ""
      )}
      {errorFlag ? (
        <div className="mt-5 text-red-400 font-medium">{errorMessage}</div>
      ) : (
        ""
      )}
    </>
  );
};

export default LoanConfigDD;
