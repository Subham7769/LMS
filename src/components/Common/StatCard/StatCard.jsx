import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import ElementErrorBoundary from '../../ErrorBoundary/ElementErrorBoundary';
import SectionErrorBoundary from '../../ErrorBoundary/SectionErrorBoundary';

const StatCard = ({ stat }) => {
    const isIncrease = stat.changeType === "increase";
    const IconComponent = isIncrease ? ArrowUpIcon : ArrowDownIcon;
    const textColorClass = isIncrease ? "text-green-600" : "text-red-600";
    const iconColorClass = isIncrease ? "text-green-500" : "text-red-500";

    const DataRender = ({ stat }) => {
        return (<SectionErrorBoundary>
            <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
                <ElementErrorBoundary>
                    <p className="ml-16 truncate text-sm font-medium text-gray-500">
                        {/* {false ? "demo" : (() => { throw new Error("Simulated Error"); })()} */}{}
                    </p>
                </ElementErrorBoundary>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.stat}</p>
                <p className={`${textColorClass} ml-2 flex items-baseline text-sm font-semibold`}>
                    <IconComponent className={`h-5 w-5 flex-shrink-0 self-center ${iconColorClass}`} aria-hidden="true" />
                    <span className="sr-only">
                        {isIncrease ? "Increased" : "Decreased"} by{" "}
                    </span>
                    {stat.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-3 sm:px-6">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            View all<span className="sr-only"> {stat.name} stats</span>
                        </a>
                    </div>
                </div>
            </dd>
        </SectionErrorBoundary>)
    }

    return (
        <div className="relative overflow-hidden rounded-lg bg-white px-4 pb-10 pt-5 shadow sm:px-6 sm:pt-6">
            {/* <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                    <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.stat}</p>
                <p className={`${textColorClass} ml-2 flex items-baseline text-sm font-semibold`}>
                    <IconComponent className={`h-5 w-5 flex-shrink-0 self-center ${iconColorClass}`} aria-hidden="true" />
                    <span className="sr-only">
                        {isIncrease ? "Increased" : "Decreased"} by{" "}
                    </span>
                    {stat.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-3 sm:px-6">
                    <div className="text-sm">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            View all<span className="sr-only"> {stat.name} stats</span>
                        </a>
                    </div>
                </div>
            </dd> */}
            <SectionErrorBoundary>
                <DataRender stat={stat} />
            </SectionErrorBoundary>
        </div>
    );
};

export default StatCard;