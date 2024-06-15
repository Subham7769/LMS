import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useBorrowerInfo from "../utils/useBorrowerInfo";
import LoadingState from "../LoadingState";

const CreditProfile = () => {
  const url = "/credit-profile";
  const url2 = "/loan-offers-calculations";
  const creditProfileData = useBorrowerInfo(url);
  const loanOfferCalData = useBorrowerInfo(url2);
  if (creditProfileData.length === 0 || loanOfferCalData.length === 0) {
    return (
      <>
        <LoadingState />
      </>
    );
  }

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
        <table className="divide-y divide-gray-300 w-full">
          <thead className="bg-white sticky top-0">
            <tr className="divide-x divide-gray-200">
              <th className="py-3.5 px-2 text-center text-gray-900">No.</th>
              <th className="py-3.5 px-2 text-center text-gray-900">
                Project Name
              </th>
              <th className="py-3.5 px-2 text-center text-gray-900">Total TCL</th>
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
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Consumer Credit Bureau liabilities"
              >
                Consumer CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :{" "}
              </div>
              <div>{simahLiabilitiesTotalMontllyInstallments.consumer}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Gross Debt Burden Ratio (Without Mortgage) Credit Bureau liabilities"
              >
                GDBR (Without MTG) CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :
              </div>
              <div>
                {simahLiabilitiesTotalMontllyInstallments.gdbrWithoutMTG}
              </div>
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Gross Debt Burden Ratio (With Mortgage) Credit Bureau liabilities"
              >
                GDBR (With MTG) CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :{" "}
              </div>
              <div>{simahLiabilitiesTotalMontllyInstallments.gdbrWithMTG}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div
                className="w-80 cursor-pointer"
                title="Total calculated existing Credit Bureau liabilities"
              >
                Total calculated existing CB liabilities{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :
              </div>
              <div>{simahLiabilitiesTotalMontllyInstallments.gdbrWithMTG}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-80">Adjustment for Disposable Income : </div>
              <div>{adjustedEMI}</div>
            </div>
          </div>
          <div className=" pr-6 py-2 flex flex-col border-r border-gray-300">
            <div className="flex gap-2 py-2">
              <div className="w-44">Credit Bureau Score : </div>
              <div>{simahScore}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Derived Credit Score : </div>
              <div>{creditScore}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Gross income : </div>
              <div>{gosiFullWage}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44">Net income : </div>
              <div>{netIncome}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-44 cursor-pointer" title="Debt Burden Ratio">
                DBR{" "}
                <InformationCircleIcon className="h-4 w-4 inline-block text-gray-500 hover:text-black" />{" "}
                :
              </div>
              <div>{eligibleDBR}</div>
            </div>
          </div>
          <div className="pr-6 py-2 flex flex-col">
            <div className="flex gap-2 py-2">
              <div className="w-52">Disposal income : </div>
              <div>{disposableIncome.toFixed(2)}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Maximum EMI amount : </div>
              <div>{eligibleEMI}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Propensity to pay : </div>
              <div>{propensityToPay.toFixed(2)}</div>
            </div>
            <div className="flex gap-2 py-2">
              <div className="w-52">Bare Minimum Expenses : </div>
              <div>{bareMinimumExpenses}</div>
            </div>
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
