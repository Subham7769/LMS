import { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import useRacRules from "../../utils/useRACRules";
import toast from "react-hot-toast";
import { RowChanged } from "../Toasts";
import InputNumber from "../Common/InputNumber/InputNumber";
import Button from "../Common/Button/Button";

const DeliquencyEq = () => {
  const { racID } = useParams();
  const deliquencyEqData = useRacRules("/delinquency-rule/", "delinquency");

  const [inputList, setInputList] = useState([
    { periodInMonths: "", noOfLateMonths: "", noOfLateTimes: "" },
  ]);

  useEffect(() => {
    if (deliquencyEqData.rules?.length > 0) {
      const availableDeliquency = deliquencyEqData.rules[0].delinquencyRules;
      if (availableDeliquency?.length > 0) {
        setInputList(availableDeliquency);
      }
    }
  }, [deliquencyEqData]);

  const handleAddAllFields = async () => {
    const token = localStorage.getItem("authToken");

    const postData = {
      delinquencies: inputList,
      racId: racID,
      ruleUsage: [{ racId: racID, ruleUsage: "USED" }],
    };

    try {
      const response = await fetch(
        `https://api-test.lmscarbon.com/carbon-product-service/lmscarbon/rules/delinquency-rule/${racID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      toast.custom((t) => <RowChanged t={t} toast={toast} />);
    } catch (error) {
      console.error("Failed to update data:", error);
    }
  };

  const handleAddFields = () => {
    setInputList([
      ...inputList,
      { periodInMonths: "", noOfLateMonths: "", noOfLateTimes: "" },
    ]);
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setInputList((prevList) => {
      const newList = [...prevList];
      newList[index][name] = value;
      return newList;
    });
  };

  const handleDelete = (index) => {
    setInputList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="shadow-md rounded-xl p-3 max-w-[660px] border border-red-600">
      <div className="flex items-center justify-between">
        <div>Deliquency Equation:</div>
        <Button buttonIcon={PlusIcon} onClick={handleAddFields} circle={true} />
      </div>
      {inputList.map((item, index) => (
        <div className="flex gap-2 items-end mt-5" key={index}>
          <InputNumber
            labelName="No. of Late Months From"
            inputName="noOfLateMonths"
            inputValue={item.noOfLateMonths}
            onChange={(e) => handleChange(e, index)}
            placeholder="2"
          />
          <InputNumber
            labelName="To"
            inputName="noOfLateTimes"
            inputValue={item.noOfLateTimes}
            onChange={(e) => handleChange(e, index)}
            placeholder="2"
          />
          <InputNumber
            labelName="Period in Months"
            inputName="periodInMonths"
            inputValue={item.periodInMonths}
            onChange={(e) => handleChange(e, index)}
            placeholder="3"
          />
          <Button
            buttonIcon={TrashIcon}
            onClick={() => handleDelete(index)}
            circle={true}
          />
        </div>
      ))}
      <div className="text-right mt-5">
        <Button buttonIcon={CheckCircleIcon} buttonName="Save" onClick={handleAddAllFields} rectangle={true} />
      </div>
    </div>
  );
};

export default DeliquencyEq;
