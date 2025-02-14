import React from "react";
import { Link } from "react-router-dom";

const Tab = ({ id, label, activeTab, setActiveTab, to }) => (
  <li className="me-2">
    <Link
      to={to}
      className={`inline-block p-4 border-b-4 rounded-t-lg ${
        activeTab === id
          ? "text-violet-primary border-violet-primary bg-violet-tertiary"
          : "border-transparent text-gray-950 hover:text-gray-600 hover:border-border-gray-primary hover:bg-background-light-secondary"
      }`}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </Link>
  </li>
);

export default Tab;
