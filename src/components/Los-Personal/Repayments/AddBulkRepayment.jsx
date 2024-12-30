import React, { useState } from "react";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputDate from "../../Common/InputDate/InputDate";
import {
  AddBulkRepaymentHeaderList,
  methodOptions,
  collectionByOptions,
  accountingOptions,
  loanOptions,
} from "../../../data/LosData";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import {
  updateBulkRepaymentData,
  addBulkRepaymentRow,
  removeBulkRepaymentRow,
} from "../../../redux/Slices/personalRepaymentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";

const AddBulkRepayment = () => {
  const dispatch = useDispatch();
  const { addNewBulkRepaymentData } = useSelector(
    (state) => state.personalRepayments
  );
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
          {addNewBulkRepaymentData.map((item, rowIndex) => (
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
      <div className="flex justify-end mt-5 gap-5">
        <Button buttonName={"Add Row"} onClick={addRow} rectangle={true} />
        <Button
          buttonName={"Upload Repayments"}
          onClick={addRow}
          rectangle={true}
        />
      </div>
    </ContainerTile>
  );
};

export default AddBulkRepayment;
