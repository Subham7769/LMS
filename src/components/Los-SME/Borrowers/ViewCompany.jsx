import React, { useEffect, useState } from "react";
import { loanOfficer, accountStatusOptions } from "../../../data/LosData";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAllCompanyBorrowers,
  changeBorrowerStatus,
  setUpdateCompany,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../Common/DynamicSelect/DynamicSelect"; //Dynamic Select

const ViewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBorrowersData, error, loading } = useSelector(
    (state) => state.personalBorrowers
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [allLoanOfficer, setAllLoanOfficer] = useState([]);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [borrowerStatuses, setBorrowerStatuses] = useState({});

  // Track changes in both search term and loan officer selection
  useEffect(() => {
    applyFilters(); // Apply filters whenever either searchTerm or allLoanOfficer changes
  }, [searchTerm, allLoanOfficer]);

  useEffect(() => {
    console.log();
    if (allBorrowersData.length <= 0) {
      dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20 }));
    }
  }, [dispatch]);

  useEffect(() => {
    const transformedData = allBorrowersData.map((item) => ({
      ...item.borrowerProfile,
      uid: item.uid,
      lmsUserStatus: item.lmsUserStatus,
    }));
    setFilteredBorrowers(transformedData);
  }, [allBorrowersData]);

  const applyFilters = () => {
    const selectedLoanOfficers = allLoanOfficer.map((officer) =>
      officer.value.toLowerCase()
    );

    const filtered = allBorrowersData.filter((borrower) => {
      const personalDetails = borrower.borrowerProfile?.personalDetails || {};
      const contactDetails = borrower.borrowerProfile?.contactDetails || {};

      const matchesLoanOfficer = selectedLoanOfficers.length
        ? selectedLoanOfficers.includes(
            personalDetails.loanOfficer?.toLowerCase()
          )
        : true;

      const matchesSearchTerm = searchTerm
        ? [
            personalDetails.surname,
            personalDetails.otherName,
            personalDetails.uniqueID,
            contactDetails.email,
            contactDetails.mobile1,
          ].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;

      return matchesLoanOfficer && matchesSearchTerm;
    });

    setFilteredBorrowers(filtered);
  };

  const handleLoanOfficerFilter = (selectedOfficers) => {
    setAllLoanOfficer(selectedOfficers); // Update loan officer filter
    applyFilters(); // Apply filters
  };

  const handleSearchFilter = (term) => {
    setSearchTerm(term); // Update search term
    applyFilters(); // Apply filters
  };

  const handleChangeSearch = (e) => {
    const term = e.target.value;
    handleSearchFilter(term);
  };

  const handleReset = () => {
    setSearchTerm("");
    setAllLoanOfficer([]);
    setFilteredBorrowers(allBorrowersData); // Reset to original data
  };

  function flattenToSimpleObjectArray(filteredBorrowers) {
    return filteredBorrowers.map((borrower) => {
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
    { label: "Status", field: "lmsUserStatus" },
  ];

  const renderExpandedRow = (rowData) => {
    const currentStatus =
      borrowerStatuses[rowData.uid] || rowData.lmsUserStatus; // Get the current status for this borrower
    const setCurrentStatus = (newStatus) => {
      setBorrowerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [rowData.uid]: newStatus, // Update the status for this borrower
      }));
    };
    const handleEdit = (uid) => {
      dispatch(setUpdateCompany({ uid }));
      navigate(
        `/loan/loan-origination-system/personal/borrowers/update-borrower/${uid}`
      );
      console.log(uid);
    };

    const handleChangeStatus = (uid, newStatus) => {
      console.log(uid);
      setCurrentStatus(newStatus);
      dispatch(changeBorrowerStatus({ uid, newStatus })).unwrap();
      dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20 }));
      navigate(
        `/loan/loan-origination-system/personal/borrowers/view-borrower`
      );
    };

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
                  <strong>Name:</strong> {rowData.title} {rowData.surname}{" "}
                  {rowData.otherName}
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
                  <strong>Address:</strong> {[ rowData.houseNumber,
                  rowData.street, rowData.residentialArea, rowData.province,
                  rowData.district, rowData.country, ].filter(Boolean).join(", ")}
                </p>
                <p>
                  <strong>Post Box:</strong> {rowData.postBox}
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
              onClick={() => handleEdit(rowData.uid)}
              className={"text-center"}
              rectangle={true}
            />
            <InputSelect
              labelName={"Account Status"}
              inputName={"accountStatus"}
              inputOptions={accountStatusOptions}
              inputValue={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
            />
            <Button
              buttonName={"Change Status"}
              onClick={() => handleChangeStatus(rowData.uid, currentStatus)}
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
      <ContainerTile className={`grid grid-cols-[45%_45%_10%] gap-5`}>
        <InputText
          labelName="Search Borrower"
          inputName="searchTerm"
          inputValue={searchTerm}
          onChange={handleChangeSearch}
          required
        />
        <SelectInput
          labelName="All Loan Officers"
          inputName="allLoanOfficer"
          inputOptions={loanOfficer}
          inputValue={allLoanOfficer}
          isValidation={true}
          onChange={handleLoanOfficerFilter}
          className="w-full"
          isMulti={true}
        />
        <div className="flex align-middle gap-5">
          {/* <Button
            buttonName={"Search"}
            onClick={handleSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          /> */}
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>

      <ExpandableTable
        columns={personalDetailsColumns}
        data={flattenToSimpleObjectArray(filteredBorrowers)}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default ViewCompany;
