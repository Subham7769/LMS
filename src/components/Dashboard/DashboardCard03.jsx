import React, { useEffect, useState } from 'react';
import { getCssVariable } from '../Common/Charts/Utils';
import apiClient from './apiClient';
import RechartsBarChart from "../Common/Charts/RechartsBarChart";

function DashboardCard03(props) {

  const { fromDate, toDate } = props;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!fromDate || !toDate) return;

    async function loadData() {
      try {
        const result = await fetchAgewiseDisbursedAmount();
        if (!result || result.length === 0) {
          setError('No data available.');
        } else {
          const labels = result.map(item => item.age);
          const data = result.map(item => item.amount);

          setChartData({
            labels,
            xAxisLabel: 'Age',
            yAxisLabel: 'Sum of Disbursed Amount',
            datasets: [
              {
                label: 'Disbursed Amount',
                data,
                backgroundColor: getCssVariable('--color-sky-500'),
                hoverBackgroundColor: getCssVariable('--color-sky-600'),
                barPercentage: 0.7,
                categoryPercentage: 0.7,
                borderRadius: 4,
                barThickness: 6,
              },
            ],
          });
        }
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [fromDate, toDate]);

  async function fetchAgewiseDisbursedAmount() {
    // const now = new Date();
    // const fifteenDaysAgo = new Date();
    // fifteenDaysAgo.setDate(now.getDate() - 30);

    // const gte = fifteenDaysAgo.toISOString();
    // const lte = now.toISOString();

    const payload = {
      startDate: '',
      endDate: '',
      path: `${import.meta.env.VITE_ELK_API_URL}`,
      query: JSON.stringify({
        aggs: {
          "0": {
            histogram: {
              field: "age",
              interval: 1,
              min_doc_count: 0,
              extended_bounds: {
                min: 0,
                max: 51
              }
            },
            aggs: {
              "1": {
                sum: {
                  field: "disbursedAmount"
                }
              }
            }
          }
        },
        size: 0,
        fields: [
          { field: "@timestamp", format: "date_time" },
          { field: "closureDate", format: "date_time" },
          { field: "creationDate", format: "date_time" },
          { field: "customerDateOfBirth", format: "date_time" },
          { field: "customerWorkStartDate", format: "date_time" },
          { field: "loanCreationDate", format: "date_time" },
          { field: "loanDate", format: "date_time" },
          { field: "loanReleaseDate", format: "date_time" }
        ],
        script_fields: {},
        stored_fields: ["*"],
        runtime_mappings: {},
        _source: {
          excludes: []
        },
        query: {
          bool: {
            must: [],
            filter: [
              {
                range: {
                  "@timestamp": {
                    format: "strict_date_optional_time",
                    gte: fromDate,
                    lte: toDate,
                  }
                }
              }
            ],
            should: [],
            must_not: []
          }
        }
      })
    };

    const response = await apiClient.post(
      `${import.meta.env.VITE_API_BASE_URL_1}/carbon-product-service/lmscarbon/report/generate/by-query`,
      payload
    );

    return response.data.response.response.aggregations["0"].buckets.map(bucket => ({
      age: bucket.key,
      amount: bucket["1"]?.value ?? 0,
    }));
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl pb-8">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Age-wise Disbursed Amount</h2>
      </header>
      {loading ? (
        <div className="p-5 text-sm text-gray-500 dark:text-gray-400">Loading chart data...</div>
      ) : error ? (
        <div className="p-5 text-sm text-red-600 dark:text-red-400">{error}</div>
      ) : (
        <RechartsBarChart
          data={chartData}
          height={240}
          xAxisLabel='Age'
          yAxisLabel='Sum Of Disbursed Amount'
        />
      )}
    </div>
  );
}

export default DashboardCard03;
