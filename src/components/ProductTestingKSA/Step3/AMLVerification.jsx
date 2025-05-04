import React, { useState, useEffect } from "react";
import Stepper from "../../Common/Stepper/Stepper";
import { useDispatch } from "react-redux";
import { useActiveTab } from "../ActiveTabContext";
import { AMLStatusCheck, getBorrowerProfile } from "../../../redux/Slices/ProductTestingKSA";
import { useSelector } from "react-redux";

//API to get Borrower Profile

// API for AML check

const AMLVerification = ({ onNext, onBack }) => {
  const { AMLUserDetails } = useSelector(state => state.productTestingKSA)

  const dispatch = useDispatch();
  const { userId } = useActiveTab();

  // Populate the data on component mount (simulate fetched data)
  useEffect(() => {
    dispatch(getBorrowerProfile({ userId }))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("AML Data:", AMLUserDetails);
    await dispatch(AMLStatusCheck({ userId }))
    onNext(); // Move to Salary Verification
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Stepper */}
      <Stepper title={"KSA Financing"} currentStep={1} steps={["AML Verification", "Salary Verification", "Credit History", "Completion"]} />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <h2 className="text-lg font-semibold mb-2">Your Personal Details</h2>
        <p className="text-sm text-gray-600 mb-6">
          Please check your personal details
        </p>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={AMLUserDetails.firstNameEn + " " + AMLUserDetails.middleNameEn + " " + AMLUserDetails.lastNameEn}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alias</label>
          <input
            type="text"
            name="alias"
            value={AMLUserDetails.alias}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={AMLUserDetails.dateOfBirth}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={AMLUserDetails.nationality}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">National ID</label>
          <input
            type="text"
            name="nationalId"
            value={AMLUserDetails.idNumber}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={
              `Building No: ${AMLUserDetails.residenceDetails?.buildingNumber || ""}, ` +
              `Street: ${AMLUserDetails.residenceDetails?.streetName || ""}, ` +
              `Neighborhood: ${AMLUserDetails.residenceDetails?.neighborhood || ""}, ` +
              `City: ${AMLUserDetails.residenceDetails?.city || ""}, ` +
              `P.O. Box: ${AMLUserDetails.residenceDetails?.postOfficeBox || ""}, ` +
              `Additional No: ${AMLUserDetails.residenceDetails?.additionalNumbers || ""}, ` +
              `Unit No: ${AMLUserDetails.residenceDetails?.unitNumber || ""}`
            }
            disabled
            rows={2}
            className="w-full mt-1 p-2 border rounded-md bg-gray-100"
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => { onBack() }}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 mt-4 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default AMLVerification;
