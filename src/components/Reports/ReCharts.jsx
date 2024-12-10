import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import InputSelect from "../Common/InputSelect/InputSelect";
import { useSelector } from "react-redux";
import { flatten } from "flat";
import ContainerTile from "../Common/ContainerTile/ContainerTile";
import Button from "../Common/Button/Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import { deleteReportingConfig } from "../../redux/Slices/reportingConfigSlice";
import { fetchReportsConfigData } from "../../redux/Slices/reportsSlice";
import { useDispatch } from "react-redux";
import { fetchReportingConfigData } from "../../redux/Slices/sidebarSlice";

const chartOptions = [
  {
    value: "Bar",
    label: "Adjacent Bar Chart",
  },
  {
    value: "StackedBar",
    label: "Stacked Bar Chart",
  },
  {
    value: "Line",
    label: "Line Chart",
  },
  {
    value: "Pie",
    label: "Pie Chart",
  },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ReCharts = ({ response, index }) => {
  const [chartType, setChartType] = useState("Bar");
  const { configData } = useSelector((state) => state.reports);
  const { loading } = useSelector((state) => state.reportingConfig);
  const dispatch = useDispatch();

  const transformationCode = new Function(
    "response",
    "flatten",
    `return ${
      configData[index]?.transformationCode ||
      "function(response) { return []; }"
    };`
  )();

  const transformDataForPieChart = (data) => {
    const result = {};

    data.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (key !== "date") {
          result[key] = (result[key] || 0) + entry[key];
        }
      });
    });

    return Object.entries(result).map(([name, value]) => ({ name, value }));
  };

  let data = [];
  try {
    data = transformationCode(response, flatten);
    if (!Array.isArray(data)) {
      throw new Error("Transformed data is not an array");
    }
  } catch (error) {
    console.error("Error transforming data:", error);
    data = [];
  }
  const transformedPieChartData = transformDataForPieChart(data);

  const onDeleteReportingConfig = async (RCName) => {
    try {
      // Step 1: Delete the Reporting Config by its name
      await dispatch(deleteReportingConfig(RCName)).unwrap();
      await dispatch(fetchReportsConfigData());
      await dispatch(fetchReportingConfigData());
    } catch (error) {
      console.error("Error while deleting Reporting Config: ", error);
    }
  };

  // console.log(data);

  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return (
          <BarChart data={data} margin={{ top: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="BNPL" fill="#8884d8" />
            <Bar dataKey="Overdraft" fill="#82ca9d" />
            <Bar dataKey="Cash loan" fill="#ffc658" />
          </BarChart>
        );
      case "StackedBar":
        return (
          <BarChart data={data} margin={{ top: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="BNPL" stackId="a" fill="#8884d8" />
            <Bar dataKey="Overdraft" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Cash loan" stackId="a" fill="#ffc658" />
          </BarChart>
        );
      case "Line":
        return (
          <LineChart data={data} margin={{ top: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="BNPL"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="Overdraft" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Cash loan" stroke="#ffc658" />
          </LineChart>
        );
      case "Pie":
        return (
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={transformedPieChartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {transformedPieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      default:
        return null;
    }
  };

  if (data.length == 0) {
    return (
      <div className="mt-5 text-red-600">
        No data found for the mentioned date range
      </div>
    );
  }
  return (
    <>
      <ContainerTile className={"my-5"} loading={loading}>
        <div className="grid grid-cols-4 items-center">
          <div className="col-span-3">Report: {configData[index].name}</div>
          <div className="grid grid-cols-4 items-end">
            <div className="col-span-3">
              <InputSelect
                labelName="Chart Type"
                inputOptions={chartOptions}
                inputName="chartType"
                inputValue={chartType}
                onChange={(e) => setChartType(e.target.value)}
              />
            </div>
            <div className="text-right">
              <Button
                buttonIcon={TrashIcon}
                onClick={() => onDeleteReportingConfig(configData[index].name)}
                circle={true}
              />
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </ContainerTile>
    </>
  );
};

export default ReCharts;
