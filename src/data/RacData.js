import {
    ClipboardDocumentListIcon,
    CurrencyRupeeIcon,
    UsersIcon,
  } from "@heroicons/react/24/outline";
  
export const RacStats = [
    {
        id: 1,
        name: "Avg. Approval Daily",
        stat: "723",
        icon: UsersIcon,
        change: "122",
        changeType: "increase",
      },
      {
        id: 2,
        name: "Active RAC",
        stat: "2 / 3",
        icon: CurrencyRupeeIcon,
        change: "5.4%",
        changeType: "increase",
      },
      {
        id: 3,
        name: "Avg. Rejection / Day",
        stat: "24.57",
        icon: ClipboardDocumentListIcon,
        change: "3.2%",
        changeType: "decrease",
      },
  ];
  
  export const HeaderList = [
    "Name",
    "Created On",
    "Approved",
    "Total Processed",
    "Status",
  ];
  
export const ProductList = [
  {
    name: "Cash Product RAC",
    createdOn: "07/06/2021",
    approved: "40%",
    totalProcessed: "2367",
    status: "Active",
    href: "/rac/cash-loan/rmc",
  },
  {
    name: "BNPL Product RAC",
    createdOn: "14/09/2022",
    approved: "20%",
    totalProcessed: "750",
    status: "Active",
    href: "/rac/cash-loan/rmc",
  },
  {
    name: "Overdraft Product RAC",
    createdOn: "19/09/2022",
    approved: "85%",
    totalProcessed: "901",
    status: "Inactive",
    href: "/rac/cash-loan/rmc",
  },
];
