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


export const loanOfficer = [
  { label: "Super Admin", value: "superadmin" },
  { label: "Test", value: "test" },
];

export const ApproveRepaymentColumns = [
  { label: "Amount", field: "amount" },
  { label: "Collection Date", field: "collectionDate" },
  { label: "Name", field: "name" },
  { label: "Loan Id", field: "loanId" },
  { label: "Collected By", field: "collectedBy" },
  { label: "Method", field: "method" },
  { label: "Staff", field: "staff" },
  { label: "Edit Date", field: "editDate" },
];

export const yesNoOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];


export const repaymentOptions = [
  { label: "Ignore", value: "ignore" },
  { label: "Amount", value: "amount" },
  { label: "Collection Method", value: "collectionMethod" },
  { label: "Collection Date", value: "collectionDate" },
  { label: "Loan Unique Number", value: "loanUniqueNumber" },
  { label: "Collected By", value: "collectedBy" },
  { label: "Description", value: "description" },
  { label: "Recalculate remaining schedule with balance principal amount", value: "recalculateSchedule" },
  { label: "Adjust interest on a pro-rata basis until the Collection Date selected above", value: "adjustInterestProrata" },
  { label: "Allocate repayment amount manually based on the below value", value: "allocateRepayment" },
  { label: "Principal Amount", value: "principalAmount" },
  { label: "Interest Amount", value: "interestAmount" },
  { label: "Fees Amount", value: "feesAmount" },
  { label: "Penalty Amount", value: "penaltyAmount" },
  { label: "Destination of Funds for Repayment Amount", value: "destinationFundsRepayment" }
];


export const maritalStatus = [
  { value: "SINGLE", label: "SINGLE" },
  { value: "MARRIED", label: "MARRIED" },
  { value: "DIVORCED", label: "DIVORCED" },
  { value: "WIDOWED", label: "WIDOWED" },
];

export const workType = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Temporary", label: "Temporary" },
  { value: "Freelance", label: "Freelance" },
]

export const title = [
  { value: "Mr.", label: "Mr." },
  { value: "Ms.", label: "Ms." },
  { value: "Mrs.", label: "Mrs." },
  { value: "Dr.", label: "Dr." },
  { value: "Prof.", label: "Prof." },
]
export const gender = [
  { value: "MALE", label: "MALE" },
  { value: "FEMALE", label: "FEMALE" },
  { value: "OTHER", label: "OTHER" },
];
export const accountType = [
  { value: "Savings", label: "Savings" },
  { value: "Current", label: "Current" },
  { value: "Corporate", label: "Corporate" },
]
export const uniqueIDType = [
  { value: "PASSPORT", label: "PASSPORT" },
  { value: "NRC NO.", label: "NRC NO." },
  { value: "DRIVER'S LICENSE", label: "DRIVER'S LICENSE" },
  { value: "NATIONAL ID", label: "NATIONAL ID" },
  { value: "VOTER ID", label: "VOTER ID" },
  { value: "SOCIAL SECURITY NUMBER", label: "SOCIAL SECURITY NUMBER" },
];
export const accountStatusOptions = [
  { value: "DEACTIVATED", label: "DEACTIVATE" },
  { value: "DEFAULTER", label: "DEFAULTER" },
];

export const natureOfCompanyOptions = [
  { value: "LIMITED", label: "Limited" },
  { value: "BUSINESS_NAME", label: "Business Name" },
];
export const companyRegistrationOptions = [
  { value: "123456789", label: "ABC Limited" },
  { value: "987654321", label: "XYZ Business Name" },
  { value: "456789123", label: "PQR Limited" },
];