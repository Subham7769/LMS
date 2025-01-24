import React from "react";
import { Range } from "react-range";
import InputNumber from "../InputNumber/InputNumber";
import formatLargeNumber from "../../../utils/formatLargeNumber";

const InputRange = ({
  labelName,
  labelNameMin,
  labelNameMax,
  inputNameMin,
  inputNameMax,
  inputValueMin,
  inputValueMax,
  placeHolder,
  min,
  max,
  handleChange,
  handleMinChange,
  handleMaxChange,
  unitSymbol,
  unitSymbolAfter = false,
  disabled = false,
  readOnly = false,
  isAutoFocus = false,
}) => {
  const values = [
    Math.max(min, Math.min(inputValueMin, max)),
    Math.max(min, Math.min(inputValueMax, max)),
  ];

  const onChangeRange = (values) => {
    handleMinChange({
      target: {
        name: inputNameMin,
        value: values[0],
      },
    });
    handleMaxChange({
      target: {
        name: inputNameMax,
        value: values[1],
      },
    });
  };

  return (
    <div className="range-slider w-[100%]">
      <label
        className="block text-gray-700 px-1 text-sm font-semibold"
        htmlFor={inputNameMax}
      >
        {labelName}
      </label>
      <div className="flex justify-between gap-5 mb-5">
        <InputNumber
          labelName={labelNameMin}
          inputName={inputNameMin}
          inputValue={inputValueMin}
          onChange={handleMinChange}
          placeHolder="Min"
          disabled={disabled}
        />
        <InputNumber
          labelName={labelNameMax}
          inputName={inputNameMax}
          inputValue={inputValueMax}
          onChange={handleMaxChange}
          placeHolder="Max"
          disabled={disabled}
        />
      </div>
      <div className="mx-2">
        <Range
          values={values}
          step={1}
          min={min}
          max={max}
          onChange={onChangeRange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                width: "100%",
                backgroundColor: "lightgrey",
                position: "relative",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "100%",
                  backgroundColor: "#6366F1", // indigo-500
                  left: `${((values[0] - min) / (max - min)) * 100}%`,
                  right: `${100 - ((values[1] - min) / (max - min)) * 100}%`,
                }}
              />
              {children}
            </div>
          )}
          renderThumb={({ props, isDragged }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "1.2rem",
                width: "1.2rem",
                borderRadius: "50%",
                backgroundColor: "white",
                cursor: "pointer",
                boxShadow: "0 0 0 2px #808080",
              }}
            />
          )}
        />
        <div className="flex justify-between text-gray-400 mb-1 mt-2 -mx-2">
          <span>
            {unitSymbol
              ? unitSymbolAfter
                ? `${formatLargeNumber(min)} ${unitSymbol}`
                : `${unitSymbol} ${formatLargeNumber(min)}`
              : formatLargeNumber(min)}
          </span>
          <span>
            {unitSymbol
              ? unitSymbolAfter
                ? `${formatLargeNumber(max)} ${unitSymbol}`
                : `${unitSymbol} ${formatLargeNumber(max)}`
              : formatLargeNumber(max)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputRange;