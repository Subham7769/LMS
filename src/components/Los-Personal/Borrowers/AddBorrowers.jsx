import React, { useEffect, useState } from "react";
import Button from "../../Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import Pagination from "../../Common/Pagination/Pagination";
import { convertDate } from "../../../utils/convertDate";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import {
  fetchDraftedPersonalBorrowers,
  setUpdateDraftBorrower,
  updateAddBorrowerField,
  fetchDraftedBorrowerByField,
  updateDraftBorrowerStatus,
} from "../../../redux/Slices/personalBorrowersSlice";
import { hasViewOnlyAccessGroup3 } from "../../../utils/roleUtils";

const AddBorrowers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [filteredBorrowers, setFilteredBorrowers] = useState([]);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  const {
    addBorrowerData,
    draftedBorrowerData,
    draftedBorrowerDataTotalElements,
    error,
    loading,
  } = useSelector((state) => state.personalBorrowers);

  // console.log(draftedBorrowerData);
  // console.log(flattenToSimpleObjectArray(filteredBorrowers));

  const applyFilters = () => {
    const filtered = draftedBorrowerData.filter((DraftedBorrower) => {
      const personalDetails =
        DraftedBorrower?.personalBorrowerProfileDraft?.personalDetails || {};

      let matchesSearchValue = false;
      matchesSearchValue = searchValue
        ? [
            personalDetails.firstName,
            personalDetails.surname,
            personalDetails.uniqueID,
          ]
            .map((field) => (field ? field.toString().toLowerCase() : "")) // Ensure each field is a string and lowercase
            .some((field) => field.includes(searchValue.toLowerCase())) // Check if any field matches
        : true;

      return matchesSearchValue;
    });

    setFilteredBorrowers(filtered);
  };

  useEffect(() => {
    const transformedData = draftedBorrowerData.map((item) => {
      const { personalBorrowerProfileDraft, ...allOther } = item;
      return {
        ...allOther,
        ...personalBorrowerProfileDraft,
      };
    });
    setFilteredBorrowers(transformedData);
  }, [draftedBorrowerData]);

  // Trigger Filtering on Search Value Change
  useEffect(() => {
    applyFilters();
  }, [searchValue]);

  if (!addBorrowerData.personalDetails.loanOfficer) {
    const loanOfficer = localStorage.getItem("username");
    dispatch(
      updateAddBorrowerField({
        section: "personalDetails",
        field: "loanOfficer",
        value: loanOfficer,
      })
    );
  }

  const searchOptions = [
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "surname" },
    { label: "Unique Id", value: "uniqueID" },
  ];

  const SearchBorrowerByFieldSearch = () => {
    dispatch(
      fetchDraftedBorrowerByField({
        field: searchBy,
        value: searchValue,
      })
    );
  };

  const handleSearchFilter = (term) => {
    setSearchValue(term);
    applyFilters(); // Apply filters
  };

  const handleResetSearchBy = () => {
    setSearchBy("");
    setSearchValue("");
    dispatch(fetchDraftedPersonalBorrowers({ page: 0, size: pageSize }));
  };

  const personalDetailsColumns = [
    { label: "Name", field: "fullName" },
    { label: "Unique Id", field: "uniqueID", copy: true },
    { label: "Creation Date", field: "creationDate" },
    { label: "Last Update", field: "lastUpdate" },
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
      fullName: `${item?.title} ${item?.firstName} ${item?.surname} ${item?.otherName}`,
      uniqueID: item?.uniqueID,
      creationDate: convertDate(item?.creationDate),
      lastUpdate: item?.lastUpdate ? convertDate(item?.lastUpdate) : " - ",
      status: convertToTitleCase(item?.status),
      borrowerProfileDraftId: item?.borrowerProfileDraftId,
    }));
  }

  const flattenData = flattenToSimpleObjectArray(filteredBorrowers);

  const transformFlattenData = transformData(flattenData);

  const handleEditApplication = (borrowerProfileDraftId) => {
    console.log(borrowerProfileDraftId);
    dispatch(setUpdateDraftBorrower({ borrowerProfileDraftId }));
    navigate(
      `/loan/loan-origination-system/personal/borrowers/update-borrower/draft/${borrowerProfileDraftId}`
    );
  };

  const handleRejectApplication = async (borrowerProfileDraftId) => {
    await dispatch(
      updateDraftBorrowerStatus({
        borrowerProfileDraftId,
        status: "CANCEL",
      })
    ).unwrap();
    dispatch(fetchDraftedPersonalBorrowers({ page: 0, size: pageSize }));
  };

  const ListAction = (rowData) => {
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
          onClick={() => handleEditApplication(rowData.borrowerProfileDraftId)}
          buttonIcon={PencilIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="secondary"
        />
        <Button
          onClick={() =>
            handleRejectApplication(rowData.borrowerProfileDraftId)
          }
          buttonIcon={TrashIcon}
          circle={true}
          className={`mt-4 h-fit self-center`}
          buttonType="destructive"
        />
      </div>
    );
  };

  const dispatcherFunction = (currentPage, pageSize) => {
    dispatch(
      fetchDraftedPersonalBorrowers({ page: currentPage, size: pageSize })
    );
    // dispatch(
    //   fetchAllCompanyBorrowersListByLoanOfficer({
    //     page: currentPage,
    //     size: pageSize,
    //     loanOfficer,
    //   })
    // );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-4 gap-5 items-center">
        <div className="text-xl font-semibold">Draft Borrower</div>
        <div></div>
        <div></div>
        <div className="flex justify-end gap-2 h-12">
          <Button
            buttonIcon={PlusIcon}
            buttonName="Add New Borrower"
            onClick={() =>
              navigate(
                "/loan/loan-origination-system/personal/borrowers/add-new-borrower"
              )
            }
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
            disabled={false}
          />
        </div>
        <div className="w-[45%]">
          <InputText
            labelName="Enter Value"
            inputName="searchValue"
            inputValue={searchValue}
            onChange={(e) => handleSearchFilter(e.target.value)}
            required
            disabled={false}
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
        data={transformFlattenData}
        loading={loading}
        ListAction={ListAction}
      />
      <Pagination
        totalElements={draftedBorrowerDataTotalElements}
        dispatcherFunction={dispatcherFunction}
        pageSize={pageSize}
      />
    </div>
  );
};

export default AddBorrowers;
