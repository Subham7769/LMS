import React, { useEffect, useState } from "react";
import { FiUpload, FiPlus, FiRotateCcw } from "react-icons/fi";
import InputText from "../../Common/InputText/InputText";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputEmail from "../../Common/InputEmail/InputEmail";
import InputDate from "../../Common/InputDate/InputDate";
import InputTextArea from "../../Common/InputTextArea/InputTextArea";
import InputCheckbox from "../../Common/InputCheckbox/InputCheckbox";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { countryOptions, locationOptions } from "../../../data/CountryData";
import InputFile from "../../Common/InputFile/InputFile";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import Button from "../../Common/Button/Button";
import Accordion from "../../Common/Accordion/Accordion";
import {
  maritalStatus,
  workType,
  title,
  gender,
  accountType,
  uniqueIDType,
} from "../../../data/LosData";

import {
  updateBorrowerField,
  resetBorrowerData,
} from "../../../redux/Slices/borrowersSlice";
import { useDispatch, useSelector } from "react-redux";

const AddBorrowers = () => {
  const dispatch = useDispatch();
  const [filteredLocations1, setFilteredLocations1] = useState([]);
  const [filteredLocations2, setFilteredLocations2] = useState([]);
  const { addBorrowerData } = useSelector((state) => state.borrowers);

  useEffect(() => {
    setFilteredLocations1(
      locationOptions[addBorrowerData.contactDetails.country] || []
    );
    setFilteredLocations2(
      locationOptions[addBorrowerData.nextOfKinDetails.kinCountry] || []
    );
  }, [
    addBorrowerData.contactDetails.country,
    addBorrowerData.nextOfKinDetails.kinCountry,
  ]);

  console.log(addBorrowerData.nextOfKinDetails);

  const handleInputChange = (e, section) => {
    const { name, value, type, checked } = e.target;
    // Use section to update the correct part of the state
    dispatch(
      updateBorrowerField({ section, field: name, value, type, checked })
    );
  };

  const handleFileUpload = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(files[0].name);
    dispatch(
      updateBorrowerField({ name, value: files[0].name, type, checked })
    );
    s;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration successful!");
  };

  const personalDetails = (personalDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Title Dropdown */}
      <InputSelect
        labelName="Title"
        inputName="title"
        inputOptions={title}
        inputValue={personalDetails.title}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        isValidation={true}
      />

      {/* Surname Input Fields */}
      <InputText
        labelName="Surname"
        inputName="surname"
        inputValue={personalDetails.surname}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        placeHolder="Enter Surname"
        isValidation={true}
      />

      {/*Other Name Input Fields  */}
      <InputText
        labelName="Other Name"
        inputName="otherName"
        inputValue={personalDetails.otherName}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        placeHolder="Enter Other Name"
        isValidation={true}
      />

      {/* "Unique ID Type Dropdown */}
      <InputSelect
        labelName="Unique ID Type"
        inputName="uniqueIDType"
        inputOptions={uniqueIDType}
        inputValue={personalDetails.uniqueIDType}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        isValidation={true}
      />

      {/* "Unique ID */}
      <InputText
        labelName="Unique ID"
        inputName="uniqueID"
        inputValue={personalDetails.uniqueID}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        placeHolder="Enter Unique ID"
        isValidation={true}
      />

      {/* Gender Dropdown */}
      <InputSelect
        labelName="Gender"
        inputName="gender"
        inputOptions={gender}
        inputValue={personalDetails.gender}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        isValidation={true}
      />

      {/* Marital Status Dropdown */}
      <InputSelect
        labelName="Marital Status"
        inputName="maritalStatus"
        inputOptions={maritalStatus}
        inputValue={personalDetails.gender}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        isValidation={true}
      />

      {/* Nationality Dropdown */}
      <InputSelect
        labelName="Nationality"
        inputName="nationality"
        inputOptions={countryOptions}
        inputValue={personalDetails.nationality}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        isValidation={true}
      />

      {/* DOB */}
      <div className="col-span-1">
        <InputDate
          labelName="Date of Birth"
          inputName="dateOfBirth"
          inputValue={personalDetails.dateOfBirth}
          onChange={(e) => handleInputChange(e, "personalDetails")}
          isValidation={true}
        />
      </div>

      {/*Place of Birth Input Fields  */}
      <InputText
        labelName="Place of Birth"
        inputName="placeOfBirth"
        inputValue={personalDetails.placeOfBirth}
        onChange={(e) => handleInputChange(e, "personalDetails")}
        placeHolder="Enter Place of Birth"
        isValidation={true}
      />
    </div>
  );

  const contactDetails = (contactDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Mobile1 */}
      <InputNumber
        labelName="Mobile 1"
        inputName="mobile1"
        inputValue={contactDetails.mobile1}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Mobile Number"
        isValidation={true}
      />
      {/* Mobile */}
      <InputNumber
        labelName="Mobile 2"
        inputName="mobile2"
        inputValue={contactDetails.mobile2}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Mobile Number"
        isValidation={true}
      />

      {/* Landline */}
      <InputText
        labelName="Landline Phone"
        inputName="landlinePhone"
        inputValue={contactDetails.landlinePhone}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Landline Number"
      />

      {/* House Number */}
      <InputText
        labelName="House Number"
        inputName="houseNumber"
        inputValue={contactDetails.houseNumber}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter House Number"
      />

      {/* Street */}
      <InputText
        labelName="Street"
        inputName="street"
        inputValue={contactDetails.street}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Street"
      />

      {/* Residential Area */}
      <InputText
        labelName="Residential Area"
        inputName="residentialArea"
        inputValue={contactDetails.residentialArea}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Residential Area"
      />

      {/* Country Dropdown */}
      <InputSelect
        labelName="Country"
        inputName="country"
        inputOptions={countryOptions}
        inputValue={contactDetails.country}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        isValidation={true}
      />

      {/* Province/State Dropdown */}
      <InputSelect
        labelName="Province / State"
        inputName="province"
        inputOptions={filteredLocations1}
        inputValue={contactDetails.province}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        isValidation={true}
      />

      {/* District */}
      <InputText
        labelName="District"
        inputName="district"
        inputValue={contactDetails.district}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter District"
      />

      {/* Email */}
      <InputEmail
        labelName="Email"
        inputName="email"
        inputValue={contactDetails.email}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Email"
        isValidation={true}
      />

      {/* Post Box */}
      <InputText
        labelName="Post Box"
        inputName="postBox"
        inputValue={contactDetails.postBox}
        onChange={(e) => handleInputChange(e, "contactDetails")}
        placeHolder="Enter Post Box"
      />
    </div>
  );

  const employmentDetails = (employmentDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Employer */}
      <InputText
        labelName="Employer"
        inputName="employer"
        inputValue={employmentDetails.employer}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter Employer Name"
        isValidation={true}
      />

      {/* Occupation */}
      <InputText
        labelName="Occupation"
        inputName="occupation"
        inputValue={employmentDetails.occupation}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter Occupation"
        isValidation={true}
      />

      {/* District */}
      <InputText
        labelName="District"
        inputName="employmentDistrict"
        inputValue={employmentDetails.employmentDistrict}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter District"
        isValidation={true}
      />

      {/* Location */}
      <InputText
        labelName="Location"
        inputName="employmentLocation"
        inputValue={employmentDetails.employmentLocation}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter Location"
        isValidation={true}
      />

      {/* Work Start Date */}
      <div className="col-span-1">
        <InputDate
          labelName="Work Start Date"
          inputName="workStartDate"
          inputValue={employmentDetails.workStartDate}
          onChange={(e) => handleInputChange(e, "employmentDetails")}
          isValidation={true}
        />
      </div>

      {/* Work Phone Number */}
      <InputText
        labelName="Work Phone Number"
        inputName="workPhoneNumber"
        inputValue={employmentDetails.workPhoneNumber}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter Work Phone Number"
        isValidation={true}
      />

      {/* Work Physical Address */}
      <InputText
        labelName="Work Physical Address"
        inputName="workPhysicalAddress"
        inputValue={employmentDetails.workPhysicalAddress}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter Work Physical Address"
        isValidation={true}
      />

      {/* Employee No. */}
      <InputText
        labelName="Employee No."
        inputName="employeeNo"
        inputValue={employmentDetails.employeeNo}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        placeHolder="Enter Employee Number"
        isValidation={true}
      />

      {/* Work Type */}
      <InputSelect
        labelName="Work Type"
        inputName="workType"
        inputOptions={workType}
        inputValue={employmentDetails.workType}
        onChange={(e) => handleInputChange(e, "employmentDetails")}
        isValidation={true}
      />
    </div>
  );

  const bankDetails = (bankDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Name of Bank */}
      <InputText
        labelName="Name of Bank"
        inputName="bankName"
        inputValue={bankDetails.bankName}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        placeHolder="Enter Name of Bank"
        isValidation={true}
      />

      {/* Account Name */}
      <InputText
        labelName="Account Name"
        inputName="accountName"
        inputValue={bankDetails.accountName}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        placeHolder="Enter Account Name"
        isValidation={true}
      />

      {/* Type of Account */}
      <InputSelect
        labelName="Type of Account"
        inputName="accountType"
        inputOptions={accountType}
        inputValue={bankDetails.accountType}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        isValidation={true}
      />

      {/* Branch */}
      <InputText
        labelName="Branch"
        inputName="branch"
        inputValue={bankDetails.branch}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        placeHolder="Enter Branch"
        isValidation={true}
      />

      {/* Branch Code */}
      <InputText
        labelName="Branch Code"
        inputName="branchCode"
        inputValue={bankDetails.branchCode}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        placeHolder="Enter Branch Code"
        isValidation={true}
      />

      {/* Sort Code */}
      <InputText
        labelName="Sort Code"
        inputName="sortCode"
        inputValue={bankDetails.sortCode}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        placeHolder="Enter Sort Code"
        isValidation={true}
      />

      {/* Account No. */}
      <InputNumber
        labelName="Account No."
        inputName="accountNo"
        inputValue={bankDetails.accountNo}
        onChange={(e) => handleInputChange(e, "bankDetails")}
        placeHolder="Enter Account Number"
        isValidation={true}
      />
    </div>
  );

  const nextOfKinDetails = (nextOfKinData) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Title */}
      <InputSelect
        labelName="Title"
        inputName="kinTitle"
        inputOptions={title}
        inputValue={nextOfKinData.kinTitle}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        isValidation={true}
      />

      {/* Surname */}
      <InputText
        labelName="Surname"
        inputName="kinSurname"
        inputValue={nextOfKinData.kinSurname}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Surname"
        isValidation={true}
      />

      {/* Other Name */}
      <InputText
        labelName="Other Name"
        inputName="kinOtherName"
        inputValue={nextOfKinData.kinOtherName}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Other Name"
        isValidation={true}
      />

      {/* NRC No. */}
      <InputText
        labelName="NRC No."
        inputName="kinNrcNo"
        inputValue={nextOfKinData.kinNrcNo}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter NRC Number"
        isValidation={true}
      />

      {/* Gender */}
      <InputSelect
        labelName="Gender"
        inputName="kinGender"
        inputOptions={gender}
        inputValue={nextOfKinData.kinGender}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        isValidation={true}
      />

      {/* Mobile Phone Number 1 */}
      <InputNumber
        labelName="Mobile 1"
        inputName="kinMobile1"
        inputValue={nextOfKinData.kinMobile1}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Mobile Number 1"
        isValidation={true}
      />

      {/* Mobile Phone Number 2 */}
      <InputNumber
        labelName="Mobile 2"
        inputName="kinMobile2"
        inputValue={nextOfKinData.kinMobile2}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Mobile Number 2"
      />

      {/* Email Address */}
      <InputEmail
        labelName="Email"
        inputName="kinEmail"
        inputValue={nextOfKinData.kinEmail}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter E-mail Address"
        isValidation={true}
      />

      {/* House No. */}
      <InputText
        labelName="House No."
        inputName="kinHouseNo"
        inputValue={nextOfKinData.kinHouseNo}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter House No."
      />

      {/* Street */}
      <InputText
        labelName="Street"
        inputName="kinStreet"
        inputValue={nextOfKinData.kinStreet}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Street"
      />

      {/* Residential Area */}
      <InputText
        labelName="Residential Area"
        inputName="kinResidentialArea"
        inputValue={nextOfKinData.kinResidentialArea}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Residential Area"
      />

      {/* District */}
      <InputText
        labelName="District"
        inputName="kinDistrict"
        inputValue={nextOfKinData.kinDistrict}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter District"
      />

      {/* Country */}
      <InputSelect
        labelName="Country"
        inputName="kinCountry"
        inputOptions={countryOptions}
        inputValue={nextOfKinData.kinCountry}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        isValidation={true}
      />

      {/* Province/State Dropdown */}
      <InputSelect
        labelName="Province / State"
        inputName="kinProvince"
        inputOptions={filteredLocations2}
        inputValue={nextOfKinData.kinProvince}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        isValidation={true}
      />

      {/* Employer */}
      <InputText
        labelName="Employer"
        inputName="kinEmployer"
        inputValue={nextOfKinData.kinEmployer}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Employer Name"
      />

      {/* Occupation */}
      <InputText
        labelName="Occupation"
        inputName="kinOccupation"
        inputValue={nextOfKinData.kinOccupation}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Occupation"
      />

      {/* Location */}
      <InputText
        labelName="Location"
        inputName="kinLocation"
        inputValue={nextOfKinData.kinLocation}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Location"
      />

      {/* Work Phone Number */}
      <InputText
        labelName="Work Phone Number"
        inputName="kinWorkPhoneNumber"
        inputValue={nextOfKinData.kinWorkPhoneNumber}
        onChange={(e) => handleInputChange(e, "nextOfKinDetails")}
        placeHolder="Enter Work Phone Number"
      />
    </div>
  );

  const otherDetails = (otherDetails) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {/* Reason for Borrowing */}
      <InputText
        labelName="Reason for Borrowing"
        inputName="reasonForBorrowing"
        inputValue={otherDetails.reasonForBorrowing}
        onChange={(e) => handleInputChange(e, "otherDetails")}
        placeHolder="Enter Reason for Borrowing"
        isValidation={true}
      />

      {/* Source of Repayment */}
      <InputText
        labelName="Source of Repayment"
        inputName="sourceOfRepayment"
        inputValue={otherDetails.sourceOfRepayment}
        onChange={(e) => handleInputChange(e, "otherDetails")}
        placeHolder="Enter Source of Repayment"
        isValidation={true}
      />

       {/* Free Cash In Hand */}
       <InputNumber
        labelName="Free Cash In Hand"
        inputName="freeCashInHand"
        inputValue={otherDetails.freeCashInHand}
        onChange={(e) => handleInputChange(e, "otherDetails")}
        placeHolder="Enter Amount"
      />

       {/* Credit Score */}
       <InputNumber
        labelName="Credit Score"
        inputName="creditScore"
        inputValue={otherDetails.creditScore}
        onChange={(e) => handleInputChange(e, "otherDetails")}
        placeHolder="Enter Score"
      />

       {/* Gross Salary */}
       <InputNumber
        labelName="Gross Salary"
        inputName="grossSalary"
        inputValue={otherDetails.grossSalary}
        onChange={(e) => handleInputChange(e, "otherDetails")}
        placeHolder="Enter Gross Salary"
      />

      {/* Customer Photo */}
      {/* <InputFile
        labelName="Customer Photo"
        inputName="customerPhoto"
        inputValue={otherDetails.customerPhoto}
        onChange={(e) => handleFileChange(e, "otherDetails")}
        accept="image/*"
        isValidation={true}
      /> */}
    </div>
  );

  return (
    <>
      <Accordion
        heading={"Personal Details"}
        renderExpandedContent={() =>
          personalDetails(addBorrowerData.personalDetails)
        }
      />
      <Accordion
        heading={"Contact Details"}
        renderExpandedContent={() =>
          contactDetails(addBorrowerData.contactDetails)
        }
      />
      <Accordion
        heading={"Employment Details"}
        renderExpandedContent={() =>
          employmentDetails(addBorrowerData.employmentDetails)
        }
      />
      <Accordion
        heading={"Bank Details"}
        renderExpandedContent={() => bankDetails(addBorrowerData.bankDetails)}
      />
      <Accordion
        heading={"Next of Kin Details"}
        renderExpandedContent={() =>
          nextOfKinDetails(addBorrowerData.nextOfKinDetails)
        }
      />
      <Accordion
        heading={"Other Details"}
        renderExpandedContent={() =>
          otherDetails(addBorrowerData.otherDetails)
        }
      />

      <div className="flex justify-between col-span-4 mx-10">
        <Button
          buttonName="Reset"
          onClick={() => dispatch(resetBorrowerData())}
          rectangle={true}
        />
        <Button buttonName="Add Borrower" onClick={() => {}} rectangle={true} />
      </div>
    </>
  );
};

export default AddBorrowers;
