import React, { useEffect, useState } from "react";
import HoverButton from "../../Common/HoverButton/HoverButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
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
} from "../../../redux/Slices/smeLoansSlice";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";
import store from "../../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../../redux/Slices/validationSlice";

function transformData(inputArray) {
  return inputArray.map((item) => ({
    loanApplicationId: item?.loanApplicationId,
    borrowerId: item?.generalLoanDetails?.borrowerId,
    creationDate: convertDate(item?.creationDate),
    lastUpdate: item?.lastUpdate ? convertDate(item?.lastUpdate) : " - ",
    status: convertToTitleCase(item?.status),
  }));
}

const LoanApplication = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const navigate = useNavigate();
  const { loanApplications, loading, loanApplicationsTotalElements } =
    useSelector((state) => state.smeLoans);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [pageSize, setPageSize] = useState(10);

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
    { label: "Borrower Serial No.", value: "borrowerId" },
  ];

  const columns = [
    { label: "Loan Application ID", field: "loanApplicationId" },
    { label: "Borrower Serial No.", field: "borrowerId" },
    { label: "Created Date", field: "creationDate" },
    { label: "Last Updated", field: "lastUpdate" },
    { label: "Status", field: "status" },
  ];

  const loanApplicationsData = transformData(loanApplications);

  const handleSearch = async () => {
    await dispatch(
      validateForm({ searchBy: searchBy, searchValue: searchValue })
    );
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(
        getLoanApplicationByField({ field: searchBy, value: searchValue })
      );
    }
    // setSearchBy("");
    // setSearchValue("");
  };

  const handleReset = () => {
    setSearchBy("");
    setSearchValue("");
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

  const renderActionList = (rowData) => {
    if (
      rowData.status === "Completed" ||
      rowData.status === "Cancel" ||
      hasViewOnlyAccessGroup3(roleName)
    ) {
      return <div className="py-6">-</div>;
    }
    return (
      <div className="flex justify-center gap-4 px-5">
        <Button
          onClick={() => handleEditApplication(rowData)}
          buttonIcon={PencilIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="secondary"
        />
        <Button
          onClick={() => handleRejectApplication(rowData.loanApplicationId)}
          buttonIcon={TrashIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="destructive"
        />
      </div>
    );
  };

  return (
    <div className={`flex flex-col gap-3`}>
      <div className="grid grid-cols-4 gap-5 items-center">
        <div className="text-xl font-semibold">Loan Applications</div>
        <div></div>
        <div></div>
        <div className="flex justify-end gap-2 h-12">
          {!hasViewOnlyAccessGroup3(roleName) && (
            <Button
              buttonIcon={PlusIcon}
              buttonName="New Application"
              onClick={handleNewApplication}
              rectangle={true}
            />
          )}
        </div>
      </div>
      <ContainerTile className={`flex justify-between gap-5 align-middle`}>
        <div className="w-[45%]">
          <InputSelect
            labelName="Search By"
            inputName="searchBy"
            inputOptions={searchOptions}
            inputValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            disabled={false}
            isValidation={true}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            isValidation={true}
            disabled={false}
          />
        </div>

        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Search"}
            onClick={handleSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleReset}
            rectangle={true}
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
      />
      <Pagination
        totalElements={loanApplicationsTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
    </div>
  );
};

export default LoanApplication;
