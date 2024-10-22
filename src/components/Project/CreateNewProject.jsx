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
import { fetchProjectData } from "../../redux/Slices/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  setProjectData,
  resetProjectData,
  handleChangeInProjectData,
  createProject,
} from "../../redux/Slices/projectSlice";

import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";

const CreateNewProject = () => {
  const navigate = useNavigate();
  const { projectName } = useParams();
  const [clientIdsString, setClientIdsString] = useState("lmsClient");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const dispatch = useDispatch();
  const { projectData, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    setFilteredLocations(locationOptions[projectData.country] || []);
  }, [projectData.country]);

  useEffect(() => {
    if (projectName) {
      dispatch(resetProjectData());
      dispatch(setProjectData({ name: "name", value: projectName }));
    }
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, projectName]);

  // console.log(projectData);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target; // Extracting only the name and value properties
    dispatch(handleChangeInProjectData({ name, value, checked, type })); // Passing only the serializable data
  };

  const createNewProject = async (event) => {
    event.preventDefault();
    await dispatch(validateForm(projectData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      try {
        const Details = await dispatch(
          createProject({ projectData, clientIdsString })
        ).unwrap();
        dispatch(fetchProjectData());
        navigate("/project/" + Details.projectId);
      } catch (err) {
        if (err === "Unauthorized") {
          navigate("/login");
        }
      }
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
      <form className="flex flex-col gap-8">
        <ContainerTile>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Name */}
            <InputText
              labelName={"Name"}
              inputName={"name"}
              inputValue={projectData.name}
              onChange={handleChange}
              placeHolder={"Project Name"}
              isValidation={true}
            />

            {/* Description */}
            <InputText
              labelName={"Description"}
              inputName={"projectDescription"}
              inputValue={projectData?.projectDescription}
              onChange={handleChange}
              placeHolder={"Description"}
              isValidation={true}
            />

            {/* Country */}
            <InputSelect
              labelName={"Country"}
              inputName={"country"}
              inputOptions={countryOptions}
              inputValue={projectData?.country}
              onChange={handleChange}
              isValidation={true}
            />

            {/* Location */}
            <InputSelect
              labelName={"Location"}
              inputName={"location"}
              inputOptions={filteredLocations}
              inputValue={projectData?.location}
              onChange={handleChange}
              isValidation={true}
            />

            {/* Loan Scheme Currency */}
            <InputSelect
              labelName={"Loan Scheme Currency"}
              inputName={"currencyName"}
              inputOptions={currencyOptions}
              inputValue={projectData?.currencyName}
              onChange={handleChange}
              isValidation={true}
            />

            {/* Loan Scheme Type */}
            <InputSelect
              labelName={"Loan Scheme Type"}
              inputName={"loanType"}
              inputOptions={loanTypeOptions}
              inputValue={projectData?.loanType}
              onChange={handleChange}
              isValidation={true}
            />

            {/* Flat Interest Rate */}
            <InputNumber
              labelName={"Flat Interest Rate"}
              inputName={"flatInterestRate"}
              inputValue={projectData?.flatInterestRate}
              onChange={handleChange}
              inputValuePercentage={true}
              placeHolder={"6"}
              isValidation={true}
            />

            {/* Interest Period Unit */}
            <InputSelect
              labelName={"Interest Period Unit"}
              inputName={"interestPeriodUnit"}
              inputOptions={interestPeriodOptions}
              inputValue={projectData?.interestPeriodUnit}
              onChange={handleChange}
              isValidation={true}
            />

            {/* Interest Rate Period */}
            <InputNumber
              labelName={"Interest Rate Period"}
              inputName={"interestRatePeriod"}
              inputValue={projectData?.interestRatePeriod}
              onChange={handleChange}
              placeHolder={"30"}
              isValidation={true}
            />

            {/* Grace Period For Down Payment (Days) */}
            <InputNumber
              labelName={"Down Payment Grace Period (Days)"}
              inputName={"downRepaymentGracePeriod"}
              inputValue={projectData?.downRepaymentGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
              isValidation={true}
            />

            {/* Grace Period For EMIs (Days) */}
            <InputNumber
              labelName={"EMIs Grace Period (Days)"}
              inputName={"emiRepaymentGracePeriod"}
              inputValue={projectData?.emiRepaymentGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
              isValidation={true}
            />

            {/* Loan Grace Period (Days) */}
            <InputNumber
              labelName={"Loan Grace Period (Days)"}
              inputName={"loanGracePeriod"}
              inputValue={projectData?.loanGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
              isValidation={true}
            />

            {/* Roll Over Period (Days) */}
            <InputNumber
              labelName={"Roll Over Period (Days)"}
              inputName={"rollOverGracePeriod"}
              inputValue={projectData?.rollOverGracePeriod}
              onChange={handleChange}
              placeHolder={"30"}
              isValidation={true}
            />

            {/* Roll Over Fees */}
            {/* <InputText
              labelName={"Roll Over Fees"}
              inputName={"rollOverPenaltyFee"}
              inputValue={projectData.rollOverPenaltyFee}
              onChange={handleChange}
              placeHolder={"xxxx /-"}
            /> */}

            {/* Roll Over Interest Rate */}
            <InputNumber
              labelName={"Roll Over Interest Rate"}
              inputName={"rollOverInterestRate"}
              inputValue={projectData?.rollOverInterestRate}
              onChange={handleChange}
              inputValuePercentage={true}
              placeHolder={"6"}
              isValidation={true}
            />

            {/* Late EMI Penalty */}
            <InputText
              labelName={"Late EMI Penalty"}
              inputName={"lateEmiPenaltyFactor"}
              inputValue={projectData?.lateEmiPenaltyFactor}
              onChange={handleChange}
              placeHolder={"6"}
              isValidation={true}
            />

            {/* Max. Payment Attempt */}
            <InputNumber
              labelName={"Max. Payment Attempt"}
              inputName={"maxPaymetAttemps"}
              inputValue={projectData?.maxPaymetAttemps}
              onChange={handleChange}
              placeHolder={"2"}
              isValidation={true}
            />

            {/* Start Date */}
            <div className="col-span-1" onClick={addNoEditToast}>
              <InputDate
                labelName={"Start Date"}
                inputName={"startDate"}
                inputValue={projectData?.startDate}
                onChange={handleChange}
                isValidation={true}
              />
            </div>

            {/* End Date */}
            <div className="col-span-1">
              <InputDate
                labelName={"End Date"}
                inputName={"endDate"}
                inputValue={projectData?.endDate}
                onChange={handleChange}
                isValidation={true}
              />
            </div>

            {/* Late Repayment Penalty */}
            <InputText
              labelName={"Late Repayment Penalty"}
              inputName={"lateRepaymentPenalty"}
              inputValue={projectData?.lateRepaymentPenalty}
              onChange={handleChange}
              placeHolder={"10%"}
              isValidation={true}
            />

            {/* Early Repayment Discount */}
            <InputText
              labelName={"Early Repayment Discount"}
              inputName={"earlyRepaymentDiscount"}
              inputValue={projectData?.earlyRepaymentDiscount}
              onChange={handleChange}
              placeHolder={"0"}
              isValidation={true}
            />

            {/* RollOver Penalty Factor */}
            <InputText
              labelName={"RollOver Penalty Factor"}
              inputName={"rollOverPenaltyFactor"}
              inputValue={projectData?.rollOverPenaltyFactor}
              onChange={handleChange}
              placeHolder={"0"}
              isValidation={true}
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
                inputSelectValue={projectData?.minLoanOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"minLoanAmount"}
                inputNumberValue={projectData?.minLoanAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"Min"}
                isValidation={true}
                inputSelect2Name={"maxLoanOperator"}
                inputSelect2Options={signsOptions}
                inputSelect2Value={projectData?.maxLoanOperator}
                onChangeSelect2={handleChange}
                disabledSelect2={false}
                hiddenSelect2={false}
                inputNumber2Name={"maxLoanAmount"}
                inputNumber2Value={projectData?.maxLoanAmount}
                onChangeNumber2={handleChange}
                placeHolderNumber2={"Max"}
                isValidation2={true}
              />
            </div>

            {/* Number of Installments */}
            <div style={divStyle}>
              <SelectAndNumber
                labelName={"No. of Installments"}
                inputSelectName={"minInstallmentsOperator"}
                inputSelectOptions={signsOptions}
                inputSelectValue={projectData?.minInstallmentsOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"minInstallmentsAmount"}
                inputNumberValue={projectData?.minInstallmentsAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"Min"}
                isValidation={true}
                inputSelect2Name={"maxInstallmentsOperator"}
                inputSelect2Options={signsOptions}
                inputSelect2Value={projectData?.maxInstallmentsOperator}
                onChangeSelect2={handleChange}
                disabledSelect2={false}
                hiddenSelect2={false}
                inputNumber2Name={"maxInstallmentsAmount"}
                inputNumber2Value={projectData?.maxInstallmentsAmount}
                onChangeNumber2={handleChange}
                placeHolderNumber2={"Max"}
                isValidation2={true}
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
                inputSelectValue={projectData?.tclOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"tclAmount"}
                inputNumberValue={projectData?.tclAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"TCL"}
                isValidation={true}
              />

              <SelectAndNumber
                labelName={"Total Open Loans"}
                inputSelectName={"openLoanOperator"}
                inputSelectOptions={signsOptions}
                inputSelectValue={projectData?.openLoanOperator}
                onChangeSelect={handleChange}
                disabledSelect={false}
                hiddenSelect={false}
                inputNumberName={"openLoanAmount"}
                inputNumberValue={projectData?.openLoanAmount}
                onChangeNumber={handleChange}
                placeHolderNumber={"Total Open Loans"}
                isValidation={true}
              />
            </div>

            {/* Down Payment */}
            <div style={divStyle}>
              <div className="flex items-center justify-center gap-2 w-full">
                <div
                  className={`flex-1 w-full ${
                    (projectData.loanType === "cash" ||
                      projectData.loanType === "") &&
                    "hidden"
                  }`}
                >
                  <InputCheckbox
                    labelName={"Down Payment"}
                    inputName={"hasDownPayment"}
                    inputChecked={projectData.hasDownPayment}
                    onChange={handleChange}
                    disabled={projectData.loanType === "asset" ? false : true}
                  />
                </div>
                {/* <div className="flex-1">
                  {projectData.hasDownPayment &&
                    <InputSelect
                      // labelName={"Fixed or %"}
                      inputName={"downPaymentWay"} inputOptions={[
                        { value: "fixed", label: "Fixed" },
                        { value: "%", label: "%" }
                      ]}
                      inputValue={projectData.downPaymentWay}
                      onChange={handleChange}
                      defaultValue={{ value: "fixed", label: "Fixed" }}
                    />
                  }
                </div> */}
              </div>

              <div className="flex items-center justify-center gap-2 w-full">
                {projectData.hasDownPayment &&
                  projectData.loanType === "asset" && (
                    <SelectAndNumber
                      inputSelectName={"downPaymentOperator"}
                      inputSelectOptions={signsOptions}
                      inputSelectValue={projectData.downPaymentOperator}
                      onChangeSelect={handleChange}
                      disabledSelect={false}
                      hiddenSelect={false}
                      inputNumberName={"downPaymentPercentage"}
                      inputNumberValue={projectData.downPaymentPercentage}
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
                  inputValue={projectData?.serviceFee}
                  onChange={handleChange}
                  placeHolder={"Service Fee"}
                  isValidation={true}
                />
                <InputText
                  labelName={"Management Fee"}
                  inputName={"managementFee"}
                  inputValue={projectData?.managementFee}
                  onChange={handleChange}
                  placeHolder={"14%"}
                  isValidation={true}
                />
              </div>
            </div>
            <div style={divStyle}>
              <div className="flex items-center justify-center gap-2 w-2/4">
                <InputText
                  labelName={"Vat Fee"}
                  inputName={"vatFee"}
                  inputValue={projectData?.vatFee}
                  onChange={handleChange}
                  placeHolder={"15%"}
                  isValidation={true}
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
                inputChecked={projectData.hasEarlyLateRepayment}
                onChange={handleChange}
              />
              <InputCheckbox
                labelName={"Calculate Interest"}
                inputName={"calculateInterest"}
                inputChecked={projectData.calculateInterest}
                onChange={handleChange}
              />
              <InputCheckbox
                labelName={"TCL Include Fee"}
                inputName={"tclIncludeFee"}
                inputChecked={projectData.tclIncludeFee}
                onChange={handleChange}
              />
              <InputCheckbox
                labelName={"TCL Include Interest"}
                inputName={"tclIncludeInterest"}
                inputChecked={projectData.tclIncludeInterest}
                onChange={handleChange}
              />
            </div>
          </div>
        </ContainerTile>
        <div className="flex mt-4  justify-end ">
          {/* Submit Button */}
          <button
            type="submit"
            onClick={createNewProject}
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

export default CreateNewProject;
