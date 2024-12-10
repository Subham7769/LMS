import {
  ClipboardDocumentListIcon,
  CurrencyRupeeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const HomeStats = [
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
    // icon: false,
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

export const BorrowerHeaderList = [
  "Full Name",
  "Business",
  "Unique#",
  "Mobile",
  "Email",
  "Total Paid",
  "Open Loans",
  "Status",
  "Actions",
];

export const BorrowerGroupHeaderList = [
  "Group Name",
  "Borrowers",
  "Group Leader",
  "Collector",
  "Meeting",
  "Actions",
];

export const CollateralRegisterHeaderList = [
  "Borrower",
  "Name",
  "Model",
  "Serial Number",
  "Status",
  "Condition",
];

export const AddBulkRepaymentHeaderList = [
  "Row",
  "Loan",
  "Amount",
  "Method",
  "Collection Date",
  "Collection By",
  "Description",
  "Accounting",
  "Actions",
];

export const BorrowersList = [
  {
    fullName: "Marry",
    business: "Cash Loan Group",
    uniqueNumber: "12345",
    mobile: "9876543210",
    email: "marry@example.com",
    totalPaid: "$5000",
    openLoans: "$10000",
    status: "Active",
    href: "/product/cash-loan/loan-product-config",
  },
  {
    fullName: "Jack",
    business: "BNPL Group",
    uniqueNumber: "67890",
    mobile: "9123456789",
    email: "jack@example.com",
    totalPaid: "$3000",
    openLoans: "$7000",
    status: "Active",
    href: "/product/cash-loan/loan-product-config",
  },
  {
    fullName: "Julie",
    business: "Overdraft Group",
    uniqueNumber: "11223",
    mobile: "9056781234",
    email: "julie@example.com",
    totalPaid: "$4000",
    openLoans: "$8000",
    status: "Inactive",
    href: "/product/cash-loan/loan-product-config",
  },
];

export const BorrowersGroupList = [
  {
    groupName: "Cash Loan Group",
    borrowers: "Marry",
    groupLeader: "Tahseen",
    collector: "A",
    Meeting: "2",
    href: "/product/cash-loan/loan-product-config",
  },
  {
    groupName: "BNPL Group",
    borrowers: "Jack",
    groupLeader: "Tahseen",
    collector: "B",
    Meeting: "3",
    href: "/product/cash-loan/loan-product-config",
  },
  {
    groupName: "Overdraft Group",
    borrowers: "Julie",
    groupLeader: "Tahseen",
    collector: "C",
    Meeting: "4",
    href: "/product/cash-loan/loan-product-config",
  },
];

export const CollateralRegisterList = [
  {
    borrower: "John Doe",
    name: "Equipment A",
    model: "X123",
    serialNumber: "SN001",
    status: "Active",
    condition: "Good",
  },
  {
    borrower: "Jane Smith",
    name: "Equipment B",
    model: "Y456",
    serialNumber: "SN002",
    status: "Inactive",
    condition: "Fair",
  },
];

export const AddBulkRepaymentList = [
  {
    row: 1,
    loan: "Home Loan",
    amount: 50000,
    method: "Online Transfer",
    collectionDate: "2024-12-10",
    collectionBy: "John Doe",
    addEdit: "Edit",
    description: "EMI for December",
    accounting: "Cash",
  },
  {
    row: 2,
    loan: "Car Loan",
    amount: 20000,
    method: "Cheque",
    collectionDate: "2024-12-11",
    collectionBy: "Jane Smith",
    addEdit: "Add",
    description: "Partial payment",
    accounting: "Bank",
  },
];
