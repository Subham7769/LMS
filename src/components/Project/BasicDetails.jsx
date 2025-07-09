import React, { useEffect, useState } from "react";
import {
  countryOptions,
  currencyOptions,
  locationOptions,
} from "../../data/CountryData";
import { loanTypeOptions, operatorOptions } from "../../data/OptionsData";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputDate from "../Common/InputDate/InputDate";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputRange from "../Common/InputRange/InputRange";
import { useLocation, useOutletContext } from "react-router-dom";
import ToggleSwitch from "../Common/ToggleSwitch/ToggleSwitch";

const BasicDetails = () => {
  const { projectData, handleChange } = useOutletContext();
  const [filteredLocations, setFilteredLocations] = useState([]);
  const location = useLocation();
  const isNewProject = location.pathname.includes("newProject");

  useEffect(() => {
    setFilteredLocations(locationOptions[projectData.country] || []);
  }, [projectData.country]);

  // console.log(projectData)

  return (
    <>
      <h2 className="text-2xl text-gray-800 dark:text-gray-100 font-bold mb-5">
        Basic Details
      </h2>
      <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
        Schema Overview
      </h2>
      <div
        className={`grid ${
          isNewProject ? "grid-cols-2" : "grid-cols-1"
        } gap-2 mb-2`}
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
      <div className="grid md:grid-cols-2  grid-cols-1 gap-2 mb-6">
        {/* Country */}
        <InputSelect
          labelName={"Country"}
          inputName={"country"}
          inputOptions={countryOptions}
          inputValue={projectData?.country}
          onChange={handleChange}
          isValidation={true}
          searchable={true}
          isClearable={true}
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
          isClearable={true}
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
          isClearable
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
        <>
          <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold">
            Asset Loan Setup
          </h2>
          <div
            className={`${
              (projectData.loanType === "cash" ||
                projectData.loanType === "") &&
              "hidden"
            }`}
          >
            <ToggleSwitch
              label="Down Payment"
              description="Enable down payment for asset-based loans."
              inputName="hasDownPayment"
              inputChecked={projectData?.hasDownPayment}
              onChange={handleChange}
              disabled={projectData?.loanType !== "asset"} // cleaner condition
            />
          </div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-2 mb-6">
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
        </>
      )}
      <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
        Duration & Limits
      </h2>
      <div className="grid md:grid-cols-2  grid-cols-1 gap-5 mb-2">
        {/* Start Date */}
        <div className="col-span-1">
          <InputDate
            labelName={"Validity Period"}
            inputName={"startDate"}
            inputValue={projectData?.startDate}
            onChange={handleChange}
            isValidation={true}
            isDisabled={isNewProject ? false : true}
          />
        </div>

        {/* End Date */}
        <div className="col-span-1 mt-6">
          <InputDate
            inputName={"endDate"}
            inputValue={projectData?.endDate}
            onChange={handleChange}
            isValidation={true}
            isDisabled={isNewProject ? false : true}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 ">
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
    </>
  );
};

export default BasicDetails;
