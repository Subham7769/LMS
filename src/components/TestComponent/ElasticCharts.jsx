import React from "react";
import TotalDocCountChart from "./TotalDocCountChart";
import BreakdownChart from "./BreakdownChart";

const data = {
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

const ElasticCharts = () => {
  const totalDocCountData = data.aggregations[2].buckets.map((bucket) => ({
    x: bucket.key, // Use 'key' for the timestamp
    y: bucket.doc_count, // Total document count for the date
  }));

  const breakdownData = data.aggregations[2].buckets.flatMap((bucket) =>
    bucket[3].buckets.map((subBucket) => ({
      x: bucket.key, // Date
      y: subBucket.doc_count, // Count for the specific sub-key
      key: subBucket.key, // Sub-key (e.g., 'BNPL', 'Overdraft')
    }))
  );

  return (
    <div>
      <TotalDocCountChart data={totalDocCountData} />
      <BreakdownChart data={breakdownData} />
    </div>
  );
};

export default ElasticCharts;
