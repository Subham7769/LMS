import React, { useState } from "react";
import { FiUpload, FiPlus, FiRotateCcw } from "react-icons/fi";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputTextArea from "../../Common/InputTextArea/InputTextArea";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { countryOptions } from "../../../data/CountryData";
import InputFile from "../../Common/InputFile/InputFile";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import Button from "../../Common/Button/Button";
import Accordion from "../../Common/Accordion/Accordion";
import { maritalStatus } from "../../../data/LosData";

import {
  updateBorrowerField,
  resetBorrowerData,
} from "../../../redux/Slices/borrowersSlice";
import { useDispatch, useSelector } from "react-redux";

const AddBorrowers = () => {
  const dispatch = useDispatch();

  const { addBorrowerData } = useSelector((state) => state.borrowers);

  console.log(addBorrowerData);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(updateBorrowerField({ name, value, type, checked }));
    
  };

  const handleFileUpload = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(files[0].name);
    dispatch(
      updateBorrowerField({ name, value: files[0].name, type, checked })
    );
    s
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful!");
  };

  const personalDetails = (addBorrowerData) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Title Dropdown */}
      <InputSelect
        labelName="Title"
        inputName="title"
        inputOptions={[
          { value: "Mr.", label: "Mr." },
          { value: "Ms.", label: "Ms." },
          { value: "Mrs.", label: "Mrs." },
          { value: "Dr.", label: "Dr." },
          { value: "Prof.", label: "Prof." },
        ]}
        inputValue={addBorrowerData.title}
        onChange={handleInputChange}
        isValidation={true}
      />

      {/* First Name Input Fields */}
      <InputText
        labelName="First Name"
        inputName="firstName"
        inputValue={addBorrowerData.firstName}
        onChange={handleInputChange}
        placeHolder="Enter First Name"
        isValidation={true}
      />

      {/*Last Name Input Fields  */}
      <InputText
        labelName="Last Name"
        inputName="lastName"
        inputValue={addBorrowerData.lastName}
        onChange={handleInputChange}
        placeHolder="Enter Last Name"
        isValidation={true}
      />

      {/* Gender Dropdown */}
      <InputSelect
        labelName="Gender"
        inputName="gender"
        inputOptions={[
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ]}
        inputValue={addBorrowerData.gender}
        onChange={handleInputChange}
        isValidation={true}
      />

      {/* Marital Status Dropdown */}
      <InputSelect
        labelName="Marital Status"
        inputName="maritalStatus"
        inputOptions={maritalStatus}
        inputValue={addBorrowerData.gender}
        onChange={handleInputChange}
        isValidation={true}
      />

      {/* Country Dropdown */}
      <InputSelect
        labelName="Nationality"
        inputName="nationality"
        inputOptions={countryOptions}
        inputValue={addBorrowerData.nationality}
        onChange={handleInputChange}
        isValidation={true}
      />

      {/* DOB */}
      <div className="col-span-1">
        <InputDate
          labelName="Date of Birth"
          inputName="dateOfBirth"
          inputValue={addBorrowerData.dateOfBirth}
          onChange={handleInputChange}
          isValidation={true}
        />
      </div>

      {/*Place of Birth Input Fields  */}
      <InputText
        labelName="Place of Birth"
        inputName="placeOfBirth"
        inputValue={addBorrowerData.placeOfBirth}
        onChange={handleInputChange}
        placeHolder="Enter Name"
        isValidation={true}
      />
    </div>
  );

  return (
    <>
      <Accordion
        heading={"Personal Details"}
        renderExpandedContent={() => personalDetails(addBorrowerData)}
      />
      <ContainerTile className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* {personalDetails(addBorrowerData)} */}

        {/* Working Status Dropdown */}
        <InputSelect
          labelName="Working Status"
          inputName="workingStatus"
          inputOptions={[
            { value: "Employed", label: "Employed" },
            { value: "Self-Employed", label: "Self-Employed" },
            { value: "Unemployed", label: "Unemployed" },
            { value: "Student", label: "Student" },
            { value: "Retired", label: "Retired" },
          ]}
          inputValue={addBorrowerData.workingStatus}
          onChange={handleInputChange}
          isValidation={true}
        />

        <InputText
          labelName="Unique Number"
          inputName="uniqueNumber"
          inputValue={addBorrowerData.uniqueNumber}
          onChange={handleInputChange}
          placeHolder="Enter Unique Number"
          isValidation={true}
        />

        <InputText
          labelName="Business Name"
          inputName="businessName"
          inputValue={addBorrowerData.businessName}
          onChange={handleInputChange}
          placeHolder="Enter Business Name"
        />

        <InputText
          labelName="Mobile"
          inputName="mobile"
          inputValue={addBorrowerData.mobile}
          onChange={handleInputChange}
          placeHolder="Enter Mobile Number"
          isValidation={true}
        />

        <InputText
          labelName="Email"
          inputName="email"
          inputValue={addBorrowerData.email}
          onChange={handleInputChange}
          placeHolder="Enter Email"
          isValidation={true}
        />

        <InputText
          labelName="Address"
          inputName="address"
          inputValue={addBorrowerData.address}
          onChange={handleInputChange}
          placeHolder="Enter Address"
          isValidation={true}
        />

        <InputText
          labelName="City"
          inputName="city"
          inputValue={addBorrowerData.city}
          onChange={handleInputChange}
          placeHolder="Enter City"
          isValidation={true}
        />

        <InputText
          labelName="State"
          inputName="state"
          inputValue={addBorrowerData.state}
          onChange={handleInputChange}
          placeHolder="Enter State"
          isValidation={true}
        />

        <InputNumber
          labelName="Zipcode"
          inputName="zipcode"
          inputValue={addBorrowerData.zipcode}
          onChange={handleInputChange}
          placeHolder="Enter Zipcode"
          isValidation={true}
        />

        <InputText
          labelName="Landline Phone"
          inputName="landlinePhone"
          inputValue={addBorrowerData.landlinePhone}
          onChange={handleInputChange}
          placeHolder="Enter Landline Number"
        />

        <InputNumber
          labelName="Credit Score"
          inputName="creditScore"
          inputValue={addBorrowerData.creditScore}
          onChange={handleInputChange}
          placeHolder="Enter Credit Score"
          isValidation={true}
        />

        {/* Loan Officer Access Checkbox */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Loan Officer Access
          </label>
          <div className="flex items-center align-middle  bg-gray-200 rounded-lg py-1 px-3">
            <input
              type="checkbox"
              name="loanOfficerAccess"
              checked={addBorrowerData.loanOfficerAccess}
              onChange={handleInputChange}
              className="w-7 h-7 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all"
            />
            <label className="text-sm font-semibold text-gray-700 text-center py-2 w-full">
              Tahseen Jamal
            </label>
          </div>
        </div>

        <InputTextArea
          labelName="Description"
          inputName="description"
          inputValue={addBorrowerData.description}
          onChange={handleInputChange}
          rowCount={3}
        />

        <InputFile
          labelName="Borrower Photo"
          inputName="borrowerPhotoId"
          onChange={handleFileUpload}
          accept=".jpg,.png"
          placeholder="Click or drag to upload"
        />

        {/* Save Button */}
        <div className="flex justify-between col-span-4 mx-10">
          <Button
            buttonName="Reset"
            onClick={() => dispatch(resetBorrowerData())}
            rectangle={true}
          />
          <Button
            buttonName="Add Borrower"
            onClick={() => {}}
            rectangle={true}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default AddBorrowers;
