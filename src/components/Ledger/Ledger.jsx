import React, { useState, useEffect, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Select from "react-select";

// const ledgerarr = Array.from({ length: 100 }, (_, index) => {
//   const getRandomInt = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1)) + min;
//   const randomDate = (start, end) => {
//     const date = new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//     return `${date.getDate()} ${date.toLocaleString("default", {
//       month: "short",
//     })} ${date.getFullYear()}`;
//   };

//   const randomId = () => Math.random().toString(36).substr(2, 16);
//   const randomLoanId = () =>
//     `${randomId()}-eb55-44cb-be73-0403883e${getRandomInt(1000, 9999)}`;
//   const randomTransactionId = () => (Math.random() > 0.5 ? randomId() : null);
//   const randomAccount = () => {
//     const accountNames = [
//       "CASH_IN_BANK",
//       "DAYS_PAST_DUE",
//       "EARNED_INTEREST",
//       "EARNED_PRINCIPAL",
//     ];
//     const accountCodes = ["1002", "1004", "1003"];
//     const accountName = accountNames[getRandomInt(0, accountNames.length - 1)];
//     const accountCode = accountCodes[getRandomInt(0, accountCodes.length - 1)];
//     const debitValue = Math.random() > 0.5 ? getRandomInt(0, 5000) : 0;
//     const creditValue = debitValue === 0 ? getRandomInt(0, 5000) : 0;

//     return {
//       accountName,
//       accountCode,
//       debitValue,
//       creditValue,
//     };
//   };

//   return {
//     id: randomId(),
//     userId: getRandomInt(1000000000, 1999999999).toString(),
//     loanId: randomLoanId(),
//     transactionId: randomTransactionId(),
//     transactionDate: randomTransactionId()
//       ? randomDate(new Date(2023, 0, 1), new Date(2024, 5, 30))
//       : null,
//     date: randomDate(new Date(2024, 0, 1), new Date(2024, 5, 30)),
//     account: Array.from({ length: getRandomInt(1, 3) }, randomAccount),
//   };
// });

const ledgerarr = [
  {
    id: "666c7ca699ba1348a3e1c029",
    userId: "1055533324",
    loanId: "59562361-eb55-44cb-be73-0403883e8536",
    transactionId: null,
    transactionDate: null,
    date: "14 Jun 2024",
    account: [
      {
        accountName: "CASH_IN_BANK",
        accountCode: "1002",
        debitValue: 0,
        creditValue: 4944.5,
      },
      {
        accountName: "DAYS_PAST_DUE",
        accountCode: "1004",
        debitValue: 4000,
        creditValue: 0,
      },
      {
        accountName: "DAYS_PAST_DUE",
        accountCode: "1004",
        debitValue: 944.5,
        creditValue: 0,
      },
    ],
  },
  {
    id: "666c7ca699ba1348a3e1c029",
    userId: "1055533325",
    loanId: "59562361-eb55-44cb-be73-0403883e8537",
    transactionId: null,
    transactionDate: null,
    date: "15 Jun 2024",
    account: [
      {
        accountName: "DAYS_PAST_DUE",
        accountCode: "1004",
        debitValue: 150,
        creditValue: 0,
      },
      {
        accountName: "EARNED_INTEREST",
        accountCode: "1002",
        debitValue: 0,
        creditValue: 100,
      },
      {
        accountName: "EARNED_PRINCIPAL",
        accountCode: "1003",
        debitValue: 0,
        creditValue: 50,
      },
    ],
  },
];

const Ledger = () => {
  const tableRef = useRef(null);
  const paginationRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filteredData, setFilteredData] = useState(ledgerarr);
  const [entryIdQuery, setEntryIdQuery] = useState("");
  const [borrowerIdQuery, setBorrowerIdQuery] = useState("");

  useEffect(() => {
    const adjustPaginationWidth = () => {
      if (tableRef.current && paginationRef.current) {
        const tableWidth = tableRef.current.offsetWidth;
        paginationRef.current.style.width = `${tableWidth}px`;
      }
    };

    adjustPaginationWidth();
    window.addEventListener("resize", adjustPaginationWidth);

    return () => {
      window.removeEventListener("resize", adjustPaginationWidth);
    };
  }, []);

  // Filter by Entry ID
  useEffect(() => {
    const result = ledgerarr.filter((entry) =>
      entry.account.some((acc) => acc.accountCode.includes(entryIdQuery))
    );
    setFilteredData(result);
  }, [entryIdQuery]);

  // Filter by Borrower ID
  useEffect(() => {
    const result = ledgerarr.filter((entry) =>
      entry.userId.toString().includes(borrowerIdQuery)
    );
    setFilteredData(result);
  }, [borrowerIdQuery]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = filteredData.slice(startIndex, startIndex + pageSize);

  const handlePageSizeChange = (selectedOption) => {
    setPageSize(selectedOption.value);
    setCurrentPage(1);
  };

  // Handle entry ID search change
  const handleEntryIdChange = (event) => {
    setEntryIdQuery(event.target.value);
    setCurrentPage(1);
  };

  // Handle borrower ID search change
  const handleBorrowerIdChange = (event) => {
    setBorrowerIdQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="flex justify-start gap-5 items-center mb-4">
        {/* <div className="flex flex-col">
          <label htmlFor="entryId" className="mb-1 text-gray-700">
            Search by Entry ID
          </label>
          <input
            id="entryId"
            type="text"
            placeholder="Enter Entry ID"
            value={entryIdQuery}
            onChange={handleEntryIdChange}
            className="block rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div> */}
        <div className="flex flex-col">
          <label htmlFor="borrowerId" className="mb-1 text-gray-700">
            Search by Borrower ID
          </label>
          <input
            id="borrowerId"
            type="text"
            placeholder="Enter Borrower ID"
            value={borrowerIdQuery}
            onChange={handleBorrowerIdChange}
            className="block rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="entriesSelect" className="mb-1 text-gray-700">
            Entries Per Page
          </label>
          <Select
            id="entriesSelect"
            options={[
              { value: 5, label: "5 entries" },
              { value: 10, label: "10 entries" },
              { value: 20, label: "20 entries" },
              { value: 50, label: "50 entries" },
              { value: 100, label: "100 entries" },
            ]}
            defaultValue={{ value: 10, label: "10 entries" }}
            onChange={handlePageSizeChange}
            className="w-40"
            isSearchable={false}
            isMulti={false}
          />
        </div>
      </div>
      <table ref={tableRef} className="divide-y divide-gray-300">
        <thead>
          <tr className="divide-x divide-gray-200">
            <th className="py-3.5 px-4 text-center">Date</th>
            <th className="py-3.5 px-4 text-center">Entry ID</th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Entry Name
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Borrower ID
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">Loan ID</th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Debit Amount
            </th>
            <th className="py-3.5 px-4 text-center text-gray-900">
              Credit Amount
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {currentData.length === 0 ? (
            <tr className="divide-x divide-gray-200 text-center w-full">
              <td colSpan="8" className="text-center py-4">
                No data available
              </td>
            </tr>
          ) : (
            currentData.map((entry, index) => (
              <React.Fragment key={index}>
                {entry.account
                  .sort((a, b) => (a.debitValue !== 0 ? -1 : 1))
                  .map((acc, subIndex) => (
                    <tr
                      key={subIndex}
                      className="divide-x divide-gray-200 text-center w-full"
                    >
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {entry.date}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {acc.accountCode}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {acc.accountName.replace(/_/g, " ")}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {entry.userId}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {entry.loanId}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {acc.debitValue !== 0
                            ? acc.debitValue.toFixed(2)
                            : "-"}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-4 px-4 text-gray-500">
                        <div className="mx-auto white-space-nowrap overflow-hidden text-ellipsis">
                          {acc.creditValue !== 0
                            ? acc.creditValue.toFixed(2)
                            : "-"}
                        </div>
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
      <div
        ref={paginationRef}
        className="mt-4 flex justify-center gap-5 items-center"
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-500 text-white cursor-pointer"
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-500 text-white cursor-pointer"
          }`}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};

export default Ledger;
