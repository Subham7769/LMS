import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import HoverButton from "../../Common/HoverButton/HoverButton";
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
  setUpdateDirector,
  setUpdateExistingDirector,
  deleteDirectorInfo,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "../../Los-SME/Borrowers/AddUpdateDirectorFields";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
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

  useEffect(() => {
      dispatch(fetchAllCompanyBorrowers());
  }, [dispatch]);



  const handleSubmitNewDirector = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(directorsKycDetails)));
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
        dispatch(fetchCompanyDetails({ companyId: uid })).unwrap()
        .then(() => {
          
        })
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
          {directorsKycDetails.length < 1 && (
            <HoverButton
              icon={PlusIcon}
              text="Add Director"
              onClick={() => dispatch(addDirector({ loanOfficer }))}
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
                  <div className="grid grid-cols-[80%_20%] gap-4 px-5">
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
                            <strong>Age:</strong> {director.personalDetails.age}
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
                            <strong>Employee No.:</strong>{" "}
                            {director.employmentDetails.employeeNo}
                          </p>
                          <p>
                            <strong>Work Type:</strong>{" "}
                            {director.employmentDetails.workType}
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
                            <strong>Work Phone Number:</strong>{" "}
                            {director.employmentDetails.workPhoneNumber}
                          </p>
                          <p>
                            <strong>Employment Location:</strong>{" "}
                            {director.employmentDetails.employmentLocation}
                          </p>
                          <p>
                            <strong>Employment District:</strong>{" "}
                            {director.employmentDetails.employmentDistrict}
                          </p>
                          <p>
                            <strong>Work Physical Address:</strong>{" "}
                            {director.employmentDetails.workPhysicalAddress}
                          </p>
                        </div>
                      </div>

                      {/*Director Bank Details */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          Bank Details
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
                            <strong>Account No.:</strong>{" "}
                            {director.bankDetails.accountNo}
                          </p>
                          <p>
                            <strong>Account Type:</strong>{" "}
                            {director.bankDetails.accountType}
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

                      {/*Director Next of Kin Details */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          Next of Kin Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <p>
                            <strong>Name:</strong>{" "}
                            {director.nextOfKinDetails.kinTitle}{" "}
                            {director.nextOfKinDetails.kinSurname}{" "}
                            {director.nextOfKinDetails.kinOtherName}
                          </p>
                          <p>
                            <strong>NRC No.:</strong>{" "}
                            {director.nextOfKinDetails.kinNrcNo}
                          </p>
                          <p>
                            <strong>Gender:</strong>{" "}
                            {director.nextOfKinDetails.kinGender}
                          </p>
                          <p>
                            <strong>Mobile1:</strong>{" "}
                            {director.nextOfKinDetails.kinMobile1}
                          </p>
                          <p>
                            <strong>Mobile2:</strong>{" "}
                            {director.nextOfKinDetails.kinMobile2}
                          </p>
                          <p>
                            <strong>Email:</strong>{" "}
                            {director.nextOfKinDetails.kinEmail}
                          </p>
                          <p>
                            <strong>Employer:</strong>{" "}
                            {director.nextOfKinDetails.kinEmployer}
                          </p>
                          <p>
                            <strong>Occupation:</strong>{" "}
                            {director.nextOfKinDetails.kinOccupation}
                          </p>
                          <p>
                            <strong>Location:</strong>{" "}
                            {director.nextOfKinDetails.kinLocation}
                          </p>
                          <p>
                            <strong>Work Phone Number:</strong>{" "}
                            {director.nextOfKinDetails.kinWorkPhoneNumber}
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
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
                        </div>
                      </div>

                      {/*Director Other Details */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-gray-800">
                          Other Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          <p>
                            <strong>Customer Photo Id:</strong>{" "}
                            {director.otherDetails.customerPhotoId}
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
                            director.uid,
                            director.personalDetails.uniqueID
                          )
                        }
                        className={"text-center"}
                        rectangle={true}
                      />
                      <Button
                        buttonName={"Delete"}
                        onClick={() =>
                          handleDeleteDirector(
                            director.uid,
                            director.personalDetails.uniqueID
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
                    />
                    <div className="flex justify-end gap-5 col-span-4 mx-10 mt-4">
                      <Button
                        buttonName="Reset"
                        onClick={() => dispatch(resetDirector({ index }))}
                        rectangle={true}
                        className={"bg-red-500 hover:bg-red-600"}
                      />
                      <Button
                        buttonName="Submit"
                        onClick={handleSubmitNewDirector}
                        rectangle={true}
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
