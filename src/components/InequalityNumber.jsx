import { useState } from "react";
import Select from "react-select";

const options = [
  { value: "==", label: "==" },
  { value: "<", label: "<" },
  { value: ">", label: ">" },
  { value: "<=", label: "<=" },
  { value: ">=", label: ">=" },
];

const InequalityNumber = ({ labelText, placeholder }) => {
  const [selectedOption, setSelctedOption] = useState(options[3]);
  const handleChange = (selectedOption) => {
    setSelctedOption(selectedOption);
  };
  return (
    <div className="mb-3">
      <label htmlFor="number" className="block">
        {labelText}
      </label>
      <div className="flex gap-4">
        <Select
          className="w-20"
          defaultValue={options[3]}
          options={options}
          value={selectedOption}
          isSearchable={false}
          onChange={handleChange}
        />
        <input
          type="number"
          name="number"
          // id="number"
          className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeholder ? placeholder : "4000"}
        />
      </div>
    </div>
  );
};

export default InequalityNumber;
