import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const ExpandableTable = ({
  columns,
  data,
  renderExpandedRow,
  ListAction = null,
  ActionId = null,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpand = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto" role="table">
        <thead>
          <tr className="bg-gray-100 text-sm font-semibold text-gray-600">
            <th className="px-4 py-6"></th>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-4">
                {col.label}
              </th>
            ))}
            {ListAction && <th className="px-4 py-4">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((rowData, index) => (
            <React.Fragment key={index}>
              <tr
                className="hover:bg-gray-50 cursor-pointer text-xs font-medium"
                onClick={() => handleExpand(index)}
              >
                <td className=" flex justify-center items-center  py-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleExpand(index);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={
                      expandedRow === index ? "Collapse row" : "Expand row"
                    }
                  >
                    {expandedRow === index ? (
                      <FiChevronUp size={18} />
                    ) : (
                      <FiChevronDown size={18} />
                    )}
                  </button>
                </td>
                {columns.map((col, index) => (
                  <td
                    key={index}
                    className="px-4 py-6 text-sm text-center text-gray-800"
                  >
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        col.field.toLowerCase().includes("status") &&
                        (rowData[col.field] === "rejected"
                          ? "bg-red-100 text-red-800"
                          : rowData[col.field] === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800")
                      }`}
                    >
                      {rowData[col.field]}
                    </span>
                  </td>
                ))}
                {ListAction && (
                  <ListAction
                    id={
                      columns.map((col, index) => {
                        if(col.field === ActionId) 
                          return rowData[col.field];
                      })[0]
                    }
                    application={data}
                  />
                )}
              </tr>
              {expandedRow === index && (
                <tr className="bg-gray-50">
                  <td
                    colSpan={
                      ListAction ? columns.length + 2 : columns.length + 1
                    }
                    className="px-4 py-5"
                  >
                    {renderExpandedRow(rowData)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ExpandableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  renderExpandedRow: PropTypes.func.isRequired,
};

export default ExpandableTable;
