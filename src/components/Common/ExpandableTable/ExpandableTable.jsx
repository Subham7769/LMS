import React, { useState } from "react";
import PropTypes from "prop-types";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import formatNumber from "../../../utils/formatNumber";

const ExpandableTable = ({
  ListName,
  ListNameLength,
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

  const centerAlignedFields = ["uniqueid", "userid", "emino", "aging"];
  // ${
  //   centerAlignedFields.includes(
  //     col.field.toLowerCase()
  //   )
  //     ? "text-center"
  //     : typeof rowData[col.field] === "number"
  //     ? "text-right"
  //     : "text-center"
  // }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700 rounded-xl relative mb-8">
      {ListName && (
        <header className="px-5 py-4">
          <h2 className={`font-semibold text-gray-800 dark:text-gray-100`}>
            {ListName}{" "}
            <span className="text-gray-400 dark:text-gray-500 font-medium">
              {ListNameLength}
            </span>
          </h2>
        </header>
      )}
      <div className="overflow-x-auto">
        <table className="table-auto w-full dark:text-gray-300">
          <thead className="text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className="p-4">
                  {col.label}
                </th>
              ))}
              {ListAction && <th className="p-4">Actions</th>}
              {renderExpandedRow && <th className="p-4"></th>}
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
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
                  <tr onClick={() => handleExpand(index)}>
                    {columns.map((col, index) => {
                      const getStatusClass = (status) => {
                        const normalizedStatus = status?.toLowerCase();
                        const statusClasses = {
                          in_progress: "bg-yellow-500/20 text-yellow-700",
                          pending: "bg-yellow-500/20 text-yellow-700",
                          new: "bg-yellow-500/20 text-yellow-700",
                          rejected: "bg-red-500/20 text-red-700",
                          defaulter: "bg-red-500/20 text-red-700",
                          defaulted: "bg-red-500/20 text-red-700",
                          "in progress": "bg-yellow-500/20 text-yellow-700",
                          deactivated: "bg-yellow-500/20 text-yellow-700",
                          late: "bg-yellow-500/20 text-yellow-700",
                          submitted: "bg-violet-500/20 text-violet-700",
                          "roll overed": "bg-violet-500/20 text-violet-700",
                          closed: "bg-gray-500/20 text-gray-700",
                          frozen: "bg-blue-500/20 text-blue-700",
                          cancel: "bg-red-500/20 text-red-700",
                          unpaid: "bg-yellow-500/20 text-yellow-700",
                        };

                        // Default class for unknown statuses
                        return (
                          Object.entries(statusClasses).find(([key]) =>
                            normalizedStatus?.includes(key)
                          )?.[1] || "bg-green-500/20 text-green-700"
                        );
                      };

                      const getAgingClass = (days) => {
                        if (days <= 2) return "bg-green-500/20 text-green-700";
                        if (days >= 3 && days <= 5)
                          return "bg-amber-500/20 text-amber-700";
                        if (days >= 6 && days <= 8)
                          return "bg-orange-500/20 text-orange-700";
                        if (days >= 9) return "bg-red-500/20 text-red-700";
                        return "";
                      };

                      const cellClass = col.field
                        .toLowerCase()
                        .includes("status")
                        ? getStatusClass(rowData[col.field])
                        : col.field.toLowerCase() === "aging"
                        ? getAgingClass(Number(rowData[col.field]))
                        : "";

                      return (
                        <td key={index} className={`max-w-28 break-words p-4 `}>
                          <span
                            className={`inline-block min-w-24 rounded-full font-medium px-2.5 py-0.5 ${cellClass}`}
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
                                      className={`whitespace-nowrap overflow-hidden text-ellipsis w-[75px]`}
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
                                ) : centerAlignedFields.includes(
                                    col.field.toLowerCase()
                                  ) ? (
                                  rowData[col.field]
                                ) : typeof rowData[col.field] === "number" ? (
                                  formatNumber(rowData[col.field])
                                ) : rowData[col.field] === "ACTIVATED" ? (
                                  "ACTIVE"
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
                      <td className="p-4">{ListAction(rowData)}</td>
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
                            expandedRow === index
                              ? "Collapse row"
                              : "Expand row"
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
