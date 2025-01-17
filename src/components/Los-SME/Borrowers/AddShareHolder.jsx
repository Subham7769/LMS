import React, { useEffect, useState } from "react";
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
  fetchAllCompanyBorrowersListByLoanOfficer,
  fetchCompanyDetails,
  setUpdateExistingShareholder,
  deleteShareholderInfo,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddUpdateShareholderFields from "./AddUpdateShareholderFields";
import { useNavigate } from "react-router-dom";
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

  function flattenToSimpleObject(nestedObject) {
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

    recurse(nestedObject);
    console.log(result);
    return result;
  }

  useEffect(() => {
    if (allCompanies.length < 1) {
      dispatch(fetchAllCompanyBorrowersListByLoanOfficer({ loanOfficer }));
    }
  }, [dispatch]);

  // console.log(isValid);

  const handleSubmitNewShareholder = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(shareHolderDetails)));
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
                heading={`${shareholder.personalDetails.title} 
                      ${shareholder.personalDetails.firstName} 
                      ${shareholder.personalDetails.surname} 
                      ${shareholder.personalDetails.otherName}`}
                renderExpandedContent={() => (
                  <div className="grid grid-cols-[80%_20%] gap-4 px-5">
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
