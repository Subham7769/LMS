import React, { useState } from "react";
import { FiUpload, FiPlus } from "react-icons/fi";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputDate from "../../Common/InputDate/InputDate";
import InputTextArea from "../../Common/InputTextArea/InputTextArea";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { countryOptions } from "../../../data/CountryData";
import InputFile from "../../Common/InputFile/InputFile";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";

const AddBorrowers = () => {
  const [formData, setFormData] = useState({
    country: "",
    gender: "",
    title: "",
    workingStatus: "",
    firstName: "",
    lastName: "",
    uniqueNumber: "",
    businessName: "",
    mobile: "",
    email: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    landlinePhone: "",
    creditScore: "",
    loanOfficerAccess: false,
    description: "",
    borrowerPhoto: null,
    borrowerFiles: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Registration successful!");
  };

  return (
    <ContainerTile>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-5"
      >
        {/* Country Dropdown */}
        <InputSelect
          labelName="Country"
          inputName="country"
          inputOptions={countryOptions}
          inputValue={formData.country}
          onChange={handleInputChange}
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
          inputValue={formData.gender}
          onChange={handleInputChange}
          isValidation={true}
        />

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
          inputValue={formData.title}
          onChange={handleInputChange}
          isValidation={true}
        />

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
          inputValue={formData.workingStatus}
          onChange={handleInputChange}
          isValidation={true}
        />

        {/* Input Fields */}
        <InputText
          labelName="First Name"
          inputName="firstName"
          inputValue={formData.firstName}
          onChange={handleInputChange}
          placeHolder="Enter First Name"
          isValidation={true}
        />

        <InputText
          labelName="Last Name"
          inputName="lastName"
          inputValue={formData.lastName}
          onChange={handleInputChange}
          placeHolder="Enter Last Name"
          isValidation={true}
        />

        <InputText
          labelName="Unique Number"
          inputName="uniqueNumber"
          inputValue={formData.uniqueNumber}
          onChange={handleInputChange}
          placeHolder="Enter Unique Number"
          isValidation={true}
        />

        <InputText
          labelName="Business Name"
          inputName="businessName"
          inputValue={formData.businessName}
          onChange={handleInputChange}
          placeHolder="Enter Business Name"
        />

        <InputText
          labelName="Mobile"
          inputName="mobile"
          inputValue={formData.mobile}
          onChange={handleInputChange}
          placeHolder="Enter Mobile Number"
          isValidation={true}
        />

        <InputText
          labelName="Email"
          inputName="email"
          inputValue={formData.email}
          onChange={handleInputChange}
          placeHolder="Enter Email"
          isValidation={true}
        />

        <div className="col-span-1">
          <InputDate
            labelName="Date of Birth"
            inputName="dateOfBirth"
            inputValue={formData.dateOfBirth}
            onChange={handleInputChange}
            isValidation={true}
          />
        </div>

        <InputText
          labelName="Address"
          inputName="address"
          inputValue={formData.address}
          onChange={handleInputChange}
          placeHolder="Enter Address"
          isValidation={true}
        />

        <InputText
          labelName="City"
          inputName="city"
          inputValue={formData.city}
          onChange={handleInputChange}
          placeHolder="Enter City"
          isValidation={true}
        />

        <InputText
          labelName="State"
          inputName="state"
          inputValue={formData.state}
          onChange={handleInputChange}
          placeHolder="Enter State"
          isValidation={true}
        />

        <InputNumber
          labelName="Zipcode"
          inputName="zipcode"
          inputValue={formData.zipcode}
          onChange={handleInputChange}
          placeHolder="Enter Zipcode"
          isValidation={true}
        />

        <InputText
          labelName="Landline Phone"
          inputName="landlinePhone"
          inputValue={formData.landlinePhone}
          onChange={handleInputChange}
          placeHolder="Enter Landline Number"
        />

        <InputNumber
          labelName="Credit Score"
          inputName="creditScore"
          inputValue={formData.creditScore}
          onChange={handleInputChange}
          placeHolder="Enter Credit Score"
          isValidation={true}
        />

        {/* <div className={`flex-1 w-full pt-4`}>
            <InputCheckbox
              labelName="Loan Officer Access"
              inputName="loanOfficerAccess"
              inputChecked={formData.loanOfficerAccess}
              onChange={handleInputChange}
            />
          </div> */}

        {/* Loan Officer Access Checkbox */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Loan Officer Access
          </label>
          <div className="flex items-center align-middle  bg-gray-200 rounded-lg py-1 px-3">
            <input
              type="checkbox"
              name="loanOfficerAccess"
              checked={formData.loanOfficerAccess}
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
          inputValue={formData.description}
          onChange={handleInputChange}
          rowCount={3}
        />

        <InputFile
          labelName="Borrower Photo"
          inputName="borrowerPhoto"
          onChange={handleFileUpload}
          accept=".jpg,.png"
          placeholder="Click or drag to upload"
        />

        {/* Save Button */}
        <div className="flex justify-center col-span-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
          >
            <FiPlus className="mr-2" /> Add Borrower
          </button>
        </div>
      </form>
    </ContainerTile>
  );
};

export default AddBorrowers;
