import InputSelect from "../Common/InputSelect/InputSelect";
import InputDate from "../Common/InputDate/InputDate";
import Button from "../Common/Button/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  generateReport,
  handleChangeInreportGenerationData,
} from "../../redux/Slices/reportsSlice";
import ReCharts from "./ReCharts";
import DatePicker from "./DatePicker";
import { validateForm } from "../../redux/Slices/validationSlice";
import store from "../../redux/store";
import { toast } from "react-toastify";

const Reports = () => {
  const dispatch = useDispatch();
  const { reportGenerationData, reportOptions, configData, loading, error } =
    useSelector((state) => state.reports);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeInreportGenerationData({ name, value }));
  };

  const handleGenerateReport = async () => {
    await dispatch(validateForm(reportGenerationData));
    const state = store.getState();
    const isValid = state.validation.isValid;
    const isValid2 =
      reportGenerationData.startDate && reportGenerationData.endDate
        ? true
        : false;
    const isValid3 =
      reportGenerationData.relativeTimeRange.time &&
      reportGenerationData.relativeTimeRange.unit
        ? true
        : false;
    if ((isValid && isValid2) || isValid3) {
      if (reportGenerationData.startDate && reportGenerationData.endDate) {
        const formattedreportGenerationData = {
          reportName: reportGenerationData.reportName,
          startDate: new Date(reportGenerationData.startDate).toISOString(),
          endDate: new Date(reportGenerationData.endDate).toISOString(),
        };
        dispatch(generateReport(formattedreportGenerationData));
      } else {
        const formattedreportGenerationData2 = {
          reportName: reportGenerationData.reportName,
          relativeTimeRange: reportGenerationData.relativeTimeRange,
        };
        dispatch(generateReport(formattedreportGenerationData2));
      }
    } else {
      toast.warn("Either select Start & End Date OR Date Range");
    }
  };

  return (
    <>
      <ContainerTile loading={loading}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <InputSelect
            labelName={"Report Name"}
            inputName={"reportName"}
            inputOptions={reportOptions}
            inputValue={reportGenerationData?.reportName}
            onChange={handleChange}
            isValidation={true}
            disabled={false}
          />
          <div className="col-span-1">
            <InputDate
              labelName={"Start Date"}
              inputName={"startDate"}
              inputValue={reportGenerationData?.startDate}
              onChange={handleChange}
              disabled={false}
            />
          </div>
          <div className="col-span-1">
            <InputDate
              labelName={"End Date"}
              inputName={"endDate"}
              inputValue={reportGenerationData?.endDate}
              onChange={handleChange}
              disabled={false}
            />
          </div>
          <div className="flex items-center gap-5">
            <DatePicker />
            <Button
              buttonName={"Generate"}
              buttonIcon={CheckCircleIcon}
              onClick={handleGenerateReport}
              rectangle={true}
            />
          </div>
        </div>
      </ContainerTile>
      {configData.map((chart, index) => {
        if (Object.keys(chart.result || {}).length > 0) {
          return <ReCharts response={chart.result} index={index} key={index} />;
        }
      })}
    </>
  );
};

export default Reports;
