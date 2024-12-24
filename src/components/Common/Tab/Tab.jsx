import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ id, label, activeTab, setActiveTab, to }) => (
  <li className="me-2">
    <Link
      to={to}
      className={`inline-block p-4 border-b-4 rounded-t-lg ${
        activeTab === id
          ? "text-indigo-500 border-indigo-500 bg-indigo-50"
          : "border-transparent text-gray-950 hover:text-gray-600 hover:border-gray-300 "
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </Link>
  </li>
);

export default Tab;
