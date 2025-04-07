import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

const ProductSidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { productType, loanProId, projectId } = useParams();

  return (
    <div className="flex flex-nowrap overflow-x-scroll no-scrollbar md:block md:overflow-auto py-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700/60 min-w-[10rem] md:space-y-3">
      {/* Group 1 */}
      <div>
        <ul className="flex flex-nowrap md:block mr-3 md:mr-0">
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              end
              to={`/loan/loan-product/${productType}/${projectId}/${loanProId}/product-config`}
              className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${
                pathname.includes(
                  `/loan/loan-product/${productType}/${projectId}/${loanProId}/product-config`
                ) &&
                "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes(
                    `/loan/loan-product/${productType}/${projectId}/${loanProId}/product-config`
                  )
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Product Config
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              end
              to={`/loan/loan-product/${productType}/${projectId}/${loanProId}/upfront-fee`}
              className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${
                pathname.includes(`/loan/loan-product/${productType}/${projectId}/${loanProId}/upfront-fee`) &&
                "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes(`/loan/loan-product/${productType}/${projectId}/${loanProId}/upfront-fee`)
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Upfront Fee
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              end
              to={`/loan/loan-product/${productType}/${projectId}/${loanProId}/options`}
              className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${
                pathname.includes(`/loan/loan-product/${productType}/${projectId}/${loanProId}/options`) &&
                "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes(`/loan/loan-product/${productType}/${projectId}/${loanProId}/options`)
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Options
              </span>
            </NavLink>
          </li>
          <li className="mr-0.5 md:mr-0 md:mb-0.5">
            <NavLink
              end
              to={`/loan/loan-product/${productType}/${projectId}/${loanProId}/interest-tenure`}
              className={`flex items-center px-2.5 py-2 rounded-lg whitespace-nowrap ${
                pathname.includes(`/loan/loan-product/${productType}/${projectId}/${loanProId}/interest-tenure`) &&
                "bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-violet-500/[0.12] dark:from-violet-500/[0.24] to-violet-500/[0.04]"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  pathname.includes(`/loan/loan-product/${productType}/${projectId}/${loanProId}/interest-tenure`)
                    ? "text-violet-500 dark:text-violet-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                Interest Tenure
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductSidebar;
