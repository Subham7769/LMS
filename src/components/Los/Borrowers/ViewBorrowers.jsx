import React, { useState } from "react";
import ListTable from "../../Common/ListTable/ListTable";
import {
  BorrowerHeaderList,
  BorrowersList,
  loanOfficer,
} from "../../../data/LosData";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import SelectInput from "../../Common/DynamicSelect/DynamicSelect";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";

const ViewBorrowers = () => {
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    allLoanOfficer: [],
  });
  const { borrowers, error, loading } = useSelector((state) => state.borrowers);
  const [filteredBorrowers, setFilteredBorrowers] = useState(borrowers)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ [name]: value });
  };

  function flattenToSimpleObjectArray(borrowers) {
    return borrowers.map((borrower) => {
      const result = {};

      function recurse(current) {
        for (const key in current) {
          if (typeof current[key] === "object" && current[key] !== null) {
            recurse(current[key]);
          } else {
            result[key] = current[key];
          }
        }
      }

      recurse(borrower);
      return result;
    });
  }

  const personalDetailsColumns = [
    { label: "Title", field: "title" },
    { label: "Surname", field: "surname" },
    { label: "Other Name", field: "otherName" },
    { label: "Unique ID", field: "uniqueID" },
    { label: "Email", field: "email" },
    { label: "Mobile", field: "mobile1" },
    { label: "Loan Officer", field: "loanOfficer" },
  ];

  const renderExpandedRow = (rowData) => {
    const handleEdit = (uniqueID) => {
      
    };
    const handleInactive = () => {};
    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
        <div className="grid grid-cols-[80%_20%] gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
            {/* Personal Details */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4">

                <p>
                  <strong>Name:</strong> {rowData.title} {rowData.surname} {rowData.otherName}
                </p>
                <p>
                  <strong>Unique ID Type:</strong> {rowData.uniqueIDType}
                </p>
                <p>
                  <strong>Unique ID:</strong> {rowData.uniqueID}
                </p>
                <p>
                  <strong>Gender:</strong> {rowData.gender}
                </p>
                <p>
                  <strong>Marital Status:</strong> {rowData.maritalStatus}
                </p>
                <p>
                  <strong>Nationality:</strong> {rowData.nationality}
                </p>
                <p>
                  <strong>Age:</strong> {rowData.age}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {rowData.dateOfBirth}
                </p>
                <p>
                  <strong>Place of Birth:</strong> {rowData.placeOfBirth}
                </p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Mobile 1:</strong> {rowData.mobile1}
                </p>
                <p>
                  <strong>Mobile 2:</strong> {rowData.mobile2}
                </p>
                <p>
                  <strong>Landline:</strong> {rowData.landlinePhone}
                </p>
                <p>
                  <strong>Email:</strong> {rowData.email}
                </p>
                <p>
                  <strong>House No:</strong> {rowData.houseNumber}
                </p>
                <p>
                  <strong>Street:</strong> {rowData.street}
                </p>
                <p>
                  <strong>Residential Area:</strong> {rowData.residentialArea}
                </p>
                <p>
                  <strong>Country:</strong> {rowData.country}
                </p>
                <p>
                  <strong>Province:</strong> {rowData.province}
                </p>
                <p>
                  <strong>District:</strong> {rowData.district}
                </p>
              </div>
            </div>

            {/* Employment Details */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Employment Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Employer:</strong> {rowData.employer}
                </p>
                <p>
                  <strong>Occupation:</strong> {rowData.occupation}
                </p>
                <p>
                  <strong>Work Start Date:</strong> {rowData.workStartDate}
                </p>
                <p>
                  <strong>Work Phone:</strong> {rowData.workPhoneNumber}
                </p>
                <p>
                  <strong>Work Address:</strong> {rowData.workPhysicalAddress}
                </p>
                <p>
                  <strong>Employment Type:</strong> {rowData.workType}
                </p>
              </div>
            </div>

            {/* Banking Details */}
            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-gray-800">
                Banking Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong>Bank Name:</strong> {rowData.bankName}
                </p>
                <p>
                  <strong>Account Name:</strong> {rowData.accountName}
                </p>
                <p>
                  <strong>Account Type:</strong> {rowData.accountType}
                </p>
                <p>
                  <strong>Account No:</strong> {rowData.accountNo}
                </p>
                <p>
                  <strong>Branch:</strong> {rowData.branch}
                </p>
                <p>
                  <strong>Branch Code:</strong> {rowData.branchCode}
                </p>
                <p>
                  <strong>Sort Code:</strong> {rowData.sortCode}
                </p>
              </div>
            </div>
          </div>
          {/* Actions */}
          <div className="flex justify-start gap-5 flex-col mt-4">
            <Button
              buttonName={"Edit"}
              onClick={() => handleEdit(rowData.uniqueID)}
              className={"text-center"}
              rectangle={true}
            />
            <Button
              buttonName={"Inactive Borrower"}
              onClick={() => handleInactive(rowData.uniqueID)}
              className={"bg-red-500 hover:bg-red-600"}
              rectangle={true}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`grid grid-cols-[42%_42%_16%] gap-5`}>
        <InputText
          labelName="Borrower Name"
          inputName="searchTerm"
          inputValue={searchData?.searchTerm}
          onChange={handleChange}
          required
        />
        <SelectInput
          labelName="All Loan Officers"
          inputName="allLoanOfficer"
          inputOptions={loanOfficer}
          isMulti={true}
          inputValue={searchData?.allLoanOfficer}
          onChange={handleChange}
          isValidation={true}
        />
        <div className="flex gap-5">
          <Button
            buttonName={"Search"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>

      <ExpandableTable
        columns={personalDetailsColumns}
        data={flattenToSimpleObjectArray(filteredBorrowers)}
        renderExpandedRow={renderExpandedRow}
      />
    </div>
  );
};

export default ViewBorrowers;
