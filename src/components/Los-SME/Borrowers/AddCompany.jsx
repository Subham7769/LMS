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


const AddCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);

  const { addCompanyData, allDraftedCompanies,  allDraftedBorrowersTotalElements, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );

  console.log(allDraftedCompanies)
  console.log(flattenToSimpleObjectArray(filteredBorrowers))

  const applyFilters = () => {
    const filtered = allDraftedCompanies.filter((DraftedCompany) => {
      const companyDetails = DraftedCompany?.companyBorrowerProfileDraft
        ?.companyDetails || {};

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
    { label: "Unique Id", value: "companyUniqueId" },
  ];


  const SearchBorrowerByFieldSearch = () => {
    dispatch(
      fetchDraftedCompanyBorrowerByField({ field: searchBy, value: searchValue })
    );
    setSearchBy("");
    setSearchValue("");
  };

  const handleSearchFilter = (term) => {
    setSearchValue(term);
    applyFilters(); // Apply filters
  };

  const handleResetSearchBy = () => {
    if (searchBy || searchValue) {
      setSearchBy("");
      setSearchValue("");
      const transformedData = allDraftedCompanies.map((item) => {
        const { companyBorrowerProfileDraft, ...allOther } = item;
        return {
          ...allOther,
          ...companyBorrowerProfileDraft,
        };
      });
      setFilteredBorrowers(transformedData);
    } else {
      dispatch(fetchDraftedCompanyBorrowers({ page: 0, size: pageSize }));
    }
  };

  const personalDetailsColumns = [
    // { label: "Borrower Draft Id", field: "borrowerProfileDraftId" },
    { label: "Name", field: "companyName" },
    { label: "Registration No.", field: "companyRegistrationNo" },
    { label: "Unique Id", field: "companyUniqueId" },
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

  const ListAction = (rowData) => {
    // if (rowData.status === "Completed" || rowData.status === "Cancel" || hasViewOnlyAccessGroup3(roleName)) {
    if (rowData.status === "COMPLETED" || rowData.status === "CANCEL") {
      return <div className="py-6">-</div>;
    }

    const handleEditApplication = (borrowerProfileDraftId) => {
      dispatch(setUpdateDraftCompany({borrowerProfileDraftId}));
      navigate(`/loan/loan-origination-system/sme/borrowers/update-company/draft/${borrowerProfileDraftId}`)
    };

    const handleRejectApplication = async (borrowerProfileDraftId) => {
      await dispatch(updateDraftCompanyBorrowerStatus({borrowerProfileDraftId, status:"CANCEL"})).unwrap();
      dispatch(fetchDraftedCompanyBorrowers({ page: 0, size: pageSize }));
    };

    return (
      <div className="flex justify-center gap-4 px-5">
        <Button
          onClick={() => handleEditApplication(rowData.borrowerProfileDraftId)}
          buttonIcon={PencilIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="secondary"
        />
        <Button
          onClick={() => handleRejectApplication(rowData.borrowerProfileDraftId)}
          buttonIcon={TrashIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="destructive"
        />

      </div>
    );
  };

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(fetchDraftedCompanyBorrowers({ page: currentPage, size: pageSize }));
  };


  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-5 items-center">
        <div className="text-xl font-semibold">
          Company</div>
        <div></div>
        <div></div>
        <div className="flex justify-end gap-2 h-12">
          <Button
            buttonIcon={PlusIcon}
            buttonName="Add New Company"
            onClick={() => navigate('/loan/loan-origination-system/sme/borrowers/add-new-company')}
            rectangle={true}
          />
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
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
          />
        </div>

        <div className="flex align-middle gap-5">
          <Button
            buttonName={"Search"}
            onClick={SearchBorrowerByFieldSearch}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="secondary"
          />
          <Button
            buttonName={"Reset"}
            onClick={handleResetSearchBy}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
            buttonType="tertiary"
          />
        </div>
      </ContainerTile>
      <ExpandableTable
        columns={personalDetailsColumns}
        data={flattenToSimpleObjectArray(filteredBorrowers)}
        loading={loading}
        ListAction={ListAction}
      />
      <Pagination
        totalElements={allDraftedBorrowersTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
    </div>
  );
};

export default AddCompany;
