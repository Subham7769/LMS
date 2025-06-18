import React, { useMemo } from 'react'
import { useActiveTab } from '../ActiveTabContext';
import { useSelector } from 'react-redux';
import {
    UserIcon,
    BuildingOffice2Icon,
    DocumentIcon,
} from "@heroicons/react/20/solid";

const ProductListSection = () => {

    const { formData, setFormData } = useActiveTab();
    const { loanProductOptions, loanProductData } = useSelector((state) => state.B2CLoans);

    const iconMap = {
        "Individual Loans": UserIcon,
        "Payroll Backed Loans": BuildingOffice2Icon,
        // Add more mappings as needed
    };

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


    return (
        <>
            {displayLoanProducts.map(({ label, value, Icon }) => (
                <label key={value} className="relative block cursor-pointer">
                    <input
                        type="radio"
                        name="loanType"
                        value={value}
                        onChange={() => setFormData({ ...formData, loanType: value })}
                        checked={formData.loanType === value}
                        className="peer sr-only"
                    />
                    <div className="flex items-center 
                bg-white dark:bg-gray-800 
                text-sm font-medium 
                text-gray-800 dark:text-gray-100 
                p-4 rounded-lg 
                border border-gray-200 dark:border-gray-700/60 
                hover:border-gray-300 dark:hover:border-gray-600 
                shadow-xs transition 
                peer-checked:border-blue-600 
                peer-checked:bg-blue-100 
                dark:peer-checked:bg-blue-900">
                        <Icon
                            className="h-5 w-5 mr-2 "
                            aria-hidden="true"
                        />
                        <span>{label}</span>
                    </div>
                </label>
            ))}
        </>
    )
}

export default ProductListSection