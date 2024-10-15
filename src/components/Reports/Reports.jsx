import InputSelect from "../Common/InputSelect/InputSelect";
import InputDate from "../Common/InputDate/InputDate";
import Button from "../Common/Button/Button";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const Reports = () => {
  return (
    <>
      <div className="grid grid-cols-4">
        <InputSelect
          labelName={"Report Name"}
          inputName={"reportName"}
          // inputOptions={interestPeriodOptions}
          // inputValue={projectData?.interestPeriodUnit}
          // onChange={handleChange}
          isValidation={true}
        />
        <InputDate
          labelName={"Start Date"}
          inputName={"startDate"}
          // inputValue={projectData?.startDate}
          // onChange={handleChange}
          isValidation={true}
        />
        <InputDate
          labelName={"End Date"}
          inputName={"endDate"}
          // inputValue={projectData?.startDate}
          // onChange={handleChange}
          isValidation={true}
        />
        <div>
          <Button
            buttonName={"Generate"}
            buttonIcon={CheckCircleIcon}
            // onClick={handleUpdate}
            rectangle={true}
          />
        </div>
      </div>
    </>
  );
};

export default Reports;
