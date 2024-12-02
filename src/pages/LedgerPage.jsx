import { HeaderList } from "../data/LedgerData";
import LedgerListTable from "../components/LedgerListTable/LedgerListTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLedgerData } from "../redux/Slices/generalLedgerSlice";
import transformData from "../utils/GeneralLedgerDataTransformation";

const LedgerPage = () => {
  const dispatch = useDispatch();
  const { ledgerData, loading, error } = useSelector((state) => state.ledger);

  useEffect(() => {
    dispatch(fetchLedgerData());
  }, [dispatch]);

  const inputData = [
    {
      id: "6735aa330f2dc10001336213",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:43:47.165Z",
      account: {
        entryName: "CASH_IN_BANK",
        entryId: "1002",
        debitValue: 0.0,
        creditValue: 4889.0,
        transactionDate: "2024-11-14T10:43:47.165Z",
        transactionId: "2d944c92-142d-499b-9575-98c77fe9c7c7",
      },
    },
    {
      id: "6735aa330f2dc10001336214",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:43:47.175Z",
      account: {
        entryName: "FINANCING_RECEIVABLES",
        entryId: "1101",
        debitValue: 5000.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:43:47.175Z",
        transactionId: "c2791c21-a5b5-49ae-9241-57383da6771d",
      },
    },
    {
      id: "6735aa330f2dc10001336215",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:43:47.179Z",
      account: {
        entryName: "DEFERRED_PROCESSING_FEE",
        entryId: "2104",
        debitValue: 0.0,
        creditValue: 111.0,
        transactionDate: "2024-11-14T10:43:47.179Z",
        transactionId: "f109a68d-a7c7-40e8-bd7d-19b0abd48d7a",
      },
    },
    {
      id: "6735aa410f2dc10001336216",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:01.655Z",
      account: {
        entryName: "CASH_IN_BANK",
        entryId: "1002",
        debitValue: 2665.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:01.655Z",
        transactionId: "a368b7fe-ae9e-42d8-a763-2747dc2f92c6",
      },
    },
    {
      id: "6735aa410f2dc10001336217",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:01.659Z",
      account: {
        entryName: "FINANCING_RECEIVABLES",
        entryId: "1101",
        debitValue: 0.0,
        creditValue: 2482.75,
        transactionDate: "2024-11-14T10:44:01.659Z",
        transactionId: "9522e766-b8c9-4b11-9a52-ca183fce11fd",
      },
    },
    {
      id: "6735aa410f2dc10001336218",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:01.661Z",
      account: {
        entryName: "ACCRUED_FINANCING_PROFIT",
        entryId: "1103",
        debitValue: 0.0,
        creditValue: 182.25,
        transactionDate: "2024-11-14T10:44:01.661Z",
        transactionId: "950fc297-bd63-4983-be82-00bbc48ea352",
      },
    },
    {
      id: "6735aa410f2dc10001336219",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:01.728Z",
      account: {
        entryName: "ACCRUED_FINANCING_PROFIT",
        entryId: "1103",
        debitValue: 0.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:01.728Z",
        transactionId: "88097600-4aee-4d3c-aa36-7ecd0c0e8023",
      },
    },
    {
      id: "6735aa410f2dc1000133621a",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:01.742Z",
      account: {
        entryName: "EARNED_FINANCING_REVENUE",
        entryId: "4103",
        debitValue: 0.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:01.742Z",
        transactionId: "c2c80d71-d39c-4807-b81c-7bf0e9647e5e",
      },
    },
    {
      id: "6735aa420f2dc1000133621b",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.086Z",
      account: {
        entryName: "CASH_IN_BANK",
        entryId: "1002",
        debitValue: 2665.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:02.086Z",
        transactionId: "23206f66-3104-4258-b800-9ef53b0fa1d5",
      },
    },
    {
      id: "6735aa420f2dc1000133621c",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.090Z",
      account: {
        entryName: "FINANCING_RECEIVABLES",
        entryId: "1101",
        debitValue: 0.0,
        creditValue: 2572.25,
        transactionDate: "2024-11-14T10:44:02.090Z",
        transactionId: "53bb68e2-82cf-48af-900c-468fbb385b43",
      },
    },
    {
      id: "6735aa420f2dc1000133621d",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.095Z",
      account: {
        entryName: "ACCRUED_FINANCING_PROFIT",
        entryId: "1103",
        debitValue: 0.0,
        creditValue: 92.75,
        transactionDate: "2024-11-14T10:44:02.095Z",
        transactionId: "8200785d-97bc-494e-bd80-017d130c6410",
      },
    },
    {
      id: "6735aa420f2dc1000133621e",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.362Z",
      account: {
        entryName: "CASH_IN_BANK",
        entryId: "1002",
        debitValue: 5330.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:02.362Z",
        transactionId: "f606099c-2f11-4746-a3c4-cf57bcafe679",
      },
    },
    {
      id: "6735aa420f2dc1000133621f",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.366Z",
      account: {
        entryName: "FINANCING_RECEIVABLES",
        entryId: "1101",
        debitValue: 0.0,
        creditValue: 5330.0,
        transactionDate: "2024-11-14T10:44:02.366Z",
        transactionId: "53b6565e-d11e-48b1-8dca-fac013d2de88",
      },
    },
    {
      id: "6735aa420f2dc10001336220",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.371Z",
      account: {
        entryName: "ACCRUED_FINANCING_PROFIT",
        entryId: "1103",
        debitValue: 0.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:02.371Z",
        transactionId: "67d30047-197e-4960-9a1e-76cf8cd33e67",
      },
    },
    {
      id: "6735aa420f2dc10001336221",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.374Z",
      account: {
        entryName: "EARNED_AMORTIZED_PROCESSING_FEE",
        entryId: "4105",
        debitValue: 0.0,
        creditValue: 111.0,
        transactionDate: "2024-11-14T10:44:02.374Z",
        transactionId: "98bdbc02-a4ff-43e4-97c9-35f16a3c88be",
      },
    },
    {
      id: "6735aa420f2dc10001336222",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.376Z",
      account: {
        entryName: "EARNED_FINANCING_REVENUE",
        entryId: "4103",
        debitValue: 0.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:02.376Z",
        transactionId: "de49053d-0aba-4eb7-b475-eb2e7a80542a",
      },
    },
    {
      id: "6735aa420f2dc10001336223",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.380Z",
      account: {
        entryName: "DEFERRED_PROCESSING_FEE",
        entryId: "2104",
        debitValue: 111.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:02.380Z",
        transactionId: "3f7063e7-efa1-4ec1-8e2e-d57e43a16924",
      },
    },
    {
      id: "6735aa420f2dc10001336224",
      userId: "3333333361",
      loanId: "d1390d8d-8ef7-4383-a9af-cb9e536b9975",
      transactionDate: "2024-11-14T10:44:02.383Z",
      account: {
        entryName: "EARNED_FINANCING_REVENUE",
        entryId: "4103",
        debitValue: 0.0,
        creditValue: 0.0,
        transactionDate: "2024-11-14T10:44:02.383Z",
        transactionId: "bb28fbcb-2e61-4dfd-b109-c1e89230eef7",
      },
    },
  ];
  const transformedData = transformData(inputData);

  console.log(JSON.stringify(transformedData, null, 2));

  return (
    <LedgerListTable
      ListName={"Ledger List"}
      ListHeader={HeaderList}
      ListItem={ledgerData}
      loading={loading}
      error={error}
    />
  );
};

export default LedgerPage;
