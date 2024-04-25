import { creditProfileList } from "../../config";
import { loanOfferCal } from "../../config";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

const CreditProfile = () => {
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
  } = loanOfferCal;
  return (
    <>
      <div className="rounded-xl pt-5 px-5 border border-red-600 w-fit">
        {creditProfileList.map((cp) => (
          <div key={cp.netTCL}>
            <div className="flex gap-10 mb-5 border-b border-gray-300 pb-4">
              <div className="flex gap-5 border-r border-gray-300 pr-10">
                <div>Project Name : </div>
                <div>{cp.projectName}</div>
              </div>
              <div className="flex gap-5">
                <div>Net TCL : </div>
                <div>{cp.netTCL}</div>
              </div>
            </div>
          </div>
        ))}
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
