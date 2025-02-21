import { CurrencyDollarIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

export const DocumentConfigStats = [
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

export const DocumentConfigHeaderList = [
  "Name",
  // "Created On",
  // "Open Loans",
  // "Total Disbursed Principal",
  // "Status",
];

export const DocumentConfigList = [
  {
    name: "Affordability 1",
    createdOn: "07/06/2021",
    openLoans: "2367",
    totalDisbursedPrincipal: "$234M",
    status: "Active",
    href: "/tcl/1",
  },
  {
    name: "Affordability 2",
    createdOn: "14/09/2022",
    openLoans: "1490",
    totalDisbursedPrincipal: "$750M",
    status: "Active",
    href: "/tcl/2",
  },
  {
    name: "Affordability 3",
    createdOn: "19/09/2022",
    openLoans: "185",
    totalDisbursedPrincipal: "$90M",
    status: "Inactive",
    href: "/tcl/3",
  },
];
