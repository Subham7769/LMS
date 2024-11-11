import InputSelect from "../Common/InputSelect/InputSelect";
import InputDate from "../Common/InputDate/InputDate";
import Button from "../Common/Button/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import {
  generateReport,
  handleChangeInReportsData,
} from "../../redux/Slices/reportsSlice";

const Reports = () => {
  const dispatch = useDispatch();
  const { reportsData, reportConfigData, loading, error } = useSelector(
    (state) => state.reports
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeInReportsData({ name, value }));
  };

  const handleGenerateReport = () => {
    const formattedReportsData = {
      ...reportsData,
      startDate: new Date(reportsData.startDate).toISOString(),
      endDate: new Date(reportsData.endDate).toISOString(),
    };
    dispatch(generateReport(formattedReportsData));
  };

  return (
    <>
      <ContainerTile
        loading={loading}
        error={error}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
          <InputSelect
            labelName={"Report Name"}
            inputName={"reportName"}
            inputOptions={reportConfigData}
            inputValue={reportsData?.reportName}
            onChange={handleChange}
            isValidation={true}
          />
          <div className="col-span-1">
            <InputDate
              labelName={"Start Date"}
              inputName={"startDate"}
              inputValue={reportsData?.startDate}
              onChange={handleChange}
              isValidation={true}
            />
          </div>
          <div className="col-span-1">
            <InputDate
              labelName={"End Date"}
              inputName={"endDate"}
              inputValue={reportsData?.endDate}
              onChange={handleChange}
              isValidation={true}
            />
          </div>
          <div>
            <Button
              buttonName={"Generate"}
              buttonIcon={CheckCircleIcon}
              onClick={handleGenerateReport}
              rectangle={true}
            />
          </div>
        </div>
      </ContainerTile>
    </>
  );
};

export default Reports;
