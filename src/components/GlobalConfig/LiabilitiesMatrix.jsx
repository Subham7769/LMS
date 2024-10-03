import React, { useEffect } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import _ from "lodash";
import toast, { Toaster } from "react-hot-toast";
import { Passed } from "../Toasts";
import LoadingState from "../LoadingState/LoadingState";
import {
  productOptions,
  issuerOptions,
  gdbrWMortageOptions,
  gdbrWoMortageOptions,
  defaultScoreOptions,
} from "../../data/OptionsData";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import InputCheckbox from "../Common/InputCheckbox/InputCheckbox";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLiabilityData,
  handleLiabilityNewInputChange,
  addNewLiabilityItem,
  updateLiabilityItem,
  deleteLiabilityItem,
} from "../../redux/Slices/globalConfigSlice";
import {
  clearValidationError,
  setValidationError,
  validateFormFields,
} from "../../redux/Slices/validationSlice";

const LiabilitiesMatrix = () => {
  const dispatch = useDispatch();
  const { allLiabilityData, newLiabilityForm, loading } = useSelector(
    (state) => state.globalConfig
  );
  const { validationError } = useSelector((state) => state.validation);
  const fields = [
    "product",
    "simahDescriptionCode",
    "issuer",
    "applicabilityGDBR",
    "totalExposure",
    "defaultConsideredInSIMAHscore",
  ];

  useEffect(() => {
    dispatch(fetchLiabilityData());

    const initialValidationError = {};
    fields.forEach((field) => {
      initialValidationError[field] = false; // Set all fields to false initially
    });
    dispatch(setValidationError(initialValidationError));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = async (e, index) => {
    const { name, value, checked, type } = e.target;

    const updatedItem = {
      ...allLiabilityData[index],
      [name]: type === "checkbox" ? checked : value,
    };

    const oldSimahDescriptionCode =
      allLiabilityData[index].simahDescriptionCode;

    try {
      await dispatch(
        updateLiabilityItem({ updatedItem, oldSimahDescriptionCode })
      ).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Updated Successfully"}
          message={"The item has been updated successfully"}
        />
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRow = async (deleteURL) => {
    try {
      await dispatch(deleteLiabilityItem(deleteURL)).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Delete Successful"}
          message={"The item has been deleted successfully"}
        />
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    const isValid = validateFormFields(fields, newLiabilityForm, dispatch);
    if (isValid) {
      await dispatch(addNewLiabilityItem(newLiabilityForm)).unwrap();
      toast.custom((t) => (
        <Passed
          t={t}
          toast={toast}
          title={"Added Successfully"}
          message={"The item has been added successfully"}
        />
      ));
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <h2 className="mb-6">
        <b
          title="Credit Bureau Liabilities Matrix"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Credit Bureau Liabilities Matrix
        </b>
      </h2>
      <div className="flex flex-col gap-5 relative">
        <ContainerTile>
          <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] py-2 max-sm:grid-cols-1 gap-8 items-center">
            <InputSelect
              labelName="Product"
              inputOptions={productOptions}
              inputName="product"
              inputValue={newLiabilityForm?.product}
              onChange={(e) =>
                dispatch(handleLiabilityNewInputChange(e.target))
              }
              showError={validationError.product}
              onFocus={() =>
                dispatch(
                  setValidationError({ ...validationError, product: false })
                )
              }
            />
            <InputText
              labelName="CB Description (CODE)"
              inputName="simahDescriptionCode"
              placeHolder="TMTG"
              inputValue={newLiabilityForm?.simahDescriptionCode}
              onChange={(e) =>
                dispatch(
                  handleLiabilityNewInputChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              showError={validationError.simahDescriptionCode}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    simahDescriptionCode: false,
                  })
                )
              }
            />

            <InputSelect
              labelName="Issuer"
              inputOptions={issuerOptions}
              inputName="issuer"
              inputValue={newLiabilityForm?.issuer}
              onChange={(e) =>
                dispatch(handleLiabilityNewInputChange(e.target))
              }
              showError={validationError.issuer}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    issuer: false,
                  })
                )
              }
            />

            <div className="mt-2">
              <InputCheckbox
                labelName="Active Rule"
                inputName="activeRule"
                inputChecked={newLiabilityForm?.activeRule}
                onChange={(e) =>
                  dispatch(handleLiabilityNewInputChange(e.target))
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] py-2 gap-8 items-end">
            <InputSelect
              labelName="GDBR (Without Mortgage)"
              inputOptions={gdbrWoMortageOptions}
              inputName="applicabilityGDBR"
              inputValue={newLiabilityForm?.applicabilityGDBR}
              onChange={(e) =>
                dispatch(handleLiabilityNewInputChange(e.target))
              }
              showError={validationError.applicabilityGDBR}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    applicabilityGDBR: false,
                  })
                )
              }
            />

            <InputSelect
              labelName="GDBR (including Mortgage)"
              inputOptions={gdbrWMortageOptions}
              inputName="totalExposure"
              inputValue={newLiabilityForm?.totalExposure}
              onChange={(e) =>
                dispatch(handleLiabilityNewInputChange(e.target))
              }
              showError={validationError.totalExposure}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    totalExposure: false,
                  })
                )
              }
            />

            <InputSelect
              labelName="Default considered in CB score"
              inputOptions={defaultScoreOptions}
              inputName="defaultConsideredInSIMAHscore"
              inputValue={newLiabilityForm?.defaultConsideredInSIMAHscore}
              onChange={(e) =>
                dispatch(handleLiabilityNewInputChange(e.target))
              }
              showError={validationError.defaultConsideredInSIMAHscore}
              onFocus={() =>
                dispatch(
                  setValidationError({
                    ...validationError,
                    defaultConsideredInSIMAHscore: false,
                  })
                )
              }
            />

            <Button buttonIcon={PlusIcon} onClick={handleAdd} circle={true} />
          </div>
        </ContainerTile>
        {allLiabilityData.length > 0 ? (
          allLiabilityData?.map((item, index) => (
            <ContainerTile>
              <div key={index} className="flex flex-col gap-y-6 ">
                <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] max-sm:grid-cols-1 gap-8 items-end">
                  <InputSelect
                    labelName="Product"
                    inputOptions={productOptions}
                    inputName="product"
                    inputValue={item?.product}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled
                  />
                  <InputText
                    labelName="CB Description (CODE)"
                    inputName="simahDescriptionCode"
                    inputValue={item?.simahDescriptionCode}
                    placeHolder="TMTG"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputSelect
                    labelName="Issuer"
                    inputOptions={issuerOptions}
                    inputName="issuer"
                    inputValue={item?.issuer}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <div className="mb-2">
                    <InputCheckbox
                      labelName="Active Rule"
                      inputName="activeRule"
                      inputChecked={item?.activeRule === "YES" ? true : false}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] gap-8 item?s-end">
                  <InputSelect
                    labelName="GDBR (Without Mortgage)"
                    inputOptions={gdbrWoMortageOptions}
                    inputName="applicabilityGDBR"
                    inputValue={item?.applicabilityGDBR}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputSelect
                    labelName="GDBR (including Mortgage)"
                    inputOptions={gdbrWMortageOptions}
                    inputName="totalExposure"
                    inputValue={item?.totalExposure}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputSelect
                    labelName="Default considered in CB score"
                    inputOptions={defaultScoreOptions}
                    inputName="defaultConsideredInSIMAHscore"
                    inputValue={item?.defaultConsideredInSIMAHscore}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDeleteRow(item?.simahDescriptionCode)}
                    circle={true}
                  />
                </div>
              </div>
            </ContainerTile>
          ))
        ) : (
          <p className="text-center">No data available</p>
        )}
        <div className="absolute -bottom-1 left-2 text-xs  text-gray-500">
          *CB - Credit Bureau
        </div>
      </div>
    </>
  );
};

export default LiabilitiesMatrix;
