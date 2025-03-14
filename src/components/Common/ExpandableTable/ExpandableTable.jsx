import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

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
        <div className="h-4 bg-background-light-primary rounded"></div>
        <div className="h-4 bg-background-light-primary rounded"></div>
        <div className="h-4 bg-background-light-primary rounded"></div>
        <div className="h-4 bg-background-light-primary rounded"></div>
      </div>
    );
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("ID was copied successfully!");
    } catch (err) {
      toast.error("The ID was not copied!");
    }
  };

  return (
    <div className="overflow-x-auto min-h-[5rem] max-h-full bg-white rounded-lg shadow-lg">
      <table className="min-w-full table-auto" role="table">
        <thead className={"sticky top-0 z-10"}>
          <tr className="bg-background-light-secondary text-sm font-semibold text-gray-600">
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
                  {columns.map((col, index) => {
                    const getStatusClass = (status) => {
                      const normalizedStatus = status?.toLowerCase();
                      const statusClasses = {
                        in_progress: "bg-yellow-100 text-yellow-800",
                        new: "bg-yellow-100 text-yellow-800",
                        rejected: "bg-red-100 text-red-800",
                        defaulter: "bg-red-100 text-red-800",
                        defaulted: "bg-red-100 text-red-800",
                        "in progress": "bg-yellow-100 text-yellow-800",
                        deactivated: "bg-yellow-100 text-yellow-800",
                        late: "bg-yellow-100 text-yellow-800",
                        submitted: "bg-violet-100 text-violet-800",
                        "roll overed": "bg-violet-100 text-violet-800",
                        closed: "bg-background-light-secondary text-gray-800",
                        frozen: "bg-blue-100 text-blue-800",
                        cancel: "bg-red-100 text-red-800",
                        unpaid: "bg-yellow-100 text-yellow-800",
                      };

                      // Default class for unknown statuses
                      return (
                        Object.entries(statusClasses).find(([key]) =>
                          normalizedStatus?.includes(key)
                        )?.[1] || "bg-green-100 text-green-800"
                      );
                    };

                    const getAgingClass = (days) => {
                      if (days <= 2) return "bg-green-100 text-green-800";
                      if (days >= 3 && days <= 5)
                        return "bg-amber-100 text-amber-800";
                      if (days >= 6 && days <= 8)
                        return "bg-orange-100 text-orange-800";
                      if (days >= 9) return "bg-red-100 text-red-800";
                      return "";
                    };

                    const cellClass = col.field.toLowerCase().includes("status")
                      ? getStatusClass(rowData[col.field])
                      : col.field.toLowerCase() === "aging"
                      ? getAgingClass(Number(rowData[col.field]))
                      : "";

                    return (
                      <td
                        key={index}
                        className="max-w-28 break-words py-6 text-sm text-center text-gray-800"
                      >
                        <span
                          className={`inline-block min-w-24 px-3 py-1 rounded-full text-xs font-medium ${cellClass}`}
                        >
                          {col.field.toLowerCase() === "aging" &&
                          rowData[col.field] !== undefined ? (
                            `${rowData[col.field]} Days`
                          ) : rowData[col.field] ? (
                            <div
                              className="flex items-center justify-center gap-2"
                              title={rowData[col.field]}
                            >
                              {rowData[col.field] && col.copy ? (
                                <>
                                  {/* Shortened display value */}
                                  <div
                                    className={` whitespace-nowrap overflow-hidden text-ellipsis w-[100px]`}
                                  >
                                    {rowData[col.field]}
                                  </div>
                                  <ClipboardDocumentListIcon
                                    className="h-5 w-5 cursor-pointer text-gray-500 hover:text-black"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      copyToClipboard(rowData[col.field]);
                                    }}
                                  />
                                </>
                              ) : (
                                rowData[col.field]
                              )}
                            </div>
                          ) : (
                            "-"
                          )}
                        </span>
                      </td>
                    );
                  })}

                  {ListAction && (
                    <td className="flex justify-center items-center py-6">
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
                  <tr className="">
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
