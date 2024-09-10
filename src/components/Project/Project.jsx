import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  CheckCircleIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
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
import {
  fetchData,
  setFormData,
  handleChangeInFormData,
  updateProject,
  deleteProject,
} from "../../redux/Slices/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";

const Project = () => {
  const [clientIdsString, setClientIdsString] = useState("DarwinClient");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const { projectId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formData, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchData(projectId));
  }, [dispatch, projectId]);

  // console.log(formData);

  useEffect(() => {
    setFilteredLocations(locationOptions[formData.country] || []);
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target; // Extracting only the name and value properties
    dispatch(handleChangeInFormData({ name, value, checked, type })); // Passing only the serializable data
  };

  const updateName = (name) => {
    dispatch(setFormData({ name: "name", value: name }));
    dispatch(fetchProjectData());
    // toast.custom((t) => (
    //   <Warning
    //     t={t}
    //     toast={toast}
    //     title={"Not Updated Yet"}
    //     message={"To confirm the name change click Update button"}
    //   />
    // ));
  };

  const handleUpdate = () => {
    dispatch(updateProject({ formData, projectId, clientIdsString }));
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("projectToken");
    await dispatch(deleteProject({ projectId, token })).unwrap();
    dispatch(fetchProjectData());
    navigate("/project");
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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    <p>Error: {error}</p>;
  }
  // console.log(data);

  const Content = () => {
    return (
      <>
        <div className="flex justify-between items-center mb-3">
          <DynamicName
            initialName={formData.name}
            onSave={updateName}
            editable={false}
          />
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
              {/* {false
                ? "demo"
                : (() => {
                    throw new Error("Simulated Error");
                  })()} */}
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

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SectionErrorBoundary>
        <Content />
      </SectionErrorBoundary>
    </>
  );
};

export default Project;
