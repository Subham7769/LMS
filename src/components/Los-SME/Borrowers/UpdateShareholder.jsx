import React, { useRef } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateShareholderField,
  resetUpdateShareholderData,
  updateShareholderInfo,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateShareholderFields from "./AddUpdateShareholderFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import { fieldToSectionMapPersonalBorrowers } from "../../../data/fieldSectionMapData";

const UpdateShareholder = () => {
  const { updateShareholderData } = useSelector((state) => state.smeBorrowers);
  const dispatch = useDispatch();
  const { uid } = useParams();
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  // console.log(updateShareholderData);

  const handleUpdate = async (uid) => {
    const { dataIndex, ...rest } = updateShareholderData;
    await dispatch(validateForm(flattenToSimpleObject(rest)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    const firstInvalidKey = Object.keys(state.validation.validationError).find(
      (key) => state.validation.validationError[key]
    );
    console.log(firstInvalidKey);
    if (firstInvalidKey) {
      const sectionName = fieldToSectionMapPersonalBorrowers[firstInvalidKey];
      const ref = sectionRefs.current[sectionName];
      console.log(firstInvalidKey, sectionName, ref);
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (isValid) {
      dispatch(updateShareholderInfo({ updateShareholderData, uid })).unwrap();
      navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
    }
  };

  const handleCancel = () => {
    dispatch(resetUpdateShareholderData());
    navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
  };

  return (
    <>
      <AddUpdateShareholderFields
        BorrowerData={updateShareholderData}
        handleChangeReducer={handleChangeUpdateShareholderField}
        sectionRefs={sectionRefs}
      />
      <div className="flex justify-end gap-5 col-span-4 mx-10">
        <Button
          buttonName="Cancel"
          onClick={handleCancel}
          rectangle={true}
          className={"bg-red-500 hover:bg-red-600"}
        />
        <Button
          buttonName="Update"
          onClick={() => handleUpdate(uid)}
          rectangle={true}
        />
      </div>
    </>
  );
};

export default UpdateShareholder;
