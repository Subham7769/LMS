import React from "react";
import LoadingState from "../LoadingState/LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

const KYCDetailItem = ({ label, value }) => (
  <div className="flex gap-2 py-2 text-sm">
    <div className="w-36 xl:w-48">{label} :</div>
    <div className="w-44 xl:w-28">{value}</div>
  </div>
);

const KYCDetails = () => {
  const url = "";
  const kycInfo = useBorrowerInfo(url);

  if (kycInfo.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

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
  } = kycInfo.recentGosiData.employmentStatusInfo[0] || {};

  return (
    <div className="shadow-md rounded-xl py-4 px-5 border border-red-600">
      <div className="grid grid-cols-2 xl:grid-cols-4 py-3">
        <div className="pl-4 xl:pl-0 py-2 flex flex-col border-r border-gray-300">
          <KYCDetailItem label="Full Name" value={fullName} />
          <KYCDetailItem label="Date of Joining" value={dateOfJoining} />
          <KYCDetailItem label="Employer Name" value={employerName} />
        </div>
        <div className="pl-4 py-2 flex flex-col border-r border-gray-300">
          <KYCDetailItem label="Other Allowance" value={otherAllowance} />
          <KYCDetailItem
            label="Salary Starting Date"
            value={salaryStartingDate}
          />
          <KYCDetailItem
            label="Establishment Activity"
            value={establishmentActivity}
          />
        </div>
        <div className="pl-4 py-2 flex flex-col border-r border-gray-300">
          <KYCDetailItem label="Housing Allowance" value={housingAllowance} />
          <KYCDetailItem label="Employment Status" value={employmentStatus} />
        </div>
        <div className="pl-4 py-2 flex flex-col">
          <KYCDetailItem label="Basic Wage" value={basicWage} />
          <KYCDetailItem label="Working Months" value={workingMonths} />
        </div>
      </div>
    </div>
  );
};

export default KYCDetails;
