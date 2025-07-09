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
import store from "../../redux/store";
import { hasViewOnlyAccessGroup2 } from "../../utils/roleUtils";

const CreateNewReportingConfig = () => {
  const { RCName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { reportingConfigData, loading, error } = useSelector(
    (state) => state.reportingConfig
  );
  const { userData } = useSelector((state) => state.auth);
  const roleName = userData?.roles[0]?.name;

  useEffect(() => {
    dispatch(fetchReportingConfig(RCName));
  }, [RCName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!hasViewOnlyAccessGroup2(roleName)) {
      dispatch(updateReportingConfigField({ name, value }));
    }
  };

  const onDeleteReportingConfig = async (RCName) => {
    try {
      // Step 1: Delete the Reporting Config by its name
      await dispatch(deleteReportingConfig(RCName)).unwrap();

      // Step 2: Fetch the updated Reporting Config data after deletion
      await dispatch(fetchReportingConfigData()).unwrap();

      // Step 3: Navigate to the /reporting-config page
      navigate("/loan/reporting-config");
    } catch (error) {
      console.error("Error while deleting Reporting Config: ", error);
    }
  };

  const handleUpdateReportingConfig = async () => {
    await dispatch(
      updateReportingConfig({
        reportingConfigData,
      })
    ).unwrap();
  };

  const handleUpdateName = async (newName) => {
    dispatch(updateNewConfigName(newName));
    const state = store.getState();
    const reportingConfigData = state.reportingConfig.reportingConfigData;
    await dispatch(updateReportingConfig({ reportingConfigData })).unwrap();
    await dispatch(fetchReportingConfigData()).unwrap();
    navigate("/loan/reporting-config/" + reportingConfigData.name);
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
      <ContainerTile className={"p-5"} loading={loading} error={error}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 mb-5 items-end">
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

        {!hasViewOnlyAccessGroup2(roleName) && (
          <div className="flex gap-4 justify-end items-center">
            <Button
              buttonName={"Update"}
              rectangle={true}
              onClick={handleUpdateReportingConfig}
            />
          </div>
        )}
      </ContainerTile>
    </>
  );
};

export default CreateNewReportingConfig;
