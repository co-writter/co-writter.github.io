import React from 'react';
import { IconChartLine } from '../../constants';

const AnalyticsChart: React.FC<{className?: string}> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col h-full w-full items-center justify-center bg-brand-card-dark rounded-lg p-8 text-center ${className}`}>
      <IconChartLine className="w-16 h-16 text-brand-accent mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">Analytics Connected</h3>
      <p className="text-muted-foreground">
        Your dashboard is now connected to Google Analytics. <br />
        Real-time data will be displayed here soon.
      </p>
    </div>
  );
};

export default AnalyticsChart;

