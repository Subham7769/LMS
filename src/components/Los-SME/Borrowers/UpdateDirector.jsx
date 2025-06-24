import React, { useRef } from "react";
import Button from "../../Common/Button/Button";
import {
  handleChangeUpdateDirectorField,
  resetUpdateDirectorData,
  updateDirectorInfo,
  fetchAllCompanyBorrowersByLoanOfficer,
  fetchCompanyDetails,
} from "../../../redux/Slices/smeBorrowersSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateForm } from "../../../redux/Slices/validationSlice";
import AddUpdateDirectorFields from "./AddUpdateDirectorFields";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../redux/store";
import flattenToSimpleObject from "../../../utils/flattenToSimpleObject";
import { fieldToSectionMapPersonalBorrowers } from "../../../data/fieldSectionMapData";

const UpdateDirector = () => {
  const { companyId, updateDirectorData, error, loading } = useSelector(
    (state) => state.smeBorrowers
  );
  const dispatch = useDispatch();
  const { uid } = useParams();
  const navigate = useNavigate();
  const sectionRefs = useRef({});

  console.log(updateDirectorData);

  const handleUpdate = async (uid) => {
    const { dataIndex, ...rest } = updateDirectorData;
    await dispatch(validateForm(flattenToSimpleObject(rest)));

    // Access the updated state directly using getState
    const state = store.getState(); // Ensure 'store' is imported from your Redux setup
    const isValid = state.validation.isValid; // Adjust based on your state structure
    const firstInvalidKey = Object.keys(state.validation.validationError).find(
      (key) => state.validation.validationError[key]
    );
    if (firstInvalidKey) {
      const sectionName = fieldToSectionMapPersonalBorrowers[firstInvalidKey];
      const ref = sectionRefs.current[sectionName];
      if (ref?.scrollIntoView) {
        ref.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    if (isValid) {
      dispatch(updateDirectorInfo({ updateDirectorData, uid })).unwrap();
      navigate(`/loan/loan-origination-system/sme/borrowers/view-company`);
    }
  };

  const handleCancel = () => {
    dispatch(resetUpdateDirectorData());
    navigate(`/loan/loan-origination-system/sme/borrowers/add-director`);
  };

  return (
    <>
      <AddUpdateDirectorFields
        BorrowerData={updateDirectorData}
        handleChangeReducer={handleChangeUpdateDirectorField}
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

export default UpdateDirector;
