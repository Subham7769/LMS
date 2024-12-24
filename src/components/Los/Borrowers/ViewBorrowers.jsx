import React, { useState } from "react";
import ListTable from "../../Common/ListTable/ListTable";
import {
  BorrowerHeaderList,
  BorrowersList,
  loanOfficer,
} from "../../../data/LosData";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import InputText from "../../Common/InputText/InputText";
import Button from "../../Common/Button/Button";
import SelectInput from "../../Common/DynamicSelect/DynamicSelect";
import ExpandableTable from "../../Common/ExpandableTable/ExpandableTable";
import { FiCheckCircle, FiDownload, FiXCircle } from "react-icons/fi";

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

  const applications = [
    {
      loanId: "INV001",
      applicationUploadDate: "2024-11-15",
      applicationDueDate: "2024-12-15",
      applicationStatus: "Pending",
      loanAmount: "50000",
      companyName: "ABC Corp",
      companyId: "C001",
      daysLeftFromDueDate: "30",
      approvalStatus: "No",
      paymentStatus: "Unpaid",
      financedAmount: "0",
      netOutstanding: "50000",
      interestDue: "0",
      file: "invoice1.pdf",
    },
    {
      loanId: "INV002",
      applicationUploadDate: "2024-11-10",
      applicationDueDate: "2024-12-10",
      applicationStatus: "Pending",
      loanAmount: "30000",
      companyName: "XYZ Ltd",
      companyId: "C002",
      daysLeftFromDueDate: "25",
      approvalStatus: "Yes",
      paymentStatus: "Unpaid",
      financedAmount: "0",
      netOutstanding: "30000",
      interestDue: "0",
      file: "invoice2.pdf",
    },
    {
      loanId: "INV003",
      applicationUploadDate: "2024-11-19",
      applicationDueDate: "2024-12-21",
      applicationStatus: "Pending",
      loanAmount: "38000",
      companyName: "QWERTY Ltd",
      companyId: "C056",
      daysLeftFromDueDate: "53",
      approvalStatus: "No",
      paymentStatus: "Unpaid",
      financedAmount: "0",
      netOutstanding: "38000",
      interestDue: "12",
      file: "invoice3.pdf",
    },
  ];

  const columns = [
    { label: "Full Name", field: "fullName" },
    { label: "Business", field: "business" },
    { label: "Unique#", field: "uniqueNumber" },
    { label: "Mobile", field: "mobile" },
    { label: "Email", field: "email" },
    { label: "Total Paid", field: "totalPaid" },
    { label: "Open Loans", field: "openLoans" },
    { label: "Status", field: "status" },
    { label: "Actions", field: "actions" },
  ];

  const renderExpandedRow = (rowData) => (
    <div className="space-y-2 text-sm text-gray-600 border-y-2 p-5">
      <div className="grid grid-cols-3 md:grid-cols-[80%_20%] gap-4">
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 py-5">
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Company ID:</p>
              <p className="text-sm text-gray-600">{rowData.companyId}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Due Date:</p>
              <p className="text-sm text-gray-600">
                {rowData.applicationDueDate}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">Days Left:</p>
              <p className="text-sm text-gray-600">
                {rowData.daysLeftFromDueDate}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Approval Status:
              </p>
              <p className="text-sm text-gray-600">{rowData.approvalStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Payment Status:
              </p>
              <p className="text-sm text-gray-600">{rowData.paymentStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Financed Amount:
              </p>
              <p className="text-sm text-gray-600">{rowData.financedAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Net Outstanding:
              </p>
              <p className="text-sm text-gray-600">{rowData.netOutstanding}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Interest Due:
              </p>
              <p className="text-sm text-gray-600">{rowData.interestDue}</p>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end  flex-col gap-4 p-5">
          <button
            onClick={() => handleApprove(rowData.applicationId)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
            disabled={rowData.approvalStatus === "Yes"}
          >
            <FiCheckCircle className="mr-2" />
            Approve
          </button>
          <button
            onClick={() => handleReject(rowData.applicationId)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            disabled={rowData.approvalStatus === "No"}
          >
            <FiXCircle className="mr-2" />
            Reject
          </button>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={() => window.alert("PDF viewer would open here")}
          >
            <FiDownload className="mr-2" />
            View PDF
          </button>
        </div>
      </div>
    </div>
  );

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

      <ExpandableTable
        columns={columns}
        data={applications}
        renderExpandedRow={renderExpandedRow}
      />

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
