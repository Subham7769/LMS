import { BriefcaseIcon } from "@heroicons/react/24/outline";
import { NoSymbolIcon, ShieldExclamationIcon } from "@heroicons/react/20/solid";

export const BlockedEmployerStats = [
  {
    id: 1,
    name: "Total Blocked Employers",
    stat: "1,250",
    icon: NoSymbolIcon,
    change: "5%",
    changeType: "increase",
  },
  {
    id: 2,
    name: "New Blocked This Month",
    stat: "50",
    icon: BriefcaseIcon,
    change: "10",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Avg. Blocking Duration",
    stat: "12 months",
    icon: ShieldExclamationIcon,
    change: "0.5 months",
    changeType: "decrease",
  },
];

export const BlockedEmployerHeaderList = [
  "Employer ID",
  "Blocked On",
  "Reason for Blocking",
  "Total Blocked Duration",
  "Status",
];

export const BlockedEmployerList = [
  {
    employerId: "Employer A",
    blockedOn: "01/02/2023",
    reasonForBlocking: "Fraudulent Activities",
    totalBlockedDuration: "8 months",
    status: "Active",
    href: "/employers/1",
  },
  {
    employerId: "Employer B",
    blockedOn: "12/04/2023",
    reasonForBlocking: "Non-compliance",
    totalBlockedDuration: "5 months",
    status: "Active",
    href: "/employers/2",
  },
  {
    employerId: "Employer C",
    blockedOn: "25/07/2023",
    reasonForBlocking: "Repeated Offenses",
    totalBlockedDuration: "10 months",
    status: "Inactive",
    href: "/employers/3",
  },
];

export const BlockedEmployerViewListData = [
  {
    name: "High-Risk Employers",
    minDuration: "3 months",
    avgDuration: "6 months",
    maxDuration: "12 months",
    totalBlocked: "150",
    lastUpdated: "01 Feb 2024",
    totalEntries: 150,
  },
  {
    name: "Medium-Risk Employers",
    minDuration: "2 months",
    avgDuration: "4 months",
    maxDuration: "8 months",
    totalBlocked: "200",
    lastUpdated: "12 Apr 2024",
    totalEntries: 200,
  },
  {
    name: "Low-Risk Employers",
    minDuration: "1 month",
    avgDuration: "3 months",
    maxDuration: "6 months",
    totalBlocked: "300",
    lastUpdated: "25 Jul 2024",
    totalEntries: 300,
  },
];

export const BlockedEmployerViewListHeaderList = [
  "Category",
  "Min Blocked Duration",
  "Avg Blocked Duration",
  "Max Blocked Duration",
  "Total Blocked",
  "Last Updated",
  "Total Entries",
  "Actions",
];
