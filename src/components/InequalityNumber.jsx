import { useState } from "react";
import InputSelect from "./Common/InputSelect/InputSelect";
import InputNumber from "./Common/InputNumber/InputNumber";
import { operatorOptions } from "../data/OptionsData";

const InequalityNumber = ({ labelText, placeholder }) => {
  const [selectedOption, setSelctedOption] = useState(options[3]);
  return (
    <div className="mb-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="w-20">
          <InputSelect
            labelName={labelText}
            inputOptions={operatorOptions}
            inputValue={selectedOption}
            onChange={(e) => setSelctedOption(e)}
          />
        </div>
        <div className="w-32">
          <InputNumber
            inputName="number"
            placeHolder={placeholder ? placeholder : "4000"}
          />
        </div>
      </div>
    </div>
  );
};

export default InequalityNumber;
