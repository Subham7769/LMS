import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { convertDate } from "../../utils/convertDate";
import SectionErrorBoundary from "../ErrorBoundary/SectionErrorBoundary";
import { removeSlashes } from "../../utils/removeSlashes";
import Button from "../Common/Button/Button";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import exportToExcel from "../../utils/exportToExcel";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputSelect from "../Common/InputSelect/InputSelect";
import convertToTitleCase from "../../utils/convertToTitleCase";

const LedgerListTable = ({
  ListName,
  ListHeader,
  ListItem,
  loading,
  error,
}) => {
  const tableRef = useRef(null);
  const paginationRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(ListItem);
  const [borrowerIdQuery, setBorrowerIdQuery] = useState("");

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const selectOptions = [
    { value: 1, label: "1 entry" },
    { value: 2, label: "2 entry" },
    { value: 5, label: "5 entries" },
    { value: 10, label: "10 entries" },
    { value: 20, label: "20 entries" },
    { value: 50, label: "50 entries" },
    { value: 100, label: "100 entries" },
  ];

  useEffect(() => {
    const adjustPaginationWidth = () => {
      if (tableRef.current && paginationRef.current) {
        paginationRef.current.style.width = `${tableRef.current.offsetWidth}px`;
      }
    };

    adjustPaginationWidth();
    window.addEventListener("resize", adjustPaginationWidth);
    return () => window.removeEventListener("resize", adjustPaginationWidth);
  }, []);

  useEffect(() => {
    var borrowerIdQueryWithoutSlash = "";
    if (borrowerIdQuery !== false)
      borrowerIdQueryWithoutSlash = removeSlashes(borrowerIdQuery);

    setFilteredData(
      ListItem.filter((entry) =>
        entry.userId.toString().includes(borrowerIdQueryWithoutSlash)
      )
    );
    setCurrentPage(1);
  }, [borrowerIdQuery, ListItem]);

  const handlePageSizeChange = (selectedOption) => {
    setPageSize(selectedOption.target.value);
    setCurrentPage(1); // Reset to first page when page size changes
  };

  const Content = () => (
    <table className="table-auto w-full dark:text-gray-300" ref={tableRef}>
      <thead className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20 border-t border-b border-gray-100 dark:border-gray-700/60">
        <tr>
          {ListHeader.map((header, index) => (
            <th key={index} scope="col" className="px-4 py-4 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-700/60">
        {currentData.length !== 0 ? (
          currentData.map((item, index) => (
            <React.Fragment key={index}>
              {item.accounts.map((accountItem, idx) => (
                <tr key={`${item.id}-${idx}`}>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {convertDate(accountItem?.transactionDate)}
                  </td>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {accountItem?.entryId}
                  </td>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {convertToTitleCase(accountItem?.entryName)}
                  </td>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {item?.loanId}
                  </td>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {item?.userId}
                  </td>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {accountItem?.debitValue === 0
                      ? "-"
                      : accountItem?.debitValue}
                  </td>
                  <td className=" whitespace-nowrap px-4 py-4">
                    {accountItem?.creditValue === 0
                      ? "-"
                      : accountItem?.creditValue}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))
        ) : (
          <tr>
            <td
              colSpan={ListHeader.length}
              className=" whitespace-nowrap px-4 py-4"
            >
              No Data Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const ShimmerTable = () => {
    return (
      <div className="grid grid-cols-4 gap-4 animate-pulse">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
      </div>
    );
  };

  // Define the mapping for Account data excel file fields
  const accountExportMapping = {
    date: "Date",
    entryId: "Entry ID",
    entryName: "Entry Name",
    loanId: "Loan ID",
    borrowerId: "Borrower ID",
    debitAmount: "Debit Amount",
    creditAmount: "Credit Amount",
  };

  console.log(currentData);

  const flattenAccountEntries = (data) => {
    return data.flatMap((item) => {
      const { userId, loanId, accounts } = item;

      return accounts.map((account) => ({
        date: new Date(account.transactionDate).toLocaleDateString(),
        entryId: account.entryId,
        entryName: account.entryName,
        loanId: loanId,
        borrowerId: userId,
        debitAmount: account.debitValue === 0 ? "" : account.debitValue,
        creditAmount: account.creditValue === 0 ? "" : account.creditValue,
      }));
    });
  };

  return (
    <>
      <ContainerTile loading={loading} className={"p-5"} error={error}>
        <div className="sm:flex justify-between items-center mb-5">
          <div className="flex gap-4 mb-5 sm:w-1/2">
            <div className="">
              <label htmlFor="search" className="sr-only">
                Search by Borrower ID
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  type="search"
                  name="search"
                  className="form-input w-full py-2 pl-10 pr-3"
                  placeholder="Enter Borrower ID"
                  value={borrowerIdQuery}
                  onChange={(e) => setBorrowerIdQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-40">
              <InputSelect
                inputOptions={selectOptions}
                inputValue={pageSize}
                // defaultValue={{ value: 10, label: "10 entries" }}
                onChange={handlePageSizeChange}
              />
            </div>
          </div>
          {currentData.length > 0 && (
            <div className="flex justify-end">
              <Button
                buttonName={"Export Excel"}
                onClick={() => {
                  const flatData = flattenAccountEntries(currentData);
                  exportToExcel(
                    flatData,
                    accountExportMapping,
                    "General_Ledger_Data.xlsx"
                  );
                }}
                rectangle={true}
                buttonIcon={DocumentArrowDownIcon}
                // buttonType="tertiary"
              />
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 shadow-md border dark:border-gray-700 rounded-xl relative mb-8">
          <header className="px-5 py-4">
            <h2 className={`font-semibold text-gray-800 dark:text-gray-100`}>
              {ListName}{" "}
            </h2>
          </header>
          <div className="overflow-x-auto">
            <SectionErrorBoundary>
              <Content />
            </SectionErrorBoundary>
          </div>
        </div>

        {/* Pagination */}
        {currentData.length !== 0 ? (
          <div
            ref={paginationRef}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <nav
              className="mb-4 sm:mb-0 sm:order-1"
              role="navigation"
              aria-label="Navigation"
            >
              <ul className="flex justify-center">
                <li className="ml-3 first:ml-0">
                  <Button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    buttonType="secondary"
                    buttonName="&lt;- Previous"
                  />
                </li>
                <li className="ml-3 first:ml-0">
                  <Button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    buttonType="secondary"
                    buttonName="Next -&gt;"
                    className="min-w-[100px]"
                  />
                </li>
              </ul>
            </nav>
            <div className="text-sm text-gray-500 text-center sm:text-left">
              Showing page{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {totalPages}
              </span>{" "}
            </div>
          </div>
        ) : null}
      </ContainerTile>
    </>
  );
};

export default LedgerListTable;
