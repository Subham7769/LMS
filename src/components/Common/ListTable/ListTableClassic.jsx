import React from "react";

const ListTableClassic = ({
  ListName,
  ListNameLength,
  ListHeader,
  children,
  handleSort,
  getSortIcon,
}) => {
  return (
    <>
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
            <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
              <tr>
                {ListHeader.map((column, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-4 py-4 text-left ${
                      column.sortKey ? "cursor-pointer" : ""
                    }`}
                    onClick={
                      column.sortKey
                        ? () => handleSort(column.sortKey)
                        : undefined
                    }
                  >
                    <div className={`flex items-center`}>
                      {column.name}
                      {column.sortKey && getSortIcon(column.sortKey)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
              {ListNameLength < 1 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Data To Show Yet
                  </td>
                </tr>
              ) : (
                children
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListTableClassic;
