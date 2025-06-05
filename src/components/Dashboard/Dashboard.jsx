import React, { useState, useEffect } from "react";
import DashboardCard01 from "./DashboardCard01";
import DashboardCard02 from "./DashboardCard02";
import DashboardCard03 from "./DashboardCard03";
import DashboardCard04 from "./DashboardCard04";

import DropdownFilter from "../Common/DropdownFilter/DropdownFilter";
import DatePickerWithRange from "../Common/DatePickerWithRange/DatePickerWithRange"; // uses Calendar inside
import DashboardCard05 from "./DashboardCard05";
import DashboardCard06 from "./DashboardCard06";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppConfigData } from "../../redux/Slices/appConfigSlice";

function Dashboard() {
  const dateOptions = [
    { label: "Last 7 Days", value: 7 },
    { label: "Last 30 Days", value: 30 },
    { label: "Last 2 Months", value: 60 },
    { label: "Last 6 Months", value: 180 },
    { label: "Last 12 Months", value: 365 },
  ];

  const today = new Date();
  const [days, setDays] = useState(365);
  const [toDate, setToDate] = useState(today);
  const [fromDate, setFromDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 365);
    return d;
  });
  const [range, setRange] = useState({ from: fromDate, to: toDate });

  const dispatch = useDispatch();
  const { appConfig } = useSelector((state) => state.appConfig);

  useEffect(() => {
    dispatch(fetchAppConfigData());
    const newFrom = new Date(toDate);
    newFrom.setDate(newFrom.getDate() - days);
    setFromDate(newFrom);
    setRange({ from: newFrom, to: toDate });
  }, [days]);

  const handleDropdownSelect = (value) => {
    setDays(Number(value));
  };

  const handleDateRangeChange = (selectedRange) => {
    if (selectedRange?.from && selectedRange?.to) {
      setFromDate(selectedRange.from);
      setToDate(selectedRange.to);
      setRange(selectedRange);
    }
  };

  const formattedFromDate = fromDate.toISOString();
  const formattedToDate = toDate.toISOString();

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-[96rem] mx-auto">
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Dashboard
          </h1>
        </div>
        {/* Filter Controls */}
        <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
          <div className="flex flex-row sm:flex-row gap-3 w-full sm:w-auto justify-start sm:justify-end">
            <DropdownFilter
              options={dateOptions}
              value={days}
              onChange={handleDropdownSelect}
            />
            <DatePickerWithRange
              className="w-full sm:w-auto"
              range={range}
              setRange={handleDateRangeChange}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-6">
        <DashboardCard06 fromDate={formattedFromDate} toDate={formattedToDate} appConfig={appConfig} />
      </div>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-12 gap-6">
        <DashboardCard01
          fromDate={formattedFromDate}
          toDate={formattedToDate}
        />
        <DashboardCard02
          fromDate={formattedFromDate}
          toDate={formattedToDate}
        />
        <DashboardCard05
          fromDate={formattedFromDate}
          toDate={formattedToDate}
        />              
        <DashboardCard03
          fromDate={formattedFromDate}
          toDate={formattedToDate}
        />
  
        {/* <DashboardCard04
          fromDate={formattedFromDate}
          toDate={formattedToDate}
        /> */}
      </div>
    </div>
  );
}

export default Dashboard;
