import React, { useEffect, useState } from "react";
import { accountStatusOptions } from "../../../data/LosData";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import CardInfo from "../../Common/CardInfo/CardInfo";
import CardInfoRow from "../../Common/CardInfoRow/CardInfoRow";
import InputSelect from "../../Common/InputSelect/InputSelect";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAllCompanyBorrowersByLoanOfficer,
  fetchAllCompanyBorrowersByType,
  changeCompanyBorrowerStatus,
  fetchCompanyBorrowerByField,
  setUpdateCompany,
  setUpdateDirector,
  setUpdateShareholder,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useNavigate } from "react-router-dom";
import Accordion from "../../Common/Accordion/Accordion";
import Pagination from "../../Common/Pagination/Pagination";
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
  BanknotesIcon,
  PencilIcon,
  XMarkIcon,
  UsersIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartPieIcon,
} from "@heroicons/react/24/outline";
import {
  generateLoanApplicationId,
  getLoanHistoryByField,
  resetAddLoanData,
} from "../../../redux/Slices/smeLoansSlice";
import { convertDate } from "../../../utils/convertDate";
import ActionOption from "../../Common/ActionOptions/ActionOption";
import { toast } from "react-toastify";

const ViewCompany = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allBorrowersData, allBorrowersTotalElements, error, loading } =
    useSelector((state) => state.smeBorrowers);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const [borrowerStatuses, setBorrowerStatuses] = useState({});
  const [showEditModal, setEditModal] = useState(false);

  // Pagination state & Functionality
  const [pageSize, setPageSize] = useState(10);
  const loanOfficer = localStorage.getItem("username");

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      fetchAllCompanyBorrowersByType({
        page: currentPage,
        size: pageSize,
        borrowerType: "COMPANY_BORROWER",
      })
    );
  };

  useEffect(() => {
    const transformedData = allBorrowersData.map((item) => {
      return {
        ...item.companyBorrowerProfile,
        uid: item.uid,
        lmsUserStatus: item.lmsUserStatus,
        customerId: item.customerId,
      };
    });
    setFilteredBorrowers(transformedData);
  }, [allBorrowersData]);

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue, searchBy]);

  const applyFilters = () => {
    const filtered = allBorrowersData.filter((borrower) => {
      const companyDetails =
        borrower.companyBorrowerProfile?.companyDetails || {};
      const companyContactDetails =
        borrower.companyBorrowerProfile?.companyContactDetails || {};

      // console.log("companyContactDetails:", companyContactDetails);
      // console.log("searchValue:", searchValue);

      let matchesSearchValue = false;
      matchesSearchValue = searchValue
        ? [
            companyDetails.companyName,
            companyDetails.companyShortName,
            companyDetails.companyUniqueId,
            companyDetails.companyRegistrationNo,
            borrower.customerId,
            companyContactDetails.mobile1,
          ]
            .map((field) => (field ? field.toString().toLowerCase() : "")) // Ensure each field is a string and lowercase
            .some((field) => field.includes(searchValue.toLowerCase())) // Check if any field matches
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
      setFilteredBorrowers(allBorrowersData); // Reset to original data
    } else {
      dispatch(
        fetchAllCompanyBorrowersByType({
          page: 0,
          size: 20,
          borrowerType: "COMPANY_BORROWER",
        })
      );
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

  function transformData(inputArray) {
    return inputArray.map((item) => ({
      ...item,
      fullName: `${item?.companyName} ${item?.companyShortName}`,
    }));
  }

  const flattenData = flattenToSimpleObjectArray(filteredBorrowers);

  // console.log(flattenData);

  const transformFlattenData = transformData(flattenData);

  const searchOptions = [
    { label: "Name", value: "companyName" },
    { label: "Short Name", value: "companyShortName" },
    { label: "Registration No.", value: "companyRegistrationNo" },
    { label: "Borrower Serial No.", value: "companyUniqueId" },
    { label: "Customer ID", value: "customerId" },
    { label: "Loan Officer", value: "loanOfficer" },
  ];

  const personalDetailsColumns = [
    { label: "Name", field: "fullName" },
    { label: "Registration No.", field: "companyRegistrationNo" },
    { label: "Borrower Serial No.", field: "companyUniqueId", copy: true },
    { label: "Customer ID", field: "customerId" },
    { label: "Loan Officer", field: "loanOfficer" },
    { label: "Status", field: "lmsUserStatus" },
  ];

  const SearchBorrowerByFieldSearch = () => {
    dispatch(
      fetchCompanyBorrowerByField({ field: searchBy, value: searchValue })
    );
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
        dispatch(setUpdateCompany({ uid }));
        navigate(
          `/loan/loan-origination-system/sme/borrowers/update-company/${uid}`
        );
        console.log(uid);
      };

      const handleChangeStatus = async (uid, newStatus) => {
        console.log(uid);
        setCurrentStatus(newStatus);
        await dispatch(
          changeCompanyBorrowerStatus({ uid, newStatus })
        ).unwrap();
        dispatch(
          fetchAllCompanyBorrowersByType({
            page: 0,
            size: 20,
            borrowerType: "COMPANY_BORROWER",
          })
        );
        navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
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

    const handleEdit = (uid) => {
      dispatch(setUpdateCompany({ uid }));
      navigate(
        `/loan/loan-origination-system/sme/borrowers/update-company/${uid}`
      );
      console.log(uid);
    };

    const handleEditDirector = (uid, uniqueID) => {
      dispatch(setUpdateDirector({ uid, uniqueID }));
      navigate(
        `/loan/loan-origination-system/sme/borrowers/update-director/${uid}`
      );
      console.log(uid);
    };

    const handleEditShareholder = (uid, uniqueID) => {
      dispatch(setUpdateShareholder({ uid, uniqueID }));
      navigate(
        `/loan/loan-origination-system/sme/borrowers/update-shareholder/${uid}`
      );
      console.log(uid);
    };

    const handleChangeStatus = async (uid, newStatus) => {
      console.log(uid);
      setCurrentStatus(newStatus);
      await dispatch(changeCompanyBorrowerStatus({ uid, newStatus })).unwrap();
      dispatch(
        fetchAllCompanyBorrowersByType({
          page: 0,
          size: 20,
          borrowerType: "COMPANY_BORROWER",
        })
      );
      navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
    };

    return (
      <div className="space-y-2 text-sm text-gray-600 border-y-2 py-2">
        <Accordion
          heading={"Company Details"}
          renderExpandedContent={() => (
            <div className="grid grid-cols-1 gap-1 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                {/* Company Details */}
                <CardInfo
                  cardTitle="Company Overview"
                  cardIcon={BuildingOffice2Icon}
                  colorText={"text-blue-primary"}
                  colorBG={"bg-blue-tertiary"}
                  coloredBG={true}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3">
                    <p>
                      {rowData.companyName} is a {rowData.natureOfCompany}{" "}
                      company operating in the {rowData.industry}.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <CardInfoRow
                        icon={DocumentTextIcon}
                        label="Registration No"
                        value={rowData.companyRegistrationNo}
                      />
                      <CardInfoRow
                        icon={WindowIcon}
                        label="Borrower Serial No"
                        value={rowData.companyUniqueId}
                      />
                      <CardInfoRow
                        icon={CalendarIcon}
                        label="Incorporated"
                        value={convertDate(rowData.dateOfIncorporation)}
                      />
                      <CardInfoRow
                        icon={UsersIcon}
                        label="Employees"
                        value={rowData.numberOfPermanentEmployees}
                      />
                    </div>
                  </div>
                </CardInfo>

                {/*Company Contact Details */}
                <CardInfo
                  cardTitle="Contact Information"
                  cardIcon={PhoneIcon}
                  colorText={"text-green-primary"}
                  colorBG={"bg-green-tertiary"}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3">
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
                      <CardInfoRow
                        icon={MapPinIcon}
                        label="Address"
                        value={[
                          rowData.houseNumber,
                          rowData.street,
                          rowData.residentialArea,
                          rowData.province,
                          rowData.district,
                          rowData.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      />
                    </div>
                  </div>
                </CardInfo>

                {/* Banking Details */}
                <CardInfo
                  cardTitle="Financial Profile"
                  cardIcon={BuildingOffice2Icon}
                  colorText={"text-violet-primary"}
                  colorBG={"bg-violet-tertiary"}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3">
                    <div className="grid grid-cols-2 gap-4">
                      <CardInfoRow
                        icon={BuildingOffice2Icon}
                        label="Bank"
                        value={rowData.bankName}
                      />
                      <CardInfoRow
                        icon={WindowIcon}
                        label="Account"
                        value={rowData.accountNo}
                      />
                      <CardInfoRow
                        icon={MapPinIcon}
                        label="Branch"
                        value={rowData.branch + " (" + rowData.branchCode + ")"}
                      />
                      <CardInfoRow
                        icon={DocumentTextIcon}
                        label="Sort Code"
                        value={rowData.sortCode}
                      />
                      <CardInfoRow
                        icon={CurrencyDollarIcon}
                        label="Free Cash"
                        value={rowData.freeCashInHand}
                      />
                      <CardInfoRow
                        icon={BanknotesIcon}
                        label="Gross Revenue"
                        value={rowData.grossSalary}
                      />
                    </div>
                  </div>
                </CardInfo>

                {/* Company Other Details */}
                <CardInfo
                  cardTitle="Other Details"
                  cardIcon={BriefcaseIcon}
                  colorText={"text-orange-primary"}
                  colorBG={"bg-orange-tertiary"}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3">
                    <div className="grid grid-cols-1 gap-4">
                      <CardInfoRow
                        icon={DocumentTextIcon}
                        label="Purpose"
                        value={rowData.reasonForBorrowing}
                      />
                      <CardInfoRow
                        icon={CurrencyDollarIcon}
                        label="Repayment Source"
                        value={rowData.sourceOfRepayment}
                      />
                      <CardInfoRow
                        icon={ChartPieIcon}
                        label="Shareholding"
                        value={rowData.shareholdingStructure}
                      />
                      <CardInfoRow
                        icon={UsersIcon}
                        label="Trade Union"
                        value={rowData.tradeUnion}
                      />
                      <CardInfoRow
                        icon={WindowIcon}
                        label="Credit Score"
                        value={rowData.creditScore}
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
            </div>
          )}
        />
        {/* Directors Kyc Details Details */}
        {rowData?.directorsKycDetails?.length > 0 && (
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
                      <div className="grid grid-cols-1 gap-1 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                          {/* Director Personal Details */}
                          <CardInfo
                            cardTitle="Personal Details"
                            cardIcon={UserIcon}
                            colorText={"text-blue-primary"}
                            colorBG={"bg-blue-tertiary"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3">
                              <p>
                                {[
                                  director.personalDetails.title,
                                  director.personalDetails.firstName,
                                  director.personalDetails.surname,
                                  director.personalDetails.otherName,
                                ]
                                  .filter(Boolean)
                                  .join(" ")}{" "}
                                is a {director.personalDetails.age}-year-old{" "}
                                {director.personalDetails.nationality} national.
                                They are{" "}
                                {director.personalDetails.maritalStatus} and
                                identify as {director.personalDetails.gender}.
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <CardInfoRow
                                  icon={CalendarIcon}
                                  label="Born"
                                  value={director.personalDetails.dateOfBirth}
                                />
                                <CardInfoRow
                                  icon={MapPinIcon}
                                  label="Place"
                                  value={director.personalDetails.placeOfBirth}
                                />
                                <CardInfoRow
                                  icon={WindowIcon}
                                  label={director.personalDetails.uniqueIDType}
                                  value={director.personalDetails.uniqueID}
                                />
                              </div>
                            </div>
                          </CardInfo>

                          {/*Director Contact Details */}
                          <CardInfo
                            cardTitle="Contact Details"
                            cardIcon={PhoneIcon}
                            colorText={"text-green-primary"}
                            colorBG={"bg-green-tertiary"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3">
                              <p>
                                Currently residing in{" "}
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

                              <div className="grid grid-cols-2 gap-4">
                                <CardInfoRow
                                  icon={PhoneIcon}
                                  label="Mobile"
                                  value={director.contactDetails.mobile1}
                                />
                                <CardInfoRow
                                  icon={EnvelopeIcon}
                                  label="Email"
                                  value={director.contactDetails.email}
                                />
                                <CardInfoRow
                                  icon={ArchiveBoxIcon}
                                  label="Post Box"
                                  value={director.contactDetails.postBox}
                                />
                              </div>
                            </div>
                          </CardInfo>

                          {/*Director Employment Details */}
                          <CardInfo
                            cardTitle="Employment Details"
                            cardIcon={BriefcaseIcon}
                            colorText={"text-violet-primary"}
                            colorBG={"bg-violet-tertiary"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3">
                              <p>
                                Working as a{" "}
                                {director.employmentDetails.occupation} at{" "}
                                {director.employmentDetails.employer} since{" "}
                                {director.employmentDetails.workStartDate} in a{" "}
                                {director.employmentDetails.workType} capacity.
                              </p>

                              <div className="grid grid-cols-2 gap-4">
                                <CardInfoRow
                                  icon={PhoneIcon}
                                  label="Work Phone"
                                  value={
                                    director.employmentDetails.workPhoneNumber
                                  }
                                />
                                <CardInfoRow
                                  icon={MapPinIcon}
                                  label="Work Location"
                                  value={
                                    director.employmentDetails
                                      .workPhysicalAddress
                                  }
                                />
                              </div>
                            </div>
                          </CardInfo>

                          {/*Director Banking Details */}
                          <CardInfo
                            cardTitle="Banking Details"
                            cardIcon={BuildingOffice2Icon}
                            colorText={"text-orange-primary"}
                            colorBG={"bg-orange-tertiary"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3">
                              <p>
                                Maintain a {director.bankDetails.accountType}{" "}
                                account with {director.bankDetails.bankName}.
                              </p>
                              <div className="grid grid-cols-2 gap-4">
                                <CardInfoRow
                                  icon={WindowIcon}
                                  label={"Account"}
                                  value={director.bankDetails.accountNo}
                                />
                                <CardInfoRow
                                  icon={UserIcon}
                                  label="Name"
                                  value={director.bankDetails.accountName}
                                />
                                <CardInfoRow
                                  icon={MapPinIcon}
                                  label="Branch"
                                  value={
                                    director.bankDetails.branch +
                                    " " +
                                    "(" +
                                    director.bankDetails.branchCode +
                                    ")"
                                  }
                                />
                                <CardInfoRow
                                  icon={WindowIcon}
                                  label={"Sort Code"}
                                  value={director.bankDetails.sortCode}
                                />
                              </div>
                            </div>
                          </CardInfo>
                        </div>
                        {/*Director Actions */}
                        <div className="absolute top-0 right-0">
                          <button
                            className="relative flex rounded-full p-1 bg-white border-2 border-indigo-500 hover:bg-background-light-secondary transition-colors duration-200"
                            onClick={() =>
                              handleEditDirector(
                                rowData.uid,
                                director.personalDetails.uniqueID
                              )
                            }
                          >
                            <PencilIcon className="h-5 w-5 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    )}
                  />
                ))}
              </>
            )}
          />
        )}

        {/* Shareholder Details */}
        {rowData?.shareHolderDetails?.length > 0 && (
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
                        <div className="grid grid-cols-1 gap-1 relative">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                            {/* Shareholder Personal Details */}
                            <CardInfo
                              cardTitle="Shareholder Personal Details"
                              cardIcon={UserIcon}
                              colorText={"text-blue-primary"}
                              colorBG={"bg-blue-tertiary"}
                            >
                              <div className="space-y-2 flex flex-col gap-5 p-3">
                                <p>
                                  <b>
                                    {shareholder.personalDetails.title}{" "}
                                    {shareholder.personalDetails.firstName}{" "}
                                    {shareholder.personalDetails.surname}{" "}
                                    {shareholder.personalDetails.otherName}
                                  </b>
                                  ,a {shareholder.personalDetails.gender}{" "}
                                  {shareholder.personalDetails.maritalStatus}{" "}
                                  individual from{" "}
                                  {shareholder.personalDetails.nationality}.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                  <CardInfoRow
                                    icon={WindowIcon}
                                    label={
                                      shareholder.personalDetails.uniqueIDType
                                    }
                                    value={shareholder.personalDetails.uniqueID}
                                  />
                                  <CardInfoRow
                                    icon={CalendarIcon}
                                    label="Born"
                                    value={
                                      shareholder.personalDetails.dateOfBirth
                                    }
                                  />
                                  <CardInfoRow
                                    icon={MapPinIcon}
                                    label="Place"
                                    value={
                                      shareholder.personalDetails.placeOfBirth
                                    }
                                  />
                                </div>
                              </div>
                            </CardInfo>

                            {/*Shareholder Contact Details */}
                            <CardInfo
                              cardTitle="Shareholder Contact Details"
                              cardIcon={PhoneIcon}
                              colorText={"text-green-primary"}
                              colorBG={"bg-green-tertiary"}
                            >
                              <div className="space-y-2 flex flex-col gap-5 p-3">
                                <div className="grid grid-cols-2 gap-4">
                                  <CardInfoRow
                                    icon={PhoneIcon}
                                    label="Mobile"
                                    value={shareholder.contactDetails.mobile1}
                                  />
                                  <CardInfoRow
                                    icon={EnvelopeIcon}
                                    label="Email"
                                    value={shareholder.contactDetails.email}
                                  />
                                  <CardInfoRow
                                    icon={MapPinIcon}
                                    label="Address"
                                    value={[
                                      shareholder.contactDetails.houseNumber,
                                      shareholder.contactDetails.street,
                                      shareholder.contactDetails
                                        .residentialArea,
                                      shareholder.contactDetails.province,
                                      shareholder.contactDetails.district,
                                      shareholder.contactDetails.country,
                                    ]
                                      .filter(Boolean)
                                      .join(", ")}
                                  />
                                  <CardInfoRow
                                    icon={ArchiveBoxIcon}
                                    label="Post Box"
                                    value={shareholder.contactDetails.postBox}
                                  />
                                </div>
                              </div>
                            </CardInfo>
                          </div>
                          {/*Shareholder Actions */}
                          <div className="absolute top-0 right-0">
                            <button
                              className="relative flex rounded-full p-1 bg-white border-2 border-indigo-500 hover:bg-background-light-secondary transition-colors duration-200"
                              onClick={() =>
                                handleEditShareholder(
                                  rowData.uid,
                                  shareholder.personalDetails.uniqueID
                                )
                              }
                            >
                              <PencilIcon className="h-5 w-5 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      )}
                    />
                  </>
                ))}
              </>
            )}
          />
        )}
      </div>
    );
  };

  const ListAction = (rowData) => {
    // if (rowData.status === "Completed" || rowData.status === "Cancel" ||
    //       hasViewOnlyAccessGroup3(roleName)) {
    //   return <div className="py-6">-</div>;
    // }
    // console.log(rowData);

    const handleNewApplication = async (BorrowerId) => {
      dispatch(resetAddLoanData());
      try {
        const loanApplicationId = await dispatch(
          generateLoanApplicationId()
        ).unwrap();
        // Encode BorrowerId to handle slashes
        const encodedBorrowerId = encodeURIComponent(BorrowerId);
        navigate(
          `/loan/loan-origination-system/sme/loans/add-loan/new/${loanApplicationId}/${encodedBorrowerId}`
        );
      } catch (error) {
        console.error("Failed to generate loan application ID:", error);
      }
    };

    const checkBorrowerInfoCustomerCare = async (borrowerID) => {
      try {
        const token = localStorage.getItem("authToken");
        const data = await fetch(
          `${import.meta.env.VITE_BORROWER_INFO}${borrowerID}`,
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
        navigate("/loan/customer-care/" + borrowerID + "/personal-info");
      } catch (error) {
        console.error(error);
      }
    };

    const getExistingLoan = async (borrowerID) => {
      // Encode BorrowerId to handle slashes
      const encodedBorrowerId = encodeURIComponent(borrowerID);
      dispatch(getLoanHistoryByField({ field: "uniqueID", value: borrowerID }));
      navigate(
        `/loan/loan-origination-system/sme/loans/loan-history/${encodedBorrowerId}`
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
          actionID={rowData.companyUniqueId}
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
    </div>
  );
};

export default ViewCompany;
