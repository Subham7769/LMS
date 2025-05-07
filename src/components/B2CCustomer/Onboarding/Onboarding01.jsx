import React, { useState, useMemo, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLoanProductData
} from "../../../redux/Slices/personalLoansSlice";

import {
  UserIcon,
  BuildingOffice2Icon,
  DocumentIcon,
} from "@heroicons/react/20/solid";


function Onboarding01({ onNext, defaultData = {} }) {

  const dispatch = useDispatch();

  const iconMap = {
    "Individual Loans": UserIcon,
    "Payroll Backed Loans": BuildingOffice2Icon,
    // Add more mappings as needed
  };

  const { loanProductOptions } = useSelector((state) => state.personalLoans);

  useEffect(() => {
    dispatch(fetchLoanProductData());
  }, [dispatch]);

  // Memoized displayLoanProducts to avoid unnecessary recalculations
  const displayLoanProducts = useMemo(() => {
    return loanProductOptions.map((option) => {
      const Icon = iconMap[option.label] || DocumentIcon;
      return {
        ...option,
        Icon,
      };
    });
  }, [loanProductOptions]);


  console.log(displayLoanProducts);
  const [loanType, setLoanType] = useState(defaultData.loanType || "");


  const handleSubmit = (e) => {
    e.preventDefault();
    if (loanType) {
      onNext({ loanType });
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl text-gray-800 dark:text-gray-100 font-bold mb-6">
          I need{" "}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3 mb-8">
          {displayLoanProducts.map(({ label, value, Icon }) => (
            <label key={value} className="relative block cursor-pointer">
              <input
                type="radio"
                name="loanType"
                value={value}
                onChange={() => setLoanType(value)}
                checked={loanType === value}
                className="peer sr-only"
              />
              <div className="flex items-center bg-white dark:bg-gray-800 text-sm font-medium text-gray-800 dark:text-gray-100 p-4 rounded-lg border border-gray-200 dark:border-gray-700/60 hover:border-gray-300 dark:hover:border-gray-600 shadow-xs transition peer-checked:border-violet-500">
              <Icon
                  className="h-5 w-5 mr-2 " 
                  aria-hidden="true"
                />
                <span>{label}</span>
              </div>
            </label>
          ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white ml-auto disabled:opacity-50"
              disabled={!loanType}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboarding01;
