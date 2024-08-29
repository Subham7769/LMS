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
  fetchData,
  handleNewInputChange,
  addNewItem,
  updateItem,
  deleteItem,
} from "../../redux/Slices/liabilitiesMatrixSlice";

const LiabilitiesMatrix = () => {
  const dispatch = useDispatch();
  const { allData, newForm, loading } = useSelector(
    (state) => state.liabilitiesMatrix
  );

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleInputChange = async (e, index) => {
    const { name, value, checked, type } = e.target;

    const updatedItem = {
      ...allData[index],
      [name]: type === "checkbox" ? checked : value,
    };

    const oldSimahDescriptionCode = allData[index].simahDescriptionCode;

    try {
      await dispatch(
        updateItem({ updatedItem, oldSimahDescriptionCode })
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
      await dispatch(deleteItem(deleteURL)).unwrap();
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
    await dispatch(addNewItem(newForm)).unwrap();
    toast.custom((t) => (
      <Passed
        t={t}
        toast={toast}
        title={"Added Successfully"}
        message={"The item has been added successfully"}
      />
    ));
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
              inputValue={newForm.product}
              onChange={(e) => dispatch(handleNewInputChange(e.target))}
            />
            <InputText
              labelName="CB Description (CODE)"
              inputName="simahDescriptionCode"
              placeHolder="TMTG"
              inputValue={newForm.simahDescriptionCode}
              onChange={(e) =>
                dispatch(
                  handleNewInputChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
            />

            <InputSelect
              labelName="Issuer"
              inputOptions={issuerOptions}
              inputName="issuer"
              inputValue={newForm.issuer}
              onChange={(e) => dispatch(handleNewInputChange(e.target))}
            />

            <div className="mt-2">
              <InputCheckbox
                labelName="Active Rule"
                inputName="activeRule"
                inputChecked={newForm.activeRule}
                onChange={(e) => dispatch(handleNewInputChange(e.target))}
              />
            </div>
          </div>
          <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] py-2 gap-8 items-end">
            <InputSelect
              labelName="GDBR (Without Mortgage)"
              inputOptions={gdbrWoMortageOptions}
              inputName="applicabilityGDBR"
              inputValue={newForm.applicabilityGDBR}
              onChange={(e) => dispatch(handleNewInputChange(e.target))}
            />

            <InputSelect
              labelName="GDBR (including Mortgage)"
              inputOptions={gdbrWMortageOptions}
              inputName="totalExposure"
              inputValue={newForm.totalExposure}
              onChange={(e) => dispatch(handleNewInputChange(e.target))}
            />

            <InputSelect
              labelName="Default considered in CB score"
              inputOptions={defaultScoreOptions}
              inputName="defaultConsideredInSIMAHscore"
              inputValue={newForm.defaultConsideredInSIMAHscore}
              onChange={(e) => dispatch(handleNewInputChange(e.target))}
            />

            <Button buttonIcon={PlusIcon} onClick={handleAdd} circle={true} />
          </div>
        </ContainerTile>
        <ContainerTile>
          {allData.length > 0 ? (
            allData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-y-6 mt-6 border-b border-gray-300 pb-6"
              >
                <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] max-sm:grid-cols-1 gap-8 items-end">
                  <InputSelect
                    labelName="Product"
                    inputOptions={productOptions}
                    inputName="product"
                    inputValue={item.product}
                    onChange={(e) => handleInputChange(e, index)}
                    disabled
                  />
                  <InputText
                    labelName="CB Description (CODE)"
                    inputName="simahDescriptionCode"
                    inputValue={item.simahDescriptionCode}
                    placeHolder="TMTG"
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputSelect
                    labelName="Issuer"
                    inputOptions={issuerOptions}
                    inputName="issuer"
                    inputValue={item.issuer}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <div className="mb-2">
                    <InputCheckbox
                      labelName="Active Rule"
                      inputName="activeRule"
                      inputChecked={item.activeRule === "YES" ? true : false}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] gap-8 items-end">
                  <InputSelect
                    labelName="GDBR (Without Mortgage)"
                    inputOptions={gdbrWoMortageOptions}
                    inputName="applicabilityGDBR"
                    inputValue={item.applicabilityGDBR}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputSelect
                    labelName="GDBR (including Mortgage)"
                    inputOptions={gdbrWMortageOptions}
                    inputName="totalExposure"
                    inputValue={item.totalExposure}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <InputSelect
                    labelName="Default considered in CB score"
                    inputOptions={defaultScoreOptions}
                    inputName="defaultConsideredInSIMAHscore"
                    inputValue={item.defaultConsideredInSIMAHscore}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDeleteRow(item.simahDescriptionCode)}
                    circle={true}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No data available</p>
          )}
          <div className="absolute bottom-1 left-2 text-xs text-gray-500">
            *CB - Credit Bureau
          </div>
        </ContainerTile>
      </div>
    </>
  );
};

export default LiabilitiesMatrix;
