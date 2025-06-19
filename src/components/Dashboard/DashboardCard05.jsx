import React, { useEffect, useState } from 'react';
import { getCssVariable } from '../Common/Charts/Utils';
import apiClient from './apiClient';
import RechartsPieChart from '../Common/Charts/RechartsPieChart';

function DashboardCard05(props) {
  const { fromDate, toDate } = props;

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pieColors = [
    '--color-sky-500',
    '--color-violet-500',
    '--color-emerald-500',
    '--color-amber-500',
    '--color-pink-500',
    '--color-cyan-500',
    '--color-lime-500',
    '--color-red-500',
    '--color-purple-500',
    '--color-blue-500',
  ];

  useEffect(() => {
    if (!fromDate || !toDate) return;

    async function loadData() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchStatusWisePrincipalAmount();
        if (!result || result.length === 0) {
          setError('No data available.');
        } else {
          const labels = result.map(item => item.status);
          const data = result.map(item => item.amount);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Principal Amount',
                data,
                backgroundColor: labels.map((_, i) =>
                  getCssVariable(pieColors[i % pieColors.length])
                ),
                hoverBackgroundColor: getCssVariable('--color-sky-600'),
                borderRadius: 4,
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

  async function fetchStatusWisePrincipalAmount() {
    const payload = {
      startDate: '',
      endDate: '',
      path: `/carbon_loan_applications*/_async_search?batched_reduce_size=64&ccs_minimize_roundtrips=true&wait_for_completion_timeout=200ms&keep_on_completion=true&keep_alive=60000ms&ignore_unavailable=true&preference=1749018382960`,
      query: JSON.stringify({
        aggs: {
          "0": {
            terms: {
              field: "status.keyword",
              order: { "1": "desc" },
              size: 5,
              shard_size: 25,
            },
            aggs: {
              "1": {
                sum: {
                  field: "generalLoanDetails.principalAmount",
                },
              },
            },
          },
        },
        size: 0,
        fields: [
          { field: "@timestamp", format: "date_time" },
          { field: "creationDate", format: "date_time" },
          { field: "generalLoanDetails.firstEmiDate", format: "date_time" },
          { field: "generalLoanDetails.loanCreationDate", format: "date_time" },
          { field: "generalLoanDetails.loanReleaseDate", format: "date_time" },
          { field: "lastUpdate", format: "date_time" },
        ],
        script_fields: {},
        stored_fields: ["*"],
        runtime_mappings: {},
        _source: {
          excludes: [],
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
                  },
                },
              },
            ],
            should: [],
            must_not: [],
          },
        },
      }),
    };

    const response = await apiClient.post(
      `${import.meta.env.VITE_API_BASE_URL_1}/carbon-product-service/lmscarbon/report/generate/by-query`,
      payload
    );

    return response.data.response.response.aggregations["0"].buckets.map(bucket => ({
      status: bucket.key,
      amount: bucket["1"].value,
    }));
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Status-wise Principal Amount
        </h2>
      </header>
      {loading ? (
        <div className="p-5 text-sm text-gray-500 dark:text-gray-400">Loading chart data...</div>
      ) : error ? (
        <div className="p-5 text-sm text-red-600 dark:text-red-400">{error}</div>
      ) : (
        <RechartsPieChart data={chartData} height={350} innerRadius={0} outerRadius={100} paddingAngle={0} />
      )}
    </div>
  );
}

export default DashboardCard05;
