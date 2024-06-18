import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const TagsDropdown = ({ options }) => {
  const [selectedOption, setSelctedOption] = useState([]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
  };
  // console.log(selectedOption);
  return (
    <Select
      className="w-[350px]"
      options={options}
      components={animatedComponents}
      value={selectedOption}
      onChange={handleChange}
      isMulti={true}
    />
  );
};

export default TagsDropdown;
