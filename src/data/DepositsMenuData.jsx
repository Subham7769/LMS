export const MenusInitial = [
  {
    title: "Home",
    href: "/deposit/home",
    icon: "HomeIcon",
    count: "5",
    current: true,
  },
  {
    title: "Savings",
    href: "/deposit/savings/create-account",
    icon: "BriefcaseIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Create Account",
        href: "/deposit/savings/create-account",
        current: false,
      },
      {
        name: "Accounts",
        href: "/deposit/savings/accounts",
        current: false,
      },
    ],
    isOpen: false,
  },
];
