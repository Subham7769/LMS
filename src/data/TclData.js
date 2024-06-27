import {
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const TclStats = [
  {
    id: 1,
    name: "Total Borrowers in All groups",
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
    name: "TCL 1",
    created: "07/06/2021",
    openLoans: "2367",
    disbursedPrincipal: "$234M",
    status: "Active",
    href: "/tcl/1",
  },
  {
    name: "TCL 2",
    created: "14/09/2022",
    openLoans: "1490",
    disbursedPrincipal: "$750M",
    status: "Active",
    href: "/tcl/2",
  },
  {
    name: "TCL 3",
    created: "19/09/2022",
    openLoans: "185",
    disbursedPrincipal: "$90M",
    status: "Inactive",
    href: "/tcl/3",
  },
];

export const TclViewListData = [
  {
    name: "Cash Loan TCL",
    minTCL: "100",
    avgTCL: "150",
    maxTCL: "200",
    totalUser: "10",
    uploadedDate: "1 Aug 2023",
    totalRows: 10,
  },
  {
    name: "BNPL TCL",
    minTCL: "300",
    avgTCL: "350",
    maxTCL: "400",
    totalUser: "20",
    uploadedDate: "1 Sept 2023",
    totalRows: 20,
  },
  {
    name: "Overdraft TCL",
    minTCL: "500",
    avgTCL: "550",
    maxTCL: "600",
    totalUser: "30",
    uploadedDate: "1 Oct 2023",
    totalRows: 30,
  },
];

export const TclViewListHeaderList = [
  "File Name",
  "Min TCL",
  "Avg TCL",
  "Max TCL",
  "Total User",
  "Uploaded Date",
  "Total Rows",
  "Actions",
];


