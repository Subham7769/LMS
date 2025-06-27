import React, { useEffect, useRef } from "react";
import Button from "../../Common/Button/Button";
import HoverButton from "../../Common/HoverButton/HoverButton";
import Accordion from "../../Common/Accordion/Accordion";
import {
  setCompanyId,
  handleChangeAddShareholderField,
  addShareholder,
  removeShareholder,
  resetShareholder,
  addShareholderInfo,
  fetchAllCompanyBorrowers,
  fetchCompanyDetails,
  setUpdateExistingShareholder,
  deleteShareholderInfo,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { XCircleIcon } from "@heroicons/react/20/solid";
import {
  ArchiveBoxIcon,
  CalendarIcon,
  EnvelopeIcon,
  HomeIcon,
  MapPinIcon,
  PhoneIcon,
  PlusIcon,
  UserCircleIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import AddUpdateShareholderFields from "./AddUpdateShareholderFields";
import { useNavigate } from "react-router-dom";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import CardInfoRow from "../../Common/CardInfoRow/CardInfoRow";
import CardInfo from "../../Common/CardInfo/CardInfo";
import { fieldToSectionMapPersonalBorrowers } from "../../../data/fieldSectionMapData";
import store from "../../../redux/store";

const AddShareHolder = () => {
  const isValid = useSelector((state) => state.validation.isValid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    companyId,
    shareHolderDetails,
    existingShareholderDetails,
    allCompanies,
    error,
    loading,
  } = useSelector((state) => state.smeBorrowers);
  const loanOfficer = localStorage.getItem("username");
  const sectionRefs = useRef({});

  useEffect(() => {
    dispatch(fetchAllCompanyBorrowers());
  }, [dispatch]);

  // console.log(isValid);

  const handleSubmitNewShareholder = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(shareHolderDetails)));
    const state = store.getState();
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
      dispatch(addShareholderInfo({ shareHolderDetails, companyId }))
        .unwrap()
        .then(() => {
          // After successful addition, fetch the updated company details
          dispatch(fetchCompanyDetails({ companyId }));
          dispatch(removeShareholder({ index: 0 }));
        });
    }
  };

  const changeCompany = (e) => {
    dispatch(setCompanyId({ companyId: e.target.value }));
    dispatch(fetchCompanyDetails({ companyId: e.target.value }));
  };

  const handleEditShareholder = (uid, uniqueID) => {
    dispatch(setUpdateExistingShareholder({ uid, uniqueID }));
    navigate(
      `/loan/loan-origination-system/sme/borrowers/update-shareholder/${uid}`
    );
  };

  const handleDeleteShareholder = (uid, uniqueID) => {
    dispatch(deleteShareholderInfo({ companyId: uid, shareholderId: uniqueID }))
      .unwrap()
      .then(() => {
        dispatch(fetchCompanyDetails({ companyId: uid }));
      });
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-5 items-center">
        <InputSelect
          labelName={"Company"}
          inputName={"companyId"}
          inputOptions={allCompanies}
          inputValue={companyId}
          onChange={changeCompany}
          disabled={false}
        />
        <div></div>
        <div></div>
        <div className="flex justify-end gap-2 h-[90%]">
          {shareHolderDetails.length < 1 && (
            <HoverButton
              icon={PlusIcon}
              text="Add Shareholder"
              onClick={() => dispatch(addShareholder({ loanOfficer }))}
            />
          )}
        </div>
      </div>

      {existingShareholderDetails.length > 0 && companyId && (
        <div className=" flex flex-col mb-6">
          <p className="font-semibold mb-2">Existing Shareholders</p>
          {existingShareholderDetails.map((shareholder, index) => (
            <>
              <Accordion
                key={index}
                heading={`${shareholder.personalDetails.title} 
                      ${shareholder.personalDetails.firstName} 
                      ${shareholder.personalDetails.surname} 
                      ${shareholder.personalDetails.otherName}`}
                renderExpandedContent={() => (
                  <div className="grid grid-cols-[80%_20%] gap-4 px-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs break-words">
                      {/* Shareholder Personal Details */}
                      <div className="shadow-md p-3 rounded-md bg-blue-tertiary">
                        <div className="mb-3 text-blue-primary text-xl font-semibold flex gap-2 items-center">
                          <div
                            onClick={(e) =>
                              handleViewPhoto(
                                e,
                                shareholder.personalDetails.customerPhotoId
                              )
                            }
                            className={`${
                              shareholder.personalDetails.customerPhotoId &&
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
                          {/* {shareholder.personalDetails.customerPhotoId && (
                            <p
                              className="text-[9px] text-gray-600 -mb-2 cursor-pointer underline"
                              onClick={(e) =>
                                handleViewPhoto(e, shareholder.personalDetails.customerPhotoId)
                              }
                            >
                              View Client Photo
                            </p>
                          )} */}
                        </div>
                        <div className="space-y-2 flex flex-col gap-5 p-3">
                          <p>
                            {[
                              shareholder.personalDetails.title,
                              shareholder.personalDetails.firstName,
                              shareholder.personalDetails.surname,
                              shareholder.personalDetails.otherName,
                            ]
                              .filter(Boolean)
                              .join(" ")}{" "}
                            is a {shareholder.personalDetails.age}-year-old{" "}
                            {shareholder.personalDetails.nationality} national.
                            They are {shareholder.personalDetails.maritalStatus}{" "}
                            and identify as {shareholder.personalDetails.gender}
                            .
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <CardInfoRow
                              icon={CalendarIcon}
                              label="Born"
                              value={shareholder.personalDetails.dateOfBirth}
                            />
                            <CardInfoRow
                              icon={MapPinIcon}
                              label="Place"
                              value={shareholder.personalDetails.placeOfBirth}
                            />
                            <CardInfoRow
                              icon={WindowIcon}
                              label={shareholder.personalDetails.uniqueIDType}
                              value={shareholder.personalDetails.uniqueID}
                            />
                          </div>
                        </div>
                      </div>

                      {/*Shareholder Contact Details */}
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
                              icon={ArchiveBoxIcon}
                              label="Post Box"
                              value={shareholder.contactDetails.postBox}
                            />
                          </div>
                        </div>
                      </CardInfo>
                    </div>
                    {/*Shareholder Actions */}
                    <div className="flex justify-start gap-5 flex-col mt-4">
                      <Button
                        buttonName={"Edit"}
                        onClick={() =>
                          handleEditShareholder(
                            shareholder.uid,
                            shareholder.personalDetails.uniqueID
                          )
                        }
                        className={"text-center"}
                        rectangle={true}
                      />
                      <Button
                        buttonName={"Delete"}
                        onClick={() =>
                          handleDeleteShareholder(
                            shareholder.uid,
                            shareholder.personalDetails.uniqueID
                          )
                        }
                        className={"text-center bg-red-500 hover:bg-red-600"}
                        rectangle={true}
                      />
                    </div>
                  </div>
                )}
              />
            </>
          ))}
        </div>
      )}

      {shareHolderDetails.length > 0 && (
        <div className=" flex flex-col">
          <p className="font-semibold mb-2">New Shareholder</p>
          {shareHolderDetails.map((Data, index) => (
            <div className="relative" key={`Shareholder${index}`}>
              <Accordion
                heading={`New Shareholder Details`}
                renderExpandedContent={() => (
                  <>
                    <AddUpdateShareholderFields
                      BorrowerData={Data}
                      handleChangeReducer={handleChangeAddShareholderField}
                      sectionRefs={sectionRefs}
                    />
                    <div className="flex justify-end gap-5 col-span-4 mx-10 mt-4">
                      <Button
                        buttonName="Reset"
                        onClick={() => dispatch(resetShareholder({ index }))}
                        rectangle={true}
                        className={"bg-red-500 hover:bg-red-600"}
                      />
                      <Button
                        buttonName="Submit"
                        onClick={handleSubmitNewShareholder}
                        rectangle={true}
                        disabled={!companyId}
                      />
                    </div>
                  </>
                )}
              />
              <XCircleIcon
                onClick={() => dispatch(removeShareholder({ index }))}
                className="h-7 w-7 absolute -right-3 -top-3 text-red-500 hover:text-red-600 hover:cursor-pointer"
                title="Delete Shareholder"
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AddShareHolder;
