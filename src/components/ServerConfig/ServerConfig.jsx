import React, { useEffect, useState } from "react";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import InputText from "../Common/InputText/InputText";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Button from "../Common/Button/Button";
import { PlusIcon, XCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  fetchData,
  updateServerConfig,
  updateServerConfigField,
  updateNewServerConfigField,
  createServerConfig,
  resetNewServerConfigData,
  deleteServerConfig,
} from "../../redux/Slices/serverConfigSlice";
import store from "../../redux/store";
import {
  clearValidationError,
  validateForm,
} from "../../redux/Slices/validationSlice";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";

const ServerConfig = () => {
  const [bindingData, setBindingData] = useState({});
  const [bindingKey, setBindingKey] = useState("");
  const [bindingValue, setBindingValue] = useState("");
  const dispatch = useDispatch();
  const { serverConfigData, newServerConfigData, loading, error } = useSelector(
    (state) => state.serverConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchData());
    return () => {
      dispatch(clearValidationError());
    };
  }, [dispatch]);

  // Function to handle changes to the binding inputs
  const handleBindingChange = (index, key, value) => {
    setBindingData((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [key]: value,
      },
    }));
  };

  // Function to add a binding
  const handleAddBinding = (index) => {
    const { bindingKey, bindingValue } = bindingData[index] || {};
    if (bindingKey && bindingValue) {
      const updatedBindings = {
        ...serverConfigData[index].bindings,
        [bindingKey]: bindingValue,
      };

      dispatch(
        updateServerConfigField({
          name: "bindings",
          value: updatedBindings,
          index,
        })
      );

      // Clear the local state for the added index
      setBindingData((prev) => ({
        ...prev,
        [index]: { bindingKey: "", bindingValue: "" },
      }));
    } else {
      toast.warn("Both key and value are required to add a binding");
    }
  };

  const handleRemoveBinding = (key, index) => {
    const updatedBindings = { ...serverConfigData[index].bindings };
    delete updatedBindings[key];

    dispatch(
      updateServerConfigField({
        name: "bindings",
        value: updatedBindings,
        index,
      })
    );
  };

  const handleUpdateServerConfig = (name, index) => {
    const updatedServerConfigData = serverConfigData[index];
    dispatch(updateServerConfig({ name, updatedServerConfigData }));
  };

  const handleDelete = (name) => {
    dispatch(deleteServerConfig(name));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    dispatch(updateServerConfigField({ name, value, index }));
  };

  // ------------------------- Functions for creating new Server -----------------------------

  const handleAddBindingNew = () => {
    if (bindingKey && bindingValue) {
      const updatedBindings = {
        ...newServerConfigData.bindings,
        [bindingKey]: bindingValue,
      };

      dispatch(
        updateNewServerConfigField({
          name: "bindings",
          value: updatedBindings,
        })
      );

      // Clear input fields after adding
      setBindingKey("");
      setBindingValue("");
    } else {
      toast.warn("Both key and value are required to add a binding");
    }
  };

  // Function to remove a binding
  const handleRemoveBindingNew = (key) => {
    const updatedBindings = { ...newServerConfigData.bindings };
    delete updatedBindings[key];

    dispatch(
      updateNewServerConfigField({
        name: "bindings",
        value: updatedBindings,
      })
    );
  };

  const handleCreateServerConfig = async () => {
    await dispatch(validateForm(newServerConfigData));
    const state = store.getState();
    const isValid = state.validation.isValid;

    const isValid2 = Object.keys(newServerConfigData.bindings || {}).length > 0;

    if (!isValid2) {
      toast.warn("Add atleast 1 bindings");
    }

    if (isValid && isValid2) {
      await dispatch(createServerConfig({ newServerConfigData })).unwrap();
      await dispatch(resetNewServerConfigData());
    }
  };

  const handleChangeNew = (e) => {
    const { name, value } = e.target;
    dispatch(updateNewServerConfigField({ name, value }));
  };

  return (
    <>
      {!hasViewOnlyAccessGroup2(roleName) ? (
        <ContainerTile loading={loading} error={error} className="mb-5">
          <div className="grid grid-cols-3 gap-2 mb-5 items-end">
            <InputText
              labelName="Server Name"
              inputName="name"
              inputValue={newServerConfigData?.name}
              onChange={(e) => handleChangeNew(e)}
              placeHolder="ELK"
              isValidation={true}
            />
            <InputText
              labelName="Service IP"
              inputName="serviceIp"
              inputValue={newServerConfigData?.serviceIp}
              onChange={(e) => handleChangeNew(e)}
              placeHolder="xxx.xxx.xxx.xxx"
              isValidation={true}
            />
            <InputText
              labelName="Service Port"
              inputName="servicePort"
              inputValue={newServerConfigData?.servicePort}
              onChange={(e) => handleChangeNew(e)}
              placeHolder="e.g., 8080"
              isValidation={true}
            />
          </div>
          {/* Bindings Section */}
          <div className="grid grid-cols-3 gap-2 mb-5 items-end">
            <InputText
              labelName="Header Key"
              inputName="bindingKey"
              inputValue={bindingKey}
              onChange={(e) => setBindingKey(e.target.value)}
              placeHolder="Enter key"
              isValidation={true}
            />
            <InputText
              labelName="Header Value"
              inputName="bindingValue"
              inputValue={bindingValue}
              onChange={(e) => setBindingValue(e.target.value)}
              placeHolder="Enter value"
              isValidation={true}
            />
            <Button
              buttonIcon={PlusIcon}
              onClick={() => handleAddBindingNew()}
              circle={true}
              buttonType="secondary"
            />
          </div>
          {/* Display existing bindings with new design */}
          <div className="grid grid-cols-1 gap-2 mb-5 items-center">
            <div className="grid grid-cols-4 gap-2 mb-5 items-center">
              {Object.keys(newServerConfigData?.bindings || {}).length === 0 ? (
                <p>No bindings added</p>
              ) : (
                Object.keys(newServerConfigData.bindings).map(
                  (key, bindingIndex) => (
                    <div
                      key={bindingIndex}
                      className="bg-gray-200 border border-gray-400 my-1 p-2 rounded-md flex justify-between items-center cursor-auto text-sm"
                    >
                      {/* Display the key */}
                      <div>
                        <b>{key}</b>
                      </div>

                      {/* Display the value */}
                      <div>|</div>
                      <div>{newServerConfigData.bindings[key]}</div>

                      {/* Delete icon */}
                      <div>
                        <XCircleIcon
                          onClick={() => handleRemoveBindingNew(key)}
                          className="block h-5 w-5 cursor-pointer text-gray-900"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-end items-center">
            <Button
              buttonName={"Create"}
              rectangle={true}
              onClick={handleCreateServerConfig}
            />
          </div>
        </ContainerTile>
      ) : (
        ""
      )}

      {/* -------------------- Existing Servers ---------------------------------- */}

      {serverConfigData.map((scData, index) => {
        const localBindings = bindingData[index] || {};
        return (
          <ContainerTile
            loading={loading}
            error={error}
            className="mb-5"
            key={index}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="font-semibold text-lg">Server: {scData.name}</div>
              {!hasViewOnlyAccessGroup2(roleName) && (
                <div className="flex gap-4">
                  <Button
                    buttonIcon={TrashIcon}
                    onClick={() => handleDelete(scData.name)}
                    circle={true}
                    buttonType="destructive"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5 items-end">
              <InputText
                labelName="Service IP"
                inputName="serviceIp"
                inputValue={scData?.serviceIp}
                onChange={(e) => handleChange(e, index)}
                placeHolder="xxx.xxx.xxx.xxx"
              />
              <InputText
                labelName="Service Port"
                inputName="servicePort"
                inputValue={scData?.servicePort}
                onChange={(e) => handleChange(e, index)}
                placeHolder="e.g., 8080"
              />
            </div>
            {/* Bindings Section */}
            <div className="grid grid-cols-3 gap-2 mb-5 items-end">
              <InputText
                labelName="Header Key"
                inputName="bindingKey"
                inputValue={localBindings.bindingKey || ""}
                onChange={(e) =>
                  handleBindingChange(index, "bindingKey", e.target.value)
                }
                placeHolder="Enter key"
              />
              <InputText
                labelName="Header Value"
                inputName="bindingValue"
                inputValue={localBindings.bindingValue || ""}
                onChange={(e) =>
                  handleBindingChange(index, "bindingValue", e.target.value)
                }
                placeHolder="Enter value"
              />
              <Button
                buttonIcon={PlusIcon}
                onClick={() => handleAddBinding(index)}
                circle={true}
                buttonType="secondary"
              />
            </div>
            {/* Display existing bindings with new design */}
            <div className="grid grid-cols-1 gap-2 mb-5 items-center">
              <div className="grid grid-cols-4 gap-2 mb-5 items-center">
                {Object.keys(scData?.bindings || {}).length === 0 ? (
                  <p>No bindings added</p>
                ) : (
                  Object.keys(scData.bindings).map((key, bindingIndex) => (
                    <div
                      key={bindingIndex}
                      className="bg-gray-200 border border-gray-400 my-1 p-2 rounded-md flex justify-between items-center cursor-auto text-sm"
                    >
                      {/* Display the key */}
                      <div>
                        <b>{key}</b>
                      </div>

                      {/* Display the value */}
                      <div>|</div>
                      <div>{scData.bindings[key]}</div>

                      {/* Delete icon */}
                      <div>
                        <XCircleIcon
                          onClick={() => handleRemoveBinding(key, index)}
                          className="block h-5 w-5 cursor-pointer text-gray-900"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {!hasViewOnlyAccessGroup2(roleName) && (
              <div className="flex gap-4 justify-end items-center">
                <Button
                  buttonName={"Update"}
                  rectangle={true}
                  onClick={() => handleUpdateServerConfig(scData.name, index)}
                />
              </div>
            )}
          </ContainerTile>
        );
      })}
    </>
  );
};

export default ServerConfig;
