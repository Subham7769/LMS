import { subscriberList } from "../../config";

const KYCDetails = () => {
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
  } = subscriberList.recentGosiData.employmentStatusInfo[0];
  return (
    <div className="shadow-md rounded-xl py-4 px-5 border border-red-600">
      <div className="flex py-3">
        <div className="py-2 pr-4 flex flex-col border-r border-gray-300">
          <div className="flex gap-2 py-2">
            <div className="w-32">Full Name : </div>
            <div>{fullName}</div>
          </div>
          <div className="flex gap-2 py-2">
            <div className="w-32">Date of joining : </div>
            <div>{dateOfJoining}</div>
          </div>
          <div className="flex gap-2 py-2">
            <div className="w-32">Employer Name : </div>
            <div>{employerName}</div>
          </div>
        </div>
        <div className=" px-4 py-2  flex flex-col border-r border-gray-300">
          <div className="flex gap-2 py-2">
            <div className="w-44">Other Allowance : </div>
            <div>{otherAllowance}</div>
          </div>
          <div className="flex gap-2 py-2">
            <div className="w-44">Salary Starting Date : </div>
            <div>{salaryStartingDate}</div>
          </div>
          <div className="flex gap-2 py-2">
            <div className="w-44">Establishment Activity : </div>
            <div>{establishmentActivity}</div>
          </div>
        </div>
        <div className="px-4 py-2  flex flex-col border-r border-gray-300">
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
  );
};

export default KYCDetails;
