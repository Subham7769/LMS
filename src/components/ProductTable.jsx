import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Cash Loan",
    created: "07/06/2021",
    openLoans: "2367",
    disbursedPrincipal: "$234M",
    status: "Active",
    href: "/product/cash-loan/loan-product-config",
  },
  {
    name: "BNPL",
    created: "14/09/2022",
    openLoans: "1490",
    disbursedPrincipal: "$750M",
    status: "Active",
  },
  {
    name: "Overdraft",
    created: "19/09/2022",
    openLoans: "185",
    disbursedPrincipal: "$90M",
    status: "Inactive",
  },
  // More people...
];

const ProductTable = () => {
  return (
    <div className="bg-gray-100 py-10 rounded-xl mt-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Search bar */}
        <div className="mb-5 w-96">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Product List
            </h1>
          </div>
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div> */}
        </div>
        <div className="mt-4 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 w-1/5 text-center text-sm font-medium text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 w-1/5 text-center text-sm font-medium text-gray-900"
                      >
                        Created On
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 w-1/5 text-center text-sm font-medium text-gray-900"
                      >
                        Open Loans
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 w-1/5 text-center text-sm font-medium text-gray-900"
                      >
                        Total Disbursed Principal
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 w-1/5 text-center text-sm font-medium text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {products.map((product) => (
                      <tr key={product.name}>
                        <td className="w-1/5 whitespace-nowrap text-center py-4 px-3 text-sm text-gray-500">
                          <Link className="w-full block" to={product.href}>
                            {product.name}
                          </Link>
                        </td>
                        <td className="w-1/5 whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <Link className="w-full block" to={product.href}>
                            {product.created}
                          </Link>
                        </td>
                        <td className="w-1/5 whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <Link className="w-full block" to={product.href}>
                            {product.openLoans}
                          </Link>
                        </td>
                        <td className="w-1/5 whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <Link className="w-full block" to={product.href}>
                            {product.disbursedPrincipal}
                          </Link>
                        </td>
                        <td className="w-1/5 whitespace-nowrap text-center px-3 py-4 text-sm text-gray-500">
                          <Link className="w-full block" to={product.href}>
                            {product.status}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;