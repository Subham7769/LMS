import { BeakerIcon, RectangleGroupIcon } from "@heroicons/react/20/solid";
import {
  AdjustmentsHorizontalIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  UsersIcon,
  CircleStackIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

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
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Recovery",
    href: "/recovery",
    icon: RectangleGroupIcon,
    current: false,
    submenu: true,
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
    icon: ClipboardDocumentCheckIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { name: "TCL 1", href: "/tcl/1" },
      { name: "TCL 2", href: "/tcl/2" },
      { name: "TCL 3", href: "/tcl/3" },
    ],
    isOpen: false,
  },
  {
    title: "Project",
    href: "/project/loan-form",
    icon: CircleStackIcon,
    current: false,
    submenu: true,
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Product",
    href: "/product",
    icon: AdjustmentsHorizontalIcon,
    current: false,
    submenu: true,
    submenuItems: [],
    isOpen: false,
  },
  {
    title: "Group",
    href: "/group",
    icon: UsersIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { name: "Group 1", href: "/group/1" },
      { name: "Group 2", href: "/group/2" },
      { name: "Group 3", href: "/group/3" },
    ],
    isOpen: false,
  },
  {
    title: "Business Rule",
    href: "/business-rule/1",
    icon: UsersIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { name: "Business Rule 1", href: "/business-rule/1" },
      { name: "Business Rule 2", href: "/business-rule/2" },
      { name: "Business Rule 3", href: "/business-rule/3" },
    ],
    isOpen: false,
  },
  {
    title: "Global Config",
    href: "/global-config/cp",
    icon: Cog6ToothIcon,
    current: false,
    submenu: true,
    submenuItems: [
      { name: "Credit Policy", href: "/global-config/cp", current: false },
      {
        name: "Liabilities Matrix",
        href: "/global-config/liability-matrix",
        current: false,
      },
      {
        name: "Risk Grading",
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
    icon: UsersIcon,
    current: false,
  },
  { title: "New User", href: "/user", icon: UsersIcon, current: false },
  {
    title: "General Ledger",
    href: "/ledger",
    icon: BookOpenIcon,
    current: false,
  },
  // { title: "TestComponent", href: "/test", icon: BeakerIcon, current: false },
];
