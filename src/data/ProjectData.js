import {
    ClipboardDocumentListIcon,
    CurrencyRupeeIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  
export const ProjectStats = [
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
  "Created On",
  "Open Loans",
  "Total Disbursed Principal",
  "Status",
];

export const ProductList = [
    {
        name: "Cash Loan",
        created: "07/06/2021",
        openLoans: "2367",
        disbursedPrincipal: "$234M",
        status: "Active",
        href: "/product/cash-loan/loan-product-config",
      },
      {
        name: "BNPL",
        created: "14/09/2022",
        openLoans: "1490",
        disbursedPrincipal: "$750M",
        status: "Active",
      },
      {
        name: "Overdraft",
        created: "19/09/2022",
        openLoans: "185",
        disbursedPrincipal: "$90M",
        status: "Inactive",
      },
];
