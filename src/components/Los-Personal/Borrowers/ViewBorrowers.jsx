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
  fetchAllBorrowers,
  fetchBorrowerByField,
  changeBorrowerStatus,
  setUpdateBorrower,
} from "../../../redux/Slices/personalBorrowersSlice";
import { useNavigate } from "react-router-dom";
import { convertDate } from "../../../utils/convertDate";
import {
  CurrencyDollarIcon,
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
  UserCircleIcon,
  PencilIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";
import { generateLoanApplicationId, resetAddLoanData } from "../../../redux/Slices/personalLoansSlice";

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

  // Pagination state & Functionality
  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(fetchAllBorrowers({ page: currentPage, size: pageSize }));
  };

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
    if (searchBy || searchValue) {
      setSearchBy("");
      setSearchValue("");
      setFilteredBorrowers(allBorrowersData); // Reset to original data
    } else {
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

  function transformData(inputArray) {
    return inputArray.map((item) => ({
      ...item,
      fullName: `${item?.title} ${item?.firstName} ${item?.surname} ${item?.otherName}`,
      dateOfBirth: convertDate(item?.dateOfBirth),
      workStartDate: convertDate(item?.workStartDate),
    }));
  }

  const flattenData = flattenToSimpleObjectArray(filteredBorrowers);

  // console.log(flattenData);

  const transformFlattenData = transformData(flattenData);

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
    { label: "Name", field: "fullName" },
    { label: "Unique ID", field: "uniqueID" },
    { label: "Email", field: "email" },
    { label: "Mobile", field: "mobile1" },
    { label: "Loan Officer", field: "loanOfficer" },
    { label: "Status", field: "lmsUserStatus" },
  ];

  const SearchBorrowerByFieldSearch = () => {
    dispatch(fetchBorrowerByField({ field: searchBy, value: searchValue }));
    setSearchBy("");
    setSearchValue("");
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
        dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
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
        </>
      );
    };

    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5 relative">
        {rowData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
              {/* Personal Details */}
              <CardInfo
                cardTitle="Personal Details"
                cardIcon={CurrencyDollarIcon}
                colorBG={"bg-blue-tertiary"}
                colorText={"text-blue-primary"}
              >
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
              </CardInfo>

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
      navigate(
        `/loan/loan-origination-system/personal/loans/add-loan/${loanApplicationId}/${BorrowerId}`
      );
    } catch (error) {
      console.error("Failed to generate loan application ID:", error);
    }
  };

    return (
      <div className="flex justify-center gap-4 px-5">
        <Button
          onClick={() => handleNewApplication(rowData.uniqueID)}
          buttonName={"Add Loan"}
          buttonIcon={PlusIcon}
          rectangle={true}
          className={`mt-4 h-fit self-center`}
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
    </div>
  );
};

export default ViewBorrowers;
