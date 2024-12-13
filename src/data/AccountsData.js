import {
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const AccountsStats = [
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
    name: "Active Borrowers",
    stat: "58,167",
    icon: CurrencyRupeeIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Inactive Borrowers",
    stat: "13,730",
    icon: ClipboardDocumentListIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];
