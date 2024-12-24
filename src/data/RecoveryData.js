import { CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

export const RecoveryStats = [
  {
    id: 1,
    name: "Total Recovered Amount",
    stat: "$150.3M",
    icon: CurrencyDollarIcon,
    change: "3.8%",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Active Recovery Cases",
    stat: "12,345",
    icon: UserGroupIcon,
    change: "150",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Recovery Time",
    stat: "45 days",
    icon: ArrowDownCircleIcon,
    change: "2.1 days",
    changeType: "decrease",
  },
];

export const RecoveryHeaderList = [
  "Case ID",
  "Opened On",
  "Recovered Amount",
  "Outstanding Amount",
  "Status",
];

export const RecoveryList = [
  {
    caseId: "Recovery Plan A",
    openedOn: "10/01/2022",
    recoveredAmount: "$50M",
    outstandingAmount: "$20M",
    status: "Active",
    href: "/recovery/1",
  },
  {
    caseId: "Recovery Plan B",
    openedOn: "15/03/2022",
    recoveredAmount: "$70M",
    outstandingAmount: "$30M",
    status: "Active",
    href: "/recovery/2",
  },
  {
    caseId: "Recovery Plan C",
    openedOn: "22/06/2022",
    recoveredAmount: "$30M",
    outstandingAmount: "$10M",
    status: "Inactive",
    href: "/recovery/3",
  },
];

export const RecoveryViewListData = [
  {
    name: "Loan Recovery - Plan A",
    minRecovery: "$100K",
    avgRecovery: "$200K",
    maxRecovery: "$300K",
    totalCases: "10",
    lastUpdated: "10 Jun 2023",
    totalEntries: 10,
  },
  {
    name: "Loan Recovery - Plan B",
    minRecovery: "$500K",
    avgRecovery: "$600K",
    maxRecovery: "$700K",
    totalCases: "20",
    lastUpdated: "15 Jul 2023",
    totalEntries: 20,
  },
  {
    name: "Loan Recovery - Plan C",
    minRecovery: "$800K",
    avgRecovery: "$900K",
    maxRecovery: "$1M",
    totalCases: "30",
    lastUpdated: "20 Aug 2023",
    totalEntries: 30,
  },
];

export const RecoveryViewListHeaderList = [
  "Recovery Plan Name",
  "Min Recovery Amount",
  "Avg Recovery Amount",
  "Max Recovery Amount",
  "Total Cases",
  "Last Updated",
  "Total Entries",
  "Actions",
];
