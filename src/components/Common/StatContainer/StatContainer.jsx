import React from "react";
import StatCard from "../StatCard/StatCard";
import SectionErrorBoundary from "../../ErrorBoundary/SectionErrorBoundary";

const StatContainer = ({ stats }) => {
  const Content = () => (
    <>
      <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard stat={stat} key={index} />
        ))}
      </dl>
    </>
  );
  return (
    <div className="shadow-md bg-background-light-secondary border-border-gray-primary rounded-xl border mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h3 className="text-base -mt-4 font-semibold leading-6 text-gray-900">
        Last 30 days
      </h3>
      <SectionErrorBoundary>
        <Content />
      </SectionErrorBoundary>
    </div>
  );
};

export default StatContainer;
