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
    "% Approved",
    "Total Processed",
    "Status",
  ];
  
  export const ProductList = [
    {
        name: "Cash Product RAC",
        created: "07/06/2021",
        approved: "40%",
        processed: "2367",
        status: "Active",
        href: "/rac/cash-loan/rmc",
      },
      {
        name: "BNPL Product RAC",
        created: "14/09/2022",
        approved: "20%",
        processed: "750",
        status: "Active",
        href: "/rac/cash-loan/rmc",
      },
      {
        name: "Overdraft Product RAC",
        created: "19/09/2022",
        approved: "85%",
        processed: "901",
        status: "Inactive",
        href: "/rac/cash-loan/rmc",
      },
  ];