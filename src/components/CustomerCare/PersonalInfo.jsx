import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import CardInfo from "../Common/CardInfo/CardInfo";
import CardInfoRow from "../Common/CardInfoRow/CardInfoRow";
import Accordion from "../Common/Accordion/Accordion";
import { fetchBorrowerDataPersonalInfo } from "../../redux/Slices/customerCareSlice";
import { convertDate } from "../../utils/convertDate";
import {
  CurrencyDollarIcon,
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ArchiveBoxIcon,
  HomeIcon,
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
import { viewPhoto } from "../../redux/Slices/personalBorrowersSlice";
import ViewPhotoModal from "../Los-Personal/Borrowers/ViewPhotoModal";
import toPascalCase from "../../utils/toPascalCase";
import ShimmerTable from "../Common/ShimmerTable/ShimmerTable";

const PersonalInfo = () => {
  const { subID } = useParams();
  const dispatch = useDispatch();
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoData, setPhotoData] = useState(null);

  // Access state from Redux store
  const { personalInfo, loading, error } = useSelector(
    (state) => state.customerCare
  );

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
      fullName: `${item?.title} ${item?.firstName} ${item?.surname} ${item?.otherName}`,
      dateOfBirth: convertDate(item?.dateOfBirth),
      workStartDate: convertDate(item?.workStartDate),
    }));
  }

  useEffect(() => {
    try {
      if (subID) {
        // Dispatch the fetchBorrowerData thunk
        dispatch(fetchBorrowerDataPersonalInfo({ subID }));
      }
    } catch (error) {
      console.error("Caught error in useEffect: ", error);
      // Optionally, set some state to reflect the error and trigger an alternative UI
    }
  }, [dispatch, subID]);

  const flattenData = flattenToSimpleObjectArray([
    personalInfo?.borrowerProfile,
  ]);
  const flattenDataCompany = flattenToSimpleObjectArray([
    personalInfo?.companyBorrowerProfile,
  ]);

  const transformFlattenData = transformData(flattenData);
  const transformFlattenDataCompany = transformData(flattenDataCompany);

  const handleViewPhoto = async (photoId) => {
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
  };

  const closePhotoModal = () => {
    setShowPhotoModal(false);
  };

  const renderExpandedRowPersonal = (rowData) => {
    return (
      <>
        {rowData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
              {/* Personal Details */}
              <div className="shadow-md p-3 rounded-md bg-sky-500/20">
                <div className="mb-3 text-sky-700 text-xl font-semibold flex gap-2 items-center">
                  <div
                    onClick={() => handleViewPhoto(rowData.customerPhotoId)}
                    className="cursor-pointer"
                    title="Click to view profile photo"
                  >
                    <UserCircleIcon
                      className="-ml-0.5 h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                  Personal Details
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
                      label={toPascalCase(rowData.uniqueIDType)}
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

              {/* Banking Details */}
              <CardInfo
                cardTitle="Financial Profile"
                cardIcon={BuildingOffice2Icon}
                colorBG={"bg-yellow-500/20"}
                colorText={"text-yellow-700"}
              >
                <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
          </>
        ) : (
          <p>No data found</p>
        )}
      </>
    );
  };

  const personalDetailsColumns = [
    { label: "Name", field: "fullName" },
    { label: "Unique ID", field: "uniqueID" },
    { label: "Email", field: "email" },
    { label: "Mobile", field: "mobile1" },
    { label: "Loan Officer", field: "loanOfficer" },
    { label: "Status", field: "lmsUserStatus" },
  ];

  const renderExpandedRowCompany = (rowData) => {
    return (
      <div className="space-y-2 text-sm text-gray-600 py-2">
        <Accordion
          heading={"Company Details"}
          renderExpandedContent={() => (
            <div className="grid grid-cols-1 gap-1 relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                {/* Company Details */}
                <CardInfo
                  cardTitle="Company Overview"
                  cardIcon={BuildingOffice2Icon}
                  colorText={"text-sky-700 "}
                  colorBG={"bg-sky-500/20"}
                  coloredBG={true}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                  colorText={"text-green-700"}
                  colorBG={"bg-green-500/20"}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                  colorText={"text-violet-700"}
                  colorBG={"bg-violet-500/20"}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                  colorText={"text-yellow-700"}
                  colorBG={"bg-yellow-500/20"}
                >
                  <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                            colorText={"text-sky-700"}
                            colorBG={"bg-sky-500/20"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                            colorText={"text-green-700"}
                            colorBG={"bg-green-500/20"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                            colorText={"text-violet-700"}
                            colorBG={"bg-violet-500/20"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                            colorText={"text-yellow-700"}
                            colorBG={"bg-yellow-500/20"}
                          >
                            <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                              colorText={"text-sky-700"}
                              colorBG={"bg-sky-500/20"}
                            >
                              <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
                              colorText={"text-green-700"}
                              colorBG={"bg-green-500/20"}
                            >
                              <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
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
  console.log(personalInfo);

  if (loading) {
    return (
      <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
        <ShimmerTable />
        <ShimmerTable />
        <ShimmerTable />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {/* <img
            className="rounded-full w-12"
            src="https://lmscarbon.com/assets/index.png"
            alt=""
          /> */}
        <div className="flex justify-between items-center text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-sm mb-3 p-4">
          <div>Customer Id: {personalInfo.customerId}</div>
          {personalInfo.borrowerProfileType === "PERSONAL_BORROWER" && (
            <div>
              Borrower Id:{" "}
              {personalInfo.borrowerProfile.personalDetails.uniqueID}
            </div>
          )}
          {personalInfo.borrowerProfileType === "COMPANY_BORROWER" && (
            <div>
              Unique Id:{" "}
              {
                personalInfo.companyBorrowerProfile.companyDetails
                  .companyUniqueId
              }
            </div>
          )}
        </div>

        <>
          {personalInfo?.borrowerProfileType === "PERSONAL_BORROWER" ? (
            <>{renderExpandedRowPersonal(...transformFlattenData)}</>
          ) : (
            <>{renderExpandedRowCompany(...transformFlattenDataCompany)}</>
          )}
        </>
        <ViewPhotoModal
          isOpen={showPhotoModal}
          onClose={closePhotoModal}
          photoData={photoData}
        />
      </div>
    </>
  );
};

export default PersonalInfo;
