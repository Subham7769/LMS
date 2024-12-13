export const MenusInitial = [
  {
    title: "Home",
    href: "/deposit",
    icon: "HomeIcon",
    count: "5",
    current: true,
  },
  {
    title: "Save",
    href: "/deposit/save/create-account",
    icon: "HandRaisedIcon",
    current: false,
    submenu: true,
    submenuItems: [
      {
        name: "Create Account",
        href: "/deposit/save/create-account",
        current: false,
      },
      {
        name: "Accounts",
        href: "/deposit/save/accounts",
        current: false,
      },
    ],
    isOpen: false,
  },
];
