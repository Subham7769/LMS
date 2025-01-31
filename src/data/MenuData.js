export const MenusInitial = [
  {
    title: "Home",
    href: "/",
    icon: "HomeIcon",
    count: "5",
    current: true,
  },
  {
    title: "RAC",
    href: "/rac",
    icon: "ClipboardDocumentCheckIcon",
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewRac",
    buttonName: "Create RAC", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/rac/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "racId",
  },
  {
    title: "Recovery",
    href: "/recovery",
    icon: "ArrowPathRoundedSquareIcon",
    current: false,
    submenu: true,
    createButton: true, //if create recovery from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewRecovery",
    buttonName: "Create Recovery", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/recovery/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "recoveryEquationTempId",
  },
  {
    title: "TCL",
    href: "/tcl",
    icon: "CurrencyRupeeIcon",
    current: false,
    submenu: true,
    createButton: true, //if create TCL from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewTCL",
    buttonName: "Create TCL", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/tcl/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "tclFileId",
  },
  {
    title: "Project",
    href: "/project", //previous -> "/project/loan-form"
    icon: "ChartPieIcon",
    current: false,
    submenu: true,
    createButton: true, //if create project from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProject",
    buttonName: "Create Project", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/project/newProject/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "projectId",
  },
  {
    title: "Product",
    href: "/product",
    icon: "CubeIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProduct",
    buttonName: "Create Product", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "product/newProduct/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Eligible Tenure",
    href: "/credit-score-eligible-tenure",
    icon: "CalculatorIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewCreditScoreET", //Create function
    buttonName: "Create New Tenure", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/credit-score-eligible-tenure/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "creditScoreEtTempId",
  },
  {
    title: "DBR Config",
    href: "/dbr-config",
    icon: "CreditCardIcon",
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewDBC",
    buttonName: "Create DBR", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/dbr-config/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "dbcTempId",
  },
  {
    title: "Blocked Employer",
    href: "/blocked-employer",
    icon: "NoSymbolIcon",
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewBE",
    buttonName: "Create BE", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/blocked-employer/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "blockEmployersTempId",
  },
  {
    title: "Credit Score",
    href: "/credit-score",
    icon: "CalculatorIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewCreditScoreEq",
    buttonName: "Create Credit Score", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/credit-score/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "creditScoreEqTempId",
  },
  {
    title: "Rule Policy",
    href: "/rule-policy",
    icon: "ClipboardDocumentListIcon",
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewRulePolicy",
    buttonName: "Create Rule Policy", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/rule-policy/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
    uniqueKey: "rulePolicyTempId",
  },
  {
    title: "Product Group",
    href: "/product-group",
    icon: "RectangleGroupIcon",
    current: false,
    submenu: true,
    createButton: false, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: "createNewProductGroup",
    buttonName: "Create Group", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/product-group/newProductGroup/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Business Rule",
    href: "/business-rule/1",
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
      { name: "Business Rule 3", href: "/business-rule/3" },
    ],
    isOpen: false,
  },
  {
    title: "Global Config",
    href: "/global-config/liabilities-matrix",
    icon: "Cog6ToothIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Liabilities Matrix",
        href: "/global-config/liabilities-matrix",
        current: false,
      },
      {
        name: "Risk Grading Matrix",
        href: "/global-config/risk-grading-matrix",
        current: false,
      },
      {
        name: "Minimum Expense",
        href: "/global-config/min-expense",
        current: false,
      },
      {
        name: "Notification Text",
        href: "/global-config/notification-text",
        current: false,
      },
    ],
    isOpen: false,
  },
  {
    title: "Customer Care",
    href: "/customer-care",
    icon: "HeartIcon",
    current: false,
  },
  {
    title: "User Product Testing",
    href: "/user-product-testing",
    icon: "HandRaisedIcon",
    current: false,
  },
  {
    title: "Overdraft Loan Offers",
    href: "/overdraft-loan-offers",
    icon: "MinusCircleIcon",
    current: false,
  },
  {
    title: "General Ledger",
    href: "/general-ledger",
    icon: "BookOpenIcon",
    current: false,
  },
  {
    title: "User Management",
    href: "/user-management",
    icon: "UserGroupIcon",
    current: false,
  },
  {
    title: "Dynamic RAC",
    href: "/dynamic-rac",
    icon: "ClipboardDocumentCheckIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewDynamicRac",
    buttonName: "Create RAC",
    placeholder: "Enter Name",
    navigateSuccess: "/dynamic-rac/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },
  {
    title: "Reporting Config",
    href: "/reporting-config",
    icon: "ChartBarIcon",
    submenu: true,
    createButton: true,
    editable: true,
    createFunction: "createNewReportingConfig",
    buttonName: "Create Report",
    placeholder: "Enter Name",
    navigateSuccess: "/reporting-config/newConfig/",
    navigateFail: "/login",
    submenuItems: [],
    isOpen: false,
    current: false,
  },

  {
    title: "Reports",
    href: "/reports",
    icon: "NewspaperIcon",
    current: false,
  },
  {
    title: "Invoice Discounting",
    href: "/invoice-discounting/registration",
    icon: "DocumentCurrencyRupeeIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Home",
        href: "/invoice-discounting/registration",
        current: false,
      },
      {
        name: "Profile",
        href: "/invoice-discounting/profile",
        current: false,
      },
      {
        name: "Cash Payable",
        href: "/invoice-discounting/cash-payable",
        current: false,
      },
      {
        name: "Cash Receivable",
        href: "/invoice-discounting/cash-receivable",
        current: false,
      },
      {
        name: "Working Capital",
        href: "/invoice-discounting/working-capital",
        current: false,
      },
      {
        name: "Project Finance",
        href: "/invoice-discounting/project-finance",
        current: false,
      },
    ],
    isOpen: false,
  },
  // {
  //   title: "Test Component",
  //   href: "/test",
  //   icon: "BeakerIcon",
  //   current: false,
  // },
];
