import React from 'react';
import StatCard from '../StatCard/StatCard';
import SectionErrorBoundary from "../../ErrorBoundary/SectionErrorBoundary"
import ElementErrorBoundary from "../../ErrorBoundary/ElementErrorBoundary"

const StatContainer = ({ stats }) => (
  <div className="shadow-md bg-gray-100 border-gray-300 rounded-xl border mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <SectionErrorBoundary>
      <ElementErrorBoundary>
        <h3 className="text-base -mt-4 font-semibold leading-6 text-gray-900">Last 30 days</h3>
      </ElementErrorBoundary>
      <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
            <StatCard stat={stat} />
        ))}
      </dl>
    </SectionErrorBoundary>
  </div>
);

export default StatContainer;
