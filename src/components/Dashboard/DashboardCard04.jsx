import React, { useEffect, useState } from 'react';
import apiClient from './apiClient';

function DashboardCard04(props) {

  const { fromDate, toDate } = props;

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const requiredFields = [
    "loanId", "customerAccount", "customerTitle", "customerSurname", "customerFirstName", "customerOtherName", "customerNRCNo", "customerGender",
    "customerNationality", "customerPhoneNumber", "customerStreet", "customerResidentialArea", "customerDistrict", "customerProvince",
    "customerCountry", "customerPostBox", "customerEmployer", "industry", "ministry", "department", "customerOccupation", "employeeNo",
    "workType", "loanDate", "product", "loanCategory", "loanStatus", "amountInArrears", "loanAmount", "disbursedAmount", "loanTenor",
    "annualInterestRate", "monthlyRepaymentAmt", "monthlyAdminFees", "totalMonthlyRepayment", "totalCollectible", "crbCharge",
    "insuranceFee", "insuranceLevy", "applicationFees", "loanAgentName", "loanOfficerName", "branch", "creationDate", "@timestamp"
  ];

  useEffect(() => {

    if (!fromDate || !toDate) return;
    
    async function loadData() {
      try {
        const result = await fetchLoanBookData();
        if (!result || result.length === 0) {
          setError('No data available.');
        } else {
          setRecords(result);
        }
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [fromDate, toDate]);

  async function fetchLoanBookData() {
    // const now = new Date();
    // const ninetyDaysAgo = new Date();
    // ninetyDaysAgo.setDate(now.getDate() - 90);

    // const gte = ninetyDaysAgo.toISOString();
    // const lte = now.toISOString();

    const payload = {
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

    return response.data.response.response.hits.hits.map(hit => {
      const fields = hit.fields;
      const row = {};
      requiredFields.forEach(field => {
        if (field in fields) {
          const value = fields[field];
          row[field] = Array.isArray(value) && value.length === 1 ? value[0] : value;
        } else {
          row[field] = '';
        }
      });
      return row;
    });
  }

  return (
    <div className="col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Loan Book (Selected Fields)</h2>
      </header>
      <div className="p-3 overflow-x-auto">
        <div className="max-h-[250px] overflow-y-auto border border-gray-200 dark:border-gray-700 rounded">
          {loading ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 p-4">Loading data...</p>
          ) : error ? (
            <p className="text-sm text-red-600 dark:text-red-400 p-4">{error}</p>
          ) : records.length > 0 ? (
            <table className="table-auto w-full text-sm dark:text-gray-300">
              <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-400 dark:text-gray-500">
                <tr>
                  {requiredFields.map((col, i) => (
                    <th key={i} className="p-2 text-left whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {records.map((row, i) => (
                  <tr key={i}>
                    {requiredFields.map((col, j) => (
                      <td key={j} className="p-2 whitespace-nowrap text-xs">
                        {typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 p-4">No data to display.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardCard04;
