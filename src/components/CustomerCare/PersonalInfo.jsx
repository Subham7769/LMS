import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useDateExtract from "../../utils/useDateExtract";
import LoadingState from "../LoadingState/LoadingState";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { fetchBorrowerData } from "../../redux/Slices/customerCareSlice";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";

const PersonalInfo = () => {
  const { subID } = useParams();
  const dispatch = useDispatch();

  // Set the correct URL for the API endpoint
  const url = ``;

  // Access state from Redux store
  const { personalInfo, loading, error } = useSelector(
    (state) => state.customerCare
  );

  useEffect(() => {
    try {
      if (subID) {
        // Dispatch the fetchBorrowerData thunk
        dispatch(fetchBorrowerData({ subID, url }));
      }
    } catch (error) {
      console.error("Caught error in useEffect: ", error);
      // Optionally, set some state to reflect the error and trigger an alternative UI
    }
  }, [dispatch, subID]);

  // Add null or undefined checks to avoid errors before data is loaded
  const borrowerProfile = personalInfo?.borrowerProfile || {};
  const residenceDetails = borrowerProfile?.residenceDetails || {};
  const maritalDetails = borrowerProfile?.maritalDetails || {};

  const formattedDateOfBirth = useDateExtract(borrowerProfile.dateOfBirth);
  const regiDate = useDateExtract(borrowerProfile.registrationDate);

  // Subcomponents for cleaner structure
  const InfoRow = ({ label, value }) => (
    <div className="py-2 grid grid-cols-3">
      <div className="font-semibold">{label}:</div>
      <div className="col-span-2">{value || "N/A"}</div>
    </div>
  );

  const Content = () => (
    <>
      <img
        className="rounded-full w-12"
        src="https://lmscarbon.com/assets/index.png"
        alt=""
      />
      <div className="text-xl font-semibold">Borrower Id: {subID}</div>
    </>
  );

  const Content2 = () => (
    <>
      <div className="text-sm mb-2 font-semibold">Personal Details</div>
      <div className="grid grid-cols-2 gap-4 border-b border-gray-300 mb-10 text-[14px] pb-2">
        <InfoRow
          label="Full Name"
          value={`${borrowerProfile?.firstNameEn} ${borrowerProfile?.middleNameEn} ${borrowerProfile?.lastNameEn}`}
        />
        <InfoRow label="Gender" value={borrowerProfile?.gender} />
        <InfoRow label="Date of Birth" value={formattedDateOfBirth} />
        <InfoRow label="Active Id Type" value={borrowerProfile?.idType} />
        <InfoRow label="Occupation" value={borrowerProfile?.occupation} />
        <InfoRow
          label="Monthly Expenses"
          value={borrowerProfile?.totalMonthlyExpenses}
        />
        <InfoRow label="Account Creation Date" value={regiDate} />
      </div>

      <div className="text-sm mb-2 font-semibold">Family Details</div>
      <div className="grid grid-cols-2 gap-4 border-b border-gray-300 mb-10 text-[14px] pb-2">
        <InfoRow label="Marital Status" value={maritalDetails?.maritalStatus} />
        <InfoRow label="No Of Children" value={maritalDetails?.noOfChildren} />
        <InfoRow
          label="No of Domestic Workers"
          value={maritalDetails?.noOfDomesticWorkers}
        />
        <InfoRow
          label="Total Dependent"
          value={maritalDetails?.totalDependent}
        />
      </div>

      <div className="text-sm mb-2 font-semibold">Residential Details</div>
      <div className="grid grid-cols-2 gap-4 border-gray-300 text-[14px]">
        <InfoRow
          label="Address"
          value={`${residenceDetails?.buildingNumber}, ${residenceDetails?.streetName}, ${residenceDetails?.city}`}
        />
        <InfoRow label="Street Name" value={residenceDetails?.streetName} />
        <InfoRow label="Postal Code" value={residenceDetails?.postOfficeBox} />
        <InfoRow
          label="Additional Number"
          value={residenceDetails?.additionalNumbers}
        />
        <InfoRow label="Neighborhood" value={residenceDetails?.neighborhood} />
        <InfoRow label="City" value={residenceDetails?.city} />
        <InfoRow
          label="Building Number"
          value={residenceDetails?.buildingNumber}
        />
        <InfoRow label="House is Rented" value={residenceDetails?.rent} />
      </div>
    </>
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        <ContainerTile
          className="flex items-center gap-5"
          loading={loading}
          error={error}
        >
          <SectionErrorBoundary>
            <Content />
          </SectionErrorBoundary>
        </ContainerTile>
        <ContainerTile loading={loading} error={error}>
          <SectionErrorBoundary>
            <Content2 />
          </SectionErrorBoundary>
        </ContainerTile>
      </div>
    </>
  );
};

export default PersonalInfo;
