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
  fetchAllBorrowers,
  fetchBorrowerByField,
  changeBorrowerStatus,
  setUpdateBorrower,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../Common/DynamicSelect/DynamicSelect"; //Dynamic Select

const ViewBorrowers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBorrowersData, error, loading } = useSelector(
    (state) => state.personalBorrowers
  );
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [borrowerStatuses, setBorrowerStatuses] = useState({});

  // console.log(allBorrowersData);
  // console.log(allLoanOfficerOptions);

  useEffect(() => {
    dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const transformedData = allBorrowersData.map((item) => ({
      ...item.borrowerProfile,
      uid: item.uid,
      lmsUserStatus: item.lmsUserStatus,
    }));
    setFilteredBorrowers(transformedData);
  }, [allBorrowersData]);

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue]);

  // Filter Borrowers Based on Search Value
  const applyFilters = () => {
    const filtered = allBorrowersData.filter((borrower) => {
      const personalDetails = borrower.borrowerProfile?.personalDetails || {};
      const contactDetails = borrower.borrowerProfile?.contactDetails || {};
      let matchesSearchValue = "";
      if (searchBy) {
        matchesSearchValue = searchValue
          ? personalDetails[searchBy]
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
          : true;
      } else {
        matchesSearchValue = searchValue
          ? [
              personalDetails.firstName,
              personalDetails.surname,
              personalDetails.otherName,
              personalDetails.uniqueID,
              contactDetails.email,
              contactDetails.mobile1,
            ].some((field) =>
              field?.toLowerCase().includes(searchValue.toLowerCase())
            )
          : true;
      }

      return matchesSearchValue;
    });

    setFilteredBorrowers(filtered);
  };

  const handleSearchFilter = (term) => {
    setSearchValue(term);
    applyFilters(); // Apply filters
  };

  const handleResetSearchBy = () => {
    if(searchBy||searchValue){
      setSearchBy("");
      setSearchValue("");
      setFilteredBorrowers(allBorrowersData); // Reset to original data
    }else{
      dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
    }
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

  const searchOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Surname", value: "surname" },
    { label: "Other Name", value: "otherName" },
    { label: "Unique ID", value: "uniqueID" },
    { label: "Email", value: "email" },
    { label: "Mobile", value: "mobile1" },
    { label: "Loan Officer", value: "loanOfficer" },
  ];

  const personalDetailsColumns = [
    { label: "Title", field: "title" },
    { label: "First Name", field: "firstName" },
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
      dispatch(setUpdateBorrower({ uid }));
      navigate(
        `/loan/loan-origination-system/personal/borrowers/update-borrower/${uid}`
      );
      console.log(uid);
    };

    const handleChangeStatus = (uid, newStatus) => {
      console.log(uid);
      setCurrentStatus(newStatus);
      dispatch(changeBorrowerStatus({ uid, newStatus })).unwrap();
      dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
      navigate(
        `/loan/loan-origination-system/personal/borrowers/view-borrower`
      );
    };

    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
        {rowData ? (
          <div className="grid grid-cols-[80%_20%] gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
              {/* Personal Details */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-gray-800">
                  Personal Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <p>
                    <strong>Name:</strong>{" "}
                    {[rowData.firstName, rowData.surname, rowData.otherName]
                      .filter(Boolean)
                      .join(" ")}
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
                    <strong>Address:</strong>{" "}
                    {[
                      rowData.houseNumber,
                      rowData.street,
                      rowData.residentialArea,
                      rowData.province,
                      rowData.district,
                      rowData.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
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
        ) : (
          <p>No data found</p>
        )}
      </div>
    );
  };

const SearchBorrowerByFieldSearch=()=>{
  dispatch(fetchBorrowerByField({ field: searchBy, value: searchValue }))
  setSearchBy("");
  setSearchValue("");
}

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[45%]">
          <InputSelect
            labelName="Search By"
            inputName="searchBy"
            inputOptions={searchOptions}
            inputValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
          />
        </div>

        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Search"}
            onClick={SearchBorrowerByFieldSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>

      {/* <div className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[45%]">
          <InputText
            labelName="Search Borrower"
            inputName="searchTerm"
            inputValue={searchTerm}
            onChange={(e)=>handleSearchFilter(e.target.value)}
            required
          />
        </div>

        <div className="w-[45%]">
          <SelectInput
            labelName="All Loan Officers"
            inputName="allLoanOfficer"
            inputOptions={allLoanOfficerOptions}
            inputValue={allLoanOfficer}
            isValidation={true}
            onChange={handleLoanOfficerFilter}
            // className="w-full"
            isMulti={true}
          />
        </div>
        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </div> */}

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

export default ViewBorrowers;
