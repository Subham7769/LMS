import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import {
  countryOptions,
  locationOptions,
  currencyOptions,
} from "../../data/CountryData";
import {
  loanTypeOptions,
  interestPeriodOptions,
  signsOptions,
} from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputDate from "../Common/InputDate/InputDate";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";

const NewProjectPage = () => {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [clientIdsString, setClientIdsString] = useState("DarwinClient");
  const [filteredLocations, setFilteredLocations] = useState([]);

  // function getFormattedDate(date) {
  //   const year = date.getUTCFullYear();
  //   const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  //   const day = String(date.getUTCDate()).padStart(2, "0");
  //   // const hours = String(date.getUTCHours()).padStart(2, "0");
  //   // const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  //   // const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  //   console.log(`${year}-${month}-${day} 00:00:00`);
  //   return `${year}-${month}-${day} 00:00:00`;
  // }

  const [formData, setFormData] = useState({
    name: projectName,
    projectDescription: "",
    country: "",
    location: "",
    currencyName: "",
    loanType: "",
    flatInterestRate: "",
    interestRatePeriod: "",
    interestPeriodUnit: "",
    downRepaymentGracePeriod: "",
    emiRepaymentGracePeriod: "",
    loanGracePeriod: "",
    rollOverGracePeriod: "",
    rollOverPenaltyFactor: "",
    rollOverPenaltyFee: "",
    rollOverInterestRate: "",
    lateEmiPenaltyFactor: "",
    maxPaymetAttemps: "",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    lateRepaymentPenalty: "",
    earlyRepaymentDiscount: "",
    serviceFee: "",
    calculateInterest: false,
    hasEarlyLateRepayment: false,
    hasDownPayment: false,
    tclIncludeFee: true,
    tclIncludeInterest: true,
    managementFee: "",
    tclRef: "",
    vatFee: "",
    clientIds: [],
    tclAmount: "", //not in API
    minLoanOperator: "", //not in API
    minLoanAmount: "", //not in API
    maxLoanOperator: "", //not in API
    maxLoanAmount: "", //not in API
    tclOperator: "", //not in API
    minInstallmentsOperator: "", //not in API
    minInstallmentsAmount: "", //not in API
    maxInstallmentsOperator: "", //not in API
    maxInstallmentsAmount: "", //not in API
    downPaymentOperator: "", //not in API
    downPaymentWay: "", //not in API
    downPaymentPercentage: "", //not in API
    openLoanOperator: "", //not in API
    openLoanAmount: "", //not in API
  });

  console.log(formData);
  useEffect(() => {
    const pattern = /([a-zA-Z]+)\s*(<=|>=|<|>|==)\s*(\d+)/g;
    let match;
    while ((match = pattern.exec(formData.criteria)) !== null) {
      const [_, variable, operator, value] = match;
      const parsedValue = parseInt(value);

      if (isNaN(parsedValue)) {
        console.error(
          `Failed to parse value ${value} for variable ${variable}`
        );
        continue;
      }

      const updateOperatorAndValue = (
        operatorField,
        valueField,
        operator,
        parsedValue
      ) => {
        setFormData((prevState) => ({
          ...prevState,
          [operatorField]: { value: operator, label: operator },
          [valueField]: parsedValue,
        }));
      };

      switch (variable) {
        case "loanAmount":
          if (operator === ">=" || operator === ">") {
            updateOperatorAndValue(
              "minLoanOperator",
              "minLoanAmount",
              operator,
              parsedValue
            );
          } else if (operator === "<=" || operator === "<") {
            updateOperatorAndValue(
              "maxLoanOperator",
              "maxLoanAmount",
              operator,
              parsedValue
            );
          }
          break;
        case "tcl":
          updateOperatorAndValue(
            "tclOperator",
            "tclAmount",
            operator,
            parsedValue
          );
          break;
        case "numberOfInstallments":
          if (operator === ">=" || operator === ">") {
            updateOperatorAndValue(
              "minInstallmentsOperator",
              "minInstallmentsAmount",
              operator,
              parsedValue
            );
          } else if (operator === "<=" || operator === "<") {
            updateOperatorAndValue(
              "maxInstallmentsOperator",
              "maxInstallmentsAmount",
              operator,
              parsedValue
            );
          }
          break;
        case "freqCap":
          updateOperatorAndValue(
            "openLoanOperator",
            "openLoanAmount",
            operator,
            parsedValue
          );
          break;
        default:
          break;
      }
    }
  }, [formData.criteria]);

  useEffect(() => {
    setFilteredLocations(locationOptions[formData.country] || []);
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const positiveIntegerFields = [
      "interestRatePeriod",
      "downRepaymentGracePeriod",
      "emiRepaymentGracePeriod",
      "loanGracePeriod",
      "rollOverGracePeriod",
    ];
  
    if (type === "checkbox") {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    } else {
      if (positiveIntegerFields.includes(name)) {
        // Allow empty string for the purpose of clearing the input
        if (value !== "" && !/^[0-9]\d*$/.test(value)) {
          alert("Please enter a positive integer.");
          return;
        }
      }
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate =
      new Date(formData.startDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const formattedEndDate =
      new Date(formData.endDate).toISOString().slice(0, 10) + ` 00:00:00`;
    const startDateObj = new Date(formattedStartDate);
    const endDateObj = new Date(formattedEndDate);

    if (endDateObj < startDateObj) {
      toast.custom((t) => (
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
      "lateEmiPenaltyFactor",
      "name",
      "managementFee",
      "vatFee",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Validation Error"}
            message={`Please fill in ${field
              .replace(/([A-Z])/g, " $1")
              .trim()}.`}
          />
        ));
        return;
      }
    }

    const {
      tclAmount,
      minLoanOperator,
      minLoanAmount,
      maxLoanOperator,
      maxLoanAmount,
      tclOperator,
      minInstallmentsOperator,
      minInstallmentsAmount,
      maxInstallmentsOperator,
      maxInstallmentsAmount,
      downPaymentOperator,
      downPaymentWay,
      openLoanOperator,
      downPaymentPercentage,
      openLoanAmount,
      ...filteredFormData
    } = formData;

    const postData = {
      ...filteredFormData,
      clientIds: clientIdsString.split(","),
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      projectTimeZone: "GMT-180",
      paymentOption: ["mobile wallet", "top up", "credit card"],
      bearers: ["SMS", "USSD"],
      criteria: `tcl ${formData.tclOperator} ${
        formData.tclAmount
      } and loanAmount ${formData.minLoanOperator} ${
        formData.minLoanAmount
      } and loanAmount ${formData.maxLoanOperator} ${
        formData.maxLoanAmount
      } and numberOfInstallments ${formData.minInstallmentsOperator} ${
        formData.minInstallmentsAmount
      } and numberOfInstallments ${formData.maxInstallmentsOperator} ${
        formData.maxInstallmentsAmount
      } and freqCap ${formData.openLoanOperator} ${formData.openLoanAmount}${
        formData.loanType === "asset"
          ? ` and downPaymentPercentage ${formData.downPaymentOperator} ${formData.downPaymentPercentage}`
          : ""
      }`,
    };

    try {
      const projectToken = localStorage.getItem("projectToken");
      console.log(projectToken);
      const response = await fetch(
        `${import.meta.env.VITE_PROJECT_CREATE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${projectToken}`,
          },
          body: JSON.stringify(postData),
        }
      );
      if (!response.ok) {
        const errorMessage = await response.text();
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Error"}
            message={
              errorMessage ||
              "Failed to create project. Please try again later."
            }
          />
        ));
        return;
      }

      const data = await response.json();

      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Success"}
          message={"Project created successfully!"}
        />
      ));

      // Redirect to the project details page or any other appropriate page
      navigate(`/project/${data.projectId}`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.custom((t) => (
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

  const divStyle = {
    gridColumn: "span 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <form>
        <div className="w-full mx-auto bg-white p-6 shadow-md rounded-xl border border-red-600">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Name */}
            <InputText
              labelName={"Name"}
              inputName={"name"}
              inputValue={formData.name}
              onChange={handleChange}
              placeHolder={"Project Name"}
            />

            {/* Description */}
            <InputText
              labelName={"Description"}
              inputName={"projectDescription"}
              inputValue={formData.projectDescription}
              onChange={handleChange}
              placeHolder={"Description"}
            />

            {/* Country */}
            <InputSelect
              labelName={"Country"}
              inputName={"country"}
              inputOptions={countryOptions}
              inputValue={formData.country}
              onChange={handleChange}
            />

            {/* Location */}
            <InputSelect
              labelName={"Location"}
              inputName={"location"}
              inputOptions={filteredLocations}
              inputValue={formData.location}
              onChange={handleChange}
            />

            {/* Loan Scheme Currency */}
            <InputSelect
              labelName={"Loan Scheme Currency"}
              inputName={"currencyName"}
              inputOptions={currencyOptions}
              inputValue={formData.currencyName}
              onChange={handleChange}
            />

            {/* Loan Scheme Type */}
            <InputSelect
              labelName={"Loan Scheme Type"}
              inputName={"loanType"}
              inputOptions={loanTypeOptions}
              inputValue={formData.loanType}
              onChange={handleChange}
            />

            {/* Flat Interest Rate */}
            <InputNumber
              labelName={"Flat Interest Rate"}
              inputName={"flatInterestRate"}
              inputValue={formData.flatInterestRate}
              onChange={handleChange}
              placeHolder={"6"}
            />

            {/* Interest Period Unit */}
            <InputSelect
              labelName={"Interest Period Unit"}
              inputName={"interestPeriodUnit"}
              inputOptions={interestPeriodOptions}
              inputValue={formData.interestPeriodUnit}
              onChange={handleChange}
            />

            {/* Interest Rate Period */}
            <InputNumber
              labelName={"Interest Rate Period"}
              inputName={"interestRatePeriod"}
              inputValue={formData.interestRatePeriod}
              onChange={handleChange}
              placeHolder={"30"}
            />

            {/* Grace Period For Down Payment (Days) */}
            <InputNumber
              labelName={"Down Payment Grace Period (Days)"}
              inputName={"downRepaymentGracePeriod"}
              inputValue={formData.downRepaymentGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
            />

            {/* Grace Period For EMIs (Days) */}
            <InputNumber
              labelName={"EMIs Grace Period (Days)"}
              inputName={"emiRepaymentGracePeriod"}
              inputValue={formData.emiRepaymentGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
            />

            {/* Loan Grace Period (Days) */}
            <InputNumber
              labelName={"Loan Grace Period (Days)"}
              inputName={"loanGracePeriod"}
              inputValue={formData.loanGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
            />

            {/* Roll Over Period (Days) */}
            <InputNumber
              labelName={"Roll Over Period (Days)"}
              inputName={"rollOverGracePeriod"}
              inputValue={formData.rollOverGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
            />

            {/* Roll Over Fees */}
            <InputText
              labelName={"Roll Over Fees"}
              inputName={"rollOverPenaltyFee"}
              inputValue={formData.rollOverPenaltyFee}
              onChange={handleChange}
              placeHolder={"xxxx /-"}
            />

            {/* Roll Over Interest Rate */}
            <InputNumber
              labelName={"Roll Over Interest Rate"}
              inputName={"rollOverInterestRate"}
              inputValue={formData.rollOverInterestRate}
              onChange={handleChange}
              placeHolder={"6"}
            />

            {/* Late EMI Penalty */}
            <InputText
              labelName={"Late EMI Penalty"}
              inputName={"lateEmiPenaltyFactor"}
              inputValue={formData.lateEmiPenaltyFactor}
              onChange={handleChange}
              placeHolder={"6"}
            />

            {/* Max. Payment Attempt */}
            <InputNumber
              labelName={"Max. Payment Attempt"}
              inputName={"maxPaymetAttemps"}
              inputValue={formData.maxPaymetAttemps}
              onChange={handleChange}
              placeHolder={"2"}
            />

            {/* Start Date */}
            <div className="col-span-1" onClick={addNoEditToast}>
              <InputDate
                labelName={"Start Date"}
                inputName={"startDate"}
                inputValue={formData.startDate}
                onChange={handleChange}
              />
            </div>

            {/* End Date */}
            <div className="col-span-1">
              <InputDate
                labelName={"End Date"}
                inputName={"endDate"}
                inputValue={formData.endDate}
                onChange={handleChange}
              />
            </div>

            {/* Late Repayment Penalty */}
            <InputText
              labelName={"Late Repayment Penalty"}
              inputName={"lateRepaymentPenalty"}
              inputValue={formData.lateRepaymentPenalty}
              onChange={handleChange}
              placeHolder={"10%"}
            />

            {/* Early Repayment Discount */}
            <InputText
              labelName={"Early Repayment Discount"}
              inputName={"earlyRepaymentDiscount"}
              inputValue={formData.earlyRepaymentDiscount}
              onChange={handleChange}
              placeHolder={"0"}
            />

            {/* RollOver Penalty Factor */}
            <InputText
              labelName={"RollOver Penalty Factor"}
              inputName={"rollOverPenaltyFactor"}
              inputValue={formData.rollOverPenaltyFactor}
              onChange={handleChange}
              placeHolder={"0"}
            />
          </div>
        </div>

        <div className="w-full mx-auto bg-white p-6 mt-8 shadow-md rounded-xl border border-red-600">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Loan Amount */}
            <div style={divStyle}>
              <SelectAndNumber
                labelName={"Loan Amount"}
                inputSelectName={"minLoanOperator"}
                inputSelectOptions={signsOptions}
                inputSelectValue={formData.minLoanOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"minLoanAmount"}
                inputNumberValue={formData.minLoanAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"Min"}
                inputSelect2Name={"maxLoanOperator"}
                inputSelect2Options={signsOptions}
                inputSelect2Value={formData.maxLoanOperator}
                onChangeSelect2={handleChange}
                disabledSelect2={false}
                hiddenSelect2={false}
                inputNumber2Name={"maxLoanAmount"}
                inputNumber2Value={formData.maxLoanAmount}
                onChangeNumber2={handleChange}
                placeHolderNumber2={"Max"}
              />
            </div>

            {/* Number of Installments */}
            <div style={divStyle}>
              <SelectAndNumber
                labelName={"No. of Installments"}
                inputSelectName={"minInstallmentsOperator"}
                inputSelectOptions={signsOptions}
                inputSelectValue={formData.minInstallmentsOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"minInstallmentsAmount"}
                inputNumberValue={formData.minInstallmentsAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"Min"}
                inputSelect2Name={"maxInstallmentsOperator"}
                inputSelect2Options={signsOptions}
                inputSelect2Value={formData.maxInstallmentsOperator}
                onChangeSelect2={handleChange}
                disabledSelect2={false}
                hiddenSelect2={false}
                inputNumber2Name={"maxInstallmentsAmount"}
                inputNumber2Value={formData.maxInstallmentsAmount}
                onChangeNumber2={handleChange}
                placeHolderNumber2={"Max"}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Loan Scheme TCL */}
            <div className="col-span-1 space-x-2 flex items-center justify-between">
              <SelectAndNumber
                labelName={"Loan Scheme TCL"}
                inputSelectName={"tclOperator"}
                inputSelectOptions={signsOptions}
                inputSelectValue={formData.tclOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"tclAmount"}
                inputNumberValue={formData.tclAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"TCL"}
              />

              <SelectAndNumber
                labelName={"Total Open Loans"}
                inputSelectName={"openLoanOperator"}
                inputSelectOptions={signsOptions}
                inputSelectValue={formData.openLoanOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"openLoanAmount"}
                inputNumberValue={formData.openLoanAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"Total Open Loans"}
              />
            </div>

            {/* Down Payment */}
            <div style={divStyle}>
              <div className="flex items-center justify-center gap-2 w-full">
                <div
                  className={`flex-1 w-full ${
                    formData.loanType === "cash" && "hidden"
                  }`}
                >
                  <InputCheckbox
                    labelName={"Down Payment"}
                    inputName={"hasDownPayment"}
                    inputChecked={formData.hasDownPayment}
                    onChange={handleChange}
                    disabled={formData.loanType === "asset" ? false : true}
                  />
                </div>
                {/* <div className="flex-1">
                  {formData.hasDownPayment &&
                    <InputSelect
                      // labelName={"Fixed or %"}
                      inputName={"downPaymentWay"} inputOptions={[
                        { value: "fixed", label: "Fixed" },
                        { value: "%", label: "%" }
                      ]}
                      inputValue={formData.downPaymentWay}
                      onChange={handleChange}
                      defaultValue={{ value: "fixed", label: "Fixed" }}
                    />
                  }
                </div> */}
              </div>

              <div className="flex items-center justify-center gap-2 w-full">
                {formData.hasDownPayment && (
                  <SelectAndNumber
                    inputSelectName={"downPaymentOperator"}
                    inputSelectOptions={signsOptions}
                    inputSelectValue={formData.downPaymentOperator}
                    onChangeSelect={handleChange}
                    disabledSelect={false}
                    hiddenSelect={false}
                    inputNumberName={"downPaymentPercentage"}
                    inputNumberValue={formData.downPaymentPercentage}
                    onChangeNumber={handleChange}
                    placeHolderNumber={"Amount"}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-5 mb-[24px]">
            {/* Service Fee */}
            <div style={divStyle}>
              <div className="flex items-center justify-center gap-2 w-full">
                <InputText
                  labelName={"Service Fee"}
                  inputName={"serviceFee"}
                  inputValue={formData.serviceFee}
                  onChange={handleChange}
                  placeHolder={"Service Fee"}
                />
                <InputText
                  labelName={"Management Fee"}
                  inputName={"managementFee"}
                  inputValue={formData.managementFee}
                  onChange={handleChange}
                  placeHolder={"14%"}
                />
              </div>
            </div>
            <div style={divStyle}>
              <div className="flex items-center justify-center gap-2 w-2/4">
                <InputText
                  labelName={"Vat Fee"}
                  inputName={"vatFee"}
                  inputValue={formData.vatFee}
                  onChange={handleChange}
                  placeHolder={"15%"}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto bg-white shadow-md rounded-xl border border-red-600 p-6 mt-8">
          <div className="gap-5">
            <div>
              <InputTextArea
                labelName={"Client Ids"}
                inputName={"clientIds"}
                rowCount={3}
                inputValue={clientIdsString}
                onChange={(e) => setClientIdsString(e.target.value)}
                placeHolder={"Darwinclient"}
              />
            </div>
            <div className="flex space-x-4 items-center justify-between mt-2">
              <InputCheckbox
                labelName={"Has Early Late Payment"}
                inputName={"hasEarlyLateRepayment"}
                inputChecked={formData.hasEarlyLateRepayment}
                onChange={handleChange}
              />
              <InputCheckbox
                labelName={"Calculate Interest"}
                inputName={"calculateInterest"}
                inputChecked={formData.calculateInterest}
                onChange={handleChange}
              />
              <InputCheckbox
                labelName={"TCL Include Fee"}
                inputName={"tclIncludeFee"}
                inputChecked={formData.tclIncludeFee}
                onChange={handleChange}
              />
              <InputCheckbox
                labelName={"TCL Include Interest"}
                inputName={"tclIncludeInterest"}
                inputChecked={formData.tclIncludeInterest}
                onChange={handleChange}
              />
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
