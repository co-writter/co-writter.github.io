
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesDataDefault = [ 
  { name: 'Jan', sales: Math.floor(Math.random() * 50000) + 10000 }, 
  { name: 'Feb', sales: Math.floor(Math.random() * 50000) + 10000 },
  { name: 'Mar', sales: Math.floor(Math.random() * 50000) + 10000 },
  { name: 'Apr', sales: Math.floor(Math.random() * 50000) + 10000 },
  { name: 'May', sales: Math.floor(Math.random() * 50000) + 10000 },
  { name: 'Jun', sales: Math.floor(Math.random() * 50000) + 10000 },
  { name: 'Jul', sales: Math.floor(Math.random() * 50000) + 10000 }, 
  { name: 'Aug', sales: Math.floor(Math.random() * 50000) + 10000 },
];

interface AnalyticsChartProps {
    title?: string;
    data?: { name: string; sales: number }[]; 
    className?: string;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ title = "Monthly Revenue", data = salesDataDefault, className = "" }) => {
  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      <div className="flex justify-between items-center mb-6 relative z-10 px-6 pt-6">
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
          <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-google-blue animate-pulse"></span>
              <span className="text-[10px] text-neutral-400 font-mono uppercase">Live Data</span>
          </div>
      </div>

      <div className="flex-1 w-full min-h-0 pb-2">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
                dataKey="name" 
                stroke="rgba(255,255,255,0.1)" 
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600, fontFamily: 'Inter' }} 
                axisLine={false}
                tickLine={false}
                dy={10}
            />
            <YAxis 
                stroke="rgba(255,255,255,0.1)" 
                tick={{ fill: '#71717a', fontSize: 10, fontWeight: 600, fontFamily: 'Inter' }}
                tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`} 
                axisLine={false}
                tickLine={false}
            />
            <Tooltip
                cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }} 
                contentStyle={{ 
                    backgroundColor: 'rgba(10, 10, 10, 0.95)', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '8px',
                    padding: '8px 12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 700 }}
                labelStyle={{ color: '#a1a1aa', fontSize: '10px', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
            />
            <Bar 
                dataKey="sales" 
                fill="#fff" 
                radius={[4, 4, 0, 0]} 
                opacity={0.8}
                activeBar={{ fill: '#8ab4f8', opacity: 1 }}
            />
            </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;