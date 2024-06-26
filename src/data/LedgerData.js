export const ledgerArr = [
  {
    id: "666c7ca699ba1348a3e1c029",
    userId: "1055533324",
    loanId: "59562361-eb55-44cb6",
    transactionId: null,
    transactionDate: "14 Jun 2024",
    account: [
      {
        entryName: "CASH_IN_BANK", 
        entryId: "1002", 
        debitValue: 4944.5,
        creditValue: 0,
      },
      {
        entryName: "DPD_PRINCIPAL",
        entryId: "1004",
        debitValue: 0,
        creditValue: 4000,
      },
      {
        entryName: "DPD_INTEREST",
        entryId: "1005",
        debitValue: 0,
        creditValue: 944.5,
      },
    ],
  },
  {
    id: "666c7ca699ba1348a3e1c029",
    userId: "1055533325",
    loanId: "59562361-eb55-44cb7",
    transactionId: null,
    transactionDate: "15 Jun 2024",
    account: [
      {
        entryName: "DPD_PRINCIPAL",
        entryId: "1004",
        debitValue: 1000,
        creditValue: 0,
      },
      {
        entryName: "DPD_INTEREST",
        entryId: "1005",
        debitValue: 100,
        creditValue: 0,
      },
      {
        entryName: "Accrued Financing Principal",
        entryId: "1011",
        debitValue: 0,
        creditValue: 1000,
      },
      {
        entryName: "Accrued Financing Interest",
        entryId: "1012",
        debitValue: 0,
        creditValue: 100,
      },
    ],
  },
];

export const HeaderList = [
  "Date",
  "Entry ID",
  "Entry Name",
  "Borrower ID",
  "Debit Amount",
  "Credit Amount",
];
