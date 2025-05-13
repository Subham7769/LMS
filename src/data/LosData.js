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
  "Borrower Serial No.",
  "Status",
  "Condition",
];

export const AddBulkRepaymentHeaderList = [
  "Row",
  "Loan Id",
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
    href: "/product/cash-loan",
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
    href: "/product/cash-loan",
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
    href: "/product/cash-loan",
  },
];

export const BorrowersGroupList = [
  {
    groupName: "Cash Loan Group",
    borrowers: "Marry",
    groupLeader: "Tahseen",
    collector: "A",
    Meeting: "2",
    href: "/product/cash-loan",
  },
  {
    groupName: "BNPL Group",
    borrowers: "Jack",
    groupLeader: "Tahseen",
    collector: "B",
    Meeting: "3",
    href: "/product/cash-loan",
  },
  {
    groupName: "Overdraft Group",
    borrowers: "Julie",
    groupLeader: "Tahseen",
    collector: "C",
    Meeting: "4",
    href: "/product/cash-loan",
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
  { label: "User Id", field: "userId", copy: true },
  { label: "Loan Id", field: "loan", copy: true },
  { label: "Collected By", field: "collectionBy" },
  { label: "Method", field: "method" },
  { label: "Accounting", field: "accounting" },
  { label: "Aging", field: "aging" },
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
  { value: "NRC", label: "NRC" },
  { value: "EMAIL", label: "EMAIL" },
  // { value: "DRIVER'S LICENSE", label: "DRIVER'S LICENSE" },
  // { value: "NATIONAL ID", label: "NATIONAL ID" },
  // { value: "VOTER ID", label: "VOTER ID" },
  // { value: "SOCIAL SECURITY NUMBER", label: "SOCIAL SECURITY NUMBER" },
];
export const accountStatusOptionsPersonal = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "DEACTIVATED", label: "DEACTIVATE" },
  { value: "DEFAULTER", label: "DEFAULTER" },
  { value: "SETTLED", label: "SETTLED" },
  { value: "DECEASED", label: "DECEASED" },
  { value: "SHORT_PAYMENT", label: "SHORT PAYMENT" },
  { value: "NEW_THIRDPARTY", label: "NEW THIRD PARTY" },
  { value: "RETIRED_ON_MEDICAL_GROUNDS", label: "RETIRED ON MEDICAL GROUNDS" },
];
export const accountStatusOptionsSME = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "DEACTIVATED", label: "DEACTIVATE" },
  { value: "DEFAULTER", label: "DEFAULTER" },
];

export const natureOfCompanyOptions = [
  { value: "SOLE_PROPRIETORSHIP", label: "Sole Proprietorship" },
  { value: "PARTNERSHIP", label: "Partnership" },
  { value: "PRIVATE_LIMITED", label: "Private Limited Company (LTD)" },
  { value: "PUBLIC_LIMITED", label: "Public Limited Company (PLC)" },
  { value: "COMPANY_LIMITED_BY_GUARANTEE", label: "Company Limited by Guarantee" },
  { value: "FOREIGN_COMPANY", label: "Foreign Company" },
  { value: "COOPERATIVE_SOCIETY", label: "Cooperative Society" },
  { value: "NGO", label: "Non-Governmental Organization (NGO)" }
];

export const companyRegistrationOptions = [
  { value: "123456789", label: "ABC Limited" },
  { value: "987654321", label: "XYZ Business Name" },
  { value: "456789123", label: "PQR Limited" },
];
export const methodOptions = [
  { label: "User Payment", value: "USER_PAYMENT" },
  { label: "Auto Payment", value: "AUTO_PAYMENT" },
];

export const collectionByOptions = [
  { label: "Agent 1", value: "agent_1" },
  { label: "Agent 2", value: "agent_2" },
];

export const accountingOptions = [
  { label: "Cash", value: "cash" },
  { label: "Bank", value: "bank" },
];

export const loanOptions = [
  { label: "Loan 1", value: "loan_1" },
  { label: "Loan 2", value: "loan_2" },
];

export const creditCommitteDecision = [
  {
    fullName: "",
    signature: "",
    date: "",
  },
  {
    fullName: "",
    signature: "",
    date: "",
  },
  {
    fullName: "",
    signature: "",
    date: "",
  },
  {
    fullName: "",
    signature: "",
    date: "",
  },
  {
    fullName: "",
    signature: "",
    date: "",
  },
];

