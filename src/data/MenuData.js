export const MenusInitial = [
  // LOAN MANAGEMENT
  {
    title: "Home",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/home",
    icon: "HomeIcon",
    count: "5",
    current: true,
  },
  {
    title: "Loan Product",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/loan-product",
    icon: "CubeIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProduct",
    buttonName: "Create Product", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/loan-product/newProduct/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Decision Engine",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/dynamic-rac",
    icon: "ClipboardDocumentCheckIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewDynamicRac",
    buttonName: "Create Decision Engine",
    placeholder: "Enter Name",
    navigateSuccess: "/loan/dynamic-rac/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },
  {
    title: "DRL Ruleset",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/drl-ruleset",
    icon: "ClipboardDocumentCheckIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewDrlRuleset",
    buttonName: "Create DRL Ruleset",
    placeholder: "Enter Name",
    navigateSuccess: "/loan/drl-ruleset/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },
  {
    title: "Loan Schema",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/project", //previous -> "/project/loan-form"
    icon: "ChartPieIcon",
    current: false,
    submenu: true,
    createButton: true, //if create project from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProject",
    buttonName: "Create Loan Schema", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/project/newProject/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "projectId",
  },
  {
    title: "TCL",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/tcl",
    icon: "CurrencyRupeeIcon",
    current: false,
    submenu: true,
    createButton: true, //if create TCL from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewTCL",
    buttonName: "Create TCL", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/tcl/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "tclFileId",
  },
  {
    title: "Recovery",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/recovery",
    icon: "ArrowPathRoundedSquareIcon",
    current: false,
    submenu: true,
    createButton: true, //if create recovery from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewRecovery",
    buttonName: "Create Recovery", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/recovery/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "recoveryEquationTempId",
  },
  {
    title: "Credit Score",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/credit-score",
    icon: "CalculatorIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewCreditScoreEq",
    buttonName: "Create Credit Score", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/credit-score/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "creditScoreEqTempId",
  },
  {
    title: "Rule Policy",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/rule-policy",
    icon: "ClipboardDocumentListIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewRulePolicy",
    buttonName: "Create Rule Policy", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/rule-policy/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "rulePolicyTempId",
  },
  // {
  //   title: "Business Rule",
  //   sectionName: "LOAN MANAGEMENT",
  //   href: "/loan/business-rule/1",
  //   icon: "AdjustmentsHorizontalIcon",
  //   current: false,
  //   submenu: true,
  //   // createButton: true, //if create product from Side bar Using input box
  //   // editable: false, //if Button takes input string
  //   // createFunction: null,
  //   // buttonName: "Create Rule", //Create button text
  //   // placeholder: "Enter Name", //required placeholder for input box
  //   // navigateSuccess: "/business-rule/1", // navigation
  //   // navigateFail: "/login", // navigation
  //   submenuItems: [
  //     { name: "Business Rule 1", href: "/business-rule/1" },
  //     { name: "Business Rule 2", href: "/business-rule/2" },
  //     { name: "Business Rule 3", href: "/loan/business-rule/3" },
  //   ],
  //   isOpen: false,
  // },
  {
    title: "DBR Config",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/dbr-config",
    icon: "CreditCardIcon",
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewDBC",
    buttonName: "Create DBR", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/dbr-config/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "dbcTempId",
  },
  {
    title: "Eligible Tenure",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/eligible-tenure",
    icon: "CalculatorIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewCreditScoreET", //Create function
    buttonName: "Create New Tenure", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/eligible-tenure/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "creditScoreEtTempId",
  },
  {
    title: "Product Group",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/product-group",
    icon: "RectangleGroupIcon",
    current: false,
    submenu: true,
    createButton: false, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProductGroup",
    buttonName: "Create Group", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/product-group/newProductGroup/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Affordability",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/affordability",
    icon: "HandThumbUpIcon",
    current: false,
    submenu: true,
    createButton: true, //if create recovery from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewAffordability",
    buttonName: "Create Affordability", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/affordability/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "affordabilityCriteriaTempId",
  },
  {
    title: "Employer",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/employer",
    icon: "BuildingOfficeIcon",
    current: false,
  },
  {
    title: "Banks",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/banks",
    icon: "BanknotesIcon",
    current: false,
  },
  {
    title: "Approval Config",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/loan-approval",
    icon: "CheckBadgeIcon",
    current: false,
    submenu: true,
    createButton: true, //if create recovery from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewLoanApproval",
    buttonName: "Create New Config", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/loan-approval/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "approvalsConfigurationsTempId",
  },
  {
    title: "Document Config",
    sectionName: "LOAN MANAGEMENT",
    href: "/loan/document-config",
    icon: "DocumentTextIcon",
    current: false,
    submenu: true,
    createButton: true, //if create recovery from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewDocumentConfig",
    buttonName: "Create New Config", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/document-config/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "dynamicDocumentTempId",
  },

  // FINANCE
  {
    title: "General Ledger",
    sectionName: "FINANCE",
    href: "/loan/general-ledger",
    icon: "BookOpenIcon",
    current: false,
  },

  // TESTING
  {
    title: "Product Testing",
    sectionName: "TESTING",
    href: "/loan/product-testing/term-loan",
    icon: "HandRaisedIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Term Loan",
        href: "/loan/product-testing/term-loan",
        current: false,
      },
      // {
      //   name: "Overdraft Loan",
      //   href: "/loan/product-testing/overdraft-loan",
      //   current: false,
      // },
    ],
    isOpen: false,
  },
  {
    title: "Product Testing KSA",
    sectionName: "TESTING",
    href: "/loan/product-testing-KSA/create-account",
    icon: "HandRaisedIcon",
    current: false,
    submenu: false,
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Asset Financing",
    sectionName: "TESTING",
    href: "/loan/product-testing2/loan-application",
    icon: "DocumentCurrencyRupeeIcon",
    current: false,
    submenu: false,
    isOpen: false,
  },
  {
    title: "Bank Statement Analyzer",
    sectionName: "TESTING",
    href: "/loan/bank-statement-analyzer",
    icon: "DocumentMagnifyingGlassIcon",
    current: false,
  },
  // {
  //   title: "Test Component",
  //   sectionName: "TESTING",
  //   href: "/loan/test",
  //   icon: "BeakerIcon",
  //   current: false,
  // },

  // CONFIGURATION
  {
    title: "Global Config",
    sectionName: "CONFIGURATION",
    href: "/loan/global-config/risk-grading-matrix",
    icon: "Cog6ToothIcon",
    current: false,
    submenu: true,
    submenuItems: [
      // {
      //   name: "Liabilities Matrix",
      //   href: "/loan/global-config/liabilities-matrix",
      //   current: false,
      // },
      {
        name: "Risk Grading Matrix",
        href: "/loan/global-config/risk-grading-matrix",
        current: false,
      },
      {
        name: "Minimum Expense",
        href: "/loan/global-config/min-expense",
        current: false,
      },
      {
        name: "Notification Text",
        href: "/loan/global-config/notification-text",
        current: false,
      },
    ],
    isOpen: false,
  },
  {
    title: "Server Config",
    sectionName: "CONFIGURATION",
    href: "/loan/server-config",
    icon: "WrenchScrewdriverIcon",
    current: false,
  },
  {
    title: "App Config",
    sectionName: "CONFIGURATION",
    href: "/loan/app-config",
    icon: "CpuChipIcon",
    current: false,
  },

  // LOAN ORIGINATION
  {
    title: "SME Loans",
    sectionName: "LOAN ORIGINATION",
    href: "/loan/loan-origination-system/sme/borrowers/add-company",
    icon: "DocumentCurrencyRupeeIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Borrowers",
        href: "/loan/loan-origination-system/sme/borrowers/add-company",
        current: false,
      },
      {
        name: "Loans",
        href: "/loan/loan-origination-system/sme/loans/loan-application",
        current: false,
      },
      {
        name: "Repayments",
        href: "/loan/loan-origination-system/sme/repayments/add-bulk-repayment",
        current: false,
      },
    ],
    isOpen: false,
  },
  {
    title: "Personal Loans",
    sectionName: "LOAN ORIGINATION",
    href: "/loan/loan-origination-system/personal/borrowers/add-borrower",
    icon: "AtSymbolIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Borrowers",
        href: "/loan/loan-origination-system/personal/borrowers/add-borrower",
        current: false,
      },
      {
        name: "Loans",
        href: "/loan/loan-origination-system/personal/loans/loan-application",
        current: false,
      },
      {
        name: "Repayments",
        href: "/loan/loan-origination-system/personal/repayments/add-bulk-repayment",
        current: false,
      },
      {
        name: "Refund",
        href: "/loan/loan-origination-system/personal/refund/refund-application",
        current: false,
      },
    ],
    isOpen: false,
  },

  // REPORTS & ANALYSIS
  {
    title: "Reporting Config",
    sectionName: "REPORTS & ANALYSIS",
    href: "/loan/reporting-config",
    icon: "ChartBarIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewReportingConfig",
    buttonName: "Create New Config",
    placeholder: "Enter Name",
    navigateSuccess: "/loan/reporting-config/newConfig/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },
  {
    title: "Reports",
    sectionName: "REPORTS & ANALYSIS",
    href: "/loan/reports",
    icon: "NewspaperIcon",
    current: false,
  },
  {
    title: "ELK Reports",
    sectionName: "REPORTS & ANALYSIS",
    href: import.meta.env.VITE_KIBANA_APP_LINK || "/loan/reports",
    icon: "CubeTransparentIcon",
    current: false,
    isOpen: false,
    openInNewTab: true,
  },
  // USER TOOLS
  {
    title: "Customer Care",
    sectionName: "USER TOOLS",
    href: "/loan/customer-care",
    icon: "HeartIcon",
    current: false,
  },
  {
    title: "User Management",
    sectionName: "USER TOOLS",
    href: "/loan/user-management",
    icon: "UserGroupIcon",
    current: false,
  },
  {
    title: "B2C Customer",
    sectionName: "USER TOOLS",
    href: "/customer/home",
    icon: "CheckBadgeIcon",
    current: false,
  },
  //WORKFLOW MANAGEMENT
  {
    title: "My Tasks",
    sectionName: "WORKFLOW MANAGEMENT",
    href: "/workflow/my-task-list",
    icon: "RectangleStackIcon",
    current: false,
  },  
  {
    title: "Workflows",
    sectionName: "WORKFLOW MANAGEMENT",
    href: "/workflow/workflow-list",
    icon: "AdjustmentsHorizontalIcon",
    current: false,
  },
  {
    title: "Instances",
    sectionName: "WORKFLOW MANAGEMENT",
    href: "/workflow/instances",
    icon: "PlayCircleIcon",
    current: false,
  },
  {
    title: "Incidents",
    sectionName: "WORKFLOW MANAGEMENT",
    href: "/workflow/incidents",
    icon: "ExclamationCircleIcon",
    current: false,
  },
  {
    title: "Notifications",
    sectionName: "WORKFLOW MANAGEMENT",
    href: "/workflow/notifications",
    icon: "BellAlertIcon",
    current: false,
  },      
  {
    title: "AI Agent",
    sectionName: "CONNECT",
    href: "/loan/AI-agent",
    icon: "ChatBubbleLeftRightIcon",
    current: false,
    submenu: false,
    createButton: false, //if create product from Side bar Using input box
    submenuItems: [],
    isOpen: false,
  },
];
export const allSectionName = [
  "LOAN MANAGEMENT",
  "FINANCE",
  "TESTING",
  "CONFIGURATION",
  "LOAN ORIGINATION",
  "REPORTS & ANALYSIS",
  "USER TOOLS",
  "WORKFLOW MANAGEMENT",
  "CONNECT",
];
