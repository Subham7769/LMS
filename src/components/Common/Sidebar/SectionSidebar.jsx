import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const SectionSidebar = ({ navItems, basePath }) => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto px-3 py-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700/60 min-w-[13rem] md:space-y-3">
      {/* Group 1 */}
      <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
        {navItems.map(({ label, path, ButtonIcon }, index) => {
          const fullPath = `${basePath}${path}`;
          const isActive = pathname.includes(path);
          return (
            <li key={index} className="mr-0.5 md:mr-0 md:mb-0.5">
              <NavLink
                end
                to={fullPath}
                className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${
                  isActive &&
                  "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
                }`}
              >
                {ButtonIcon && (
                  <ButtonIcon
                    className={`mr-2 h-5 w-5 ${
                      isActive
                        ? "text-violet-500 dark:text-violet-400"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-sm font-medium ${
                    isActive
                      ? "text-violet-500 dark:text-violet-400"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {label}
                </span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SectionSidebar;
