// components/Datepicker.jsx

import * as React from "react";
import { format } from "date-fns";
import { Calendar } from "../MosaicUI/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../MosaicUI/popover";

export default function DatePickerWithRange({
  className = "",
  range,
  setRange,
}) {
  const today = new Date();

  return (
    <div className={`grid gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <button
            id="date"
            className={`btn px-2.5 min-w-[15.5rem] bg-white border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 dark:bg-gray-800 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 font-medium text-left justify-start`}
          >
            <svg
              className="fill-current text-gray-400 dark:text-gray-500 ml-1 mr-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path d="M5 4a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5Z" />
              <path d="M4 0a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h8a4 4 0 0 0 4-4V4a4 4 0 0 0-4-4H4ZM2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" />
            </svg>
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, "LLL dd, y")} - {format(range.to, "LLL dd, y")}
                </>
              ) : (
                format(range.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            disabled={{ after: today }} // ✅ Disables future dates
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
