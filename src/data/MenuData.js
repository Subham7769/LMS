export const MenusInitial = [
  {
    title: "Home",
    href: "/loan/home",
    icon: "HomeIcon",
    count: "5",
    current: true,
  },
  // {
  //   title: "RAC",
  //   href: "/rac",
  //   icon: "ClipboardDocumentCheckIcon",
  //   current: false,
  //   submenu: true,
  //   createButton: true, //if create RAC from Side bar Using input box
  //   editable: true, //if Button takes input string
  //   createFunction: "createNewRac",
  //   buttonName: "Create RAC", //Create button text
  //   placeholder: "Enter Name", //required placeholder for input box
  //   navigateSuccess: "/rac/", // navigation
  //   navigateFail: "/login", // navigation
  //   submenuItems: [],
  //   isOpen: false,
  //   uniqueKey: "racId",
  // },
  {
    title: "Dynamic RAC",
    href: "/loan/dynamic-rac",
    icon: "ClipboardDocumentCheckIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewDynamicRac",
    buttonName: "Create RAC",
    placeholder: "Enter Name",
    navigateSuccess: "/loan/dynamic-rac/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },
  {
    title: "Recovery",
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
    title: "TCL",
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
    title: "Project",
    href: "/loan/project", //previous -> "/project/loan-form"
    icon: "ChartPieIcon",
    current: false,
    submenu: true,
    createButton: true, //if create project from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProject",
    buttonName: "Create Project", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/project/newProject/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "projectId",
  },
  {
    title: "Loan Product",
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
    title: "Eligible Tenure",
    href: "/loan/credit-score-eligible-tenure",
    icon: "CalculatorIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewCreditScoreET", //Create function
    buttonName: "Create New Tenure", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/credit-score-eligible-tenure/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "creditScoreEtTempId",
  },
  {
    title: "DBR Config",
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
    title: "Blocked Employer",
    href: "/loan/blocked-employer",
    icon: "NoSymbolIcon",
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewBE",
    buttonName: "Create BE", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/loan/blocked-employer/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "blockEmployersTempId",
  },
  {
    title: "Credit Score",
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
  {
    title: "Product Group",
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
    title: "Business Rule",
    href: "/loan/business-rule/1",
    icon: "AdjustmentsHorizontalIcon",
    current: false,
    submenu: true,
    // createButton: true, //if create product from Side bar Using input box
    // editable: false, //if Button takes input string
    // createFunction: null,
    // buttonName: "Create Rule", //Create button text
    // placeholder: "Enter Name", //required placeholder for input box
    // navigateSuccess: "/business-rule/1", // navigation
    // navigateFail: "/login", // navigation
    submenuItems: [
      { name: "Business Rule 1", href: "/business-rule/1" },
      { name: "Business Rule 2", href: "/business-rule/2" },
      { name: "Business Rule 3", href: "/loan/business-rule/3" },
    ],
    isOpen: false,
  },
  {
    title: "Global Config",
    href: "/loan/global-config/liabilities-matrix",
    icon: "Cog6ToothIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Liabilities Matrix",
        href: "/loan/global-config/liabilities-matrix",
        current: false,
      },
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
    title: "Customer Care",
    href: "/loan/customer-care",
    icon: "HeartIcon",
    current: false,
  },
  {
    title: "Product Testing",
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
      {
        name: "Overdraft Loan",
        href: "/loan/product-testing/overdraft-loan",
        current: false,
      },
    ],
    isOpen: false,
  },
  {
    title: "General Ledger",
    href: "/loan/general-ledger",
    icon: "BookOpenIcon",
    current: false,
  },
  {
    title: "User Management",
    href: "/loan/user-management",
    icon: "UserGroupIcon",
    current: false,
  },

  {
    title: "Server Config",
    href: "/loan/server-config",
    icon: "WrenchScrewdriverIcon",
    current: false,
  },
  {
    title: "Reporting Config",
    href: "/loan/reporting-config",
    icon: "ChartBarIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewReportingConfig",
    buttonName: "Create Report",
    placeholder: "Enter Name",
    navigateSuccess: "/loan/reporting-config/newConfig/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },
  {
    title: "Reports",
    href: "/loan/reports",
    icon: "NewspaperIcon",
    current: false,
  },
  {
    title: "Invoice Discounting",
    href: "/loan/invoice-discounting/registration",
    icon: "DocumentCurrencyRupeeIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Home",
        href: "/loan/invoice-discounting/registration",
        current: false,
      },
      {
        name: "Profile",
        href: "/loan/invoice-discounting/profile",
        current: false,
      },
      {
        name: "Manage Partner",
        href: "/loan/invoice-discounting/manage-partner",
        current: false,
      },
      {
        name: "Cash Payable",
        href: "/loan/invoice-discounting/cash-payable",
        current: false,
      },
      {
        name: "Cash Receivable",
        href: "/loan/invoice-discounting/cash-receivable",
        current: false,
      },
      {
        name: "Working Capital",
        href: "/loan/invoice-discounting/working-capital",
        current: false,
      },
      {
        name: "Project Finance",
        href: "/loan/invoice-discounting/project-finance",
        current: false,
      },
    ],
    isOpen: false,
  },
  {
    title: "LOS",
    href: "/loan/loan-origination-system",
    icon: "AtSymbolIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Borrowers",
        href: "/loan/loan-origination-system/borrowers",
        current: false,
      },
      {
        name: "Loans",
        href: "/loan/loan-origination-system/loans",
        current: false,
      },
      {
        name: "Repayments",
        href: "/loan/loan-origination-system/repayments",
        current: false,
      },
      // {
      //   name: "Cash Payable",
      //   href: "/loan/loan-origination-system/cash-payable",
      //   current: false,
      // },
      // {
      //   name: "Cash Receivable",
      //   href: "/loan/loan-origination-system/cash-receivable",
      //   current: false,
      // },
      // {
      //   name: "Working Capital",
      //   href: "/loan/loan-origination-system/working-capital",
      //   current: false,
      // },
      // {
      //   name: "Project Finance",
      //   href: "/loan/loan-origination-system/project-finance",
      //   current: false,
      // },
    ],
    isOpen: false,
  },
  {
    title: "Test Component",
    href: "/loan/test",
    icon: "BeakerIcon",
    current: false,
  },
];
