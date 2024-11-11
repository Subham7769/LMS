import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloneModal from "../Common/CloneModal/CloneModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchBEData } from "../../redux/Slices/sidebarSlice";
import {
  setFormData,
  setBlockEmployersTempId,
  fetchBlockedEmployerData,
  fetchBlockedEmployerName,
  updateBlockedEmployerName,
  deleteBlockedEmployerEntry,
  deleteBlockedEmployer,
  addBlockedEmployerEntry,
  cloneBlockedEmployer,
} from "../../redux/Slices/beSlice";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import TagInput from "../TagInput/TagInput";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";

const BlockedEmployer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blockEmployersTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.blockedEmployer);
  const blockEmployer = useSelector(
    (state) => state.blockedEmployer.blockEmployer
  );
  const { itemName } = blockEmployer;

  useEffect(() => {
    dispatch(setBlockEmployersTempId(blockEmployersTempId));
    dispatch(fetchBlockedEmployerData(blockEmployersTempId));
    dispatch(fetchBlockedEmployerName(blockEmployersTempId));
    // Cleanup function to clear validation errors on unmount
    return () => {
      dispatch(clearValidationError());
    };
  }, [blockEmployersTempId, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleDeleteItem = ({ name, ruleName }) => {
    dispatch(
      deleteBlockedEmployerEntry({
        blockEmployersTempId,
        name,
        ruleName,
      })
    ).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchBlockedEmployerData(blockEmployersTempId));
      }
    });
  };

  const handleUpdateName = (newName) => {
    dispatch(updateBlockedEmployerName({ blockEmployersTempId, newName }));
  };

  const handleDeleteBE = () => {
    dispatch(deleteBlockedEmployer(blockEmployersTempId)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchBEData());
        navigate("/blocked-employer");
      }
    });
  };

  const handlePostItem = async (e) => {
    e.preventDefault();
    await dispatch(validateForm(blockEmployer));
    const state = store.getState();
    const isValid = state.validation.isValid;
    if (isValid) {
      dispatch(addBlockedEmployerEntry()).then((action) => {
        if (action.type.endsWith("fulfilled")) {
          dispatch(fetchBlockedEmployerData(blockEmployersTempId));
        }
      });
    }
  };

  const createCloneBE = async (cloneBEName) => {
    const beDetails = await dispatch(
      cloneBlockedEmployer({ blockEmployersTempId, cloneBEName })
    ).unwrap();
    dispatch(fetchBEData());
    navigate(`/blocked-employer/${beDetails.blockEmployerTempId}`);
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DynamicHeader
        itemName={itemName}
        handleNameUpdate={handleUpdateName}
        handleClone={handleClone}
        handleDelete={handleDeleteBE}
        loading={loading}
        error={error}
      />
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createCloneBE}
        initialName={itemName}
      />
      <ContainerTile
        loading={loading}
        error={error}
      >
        <TagInput
          formData={blockEmployer}
          handleChange={handleChange}
          inputTextName={"name"}
          inputTextLabel={"Add Blocked Employer"}
          addTag={handlePostItem}
          deleteTag={handleDeleteItem}
          isValidation={true}
        />
      </ContainerTile>
    </>
  );
};

export default BlockedEmployer;
