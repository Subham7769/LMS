import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { flatten } from "flat";
import InputSelect from "../Common/InputSelect/InputSelect";

const response = {
  took: 6,
  timed_out: false,
  _shards: {
    total: 1,
    successful: 1,
    skipped: 0,
    failed: 0,
  },
  hits: {
    total: {
      value: 8627,
      relation: "eq",
    },
    max_score: null,
    hits: [],
  },
  aggregations: {
    2: {
      buckets: [
        {
          key_as_string: "2024-06-11T00:00:00.000+03:00",
          key: 1718053200000,
          doc_count: 2,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 2,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-12T00:00:00.000+03:00",
          key: 1718139600000,
          doc_count: 4,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Overdraft",
                doc_count: 4,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-13T00:00:00.000+03:00",
          key: 1718226000000,
          doc_count: 3,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 2,
              },
              {
                key: "Overdraft",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-14T00:00:00.000+03:00",
          key: 1718312400000,
          doc_count: 6,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Overdraft",
                doc_count: 6,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-15T00:00:00.000+03:00",
          key: 1718398800000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Overdraft",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-21T00:00:00.000+03:00",
          key: 1718917200000,
          doc_count: 5,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 4,
              },
              {
                key: "Overdraft",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-23T00:00:00.000+03:00",
          key: 1719090000000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Overdraft",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-25T00:00:00.000+03:00",
          key: 1719262800000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-26T00:00:00.000+03:00",
          key: 1719349200000,
          doc_count: 2,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
              {
                key: "Overdraft",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-06-30T00:00:00.000+03:00",
          key: 1719694800000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-03T00:00:00.000+03:00",
          key: 1719954000000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Cash loan",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-04T00:00:00.000+03:00",
          key: 1720040400000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Cash loan",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-09T00:00:00.000+03:00",
          key: 1720472400000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-10T00:00:00.000+03:00",
          key: 1720558800000,
          doc_count: 2,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 2,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-11T00:00:00.000+03:00",
          key: 1720645200000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-16T00:00:00.000+03:00",
          key: 1721077200000,
          doc_count: 2,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
              {
                key: "Cash loan",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-17T00:00:00.000+03:00",
          key: 1721163600000,
          doc_count: 8585,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Cash loan",
                doc_count: 7410,
              },
              {
                key: "Overdraft",
                doc_count: 1175,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-18T00:00:00.000+03:00",
          key: 1721250000000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Cash loan",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-22T00:00:00.000+03:00",
          key: 1721595600000,
          doc_count: 3,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 3,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-23T00:00:00.000+03:00",
          key: 1721682000000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-07-25T00:00:00.000+03:00",
          key: 1721854800000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "BNPL",
                doc_count: 1,
              },
            ],
          },
        },
        {
          key_as_string: "2024-08-01T00:00:00.000+03:00",
          key: 1722459600000,
          doc_count: 1,
          3: {
            doc_count_error_upper_bound: 0,
            sum_other_doc_count: 0,
            buckets: [
              {
                key: "Overdraft",
                doc_count: 1,
              },
            ],
          },
        },
      ],
    },
  },
};

// Extracting data from the response
const extractData = (response) => {
  const data = [];
  const aggregationKey = Object.keys(response.aggregations)[0];

  response.aggregations[aggregationKey].buckets.forEach((bucket) => {
    const date = new Date(bucket.key_as_string).toISOString().split("T")[0];
    const subAggregationKey = Object.keys(bucket).find(
      (key) => key !== "key_as_string" && key !== "key" && key !== "doc_count"
    );
    const productCounts = flatten(
      bucket[subAggregationKey].buckets.reduce((acc, productBucket) => {
        acc[productBucket.key] = productBucket.doc_count;
        return acc;
      }, {})
    );

    data.push({ date, ...productCounts });
  });

  return data;
};

const data = extractData(response);

const chartOptions = [
  {
    label: "Line Bar Chart",
    value: "Bar",
  },
  {
    label: "Stacked Bar Chart",
    value: "StackedBar",
  },
  {
    label: "Line Chart",
    value: "Line",
  },
];

// React component to render the bar chart
const ReCharts = () => {
  const [chartType, setChartType] = useState("Bar");
  const renderChart = () => {
    switch (chartType) {
      case "Bar":
        return (
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
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
      default:
        return null;
    }
  };
  return (
    <>
      <div className="flex justify-end mb-3">
        <div className="w-1/6">
          <InputSelect
            labelName="Chart Type"
            inputOptions={chartOptions}
            inputName="chartType"
            inputValue={chartType}
            onChange={(e) => setChartType(e.target.value)}
          />
        </div>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        {renderChart()}
      </ResponsiveContainer>
    </>
  );
};

export default ReCharts;
