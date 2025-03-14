import React, { useEffect, useState, useRef } from "react";
import { accountStatusOptions } from "../../../data/LosData";
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
  changeBorrowerStatus,
  setUpdateBorrower,
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
  ArchiveBoxIcon,
  HomeIcon,
  PlusIcon,
  BriefcaseIcon,
  WindowIcon,
  MapPinIcon,
  CalendarIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";
import {
  generateLoanApplicationId,
  getLoanHistoryByField,
  resetAddLoanData,
} from "../../../redux/Slices/personalLoansSlice";
import ViewPhotoModal from "./ViewPhotoModal";
import { viewPhoto } from "../../../redux/Slices/personalBorrowersSlice";
import ActionOption from "../../Common/ActionOptions/ActionOption";

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
    if (searchBy || searchValue) {
      setSearchBy("");
      setSearchValue("");
      setFilteredBorrowers(allBorrowersData); // Reset to original data
    } else {
      dispatch(
        fetchAllBorrowersByType({
          page: 0,
          size: 20,
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
    }));
  }

  const flattenData = flattenToSimpleObjectArray(filteredBorrowers);

  const transformFlattenData = transformData(flattenData);

  const searchOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Surname", value: "surname" },
    { label: "Other Name", value: "otherName" },
    { label: "Unique ID", value: "uniqueID" },
    { label: "Cutomer ID", value: "customerId" },
    { label: "Loan Officer", value: "loanOfficer" },
  ];

  const personalDetailsColumns = [
    { label: "Name", field: "fullName" },
    { label: "Unique ID", field: "uniqueID", copy: true },
    { label: "Cutomer ID", field: "customerId" },
    { label: "Loan Officer", field: "loanOfficer" },
    { label: "Status", field: "lmsUserStatus" },
  ];

  const SearchBorrowerByFieldSearch = () => {
    dispatch(fetchBorrowerByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
  };

  const handleViewPhoto = async (photoId) => {
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

    const ViewEditModal = ({ isOpen, onClose }) => {
      if (!isOpen) return null;

      const handleEdit = (uid) => {
        dispatch(setUpdateBorrower({ uid }));
        navigate(
          `/loan/loan-origination-system/personal/borrowers/update-borrower/${uid}`
        );
        // console.log(uid);
      };

      const handleChangeStatus = async (uid, newStatus) => {
        console.log(uid);
        setCurrentStatus(newStatus);
        await dispatch(changeBorrowerStatus({ uid, newStatus })).unwrap();
        dispatch(
          fetchAllBorrowersByType({
            page: 0,
            size: 20,
            borrowerType: "PERSONAL_BORROWER",
          })
        );
        navigate(
          `/loan/loan-origination-system/personal/borrowers/view-borrower`
        );
        onClose();
      };

      return (
        <>
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-stone-200/10 backdrop-blur-sm">
            <div className="relative w-1/3 p-8 bg-white border border-red-600 rounded-xl shadow-lg transition-all duration-500 ease-in-out">
              <XMarkIcon
                onClick={onClose}
                className="absolute p-1 top-1 right-1 h-6 w-6 text-white bg-red-500 rounded-full cursor-pointer"
              />
              <div className="flex justify-start gap-5 flex-col mt-4">
                <InputSelect
                  labelName={"Account Status"}
                  inputName={"accountStatus"}
                  inputOptions={accountStatusOptions}
                  inputValue={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  disabled={false}
                />
                <Button
                  buttonName={"Change Status"}
                  onClick={() => handleChangeStatus(rowData.uid, currentStatus)}
                  className={"bg-red-500 hover:bg-red-600"}
                  rectangle={true}
                />
                {/* OR Separator with horizontal line */}
                <div className="relative flex items-center my-2">
                  <hr className="w-full border-gray-300" />
                  <span className="absolute left-1/2 -translate-x-1/2 bg-white px-2 text-gray-500 text-sm">
                    OR
                  </span>
                </div>
                <Button
                  buttonName={"Edit"}
                  onClick={() => handleEdit(rowData.uid)}
                  className={"text-center"}
                  rectangle={true}
                />
              </div>
            </div>
          </div>
        </>
      );
    };

    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5 relative">
        {rowData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
              {/* Personal Details */}
              <div className="shadow-md p-3 rounded-md bg-blue-tertiary">
                <div className="mb-3 text-blue-primary text-xl font-semibold flex gap-2 items-center">
                  <div
                    onClick={() => handleViewPhoto(rowData.customerPhotoId)}
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
                      className="text-[9px] text-gray-600 -mb-2"
                      onClick={() => handleViewPhoto(rowData.customerPhotoId)}
                    >
                      View Client Photo
                    </p>
                  )}
                </div>
                <div className="space-y-2 flex flex-col gap-5 p-3">
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
                colorBG={"bg-green-tertiary"}
                colorText={"text-green-primary"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3">
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
                colorBG={"bg-violet-tertiary"}
                colorText={"text-violet-primary"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3">
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

              {/* Banking Details */}
              <CardInfo
                cardTitle="Financial Profile"
                cardIcon={BuildingOffice2Icon}
                colorBG={"bg-orange-tertiary"}
                colorText={"text-orange-primary"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3">
                  <p>
                    Maintain a {rowData.accountType} account with{" "}
                    {rowData.bankName}.
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
            </div>

            {/* Actions */}
            <div className="absolute top-0 right-0">
              <button
                className="relative flex rounded-full p-1 bg-white border-2 border-indigo-500 hover:bg-background-light-secondary transition-colors duration-200"
                onClick={() => setEditModal(true)}
              >
                <PencilIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <ViewEditModal
              isOpen={showEditModal}
              onClose={() => setEditModal(false)}
            />
          </>
        ) : (
          <p>No data found</p>
        )}
      </div>
    );
  };

  const ListAction = (rowData) => {
    // if (rowData.status === "Completed" || rowData.status === "Cancel" ||
    //       hasViewOnlyAccessGroup3(roleName)) {
    //   return <div className="py-6">-</div>;
    // }

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
      <div className="flex justify-center align-middle gap-4 px-5">
        <ActionOption
          userNavigation={userNavigation}
          actionID={rowData.uniqueID}
        />
      </div>
    );
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
            disabled={false}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
            disabled={false}
          />
        </div>

        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Search"}
            onClick={SearchBorrowerByFieldSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            rectangle={true}
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
        error={error}
      />
      <Pagination
        totalElements={allBorrowersTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
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
