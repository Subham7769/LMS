import React from "react";
import { Range } from "react-range";

// Generate dynamic HSL-based colors from red to green
const generateColors = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const hue = (i / (count - 1)) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  });
};
const getBackgroundColor = (color) => {
  return color.replace(/(\d+%)\)/, '92%)').replace('60%', '50%'); // lighten it
};

const getTextColor = (hsl) => {
  return hsl
    .replace(/hsl\(([\d.]+),\s*([\d.]+)%,\s*([\d.]+)%\)/, (_, h, s, l) => {
      return `hsl(${h}, ${Math.min(+s + 10, 100)}%, ${Math.max(+l - 20, 0)}%)`;
    });
};

const InputRangeCondition = ({
  labelName,
  inputName,
  inputLevels = ["Poor", "Fair", "Good", "Excellent"],
  inputValue,
  coloredTrack = true,
  onChange,
  disabled = false,
}) => {
  const index = inputLevels.includes(inputValue)
    ? inputLevels.indexOf(inputValue)
    : 0;
  const stepCount = inputLevels.length - 1;
  const colors = generateColors(inputLevels.length);
  const selectedColor = colors[index] || "#6366f1"; // default indigo

  return (
    <div className="w-full px-1">
      {labelName && (
        <label className="block text-gray-800 font-semibold mb-2 text-sm ml-1">
          {labelName}
        </label>
      )}

      <Range
        values={[index]}
        step={1}
        min={0}
        max={stepCount}
        disabled={disabled}
        onChange={([newIndex]) => {
          const newValue = inputLevels[newIndex];
          onChange({
            target: {
              name: inputName,
              value: newValue,
            },
          });
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 rounded-full bg-gray-200 relative"
            style={{ backgroundColor: "#e5e7eb" }}
          >
            <div
              className="absolute h-full rounded-full transition-all"
              style={{
                left: 0,
                width: `${(index / stepCount) * 100}%`,
                backgroundColor: coloredTrack ? selectedColor : "#6366F1",
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "1.2rem",
              width: "1.2rem",
              borderRadius: "50%",
              backgroundColor: "#fff",
              border: `2px solid ${coloredTrack ? selectedColor : "#6366F1"}`,
              // boxShadow: "0 0 0 2px #888",
              cursor: "pointer",
            }}
          />
        )}
      />

      <div className={`text-center flex justify-center align-middle mt-1 font-medium text-sm text-gray-700`}>
        {coloredTrack ? (
          inputValue
        ) : (
          <div
            className=" px-5 rounded-full flex justify-center items-center text-sm font-medium min-w-16 w-fit"
            style={{
              color: getTextColor(selectedColor),
              backgroundColor: getBackgroundColor(selectedColor),
              // border: `1px solid ${selectedColor}`,
            }}
          >
            {inputValue}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputRangeCondition;
