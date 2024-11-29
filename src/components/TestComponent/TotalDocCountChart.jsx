import React from "react";
import {
  Chart,
  Axis,
  BarSeries,
  Position,
  ScaleType,
  Settings,
} from "@elastic/charts";

const TotalDocCountChart = ({ data }) => {
  console.log(data);
  return (
    // <Chart>
    //   <Settings showLegend legendPosition={Position.Right} />
    //   <Axis id="bottom-axis" position={Position.Bottom} title="Date" />
    //   <Axis id="left-axis" position={Position.Left} title="Total Count" />
    //   <LineSeries
    //     id="total-doc-count"
    //     name="Total Document Count"
    //     xScaleType="time"
    //     yScaleType="linear"
    //     xAccessor="x"
    //     yAccessor="y"
    //     data={data}
    //   />
    // </Chart>
    <Chart size={["100%", 500]}>
      <Settings
        theme={{
          chartMargins: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          },
        }}
      />
      <Axis id="count" title="Count" position={Position.Left} />
      <Axis id="x" title="Goods" position={Position.Bottom} />
      <BarSeries
        id="bars"
        name="amount"
        xScaleType={ScaleType.Ordinal}
        xAccessor="x"
        yAccessors={["y"]}
        data={data}
      />
    </Chart>
  );
};

export default TotalDocCountChart;
