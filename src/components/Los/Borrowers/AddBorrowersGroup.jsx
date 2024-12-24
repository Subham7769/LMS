import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import InputText from "../../Common/InputText/InputText";
import InputTextArea from "../../Common/InputTextArea/InputTextArea";
import InputSelect from "../../Common/InputSelect/InputSelect";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";

const AddBorrowersGroup = () => {
  const [formData, setFormData] = useState({
    groupName: "",
    borrowers: "",
    groupLeader: "",
    loanOfficer: "",
    collectorName: "",
    meetingSchedule: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Borrowers group added successfully!");
  };

  return (
    <ContainerTile>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5"
      >
        {/* Group Name */}
        <InputText
          labelName="Group Name"
          inputName="groupName"
          inputValue={formData.groupName}
          onChange={handleInputChange}
          placeHolder="Enter Group Name"
          isValidation={true}
        />

        {/* Borrowers Dropdown */}
        <InputSelect
          labelName="Borrowers"
          inputName="borrowers"
          inputOptions={[
            { value: "Borrower 1", label: "Borrower 1" },
            { value: "Borrower 2", label: "Borrower 2" },
          ]}
          inputValue={formData.borrowers}
          onChange={handleInputChange}
          isValidation={true}
        />

        {/* Group Leader Dropdown */}
        <InputSelect
          labelName="Group Leader"
          inputName="groupLeader"
          inputOptions={[
            { value: "Leader 1", label: "Leader 1" },
            { value: "Leader 2", label: "Leader 2" },
          ]}
          inputValue={formData.groupLeader}
          onChange={handleInputChange}
          isValidation={true}
        />

        {/* Loan Officer Dropdown */}
        <InputSelect
          labelName="Loan Officer"
          inputName="loanOfficer"
          inputOptions={[
            { value: "Officer 1", label: "Officer 1" },
            { value: "Officer 2", label: "Officer 2" },
          ]}
          inputValue={formData.loanOfficer}
          onChange={handleInputChange}
          isValidation={true}
        />

        {/* Collector Name */}
        <InputText
          labelName="Collector Name"
          inputName="collectorName"
          inputValue={formData.collectorName}
          onChange={handleInputChange}
          placeHolder="Enter Collector Name"
          isValidation={true}
        />

        {/* Meeting Schedule */}
        <InputText
          labelName="Meeting Schedule"
          inputName="meetingSchedule"
          inputValue={formData.meetingSchedule}
          onChange={handleInputChange}
          placeHolder="Enter Meeting Schedule"
        />

        {/* Description */}
        <div className="col-span-2">
          <InputTextArea
            labelName="Description"
            inputName="description"
            inputValue={formData.description}
            onChange={handleInputChange}
            rowCount={1}
            placeHolder="Enter a brief description"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center col-span-full">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none transition-all flex items-center"
          >
            <FiPlus className="mr-2" /> Add Group
          </button>
        </div>
      </form>
    </ContainerTile>
  );
};

export default AddBorrowersGroup;
