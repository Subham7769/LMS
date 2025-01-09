import React, { useState } from "react";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputDate from "../../Common/InputDate/InputDate";
import { AddBulkRepaymentHeaderList } from "../../../data/LosData";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import {
  updateBulkRepaymentData,
  addBulkRepaymentRow,
  removeBulkRepaymentRow,
} from "../../../redux/Slices/smeRepaymentsSlice";
import { useDispatch, useSelector } from "react-redux";

const AddBulkRepayment = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.smeRepayments.addNewBulkRepaymentData);

  const methodOptions = [
    { label: "Cash", value: "cash" },
    { label: "Bank Transfer", value: "bank_transfer" },
  ];

  const collectionByOptions = [
    { label: "Agent 1", value: "agent_1" },
    { label: "Agent 2", value: "agent_2" },
  ];

  const accountingOptions = [
    { label: "Cash", value: "cash" },
    { label: "Bank", value: "bank" },
  ];

  const loanOptions = [
    { label: "Loan 1", value: "loan_1" },
    { label: "Loan 2", value: "loan_2" },
  ];

  const handleChange = (value, rowIndex, fieldName) => {
    dispatch(updateBulkRepaymentData({ rowIndex, fieldName, value }));
  };

  const addRow = () => {
    dispatch(addBulkRepaymentRow());
  };

  const removeRow = (index) => {
    dispatch(removeBulkRepaymentRow(index));
  };

  return (
    <ContainerTile>
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            {AddBulkRepaymentHeaderList.map((header, index) => (
              <th
                key={index}
                className="py-3 text-center text-sm font-medium text-gray-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className="py-3 text-center">{rowIndex + 1}</td>
              <td className="py-3 text-center">
                <InputSelect
                  inputName="loan"
                  inputOptions={loanOptions}
                  inputValue={item.loan}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "loan")
                  }
                />
              </td>
              <td className="py-3 text-center">
                <InputNumber
                  inputName="amount"
                  inputValue={item.amount}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "amount")
                  }
                />
              </td>
              <td className="py-3 text-center">
                <InputSelect
                  inputName="method"
                  inputOptions={methodOptions}
                  inputValue={item.method}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "method")
                  }
                />
              </td>
              <td className="py-3 text-center w-1/12">
                <InputDate
                  inputName="collectionDate"
                  inputValue={item.collectionDate}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "collectionDate")
                  }
                />
              </td>
              <td className="py-3 text-center w-1/6">
                <InputSelect
                  inputName="collectionBy"
                  inputOptions={collectionByOptions}
                  inputValue={item.collectionBy}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "collectionBy")
                  }
                />
              </td>
              <td className="py-3 text-center w-1/12">
                <InputText
                  inputName="description"
                  inputValue={item.description}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "description")
                  }
                />
              </td>
              <td className="py-3 text-center">
                <InputSelect
                  inputName="accounting"
                  inputOptions={accountingOptions}
                  inputValue={item.accounting}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "accounting")
                  }
                />
              </td>
              <td className="py-3 text-center">
                <button
                  onClick={() => removeRow(rowIndex)}
                  className="text-red-500 hover:text-red-700"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">
        <button
          onClick={addRow}
          className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Add Row
        </button>
      </div>
    </ContainerTile>
  );
};

export default AddBulkRepayment;
