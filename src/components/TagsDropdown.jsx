import { useState } from "react";
import makeAnimated from "react-select/animated";
import InputSelect from "./Common/InputSelect/InputSelect";

const animatedComponents = makeAnimated();

const TagsDropdown = ({ options }) => {
  const [selectedOption, setSelctedOption] = useState([]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
  };
  return (
    <div className="w-[350px]">
      <InputSelect
        inputOptions={options}
        components={animatedComponents}
        inputValue={selectedOption}
        onChange={handleChange}
        isMulti={true}
      />
    </div>
  );
};

export default TagsDropdown;
