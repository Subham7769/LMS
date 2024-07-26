import LoanConfig from "./LoanConfig";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useParams, useNavigate } from "react-router-dom";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";

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
  const [loanConfigData, setLoanConfigData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorFlag, setErrorFlag] = useState(false);
  const { userID } = useParams();
  const navigate = useNavigate(); // Adding useNavigate  for navigation
  useEffect(() => {
    updateLoanOptions();
  }, []);

  async function updateLoanOptions() {
    const postData = {
      msisdn: "966500666496",
      firstNameEn: "MOHAMMED",
      lastNameEn: "ABIDABRAHIM",
      middleNameEn: "MAHMOUD",
      firstNameAr: "محمد",
      lastNameAr: "عبيد ابراهيم",
      middleNameAr: "محمود",
      gender: "M",
      dateOfBirth: "1983-07-29",
      idType: "IQAMA ID",
      idNumber: userID,
      idExpiryDate: "2030-08-24",
      nationality: "لبنان",
      nationalityId: 122,
      occupation: "N/A",
      residenceDetails: {
        buildingNumber: "4083",
        streetName: "اغادير",
        city: "الرياض",
        cityId: 85,
        neighborhood: "الملك عبد العزيز",
        postOfficeBox: "12233",
        additionalNumbers: "7787",
        unitNumber: "1",
        rent: true,
        homeOwnership: 0,
        residentialType: "VILLA",
      },
      maritalDetails: {
        maritalStatus: "Married",
        noOfDomesticWorkers: 0,
        noOfChildren: 3,
        totalDependent: 5,
        breadWinner: true,
        noOfDependentsInPrivateSchools: "2",
        noOfDependentsInPublicSchools: "0",
      },
      totalMonthlyExpenses: 0.0,
      monthlyExpenses: {
        RE: 0.0,
        FLE: 0.0,
        TE: 0.0,
        CE: 0.0,
        UE: 0.0,
        EE: 0.0,
        HHE: 0.0,
        HCE: 0.0,
        IP: 0.0,
        EDT: 0.0,
        MR: 0.0,
        OMR: 0.0,
      },
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-registration-service/lmscarbon/api/v1/borrowers/" +
          userID,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (data.status === 404) {
        console.log("User Not Found"); // Clear the token
        navigate("/user"); // Redirect to login page
        return; // Stop further execution
      }
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const json = await data.json();
      // console.log(json);
      setregistrationResultsData(json);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (registrationResultsData.length === 0) return;

    const eligibleProjects =
      registrationResultsData.registrationResults.projects.filter(
        (project) => project.isRegister === true
      );
    console.log(eligibleProjects);
    const formattedRACData = eligibleProjects.map(({ loanProducts }) => ({
      value: loanProducts[0].productName,
      label: loanProducts[0].productName.replace(/_/g, " "),
    }));

    setloanTypeOptions(formattedRACData);
    // console.log(registrationResultsData);
  }, [registrationResultsData]);

  const handleSave = async () => {
    const postData = {
      loan_type: loanType.target.value,
      customer_type: "CONSUMER",
      amount: amount,
    };
    try {
      const token = localStorage.getItem("authToken");
      const data = await fetch(
        "https://api-test.lmscarbon.com/carbon-offers-service/lmscarbon/api/v1/borrowers/" +
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
      const json = await data.json();
      setLoanConfigData(json);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loanConfigData.length === 0) return;
    console.log(loanConfigData);
      setShowModal(true);
      setErrorFlag(false);
  },[loanConfigData])

  useEffect(() => {
    if (loanType?.target?.value !== "CASH_LOAN_V1" && loanType?.target?.value !== "BNPL_LOAN") {
      setamount('');
    }
  }, [loanType]); // Depend on loanType changes

  return (
    <>
      <div className="grid grid-cols-5 gap-4 items-end">
        <InputSelect labelName={"Loan Type"} inputName={"loanType"} inputOptions={loanTypeOptions} inputValue={loanType} onChange={(loanselectedOption) => setloanType(loanselectedOption)} searchable={false} />
        {loanType?.target?.value === "CASH_LOAN_V1" || loanType?.target?.value === "BNPL_LOAN" ? (
          <InputNumber labelName={"Amount"} inputName={"amount"} inputValue={amount} onChange={(e) => setamount(e.target.value)} placeHolder={"5000"}/>
        ) : (
          null
        )}
        <div>
          <Button buttonIcon={CheckCircleIcon} rectangle={true} buttonName={"Submit"} onClick={handleSave}/>
        </div>
      </div>
      {showModal ? (
        <LoanConfig
          visible={showModal}
          loanConfigDataProp={loanConfigData}
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
