export const ledgerArr = [
  {
    id: "666c7ca699ba1348a3e1c029",
    userId: "1055533324",
    loanId: "59562361-eb55-44cb6",
    accounts: [
      {
        entryName: "CASH_IN_BANK", 
        entryId: "1002", 
        debitValue: 4944.5,
        creditValue: 0,
        transactionDate: "14 Jun 2024",
        transactionId: null,
      },
      {
        entryName: "DPD_PRINCIPAL",
        entryId: "1004",
        debitValue: 0,
        creditValue: 4000,
        transactionDate: "14 Jun 2024",
        transactionId: null,
      },
      {
        entryName: "DPD_INTEREST",
        entryId: "1005",
        debitValue: 0,
        creditValue: 944.5,
        transactionDate: "14 Jun 2024",
        transactionId: null,
      },
    ],
  },
  {
    id: "666c7ca699ba1348a3e1c029",
    userId: "1055533325",
    loanId: "59562361-eb55-44cb7",
    accounts: [
      {
        entryName: "DPD_PRINCIPAL",
        entryId: "1004",
        debitValue: 1000,
        creditValue: 0,
        transactionDate: "15 Jun 2024",
        transactionId: null,
      },
      {
        entryName: "DPD_INTEREST",
        entryId: "1005",
        debitValue: 100,
        creditValue: 0,
        transactionDate: "15 Jun 2024",
        transactionId: null,
      },
      {
        entryName: "Accrued Financing Principal",
        entryId: "1011",
        debitValue: 0,
        creditValue: 1000,
        transactionDate: "15 Jun 2024",
        transactionId: null,
      },
      {
        entryName: "Accrued Financing Interest",
        entryId: "1012",
        debitValue: 0,
        creditValue: 100,
        transactionDate: "15 Jun 2024",
        transactionId: null,
      },
    ],
  },
  {
    id: "666c7ca699ba1348a3e1c456",
    userId: "1055533789",
    loanId: "59562361-eb55-44nh5",
    transactionId: null,
    transactionDate: "18 Jun 2024",
    accounts: [
      {
        entryName: "DPD_PRINCIPAL",
        entryId: "1004",
        debitValue: 2000,
        creditValue: 0,
        transactionId: null,
        transactionDate: "18 Jun 2024",
      },
      {
        entryName: "DPD_INTEREST",
        entryId: "1005",
        debitValue: 200,
        creditValue: 0,
        transactionId: null,
        transactionDate: "18 Jun 2024",
      },
      {
        entryName: "Accrued Financing Principal",
        entryId: "1011",
        debitValue: 0,
        creditValue: 2000,
        transactionId: null,
        transactionDate: "18 Jun 2024",
      },
      {
        entryName: "Accrued Financing Interest",
        entryId: "1012",
        debitValue: 0,
        creditValue: 200,
        transactionId: null,
        transactionDate: "18 Jun 2024",
      },
    ],
  },
];

export const HeaderList = [
  "Date",
  "Entry ID",
  "Entry Name",
  "Loan ID",
  "Borrower ID",
  "Debit Amount",
  "Credit Amount",
];
