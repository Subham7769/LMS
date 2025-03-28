import React, { useEffect, useState } from "react";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  countryOptions,
  currencyOptions,
  locationOptions,
} from "../../data/CountryData";
import {
  interestPeriodOptions,
  loanTypeOptions,
  operatorOptions,
  tenureTypeOptions,
} from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputDate from "../Common/InputDate/InputDate";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../Common/InputSelect/InputSelect";
import CardInfo from "../Common/CardInfo/CardInfo";
import InputRange from "../Common/InputRange/InputRange";
import {
  DocumentTextIcon,
  CogIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

import { useLocation } from "react-router-dom";

const ProjectInputFields = ({
  projectData,
  handleChange,
  addNoEditToast,
  clientIdsString,
  setClientIdsString,
  loading,
  error,
}) => {
  const [filteredLocations, setFilteredLocations] = useState([]);
  const location = useLocation();
  const isNewProject = location.pathname.includes("newProject");

  useEffect(() => {
    setFilteredLocations(locationOptions[projectData.country] || []);
  }, [projectData.country]);

  // console.log(projectData)

  return (
    <>
      <ContainerTile
        className={"grid grid-cols-1 gap-5 md:grid-cols-2"}
        loading={loading}
        defaultClass={false}
      >
        <CardInfo
          cardTitle="Basic Details & Amount"
          className={"border"}
          cardIcon={DocumentTextIcon}
          colorText={"text-blue-primary"}
          colorBG={"bg-white"}
        >
          <div
            className={`grid ${isNewProject ? "grid-cols-2" : "grid-cols-1"
              } gap-5 mb-5`}
          >
            {/* Name */}
            {isNewProject && (
              <InputText
                labelName={"Name"}
                inputName={"name"}
                inputValue={projectData.name}
                onChange={handleChange}
                placeHolder={"Project Name"}
                isValidation={true}
              />
            )}
            {/* Description */}
            <InputText
              labelName={"Description"}
              inputName={"projectDescription"}
              inputValue={projectData?.projectDescription}
              onChange={handleChange}
              placeHolder={"Description"}
              isValidation={true}
            />
          </div>
          <div className="grid md:grid-cols-2  grid-cols-1 gap-5 mb-5">
            {/* Country */}
            <InputSelect
              labelName={"Country"}
              inputName={"country"}
              inputOptions={countryOptions}
              inputValue={projectData?.country}
              onChange={handleChange}
              isValidation={true}
              searchable={true}
            />

            {/* Location */}
            <InputSelect
              labelName={"Location"}
              inputName={"location"}
              inputOptions={filteredLocations}
              inputValue={projectData?.location}
              onChange={handleChange}
              isValidation={true}
              searchable={true}
            />

            {/* Loan Scheme Currency */}
            <InputSelect
              labelName={"Currency"}
              inputName={"currencyName"}
              inputOptions={currencyOptions}
              inputValue={projectData?.currencyName}
              onChange={handleChange}
              isValidation={true}
              searchable={true}
            />

            {/* Loan Scheme Type */}
            <InputSelect
              labelName={"Scheme Type"}
              inputName={"loanType"}
              inputOptions={loanTypeOptions}
              inputValue={projectData?.loanType}
              onChange={handleChange}
              isValidation={true}
            />
          </div>
          {projectData?.loanType === "asset" && (
            <div className="grid md:grid-cols-4  grid-cols-1 gap-5 mb-5">
              <div
                className={`mt-4 ${(projectData.loanType === "cash" ||
                  projectData.loanType === "") &&
                  "hidden"
                  }`}
              >
                <InputCheckbox
                  labelName={"Down Payment"}
                  inputName={"hasDownPayment"}
                  inputChecked={projectData?.hasDownPayment}
                  onChange={handleChange}
                  disabled={projectData?.loanType === "asset" ? false : true}
                />
              </div>

              {projectData.hasDownPayment && (
                <>
                  <InputSelect
                    labelName={"Down Payment Way"}
                    inputName={"downPaymentWay"}
                    inputOptions={[
                      { value: "fixed", label: "Fixed" },
                      { value: "%", label: "%" },
                    ]}
                    inputValue={projectData.downPaymentWay}
                    onChange={handleChange}
                    defaultValue={{ value: "fixed", label: "Fixed" }}
                  />
                  <InputSelect
                    labelName={"Operator"}
                    inputName={"downPaymentOperator"}
                    inputOptions={operatorOptions}
                    inputValue={projectData.downPaymentOperator}
                    onChange={handleChange}
                  />
                  <InputNumber
                    labelName={"Value"}
                    inputName={"downPaymentPercentage"}
                    inputValue={projectData?.downPaymentPercentage}
                    onChange={handleChange}
                    placeHolder={"2"}
                    isValidation={true}
                  />
                </>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 mb-5">
            <InputRange
              labelName={"Loan Amount Range"}
              labelNameMin={"Min"}
              labelNameMax={"Max"}
              inputNameMin="minLoanAmount"
              inputNameMax="maxLoanAmount"
              inputValueMin={projectData?.minLoanAmount}
              inputValueMax={projectData?.maxLoanAmount}
              placeHolder="Select a value"
              min={0}
              max={1000000}
              handleMinChange={handleChange}
              handleMaxChange={handleChange}
              unitSymbol={"$"}
            />
            <InputRange
              labelName={"Installment Range"}
              labelNameMin={"Min"}
              labelNameMax={"Max"}
              inputNameMin="minInstallmentsAmount"
              inputNameMax="maxInstallmentsAmount"
              inputValueMin={projectData?.minInstallmentsAmount}
              inputValueMax={projectData?.maxInstallmentsAmount}
              placeHolder="Select a value"
              min={1}
              max={24}
              handleMinChange={handleChange}
              handleMaxChange={handleChange}
              unitSymbol={"Month"}
              unitSymbolAfter={true}
            />
          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Interest & Periods"
          className={"border"}
          cardIcon={CurrencyDollarIcon}
          colorText={"text-green-primary"}
          colorBG={"bg-white"}
        >
          <div className={`mb-5`}>
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 mb-5`}>
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
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"}>
              {/* Start Date */}
              <div className="col-span-1" onClick={addNoEditToast}>
                <InputDate
                  labelName={"Validity Period"}
                  inputName={"startDate"}
                  inputValue={projectData?.startDate}
                  onChange={addNoEditToast}
                  isValidation={true}
                />
              </div>

              {/* End Date */}
              <div className="col-span-1 mt-5">
                <InputDate
                  labelName={""}
                  inputName={"endDate"}
                  inputValue={projectData?.endDate}
                  onChange={handleChange}
                  isValidation={true}
                />
              </div>
            </div>
            <div>
              <span className="p-2 py-1 block w-fit bg-gray-200 rounded-t-md">Roll Over</span>
              <div className="border-t-2 py-2">
                <div className={"grid grid-cols-1 md:grid-cols-3 gap-5 mb-5"}>
                  {/* Roll Over Interest Rate */}
                  <InputNumber
                    labelName={"Interest"}
                    inputName={"rollOverInterestRate"}
                    inputValue={projectData?.rollOverInterestRate}
                    onChange={handleChange}
                    inputValuePercentage={true}
                    placeHolder={"6"}
                    isValidation={true}
                  />

                  <InputNumber
                    labelName="Tenure"
                    inputName="rollOverTenure"
                    inputValue={projectData?.rollOverTenure}
                    onChange={handleChange}
                    placeHolder="3"
                  />
                  <InputSelect
                    labelName="Tenure Type"
                    inputName="rollOverTenureType"
                    inputValue={projectData?.rollOverTenureType}
                    inputOptions={tenureTypeOptions}
                    onChange={handleChange}
                  />

                  {/* Roll Over Period (Days) */}
                  <InputNumber
                    labelName={"Period (Days)"}
                    inputName={"rollOverGracePeriod"}
                    inputValue={projectData?.rollOverGracePeriod}
                    onChange={handleChange}
                    placeHolder={"30"}
                    isValidation={true}
                  />
                  {/* RollOver Penalty Factor */}
                  <InputText
                    labelName={"Fixed Price"}
                    inputName={"rollOverPenaltyFactor"}
                    inputValue={projectData?.rollOverPenaltyFactor}
                    onChange={handleChange}
                    placeHolder={"0"}
                    isValidation={true}
                  />
                </div>
              </div>
            </div>

            <div>
              <span className="p-2 py-1 block w-fit bg-gray-200 rounded-t-md">Late Penalty & Discount</span>
              <div className="border-t-2 py-2">
                <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"}>
                  {/* Late EMI Penalty */}
                  <InputText
                    labelName={"Late EMI Penalty"}
                    inputName={"lateEmiPenaltyFactor"}
                    inputValue={projectData?.lateEmiPenaltyFactor}
                    onChange={handleChange}
                    placeHolder={"6"}
                    isValidation={true}
                  />
                  {/* Late Repayment Penalty */}
                  <InputText
                    labelName={"Late Repayment Penalty (%)"}
                    inputName={"lateRepaymentPenalty"}
                    inputValue={projectData?.lateRepaymentPenalty}
                    onChange={handleChange}
                    placeHolder={"10"}
                    isValidation={true}
                  />
                  {/* Late Penalty Period  */}
                  <InputNumber
                    labelName={"Penalty Period (Days)"}
                    inputName={"latePenaltyPeriod"}
                    inputValue={projectData?.latePenaltyPeriod}
                    onChange={handleChange}
                    placeHolder={"30"}
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

                </div>
              </div>
            </div>
          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Recurring Fees & Grace Periods"
          className={"border"}
          cardIcon={ClockIcon}
          colorText={"text-orange-primary"}
          colorBG={"bg-white"}
        >
          <div className={`mb-5`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-5`}>
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
              <InputText
                labelName={"Vat Fee"}
                inputName={"vatFee"}
                inputValue={projectData?.vatFee}
                onChange={handleChange}
                placeHolder={"15%"}
                isValidation={true}
              />
              {/* Grace Period For Down Payment (Days) */}
              <InputNumber
                labelName={"Down Payment Grace (Days)"}
                inputName={"downRepaymentGracePeriod"}
                inputValue={projectData?.downRepaymentGracePeriod}
                onChange={handleChange}
                placeHolder={"30"}
                isValidation={true}
              />

              {/* Grace Period For EMIs (Days) */}
              <InputNumber
                labelName={"EMIs Grace (Days)"}
                inputName={"emiRepaymentGracePeriod"}
                inputValue={projectData?.emiRepaymentGracePeriod}
                onChange={handleChange}
                placeHolder={"30"}
                isValidation={true}
              />

              {/* Loan Grace Period (Days) */}
              <InputNumber
                labelName={"Loan Grace (Days)"}
                inputName={"loanGracePeriod"}
                inputValue={projectData?.loanGracePeriod}
                onChange={handleChange}
                placeHolder={"30"}
                isValidation={true}
              />
            </div>

          </div>
        </CardInfo>
        <CardInfo
          cardTitle="Capping & Additional Settings"
          className={"border"}
          cardIcon={CogIcon}
          colorText={"text-violet-primary"}
          colorBG={"bg-white"}
        >
          <div className={`mb-5`}>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 mb-5`}>
              {/* Max. Payment Attempt */}
              <InputNumber
                labelName={"Max Attempts"}
                inputName={"maxPaymetAttemps"}
                inputValue={projectData?.maxPaymetAttemps}
                onChange={handleChange}
                placeHolder={"2"}
                isValidation={true}
              />
              <InputNumber
                labelName={"Total Open Loans"}
                inputName={"openLoanAmount"}
                inputValue={projectData?.openLoanAmount}
                onChange={handleChange}
                placeHolder={"2"}
                isValidation={true}
              />
              <InputNumber
                labelName={"Loan Scheme TCL"}
                inputName={"tclAmount"}
                inputValue={projectData?.tclAmount}
                onChange={handleChange}
                placeHolder={"2"}
                isValidation={true}
              />
              {/* RollOver Penalty Factor */}
              <InputText
                labelName={"Client Ids"}
                inputName={"clientIds"}
                inputValue={clientIdsString}
                onChange={(e) => setClientIdsString(e.target.value)}
                placeHolder={"DEV-lmsClient"}
                isValidation={true}
              />
            </div>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-5 mb-5"}>
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

          {/* Loan Amount Range min>- max<= */}
          {/* Loan Scheme TCL operator <= */}
          {/* Total Open Loans TCL operator <= */}
        </CardInfo>
      </ContainerTile>
    </>
  );
};

export default ProjectInputFields;
