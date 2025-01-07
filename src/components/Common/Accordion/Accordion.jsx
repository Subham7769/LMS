import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Accordion = ({
  icon: Icon,
  heading,
  subHeading = "",
  renderExpandedContent,
  error = false,
  isOpen = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`border rounded-lg shadow-sm bg-gray-50 mb-3 hover:bg-indigo-50 ${
        isExpanded ? "bg-indigo-50" : ""
      }`}
    >
      <div
        className={`flex justify-between items-center px-4 py-4 cursor-pointer ${
          error ? `border-l-4 border-l-red-500 rounded-lg` : ""
        }`}
        onClick={toggleExpand}
      >
        <div className="flex gap-2 justify-start items-center ">
          {Icon && <Icon className="-ml-0.5 h-5 w-5" aria-hidden="true" />}
          <span className="font-medium text-gray-800">{heading}</span>
          <span className="text-xs text-gray-600">{subHeading}</span>
          {error && (
            <span className="text-xs text-red-500 px-2 py-1 bg-red-50 rounded-lg">
              Contains Error
            </span>
          )}
        </div>
        <button
          className="text-gray-600 hover:text-gray-800"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
      </div>
      {isExpanded && (
        <div className="px-4 py-4 bg-gray-50">{renderExpandedContent()}</div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  heading: PropTypes.node.isRequired, // The heading of the accordion (can be a string or JSX).
  renderExpandedContent: PropTypes.func.isRequired, // Function to render the content when expanded.
};

export default Accordion;
