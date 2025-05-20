import React from "react";

// Generate dynamic HSL-based colors from red to green
const generateColors = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const hue = (i / (count - 1)) * 120; // 0 (red) to 120 (green)
    return `hsl(${hue}, 70%, 50%)`;
  });
};

const InputRangeCondition = ({
  labelName,
  inputName,
  inputLevels = ["Poor", "Fair", "Good", "Excellent"],
  inputValue,
  onChange,
  disabled = false,
}) => {
  const colors = generateColors(inputLevels.length);

  const getColorByValue = (value) => {
    const index = inputLevels.findIndex((item) => item === value);
    return colors[index] || "gray";
  };

  const handleClick = (level) => {
    if (!disabled) {
      onChange({
        target: {
          value: level,
          name: inputName,
        },
      });
    }
  };

  return (
    <div className="mb-6">
      {labelName && (
        <label className="block font-medium text-sm ml-1 text-gray-700">
          {labelName}
        </label>
      )}
      <div className="flex justify-between gap-3 border border-gray-300 px-1 rounded-md">
        {inputLevels.map((level, index) => {
          const isSelected = level === inputValue;
          const color = colors[index];

          return (
            <div
              key={index}
              onClick={() => handleClick(level)}
              className={`flex flex-col items-center mt-1 cursor-pointer transition-all duration-200 ${
                disabled ? "cursor-not-allowed opacity-60" : ""
              }`}
            >
              <div
                className="w-6 h-6 rounded-full border-2"
                style={{
                  backgroundColor: isSelected ? color : "#e5e7eb", // gray-200
                  borderColor: isSelected ? color : "#d1d5db", // gray-300
                }}
              />
              <span
                className={`text-xs  ${
                  isSelected ? "font-semibold text-gray-700" : "text-gray-400"
                }`}
              >
                {level}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputRangeCondition;
