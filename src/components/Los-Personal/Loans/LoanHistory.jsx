import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { useSelector, useDispatch } from "react-redux";
import {
  getLoanHistory,
  getLoanHistoryByUid,
} from "../../../redux/Slices/personalLoansSlice";
import { fetchAllBorrowers } from "../../../redux/Slices/personalBorrowersSlice";
import Button from "../../Common/Button/Button";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    loanProduct: item?.loanProductName?.replace(/_/g, " "),
    borrower: item?.borrowerName,
    disbursedBy: item?.disbursedBy,
    principalAmount: item?.principalAmount,
    loanReleaseDate: item?.loanReleaseDate,
    interestMethod: item?.interestMethod,
    loanInterest: item?.loanInterest,
    interestPer: item?.interestPer,
    loanDuration: item?.loanDuration,
    durationPer: item?.durationPer,
    repaymentCycle: item?.repaymentCycle,
    numberOfTenure: item?.numberOfTenure,
    loanFiles: item?.loanFiles,
    applicationStatus: item?.applicationStatus,
    rejectionReason: item?.rejectionReason,
  }));
}

const LoanHistory = () => {
  const dispatch = useDispatch();
  const { loanHistory, loading } = useSelector((state) => state.personalLoans);
  const { allBorrowersData } = useSelector((state) => state.personalBorrowers);
  const [uid, setUid] = useState("");
  const [borrowerOptions, setBorrowerOptions] = useState([]);

  useEffect(() => {
    dispatch(getLoanHistory({ page: 0, size: 20 }));
    dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
  }, [dispatch]);

  useEffect(() => {
    const options = allBorrowersData.map((item) => ({
      label: `${item.borrowerProfile?.personalDetails?.title} ${item.borrowerProfile?.personalDetails?.surname} ${item.borrowerProfile?.personalDetails?.otherName}`,
      value: item.uid,
    }));

    setBorrowerOptions(options);
  }, [allBorrowersData]);

  console.log(loanHistory);

  const loanHistoryData = transformData(loanHistory);

  const handleSearch = () => {
    dispatch(getLoanHistoryByUid(uid));
  };

  const handleReset = () => {
    setUid(""); // Reset selected UID
    dispatch(getLoanHistory({ page: 0, size: 20 }));
  };

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrower" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
    { label: "Status", field: "applicationStatus" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-4">
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Interest Method:
          </p>
          <p className="text-sm text-gray-600">{rowData.interestMethod}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Loan Interest %:
          </p>
          <p className="text-sm text-gray-600">{rowData.loanInterest}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Per (Loan Interest):
          </p>
          <p className="text-sm text-gray-600">{rowData.interestPer}</p>
        </div>
        <div className="flex justify-between  py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Repayment Cycle:
          </p>
          <p className="text-sm text-gray-600">{rowData.repaymentCycle}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Number of Tenure:
          </p>
          <p className="text-sm text-gray-600">{rowData.numberOfTenure}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">Loan Duration:</p>
          <p className="text-sm text-gray-600">{rowData.loanDuration}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            Per (Loan Duration):
          </p>
          <p className="text-sm text-gray-600">{rowData.durationPer}</p>
        </div>
        <div className="flex justify-between border-r border-gray-300 py-2 px-4">
          <p className="text-sm font-semibold text-gray-600">
            {rowData.applicationStatus === "REJECTED" ? "Rejection Reason" : ""}
          </p>
          <p className="text-sm text-gray-600">{rowData?.rejectionReason}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`grid grid-cols-[85%_15%] gap-5`}>
        <InputSelect
          labelName="Borrower"
          inputName="uid"
          inputOptions={borrowerOptions}
          inputValue={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <div className="flex gap-5">
          <Button
            buttonName={"Search"}
            onClick={handleSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>
      {loanHistoryData.length > 0 ? (
        <ExpandableTable
          columns={columns}
          data={loanHistoryData}
          renderExpandedRow={renderExpandedRow}
          loading={loading}
        />
      ) : (
        <ContainerTile className={`text-center`} loading={loading}>
          No loans history found
        </ContainerTile>
      )}
    </div>
  );
};

export default LoanHistory;