export const documentsData = [
  {
    document: "Directors’ Identification Documents (NRC / Passport)",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Partnership Agreement",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Purchase Order",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "Yes",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Invoice ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Profoma Invoice ",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "Yes",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Resolution to borrow ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Proof of residence ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Tax clearance Certificate",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Tax Registration Certificate ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Quotations from supplier ",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "Yes",
  },
  {
    document: "Credit Reference Bureau report ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Confirmation of Banking Details ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Shareholder Agreement ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Certificate of Incorporation",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Articles of Association ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Purchase Order",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "Yes",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Invoice ",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Resolution to borrow ",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Proof of residence",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Proof of employment",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "Quotations from supplier",
    invoiceDiscounting: "",
    purchaseOrderFinancing: "",
    workingCapital: "",
    specialisedFinancing: "",
  },
  {
    document: "6 months Bank Statement",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Credit Reference Bureau report",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
  {
    document: "Directors’ Passport size photos",
    invoiceDiscounting: "Yes",
    purchaseOrderFinancing: "Yes",
    workingCapital: "Yes",
    specialisedFinancing: "Yes",
  },
];

export const ministriesOptions = [
  { value: "MINISTRY_WORKS_SUPPLY", label: "Ministry of Works and Supply" },
  { value: "MINISTRY_HEALTH", label: "Ministry of Health" },
  { value: "MINISTRY_FINANCE", label: "Ministry of Finance" },
  { value: "MINISTRY_INFORMATION_BROADCAST", label: "Ministry of Information and Broadcast" },
  { value: "MINISTRY_COMMERCE_TRADE_INDUSTRY", label: "Ministry of Commerce Trade and Industry" },
  { value: "MINISTRY_HOME_AFFAIRS", label: "Ministry of Home Affairs" },
  { value: "MINISTRY_AGRICULTURE", label: "Ministry of Agriculture" },
  { value: "MINISTRY_EDUCATION", label: "Ministry of Education" },
  { value: "MINISTRY_TRANSPORT_COMMUNICATION", label: "Ministry of Transport and Communication" },
  { value: "MINISTRY_FOREIGN_AFFAIRS", label: "Ministry of Foreign Affairs" },
  { value: "MINISTRY_WATER_SANITATION", label: "Ministry of Water and Sanitation" },
  { value: "OFFICE_PRESIDENT", label: "Office of the President (Special Division)" },
  { value: "MINISTRY_JUSTICE", label: "Ministry of Justice" },
  { value: "MINISTRY_ENERGY_WATER", label: "Ministry of Energy and Water Development" },
  { value: "MINISTRY_COMMUNITY_DEVELOPMENT", label: "Ministry of Community and Development" },
  { value: "MINISTRY_LABOUR_SOCIAL_SERVICES", label: "Ministry of Labour and Social Services" },
  { value: "MINISTRY_GOVERNMENT", label: "Ministry of Government" },
  { value: "MINISTRY_SPORT_YOUTH_CHILD", label: "Ministry of Sport Youth and Child Development" },
  { value: "MINISTRY_DEVELOPMENT_PLANNING", label: "Ministry of Development and Planning" },
  { value: "MINISTRY_LANDS", label: "Ministry of Lands" },
  { value: "MINISTRY_MINES_MINERALS", label: "Ministry of Mines and Minerals" },
  { value: "MINISTRY_HOUSING_INFRASTRUCTURE", label: "Ministry of Housing and Infrastructure" },
  { value: "MINISTRY_FISHERIES_LIVESTOCK", label: "Ministry of Fisheries and Livestock" },
  { value: "ZAMBIA_AIR_FORCE", label: "Zambia Air Force" },
  { value: "ZAMBIA_NATIONAL_SERVICE", label: "Zambia National Service" },
  { value: "ZAMBIA_ARMY", label: "Zambia Army" },
  { value: "NATIONAL_SPORTS_COUNCIL", label: "National Sports Council of Zambia" },
  { value: "ZAMBIA_REVENUE_AUTHORITY", label: "Zambia Revenue Authority" }
];

export const industriesOptions = [
  { value: "AGRICULTURE", label: "Agriculture" },
  { value: "AUTOMOTIVE", label: "Automotive" },
  { value: "AVIATION_AND_AEROSPACE", label: "Aviation and Aerospace" },
  { value: "BANKING_AND_FINANCIAL_SERVICES", label: "Banking and Financial Services" },
  { value: "BIOTECHNOLOGY", label: "Biotechnology" },
  { value: "CHEMICALS", label: "Chemicals" },
  { value: "CIVIL_ENGINEERING", label: "Civil Engineering" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "CONSULTING", label: "Consulting" },
  { value: "DEFENSE_AND_MILITARY", label: "Defense and Military" },
  { value: "EDUCATION", label: "Education" },
  { value: "ELECTRONICS_AND_SEMICONDUCTORS", label: "Electronics and Semiconductors" },
  { value: "ENERGY_AND_UTILITIES", label: "Energy and Utilities" },
  { value: "ENTERTAINMENT_AND_MEDIA", label: "Entertainment and Media" },
  { value: "ENVIRONMENT_AND_SUSTAINABILITY", label: "Environment and Sustainability" },
  { value: "FOOD_AND_BEVERAGE", label: "Food and Beverage" },
  { value: "FURNITURE_AND_INTERIOR_DESIGN", label: "Furniture and Interior Design" },
  { value: "GAMING_AND_E_SPORTS", label: "Gaming and E-Sports" },
  { value: "GOVERNMENT_AND_PUBLIC_SERVICES", label: "Government and Public Services" },
  { value: "HEALTHCARE_AND_PHARMACEUTICALS", label: "Healthcare and Pharmaceuticals" },
  { value: "HOSPITALITY_AND_TOURISM", label: "Hospitality and Tourism" },
  { value: "HUMAN_RESOURCES_AND_RECRUITMENT", label: "Human Resources and Recruitment" },
  { value: "INFORMATION_TECHNOLOGY", label: "Information Technology" },
  { value: "INSURANCE", label: "Insurance" },
  { value: "INVESTMENT_AND_VENTURE_CAPITAL", label: "Investment and Venture Capital" },
  { value: "LEGAL_SERVICES", label: "Legal Services" },
  { value: "LOGISTICS_AND_TRANSPORTATION", label: "Logistics and Transportation" },
  { value: "LUXURY_GOODS_AND_JEWELRY", label: "Luxury Goods and Jewelry" },
  { value: "MANUFACTURING", label: "Manufacturing" },
  { value: "MARINE_AND_SHIPPING", label: "Marine and Shipping" },
  { value: "MARKETING_AND_ADVERTISING", label: "Marketing and Advertising" },
  { value: "MASS_MEDIA_AND_PUBLISHING", label: "Mass Media and Publishing" },
  { value: "MEDICAL_DEVICES_AND_EQUIPMENT", label: "Medical Devices and Equipment" },
  { value: "METALS_AND_MINING", label: "Metals and Mining" },
  { value: "MUSIC_AND_PERFORMING_ARTS", label: "Music and Performing Arts" },
  { value: "NON_PROFIT_AND_NGO", label: "Non-Profit and NGO" },
  { value: "OIL_AND_GAS", label: "Oil and Gas" },
  { value: "PACKAGING_AND_PRINTING", label: "Packaging and Printing" },
  { value: "PETROLEUM_AND_REFINING", label: "Petroleum and Refining" },
  { value: "PHOTOGRAPHY_AND_FILM", label: "Photography and Film" },
  { value: "PLASTICS_AND_RUBBER", label: "Plastics and Rubber" },
  { value: "REAL_ESTATE", label: "Real Estate" },
  { value: "RENEWABLE_ENERGY", label: "Renewable Energy" },
  { value: "RETAIL_AND_ECOMMERCE", label: "Retail and E-commerce" },
  { value: "SCIENCE_AND_RESEARCH", label: "Science and Research" },
  { value: "SECURITY_AND_DEFENSE", label: "Security and Defense" },
  { value: "SOFTWARE_AND_SAAS", label: "Software and SaaS" },
  { value: "SPORTS_AND_RECREATION", label: "Sports and Recreation" },
  { value: "TELECOMMUNICATIONS", label: "Telecommunications" },
  { value: "TEXTILES_AND_APPAREL", label: "Textiles and Apparel" },
  { value: "WASTE_MANAGEMENT", label: "Waste Management" },
  { value: "WHOLESALE_AND_DISTRIBUTION", label: "Wholesale and Distribution" },
  { value: "BLOCKCHAIN_CRYPTOCURRENCY", label: "Blockchain & Cryptocurrency" },
  { value: "CYBERSECURITY", label: "Cybersecurity" },
  { value: "E_LEARNING", label: "E-Learning & Online Courses" },
  { value: "3D_PRINTING", label: "3D Printing & Additive Manufacturing" },
  { value: "DRONE_TECHNOLOGY", label: "Drone Technology" },
  { value: "METAVERSE_VR", label: "Metaverse & Virtual Reality" },
  { value: "SPACE_TECH", label: "Space Exploration & Satellite Technology" },
  { value: "AI_ML", label: "Artificial Intelligence & Machine Learning" },
  { value: "QUANTUM_COMPUTING", label: "Quantum Computing" },
  { value: "BIOTECH_GENETICS", label: "Biotechnology & Genetic Engineering" },
  { value: "RENEWABLE_ENERGY", label: "Renewable Energy (Solar, Wind, Hydroelectric, Geothermal)" },
  { value: "AUTONOMOUS_VEHICLES", label: "Autonomous Vehicles & Smart Mobility" },
  { value: "ESPORTS_GAMEDEV", label: "Esports & Game Development" },
  { value: "HEALTHCARE_AI", label: "Personalized Medicine & Healthcare AI" },
  { value: "SMART_WEARABLES", label: "Smart Wearables & IoT Devices" },
  { value: "AGRITECH", label: "Agritech & Precision Farming" },
  { value: "CARBON_CAPTURE", label: "Carbon Capture & Climate Tech" },
  { value: "NANOTECHNOLOGY", label: "Nanotechnology & Advanced Materials" },
  { value: "SYNTHETIC_BIOLOGY", label: "Synthetic Biology & Biofabrication" },
  { value: "NEUROTECH_BCI", label: "Neurotechnology & Brain-Computer Interfaces (BCI)" },
  { value: "AUGMENTED_MIXED_REALITY", label: "Augmented Reality (AR) & Mixed Reality (MR)" },
  { value: "SMART_CITIES", label: "Smart Cities & Urban Tech" },
  { value: "WASTE_MANAGEMENT", label: "Waste Management & Recycling Innovations" },
  { value: "FUSION_ENERGY", label: "Fusion Energy & Next-Gen Nuclear Power" },
  { value: "VERTICAL_FARMING", label: "Vertical Farming & Urban Agriculture" },
  { value: "FOODTECH", label: "FoodTech & Alternative Proteins (Lab-Grown Meat, Plant-Based Dairy, etc.)" },
  { value: "EDTECH", label: "EdTech (AI-Powered Personalized Learning)" },
  { value: "LEGALTECH", label: "LegalTech (AI in Law & Compliance Automation)" },
  { value: "PROPTECH", label: "PropTech (Smart Real Estate & Property Management)" },
  { value: "DIGITAL_TWINS", label: "Digital Twin Technology & Industrial IoT" },
  { value: "REGENERATIVE_MEDICINE", label: "Regenerative Medicine & Tissue Engineering" },
  { value: "QUANTUM_CRYPTOGRAPHY", label: "Quantum Cryptography & Secure Communications" },
  { value: "ASTEROID_MINING", label: "Asteroid Mining & Deep Space Resource Extraction" },
  { value: "VOICE_AI", label: "Voice AI & Conversational Interfaces" },
  { value: "ADVANCED_ROBOTICS", label: "Advanced Robotics & Human-Machine Collaboration" },
  { value: "PSYCHEDELIC_MEDICINE", label: "Psychedelic Medicine & Mental Health Tech" },
  { value: "SELF_HEALING_MATERIALS", label: "Self-Healing Materials & Smart Polymers" }
];

export const relationshipOptions = [
  { value: "FATHER", label: "Father" },
  { value: "MOTHER", label: "Mother" },
  { value: "BROTHER", label: "Brother" },
  { value: "SISTER", label: "Sister" },
  { value: "SPOUSE", label: "Spouse" },
  { value: "SON", label: "Son" },
  { value: "DAUGHTER", label: "Daughter" },
  { value: "GRANDFATHER", label: "Grandfather" },
  { value: "GRANDMOTHER", label: "Grandmother" },
  { value: "GRANDSON", label: "Grandson" },
  { value: "GRANDDAUGHTER", label: "Granddaughter" },
  { value: "UNCLE", label: "Uncle" },
  { value: "AUNT", label: "Aunt" },
  { value: "NEPHEW", label: "Nephew" },
  { value: "NIECE", label: "Niece" },
  { value: "COUSIN", label: "Cousin" },
  { value: "GUARDIAN", label: "Guardian" },
  { value: "FRIEND", label: "Friend" },
  { value: "COLLEAGUE", label: "Colleague" },
  { value: "BUSINESS_PARTNER", label: "Business Partner" },
  { value: "EMPLOYER", label: "Employer" },
  { value: "EMPLOYEE", label: "Employee" },
  { value: "NEIGHBOR", label: "Neighbor" },
  { value: "MENTOR", label: "Mentor" },
  { value: "OTHER", label: "Other" }
];
