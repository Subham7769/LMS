import React, { useState } from "react";
import ListTable from "../../Common/ListTable/ListTable";
import { BorrowerGroupHeaderList, BorrowersGroupList } from "../../../data/LosData";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import InputSelectMulti from "../../Common/InputSelectMulti/InputSelectMulti";

const ViewBorrowers = () => {
  const loanOfficer = ["A", "B", "C", "D", "E"];
  const [formData, setFormData] = useState({
    groupName: "",
    allLoanOfficer: [],
  });

  const handleDelete = () => {};
  const handleUpdate = () => {};

  const ActionList = [
    {
      icon: PencilIcon,
      circle: true,
      action: handleUpdate,
    },
    {
      icon: TrashIcon,
      circle: true,
      action: handleDelete,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className={`flex flex-col gap-5`}>
      <ContainerTile className={`grid grid-cols-[42%_42%_16%] gap-5`}>
        <InputText
          labelName="Group Name"
          inputName="groupName"
          inputValue={formData?.groupName}
          onChange={handleChange}
          required
          isValidation={true}
        />
        <InputSelectMulti
          labelName="All Loan Officers"
          inputName="allLoanOfficer"
          inputOptions={loanOfficer}
          isMulti={true}
          inputValue={formData?.allLoanOfficer}
          onChange={handleChange}
          isValidation={true}
        />
        <div className="flex  gap-5">
          <Button
            buttonName={"Search"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
          <Button
            buttonName={"Reset"}
            onClick={() => {}}
            rectangle={true}
            className={`mt-4 h-fit self-center`}
          />
        </div>
      </ContainerTile>

      <ListTable
        ListName={"Borrowers Group List"}
        ListHeader={BorrowerGroupHeaderList}
        ListItem={BorrowersGroupList}
        ListAction={ActionList}
        Searchable={true}
        SearchBy={"groupName"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </div>
  );
};

export default ViewBorrowers;
