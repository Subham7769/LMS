import React, { useState, useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary";
import NotificationWindow from "../../Notifications/NotificationWindow";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toggleSidebar } from "../../../redux/Slices/sidebarSlice";
import HelpMenu from "./HelpMenu";
import UserMenu from "./UserMenu";
import InputSelect from "../InputSelect/InputSelect";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { setRole } from "../../../redux/Slices/authSlice";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { open } = useSelector((state) => state.sidebar);
  const [activeTab, setActiveTab] = useState("loan");
  const { roleData } = useSelector((state) => state.userManagement);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  // console.log(activeTab);

  const tabs = [
    {
      id: "/loan",
      path: `/loan/home`,
      label: "Loan",
    },
    {
      id: "/deposit",
      path: `/deposit/home`,
      label: "Deposit",
    },
  ];

  // Update activeTab based on the current route
  useEffect(() => {
    const active = tabs.find((tab) => location.pathname.startsWith(tab.id));
    if (active) {
      setActiveTab(active.id);
    }
  }, [location, tabs]);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    dispatch(setRole(selectedRole));
  };

  return (
    <header
      className="border-gray-200 dark:border-gray-500 border-b bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 sticky h-14 top-0 left-0 z-30 flex items-center justify-between"
      id="navBarId"
    >
      <div className="flex shrink-0 items-center lg:hidden">
        {!open && (
          <Bars3Icon
            className={`h-8 w-auto ml-5`}
            onClick={handleToggleSidebar}
          />
        )}
      </div>
      <div className="flex justify-center ">

      </div>
      <div className="px-3 lg:px-8 py-3 relative flex justify-end items-center gap-3 ">
        {localStorage.getItem("username") === "superadmin" && (
          <div className="hidden lg:block w-96">
            {/* Role Dropdown */}
            <InputSelect
              inputOptions={roleData.map((role) => ({
                label: convertToTitleCase(role.label),
                value: role.label,
              }))}
              inputValue={roleName}
              onChange={handleRoleChange}
              disabled={false}
            />
          </div>
        )}
        <ElementErrorBoundary>
          <NotificationWindow />
        </ElementErrorBoundary>
        <ElementErrorBoundary>
          <HelpMenu align="right" />
        </ElementErrorBoundary>
        <ElementErrorBoundary>
          <ThemeToggle />
        </ElementErrorBoundary>
        <ElementErrorBoundary>
          <UserMenu align="right" />
        </ElementErrorBoundary>
      </div>
    </header>
  );
};

// Now wrap the entire component with ElementErrorBoundary where it's being used
const WithErrorBoundary = (props) => {
  return (
    <ElementErrorBoundary>
      <Header {...props} />
    </ElementErrorBoundary>
  );
};

export default WithErrorBoundary;
