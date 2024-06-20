import LoadingState from "../LoadingState";
import useBorrowerInfo from "../../utils/useBorrowerInfo";

const KYCDetails = () => {
  const url = "";
  const kycInfo = useBorrowerInfo(url);
  console.log(kycInfo);
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
  } = kycInfo?.recentGosiData?.employmentStatusInfo[0];
  return (
    <>
      <div className="shadow-md rounded-xl py-4 px-5 border border-red-600">
        <div className="flex py-3">
          <div className="py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-36">Full Name : </div>
              <div className="w-44">{fullName}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-36">Date of joining : </div>
              <div className="w-44">{dateOfJoining}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-36">Employer Name : </div>
              <div className="w-44">{employerName}</div>
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-48">Other Allowance : </div>
              <div className="w-28">{otherAllowance}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-48">Salary Starting Date : </div>
              <div className="w-28">{salaryStartingDate}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-48">Establishment Activity : </div>
              <div className="w-28">{establishmentActivity}</div>
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-40">Housing Allowance : </div>
              <div>{housingAllowance}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-40">Employment Status : </div>
              <div>{employmentStatus}</div>
            </div>
          </div>
          <div className="px-4 py-2 flex flex-col">
            <div className="flex gap-2 py-2">
              <div className="w-36">Basic Wage : </div>
              <div>{basicWage}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-36">Working Months : </div>
              <div>{workingMonths}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KYCDetails;
