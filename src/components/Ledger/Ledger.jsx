import React from "react";

const Ledger = () => {
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

  return (
    <>
      <table className="divide-y divide-gray-300">
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
          {ledgerarr.map((entry, index) => (
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
                        {acc.debitValue !== 0 ? acc.debitValue.toFixed(2) : "-"}
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
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Ledger;
