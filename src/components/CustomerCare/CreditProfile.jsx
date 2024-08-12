import { InformationCircleIcon } from "@heroicons/react/24/outline";
import useBorrowerInfo from "../../utils/useBorrowerInfo";
import LoadingState from "../LoadingState/LoadingState";
import ListTable from "../Common/ListTable/ListTable";
import ContainerTile from "../Common/ContainerTile/ContainerTile";

const DataWithIcon = ({ value, name }) => {
  return (
    <div className="flex gap-2 py-2 text-sm items-center">
      <div
        className="w-60 2xl:w-80 cursor-pointer flex items-center"
        title={name}
      >
        {name}
        <InformationCircleIcon className="h-4 w-4 ml-2 text-gray-500 hover:text-black" />
        :
      </div>
      <div>{value}</div>
    </div>
  );
};

const DataWithoutIcon = ({ value, name }) => {
  return (
    <div className="flex gap-2 py-2 text-sm items-center">
      <div className="w-60 2xl:w-80">{name} :</div>
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
    <div className="flex flex-col gap-5">
      <ListTable
        ListName="Credit Profile Data"
        ListHeader={["No.", "Product Name", "Total TCL", "Net TCL"]}
        ListItem={creditProfileData.map((cp, index) => ({
          no: index + 1,
          projectName: cp.loanProductName,
          totalTCL: cp.totalTCL ? cp.totalTCL : "N/A",
          netTCL: cp.netTCL,
        }))}
        Divider={true}
      />
      <ContainerTile>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
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
          <div className="pr-6 py-2 flex flex-col border-r border-gray-300">
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
      </ContainerTile>
    </div>
  );
};

export default CreditProfile;
