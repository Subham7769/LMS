import React, { useEffect, useState } from 'react';
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import { useNavigate, useParams } from "react-router-dom";
import LoadingState from "../LoadingState/LoadingState";
import { PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector, useDispatch } from "react-redux";
import {  fetchReportingConfig, updateReportingConfig, deleteReportingConfig, updateReportingConfigField, updateNewConfigName,} from "../../redux/Slices/reportingConfigSlice";
import { Failed, Passed, Warning } from "../Toasts";
import { fetchReportingConfigData } from '../../redux/Slices/sidebarSlice';
import DynamicName from "../Common/DynamicName/DynamicName";


const CreateNewReportingConfig = () => {
  // Local state to hold the key-value inputs
  const [bindingKey, setBindingKey] = useState('');
  const [bindingValue, setBindingValue] = useState('');
  const { RCName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reportingConfigData, loading, error } = useSelector((state) => state.reportingConfig);

  useEffect(() => {
    dispatch(fetchReportingConfig(RCName));
  }, [RCName]);

  // Function to add a binding
  const handleAddBinding = () => {
    if (bindingKey && bindingValue) {
      const updatedBindings = {
        ...reportingConfigData.bindings,
        [bindingKey]: bindingValue,
      };

      dispatch(updateReportingConfigField({ name: 'bindings', value: updatedBindings }));

      // Clear input fields after adding
      setBindingKey('');
      setBindingValue('');
    } else {
      console.log('Both key and value are required to add a binding');
    }
  };

  // Function to remove a binding
  const handleRemoveBinding = (key) => {
    const updatedBindings = { ...reportingConfigData.bindings };
    delete updatedBindings[key];

    dispatch(updateReportingConfigField({ name: 'bindings', value: updatedBindings }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateReportingConfigField({ name, value }));
  };

  const onDeleteReportingConfig = async (RCName) => {
    try {
      // Step 1: Delete the Reporting Config by its name
      await dispatch(deleteReportingConfig(RCName)).unwrap();

      // Step 2: Fetch the updated Reporting Config data after deletion
      await dispatch(fetchReportingConfigData()).unwrap();

      // Step 3: Navigate to the /reporting-config page
      navigate("/reporting-config");
    } catch (error) {
      console.error("Error while deleting Reporting Config: ", error);
    }
  };


  const handleUpdateReportingConfig = () => {
    dispatch(updateReportingConfig({ RCName, reportingConfigData })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        toast.custom((t) => (
          <Passed
            t={t}
            toast={toast}
            title={"Updated"}
            message={"Updated successfully"}
          />
        ));
      }
    });
  };

  const handleUpdateName =  (newName) => {
     dispatch(updateNewConfigName( newName ))
  };


  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    throw new Error(error);
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="mb-4 flex items-center justify-between">
        <DynamicName
          initialName={reportingConfigData.name}
          onSave={handleUpdateName}
        />
        <div className="flex gap-4">
          <Button
            buttonIcon={TrashIcon}
            onClick={() => onDeleteReportingConfig(RCName)}
            circle={true}
          />
        </div>
      </div>
      <ContainerTile>
        <div className="grid grid-cols-4 gap-2 mb-5 items-end">
          <InputNumber
            labelName="Default Time Range Days"
            inputName="defaultTimeRangeDays"
            inputValue={reportingConfigData?.defaultTimeRangeDays}
            onChange={handleChange}
            placeHolder="3"
          />
          <InputText
            labelName="API Route"
            inputName="apiRoute"
            inputValue={reportingConfigData?.apiRoute}
            inputValuePercentage={true}
            onChange={handleChange}
            placeHolder="/api/example"
          />
          <InputText
            labelName="Service IP"
            inputName="serviceIp"
            inputValue={reportingConfigData?.serviceIp}
            inputValuePercentage={true}
            onChange={handleChange}
            placeHolder="xxx.xxx.xxx.xxx"
          />
          <InputText
            labelName="Service Port"
            inputName="servicePort"
            inputValue={reportingConfigData?.servicePort}
            inputValuePercentage={true}
            onChange={handleChange}
            placeHolder="e.g., 8080"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-5 items-end">
          <InputTextArea
            labelName={"Query"}
            inputName={"query"}
            rowCount={"3"}
            inputValue={reportingConfigData?.query}
            onChange={handleChange}
            placeHolder="( w > r ) * r + ( w < r ) * w * 0.5 ( d <= 20) * (( w > r ) * r + ( w < r ) * w * 0.5) + ( d > 20) * (( w > r ) * r + ( w < r ) * w )"
          />
        </div>

        {/* Bindings Section */}
        <div className="grid grid-cols-3 gap-2 mb-5 items-end">
          <InputText
            labelName="Binding Key"
            inputName="bindingKey"
            inputValue={bindingKey}
            onChange={(e) => setBindingKey(e.target.value)}
            placeHolder="Enter key"
          />
          <InputText
            labelName="Binding Value"
            inputName="bindingValue"
            inputValue={bindingValue}
            onChange={(e) => setBindingValue(e.target.value)}
            placeHolder="Enter value"
          />
          <Button
            buttonIcon={PlusIcon}
            onClick={handleAddBinding}
            circle={true}
          />
        </div>

        {/* Display existing bindings with new design */}
        <div className="grid grid-cols-1 gap-2 mb-5 items-center">
          <div className='grid grid-cols-4 gap-2 mb-5 items-center'>
            {Object.keys(reportingConfigData?.bindings || {}).length === 0 ? (
              <p>No bindings added</p>
            ) : (
              Object.keys(reportingConfigData.bindings).map((key, index) => (
                <div
                  key={index}
                  className="bg-gray-300 border border-gray-400 my-1 p-2 rounded-md flex justify-between items-center cursor-auto text-sm"
                >
                  {/* Display the key */}
                  <div>
                    <b>{key}</b>
                  </div>

                  {/* Display the value */}
                  <div>|</div>
                  <div>{reportingConfigData.bindings[key]}</div>

                  {/* Delete icon */}
                  <div>
                    <XCircleIcon
                      onClick={() => handleRemoveBinding(key)}
                      className="block h-5 w-5 cursor-pointer text-gray-900"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-4 justify-end items-center">
          <Button
            buttonName={"Update"}
            rectangle={true}
            onClick={handleUpdateReportingConfig}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default CreateNewReportingConfig;
