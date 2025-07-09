import React, { useEffect, useRef } from "react";
import Button from "../../Common/Button/Button";
import Accordion from "../../Common/Accordion/Accordion";
import {
  setCompanyId,
  handleChangeAddDirectorField,
  addDirector,
  removeDirector,
  resetDirector,
  addDirectorInfo,
  fetchAllCompanyBorrowers,
  fetchCompanyDetails,
  setUpdateExistingDirector,
  deleteDirectorInfo,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "../../Los-SME/Borrowers/AddUpdateDirectorFields";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { XCircleIcon } from "@heroicons/react/20/solid";
import {
  ArchiveBoxIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  CalendarIcon,
  EnvelopeIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import { AddIcon, DeleteIcon, EditIcon } from "../../../assets/icons";
import CardInfoRow from "../../Common/CardInfoRow/CardInfoRow";
import CardInfo from "../../Common/CardInfo/CardInfo";
import { fieldToSectionMapPersonalBorrowers } from "../../../data/fieldSectionMapData";
import store from "../../../redux/store";
const AddDirector = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    companyId,
    directorsKycDetails,
    existingDirectorDetails,
    allCompanies,
    error,
    loading,
  } = useSelector((state) => state.smeBorrowers);
  const loanOfficer = localStorage.getItem("username");
  const sectionRefs = useRef({});

  useEffect(() => {
    dispatch(fetchAllCompanyBorrowers());
  }, [dispatch]);

  const handleSubmitNewDirector = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(directorsKycDetails)));
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const firstInvalidKey = Object.keys(state.validation.validationError).find(
      (key) => state.validation.validationError[key]
    );
    if (firstInvalidKey) {
      const sectionName = fieldToSectionMapPersonalBorrowers[firstInvalidKey];
      const ref = sectionRefs.current[sectionName];
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (isValid) {
      dispatch(addDirectorInfo({ directorsKycDetails, companyId }))
        .unwrap()
        .then(() => {
          // After successful addition, fetch the updated company details
          dispatch(fetchCompanyDetails({ companyId }));
          dispatch(removeDirector({ index: 0 }));
        });
    }
  };

  const changeCompany = (e) => {
    dispatch(setCompanyId({ companyId: e.target.value }));
    dispatch(fetchCompanyDetails({ companyId: e.target.value }));
  };

  const handleEditDirector = (uid, uniqueID) => {
    dispatch(setUpdateExistingDirector({ uid, uniqueID }));
    navigate(
      `/loan/loan-origination-system/sme/borrowers/update-director/${uid}`
    );
  };

  const handleDeleteDirector = (uid, uniqueID) => {
    dispatch(deleteDirectorInfo({ companyId: uid, directorId: uniqueID }))
      .unwrap()
      .then(() => {
        dispatch(fetchCompanyDetails({ companyId: uid }))
          .unwrap()
          .then(() => {});
      });
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

  return (
    <>
      <div className="mb-4 md:flex justify-between items-center">
        <div className="min-w-72 mb-2 md:mb-0">
          <InputSelect
            labelName={"Company"}
            inputName={"companyId"}
            inputOptions={allCompanies}
            inputValue={companyId}
            onChange={changeCompany}
            disabled={false}
          />
        </div>
        <div className="">
          {directorsKycDetails.length < 1 && (
            <Button
              buttonIcon={AddIcon}
              buttonName="Add Director"
              onClick={() => dispatch(addDirector({ loanOfficer }))}
              buttonType="secondary"
            />
          )}
        </div>
      </div>

      {existingDirectorDetails.length > 0 && companyId && (
        <div className=" flex flex-col mb-6">
          <p className="font-semibold mb-2">Existing Directors</p>
          {existingDirectorDetails.map((director, index) => (
            <>
              <Accordion
                key={index}
                heading={`${director.personalDetails.title} 
                      ${director.personalDetails.firstName} 
                      ${director.personalDetails.surname} 
                      ${director.personalDetails.otherName}`}
                renderExpandedContent={() => (
                  <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                      {/* Director Personal Details */}
                      <div className="shadow-md p-3 rounded-md bg-sky-500/20">
                        <div className="mb-3 text-sky-700 text-xl font-semibold flex gap-2 items-center">
                          <div
                            onClick={(e) =>
                              handleViewPhoto(
                                e,
                                director.otherDetails.customerPhotoId
                              )
                            }
                            className={`${
                              director.otherDetails.customerPhotoId &&
                              "cursor-pointer"
                            }`}
                            title={"View Client Photo"}
                          >
                            <UserCircleIcon
                              className="-ml-0.5 h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          Personal Details{" "}
                          {/* {director.otherDetails.customerPhotoId && (
                            <p
                              className="text-[9px] text-gray-600 dark:text-gray-400 -mb-2 cursor-pointer underline"
                              onClick={(e) =>
                                handleViewPhoto(e, director.otherDetails.customerPhotoId)
                              }
                            >
                              View Client Photo
                            </p>
                          )} */}
                        </div>
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
                            They are {director.personalDetails.maritalStatus}{" "}
                            and identify as {director.personalDetails.gender}.
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
                      </div>

                      {/*Director Contact Details */}
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

                      {/*Director Professional Journey */}
                      <CardInfo
                        cardTitle="Professional Journey"
                        cardIcon={BriefcaseIcon}
                        colorBG={"bg-violet-500/20"}
                        colorText={"text-violet-700"}
                      >
                        <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                          <p>
                            Working as a {director.employmentDetails.occupation}{" "}
                            at {director.employmentDetails.employer} since{" "}
                            {director.employmentDetails.workStartDate} in a{" "}
                            {director.employmentDetails.workType} capacity.
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <CardInfoRow
                              icon={PhoneIcon}
                              label="Work Phone"
                              value={director.employmentDetails.workPhoneNumber}
                            />
                            <CardInfoRow
                              icon={MapPinIcon}
                              label="Work Location"
                              value={
                                director.employmentDetails.workPhysicalAddress
                              }
                            />
                          </div>
                        </div>
                      </CardInfo>

                      {/*Director Bank Details */}
                      <CardInfo
                        cardTitle="Banking Details"
                        cardIcon={BuildingOffice2Icon}
                        colorBG={"bg-yellow-500/20"}
                        colorText={"text-yellow-700"}
                      >
                        <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                          <p>
                            Maintains a {director.bankDetails.accountType}{" "}
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

                      {/*Director Next of Kin Details */}
                      <CardInfo
                        cardTitle="Next of kin Details"
                        cardIcon={UsersIcon}
                        colorBG={"bg-red-500/20"}
                        colorText={"text-red-700"}
                      >
                        <div className="space-y-2 flex flex-col gap-5 p-3 text-gray-700 dark:text-gray-400">
                          <p>
                            {director.nextOfKinDetails.kinTitle}{" "}
                            {director.nextOfKinDetails.kinOtherName}{" "}
                            {director.nextOfKinDetails.kinSurname}, the{" "}
                            {director.nextOfKinDetails.kinRelationship} of the
                            applicant. They works as a{" "}
                            <strong>
                              {director.nextOfKinDetails.kinOccupation}
                            </strong>{" "}
                            at{" "}
                            <strong>
                              {director.nextOfKinDetails.kinEmployer}
                            </strong>
                            .
                          </p>
                          <p>
                            Currently residing in{" "}
                            {[
                              director.nextOfKinDetails.kinHouseNo,
                              director.nextOfKinDetails.kinStreet,
                              director.nextOfKinDetails.kinResidentialArea,
                              director.nextOfKinDetails.kinProvince,
                              director.nextOfKinDetails.kinDistrict,
                              director.nextOfKinDetails.kinCountry,
                            ]
                              .filter(Boolean)
                              .join(", ")}
                          </p>

                          <div className="grid grid-cols-2 gap-4">
                            <CardInfoRow
                              icon={PhoneIcon}
                              label="Mobile"
                              value={director.nextOfKinDetails.kinMobile1}
                            />
                            <CardInfoRow
                              icon={EnvelopeIcon}
                              label="Email"
                              value={director.nextOfKinDetails.kinEmail}
                            />
                            <CardInfoRow
                              icon={WindowIcon}
                              label="NRC"
                              value={director.nextOfKinDetails.kinNrcNo}
                            />
                          </div>
                        </div>
                      </CardInfo>
                    </div>
                    {/*Director Actions */}
                    <div className="absolute -top-4 -right-4">
                      <div className="flex gap-2">
                        <Button
                          buttonIcon={EditIcon}
                          onClick={() =>
                            handleEditDirector(
                              director.uid,
                              director.personalDetails.uniqueID
                            )
                          }
                          buttonType="secondary"
                        />
                        <Button
                          buttonIcon={DeleteIcon}
                          onClick={() =>
                            handleDeleteDirector(
                              director.uid,
                              director.personalDetails.uniqueID
                            )
                          }
                          buttonType="destructive"
                        />
                      </div>
                    </div>
                  </div>
                )}
              />
            </>
          ))}
        </div>
      )}

      {directorsKycDetails.length > 0 && (
        <div className=" flex flex-col">
          <p className="font-semibold mb-2">New Director</p>
          {directorsKycDetails.map((Data, index) => (
            <div className="relative" key={`Director${index}`}>
              <Accordion
                heading={`New Director Details`}
                renderExpandedContent={() => (
                  <>
                    <AddUpdateDirectorFields
                      BorrowerData={Data}
                      handleChangeReducer={handleChangeAddDirectorField}
                      sectionRefs={sectionRefs}
                    />
                    <div className="flex justify-end gap-5 col-span-4 mt-4">
                      <Button
                        buttonName="Reset"
                        onClick={() => dispatch(resetDirector({ index }))}
                        buttonType="destructive"
                      />
                      <Button
                        buttonName="Submit"
                        onClick={handleSubmitNewDirector}
                        disabled={!companyId}
                      />
                    </div>
                  </>
                )}
              />
              <XCircleIcon
                onClick={() => dispatch(removeDirector({ index }))}
                className="h-7 w-7 absolute -right-3 -top-3 text-red-500 hover:text-red-600 hover:cursor-pointer"
                title="Delete Director"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddDirector;
