import React, { useEffect } from "react";
import InputNumber from "../../Common/InputNumber/InputNumber";
import InputSelect from "../../Common/InputSelect/InputSelect";
import InputText from "../../Common/InputText/InputText";
import InputDate from "../../Common/InputDate/InputDate";
import {
  methodOptions,
  accountingOptions,
} from "../../../data/LosData";
import ContainerTile from "../../Common/ContainerTile/ContainerTile";
import {
  updateBulkRepaymentData,
  addBulkRepaymentRow,
  removeBulkRepaymentRow,
  uploadRepayment,
  getOpenLoans,
  fetchClosingBalance,
  resetAddBulkRepaymentData,
} from "../../../redux/Slices/personalRepaymentsSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import convertToReadableString from "../../../utils/convertToReadableString";
import formatNumber from "../../../utils/formatNumber";
import isDateString from "../../../utils/isDateString";
import { convertDate } from "../../../utils/convertDate";
import convertToTitleCase from "../../../utils/convertToTitleCase";
import { useNavigate } from "react-router-dom";
import { AddIcon, DeleteIcon } from "../../../assets/icons";

const AddBulkRepayment = () => {
  const dispatch = useDispatch();
  const { draftRepaymentDTOList, openLoans, loading } =
    useSelector((state) => state.personalRepayments);
  console.log(draftRepaymentDTOList);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOpenLoans());
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
    dispatch(
      updateBulkRepaymentData({ rowIndex, fieldName: "userId", value: userId })
    );
    dispatch(updateBulkRepaymentData({ rowIndex, fieldName, value: value }));
  };

  const handleChange = (value, rowIndex, fieldName) => {
    dispatch(updateBulkRepaymentData({ rowIndex, fieldName, value }));
  };

  const handleUploadRepayment = async () => {
    await dispatch(uploadRepayment({ draftRepaymentDTOList })).unwrap();
    dispatch(resetAddBulkRepaymentData());
    navigate(
      `/loan/loan-origination-system/personal/repayments/approve-repayment`
    );
  };

  const InfoIcon = ({ data }) => {
    console.log(data);
    return (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li
              key={key}
              className="mb-1 last:mb-0 flex font-medium justify-between text-xs"
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
    );
  };


  return (
    <>
      {draftRepaymentDTOList.map((item, rowIndex) => (
        <ContainerTile className={"p-5"}>
          <div
            className="grid md:grid-cols-2 xl:grid-cols-5 gap-4 items-end"
            key={rowIndex}
          >
            <div className="md:col-span-2">
              <InputSelect
                labelName="Loan Id"
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
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="flex-1">
                <InputNumber
                  labelName="Amount"
                  inputName="amount"
                  inputValue={item.amount}
                  onChange={(e) =>
                    handleChange(e.target.value, rowIndex, "amount")
                  }
                  loading={loading}
                  toolTipText={
                    item.closingBalance && (
                      <InfoIcon data={item.closingBalance} />
                    )
                  }
                  toolTipPosition="bottom"
                  isValidation={true}
                  disabled={false}
                />
              </div>
              {/* {item.closingBalance && <InfoIcon data={item.closingBalance} />} */}
            </div>
            <InputSelect
              labelName="Method"
              inputName="method"
              inputOptions={methodOptions}
              inputValue={item.method}
              onChange={(e) => handleChange(e.target.value, rowIndex, "method")}
              isValidation={true}
              disabled={false}
            />
            <div>
              <InputDate
                labelName="Collection Date"
                inputName="collectionDate"
                inputValue={item.collectionDate}
                onChange={(e) =>
                  handleChange(e.target.value, rowIndex, "collectionDate")
                }
                isValidation={true}
                showIcon={false}
                isDisabled={false}
              />
            </div>
            <InputText
              labelName="Collection By"
              inputName="collectionBy"
              inputValue={item.collectionBy}
              onChange={(e) =>
                handleChange(e.target.value, rowIndex, "collectionBy")
              }
              isValidation={true}
              disabled={false}
            />
            <InputText
              labelName="Description"
              inputName="description"
              inputValue={item.description}
              onChange={(e) =>
                handleChange(e.target.value, rowIndex, "description")
              }
              isValidation={true}
              disabled={false}
            />
            <InputSelect
              labelName="Accounting"
              inputName="accounting"
              inputOptions={accountingOptions}
              inputValue={item.accounting}
              onChange={(e) =>
                handleChange(e.target.value, rowIndex, "accounting")
              }
              isValidation={true}
              disabled={false}
            />
            <div className="text-right md:col-span-2">
              <Button
                buttonIcon={DeleteIcon}
                onClick={() => removeRow(rowIndex)}
                buttonType="destructive"
              />
            </div>
          </div>
        </ContainerTile>
      ))}
      <div className="flex justify-end px-5 pb-5 gap-5">
        <Button
          buttonName={"Add"}
          onClick={addRow}
          buttonIcon={AddIcon}
          disabled={openLoans.length <= draftRepaymentDTOList.length}
          buttonType="secondary"
        />
        <Button
          buttonName={"Upload Repayments"}
          onClick={handleUploadRepayment}
        />
      </div>
    </>
  );
};

export default AddBulkRepayment;
