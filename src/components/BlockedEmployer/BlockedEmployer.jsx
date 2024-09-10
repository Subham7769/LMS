import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Failed, Passed } from "../Toasts";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import DynamicName from "../Common/DynamicName/DynamicName";
import InputText from "../Common/InputText/InputText";
import Button from "../Common/Button/Button";
import CloneModal from "../Common/CloneModal/CloneModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchBEData } from "../../redux/Slices/sidebarSlice";
import {
  setFormData,
  resetFormData,
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

const BlockedEmployer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { blockEmployersTempId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { formData, data, itemName, loading, error } = useSelector((state) => state.blockedEmployer);

  const cloneSuccess = useSelector(
    (state) => state.blockedEmployer.cloneSuccess
  );

  useEffect(() => {
    dispatch(setBlockEmployersTempId(blockEmployersTempId));
    dispatch(fetchBlockedEmployerData(blockEmployersTempId));
    dispatch(fetchBlockedEmployerName(blockEmployersTempId));
  }, [blockEmployersTempId, dispatch]);

  useEffect(() => {
    if (error) {
      if (error === "Unauthorized") {
        localStorage.clear();
        navigate("/login");
      } else {
        toast.custom((t) => (
          <Failed t={t} toast={toast} title={"Error"} message={error} />
        ));
      }
    }
  }, [error, navigate]);

  useEffect(() => {
    if (cloneSuccess) {
      dispatch(fetchBEData());
      navigate(`/blocked-employer/${cloneSuccess}`);
    }
  }, [cloneSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleDeleteItem = (name, ruleName) => {
    dispatch(
      deleteBlockedEmployerEntry({
        blockEmployersTempId,
        name,
        ruleName,
      })
    ).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Deleted"}
            message={"Item has been deleted successfully"}
          />
        ));
      }
    });
  };

  const handleUpdateName = (newName) => {
    dispatch(updateBlockedEmployerName({ blockEmployersTempId, newName })).then(
      (action) => {
        if (action.type.endsWith("fulfilled")) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Update Successful"}
              message={"The name was updated successfully"}
            />
          ));
        }
      }
    );
  };

  const handleDeleteBE = () => {
    dispatch(deleteBlockedEmployer(blockEmployersTempId)).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        dispatch(fetchBEData());
        navigate("/blocked-employer");
      }
    });
  };

  const handlePostItem = (e) => {
    e.preventDefault();
    dispatch(addBlockedEmployerEntry()).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Item Added"}
            message={"Item was added successfully"}
          />
        ));
      } else if (action.type.endsWith("rejected")) {
        toast.custom((t) => (
          <Failed
            t={t}
            toast={toast}
            title={"Adding Failed"}
            message={action.payload || "Failed to add item"}
          />
        ));
      }
    });
  };

  const createCloneBE = (cloneBEName) => {
    dispatch(cloneBlockedEmployer({ blockEmployersTempId, cloneBEName })).then(
      (action) => {
        if (action.type.endsWith("fulfilled")) {
          toast.custom((t) => (
            <Passed
              t={t}
              toast={toast}
              title={"Clone Created"}
              message={"Clone has been created successfully"}
            />
          ));
        }
      }
    );
  };

  const handleClone = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <LoadingState />;
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName initialName={itemName} onSave={handleUpdateName} />
        <div className="flex gap-4">
          <Button buttonName={"Clone"} onClick={handleClone} rectangle={true} />
          <Button
            buttonIcon={TrashIcon}
            onClick={handleDeleteBE}
            circle={true}
          />
        </div>
      </div>
      <CloneModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateClone={createCloneBE}
        initialName={itemName}
      />
      <ContainerTile>
        <div className="flex items-center gap-5 border-b border-gray-300 pb-5">
          <div className="relative w-1/4">
            <InputText
              labelName="Add Blocked Employer"
              inputName="name"
              inputValue={formData.name}
              onChange={handleChange}
              placeHolder="Blocked Employer"
            />
          </div>
          <Button
            buttonIcon={PlusIcon}
            onClick={handlePostItem}
            circle={true}
          />
        </div>
        {data.map((item, index) => {
          return item.blockEmployersName.map((name, i) => (
            <div key={`${index}-${i}`} className="flex gap-5 items-end mt-5">
              <div className="relative w-1/4">
                <InputText inputValue={name} disabled={true} />
              </div>
              <Button
                buttonIcon={TrashIcon}
                onClick={() => handleDeleteItem(name, item.ruleName)}
                circle={true}
              />
            </div>
          ));
        })}
      </ContainerTile>
    </>
  );
};

export default BlockedEmployer;
