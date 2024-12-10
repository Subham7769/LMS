import React, { useEffect } from "react";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import { useNavigate, useParams } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/20/solid";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteReportingConfig,
  updateNewReportingConfigField,
  createReportConfig,
} from "../../redux/Slices/reportingConfigSlice";
import { fetchReportingConfigData } from "../../redux/Slices/sidebarSlice";
import DynamicName from "../Common/DynamicName/DynamicName";

const CreateNewReportingConfig = () => {
  const { RCName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newReportingConfigData } = useSelector(
    (state) => state.reportingConfig
  );

  useEffect(() => {
    dispatch(updateNewReportingConfigField({ name: "name", value: RCName }));
  }, [RCName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateNewReportingConfigField({ name, value }));
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

  const handleCreateReportingConfig = () => {
    console.log(newReportingConfigData);
    dispatch(createReportConfig({ newReportingConfigData })).then((action) => {
      if (action.type.endsWith("fulfilled")) {
        // Extract the 'name' from the action.payload
        const configName = action.payload?.name;
        dispatch(fetchReportingConfigData());
        // Navigate to /reporting-config/{name} if 'name' exists
        if (configName) {
          navigate(`/reporting-config/${configName}`);
        }
      }
    });
  };

  const handleUpdateName = (newName) => {
    dispatch(updateNewConfigName(newName));
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <DynamicName
          initialName={newReportingConfigData.name}
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
        <div className="grid grid-cols-3 gap-2 mb-5 items-end">
          <InputNumber
            labelName="Default Time Range Days"
            inputName="defaultTimeRangeDays"
            inputValue={newReportingConfigData?.defaultTimeRangeDays}
            onChange={handleChange}
            placeHolder="3"
          />
          <InputText
            labelName="API Route"
            inputName="apiRoute"
            inputValue={newReportingConfigData?.apiRoute}
            onChange={handleChange}
            placeHolder="/api/example"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-5 items-end">
          <InputTextArea
            labelName={"Query"}
            inputName={"query"}
            rowCount={"3"}
            inputValue={newReportingConfigData?.query}
            onChange={handleChange}
            placeHolder="Enter Elastic Query"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-5 items-end">
          <InputTextArea
            labelName={"Transformation Code"}
            inputName={"transformationCode"}
            rowCount={"3"}
            inputValue={newReportingConfigData?.transformationCode}
            onChange={handleChange}
            placeHolder="Enter Transformation Code"
          />
        </div>

        <div className="flex gap-4 justify-end items-center">
          <Button
            buttonName={"Create Reporting config"}
            rectangle={true}
            onClick={handleCreateReportingConfig}
          />
        </div>
      </ContainerTile>
    </>
  );
};

export default CreateNewReportingConfig;
