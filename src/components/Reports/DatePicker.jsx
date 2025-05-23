import React from "react";
import InputText from "../Common/InputText/InputText";
import InputNumber from "../Common/InputNumber/InputNumber";
import InputSelect from "../Common/InputSelect/InputSelect";
import Button from "../Common/Button/Button";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { tenureTypeOptions } from "../../data/OptionsData";
import { useDispatch, useSelector } from "react-redux";
import { handleChangeCommonSelection } from "../../redux/Slices/reportsSlice";

const DatePicker = () => {
  const dispatch = useDispatch();
  const { reportGenerationData } = useSelector((state) => state.reports);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeCommonSelection({ name, value }));
  };

  const handleCommonSelection = (time, unit) => {
    dispatch(handleChangeCommonSelection({ name: "time", value: time }));
    dispatch(
      handleChangeCommonSelection({
        name: "unit",
        value: unit,
      })
    );
  };

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="inline-flex items-center gap-x-1 text-sm/6 font-semibold ">
          <span>Quick Search</span>
          <ChevronDownIcon aria-hidden="true" className="size-5" />
        </Popover.Button>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel className="h-[280px] absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-gray-700 text-sm/6 shadow-lg ring-1 ring-gray-900/5 p-3">
              <div className="font-semibold">Quick Select</div>
              <div className="grid grid-cols-3 gap-4 border-b-2 dark:border-gray-500 py-3 mb-4">
                <InputText
                  inputName={"timeFrame"}
                  inputValue={"Last"}
                  disabled={true}
                />
                <InputNumber
                  inputName={"time"}
                  inputValue={reportGenerationData.relativeTimeRange.time}
                  onChange={handleChange}
                  disabled={false}
                />
                <InputSelect
                  inputName={"unit"}
                  inputOptions={tenureTypeOptions}
                  inputValue={reportGenerationData.relativeTimeRange.unit}
                  onChange={handleChange}
                  disabled={false}
                />
              </div>
              <div className="font-semibold">Commanly Used</div>
              <div className="flex gap-20 mt-2">
                <div className="flex flex-col gap-2">
                  <button
                    className="text-left hover:underline"
                    onClick={() => handleCommonSelection(1, "DAY")}
                  >
                    Last 24 hours
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={() => handleCommonSelection(7, "DAY")}
                  >
                    Last 7 days
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={() => handleCommonSelection(30, "DAY")}
                  >
                    Last 30 days
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="text-left hover:underline"
                    onClick={() => handleCommonSelection(90, "DAY")}
                  >
                    Last 90 days
                  </button>
                  <button
                    className="text-left hover:underline"
                    onClick={() => handleCommonSelection(1, "YEAR")}
                  >
                    Last 1 year
                  </button>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};

export default DatePicker;
