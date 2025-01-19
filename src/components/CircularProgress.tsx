'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  color?: string;
}

export default function CircularProgress({
  percentage,
  size = 200,
  color = '#8B5CF6'
}: CircularProgressProps) {
  const data = [
    { value: percentage },
    { value: 100 - percentage }
  ];

  return (
    <ResponsiveContainer width={size} height={size}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          startAngle={90}
          endAngle={-270}
          innerRadius="70%"
          outerRadius="100%"
          paddingAngle={0}
          dataKey="value"
        >
          <Cell fill={color} />
          <Cell fill="#E5E7EB" />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
