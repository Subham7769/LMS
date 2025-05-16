import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeAddCompanyField,
  fetchDraftedCompanyBorrowers,
  fetchDraftedCompanyBorrowerByField,
  setUpdateDraftCompany,
  updateDraftCompanyBorrowerStatus,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import Pagination from "../../Common/Pagination/Pagination";
import { AddIcon, DeleteIcon, EditIcon } from "../../../assets/icons";
import convertToTitleCase from "../../../utils/convertToTitleCase";

const AddCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);

  const {
    addCompanyData,
    allDraftedCompanies,
    allDraftedBorrowersTotalElements,
    loading,
  } = useSelector((state) => state.smeBorrowers);

  // console.log(allDraftedCompanies)
  console.log(flattenToSimpleObjectArray(filteredBorrowers));

  const applyFilters = () => {
    const filtered = allDraftedCompanies.filter((DraftedCompany) => {
      const companyDetails =
        DraftedCompany?.companyBorrowerProfileDraft?.companyDetails || {};

      let matchesSearchValue = false;

      // If 'searchBy' is specified, search based on that field
      if (searchBy) {
        matchesSearchValue = searchValue
          ? companyDetails[searchBy]
              ?.toLowerCase()
              .includes(searchValue.toLowerCase())
          : true;
      } else {
        // Search through multiple fields if no specific 'searchBy'
        matchesSearchValue = searchValue
          ? [
              companyDetails.companyName,
              companyDetails.companyUniqueId,
              companyDetails.companyRegistrationNo,
            ]
              .map((field) => (field ? field.toString().toLowerCase() : "")) // Ensure each field is a string and lowercase
              .some((field) => field.includes(searchValue.toLowerCase())) // Check if any field matches
          : true;
      }

      return matchesSearchValue;
    });

    setFilteredBorrowers(filtered);
  };

  useEffect(() => {
    const transformedData = allDraftedCompanies.map((item) => {
      const { companyBorrowerProfileDraft, ...allOther } = item;
      return {
        ...allOther,
        ...companyBorrowerProfileDraft,
      };
    });
    setFilteredBorrowers(transformedData);
  }, [allDraftedCompanies]);

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue]);

  if (!addCompanyData.companyDetails.loanOfficer) {
    const loanOfficer = localStorage.getItem("username");
    dispatch(
      handleChangeAddCompanyField({
        section: "companyDetails",
        field: "loanOfficer",
        value: loanOfficer,
      })
    );
  }

  const searchOptions = [
    { label: "Name", value: "companyName" },
    { label: "Registration No.", value: "companyRegistrationNo" },
    { label: "Borrower Serial No.", value: "companyUniqueId" },
  ];

  const SearchBorrowerByFieldSearch = () => {
    dispatch(
      fetchDraftedCompanyBorrowerByField({
        field: searchBy,
        value: searchValue,
      })
    );
    setSearchBy("");
    setSearchValue("");
  };

  const handleSearchFilter = (term) => {
    setSearchValue(term);
    applyFilters(); // Apply filters
  };

  const handleResetSearchBy = () => {
    setSearchBy("");
    setSearchValue("");
    setCurrentPage(0);
    dispatch(fetchDraftedCompanyBorrowers({ page: 0, size: pageSize }));
  };

  const personalDetailsColumns = [
    // { label: "Borrower Draft Id", field: "borrowerProfileDraftId" },
    { label: "Name", field: "companyName" },
    { label: "Registration No.", field: "companyRegistrationNo", copy: true },
    { label: "Borrower Serial No.", field: "companyUniqueId" },
    { label: "Status", field: "status" },
  ];

  function flattenToSimpleObjectArray(filteredBorrowers) {
    return filteredBorrowers.map((borrower) => {
      const result = {};

      function recurse(current) {
        for (const key in current) {
          // Skip flattening for `directorsKycDetails` and `shareHolderDetails`
          if (key === "directorsKycDetails" || key === "shareHolderDetails") {
            result[key] = current[key]; // Retain these properties as is
          } else if (
            typeof current[key] === "object" &&
            current[key] !== null
          ) {
            recurse(current[key]);
          } else {
            result[key] = current[key];
          }
        }
      }

      recurse(borrower);
      return result;
    });
  }

  function transformData(inputArray) {
    return inputArray.map((item) => ({
      ...item,
      status: convertToTitleCase(item?.status),
    }));
  }

  const flattenData = flattenToSimpleObjectArray(filteredBorrowers);

  const transformFlattenData = transformData(flattenData);

  const ListAction = (rowData) => {
    // if (rowData.status === "Completed" || rowData.status === "Cancel" || hasViewOnlyAccessGroup3(roleName)) {
    if (rowData.status === "Completed" || rowData.status === "Cancel") {
      return <div className="px-6">-</div>;
    }

    const handleEditApplication = (borrowerProfileDraftId) => {
      dispatch(setUpdateDraftCompany({ borrowerProfileDraftId }));
      navigate(
        `/loan/loan-origination-system/sme/borrowers/update-company/draft/${borrowerProfileDraftId}`
      );
    };

    const handleRejectApplication = async (borrowerProfileDraftId) => {
      await dispatch(
        updateDraftCompanyBorrowerStatus({
          borrowerProfileDraftId,
          status: "CANCEL",
        })
      ).unwrap();
      dispatch(fetchDraftedCompanyBorrowers({ page: 0, size: pageSize }));
    };

    return (
      <div className="flex gap-4">
        <Button
          onClick={() => handleEditApplication(rowData.borrowerProfileDraftId)}
          buttonIcon={EditIcon}
          className={`mt-4 h-fit self-center`}
          buttonType="secondary"
        />
        <Button
          onClick={() =>
            handleRejectApplication(rowData.borrowerProfileDraftId)
          }
          buttonIcon={DeleteIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="destructive"
        />
      </div>
    );
  };

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      fetchDraftedCompanyBorrowers({ page: currentPage, size: pageSize })
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-5 items-center mb-5">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Draft Company
          </h1>
        </div>
        <div className="flex justify-end gap-2 h-12">
          <Button
            buttonIcon={AddIcon}
            buttonName="Add New Company"
            onClick={() =>
              navigate(
                "/loan/loan-origination-system/sme/borrowers/add-new-company"
              )
            }
          />
        </div>
      </div>
      <ContainerTile
        className={`p-5 md:flex justify-between gap-5 align-middle`}
      >
        <div className="w-full md:w-[45%] mb-2">
          <InputSelect
            labelName="Search By"
            inputName="searchBy"
            inputOptions={searchOptions}
            inputValue={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            disabled={false}
          />
        </div>
        <div className="w-full md:w-[45%] mb-2">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
            disabled={false}
          />
        </div>

        <div className="flex align-middle justify-end gap-5">
          <Button
            buttonName={"Search"}
            onClick={SearchBorrowerByFieldSearch}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>
      <ExpandableTable
        columns={personalDetailsColumns}
        data={transformFlattenData}
        loading={loading}
        ListAction={ListAction}
        ListName="List of draft company borrowers"
        ListNameLength={allDraftedBorrowersTotalElements}
      />
      <Pagination
        totalElements={allDraftedBorrowersTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default AddCompany;
