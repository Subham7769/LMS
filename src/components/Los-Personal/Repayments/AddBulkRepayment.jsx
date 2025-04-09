import React, { useEffect, useState } from "react";
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
  uploadRepayment,
  getOpenLoans,
  fetchClosingBalance,
} from "../../../redux/Slices/personalRepaymentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import convertToReadableString from "../../../utils/convertToReadableString";
import formatNumber from "../../../utils/formatNumber";
import isDateString from "../../../utils/isDateString";
import { convertDate } from "../../../utils/convertDate";
import convertToTitleCase from "../../../utils/convertToTitleCase";

const AddBulkRepayment = () => {
  const dispatch = useDispatch();
  const { draftRepaymentDTOList, closingBalance, openLoans, loading } =
    useSelector((state) => state.personalRepayments);
  console.log(draftRepaymentDTOList);

  useEffect(() => {
    // if (openLoans.length < 1) {
    dispatch(getOpenLoans());
    // }
  }, [dispatch]);

  const addRow = () => {
    dispatch(addBulkRepaymentRow());
  };

  const removeRow = (index) => {
    dispatch(removeBulkRepaymentRow(index));
  };

  const handleSelectChange = (value, rowIndex, fieldName) => {
    const [loanId, userId] = value.split("@");
    console.log(loanId, userId);

    if (userId && loanId) {
      dispatch(fetchClosingBalance({ userId, loanId, rowIndex }));
    }
    dispatch(updateBulkRepaymentData({ rowIndex, fieldName: "userId", value: userId }));
    dispatch(updateBulkRepaymentData({ rowIndex, fieldName, value: value }));
  };

  const handleChange = (value, rowIndex, fieldName) => {
    dispatch(updateBulkRepaymentData({ rowIndex, fieldName, value }));
  };

  const InfoIcon = ({ data }) => {
    return (
      <div className="relative inline-block group z-50">
        <div className="flex items-center justify-center w-4 h-4 bg-indigo-500 text-white text-xs font-bold rounded-full cursor-pointer">
          i
        </div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden w-64 bg-gray-700 text-white text-xs rounded-md shadow-lg p-3 group-hover:block">
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li
                key={key}
                className="mb-1 last:mb-0 flex font-semibold justify-between"
              >
                <div>{convertToReadableString(key)}:</div>
                <div>
                  {typeof value === "number"
                    ? formatNumber(value)
                    : isDateString(value)
                    ? convertDate(value)
                    : convertToTitleCase(value)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
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
          {draftRepaymentDTOList.map((item, rowIndex) => (
            <tr key={rowIndex}>
              <td className="py-3 text-center">{rowIndex + 1}</td>
              <td className="py-3 text-center w-1/4">
                <InputSelect
                  inputName="loan"
                  inputOptions={openLoans}
                  inputValue={item.loan}
                  onChange={(e) =>
                    handleSelectChange(e.target.value, rowIndex, "loan")
                  }
                  searchable={true}
                  isValidation={true}
                  disabled={false}
                />
              </td>
              <td className="py-3 text-center w-1/12">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <InputNumber
                      inputName="amount"
                      inputValue={item.amount}
                      onChange={(e) =>
                        handleChange(e.target.value, rowIndex, "amount")
                      }
                      loading={loading}
                      isValidation={true}
                      disabled={false}
                    />
                  </div>
                  {item.closingBalance && (
                    <InfoIcon data={item.closingBalance} />
                  )}
                </div>
              </td>
              <td className="py-3 text-center">
                <InputSelect
                  inputName="method"
                  inputOptions={methodOptions}
                  inputValue={item.method}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "method")
                  }
                  isValidation={true}
                  disabled={false}
                />
              </td>
              <td className="py-3 text-center w-1/12">
                <InputDate
                  inputName="collectionDate"
                  inputValue={item.collectionDate}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "collectionDate")
                  }
                  isValidation={true}
                  showIcon={false}
                  isDisabled={false}
                />
              </td>
              <td className="py-3 text-center ">
                {
                  // Agent Api Required
                  /* <InputSelect
                  inputName="collectionBy"
                  inputOptions={collectionByOptions}
                  inputValue={item.collectionBy}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "collectionBy")
                  }
                  isValidation={true}
                /> */
                }

                <InputText
                  inputName="collectionBy"
                  inputValue={item.collectionBy}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "collectionBy")
                  }
                  isValidation={true}
                  disabled={false}
                />
              </td>
              <td className="py-3 text-center">
                <InputText
                  inputName="description"
                  inputValue={item.description}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "description")
                  }
                  isValidation={true}
                  disabled={false}
                />
              </td>
              <td className="py-3 text-center w-1/12">
                <InputSelect
                  inputName="accounting"
                  inputOptions={accountingOptions}
                  inputValue={item.accounting}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "accounting")
                  }
                  isValidation={true}
                  disabled={false}
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
        <Button
          buttonName={"Add Row"}
          onClick={addRow}
          rectangle={true}
          className={"disabled:bg-gray-600"}
          disabled={openLoans.length <= draftRepaymentDTOList.length}
          buttonType="secondary"
        />

        <Button
          buttonName={"Upload Repayments"}
          onClick={() => {
            dispatch(uploadRepayment({ draftRepaymentDTOList }));
          }}
          rectangle={true}
        />
      </div>
    </ContainerTile>
  );
};

export default AddBulkRepayment;
