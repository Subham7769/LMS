import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon, PencilIcon, DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { convertDate } from "../../../utils/convertDate";
import Pagination from "../../Common/Pagination/Pagination";
import {
  generateLoanApplicationId,
  getLoanApplications,
  getLoanApplicationsByID,
  cancelLoanApplicationsByID,
  getLoanApplicationByField,
  resetAddLoanData,
  deleteLoanOffers,
  cloneLoanApplicationsByID,
} from "../../../redux/Slices/smeLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";
import store from "../../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";
import { AddIcon, DeleteIcon, EditIcon } from "../../../assets/icons";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    loanApplicationId: item?.loanApplicationId,
    uniqueID: item?.generalLoanDetails?.uniqueID,
    borrowerName: item?.borrowerName,
    creationDate: convertDate(item?.creationDate),
    lastUpdate: item?.lastUpdate ? convertDate(item?.lastUpdate) : " - ",
    status: convertToTitleCase(item?.status),
  }));
}

const LoanApplication = () => {
  const dispatch = useDispatch();
  const [slaSearchValue, setSlaSearchValue] = useState("");
  const [slaSearchBy, setSlaSearchBy] = useState("");
  const navigate = useNavigate();
  const { loanApplications, loading, loanApplicationsTotalElements } =
    useSelector((state) => state.smeLoans);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(getLoanApplications({ page: currentPage, size: pageSize }));
  };

  const searchOptions = [
    { label: "Loan Application Id", value: "loanApplicationId" },
    { label: "Borrower Serial No.", value: "uniqueID" },
    { label: "Status", value: "status" },
  ];

  const columns = [
    { label: "Loan Application ID", field: "loanApplicationId" },
    { label: "Borrower Name", field: "borrowerName" },
    { label: "Borrower Serial No.", field: "uniqueID" },
    { label: "Created Date", field: "creationDate" },
    { label: "Last Updated", field: "lastUpdate" },
    { label: "Status", field: "status" },
  ];

  const loanApplicationsData = transformData(loanApplications);

  const handleSearch = async () => {
    let normalizedValue = slaSearchBy;

    if (slaSearchBy === "status" && typeof slaSearchBy === "string") {
      normalizedValue = slaSearchBy.trim().toUpperCase().replace(/\s+/g, "_");
    }

    await dispatch(
      validateForm({ slaSearchBy: slaSearchBy, slaSearchValue: normalizedValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getLoanApplicationByField({ field: slaSearchBy, value: normalizedValue })
      );
    }
    // setSlaSearchBy("");
    // setSlaSearchValue("");
  };

  const handleReset = () => {
    setSlaSearchBy("");
    setSlaSearchValue("");
    setCurrentPage(0);
    dispatch(getLoanApplications({ page: 0, size: 20 }));
  };

  const handleNewApplication = async () => {
    dispatch(resetAddLoanData());
    try {
      const loanApplicationId = await dispatch(
        generateLoanApplicationId()
      ).unwrap();
      navigate(
        `/loan/loan-origination-system/sme/loans/add-loan/new/${loanApplicationId}`
      );
    } catch (error) {
      console.error("Failed to generate loan application ID:", error);
    }
  };

  const handleEditApplication = async (rowData) => {
    navigate(
      `/loan/loan-origination-system/sme/loans/add-loan/${rowData?.loanApplicationId}`
    );
    if (rowData.status === "Submitted" || rowData.status === "In Progress") {
      await dispatch(deleteLoanOffers(rowData?.loanApplicationId)).unwrap();
    }
    await dispatch(
      getLoanApplicationsByID(rowData?.loanApplicationId)
    ).unwrap();
  };

  const handleRejectApplication = async (loanApplicationId) => {
    await dispatch(cancelLoanApplicationsByID(loanApplicationId)).unwrap();
    dispatch(getLoanApplications({ page: 0, size: 20 }));
  };

  const handleCloneLoanApplication = async (loanApplicationId) => {
    await dispatch(cloneLoanApplicationsByID(loanApplicationId)).unwrap();
    navigate(`/loan/loan-origination-system/sme/loans/add-loan/${loanApplicationId}`);
  }

  const renderActionList = (rowData) => {
    if (
      rowData.status === "Completed" ||
      rowData.status === "Cancel" ||
      hasViewOnlyAccessGroup3(roleName)
    ) {
      return <div className="flex gap-4">
        <Button
          onClick={() => handleCloneLoanApplication(rowData.loanApplicationId)}
          buttonIcon={DocumentDuplicateIcon}
          className={`mt-4 h-fit self-center`}
          buttonType="secondary"
          title={"Clone"}
        />
      </div>;
    }
    return (
      <div className="flex gap-4 ">
        <Button
          onClick={() => handleEditApplication(rowData)}
          buttonIcon={EditIcon}
          className={`mt-4 h-fit self-center`}
          buttonType="secondary"
        />
        <Button
          onClick={() => handleRejectApplication(rowData.loanApplicationId)}
          buttonIcon={DeleteIcon}
          className={`mt-4 h-fit self-center`}
          buttonType="destructive"
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <div className="grid grid-cols-2 gap-5 items-center">
        <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
          Loan Applications
        </h1>
        <div className="flex justify-end gap-2 h-12">
          {!hasViewOnlyAccessGroup3(roleName) && (
            <Button
              buttonIcon={AddIcon}
              buttonName="New Application"
              onClick={handleNewApplication}
            />
          )}
        </div>
      </div>
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="slaSearchBy"
            inputOptions={searchOptions}
            inputValue={slaSearchBy}
            onChange={(e) => setSlaSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-full md:w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="slaSearchValue"
            inputValue={slaSearchValue}
            onChange={(e) => setSlaSearchValue(e.target.value)}
            isValidation={true}
            disabled={false}
          />
        </div>

        <div className="flex align-middle gap-5 justify-end">
          <Button
            buttonName={"Search"}
            onClick={handleSearch}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>
      <ExpandableTable
        columns={columns}
        data={loanApplicationsData}
        loading={loading}
        ListAction={renderActionList}
        ListName="List of draft loan applications"
        ListNameLength={loanApplicationsTotalElements}
      />
      <Pagination
        totalElements={loanApplicationsTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default LoanApplication;
