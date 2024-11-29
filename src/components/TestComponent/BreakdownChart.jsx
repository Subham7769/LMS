import React from "react";
import {
  Chart,
  Axis,
  BarSeries,
  Position,
  ScaleType,
  Settings,
} from "@elastic/charts";

const BreakdownChart = ({ data }) => {
  console.log(data);
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.key]) acc[item.key] = [];
    acc[item.key].push({ x: item.x, y: item.y });
    return acc;
  }, {});
  console.log(groupedData);

  return (
    <Chart size={["100%", 500]}>
      <Settings showLegend legendPosition={Position.Right} />
      <Axis id="bottom-axis" position={Position.Bottom} title="Date" />
      <Axis id="left-axis" position={Position.Left} title="Count" />
      {Object.keys(groupedData).map((key) => (
        <BarSeries
          id="loan-data"
          name="Loan Type"
          xAccessor="x"
          yAccessors={["y"]}
          splitSeriesAccessors={["key"]}
          data={data}
          xScaleType={ScaleType.Time}
          yScaleType={ScaleType.Linear}
          stackAccessors={["x"]}
        />
      ))}
    </Chart>
    // <Chart size={["100%", 500]}>
    //   <Settings
    //     theme={{
    //       chartMargins: {
    //         top: 10,
    //         right: 10,
    //         bottom: 10,
    //         left: 10,
    //       },
    //     }}
    //   />
    //   <Axis id="count" title="Count" position={Position.Left} />
    //   <Axis id="x" title="Goods" position={Position.Bottom} />
    //   <BarSeries
    //     id="bars"
    //     name="amount"
    //     xScaleType={ScaleType.Ordinal}
    //     xAccessor="x"
    //     yAccessors={["y"]}
    //     data={data}
    //   />
    // </Chart>
  );
};

export default BreakdownChart;
