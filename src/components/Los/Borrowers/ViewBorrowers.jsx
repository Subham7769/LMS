import React, { useState } from "react";
import ListTable from "../../Common/ListTable/ListTable";
import { BorrowerHeaderList, BorrowersList,loanOfficer } from "../../../data/LosData";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import SelectInput from "../../Common/DynamicSelect/DynamicSelect";

const ViewBorrowers = () => {

  const [formData, setFormData] = useState({
    borrowerName: "",
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
    <div className={`flex flex-col gap-3`}>
      <ContainerTile className={`grid grid-cols-[42%_42%_16%] gap-5`}>
        <InputText
          labelName="Borrower Name"
          inputName="borrowerName"
          inputValue={formData?.borrowerName}
          onChange={handleChange}
          required
          isValidation={true}
        />
        <SelectInput
          labelName="All Loan Officers"
          inputName="allLoanOfficer"
          inputOptions={loanOfficer}
          isMulti={true}
          inputValue={formData?.allLoanOfficer}
          onChange={handleChange}
          isValidation={true}
        />
        <div className="flex gap-5">
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
        ListName={"Borrowers List"}
        ListHeader={BorrowerHeaderList}
        ListItem={BorrowersList}
        ListAction={ActionList}
        Searchable={true}
        SearchBy={"fullName"}
        Sortable={true} // New prop to enable/disable sorting
      />
    </div>
  );
};

export default ViewBorrowers;
