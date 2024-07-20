import {
  RectangleGroupIcon,
  ArrowPathRoundedSquareIcon,
  ChartPieIcon,
  CubeIcon,
  CurrencyRupeeIcon,
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  UsersIcon,
  BookOpenIcon,
  HeartIcon,
  CalculatorIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";
import { createNewRac } from "../utils/createNewRac";
import { createNewProduct } from "../utils/createNewProduct";
import { createNewRecovery } from "../utils/createNewRecovery";
import { createNewProductGroup } from "../utils/createNewProductGroup";
import { CreditCardIcon, NoSymbolIcon } from "@heroicons/react/20/solid";
import { createNewDBC } from "../utils/createNewDBC";
import { createNewBE } from "../utils/createNewBE";
import { createNewCreditScoreEq } from "../utils/createNewCreditScoreEq";
import { createNewRulePolicy } from "../utils/createNewRulePolicy";
import { createNewTCL } from "../utils/createNewTCL";

export const MenusInitial = [
  {
    title: "Home",
    href: "/",
    icon: HomeIcon,
    count: "5",
    current: true,
  },
  {
    title: "RAC",
    href: "/rac",
    icon: ClipboardDocumentCheckIcon,
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewRac, //Create function
    buttonName: "Create RAC", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/newrac/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Recovery",
    href: "/recovery",
    icon: ArrowPathRoundedSquareIcon,
    current: false,
    submenu: true,
    createButton: true, //if create recovery from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewRecovery, //Create function
    buttonName: "Create Recovery", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/recovery/new/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [
      { name: "Recovery 1", href: "/recovery/1" },
      { name: "Recovery 2", href: "/recovery/2" },
      { name: "Recovery 3", href: "/recovery/3" },
    ],
    isOpen: false,
  },
  {
    title: "TCL",
    href: "/tcl",
    icon: CurrencyRupeeIcon,
    current: false,
    submenu: true,
    createButton: true, //if create TCL from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewTCL, //Create function
    buttonName: "Create TCL", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/tcl/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [
    ],
    isOpen: false,
  },
  {
    title: "Project",
    href: "/project/projectPage", //previous -> "/project/loan-form"
    icon: ChartPieIcon,
    current: false,
    submenu: true,
    createButton: true, //if create project from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewProduct, //Create function
    buttonName: "Create Project", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/project/newProject/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Product",
    href: "/product",
    icon: CubeIcon,
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewProduct, //Create function
    buttonName: "Create Product", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/create-product/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "DBR Config",
    href: "/dbc",
    icon: CreditCardIcon,
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewDBC, //Create function
    buttonName: "Create DBR", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/newdbc/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Blocked Employer",
    href: "/blocked-employer",
    icon: NoSymbolIcon,
    current: false,
    submenu: true,
    createButton: true, //if create RAC from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewBE, //Create function
    buttonName: "Create BE", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/blocked-employer/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Credit Score",
    href: "/credit-score",
    icon: CalculatorIcon,
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewCreditScoreEq, //Create function
    buttonName: "Create Credit Score", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/credit-score/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Rule Policy",
    href: "/rule-policy",
    icon: ClipboardDocumentListIcon,
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewRulePolicy, //Create function
    buttonName: "Create Rule Policy", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/rule-policy/", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Product Group",
    href: "/product_group",
    icon: RectangleGroupIcon,
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: true, //if Button takes input string
    createFunction: createNewProductGroup, //Create function
    buttonName: "Create Group", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "group/newGroup", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [
      { name: "Group 1", href: "/group/Group 1" },
      { name: "Group 2", href: "/group/Group 2" },
      { name: "Group 3", href: "/group/Group 3" },
    ],
    isOpen: false,
  },
  {
    title: "Business Rule",
    href: "/business-rule/1",
    icon: AdjustmentsHorizontalIcon,
    current: false,
    submenu: true,
    createButton: true, //if create product from Side bar Using input box
    editable: false, //if Button takes input string
    createFunction: null, //Create function
    buttonName: "Create Rule", //Create button text
    placeholder: "Enter Name", //required placeholder for input box
    navigateSuccess: "/business-rule/1", // navigation
    navigateFail: "/login", // navigation
    submenuItems: [
      { name: "Business Rule 1", href: "/business-rule/1" },
      { name: "Business Rule 2", href: "/business-rule/2" },
      { name: "Business Rule 3", href: "/business-rule/3" },
    ],
    isOpen: false,
  },
  {
    title: "Global Config",
    href: "/global-config",
    icon: Cog6ToothIcon,
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Liabilities Matrix",
        href: "/global-config/liability-matrix",
        current: false,
      },
      {
        name: "Risk Grading Matrix",
        href: "/global-config/risk-grade-cal",
        current: false,
      },
      {
        name: "Minimum Expense",
        href: "/global-config/bare-min-exp",
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
    icon: HeartIcon,
    current: false,
  },
  {
    title: "User Product Testing",
    href: "/user",
    icon: UsersIcon,
    current: false,
  },
  {
    title: "General Ledger",
    href: "/ledger",
    icon: BookOpenIcon,
    current: false,
  },
  // { title: "TestComponent", href: "/test", icon: BeakerIcon, current: false },
];
