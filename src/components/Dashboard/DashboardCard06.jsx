import React, { useEffect, useState } from "react";
import apiClient from "./apiClient";

function DashboardCard06({ fromDate, toDate, appConfig }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!fromDate || !toDate) return;

    async function fetchSummary() {
      setLoading(true);
      setError(null);

      const commonFields = [
        { field: "@timestamp", format: "date_time" },
        { field: "creationDate", format: "date_time" },
      ];

      try {
        const [reportRes, appRes] = await Promise.all([
          apiClient.post(
            `${import.meta.env.VITE_API_BASE_URL_1}/carbon-product-service/lmscarbon/report/generate/by-query`,
            {
              startDate: "",
              endDate: "",
              path: "/carbon_loan_personal_reports*/_async_search?batched_reduce_size=64&ccs_minimize_roundtrips=true&wait_for_completion_timeout=200ms&keep_on_completion=true&keep_alive=60000ms&ignore_unavailable=true&preference=1749040288918",
              query: JSON.stringify({
                aggs: {
                  "0": { sum: { field: "disbursedAmount" } },
                  "1": { sum: { field: "outstandingPrincipal" } },
                  "2": { sum: { field: "totalCollectible" } },
                  "3-bucket": {
                    filter: {
                      bool: {
                        filter: [
                          {
                            bool: {
                              should: [
                                {
                                  term: {
                                    "loanStatus.keyword": { value: "CLOSED" },
                                  },
                                },
                              ],
                              minimum_should_match: 1,
                            },
                          },
                        ],
                      },
                    },
                    aggs: {
                      "3-metric": {
                        cardinality: { field: "id.keyword" },
                      },
                    },
                  },
                },
                size: 0,
                fields: commonFields,
                query: {
                  bool: {
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
                  },
                },
              }),
            }
          ),
          apiClient.post(
            `${import.meta.env.VITE_API_BASE_URL_1}/carbon-product-service/lmscarbon/report/generate/by-query`,
            {
              startDate: "",
              endDate: "",
              path: "/carbon_loan_applications*/_async_search?batched_reduce_size=64&ccs_minimize_roundtrips=true&wait_for_completion_timeout=200ms&keep_on_completion=true&keep_alive=60000ms&ignore_unavailable=true&preference=1749040288918",
              query: JSON.stringify({
                aggs: {
                  "0": {
                    cardinality: { field: "id.keyword" },
                  },
                },
                size: 0,
                fields: commonFields,
                query: {
                  bool: {
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
                  },
                },
              }),
            }
          ),
        ]);

        const r = reportRes.data.response.response.aggregations;
        const a = appRes.data.response.response.aggregations;

        setSummary({
          disbursedAmount: r["0"]?.value ?? 0,
          outstandingPrincipal: r["1"]?.value ?? 0,
          totalCollectible: r["2"]?.value ?? 0,
          closedLoans: r["3-bucket"]["3-metric"]?.value ?? 0,
          loanApplications: a["0"]?.value ?? 0,
        });
      } catch (err) {
        setError("Failed to fetch summary data.");
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [fromDate, toDate]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 col-span-full">
      {loading ? (
        <div className="col-span-full text-gray-500 dark:text-gray-300 text-sm">Loading summary data...</div>
      ) : error ? (
        <div className="col-span-full text-red-600 dark:text-red-400 text-sm">{error}</div>
      ) : (
        <>
          {[
            ["Disbursed Amount", Math.round(summary.disbursedAmount,0),true],
            ["Outstanding Principal", Math.round(summary.outstandingPrincipal,0),true],
            ["Total Collectible", Math.round(summary.totalCollectible,0),true],
            ["Loan Applications", summary.loanApplications],            
            ["Closed Loans", summary.closedLoans],
          ].map(([label, value, showCurrency], i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-4 shadow rounded-xl">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase mb-2">{label}</div>
              <div className="text-xl font-bold text-gray-800 dark:text-gray-100 mr-2 inline-flex items-center">
                {showCurrency && (
                  <span className="text-sm mr-1 align-middle leading-none">
                    {appConfig.currencySymbol}
                  </span>
                )}
                <span className="align-middle leading-none">
                  {Number(value).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default DashboardCard06;
