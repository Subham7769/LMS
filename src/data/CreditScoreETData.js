import {
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const CreditScoreETStats = [
  {
    id: 1,
    name: "Total Borrowers",
    stat: "71,897",
    icon: UsersIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Lending / Day",
    stat: "$58.16M",
    icon: CurrencyRupeeIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Loans Closed / Day",
    stat: "24.57",
    icon: ClipboardDocumentListIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

export const HeaderList = [
  "Name",
  // "Created On",
  // "Open Loans",
  // "Total Disbursed Principal",
  // "Status",
];

export const CreditScoreETList = [
  {
    name: "Cash Temp",
    createdOn: "07/06/2021",
    openLoans: "2367",
    totalDisbursedPrincipal: "$234M",
    status: "Active",
    href: "/credit-score/25253d57-f269-4c23-b213-9cda4ffe07ff",
  },
  {
    name: "BNPL",
    createdOn: "14/09/2022",
    openLoans: "1490",
    totalDisbursedPrincipal: "$750M",
    status: "Active",
  },
  {
    name: "Overdraft",
    createdOn: "19/09/2022",
    openLoans: "185",
    totalDisbursedPrincipal: "$90M",
    status: "Inactive",
  },
];
