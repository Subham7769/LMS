import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

const animatedComponents = makeAnimated();

const TagsDropdown = ({ options }) => {
  const [selectedOption, setSelctedOption] = useState([]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
  };
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
