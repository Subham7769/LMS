
import axios from 'axios';
import apiClient from './apiClient';
// Base Elasticsearch host (adjust this for your deployment)
const ELK_API_URL = '/carbon_loan_personal_reports*/_async_search?batched_reduce_size=64&ccs_minimize_roundtrips=true&wait_for_completion_timeout=200ms&keep_on_completion=true&keep_alive=60000ms&ignore_unavailable=true&preference=1746679793593';

export async function fetchBranchLoanData() {
  const payload = {
    startDate: '',
    endDate: '',
    path: `${ELK_API_URL}`,
    query: JSON.stringify({
      aggs: {
        "0": {
          terms: {
            field: "branch.keyword",
            order: { "1": "desc" },
            size: 5,
            shard_size: 25
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
                  gte: "2025-02-01T00:00:00.000Z",
                  lte: "2025-05-09T00:00:00.000Z"
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
  

  const response = await apiClient.post('/carbon-product-service/lmscarbon/report/generate/by-query', payload);

  return response.data.response.response.aggregations["0"].buckets.map(bucket => ({
    branch: bucket.key,
    amount: bucket["1"].value,
  }));
}

export async function fetchDistrictDisbursedAmount() {
  const payload = {
    startDate: '',
    endDate: '',
    path: `${ELK_API_URL}`,
    query: JSON.stringify({
      aggs: {
        "0": {
          terms: {
            field: "customerDistrict.keyword",
            order: { "1": "desc" },
            size: 5,
            shard_size: 25
          },
          aggs: {
            "1": {
              sum: {
                field: "applicationFees"
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
                  gte: "2025-02-01T00:00:00.000Z",
                  lte: "2025-05-09T00:00:00.000Z"
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
  const response = await apiClient.post('/carbon-product-service/lmscarbon/report/generate/by-query', payload);
  return response.data.response.response.aggregations["0"].buckets.map(bucket => ({
    district: bucket.key,
    amount: bucket["1"].value,
  }));
}

export async function fetchLoanBookData() {
  const now = new Date();
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(now.getDate() - 15);

  const gte = fifteenDaysAgo.toISOString(); // e.g., 2025-04-24T00:00:00.000Z
  const lte = now.toISOString();            // e.g., 2025-05-09T00:00:00.000Z

  const payload= {
    startDate: '',
    endDate: '',
    path: `${import.meta.env.VITE_ELK_API_URL}`,
    query: JSON.stringify({
      size: 500,
      sort: [
        {
          "@timestamp": {
            order: "desc",
            format: "strict_date_optional_time",
            unmapped_type: "boolean"
          }
        },
        {
          "_doc": {
            order: "desc",
            unmapped_type: "boolean"
          }
        }
      ],
      fields: [
        { field: "*", include_unmapped: "true" },
        { field: "@timestamp", format: "strict_date_optional_time" },
        { field: "closureDate", format: "strict_date_optional_time" },
        { field: "creationDate", format: "strict_date_optional_time" },
        { field: "customerDateOfBirth", format: "strict_date_optional_time" },
        { field: "customerWorkStartDate", format: "strict_date_optional_time" },
        { field: "loanCreationDate", format: "strict_date_optional_time" },
        { field: "loanDate", format: "strict_date_optional_time" },
        { field: "loanReleaseDate", format: "strict_date_optional_time" }
      ],
      script_fields: {},
      stored_fields: ["*"],
      runtime_mappings: {},
      _source: false,
      query: {
        bool: {
          must: [],
          filter: [
            {
              bool: {
                should: [
                  {
                    exists: {
                      field: "loanId"
                    }
                  }
                ],
                minimum_should_match: 1
              }
            },
            {
              range: {
                "@timestamp": {
                  format: "strict_date_optional_time",
                  gte,
                  lte
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
  

  const response = await apiClient.post('/carbon-product-service/lmscarbon/report/generate/by-query', payload);
  return response.data.hits.hits.map(hit => hit._source);
}

export async function fetchAgewiseDisbursedAmount() {

  const now = new Date();
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(now.getDate() - 30);

  const gte = fifteenDaysAgo.toISOString(); // e.g., "2025-04-24T00:00:00.000Z"
  const lte = now.toISOString();            // e.g., "2025-05-09T00:00:00.000Z"

  const payload= {
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
                  gte,
                  lte
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


  const response = await apiClient.post('/carbon-product-service/lmscarbon/report/generate/by-query', payload);
  console.log(response);
  return response.data.response.response.aggregations["0"].buckets.map(bucket => ({
    age: bucket.key,
    amount: bucket["1"]?.value ?? 0,
  }));

  return transformed;
}
