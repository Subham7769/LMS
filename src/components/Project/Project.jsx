import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircleIcon, TrashIcon, XCircleIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed, Warning } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import {
  countryOptions,
  currencyOptions,
  interestPeriodOptions,
  loanTypeOptions,
  locationOptions,
  signsOptions,
} from "../../data/CountryData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputDate from "../Common/InputDate/InputDate";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../Common/InputSelect/InputSelect";
import SelectAndNumber from "../Common/SelectAndNumber/SelectAndNumber";
import DynamicName from "../Common/DynamicName/DynamicName";
import { fetchProjectData } from "../../redux/Slices/sidebarSlice";
import { fetchData } from "../../redux/Slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const Project = () => {
  const [ProjectData, setProjectData] = useState([]);
  const [clientIdsString, setClientIdsString] = useState("DarwinClient");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formattedDate = (date) => {
    return date.substring(0, 10);
  };
  const { data, loading, error } = useSelector((state) => state.project);
  const [formData, setFormData] = useState({});
  // console.log(formData);

  useEffect(() => {
    dispatch(fetchData(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {
    setProjectData(data);
  }, [data, projectId]);

  const parseCriteriaAndSetFormData = (criteria) => {
    const regex = /(\w+)\s*(<=|>=|<|>|==)\s*(\d+)/g;
    let match;
    const results = {};

    // Extract all the matching criteria
    while ((match = regex.exec(criteria)) !== null) {
      const [_, field, operator, amount] = match;
      if (!results[field]) {
        results[field] = [];
      }
      results[field].push({ operator, amount });
    }

    // Extract parsed criteria and set them in form data
    const updatedFormData = {
      minLoanOperator: results.loanAmount?.[0]?.operator || "",
      minLoanAmount: results.loanAmount?.[0]?.amount || "",
      maxLoanOperator: results.loanAmount?.[1]?.operator || "",
      maxLoanAmount: results.loanAmount?.[1]?.amount || "",
      minInstallmentsOperator:
        results.numberOfInstallments?.[0]?.operator || "",
      minInstallmentsAmount: results.numberOfInstallments?.[0]?.amount || "",
      maxInstallmentsOperator:
        results.numberOfInstallments?.[1]?.operator || "",
      maxInstallmentsAmount: results.numberOfInstallments?.[1]?.amount || "",
      tclOperator: results.tcl?.[0]?.operator || "",
      tclAmount: results.tcl?.[0]?.amount || "",
      openLoanOperator: results.freqCap?.[0]?.operator || "",
      openLoanAmount: results.freqCap?.[0]?.amount || "",
    };

    // Set form data with the parsed criteria
    setFormData((prevData) => ({
      ...prevData,
      ...updatedFormData,
    }));
  };

  useEffect(() => {
    if (ProjectData.length === 0) {
      console.log("Fetching data");
    } else {
      // Initial form data setup
      const initialFormData = {
        name: ProjectData.name,
        projectDescription: ProjectData.projectDescription,
        country: ProjectData.country,
        location: ProjectData.location,
        currencyName: ProjectData.currencyName,
        loanType: ProjectData.loanType,
        flatInterestRate: ProjectData.flatInterestRate,
        interestRatePeriod: ProjectData.interestRatePeriod,
        interestPeriodUnit: ProjectData.interestPeriodUnit,
        downRepaymentGracePeriod: ProjectData.downRepaymentGracePeriod,
        emiRepaymentGracePeriod: ProjectData.emiRepaymentGracePeriod,
        loanGracePeriod: ProjectData.loanGracePeriod,
        rollOverGracePeriod: ProjectData.rollOverGracePeriod,
        rollOverPenaltyFee: null,
        rollOverInterestRate: ProjectData.rollOverInterestRate,
        lateEmiPenaltyFactor: ProjectData.lateEmiPenaltyFactor,
        maxPaymetAttemps: ProjectData.maxPaymetAttemps,
        rollOverPenaltyFactor: ProjectData.rollOverPenaltyFactor,
        startDate: formattedDate(ProjectData.startDate),
        endDate: formattedDate(ProjectData.endDate),
        serviceFee: ProjectData.serviceFee,
        clientIds: ProjectData.clientIds,
        hasEarlyLateRepayment: ProjectData.hasEarlyLateRepayment,
        calculateInterest: ProjectData.calculateInterest,
        downPaymentPercentage: ProjectData.downPaymentPercentage,
        tclIncludeFee: ProjectData.tclIncludeFee,
        tclIncludeInterest: ProjectData.tclIncludeInterest,
        lateRepaymentPenalty: ProjectData.lateRepaymentPenalty,
        earlyRepaymentDiscount: ProjectData.earlyRepaymentDiscount,
        hasDownPayment: ProjectData.hasDownPayment,
        managementFee: ProjectData.managementFee,
        vatFee: ProjectData.vatFee,
        // Criteria fields initialized as empty, will be updated by parseCriteriaAndSetFormData
        minLoanAmount: "",
        maxLoanAmount: "",
        minLoanOperator: "",
        maxLoanOperator: "",
        minInstallmentsAmount: "",
        maxInstallmentsOperator: "",
        maxInstallmentsAmount: "",
        minInstallmentsOperator: "",
        tclAmount: "",
        tclOperator: "",
        openLoanAmount: "",
        openLoanOperator: "",
      };

      // Set the initial form data
      setFormData(initialFormData);

      // Parse the criteria and set additional form data
      parseCriteriaAndSetFormData(ProjectData.criteria);
    }
  }, [ProjectData]);

  useEffect(() => {
    setFilteredLocations(locationOptions[formData.country] || []);
  }, [formData.country]);

  const handleChange = (e) => {
    // Check if e is an event or a string
    if (typeof e === "string") {
      setFormData((prevState) => ({ ...prevState, name: e }));
      toast.custom((t) => (
        <Warning
          t={t}
          toast={toast}
          title={"Not Updated Yet"}
          message={"To confirm the name change click Update button"}
        />
      ));
    } else {
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
    }
  };

  const handleUpdate = async () => {
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
      projectTimeZone: ProjectData.projectTimeZone,
      paymentOption: ProjectData.paymentOption,
      bearers: ProjectData.bearers,
      projectId: projectId,
      criteria: `tcl ${formData.tclOperator} ${formData.tclAmount
        } and loanAmount ${formData.minLoanOperator} ${formData.minLoanAmount
        } and loanAmount ${formData.maxLoanOperator} ${formData.maxLoanAmount
        } and numberOfInstallments ${formData.minInstallmentsOperator} ${formData.minInstallmentsAmount
        } and numberOfInstallments ${formData.maxInstallmentsOperator} ${formData.maxInstallmentsAmount
        } and freqCap ${formData.openLoanOperator} ${formData.openLoanAmount}${formData.loanType === "asset"
          ? ` and downPaymentPercentage ${formData.downPaymentOperator} ${formData.downPaymentPercentage}`
          : ""
        }`,
    };
    try {
      const authToken = localStorage.getItem("projectToken");
      const response = await fetch(`${import.meta.env.VITE_PROJECT_UPDATE}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(postData),
      });

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
      dispatch(fetchProjectData())

      const responseData = await response.json();
      console.log("Project updated successfully:", responseData);
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("projectToken");
      // First, send a DELETE request
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_PROJECT_DELETE}${projectId}`,
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
      dispatch(fetchProjectData())

      navigate("/project/projectPage");
      // Refresh the page after navigation
      // window.location.reload();

      // After deletion, fetch the updated data list
    } catch (error) {
      console.error(error);
      // Optionally, handle the error in the UI, such as showing an error message
    }
  };

  const divStyle = {
    gridColumn: "span 1",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
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

  // if (ProjectData.length === 0) {
  //   return <LoadingState />;
  // }

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }
  // console.log(data);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex justify-between items-center mb-3">
        <DynamicName initialName={formData.name} onSave={handleChange} />
        <Button
          buttonIcon={TrashIcon}
          onClick={() => handleDelete()}
          circle={true}
        />
      </div>
      <form className="flex flex-col gap-8">
        <ContainerTile>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
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
        </ContainerTile>

        <ContainerTile>
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
                  className={`flex-1 w-full ${formData.loanType === "cash" && "hidden"
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
        </ContainerTile>

        <ContainerTile>
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
        </ContainerTile>
        <div className="flex items-center justify-end gap-4 mt-4">
          <Button
            buttonName={"Update"}
            buttonIcon={CheckCircleIcon}
            onClick={handleUpdate}
            rectangle={true}
          />
        </div>
      </form>
    </>
  );
};

export default Project;
