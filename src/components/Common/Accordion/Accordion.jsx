import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Accordion = ({
  icon: Icon,
  heading,
  subHeading = "",
  renderExpandedContent,
  error = false,
  isOpen = false,
  headerComponent,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/60 rounded-lg shadow-sm mb-3`}
    >
      <div
        className={`flex justify-between items-center px-4 py-4 cursor-pointer ${
          error ? `border-l-4 border-l-red-500 rounded-lg` : ""
        }`}
        onClick={toggleExpand}
      >
        {/* Heading Text */}
        {!headerComponent && (
          <div className="flex gap-2 justify-start items-center ">
            {Icon && <Icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
            <span className="font-medium text-gray-800 dark:text-gray-100">
              {heading}
            </span>
            <span className="text-xs text-gray-600">{subHeading}</span>
            {error && (
              <span className="text-xs text-red-500 px-2 py-1 bg-red-50 rounded-lg">
                Contains Error
              </span>
            )}
          </div>
        )}

        {/* Header Component */}
        {headerComponent && headerComponent}

        <button
          className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
      </div>
      {isExpanded && (
        <div className="px-2 first:pl-5 last:pr-5 py-3">
          <div className="bg-gray-50 dark:bg-gray-950/[0.15] dark:text-gray-400 p-3 -mt-3">
            {renderExpandedContent ? renderExpandedContent() : children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
