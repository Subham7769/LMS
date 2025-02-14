import React, { useEffect } from "react";
import {
  CheckCircleIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
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
  handleLiabilityInputChange,
} from "../../redux/Slices/globalConfigSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";

const LiabilitiesMatrix = () => {
  const dispatch = useDispatch();
  const { allLiabilityData, newLiabilityForm, loading, error } = useSelector(
    (state) => state.globalConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchLiabilityData());
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  const handleInputChange = async (e, index) => {
    const { name, value, checked, type } = e.target;

    dispatch(handleLiabilityInputChange({ name, value, checked, type, index }));
  };

  const handleSave = async (index) => {
    const updatedItem = allLiabilityData[index];
    const oldSimahDescriptionCode =
      allLiabilityData[index].simahDescriptionCode;
    try {
      await dispatch(
        updateLiabilityItem({ updatedItem, oldSimahDescriptionCode })
      ).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRow = async (deleteURL) => {
    try {
      await dispatch(deleteLiabilityItem(deleteURL)).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async () => {
    await dispatch(validateForm(newLiabilityForm));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      await dispatch(addNewLiabilityItem(newLiabilityForm)).unwrap();
    }
  };


  return (
    <>
      <h2 className="mb-6">
        <b
          title="Credit Bureau Liabilities Matrix"
          className="text-xl font-semibold hover:bg-gray-200 transition duration-500 hover:p-2 p-2 hover:rounded-md cursor-pointer"
        >
          Credit Bureau Liabilities Matrix
        </b>
      </h2>
      <div className="flex flex-col gap-5 relative">
        {!hasViewOnlyAccessGroup2(roleName) ? (
          <ContainerTile
            loading={loading}
            // error={error}
          >
            <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] py-2 max-sm:grid-cols-1 gap-8 items-center">
              <InputSelect
                labelName="Product"
                inputOptions={productOptions}
                inputName="product"
                inputValue={newLiabilityForm?.product}
                onChange={(e) =>
                  dispatch(handleLiabilityNewInputChange(e.target))
                }
                isValidation={true}
                isIndex={newLiabilityForm.dataIndex}
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
                isValidation={true}
                isIndex={newLiabilityForm.dataIndex}
              />

              <InputSelect
                labelName="Issuer"
                inputOptions={issuerOptions}
                inputName="issuer"
                inputValue={newLiabilityForm?.issuer}
                onChange={(e) =>
                  dispatch(handleLiabilityNewInputChange(e.target))
                }
                isValidation={true}
                isIndex={newLiabilityForm.dataIndex}
              />

              <div className="mt-2">
                <InputCheckbox
                  labelName="Active Rule"
                  inputName="activeRule"
                  inputChecked={
                    newLiabilityForm?.activeRule === "YES" ? true : false
                  }
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
                isValidation={true}
                isIndex={newLiabilityForm.dataIndex}
              />

              <InputSelect
                labelName="GDBR (including Mortgage)"
                inputOptions={gdbrWMortageOptions}
                inputName="totalExposure"
                inputValue={newLiabilityForm?.totalExposure}
                onChange={(e) =>
                  dispatch(handleLiabilityNewInputChange(e.target))
                }
                isValidation={true}
                isIndex={newLiabilityForm.dataIndex}
              />

              <InputSelect
                labelName="Default considered in CB score"
                inputOptions={defaultScoreOptions}
                inputName="defaultConsideredInSIMAHscore"
                inputValue={newLiabilityForm?.defaultConsideredInSIMAHscore}
                onChange={(e) =>
                  dispatch(handleLiabilityNewInputChange(e.target))
                }
                isValidation={true}
                isIndex={newLiabilityForm.dataIndex}
              />

              <Button
                buttonIcon={PlusIcon}
                onClick={handleAdd}
                circle={true}
              />
            </div>
          </ContainerTile>
        ) : (
          ""
        )}

        {allLiabilityData.length > 0
          ? allLiabilityData?.map((item, index) => (
              <ContainerTile
                loading={loading}
                error={error}
                key={"Liability" + index}
              >
                <div key={index} className="flex flex-col gap-y-6 ">
                  <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] max-sm:grid-cols-1 gap-8 items-end">
                    <InputSelect
                      labelName="Product"
                      inputOptions={productOptions}
                      inputName="product"
                      inputValue={item?.product}
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={true}
                    />
                    <InputText
                      labelName="CB Description (CODE)"
                      inputName="simahDescriptionCode"
                      inputValue={item?.simahDescriptionCode}
                      placeHolder="TMTG"
                      onChange={(e) => handleInputChange(e, index)}
                      disabled={true}
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
                  <div className="grid grid-cols-[repeat(3,_minmax(0,_1fr))_150px] gap-8 items-end">
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
                    {!hasViewOnlyAccessGroup2(roleName) ? (
                      <div className="flex items-center gap-4">
                        <Button
                          buttonIcon={CheckCircleIcon}
                          onClick={() => handleSave(index)}
                          circle={true}
                          buttonType="secondary"
                        />
                        <Button
                          buttonIcon={TrashIcon}
                          onClick={() =>
                            handleDeleteRow(item?.simahDescriptionCode)
                          }
                          circle={true}
                          buttonType="destructive"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </ContainerTile>
            ))
          : ""}
        <div className="absolute bottom-1 left-2 text-xs  text-gray-500">
          *CB - Credit Bureau
        </div>
      </div>
    </>
  );
};

export default LiabilitiesMatrix;