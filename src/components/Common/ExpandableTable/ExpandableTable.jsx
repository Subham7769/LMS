import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

const ExpandableTable = ({
  columns,
  data,
  renderExpandedRow = null,
  ListAction = null,
  ActionId = null,
  loading = false,
  error = false,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const handleExpand = (id) => {
    if (renderExpandedRow) setExpandedRow((prev) => (prev === id ? null : id));
  };
  const ShimmerTable = () => {
    return (
      <div className="grid grid-cols-4 gap-4 animate-pulse">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto min-h-[5rem] max-h-full bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto" role="table">
        <thead className={"sticky top-0 z-10"}>
          <tr className="bg-gray-100 text-sm font-semibold text-gray-600">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-4">
                {col.label}
              </th>
            ))}
            {ListAction && <th className="px-4 py-4">Actions</th>}
            {renderExpandedRow && <th className="px-4 py-4"></th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + (ListAction ? 2 : 1)}>
                <div className="flex flex-col gap-4 pb-8 pt-6 px-5 mt-3">
                  <ShimmerTable />
                  <ShimmerTable />
                  <ShimmerTable />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((rowData, index) => (
              <React.Fragment key={index}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer text-xs font-medium"
                  onClick={() => handleExpand(index)}
                >
                  {columns.map((col, index) => (
                    <td
                      key={index}
                      className="max-w-28 break-words py-6 text-sm text-center text-gray-800"
                    >
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          col.field.toLowerCase().includes("status") &&
                          (rowData[col.field].toLowerCase() === "rejected" ||
                          rowData[col.field] === "DEFAULTER" ||
                          rowData[col.field] === "Cancel"
                            ? "bg-red-100 text-red-800"
                            : rowData[col.field] === "In Progress" ||
                              rowData[col.field] === "DEACTIVATED"
                            ? "bg-yellow-100 text-yellow-800"
                            : rowData[col.field] === "Submitted"
                            ? "bg-violet-100 text-violet-800"
                            : "bg-green-100 text-green-800")
                        }`}
                      >
                        {rowData[col.field] ?? "-"}
                      </span>
                    </td>
                  ))}
                  {/* {ListAction && (
                    <ListAction
                      id={
                        columns.map((col, index) => {
                          if (col.field === ActionId) return rowData[col.field];
                        })[0]
                      }
                      application={data}
                    />
                  )} */}
                  {ListAction && (
                    <td className="flex justify-center items-center ">
                      {ListAction(rowData)}
                    </td>
                  )}
                  {renderExpandedRow && (
                    <td className="max-w-28 break-words py-6 text-sm text-center text-gray-800">
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
            ))
          ) : (
            <>
              <tr>
                <td colSpan={columns.length + (ListAction ? 2 : 1)}>
                  <div className="text-center my-2">No Data found</div>
                </td>
              </tr>
            </>
          )}
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
