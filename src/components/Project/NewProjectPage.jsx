import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import { countryOptions, locationOptions, currencyOptions } from '../../data/CountryData'
import InputText from "../Common/InputText/InputText";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputDate from "../Common/InputDate/InputDate";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";

const NewProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const startDate = getFormattedDate(new Date());

  const formattedDate = (date) => {
    return date.substring(0, 10);
  };

  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const [formData, setFormData] = useState({
    name: "",
    projectDescription: "",
    country: null,
    location: null,
    locationFlag: false,
    filteredLocations: [],
    currencyName: null,
    loanType: null,
    minLoanAmt: "",
    maxLoanAmt: "",
    flatInterestRate: 0,
    interestRatePeriod: 0,
    interestPeriodUnit: null,
    downRepaymentGracePeriod: 0,
    emiRepaymentGracePeriod: 0,//graceForEmis
    loanGracePeriod: 0,//loanGrace
    rollOverGracePeriod: 0,//rollOverP
    rollOverPenaltyFactor: 0,//rollOverF
    rollOverPenaltyFee: 0,
    rollOverInterestRate: 0,//rollOverIR
    lateEmiPenaltyFactor: 0,//lateEMIPenalty
    maxPaymetAttemps: 0,//maxPaymentAttempt  
    rollOverEquation: "",
    startDate: startDate,
    endDate: "",
    lateRepaymentPenalty: 0,
    tclAmount: 0,
    minLoanOperator: "",
    minLoanAmount: 0,
    maxLoanOperator: "",
    maxLoanAmount: 0,
    earlyRepaymentDiscount: "",
    tclOperator: "",
    minInstallmentsOperator: "",
    minInstallmentsAmount: 0,
    maxInstallmentsOperator: "",
    maxInstallmentsAmount: 0,
    serviceFee: 0,
    calculateInterest: false,//calInterest
    hasEarlyLateRepayment: false,//earlyPay
    hasDownPayment: true,//hasDownPayPer
    managementFee: "",
    tclIncludeFee: true,//tclFee
    tclIncludeInterest: true,//tclInterest
    openLoanOperator: "",
    openLoanAmount: 0,
    vatFee: "",
    client: "DarwinClient",
  });

  const loanTypeOptions = [
    { value: "asset", label: "Asset" },
    { value: "cash", label: "Cash" },
  ];

  const interestPeriodOptions = [
    { value: "Monthly", label: "Monthly" },
    { value: "Weekly", label: "Weekly" },
    { value: "Fortnightly", label: "Fortnightly" },
  ];

  const signsOptions = [
    { value: "==", label: "==" },
    { value: "<", label: "<" },
    { value: ">", label: ">" },
    { value: "<=", label: "<=" },
    { value: ">=", label: ">=" },
  ];

  useEffect(() => {
    const pattern = /([a-zA-Z]+)\s*(<=|>=|<|>|==)\s*(\d+)/g;
    let match;
    while ((match = pattern.exec(formData.criteria)) !== null) {
      const [_, variable, operator, value] = match;
      const parsedValue = parseInt(value);

      if (isNaN(parsedValue)) {
        console.error(`Failed to parse value ${value} for variable ${variable}`);
        continue;
      }

      const updateOperatorAndValue = (operatorField, valueField, operator, parsedValue) => {
        setFormData(prevState => ({
          ...prevState,
          [operatorField]: { value: operator, label: operator },
          [valueField]: parsedValue
        }));
      };

      switch (variable) {
        case "loanAmount":
          if (operator === ">=" || operator === ">") {
            updateOperatorAndValue('minLoanOperator', 'minLoanAmount', operator, parsedValue);
          } else if (operator === "<=" || operator === "<") {
            updateOperatorAndValue('maxLoanOperator', 'maxLoanAmount', operator, parsedValue);
          }
          break;
        case "tcl":
          updateOperatorAndValue('tclOperator', 'tclAmount', operator, parsedValue);
          break;
        case "numberOfInstallments":
          if (operator === ">=" || operator === ">") {
            updateOperatorAndValue('minInstallmentsOperator', 'minInstallmentsAmount', operator, parsedValue);
          } else if (operator === "<=" || operator === "<") {
            updateOperatorAndValue('maxInstallmentsOperator', 'maxInstallmentsAmount', operator, parsedValue);
          }
          break;
        case "freqCap":
          updateOperatorAndValue('openLoanOperator', 'openLoanAmount', operator, parsedValue);
          break;
        default:
          break;
      }
    }
  }, [formData.criteria]);


  useEffect(() => {
    if (formData.country) {
      setFormData(prevState => ({
        ...prevState,
        filteredLocations: locationOptions[formData.country] || [],
        location: prevState.locationFlag ? null : prevState.location
      }));
    } else {
      setFormData(prevState => ({ ...prevState, filteredLocations: [] }));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const positiveIntegerFields = [
      "interestRatePeriod",
      "downRepaymentGracePeriod",
      "gracePeriodEMIs",
      "loanGracePeriod",
      "rollOverPeriod"
    ];

    if (type === 'checkbox') {
      setFormData(prevState => ({ ...prevState, [name]: checked }));
    } else {
      if (positiveIntegerFields.includes(name)) {
        if (!/^[1-9]\d*$/.test(value)) {
          alert("Please enter a positive integer.");
          return;
        }
      }
      setFormData(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartDate = `${startDate} 00:00:00`;
    const formattedEndDate = `${formData.endDate} 00:00:00`;

    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);

    if (endDateObj < startDateObj) {
      toast.custom(t => (
        <Failed
          t={t}
          toast={toast}
          title={"Validation Error"}
          message={"End date cannot be earlier than start date."}
        />
      ));
      return;
    }

    const requiredFields = [
      "startDate",
      "endDate",
      "currencyName",
      "tclAmount",
      "minLoanAmount",
      "maxLoanAmount",
      "minInstallmentsAmount",
      "maxInstallmentsAmount",
      "openLoanAmount",
      "interestRatePeriod",
      "country",
      "location",
      "projectDescription",
      "interestPeriodUnit",
      "loanType",
      "lateRepaymentPenalty",
      "earlyRepaymentDiscount",
      "maxPaymetAttemps",
      "serviceFee",
      "downRepaymentGracePeriod",
      "emiRepaymentGracePeriod",
      "loanGracePeriod",
      "rollOverGracePeriod",
      "rollOverPenaltyFee",
      "rollOverPenaltyFee",
      "lateEmiPenaltyFactor",
      "name",
      "managementFee",
      "vatFee"
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.custom(t => (
          <Failed
            t={t}
            toast={toast}
            title={"Validation Error"}
            message={`Please fill in ${field.replace(/([A-Z])/g, ' $1').trim()}.`}
          />
        ));
        return;
      }
    }

    const postData = {
      ...formData,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      projectTimeZone: "GMT-180",
      paymentOption: ["mobile wallet", "top up", "credit card"],
      bearers: ["SMS", "USSD"],
      criteria: `tcl ${formData.tclOperator.value} ${formData.tclAmount} and loanAmount ${formData.minLoanOperator.value} ${formData.minLoanAmount} and loanAmount ${formData.maxLoanOperator.value} ${formData.maxLoanAmount} and numberOfInstallments ${formData.minInstallmentsOperator.value} ${formData.minInstallmentsAmount} and numberOfInstallments ${formData.maxInstallmentsOperator.value} ${formData.maxInstallmentsAmount} and freqCap ${formData.openLoanOperator.value} ${formData.openLoanAmount}`
    };

    try {
      const authToken = localStorage.getItem("projectToken");
      const response = await fetch("https://lms-api-dev.lmscarbon.com/lms-carbon-rule/api/v1/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(postData)
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        toast.custom(t => (
          <Failed
            t={t}
            toast={toast}
            title={"Error"}
            message={errorMessage || "Failed to create project. Please try again later."}
          />
        ));
        return;
      }

      const data = await response.json();

      toast.custom(t => (
        <Passed
          t={t}
          toast={toast}
          title={"Success"}
          message={"Project created successfully!"}
        />
      ));

      // Redirect to the project details page or any other appropriate page
      navigate(`/projects/${data.projectId}`);

    } catch (error) {
      console.error("Error creating project:", error);
      toast.custom(t => (
        <Failed
          t={t}
          toast={toast}
          title={"Error"}
          message={"Failed to create project. Please try again later."}
        />
      ));
    }
  };

  const addNoEditToast = () => {
    toast.custom((t) => (
      <Failed
        t={t}
        toast={toast}
        title={"Not Allowed"}
        message={"Cannot edit start date"}
      />
    ));
  };




  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Name */}
            <div className="col-span-1">
              <InputText labelName={"Name"} inputName={"name"} inputValue={formData.name} onChange={handleChange} placeHolder={'John Doe'} />
            </div>

            {/* Description */}
            <div className="col-span-1">
              <InputText labelName={"Description"} inputName={"projectDescription"} inputValue={formData.projectDescription} onChange={handleChange} placeHolder={"Description"} />
            </div>

            {/* Country */}
            <div className="col-span-1">
              <InputSelect labelName={"Country"} inputName={"country"} inputOptions={countryOptions} inputValue={formData.country} onChange={handleChange} />
            </div>

            {/* Location */}
            <div className="col-span-1">
              <InputSelect labelName={"Location"} inputName={"location"} inputOptions={formData.filteredLocations} inputValue={formData.location} onChange={handleChange} />
            </div>

            {/* Loan Scheme Currency */}
            <div className="col-span-1">
              <InputSelect labelName={"Loan Scheme Currency"} inputName={"currencyName"} inputOptions={currencyOptions} inputValue={formData.currencyName} onChange={handleChange} />
            </div>

            {/* Loan Scheme Type */}
            <div className="col-span-1">
              <InputSelect labelName={"Loan Scheme Type"} inputName={"loanType"} inputOptions={loanTypeOptions} inputValue={formData.loanType} onChange={handleChange} />
            </div>

            {/* Flat Interest Rate */}
            <div className="col-span-1">
              <InputNumber labelName={"Flat Interest Rate"} inputName={"flatInterestRate"} inputValue={formData.flatInterestRate} onChange={handleChange} placeHolder={"6"} />
            </div>

            {/* Interest Period Unit */}
            <div className="col-span-1">
              <InputSelect labelName={"Interest Period Unit"} inputName={"interestPeriodUnit"} inputOptions={interestPeriodOptions} inputValue={formData.interestPeriodUnit} onChange={handleChange} />
            </div>

            {/* Interest Rate Period */}
            <div className="col-span-1">
              <InputNumber labelName={"Interest Rate Period"} inputName={"interestRatePeriod"} inputValue={formData.interestRatePeriod} onChange={handleChange} placeHolder={"30"} />
            </div>

            {/* Grace Period For Down Payment (Days) */}
            <div className="col-span-1">
              <InputNumber labelName={"Down Payment Grace Period (Days)"} inputName={"downRepaymentGracePeriod"} inputValue={formData.downRepaymentGracePeriod} onChange={handleChange} placeHolder={"30"} />
            </div>

            {/* Grace Period For EMIs (Days) */}
            <div className="col-span-1">
              <InputNumber labelName={"EMIs Grace Period (Days)"} inputName={"emiRepaymentGracePeriod"} inputValue={formData.emiRepaymentGracePeriod} onChange={handleChange} placeHolder={"30"} />
            </div>

            {/* Loan Grace Period (Days) */}
            <div className="col-span-1">
              <InputNumber labelName={"Loan Grace Period (Days)"} inputName={"loanGracePeriod"} inputValue={formData.loanGracePeriod} onChange={handleChange} placeHolder={"30"} />
            </div>

            {/* Roll Over Period (Days) */}
            <div className="col-span-1">
              <InputNumber labelName={"Roll Over Period (Days)"} inputName={"rollOverGracePeriod"} inputValue={formData.rollOverGracePeriod} onChange={handleChange} placeHolder={"30"} />
            </div>

            {/* Roll Over Fees */}
            <div className="col-span-1">
              <InputNumber labelName={"Roll Over Fees"} inputName={"rollOverPenaltyFee"} inputValue={formData.rollOverPenaltyFee} onChange={handleChange} placeHolder={"xxxx /-"} />
            </div>

            {/* Roll Over Interest Rate */}
            <div className="col-span-1">
              <InputText labelName={"Roll Over Interest Rate"} inputName={"rollOverInterestRate"} inputValue={formData.rollOverInterestRate} onChange={handleChange} placeHolder={"6"} />
            </div>

            {/* Late EMI Penalty */}
            <div className="col-span-1">
              <InputNumber labelName={"Late EMI Penalty"} inputName={"lateEmiPenaltyFactor"} inputValue={formData.lateEmiPenaltyFactor} onChange={handleChange} placeHolder={"6"} />
            </div>

            {/* Max. Payment Attempt */}
            <div className="col-span-1">
              <InputNumber labelName={"Max. Payment Attempt"} inputName={"maxPaymetAttemps"} inputValue={formData.maxPaymetAttemps} onChange={handleChange} placeHolder={"2"} />
            </div>

            {/* Roll Over Equation */}
            <div className="col-span-1">
              <InputNumber labelName={"Roll Over Equation"} inputName={"rollOverEquation"} inputValue={formData.rollOverEquation} disabled={true} placeHolder={"Roll Over Equation"} />
            </div>

            {/* Start Date */}
            <div className="col-span-1" onClick={addNoEditToast}>
              <InputDate labelName={"Start Date"} inputName={"startDate"} inputValue={formData.startDate} onChange={handleChange} />
            </div>

            {/* End Date */}
            <div className="col-span-1">
              <InputDate labelName={"End Date"} inputName={"endDate"} inputValue={formData.endDate} onChange={handleChange} />
            </div>

            {/* Late Repayment Penalty */}
            <div className="col-span-1">
              <InputNumber labelName={"Late Repayment Penalty"} inputName={"lateRepaymentPenalty"} inputValue={formData.lateRepaymentPenalty} onChange={handleChange} placeHolder={"10%"} />
            </div>

            {/* Early Repayment Discount */}
            <div className="col-span-1">
              <InputNumber labelName={"Early Repayment Discount"} inputName={"earlyRepaymentDiscount"} inputValue={formData.earlyRepaymentDiscount} onChange={handleChange} placeHolder={"0"} />
            </div>

            {/* RollOver Penalty Factor */}
            <div className="col-span-1">
              <InputNumber labelName={"RollOver Penalty Factor"} inputName={"rollOverPenaltyFactor"} inputValue={formData.rollOverPenaltyFactor} onChange={handleChange} placeHolder={"0"} />
            </div>
          </div>
        </div>


        <div className="w-full mx-auto bg-white p-6 mt-8 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Loan Amount */}

            <div className="flex items-center space-x-2">
              <InputSelect labelName={"Loan Amount"} inputName={"minLoanOperator"} inputOptions={signsOptions} inputValue={formData.minLoanOperator} onChange={handleChange} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"minLoanAmount"} inputValue={formData.minLoanAmount} onChange={handleChange} placeHolder={"Min"} />

              <InputSelect inputName={"maxLoanOperator"} inputOptions={signsOptions} inputValue={formData.maxLoanOperator} onChange={handleChange} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"maxLoanAmount"} inputValue={formData.maxLoanAmount} onChange={handleChange} placeHolder={"Max"} />
            </div>


            {/* Number of Installments */}

            <div className="flex items-center space-x-2">
              <InputSelect labelName={"Number of Installments"} inputName={"minInstallmentsOperator"} inputOptions={signsOptions} inputValue={formData.minInstallmentsOperator} onChange={handleChange} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"minInstallmentsAmount"} inputValue={formData.minInstallmentsAmount} onChange={handleChange} placeHolder={"Min"} />

              <InputSelect inputName={"maxInstallmentsOperator"} inputOptions={signsOptions} inputValue={formData.maxInstallmentsOperator} onChange={handleChange} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"maxInstallmentsAmount"} inputValue={formData.maxInstallmentsAmount} onChange={handleChange} placeHolder={"Max"} />
            </div>

          </div>
          <div className="grid grid-cols-4 gap-5 mb-[24px]">
            <div>
              <InputSelect labelName={"Loan Scheme TCL"} inputName={"tclOperator"} inputOptions={signsOptions} inputValue={formData.tclOperator} onChange={handleChange} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"tclAmount"} inputValue={formData.tclAmount} onChange={handleChange} placeHolder={"TCL"} />
            </div>

            <div>
              <InputSelect labelName={"Total Open Loans"} inputName={"openLoanOperator"} inputOptions={signsOptions} inputValue={formData.openLoanOperator} onChange={handleChange} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"openLoanAmount"} inputValue={formData.openLoanAmount} onChange={handleChange} placeHolder={"Total Open Loans"} />

            </div>
            <div>
              <InputSelect labelName={"Down Payment (Fixed or Percent)"} inputName={"sign5"} inputOptions={signsOptions} inputValue={""} onChange={""} defaultValue={signsOptions[0]} />

              <InputNumber inputName={"hasDownPayment"} inputValue={formData.hasDownPayment} onChange={handleChange} placeHolder={"Down Payment"} />
            </div>
            <div>
              <InputNumber labelName={"Service Fee"} inputName={"serviceFee"} inputValue={formData.serviceFee} onChange={handleChange} placeHolder={"Service Fee"} />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5">
            <div>
              <InputNumber labelName={"Management Fee"} inputName={"managementFee"} inputValue={formData.managementFee} onChange={handleChange} placeHolder={"14%"} />
            </div>
            <div>
              <InputNumber labelName={"Vat Fee"} inputName={"vatFee"} inputValue={formData.vatFee} onChange={handleChange} placeHolder={"15%"} />
            </div>
          </div>
        </div>

        <div className="w-full mx-auto bg-white shadow-md rounded-xl border border-red-600 p-6 mt-8">
          <div className="gap-5">
            <div>
              <InputTextArea labelName={"Client"} inputName={"client"} rowCount={3} inputValue={formData.client} onChange={handleChange} placeHolder={"DarwinClient"} />
            </div>
            <div className="flex space-x-4 items-center justify-between mt-2">
              <InputCheckbox labelName={"Has Early Late Payment"} inputName={"hasEarlyLateRepayment"} inputValue={"earlyLatePayment"} inputChecked={formData.hasEarlyLateRepayment} onChange={handleChange} />
              <InputCheckbox labelName={"Calculate Interest"} inputName={"calculateInterest"} inputValue={"calculateInterest"} inputChecked={formData.calculateInterest} onChange={handleChange} />
              <InputCheckbox labelName={"TCL Include Fee"} inputName={"tclIncludeFee"} inputValue={"tclIncludeFee"} inputChecked={formData.tclIncludeFee} onChange={handleChange} />
              <InputCheckbox labelName={"TCL Include Interest"} inputName={"tclIncludeInterest"} inputValue={"tclIncludeInterest"} inputChecked={formData.tclIncludeInterest} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="flex mt-4  justify-end ">
          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="flex items-center justify-center mt-3 w-44 bg-indigo-600  hover:bg-white hover:text-black hover:border hover:drop-shadow-lg text-white p-2 rounded-md"
          >
            <FaCheckCircle className="mr-2" />
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default NewProjectPage;
