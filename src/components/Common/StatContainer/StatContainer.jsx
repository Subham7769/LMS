import React from 'react';
import StatCard from '../StatCard/StatCard';

const StatContainer = ({ stats }) => (
  <div className="bg-gray-100 rounded-xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
    <h3 className="text-base -mt-4 font-semibold leading-6 text-gray-900">Last 30 days</h3>
    <dl className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </dl>
  </div>
);

export default StatContainer;
