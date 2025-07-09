import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ tabs, activeTab, setActiveTab }) => (
  <div className="relative mb-8">
    <div
      className="absolute bottom-0 w-full h-px bg-gray-200 dark:bg-gray-700/60"
      aria-hidden="true"
    ></div>
    <ul className="relative text-sm font-medium flex flex-nowrap -mx-4 sm:-mx-6 lg:-mx-8 overflow-x-scroll no-scrollbar">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className="mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8"
        >
          <Link
            to={tab.path}
            className={`block pb-3 whitespace-nowrap ${
              activeTab === tab.id
                ? "text-violet-500 border-violet-500 border-b-2"
                : " text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Tab;
