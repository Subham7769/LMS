import { CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

export const DebtBurdenStats = [
  {
    id: 1,
    name: "Total Debt Amount",
    stat: "$500.5M",
    icon: CurrencyDollarIcon,
    change: "2.5%",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Active Debt Cases",
    stat: "25,678",
    icon: UserGroupIcon,
    change: "320",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Debt Duration",
    stat: "60 months",
    icon: ArrowDownCircleIcon,
    change: "1.2 months",
    changeType: "decrease",
  },
];

export const HeaderList = [
  "Case ID",
  "Opened On",
  "Debt Amount",
  "Outstanding Amount",
  "Status",
];

export const DebtBurdenList = [
  {
    caseId: "Debt Plan A",
    openedOn: "01/02/2023",
    debtAmount: "$100M",
    outstandingAmount: "$50M",
    status: "Active",
    href: "/debt/1",
  },
  {
    caseId: "Debt Plan B",
    openedOn: "12/04/2023",
    debtAmount: "$150M",
    outstandingAmount: "$70M",
    status: "Active",
    href: "/debt/2",
  },
  {
    caseId: "Debt Plan C",
    openedOn: "25/07/2023",
    debtAmount: "$80M",
    outstandingAmount: "$30M",
    status: "Inactive",
    href: "/debt/3",
  },
];

export const DebtViewListData = [
  {
    name: "Personal Debt - Plan A",
    minDebt: "$10K",
    avgDebt: "$20K",
    maxDebt: "$30K",
    totalCases: "50",
    lastUpdated: "01 Feb 2024",
    totalEntries: 50,
  },
  {
    name: "Personal Debt - Plan B",
    minDebt: "$40K",
    avgDebt: "$50K",
    maxDebt: "$60K",
    totalCases: "70",
    lastUpdated: "12 Apr 2024",
    totalEntries: 70,
  },
  {
    name: "Personal Debt - Plan C",
    minDebt: "$70K",
    avgDebt: "$80K",
    maxDebt: "$90K",
    totalCases: "30",
    lastUpdated: "25 Jul 2024",
    totalEntries: 30,
  },
];

export const DebtViewListHeaderList = [
  "Debt Plan Name",
  "Min Debt Amount",
  "Avg Debt Amount",
  "Max Debt Amount",
  "Total Cases",
  "Last Updated",
  "Total Entries",
  "Actions",
];
