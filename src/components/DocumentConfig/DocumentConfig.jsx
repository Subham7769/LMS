import React, { useEffect, useState } from "react";
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import InputText from "../Common/InputText/InputText";
import InputSelect from "../Common/InputSelect/InputSelect";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";
import CloneModal from "../Common/CloneModal/CloneModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  setAddDocumentConfigData,
  handleChangeDocumentConfigData,
  fetchName,
  updateName,
  deleteDocumentConfig,
  createClone,
  fetchData,
  addDocumentConfig,
  updateDocumentConfigData,
  deleteConfig,
} from "../../redux/Slices/documentConfigSlice";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";
import { fetchDocumentConfigData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { borrowerTypeOptions, eligibiltyOptions } from "../../data/OptionsData";

const DocumentConfig = () => {
  const { dynamicDocumentTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    itemName,
    documentConfigData,
    addDocumentConfigData,
    loading,
    error,
  } = useSelector((state) => state.documentConfig);
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchName(dynamicDocumentTempId));
    dispatch(fetchData(dynamicDocumentTempId));
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch, dynamicDocumentTempId]);

  const handleNameUpdate = async (newName) => {
    await dispatch(updateName({ dynamicDocumentTempId, newName }));
    dispatch(fetchName(dynamicDocumentTempId));
    dispatch(fetchDocumentConfigData());
  };

  const handleDelete = async () => {
    await dispatch(deleteDocumentConfig(dynamicDocumentTempId)).unwrap();
    await dispatch(fetchDocumentConfigData());
    navigate("/loan/document-config");
  };

  const createCloneDocumentConfig = async (cloneName) => {
    const Details = await dispatch(
      createClone({ dynamicDocumentTempId, cloneName })
    ).unwrap();
    dispatch(fetchDocumentConfigData());
    navigate("/loan/document-config/" + Details.dynamicDocumentTempId);
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setAddDocumentConfigData({ name, value }));
  };

  const handleAdd = async () => {
    await dispatch(validateForm(addDocumentConfigData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const addDocumentConfigDataPayload = {
        ...addDocumentConfigData,
        dynamicDocumentTempId,
      };
      dispatch(addDocumentConfig(addDocumentConfigDataPayload)).unwrap();
    }
  };

  const handleChange = (e, id) => {
    const { name, value } = e.target;
    dispatch(handleChangeDocumentConfigData({ id, name, value }));
  };

  const handleSave = async (id, index) => {
    await dispatch(validateForm(documentConfigData[index]));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      const updatePayload = documentConfigData[index];
      dispatch(updateDocumentConfigData(updatePayload));
    }
  };

  return (
    <>
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleNameUpdate}
        handleClone={handleClone}
        handleDelete={handleDelete}
        loading={loading}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createCloneDocumentConfig}
        initialName={itemName}
      />
      <ContainerTile loading={loading}>
        <div className="grid grid-cols-4 gap-4 items-end mb-4">
          <InputText
            labelName="Document Key Name"
            inputName="documentKeyName"
            inputValue={addDocumentConfigData?.documentKeyName}
            onChange={handleInputChange}
            placeHolder="PAY_SLIP"
            isValidation={true}
          />
          <InputSelect
            labelName="Borrower Type"
            inputOptions={borrowerTypeOptions}
            inputName="borrowerType"
            inputValue={addDocumentConfigData?.borrowerType}
            onChange={handleInputChange}
            isValidation={true}
          />
          <InputSelect
            labelName="Usage"
            inputOptions={eligibiltyOptions}
            inputName="usage"
            inputValue={addDocumentConfigData?.usage}
            onChange={handleInputChange}
            isValidation={true}
          />
          <div>
            <Button
              buttonIcon={PlusIcon}
              buttonName="Add"
              onClick={handleAdd}
              rectangle={true}
            />
          </div>
        </div>
        {documentConfigData.length > 0 && (
          <div className="shadow-md border border-border-gray-primary rounded-md text-center bg-white">
            <div className="grid grid-cols-4 items-end mb-4 bg-background-light-secondary px-5">
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Key Name
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrower Type
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </div>
              <div className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </div>
            </div>
            {documentConfigData?.map((docData, index) => (
              <div
                key={docData.dynamicDocumentId}
                className={`grid grid-cols-4 gap-4 items-center pb-3 px-5 mb-3 
                ${
                  index !== documentConfigData.length - 1
                    ? "border-b border-border-gray-primary"
                    : ""
                }`}
              >
                <InputText
                  inputName="documentKeyName"
                  id={docData?.dynamicDocumentId}
                  inputValue={docData?.documentKeyName}
                  onChange={(e) => handleChange(e, docData?.dynamicDocumentId)}
                  placeHolder="PAY_SLIP"
                  isValidation={true}
                  isIndex={docData.dataIndex}
                />
                <InputSelect
                  inputOptions={borrowerTypeOptions}
                  id={docData?.dynamicDocumentId}
                  inputName="borrowerType"
                  inputValue={docData?.borrowerType}
                  onChange={(e) => handleChange(e, docData?.dynamicDocumentId)}
                />
                <InputSelect
                  inputOptions={eligibiltyOptions}
                  id={docData?.dynamicDocumentId}
                  inputName="usage"
                  inputValue={docData?.usage}
                  onChange={(e) => handleChange(e, docData?.dynamicDocumentId)}
                />
                {!hasViewOnlyAccessGroup2(roleName) ? (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      buttonIcon={CheckCircleIcon}
                      onClick={() =>
                        handleSave(docData?.dynamicDocumentId, index)
                      }
                      circle={true}
                      buttonType="secondary"
                    />
                    <Button
                      buttonIcon={TrashIcon}
                      onClick={() =>
                        dispatch(
                          deleteConfig({
                            dynamicDocumentId: docData?.dynamicDocumentId,
                            dynamicDocumentTempId:
                              docData?.dynamicDocumentTempId,
                          })
                        )
                      }
                      circle={true}
                      buttonType="destructive"
                    />
                  </div>
                ) : (
                  "-"
                )}
              </div>
            ))}
          </div>
        )}
      </ContainerTile>
    </>
  );
};

export default DocumentConfig;
