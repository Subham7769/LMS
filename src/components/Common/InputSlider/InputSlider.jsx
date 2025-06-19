import React from "react";
import { Range } from "react-range";

// Generate dynamic HSL colors (red → green)
const generateColors = (count) =>
  Array.from({ length: count }, (_, i) => {
    const hue = (i / (count - 1)) * 120;
    return `hsl(${hue}, 70%, 50%)`;
  });

const InputSlider = ({
  labelName,
  inputName,
  inputLevels = [],
  inputValue,
  coloredTheme = false,
  onChange,
  disabled = false,
}) => {
  if (!Array.isArray(inputLevels) || inputLevels.length < 2) {
    return (
      <div className="text-red-600 text-sm">
        ⚠️ Input levels must have at least two values.
      </div>
    );
  }

  const firstType = typeof inputLevels[0];
  const coercedValue =
    firstType === "number" ? Number(inputValue) : String(inputValue);

  let index = inputLevels.indexOf(coercedValue);
  if (index === -1) index = 0; // fallback to first value to avoid crash

  const stepCount = inputLevels.length - 1;
  const colors = generateColors(inputLevels.length);
  const selectedColor = coloredTheme ? colors[index] : "#2B7FFF";

  return (
    <div className="w-full px-1">
      {labelName && (
        <label className="block text-gray-800 dark:text-gray-100 font-semibold mb-2 text-sm ml-1">
          {labelName} : {inputLevels[index]}
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
                backgroundColor: selectedColor,
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
              border: `2px solid ${selectedColor}`,
              cursor: "pointer",
            }}
          />
        )}
      />
    </div>
  );
};

export default InputSlider;
