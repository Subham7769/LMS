import React, { useEffect, useState } from "react";
import { accountStatusOptions } from "../../../data/LosData";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import InputSelect from "../../Common/InputSelect/InputSelect";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAllCompanyBorrowers,
  changeCompanyBorrowerStatus,
  fetchCompanyBorrowerByField,
  setUpdateCompany,
  setUpdateDirector,
  setUpdateShareholder,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useNavigate } from "react-router-dom";
import Accordion from "../../Common/Accordion/Accordion";
import Pagination from "../../Common/Pagination/Pagination";

const ViewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBorrowersData, allBorrowersTotalElements, error, loading } =
    useSelector((state) => state.smeBorrowers);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [borrowerStatuses, setBorrowerStatuses] = useState({});

  // Pagination state & Functionality
  const [pageSize, setPageSize] = useState(10);
  const loanOfficer = localStorage.getItem("username");

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      fetchAllCompanyBorrowers({
        page: currentPage,
        size: pageSize,
        loanOfficer,
      })
    );
  };

  useEffect(() => {
    const transformedData = allBorrowersData.map((item) => {
      return {
        ...item.companyBorrowerProfile,
        uid: item.uid,
        lmsUserStatus: item.lmsUserStatus,
      };
    });
    setFilteredBorrowers(transformedData);
  }, [allBorrowersData]);

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue]);

  const applyFilters = () => {
    const filtered = allBorrowersData.filter((borrower) => {
      const companyDetails =
        borrower.companyBorrowerProfile?.companyDetails || {};
      const companyContactDetails =
        borrower.companyBorrowerProfile?.companyContactDetails || {};
      let matchesSearchValue = "";

      if (searchBy) {
        matchesSearchValue = searchValue
          ? companyDetails[searchBy]
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
          : true;
      } else {
        matchesSearchValue = searchValue
          ? [
              companyDetails.companyName,
              companyDetails.companyShortName,
              companyDetails.companyUniqueId,
              companyDetails.companyRegistrationNo,
              companyContactDetails.email,
              companyContactDetails.mobile1,
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
    if (searchBy || searchValue) {
      setSearchBy("");
      setSearchValue("");
      setFilteredBorrowers(allBorrowersData); // Reset to original data
    } else {
      dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20, loanOfficer }));
    }
  };

  function flattenToSimpleObjectArray(filteredBorrowers) {
    return filteredBorrowers.map((borrower) => {
      const result = {};

      function recurse(current) {
        for (const key in current) {
          // Skip flattening for `directorsKycDetails` and `shareHolderDetails`
          if (key === "directorsKycDetails" || key === "shareHolderDetails") {
            result[key] = current[key]; // Retain these properties as is
          } else if (
            typeof current[key] === "object" &&
            current[key] !== null
          ) {
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
    { label: "Name", value: "companyName" },
    { label: "Short Name", value: "companyShortName" },
    { label: "Registration No.", value: "companyRegistrationNo" },
    { label: "Unique Id", value: "companyUniqueId" },
    { label: "Email", value: "email" },
    { label: "Mobile", value: "mobile1" },
    { label: "Loan Officer", value: "loanOfficer" },
  ];

  const personalDetailsColumns = [
    { label: "Name", field: "companyName" },
    { label: "Short Name", field: "companyShortName" },
    { label: "Registration No.", field: "companyRegistrationNo" },
    { label: "Unique Id", field: "companyUniqueId" },
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
        `/loan/loan-origination-system/sme/borrowers/update-company/${uid}`
      );
      console.log(uid);
    };

    const handleEditDirector = (uid,uniqueID) => {
      dispatch(setUpdateDirector({ uid,uniqueID }));
      navigate(
        `/loan/loan-origination-system/sme/borrowers/update-director/${uid}`
      );
      console.log(uid);
    };

    const handleEditShareholder = (uid,uniqueID) => {
      dispatch(setUpdateShareholder({ uid,uniqueID }));
      navigate(
        `/loan/loan-origination-system/sme/borrowers/update-shareholder/${uid}`
      );
      console.log(uid);
    };

    const handleChangeStatus = (uid, newStatus) => {
      console.log(uid);
      setCurrentStatus(newStatus);
      dispatch(changeCompanyBorrowerStatus({ uid, newStatus })).unwrap();
      dispatch(fetchAllCompanyBorrowers({ page: 0, size: 20, loanOfficer }));
      navigate(`/loan/loan-origination-system/sme/borrowers/view-borrower`);
    };

    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 py-2">
        <Accordion
          heading={"Company Details"}
          renderExpandedContent={() => (
            <div className="grid grid-cols-[85%_15%] gap-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                {/* Company Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    General Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Name:</strong> {rowData.companyName}{" "}
                      {rowData.companyName}
                    </p>
                    <p>
                      <strong>Unique ID:</strong> {rowData.companyUniqueId}
                    </p>
                    <p>
                      <strong>Registration No:</strong>{" "}
                      {rowData.companyRegistrationNo}
                    </p>
                    <p>
                      <strong>Nature of Company:</strong>{" "}
                      {rowData.natureOfCompany}
                    </p>
                    <p>
                      <strong>Industry:</strong> {rowData.industry}
                    </p>
                    <p>
                      <strong>Nature of Business:</strong>{" "}
                      {rowData.natureOfBusiness}
                    </p>
                    <p>
                      <strong>Date of Incorporation:</strong>{" "}
                      {rowData.dateOfIncorporation}
                    </p>
                    <p>
                      <strong>Country of Registration:</strong>{" "}
                      {rowData.countryOfRegistration}
                    </p>
                    <p>
                      <strong>Permanent Employees:</strong>{" "}
                      {rowData.numberOfPermanentEmployees}
                    </p>
                    <p>
                      <strong>Address:</strong> {rowData.locationOfHQ}{" "}
                      {rowData.province}
                    </p>
                  </div>
                </div>

                {/*Company Contact Details */}
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

                {/* Company Other Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800">
                    Other Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Reason For Borrowing:</strong>{" "}
                      {rowData.reasonForBorrowing}
                    </p>
                    <p>
                      <strong>Source of Repayment:</strong>{" "}
                      {rowData.sourceOfRepayment}
                    </p>
                    <p>
                      <strong>Shareholding Structure:</strong>{" "}
                      {rowData.shareholdingStructure}
                    </p>
                    <p>
                      <strong>Trade Union:</strong> {rowData.tradeUnion}
                    </p>
                    <p>
                      <strong>Group Id:</strong> {rowData.groupId}
                    </p>
                    <p>
                      <strong>Credit Score:</strong> {rowData.creditScore}
                    </p>
                    <p>
                      <strong>Free Cash In Hand:</strong>{" "}
                      {rowData.freeCashInHand}
                    </p>
                    <p>
                      <strong>Gross Salary:</strong> {rowData.grossSalary}
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
          )}
        />

        {/* Directors Kyc Details Details */}
        <Accordion
          heading={"Directors Details"}
          renderExpandedContent={() => (
            <>
              {rowData.directorsKycDetails.map((director) => (
                <Accordion
                  heading={`${director.personalDetails.title} 
                      ${director.personalDetails.firstName} 
                      ${director.personalDetails.surname} 
                      ${director.personalDetails.otherName}`}
                  renderExpandedContent={() => (
                    <div className="grid grid-cols-[85%_15%] gap-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                        {/* Director Personal Details */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            Personal Details
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <p>
                              <strong>Name:</strong>{" "}
                              {director.personalDetails.title}{" "}
                              {director.personalDetails.firstName}{" "}
                              {director.personalDetails.surname}{" "}
                              {director.personalDetails.otherName}
                            </p>
                            <p>
                              <strong>Unique Id Type:</strong>{" "}
                              {director.personalDetails.uniqueIDType}
                            </p>
                            <p>
                              <strong>Unique ID:</strong>{" "}
                              {director.personalDetails.uniqueID}
                            </p>
                            <p>
                              <strong>Gender:</strong>{" "}
                              {director.personalDetails.gender}
                            </p>
                            <p>
                              <strong>Marital Status:</strong>{" "}
                              {director.personalDetails.maritalStatus}
                            </p>
                            <p>
                              <strong>nationality:</strong>{" "}
                              {director.personalDetails.nationality}
                            </p>
                            <p>
                              <strong>Date of Birth:</strong>{" "}
                              {director.personalDetails.dateOfBirth}
                            </p>
                            <p>
                              <strong>Age:</strong>{" "}
                              {director.personalDetails.age}
                            </p>
                            <p>
                              <strong>Place of Birth:</strong>{" "}
                              {director.personalDetails.placeOfBirth}
                            </p>
                          </div>
                        </div>

                        {/*Director Contact Details */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            Contact Details
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <p>
                              <strong>Mobile 1:</strong>{" "}
                              {director.contactDetails.mobile1}
                            </p>
                            <p>
                              <strong>Mobile 2:</strong>{" "}
                              {director.contactDetails.mobile2}
                            </p>
                            <p>
                              <strong>Landline:</strong>{" "}
                              {director.contactDetails.landlinePhone}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {director.contactDetails.email}
                            </p>
                            <p>
                              <strong>Address:</strong>{" "}
                              {[
                                director.contactDetails.houseNumber,
                                director.contactDetails.street,
                                director.contactDetails.residentialArea,
                                director.contactDetails.province,
                                director.contactDetails.district,
                                director.contactDetails.country,
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                            <p>
                              <strong>Post Box:</strong>{" "}
                              {director.contactDetails.postBox}
                            </p>
                          </div>
                        </div>

                        {/*Director Employment Details */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            Employment Details
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <p>
                              <strong>Employer:</strong>{" "}
                              {director.employmentDetails.employer}
                            </p>
                            <p>
                              <strong>Occupation:</strong>{" "}
                              {director.employmentDetails.occupation}
                            </p>
                            <p>
                              <strong>Work Start Date:</strong>{" "}
                              {director.employmentDetails.workStartDate}
                            </p>
                            <p>
                              <strong>Work Phone:</strong>{" "}
                              {director.employmentDetails.workPhoneNumber}
                            </p>
                            <p>
                              <strong>Work Address:</strong>{" "}
                              {director.employmentDetails.workPhysicalAddress}
                            </p>
                            <p>
                              <strong>Employment Type:</strong>{" "}
                              {director.employmentDetails.workType}
                            </p>
                          </div>
                        </div>

                        {/*Director Banking Details */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-gray-800">
                            Banking Details
                          </h3>
                          <div className="grid grid-cols-2 gap-4">
                            <p>
                              <strong>Bank Name:</strong>{" "}
                              {director.bankDetails.bankName}
                            </p>
                            <p>
                              <strong>Account Name:</strong>{" "}
                              {director.bankDetails.accountName}
                            </p>
                            <p>
                              <strong>Account Type:</strong>{" "}
                              {director.bankDetails.accountType}
                            </p>
                            <p>
                              <strong>Account No:</strong>{" "}
                              {director.bankDetails.accountNo}
                            </p>
                            <p>
                              <strong>Branch:</strong>{" "}
                              {director.bankDetails.branch}
                            </p>
                            <p>
                              <strong>Branch Code:</strong>{" "}
                              {director.bankDetails.branchCode}
                            </p>
                            <p>
                              <strong>Sort Code:</strong>{" "}
                              {director.bankDetails.sortCode}
                            </p>
                          </div>
                        </div>
                      </div>
                      {/*Director Actions */}
                      <div className="flex justify-start gap-5 flex-col mt-4">
                        <Button
                          buttonName={"Edit"}
                          onClick={() =>
                            handleEditDirector(
                              rowData.uid,director.personalDetails.uniqueID
                            )
                          }
                          className={"text-center"}
                          rectangle={true}
                        />
                      </div>
                    </div>
                  )}
                />
              ))}
            </>
          )}
        />

        {/* Shareholder Details */}
        <Accordion
          heading={"Shareholder Details"}
          renderExpandedContent={() => (
            <>
              {rowData.shareHolderDetails.map((shareholder, index) => (
                <>
                  <Accordion
                    heading={`${shareholder.personalDetails.title} 
                      ${shareholder.personalDetails.firstName} 
                      ${shareholder.personalDetails.surname} 
                      ${shareholder.personalDetails.otherName}`}
                    renderExpandedContent={() => (
                      <div className="grid grid-cols-[85%_15%] gap-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                          {/* Shareholder Personal Details */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-gray-800">
                              Personal Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <p>
                                <strong>Name:</strong>{" "}
                                {shareholder.personalDetails.title}{" "}
                                {shareholder.personalDetails.firstName}{" "}
                                {shareholder.personalDetails.surname}{" "}
                                {shareholder.personalDetails.otherName}
                              </p>
                              <p>
                                <strong>Unique Id Type:</strong>{" "}
                                {shareholder.personalDetails.uniqueIDType}
                              </p>
                              <p>
                                <strong>Unique ID:</strong>{" "}
                                {shareholder.personalDetails.uniqueID}
                              </p>
                              <p>
                                <strong>Gender:</strong>{" "}
                                {shareholder.personalDetails.gender}
                              </p>
                              <p>
                                <strong>Marital Status:</strong>{" "}
                                {shareholder.personalDetails.maritalStatus}
                              </p>
                              <p>
                                <strong>nationality:</strong>{" "}
                                {shareholder.personalDetails.nationality}
                              </p>
                              <p>
                                <strong>Date of Birth:</strong>{" "}
                                {shareholder.personalDetails.dateOfBirth}
                              </p>
                              <p>
                                <strong>Age:</strong>{" "}
                                {shareholder.personalDetails.age}
                              </p>
                              <p>
                                <strong>Place of Birth:</strong>{" "}
                                {shareholder.personalDetails.placeOfBirth}
                              </p>
                            </div>
                          </div>

                          {/*Shareholder Contact Details */}
                          <div className="space-y-2">
                            <h3 className="font-semibold text-lg text-gray-800">
                              Contact Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                              <p>
                                <strong>Mobile 1:</strong>{" "}
                                {shareholder.contactDetails.mobile1}
                              </p>
                              <p>
                                <strong>Mobile 2:</strong>{" "}
                                {shareholder.contactDetails.mobile2}
                              </p>
                              <p>
                                <strong>Landline:</strong>{" "}
                                {shareholder.contactDetails.landlinePhone}
                              </p>
                              <p>
                                <strong>Email:</strong>{" "}
                                {shareholder.contactDetails.email}
                              </p>
                              <p>
                                <strong>Address:</strong>{" "}
                                {[
                                  shareholder.contactDetails.houseNumber,
                                  shareholder.contactDetails.street,
                                  shareholder.contactDetails.residentialArea,
                                  shareholder.contactDetails.province,
                                  shareholder.contactDetails.district,
                                  shareholder.contactDetails.country,
                                ]
                                  .filter(Boolean)
                                  .join(", ")}
                              </p>
                              <p>
                                <strong>Post Box:</strong>{" "}
                                {shareholder.contactDetails.postBox}
                              </p>
                            </div>
                          </div>
                        </div>
                        {/*Shareholder Actions */}
                        <div className="flex justify-start gap-5 flex-col mt-4">
                          <Button
                            buttonName={"Edit"}
                            onClick={() =>
                              handleEditShareholder(rowData.uid,shareholder.personalDetails.uniqueID)
                            }
                            className={"text-center"}
                            rectangle={true}
                          />
                        </div>
                      </div>
                    )}
                  />
                </>
              ))}
            </>
          )}
        />
      </div>
    );
  };

  const SearchBorrowerByFieldSearch = () => {
    dispatch(fetchCompanyBorrowerByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

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

      <ExpandableTable
        columns={personalDetailsColumns}
        data={flattenToSimpleObjectArray(filteredBorrowers)}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
        error={error}
      />
      <Pagination
        totalElements={allBorrowersTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
    </div>
  );
};

export default ViewCompany;
