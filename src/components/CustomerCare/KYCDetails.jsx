import React, { useEffect } from "react";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector } from "react-redux";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";
import { useParams } from "react-router-dom";
import { fetchBorrowerData } from "../../redux/Slices/customerCareSlice";
import { useDispatch } from "react-redux";

const InfoRow = ({ label, value }) => (
  <div className="py-2 grid grid-cols-3">
    <div className="font-semibold">{label}:</div>
    <div className="col-span-2">{value || "N/A"}</div>
  </div>
);

const KYCDetails = () => {
  // Access state from Redux store
  const { personalInfo, loading, error } = useSelector((state) => state.customerCare);
  const { subID } = useParams();
  const dispatch = useDispatch();
  
  // Set the correct URL for the API endpoint
  const url = ``;

  useEffect(() => {
    if (!personalInfo.recentGosiData) {
      // Dispatch the fetchBorrowerData thunk
      dispatch(fetchBorrowerData({ subID, url }));
    }
  }, [dispatch,subID])

  const {
    fullName,
    basicWage,
    housingAllowance,
    otherAllowance,
    employerName,
    dateOfJoining,
    workingMonths,
    employmentStatus,
    salaryStartingDate,
    establishmentActivity,
  } = personalInfo?.recentGosiData?.employmentStatusInfo?.[0] || {};
  

  const Content = () => (
    <>
      <InfoRow label="Full Name" value={fullName} />
      <InfoRow label="Date of Joining" value={dateOfJoining} />
      <InfoRow label="Employer Name" value={employerName} />
      <InfoRow label="Other Allowance" value={otherAllowance} />
      <InfoRow label="Salary Starting Date" value={salaryStartingDate} />
      <InfoRow label="Establishment Activity" value={establishmentActivity} />
      <InfoRow label="Housing Allowance" value={housingAllowance} />
      <InfoRow label="Employment Status" value={employmentStatus} />
      <InfoRow label="Basic Wage" value={basicWage} />
      <InfoRow label="Working Months" value={workingMonths} />
    </>
  );

  return (
    <ContainerTile
    loading={loading}
    >
      <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
        <SectionErrorBoundary>
          <Content />
        </SectionErrorBoundary>
      </div>
    </ContainerTile>
  );
};

export default KYCDetails;
