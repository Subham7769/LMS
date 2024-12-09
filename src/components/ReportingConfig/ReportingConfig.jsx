import React, { useEffect } from "react";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputText from "../Common/InputText/InputText";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Common/Button/Button";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReportingConfig,
  updateReportingConfig,
  deleteReportingConfig,
  updateReportingConfigField,
  updateNewConfigName,
} from "../../redux/Slices/reportingConfigSlice";
import { fetchReportingConfigData } from "../../redux/Slices/sidebarSlice";
import DynamicHeader from "../Common/DynamicHeader/DynamicHeader";

const CreateNewReportingConfig = () => {
  const { RCName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reportingConfigData, loading, error } = useSelector(
    (state) => state.reportingConfig
  );

  useEffect(() => {
    dispatch(fetchReportingConfig(RCName));
  }, [RCName]);

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
    dispatch(
      updateReportingConfig({
        RCName,
        reportingConfigData,
      })
    );
  };

  const handleUpdateName = (newName) => {
    dispatch(updateNewConfigName(newName));
  };

  return (
    <>
      <DynamicHeader
        itemName={reportingConfigData.name}
        handleNameUpdate={handleUpdateName}
        handleDelete={() => onDeleteReportingConfig(RCName)}
        loading={loading}
        error={error}
      />
      <ContainerTile loading={loading} error={error}>
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
            onChange={handleChange}
            placeHolder="/api/example"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-5 items-end">
          <InputTextArea
            labelName={"Query"}
            inputName={"query"}
            rowCount={"3"}
            inputValue={reportingConfigData?.query}
            onChange={handleChange}
            placeHolder="Enter Elastic Query"
          />
        </div>

        <div className="grid grid-cols-1 gap-2 mb-5 items-end">
          <InputTextArea
            labelName={"Transformation Code"}
            inputName={"transformationCode"}
            rowCount={"3"}
            inputValue={reportingConfigData?.transformationCode}
            onChange={handleChange}
            placeHolder="Enter Transformation Code"
          />
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
