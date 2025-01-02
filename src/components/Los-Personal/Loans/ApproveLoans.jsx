import React, { useEffect, useState } from "react";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import {
  approveLoan,
  getLoansByUid,
  getPendingLoans,
} from "../../../redux/Slices/personalLoansSlice";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import { fetchAllBorrowers } from "../../../redux/Slices/personalBorrowersSlice";
import Button from "../../Common/Button/Button";
import { useNavigate } from "react-router-dom";
import LoanRejectModal from "./LoanRejectModal";
import Pagination from "../../Common/Pagination/Pagination";
import { convertDate } from "../../../utils/convertDate";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    loanProduct: item?.loanProductName?.replace(/_/g, " "),
    borrower: item?.borrowerName,
    disbursedBy: item?.disbursedBy,
    principalAmount: item?.principalAmount,
    loanReleaseDate: convertDate(item?.loanReleaseDate),
    interestMethod: item?.interestMethod,
    loanInterest: item?.loanInterest,
    interestPer: item?.perLoanInterest,
    loanDuration: item?.loanDuration,
    durationPer: item?.perLoanDuration,
    repaymentCycle: item?.repaymentCycle,
    numberOfTenure: item?.numberOfTenure,
    loanId: item?.loanId,
    uid: item?.uid,
    // loanFiles: item.loanFiles,
  }));
}

const ApproveLoans = () => {
  const dispatch = useDispatch();
  const { approveLoans, loading, approveLoansTotalElements } = useSelector(
    (state) => state.personalLoans
  );
  const { allBorrowersData } = useSelector((state) => state.personalBorrowers);
  const [uid, setUid] = useState("");
  const [borrowerOptions, setBorrowerOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRowData, setCurrentRowData] = useState(null);
  const navigate = useNavigate();

  // Pagination state

  const [pageSize, setPageSize] = useState(10);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getPendingLoans({ page: currentPage, size: pageSize }));
  };

  useEffect(() => {
    dispatch(fetchAllBorrowers({ page: 0, size: 20 }));
  }, [dispatch]);

  // if(approveLoans.length > 0 && filteredData.length === 0) {
  //   setFilteredData(transformData(approveLoans)); // Initialize with all loans
  // }

  useEffect(() => {
    const options = allBorrowersData.map((item) => ({
      label: `${item.borrowerProfile?.personalDetails?.title} ${item.borrowerProfile?.personalDetails?.surname} ${item.borrowerProfile?.personalDetails?.otherName}`,
      value: item.uid,
    }));

    setBorrowerOptions(options);
  }, [allBorrowersData]);

  const approveLoansData = transformData(approveLoans);

  const handleSearch = () => {
    // if (uid) {
    //   const filtered = approveLoans.filter((loan) => loan.uid === uid);
    //   setFilteredData(transformData(filtered));
    // }
    dispatch(getLoansByUid(uid));
  };

  const handleReset = () => {
    // setFilteredData(transformData(approveLoans)); // Reset to all loans
    setUid(""); // Reset selected UID
    dispatch(getPendingLoans({ page: 0, size: 20 }));
  };

  const handleApprove = async (rowData) => {
    const approveLoanPayload = {
      amount: rowData.principalAmount,
      applicationStatus: "APPROVED",
      loanId: rowData.loanId,
      uid: rowData.uid,
    };
    await dispatch(approveLoan(approveLoanPayload)).unwrap();
    await dispatch(getPendingLoans({ page: 0, size: 20 })).unwrap();
    navigate(`/loan/loan-origination-system/personal/loans/loan-history`);
  };

  const handleReject = async (rowData) => {
    setCurrentRowData(rowData);
    setShowModal(true); // Show modal
  };

  const closeRejectModal = () => {
    setShowModal(false);
  };

  const columns = [
    { label: "Loan Product", field: "loanProduct" },
    { label: "Borrower", field: "borrower" },
    { label: "Disbursed By", field: "disbursedBy" },
    { label: "Loan Release Date", field: "loanReleaseDate" },
    { label: "Principal Amount", field: "principalAmount" },
  ];
  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-3">
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
            <div className="flex justify-between border-r border-gray-300 py-2 px-4">
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
              <p className="text-sm font-semibold text-gray-600">
                Loan Duration:
              </p>
              <p className="text-sm text-gray-600">{rowData.loanDuration}</p>
            </div>
            <div className="flex justify-between border-r border-gray-300 py-2 px-4">
              <p className="text-sm font-semibold text-gray-600">
                Per (Loan Duration):
              </p>
              <p className="text-sm text-gray-600">{rowData.durationPer}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start  flex-col gap-4 px-5">
          <button
            onClick={() => handleApprove(rowData)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={rowData.approvalStatus === "Yes"}
          >
            <FiCheckCircle className="mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleReject(rowData)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={rowData.approvalStatus === "No"}
          >
            <FiXCircle className="mr-2" />
            Reject
          </button>
          {/* <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => window.alert("PDF viewer would open here")}
          >
            <FiDownload className="mr-2" />
            View PDF
          </button> */}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`flex justify-between gap-5`}>
        <div className="w-full">
          <InputSelect
            labelName="Borrower"
            inputName="uid"
            inputOptions={borrowerOptions}
            inputValue={uid}
            onChange={(e) => setUid(e.target.value)}
          />
        </div>
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
      <ExpandableTable
        columns={columns}
        data={approveLoansData}
        renderExpandedRow={renderExpandedRow}
        loading={loading}
      />
      <Pagination
        totalElements={approveLoansTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
      <LoanRejectModal
        isOpen={showModal}
        onClose={closeRejectModal}
        userDetails={currentRowData}
      />
    </div>
  );
};

export default ApproveLoans;
