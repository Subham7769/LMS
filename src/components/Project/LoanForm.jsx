import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Select from "react-select";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import LoadingState from "../LoadingState";
import {
  countryOptions,
  currencyOptions,
  interestPeriodOptions,
  loanTypeOptions,
  locationOptions,
  signsOptions,
} from "../../data/CountryData";
import InputText from "../Common/InputText/InputText";
import SelectInput from "../Common/DynamicSelect/DynamicSelect";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputDate from "../Common/InputDate/InputDate";
import { InputGroup } from "../Common/InputGroup/InputGroup";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";

const LoanForm = () => {
  const [ProjectData, setProjectData] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const formattedDate = (date) => {
    return date.substring(0, 10);
  };

  const [name, setName] = useState("");
  const [projectDescription, setprojectDescription] = useState("");
  const [country, setcountry] = useState([]);
  const [location, setlocation] = useState([]);
  const [locationFlag, setLocationFlag] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [currencyName, setcurrencyName] = useState([]);
  const [loanType, setloanType] = useState([]);
  const [minLoanAmt, setMinLoanAmt] = useState("");
  const [maxLoanAmt, setMaxLoanAmt] = useState("");
  const [flatInterestRate, setFlatInterestRate] = useState("");
  const [interestRatePeriod, setInterestRatePeriod] = useState("");
  const [interestPeriodUnit, setInterestPeriodUnit] = useState([]);
  const [gracePeriodDownPayment, setGracePeriodDown] = useState("");
  const [graceForEmis, setGraceForEmis] = useState("");
  const [loanGrace, setLoanGrace] = useState("");
  const [rollOverP, setRollOverP] = useState("");
  const [rollOverF, setRollOverF] = useState("");
  const [rollOverIR, setRollOverIR] = useState("");
  const [lateEMIPenalty, setLateEmiPernalty] = useState("");
  const [maxPaymentAttempt, setMaxPaymentAttempt] = useState("");
  const [rollOverEquation, setRollOverEquation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [lateRepaymentPenalty, setLateRepaymentPenalty] = useState("");
  const [earlyRepaymentDiscount, setEarlyRepaymentDiscount] = useState("");
  const [rollOverPenaltyFactor, setRollOverPenaltyFactor] = useState("");

  // Card 2
  const [criteria, setCriteria] = useState(ProjectData?.criteria);
  const [minLoanOperator, setMinLoanOperator] = useState("");
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanOperator, setMaxLoanOperator] = useState("");
  const [maxLoanAmount, setMaxLoanAmount] = useState(0);
  const [tclOperator, setTclOperator] = useState("");
  const [tclAmount, setTclAmount] = useState(0);
  const [minInstallmentsOperator, setMinInstallmentsOperator] = useState("");
  const [minInstallmentsAmount, setMinInstallmentsAmount] = useState(0);
  const [maxInstallmentsOperator, setMaxInstallmentsOperator] = useState("");
  const [maxInstallmentsAmount, setMaxInstallmentsAmount] = useState(0);
  const [serviceFee, setServiceFee] = useState("");
  const [client, setClient] = useState("");
  const [earlyPay, setEarlyPay] = useState(null);
  const [calInterest, setCalInterest] = useState(null);
  const [hasDownPayPer, setHasDownPayPer] = useState(null);
  const [hasDownPayFix, setHasDownPayFix] = useState(null);
  const [tclFee, setTclFee] = useState(null);
  const [tclInterest, setTclInterest] = useState(null);
  const [openLoanOperator, setOpenLoanOperator] = useState("");
  const [openLoanAmount, setOpenLoanAmount] = useState(0);
  const [managementFee, setManagementFee] = useState("");
  const [vatFee, setVatFee] = useState("");

  useEffect(() => {
    getProjectInfo();
  }, [projectId]);

  async function getProjectInfo() {
    try {
      const ptoken = localStorage.getItem("projectToken");
      const data = await fetch(
        "https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects/" +
          projectId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ptoken}`,
          },
        }
      );
      // Check for token expiration or invalid token
      if (data.status === 401 || data.status === 403) {
        localStorage.removeItem("authToken"); // Clear the token
        navigate("/login"); // Redirect to login page
        return; // Stop further execution
      }
      const projectDetails = await data.json();

      // Transform the RAC data to the desired format

      console.log(projectDetails);
      setProjectData(projectDetails);
      //   // console.log(ProjectData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (ProjectData.length === 0) {
      console.log("Fetching data");
    } else {
      setName(ProjectData.name);
      setprojectDescription(ProjectData.projectDescription);
      const selectedCountry = countryOptions.find(
        (item) => item.value === ProjectData.country
      );
      const formattedcountry = {
        value: ProjectData.country,
        label: selectedCountry ? selectedCountry.label : ProjectData.country,
      };
      const formattedlocation = {
        value: ProjectData.location,
        label: ProjectData.location,
      };
      const selectedCurrency = currencyOptions.find(
        (item) => item.value === ProjectData.currencyName
      );
      const formattedcurrencyName = {
        value: ProjectData.currencyName,
        label: selectedCurrency
          ? selectedCurrency.label
          : ProjectData.currencyName,
      };
      const formattedloanType = {
        value: ProjectData.loanType,
        label: ProjectData.loanType,
      };
      setcountry(formattedcountry);
      setlocation(formattedlocation);
      setcurrencyName(formattedcurrencyName);
      setloanType(formattedloanType);
      setFlatInterestRate(ProjectData.flatInterestRate);
      setInterestRatePeriod(ProjectData.interestRatePeriod);
      const formattedInterestRatePeriodUnit = {
        value: ProjectData.interestPeriodUnit,
        label: ProjectData.interestPeriodUnit,
      };
      setInterestPeriodUnit(formattedInterestRatePeriodUnit);
      setGracePeriodDown(ProjectData.downRepaymentGracePeriod);
      setGraceForEmis(ProjectData.emiRepaymentGracePeriod);
      setLoanGrace(ProjectData.loanGracePeriod);
      setRollOverP(ProjectData.rollOverGracePeriod);
      setRollOverF(ProjectData.rollOverPenaltyFactor);
      setRollOverIR(ProjectData.rollOverInterestRate);
      setLateEmiPernalty(ProjectData.lateEmiPenaltyFactor);
      setMaxPaymentAttempt(ProjectData.maxPaymetAttemps);
      setRollOverEquation(null);
      setStartDate(formattedDate(ProjectData.startDate));
      setEndDate(formattedDate(ProjectData.endDate));
      setCriteria(ProjectData.criteria);
      setServiceFee(ProjectData.serviceFee);
      setClient(ProjectData.clientIds);
      setEarlyPay(ProjectData.hasEarlyLateRepayment);
      setCalInterest(ProjectData.calculateInterest);
      setHasDownPayPer(ProjectData.downPaymentPercentage);
      setHasDownPayFix(ProjectData.downPaymentFixed);
      setTclFee(ProjectData.tclIncludeFee);
      setTclInterest(ProjectData.tclIncludeInterest);
      setLateRepaymentPenalty(ProjectData.lateRepaymentPenalty);
      setEarlyRepaymentDiscount(ProjectData.earlyRepaymentDiscount);
      setRollOverPenaltyFactor(ProjectData.rollOverPenaltyFactor);
      setManagementFee(ProjectData.managementFee);
      setVatFee(ProjectData.vatFee);
    }
  }, [ProjectData]);

  useEffect(() => {
    const parseCriteria = (criteria) => {
      const regex = /(\w+)\s*(<=|>=|<|>|==)\s*(\d+)/g;
      let match;

      const results = {};

      while ((match = regex.exec(criteria)) !== null) {
        const [_, field, operator, amount] = match;
        results[field] = results[field] || [];
        results[field].push({ operator, amount });
      }

      if (results.tcl) {
        const formattedOperator = {
          value: results.tcl[0].operator,
          label: results.tcl[0].operator,
        };
        setTclOperator(formattedOperator);
        setTclAmount(results.tcl[0].amount);
      }

      if (results.loanAmount) {
        const formattedMinOperator = {
          value: results.loanAmount[0].operator,
          label: results.loanAmount[0].operator,
        };
        setMinLoanOperator(formattedMinOperator);
        setMinLoanAmount(results.loanAmount[0].amount);
        const formattedMaxOperator = {
          value: results.loanAmount[1].operator,
          label: results.loanAmount[1].operator,
        };
        setMaxLoanOperator(formattedMaxOperator);
        setMaxLoanAmount(results.loanAmount[1].amount);
      }

      if (results.numberOfInstallments) {
        const formattedMinOperator = {
          value: results.numberOfInstallments[0].operator,
          label: results.numberOfInstallments[0].operator,
        };
        setMinInstallmentsOperator(formattedMinOperator);
        setMinInstallmentsAmount(results.numberOfInstallments[0].amount);
        const formattedMaxOperator = {
          value: results.numberOfInstallments[1].operator,
          label: results.numberOfInstallments[1].operator,
        };
        setMaxInstallmentsOperator(formattedMaxOperator);
        setMaxInstallmentsAmount(results.numberOfInstallments[1].amount);
      }

      if (results.freqCap) {
        const formattedOLOperator = {
          value: results.freqCap[0].operator,
          label: results.freqCap[0].operator,
        };
        setOpenLoanOperator(formattedOLOperator);
        setOpenLoanAmount(results.freqCap[0].amount);
      }
    };

    parseCriteria(criteria);
  }, [criteria]);

  useEffect(() => {
    if (country) {
      setFilteredLocations(locationOptions[country.value] || []);
      if (locationFlag) {
        setlocation(null);
      }
    } else {
      setFilteredLocations([]);
    }
  }, [country]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const positiveIntegerFields = [
      "interestRatePeriod",
      "gracePeriodDownPayment",
      "gracePeriodEMIs",
      "loanGracePeriod",
      "rollOverPeriod",
    ];

    if (positiveIntegerFields.includes(name)) {
      const isPositiveInteger = /^[1-9]\d*$/.test(value);
      if (!isPositiveInteger) {
        alert("Please enter a positive integer.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    const formattedstartDate = `${startDate} 00:00:00`;
    const formattedendDate = `${endDate} 00:00:00`;
    const payload = {
      projectId: projectId,
      startDate: formattedstartDate,
      endDate: formattedendDate,
      projectTimeZone: ProjectData.projectTimeZone,
      paymentOption: ProjectData.paymentOption,
      bearers: ProjectData.bearers,
      currencyName: currencyName.value,
      criteria: `tcl ${tclOperator.value} ${tclAmount} and loanAmount ${minLoanOperator.value} ${minLoanAmount} and loanAmount ${maxLoanOperator.value} ${maxLoanAmount} and numberOfInstallments ${minInstallmentsOperator.value} ${minInstallmentsAmount} and numberOfInstallments ${maxInstallmentsOperator.value} ${maxInstallmentsAmount} and freqCap ${openLoanOperator.value} ${openLoanAmount}`,
      flatInterestRate: flatInterestRate,
      interestRatePeriod: interestRatePeriod,
      country: country.value,
      location: location.value,
      projectDescription: projectDescription,
      interestPeriodUnit: interestPeriodUnit.value,
      loanType: loanType.value,
      lateRepaymentPenalty: lateRepaymentPenalty, // Add to UI
      earlyRepaymentDiscount: earlyRepaymentDiscount, // Add to UI
      maxPaymetAttemps: maxPaymentAttempt,
      hasDownPayment: ProjectData.hasDownPayment,
      serviceFee: serviceFee,
      clientIds: ProjectData.clientIds,
      downRepaymentGracePeriod: gracePeriodDownPayment,
      emiRepaymentGracePeriod: graceForEmis,
      loanGracePeriod: loanGrace,
      rollOverGracePeriod: rollOverP,
      rollOverPenaltyFactor: rollOverF,
      lateEmiPenaltyFactor: lateEMIPenalty,
      rollOverInterestRate: rollOverIR,
      hasEarlyLateRepayment: earlyPay,
      name: name,
      calculateInterest: calInterest,
      managementFee: managementFee,
      vatFee: vatFee,
    };
    try {
      const authToken = localStorage.getItem("projectToken");
      const response = await fetch(
        `https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Update Failed"}
            message={errorData.message}
          />
        ));
        throw new Error(errorData.message || "Failed to update the project");
      } else if (response.ok) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Update Successful"}
            message={"The data was updated successfully"}
          />
        ));
      }
      const responseData = await response.json();
      console.log("Project updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleIRPChange = (e) => {
    if (handleChange(e)) {
      setInterestRatePeriod(e.target.value);
    }
  };

  const handleGPDPChange = (e) => {
    if (handleChange(e)) {
      setGracePeriodDown(e.target.value);
    }
  };

  const handleGPEChange = (e) => {
    if (handleChange(e)) {
      setGraceForEmis(e.target.value);
    }
  };

  const handleLGPChange = (e) => {
    if (handleChange(e)) {
      setLoanGrace(e.target.value);
    }
  };

  const handleROPChange = (e) => {
    if (handleChange(e)) {
      setRollOverP(e.target.value);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("projectToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects/${projectId}`,
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
      navigate("/project/loan-form");
      // Refresh the page after navigation
      window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  if (ProjectData.length === 0) {
    return <LoadingState />;
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form className="">
        <h2 className="mb-5">
          Name: <b>{ProjectData.name}</b>
        </h2>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Name */}
            <div className="col-span-1">
              <InputText
                inputName="name"
                inputValue={name}
                onChange={(e) => setName(e.target.value)}
                placeHolder="John Doe"
                labelName="Name"
              />
            </div>

            {/* Description */}
            <div className="col-span-1">
              <InputText
                inputName="projectDescription"
                inputValue={projectDescription}
                onChange={(e) => setprojectDescription(e.target.value)}
                labelName="Description"
              />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <SelectInput
                inputName="country"
                inputOptions={countryOptions}
                inputValue={country}
                onChange={(country) => {
                  setcountry(country);
                  setLocationFlag(true);
                }}
                labelName="Country"
              />
            </div>

            {/* Location */}
            <div className="col-span-1">
              <SelectInput
                labelName="Location"
                inputName="location"
                inputOptions={filteredLocations}
                inputValue={location}
                onChange={(location) => {
                  setlocation(location);
                }}
              />
            </div>

            {/* Loan Scheme Currency */}
            <div className="col-span-1">
              <SelectInput
                labelName="Loan Scheme Currency"
                inputName="currency"
                inputOptions={currencyOptions}
                inputValue={currencyName}
                onChange={(currencyName) => {
                  setcurrencyName(currencyName);
                  console.log(currencyName);
                }}
              />
            </div>

            {/* Loan Scheme Type */}
            <div className="col-span-1">
              <SelectInput
                labelName="Loan Scheme Type"
                inputName="loanType"
                inputOptions={loanTypeOptions}
                inputValue={loanType}
                isDisabled={true}
                isSearchable={false}
              />
            </div>

            {/* Flat Interest Rate */}
            <div className="col-span-1">
              <InputText
                labelName="Flat Interest Rate"
                inputName="flatInterestRate"
                inputValue={flatInterestRate}
                disabled={true}
              />
            </div>

            {/* Interest Period Unit */}
            <div className="col-span-1">
              <SelectInput
                labelName="Interest Period Unit"
                inputName="interestPeriodUnit"
                inputOptions={interestPeriodOptions}
                inputValue={interestPeriodUnit}
                isDisabled={true}
              />
            </div>

            {/* Interest Rate Period */}
            <div className="col-span-1">
              <InputNumber
                inputName="interestRatePeriod"
                inputValue={interestRatePeriod}
                labelName="Interest Rate Period"
                placeHolder="30"
                onChange={handleIRPChange}
              />
            </div>

            {/* Grace Period For Down Payment (Days) */}
            <div className="col-span-1">
              <InputNumber
                inputName="gracePeriodDownPayment"
                inputValue={gracePeriodDownPayment}
                labelName="Grace Period For Down Payment (Days)"
                placeholder="30"
                disabled={true}
                onChange={handleGPDPChange}
              />
            </div>

            {/* Grace Period For EMIs (Days) */}
            <div className="col-span-1">
              <InputNumber
                labelName="Grace Period For EMIs (Days)"
                inputName="gracePeriodEMIs"
                inputValue={graceForEmis}
                onChange={handleGPEChange}
                placeholder="30"
              />
            </div>

            {/* Loan Grace Period (Days) */}
            <div className="col-span-1">
              <InputNumber
                labelName="Loan Grace Period (Days)"
                inputName="loanGracePeriod"
                inputValue={loanGrace}
                onChange={handleLGPChange}
                placeholder="30"
              />
            </div>

            {/* Roll Over Period (Days) */}
            <div className="col-span-1">
              <InputNumber
                labelName="Roll Over Period (Days)"
                inputName="rollOverPeriod"
                inputValue={rollOverP}
                onChange={handleROPChange}
                placeholder="30"
              />
            </div>

            {/* Roll Over Fees */}
            <div className="col-span-1">
              <InputNumber
                labelName="Roll Over Fees"
                inputName="rollOverFees"
                inputValue={rollOverF}
                onChange={(e) => setRollOverF(e.target.value)}
              />
            </div>

            {/* Roll Over Interest Rate */}
            <div className="col-span-1">
              <InputNumber
                labelName="Roll Over Interest Rate"
                inputName="rollOverInterestRate"
                inputValue={rollOverIR}
                onChange={(e) => setRollOverIR(e.target.value)}
                placeholder="6"
              />
            </div>

            {/* Late EMI Penalty */}
            <div className="col-span-1">
              <InputNumber
                labelName="Late EMI Penalty"
                inputName="lateEMIPenalty"
                inputValue={lateEMIPenalty}
                onChange={(e) => setLateEmiPernalty(e.target.value)}
                placeholder="6"
              />
            </div>

            {/* Max. Payment Attempt */}
            <div className="col-span-1">
              <InputNumber
                labelName="Max. Payment Attempt"
                inputName="maxPaymentAttempt"
                inputValue={maxPaymentAttempt}
                onChange={(e) => setMaxPaymentAttempt(e.target.value)}
                placeholder="2"
              />
            </div>

            {/* Roll Over Equation */}
            <div className="col-span-1">
              <InputNumber
                labelName="Roll Over Equation"
                inputName="rollOverEquation"
                inputValue={rollOverEquation}
                disabled={true}
                placeholder="Roll Over Equation"
              />
            </div>

            {/* Start Date */}
            <div className="col-span-1">
              <InputDate
                labelName="Start Date"
                inputName="startDate"
                inputValue={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date */}
            <div className="col-span-1">
              <InputDate
                labelName="End Date"
                inputName="endDate"
                inputValue={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Late Repayment Penalty */}
            <div className="col-span-1">
              <InputText
                labelName="Late Repayment Penalty"
                inputName="lateRepaymentPenalty"
                inputValue={lateRepaymentPenalty}
                placeholder="10%"
                onChange={(e) => setLateRepaymentPenalty(e.target.value)}
              />
            </div>

            {/* Early Repayment Discount */}
            <div className="col-span-1">
              <InputNumber
                labelName="Early Repayment Discount"
                inputName="earlyRepaymentDiscount"
                inputValue={earlyRepaymentDiscount}
                placeholder="0"
                onChange={(e) => setEarlyRepaymentDiscount(e.target.value)}
              />
            </div>

            {/* RollOver Penalty Factor */}
            <div className="col-span-1">
              <InputNumber
                labelName="RollOver Penalty Factor"
                inputName="rollOverPenaltyFactor"
                inputValue={rollOverPenaltyFactor}
                placeholder="0"
                onChange={(e) => setRollOverPenaltyFactor(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto bg-white p-6 mt-8 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Loan Amount */}
            <InputGroup
              inputLabel="Loan Amount"
              leftDefaultvalue={signsOptions[0]}
              rightDefaultValue={signsOptions[0]}
              leftInputname="sign1"
              leftInputname2="minLoanAmt"
              rightInputName="sign2"
              rightInputName2="maxLoanAmt"
              options={signsOptions}
              leftValue={minLoanOperator}
              rightValue={maxLoanOperator}
              leftValue2={minLoanAmount}
              rightValue2={maxLoanAmount}
              leftOnChange={(e) => setMinLoanOperator(e)}
              leftOnChange2={(e) => setMinLoanAmount(e.target.value)}
              rightOnChange={(e) => setMaxLoanOperator(e)}
              rightOnChange2={(e) => setMaxLoanAmount(e.target.value)}
            />

            {/* Number of Installments */}
            <InputGroup
              inputLabel="Number of Installments"
              leftInputname="sign3"
              leftInputname2="min"
              rightInputName="sign4"
              rightInputName2="max"
              leftDefaultvalue={signsOptions[0]}
              rightDefaultValue={signsOptions[0]}
              options={signsOptions}
              leftValue={minInstallmentsOperator}
              leftValue2={minInstallmentsAmount}
              rightValue={maxInstallmentsOperator}
              rightValue2={maxInstallmentsAmount}
              leftOnChange={(e) => {
                setMinInstallmentsOperator(e);
              }}
              leftOnChange2={(e) => setMinInstallmentsAmount(e.target.value)}
              rightOnChange={(e) => {
                setMaxInstallmentsOperator(e);
              }}
              rightOnChange2={(e) => setMaxInstallmentsAmount(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 gap-5">
            <InputGroup
              inputLabel="Loan Scheme TCL"
              leftDefaultvalue={signsOptions[0]}
              leftInputname="sign5"
              leftInputname2="loanSchemeTCL"
              leftValue={tclOperator}
              leftValue2={tclAmount}
              leftOnChange={(e) => setTclOperator(e)}
              leftOnChange2={(e) => setTclAmount(e.target.value)}
              options={signsOptions}
            />
            <InputGroup
              inputLabel="Total Open Loans"
              leftDefaultvalue={signsOptions[0]}
              leftInputname="sign6"
              leftInputname2="totalOpenLoans"
              leftValue={openLoanOperator}
              leftValue2={openLoanAmount}
              leftOnChange={(e) => setOpenLoanOperator(e)}
              leftOnChange2={(e) => setOpenLoanAmount(e.target.value)}
            />
            <InputGroup
              inputLabel="Down Payment (Fixed or Percent)"
              leftDefaultvalue={signsOptions[0]}
              leftInputname="sign7"
              leftInputname2="downPayment"
              leftValue2={hasDownPayPer}
              leftOnChange2={(e) => setHasDownPayPer(e.target.value)}
              options={signsOptions}
              leftPlaceHolder="Down Payment"
            />
            <div className="">
              <InputNumber
                labelName="Service Fee"
                inputName="serviceFee"
                inputValue={serviceFee}
                onChange={(e) => setServiceFee(e.target.value)}
                placeholder="Service Fee"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5 mt-4">
            <div className="">
              <InputText
                labelName="Management Fee"
                inputName="managementFee"
                inputValue={managementFee}
                onChange={(e) => setManagementFee(e.target.value)}
                placeholder="14%"
              />
            </div>
            <div className="">
              <InputText
                labelName="Vat Fee"
                inputName="vatFee"
                inputValue={vatFee}
                onChange={(e) => setVatFee(e.target.value)}
                placeholder="15%"
              />
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full mx-auto bg-white shadow-md rounded-xl border border-red-600 p-6 mt-8">
          <div className="gap-5">
            <div>
              <InputTextArea
                labelName="Client"
                inputName="client"
                rowCount={3}
                inputValue={client}
                placeHolder="DarwinClient"
              />
            </div>
            <div className="flex space-x-4 items-center justify-between mt-2">
              <InputCheckbox
                labelName="Has Early Late Payment"
                inputName="earlyLatePayment"
                inputChecked={earlyPay}
                onChange={(e) => setEarlyPay(e.target.value)}
              />
              <InputCheckbox
                labelName="Calculate Interest"
                inputChecked={calInterest}
                inputName="calculateInterest"
                inputValue="calculateInterest"
                onChange={(e) => setCalInterest(e.target.value)}
              />
              <InputCheckbox
                labelName="TCL Include Fee"
                inputName="tclIncludeFee"
                inputValue="tclIncludeFee"
                inputChecked={tclFee}
                onChange={(e) => setTclFee(e.target.value)}
              />
              <InputCheckbox
                labelName="TCL Include Interest"
                inputName="tclIncludeInterest"
                inputValue="tclIncludeinterest"
                inputChecked={tclInterest}
                onChange={(e) => setTclInterest(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-x-1.5 mt-3 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-44 justify-center"
          >
            <CheckCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex items-center gap-x-1.5 mt-3 rounded-md bg-red-600 px-2.5 py-1.5 text-sm text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-44 justify-center"
          >
            <XCircleIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
            Delete
          </button>
        </div>
      </form>
    </>
  );
};

export default LoanForm;
