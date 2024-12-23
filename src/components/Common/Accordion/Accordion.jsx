import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const Accordion = ({ heading, renderExpandedContent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white mb-4">
      <div
        className="flex justify-between items-center px-4 py-4 cursor-pointer"
        onClick={toggleExpand}
      >
        <span className="font-medium text-gray-800">{heading}</span>
        <button
          className="text-gray-600 hover:text-gray-800"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
        </button>
      </div>
      {isExpanded && (
        <div className="px-4 py-4 bg-gray-100">{renderExpandedContent()}</div>
      )}
    </div>
  );
};

Accordion.propTypes = {
  heading: PropTypes.node.isRequired, // The heading of the accordion (can be a string or JSX).
  renderExpandedContent: PropTypes.func.isRequired, // Function to render the content when expanded.
};

export default Accordion;
