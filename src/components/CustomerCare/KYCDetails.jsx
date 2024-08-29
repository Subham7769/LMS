import React from "react";
import LoadingState from "../LoadingState/LoadingState";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector } from "react-redux";

const InfoRow = ({ label, value }) => (
  <div className="py-2 grid grid-cols-3">
    <div className="font-semibold">{label}:</div>
    <div className="col-span-2">{value || "N/A"}</div>
  </div>
);

const KYCDetails = () => {
  // Access state from Redux store
  const { personalInfo, loading, error } = useSelector((state) => state.customerCare);

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
  } = personalInfo.recentGosiData.employmentStatusInfo[0] || {};

  // Conditional rendering starts after hooks have been defined
  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ContainerTile>Error: {error}</ContainerTile>;
  }

  return (
    <ContainerTile>
      <div className="grid grid-cols-2 gap-4 text-[14px] pb-2">
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
      </div>
    </ContainerTile>
  );
};

export default KYCDetails;
