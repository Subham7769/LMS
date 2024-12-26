import React from "react";
import AddLoanFields from "./AddLoanFields";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../Common/Button/Button";
import { validateForm } from "../../../redux/Slices/validationSlice";

const AddLoans = () => {
  const dispatch = useDispatch();
  const { addLoanData } = useSelector((state) => state.loans);
  const isValid = useSelector((state) => state.validation.isValid);

  function flattenToSimpleObject(nestedObject) {
    const result = {};

    function recurse(current) {
      for (const key in current) {
        if (typeof current[key] === "object" && current[key] !== null) {
          recurse(current[key]);
        } else {
          result[key] = current[key];
        }
      }
    }

    recurse(nestedObject);
    console.log(result);
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(flattenToSimpleObject(addLoanData)));
    if (isValid) {
      // dispatch(registerBorrower(addLoanData));
      console.log("API call made");
    }
  };

  return (
    <>
      <AddLoanFields addLoanData={addLoanData} />
      {/* Save Button */}
      <div className="flex justify-center col-span-4">
        <Button buttonName="Submit" onClick={handleSubmit} rectangle={true} />
      </div>
    </>
  );
};

export default AddLoans;
