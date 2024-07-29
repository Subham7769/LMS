import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState/LoadingState";

const DataWithIcon = ({ value, name }) => {
  return (
    <div className="flex gap-2 py-2 text-sm">
      <div
        className="w-60 2xl:w-80 cursor-pointer"
        title="Consumer Credit Bureau liabilities"
      >
        {name}{" "}
        <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
        :{" "}
      </div>
      <div>{value}</div>
    </div>
  );
};

const DataWithoutIcon = ({ value, name }) => {
  return (
    <div className="flex gap-2 py-2 text-sm">
      <div className="w-60 2xl:w-80">{name} : </div>
      <div>{value}</div>
    </div>
  );
};

const CreditProfile = () => {
  const [creditProfileData, loanOfferCalData] = [
    useBorrowerInfo("/credit-profile"),
    useBorrowerInfo("/loan-offers-calculations"),
  ];

  if (creditProfileData.length === 0 || loanOfferCalData.length === 0)
    return <LoadingState />;

  const {
    simahLiabilitiesTotalMontllyInstallments,
    adjustedEMI,
    creditScore,
    simahScore,
    gosiFullWage,
    netIncome,
    eligibleDBR,
    disposableIncome,
    eligibleEMI,
    propensityToPay,
    bareMinimumExpenses,
  } = loanOfferCalData;

  return (
    <>
      <div className="rounded-xl p-4 border border-red-600 w-fit overflow-auto max-h-[260px] pr-5">
        <table className="divide-y divide-gray-300 w-full text-sm">
          <thead className="bg-white sticky top-0">
            <tr className="divide-x divide-gray-200">
              <th className="py-3.5 px-2 text-center text-gray-900">No.</th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Project Name
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Total TCL
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">Net TCL</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {creditProfileData.map((cp, index) => (
              <tr key={index} className="divide-x divide-gray-200 text-center">
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {index + 1}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {cp.projectName}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {cp.totalTCL ? cp.totalTCL : "N/A"}
                  </div>
                </td>
                <td className="whitespace-nowrap py-4 px-2 text-gray-500">
                  <div className="w-[100px] mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                    {cp.netTCL}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="rounded-xl pt-5 pb-7 px-5 border border-red-600 mt-8 relative">
        <div className="flex gap-6 py-3">
          <div className="py-2 pr-6 flex flex-col border-r border-gray-300">
            <DataWithIcon
              name="Consumer CB liabilities"
              value={simahLiabilitiesTotalMontllyInstallments.consumer}
            />
            <DataWithIcon
              name="GDBR (Without MTG) CB liabilities"
              value={simahLiabilitiesTotalMontllyInstallments.gdbrWithoutMTG}
            />
            <DataWithIcon
              name="GDBR (With MTG) CB liabilities"
              value={simahLiabilitiesTotalMontllyInstallments.gdbrWithMTG}
            />
            <DataWithIcon
              name="Total calculated existing CB liabilities"
              value={simahLiabilitiesTotalMontllyInstallments.gdbrWithMTG}
            />
            <DataWithoutIcon
              name="Adjustment for Disposable Income"
              value={adjustedEMI}
            />
          </div>
          <div className=" pr-6 py-2 flex flex-col border-r border-gray-300">
            <DataWithoutIcon name="Credit Bureau Score" value={simahScore} />
            <DataWithoutIcon name="Derived Credit Score" value={creditScore} />
            <DataWithoutIcon name="Gross income" value={gosiFullWage} />
            <DataWithoutIcon name="Net income" value={netIncome} />
            <DataWithIcon name="DBR" value={eligibleDBR} />
          </div>
          <div className="pr-6 py-2 flex flex-col">
            <DataWithoutIcon
              name="Disposal income"
              value={disposableIncome.toFixed(2)}
            />
            <DataWithoutIcon name="Maximum EMI amount" value={eligibleEMI} />
            <DataWithoutIcon
              name="Propensity to pay"
              value={propensityToPay.toFixed(2)}
            />
            <DataWithoutIcon
              name="Bare Minimum Expenses"
              value={bareMinimumExpenses}
            />
          </div>
        </div>
        <div className="absolute text-xs text-gray-400 bottom-1 left-2">
          *CB - Credit Bureau, *GDBR - Gross Debt Burden Ratio, *MTG - Mortgage
        </div>
      </div>
    </>
  );
};

export default CreditProfile;
