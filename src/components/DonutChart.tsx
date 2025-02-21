import React, { useEffect, useState } from 'react';

interface DonutChartProps {
  percentage: number;
}

export default function DonutChart({ percentage }: DonutChartProps) {
  const [offset, setOffset] = useState(0);
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDasharray = circumference;
  const strokeDashoffset = (percentage / 100) * circumference;

  useEffect(() => {
    setOffset(strokeDashoffset);
  }, [strokeDashoffset]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="64"
          cy="64"
          r="45"
          stroke="currentColor"
          strokeWidth="20"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          className="text-blue-500 transition-all duration-1000 ease-in-out"
          style={{ strokeDashoffset: circumference - offset
           }}
        />
      </svg>
    </div>
  );
}