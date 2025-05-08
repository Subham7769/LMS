import React, { useEffect, useState } from "react";
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
import { hasViewOnlyAccess } from "../../utils/roleUtils";
import { fetchDocumentConfigData } from "../../redux/Slices/sidebarSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { borrowerTypeOptions, eligibiltyOptions } from "../../data/OptionsData";
import { AddIcon, CheckIcon, DeleteIcon } from "../../assets/icons";
import ListTableClassic from "../Common/ListTable/ListTableClassic";

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
    if (!hasViewOnlyAccess(roleName)) {
      dispatch(handleChangeDocumentConfigData({ id, name, value }));
    }
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

  let ListHeader = [
    { name: "Document Key Name", sortKey: null },
    { name: "Borrower Type", sortKey: null },
    { name: "Usage", sortKey: null },
  ];
  
    // Conditionally add the "Actions" column if roleName has view only access
    if (!hasViewOnlyAccess(roleName)) {
      ListHeader.push({ name: "Actions", sortKey: null });
    }

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
      <ContainerTile loading={loading} className={"px-5 pt-5 pb-1"}>
        {!hasViewOnlyAccess(roleName) && (
          <>
            <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
              Add New Documents
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 items-end mb-6">
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
              <div className="text-right md:text-left">
                <Button
                  buttonIcon={AddIcon}
                  buttonName="Add"
                  onClick={handleAdd}
                />
              </div>
            </div>
          </>
        )}
        <h2 className="text-xl leading-snug text-gray-800 dark:text-gray-100 font-bold mb-3">
          Manage Existing Documents and their Usage
        </h2>
        <ListTableClassic
          ListName="List of Documents"
          ListNameLength={documentConfigData?.length}
          ListHeader={ListHeader}
        >
          {documentConfigData?.map((docData, index) => (
            <tr key={docData.dynamicDocumentId}>
              <td className="px-4 py-4 whitespace-nowrap min-w-52">
                <InputText
                  inputName="documentKeyName"
                  id={docData?.dynamicDocumentId}
                  inputValue={docData?.documentKeyName}
                  onChange={(e) => handleChange(e, docData?.dynamicDocumentId)}
                  placeHolder="PAY_SLIP"
                  isValidation={true}
                  isIndex={docData.dataIndex}
                />
              </td>
              <td className="px-4 py-4 whitespace-nowrap min-w-64">
                <InputSelect
                  inputOptions={borrowerTypeOptions}
                  id={docData?.dynamicDocumentId}
                  inputName="borrowerType"
                  inputValue={docData?.borrowerType}
                  onChange={(e) => handleChange(e, docData?.dynamicDocumentId)}
                />
              </td>
              <td className="px-4 py-4 whitespace-nowrap min-w-60">
                <InputSelect
                  inputOptions={eligibiltyOptions}
                  id={docData?.dynamicDocumentId}
                  inputName="usage"
                  inputValue={docData?.usage}
                  onChange={(e) => handleChange(e, docData?.dynamicDocumentId)}
                />
              </td>
              {!hasViewOnlyAccess(roleName) && (
                <td className="px-4 py-4 whitespace-nowrap flex gap-2">
                  <Button
                    buttonIcon={CheckIcon}
                    onClick={() =>
                      handleSave(docData?.dynamicDocumentId, index)
                    }
                    buttonType="success"
                  />
                  <Button
                    buttonIcon={DeleteIcon}
                    onClick={() =>
                      dispatch(
                        deleteConfig({
                          dynamicDocumentId: docData?.dynamicDocumentId,
                          dynamicDocumentTempId: docData?.dynamicDocumentTempId,
                        })
                      )
                    }
                    buttonType="destructive"
                  />
                </td>
              )}
            </tr>
          ))}
        </ListTableClassic>
      </ContainerTile>
    </>
  );
};

export default DocumentConfig;
