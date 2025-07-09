import React from "react";
import { categoryOptions } from "../../data/OptionsData";
import InputSelect from "../Common/InputSelect/InputSelect";
import InputTextArea from "../Common/InputTextArea/InputTextArea";
import InputDate from "../Common/InputDate/InputDate";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import ContainerTile from "../Common/ContainerTile/ContainerTile";


const BasicInfo = () => {
  const { dRulesData, handleChange } = useOutletContext();
  const basicInfoData = dRulesData.basicInfoData;
  const { loading } = useSelector((state) => state.drlRuleset);

  return (
    <ContainerTile defaultClass={false} loading={loading}>
      <div className="grid gap-5 mb-6">
        <InputSelect
          labelName="Category"
          inputOptions={categoryOptions}
          inputName="category"
          inputValue={basicInfoData?.category}
          onChange={handleChange}
          isValidation={true}
        />
        <InputTextArea
          labelName="Description"
          inputName="description"
          inputValue={basicInfoData?.description}
          onChange={handleChange}
          isValidation={true}
          rowCount={5}
        />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mb-2">
          {/* Start Date */}
          <div className="col-span-1">
            <InputDate
              labelName={"Effective Date (optional)"}
              inputName={"fromDate"}
              inputValue={basicInfoData?.fromDate}
              onChange={handleChange}
            />
          </div>

          {/* End Date */}
          <div className="col-span-1 mt-6">
            <InputDate
              inputName={"toDate"}
              inputValue={basicInfoData?.toDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </ContainerTile>
  );
};

export default BasicInfo;
