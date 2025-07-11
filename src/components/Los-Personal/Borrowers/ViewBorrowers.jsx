import React, { useEffect, useState } from "react";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import Pagination from "../../Common/Pagination/Pagination";
import InputSelect from "../../Common/InputSelect/InputSelect";
import CardInfo from "../../Common/CardInfo/CardInfo";
import CardInfoRow from "../../Common/CardInfoRow/CardInfoRow";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAllBorrowersByType,
  fetchBorrowerByField,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../../utils/convertDate";
import { removeSlashes } from "../../../utils/removeSlashes";
import {
  UserCircleIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  UsersIcon,
  ArchiveBoxIcon,
  HomeIcon,
  BriefcaseIcon,
  WindowIcon,
  MapPinIcon,
  CalendarIcon,
  DocumentMinusIcon,
  DocumentIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import {
  generateLoanApplicationId,
  getLoanHistoryByField,
  resetAddLoanData,
} from "../../../redux/Slices/personalLoansSlice";
import ViewPhotoModal from "./ViewPhotoModal";
import { viewPhoto } from "../../../redux/Slices/personalBorrowersSlice";
import ActionOption from "../../Common/ActionOptions/ActionOption";
import { EditIcon } from "../../../assets/icons";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import ViewEditModal from "./ViewEditModal";

const ViewBorrowers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBorrowersData, allBorrowersTotalElements, error, loading } =
    useSelector((state) => state.personalBorrowers);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [borrowerStatuses, setBorrowerStatuses] = useState({});
  const [showEditModal, setEditModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Pagination state & Functionality
  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      fetchAllBorrowersByType({
        page: currentPage,
        size: pageSize,
        borrowerType: "PERSONAL_BORROWER",
      })
    );
  };

  useEffect(() => {
    const transformedData = allBorrowersData.map((item) => ({
      ...item.borrowerProfile,
      uid: item.uid,
      lmsUserStatus: item.lmsUserStatus,
      customerId: item.customerId,
    }));
    setFilteredBorrowers(transformedData);
  }, [allBorrowersData]);

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue, searchBy]);

  // Filter Borrowers Based on Search Value
  const applyFilters = () => {
    const filtered = allBorrowersData.filter((borrower) => {
      const personalDetails = borrower.borrowerProfile?.personalDetails || {};
      const contactDetails = borrower.borrowerProfile?.contactDetails || {};
      let matchesSearchValue = "";
      matchesSearchValue = searchValue
        ? [
          personalDetails.firstName,
          personalDetails.surname,
          personalDetails.otherName,
          personalDetails.uniqueID,
          borrower.customerId,
          contactDetails.mobile1,
        ].some((field) =>
          field?.toLowerCase().includes(searchValue.toLowerCase())
        )
        : true;

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
      setCurrentPage(0);
      setFilteredBorrowers(allBorrowersData); // Reset to original data
    } else {
      dispatch(
        fetchAllBorrowersByType({
          page: 0,
          size: 10,
          borrowerType: "PERSONAL_BORROWER",
        })
      );
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

  function transformData(inputArray) {
    return inputArray.map((item) => ({
      ...item,
      fullName: `${item?.title} ${item?.firstName} ${item?.surname} ${item?.otherName}`,
      dateOfBirth: convertDate(item?.dateOfBirth),
      workStartDate: convertDate(item?.workStartDate),
      lmsUserStatus: convertToTitleCase(item?.lmsUserStatus),
    }));
  }

  const flattenData = flattenToSimpleObjectArray(filteredBorrowers);

  const transformFlattenData = transformData(flattenData);

  const searchOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Surname", value: "surname" },
    { label: "Other Name", value: "otherName" },
    { label: "Unique ID", value: "uniqueID" },
    { label: "Customer ID", value: "customerId" },
    { label: "Loan Officer", value: "loanOfficer" },
  ];

  const personalDetailsColumns = [
    { label: "Name", field: "fullName" },
    { label: "Unique ID", field: "uniqueID", copy: true },
    { label: "Customer ID", field: "customerId" },
    { label: "Loan Officer", field: "loanOfficer" },
    { label: "Status", field: "lmsUserStatus" },
  ];

  const SearchBorrowerByFieldSearch = () => {
    dispatch(fetchBorrowerByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

  const handleViewPhoto = async (e, photoId) => {
    e.preventDefault();
    e.stopPropagation();

    if (photoId) {
      const filePreviewParams = {
        authToken: "Basic Y2FyYm9uQ0M6Y2FyMjAyMGJvbg==",
        docId: photoId,
      };
      setShowPhotoModal(true);
      try {
        const result = await dispatch(viewPhoto(filePreviewParams)).unwrap();

        if (result.base64Content) {
          console.log(result);
          setPhotoData(
            `data:${result.contentType};base64,${result.base64Content}`
          );
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    }
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
  };

  const renderExpandedRow = (rowData) => {
    const currentStatus =
      borrowerStatuses[rowData.uid] || rowData.lmsUserStatus; // Get the current status for this borrower
    const setCurrentStatus = (newStatus) => {
      setBorrowerStatuses((prevStatuses) => ({
        ...prevStatuses,
        [rowData.uid]: newStatus, // Update the status for this borrower
      }));
    };

    const totalSalaryNoDeductions = rowData.basicPay + rowData.housingAllowance + rowData.transportAllowance 
  + rowData.ruralHardshipAllowance + rowData.infectiousHealthRisk + rowData.healthShiftAllowance 
  + rowData.interfaceAllowance + rowData.responsibilityAllowance + rowData.doubleClassAllowance 
  + rowData.actingAllowance + rowData.otherAllowances;


    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 dark:border-gray-600 p-5 relative">
        {rowData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
              {/* Personal Details */}
              <div className="shadow-md p-3 rounded-md bg-sky-500/20">
                <div className="mb-3 text-sky-700 text-xl font-semibold flex gap-2 items-center">
                  <div
                    onClick={(e) => handleViewPhoto(e, rowData.customerPhotoId)}
                    className={`${rowData.customerPhotoId && "cursor-pointer"}`}
                    title={"View Client Photo"}
                  >
                    <UserCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  Personal Details{" "}
                  {rowData.customerPhotoId && (
                    <p
                      className="text-xs text-gray-600 dark:text-gray-400 -mb-2 cursor-pointer underline"
                      onClick={(e) =>
                        handleViewPhoto(e, rowData.customerPhotoId)
                      }
                    >
                      View Client Photo
                    </p>
                  )}
                </div>
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                  <p>
                    {[
                      rowData.title,
                      rowData.firstName,
                      rowData.surname,
                      rowData.otherName,
                    ]
                      .filter(Boolean)
                      .join(" ")}{" "}
                    is a {rowData.age}-year-old {rowData.nationality} national.
                    They are {rowData.maritalStatus} and identify as{" "}
                    {rowData.gender}.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <CardInfoRow
                      icon={CalendarIcon}
                      label="Born"
                      value={rowData.dateOfBirth}
                    />
                    <CardInfoRow
                      icon={MapPinIcon}
                      label="Place"
                      value={rowData.placeOfBirth}
                    />
                    <CardInfoRow
                      icon={WindowIcon}
                      label={rowData.uniqueIDType}
                      value={rowData.uniqueID}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Details */}
              <CardInfo
                cardTitle="Contact Details"
                cardIcon={HomeIcon}
                colorBG={"bg-green-500/20"}
                colorText={"text-green-700"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                  <p>
                    Currently residing in{" "}
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

                  <div className="grid grid-cols-2 gap-4">
                    <CardInfoRow
                      icon={PhoneIcon}
                      label="Mobile"
                      value={rowData.mobile1}
                    />
                    <CardInfoRow
                      icon={EnvelopeIcon}
                      label="Email"
                      value={rowData.email}
                    />
                    <CardInfoRow
                      icon={ArchiveBoxIcon}
                      label="Post Box"
                      value={rowData.postBox}
                    />
                  </div>
                </div>
              </CardInfo>

              {/* Employment Details */}
              <CardInfo
                cardTitle="Professional Journey"
                cardIcon={BriefcaseIcon}
                colorBG={"bg-violet-500/20"}
                colorText={"text-violet-700"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                  <p>
                    Working as a {rowData.occupation} at {rowData.employer}{" "}
                    since {rowData.workStartDate} in a {rowData.workType}{" "}
                    capacity.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <CardInfoRow
                      icon={PhoneIcon}
                      label="Work Phone"
                      value={rowData.workPhoneNumber}
                    />
                    <CardInfoRow
                      icon={MapPinIcon}
                      label="Work Location"
                      value={rowData.workPhysicalAddress}
                    />
                  </div>
                </div>
              </CardInfo>

              {/* Salary Details */}
              <CardInfo
                cardTitle="Salary Details"
                cardIcon={BanknotesIcon}
                colorBG={"bg-yellow-500/20"}
                colorText={"text-yellow-700"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                  <p className="mb-5">
                    The salary includes a Basic Pay of {rowData.basicPay}, along
                    with a Housing Allowance of {rowData.housingAllowance} and a
                    Transport Allowance of {rowData.transportAllowance}.
                    <br />
                    Total Salary is <strong>
                      {totalSalaryNoDeductions}
                    </strong>{" "}
                    /-
                  </p>
                  <b>Total Deductions</b>
                  <div className="grid grid-cols-2 gap-4 ">
                    <CardInfoRow
                      icon={DocumentMinusIcon}
                      label={"On Payslip"}
                      value={rowData.totalDeductionsOnPayslip}
                    />
                    <CardInfoRow
                      icon={DocumentIcon}
                      label="Not on Payslip"
                      value={rowData.totalDeductionsNotOnPayslip}
                    />
                  </div>
                </div>
              </CardInfo>

              {/* Banking Details */}
              <CardInfo
                cardTitle="Financial Profile"
                cardIcon={BuildingOffice2Icon}
                colorBG={"bg-red-500/20"}
                colorText={"text-red-700"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                  <p>
                    Maintains a {rowData.accountType} account with{" "}
                    {rowData.bankName}. They have a credit score of{" "}
                    {rowData.creditScore}, and are borrowing for{" "}
                    {rowData.reasonForBorrowing} purpose. The repayment source
                    is {rowData.sourceOfRepayment}.
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <CardInfoRow
                      icon={WindowIcon}
                      label={"Account"}
                      value={rowData.accountNo}
                    />
                    <CardInfoRow
                      icon={UserIcon}
                      label="Name"
                      value={rowData.accountName}
                    />
                    <CardInfoRow
                      icon={MapPinIcon}
                      label="Branch"
                      value={
                        rowData.branch + " " + "(" + rowData.branchCode + ")"
                      }
                    />
                    <CardInfoRow
                      icon={WindowIcon}
                      label={"Sort Code"}
                      value={rowData.sortCode}
                    />
                  </div>
                </div>
              </CardInfo>

              {/* next of kin Details */}
              <CardInfo
                cardTitle="Next of kin Details"
                cardIcon={UsersIcon}
                colorBG={"bg-blue-500/20"}
                colorText={"text-blue-700"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                  <p>
                    {rowData.kinTitle} {rowData.kinOtherName}{" "}
                    {rowData.kinSurname}, the {rowData.kinRelationship} of the
                    applicant. They works as a{" "}
                    <strong>{rowData.kinOccupation}</strong> at{" "}
                    <strong>{rowData.kinEmployer}</strong>.
                  </p>
                  <p>
                    Currently residing in{" "}
                    {[
                      rowData.kinHouseNo,
                      rowData.kinStreet,
                      rowData.kinResidentialArea,
                      rowData.kinProvince,
                      rowData.kinDistrict,
                      rowData.kinCountry,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <CardInfoRow
                      icon={PhoneIcon}
                      label="Mobile"
                      value={rowData.kinMobile1}
                    />
                    <CardInfoRow
                      icon={EnvelopeIcon}
                      label="Email"
                      value={rowData.kinEmail}
                    />
                    <CardInfoRow
                      icon={WindowIcon}
                      label="NRC"
                      value={rowData.kinNrcNo}
                    />
                  </div>
                </div>
              </CardInfo>
            </div>

            {/* Actions */}
            <div className="absolute top-2 right-0">
              <Button
                buttonIcon={EditIcon}
                onClick={() => setEditModal(true)}
                buttonType="secondary"
              />
            </div>
            <ViewEditModal
              isOpen={showEditModal}
              onClose={() => setEditModal(false)}
              rowData={rowData}
              setCurrentStatus={setCurrentStatus}
              currentStatus={currentStatus}
            />
          </>
        ) : (
          <p>No data found</p>
        )}
      </div>
    );
  };

  const ListAction = (rowData) => {
    const handleNewApplication = async (BorrowerId) => {
      dispatch(resetAddLoanData());
      try {
        const loanApplicationId = await dispatch(
          generateLoanApplicationId()
        ).unwrap();

        // Encode BorrowerId to handle slashes
        const encodedBorrowerId = encodeURIComponent(BorrowerId);

        navigate(
          `/loan/loan-origination-system/personal/loans/add-loan/new/${loanApplicationId}/${encodedBorrowerId}`
        );
      } catch (error) {
        console.error("Failed to generate loan application ID:", error);
      }
    };

    const checkBorrowerInfoCustomerCare = async (borrowerID) => {
      const borrowerIdUpdated = removeSlashes(borrowerID);
      try {
        const token = localStorage.getItem("authToken");
        const data = await fetch(
          `${import.meta.env.VITE_BORROWER_INFO}${borrowerIdUpdated}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.status === 404) {
          toast.error("Borrower Not Found");
          return; // Stop further execution
        }
        // Check for token expiration or invalid token
        if (data.status === 401 || data.status === 403) {
          toast.error("Token Expired");
          localStorage.removeItem("authToken"); // Clear the token
          navigate("/login"); // Redirect to login page
          return; // Stop further execution
        }
        navigate("/loan/customer-care/" + borrowerIdUpdated + "/personal-info");
      } catch (error) {
        console.error(error);
      }
    };

    const getExistingLoan = async (borrowerID) => {
      // Encode BorrowerId to handle slashes
      const encodedBorrowerId = encodeURIComponent(borrowerID);
      dispatch(getLoanHistoryByField({ field: "uniqueID", value: borrowerID }));
      navigate(
        `/loan/loan-origination-system/personal/loans/loan-history/${encodedBorrowerId}`
      );
    };

    const userNavigation = [
      {
        name: "Add Loan",
        href: "#",
        action: handleNewApplication,
      },
      {
        name: "Existing Loans",
        href: "#",
        action: getExistingLoan,
      },
      {
        name: "Customer Care",
        href: "#",
        action: checkBorrowerInfoCustomerCare,
      },
    ];

    return (
      <div className="">
        <ActionOption
          userNavigation={userNavigation}
          actionID={rowData.uniqueID}
          align={"right"}
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="searchBy"
            inputOptions={searchOptions}
            inputValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            disabled={false}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
            disabled={false}
          />
        </div>

        <div className="flex align-middle justify-end gap-5">
          <Button
            buttonName={"Search"}
            onClick={SearchBorrowerByFieldSearch}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>

      <ExpandableTable
        columns={personalDetailsColumns}
        data={transformFlattenData}
        renderExpandedRow={renderExpandedRow}
        ListAction={ListAction}
        loading={loading}
        ListName="List of borrowers"
        ListNameLength={allBorrowersTotalElements}
      />
      <Pagination
        totalElements={allBorrowersTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
      <ViewPhotoModal
        isOpen={showPhotoModal}
        onClose={closePhotoModal}
        photoData={photoData}
      />
    </div>
  );
};

export default ViewBorrowers;
